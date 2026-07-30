// ============================================================
// DecisionResult.jsx – Shows Approved / Rejected result card
// ============================================================

import Card from './ui/Card';
import { REASON_LABELS } from '../utils/constants';

function formatINR(value) {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function DecisionResult({ decision, elapsedMs }) {
  if (!decision) return null;

  const isApproved = decision.decision === 'Approved' || decision.approved === true;
  const reasons = decision.reasonCodes || [];

  return (
    <Card
      title="Decision Result"
      subtitle="Credit assessment from the lending decision engine"
      className="mt-8"
    >
      {/* Status banner */}
      <div
        className={`mb-6 rounded-xl px-4 py-3 text-center font-display text-2xl font-semibold tracking-tight ${
          isApproved
            ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
        }`}
      >
        {isApproved ? 'Approved' : 'Rejected'}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-700/50 dark:text-ink-200/40">
            Credit Score
          </p>
          <p className="mt-1 font-display text-3xl font-bold text-ink-900 dark:text-ink-50">
            {decision.creditScore ?? '—'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-700/50 dark:text-ink-200/40">
            Estimated EMI
          </p>
          <p className="mt-1 text-lg font-semibold text-ink-900 dark:text-ink-50">
            {formatINR(decision.estimatedEMI)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-700/50 dark:text-ink-200/40">
            Processing Time
          </p>
          <p className="mt-1 text-lg font-semibold text-ink-900 dark:text-ink-50">
            {decision.processingTime != null
              ? `${(decision.processingTime / 1000).toFixed(1)}s`
              : elapsedMs != null
                ? `${(elapsedMs / 1000).toFixed(1)}s`
                : '—'}
          </p>
        </div>
      </div>

      {/* Reason codes */}
      {reasons.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wider text-ink-700/50 dark:text-ink-200/40">
            Reason Codes
          </p>
          <ul className="flex flex-wrap gap-2">
            {reasons.map((code) => (
              <li
                key={code}
                className="rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1 text-xs text-ink-800 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
                title={REASON_LABELS[code] || code}
              >
                <span className="font-semibold">{code}</span>
                {REASON_LABELS[code] && (
                  <span className="ml-1 opacity-70">— {REASON_LABELS[code]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export default DecisionResult;
