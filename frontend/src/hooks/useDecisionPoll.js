// ============================================================
// useDecisionPoll.js – Poll decision status every 2 seconds
// Also tracks elapsed wall-clock time for the UI timer.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';
import { getDecision } from '../services/api';

/**
 * @param {string|null} decisionId - Mongo id returned by POST /api/decision
 */
export function useDecisionPoll(decisionId) {
  const [decision, setDecision] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | processing | completed | failed
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState(null);

  const startRef = useRef(null);
  const timerRef = useRef(null);
  const pollRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (pollRef.current) clearInterval(pollRef.current);
    timerRef.current = null;
    pollRef.current = null;
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setDecision(null);
    setStatus('idle');
    setElapsedMs(0);
    setError(null);
    startRef.current = null;
  }, [clearTimers]);

  useEffect(() => {
    if (!decisionId) return undefined;

    setStatus('processing');
    setError(null);
    startRef.current = Date.now();

    // Update elapsed timer every 200ms for a smooth display
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current);
    }, 200);

    // Poll the backend every 2 seconds
    const poll = async () => {
      try {
        const data = await getDecision(decisionId);
        setDecision(data);

        if (data.status === 'completed') {
          setStatus('completed');
          clearTimers();
          setElapsedMs(data.processingTime ?? Date.now() - startRef.current);
        }

        if (data.status === 'failed') {
          setStatus('failed');
          setError(data.errorMessage || 'Decision processing failed');
          clearTimers();
        }
      } catch (err) {
        setStatus('failed');
        setError(err.response?.data?.message || err.message);
        clearTimers();
      }
    };

    poll();
    pollRef.current = setInterval(poll, 2000);

    return () => clearTimers();
  }, [decisionId, clearTimers]);

  return { decision, status, elapsedMs, error, reset };
}
