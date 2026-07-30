// ============================================================
// api.js – Axios client + typed API helpers
// ============================================================

import axios from 'axios';

// Prefer env var; fall back to same-origin /api (works with Vite proxy & nginx)
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

/** Create a business profile */
export async function createBusiness(payload) {
  const { data } = await api.post('/business', payload);
  return data.data;
}

/** Create a loan application */
export async function createLoan(payload) {
  const { data } = await api.post('/loan', payload);
  return data.data;
}

/** Start async decision processing */
export async function startDecision(payload) {
  const { data } = await api.post('/decision', payload);
  return data.data;
}

/** Poll a decision by id */
export async function getDecision(id) {
  const { data } = await api.get(`/decision/${id}`);
  return data.data;
}

/** Fetch paginated audit history */
export async function getHistory(params) {
  const { data } = await api.get('/history', { params });
  return data;
}

/** Fetch dashboard summary + charts */
export async function getDashboard() {
  const { data } = await api.get('/dashboard');
  return data.data;
}

export default api;
