// ============================================================
// constants.js – Shared constants for the decision engine
// Keep magic numbers and reason codes in one place.
// ============================================================

// Business type options accepted by the API
const BUSINESS_TYPES = [
  'Retail',
  'Manufacturing',
  'Services',
  'Healthcare',
  'Agriculture',
  'Technology',
  'Education',
  'Others',
];

// Loan purpose options accepted by the API
const LOAN_PURPOSES = [
  'Expansion',
  'Inventory',
  'Machinery',
  'Working Capital',
  'Marketing',
  'Other',
];

// Reason codes returned with every decision
const REASON_CODES = {
  LOW_REVENUE: 'LOW_REVENUE',
  HIGH_LOAN_RATIO: 'HIGH_LOAN_RATIO',
  SHORT_TENURE: 'SHORT_TENURE',
  LONG_TENURE: 'LONG_TENURE',
  INVALID_PAN: 'INVALID_PAN',
  DATA_INCONSISTENCY: 'DATA_INCONSISTENCY',
  GOOD_REVENUE: 'GOOD_REVENUE',
  GOOD_LOAN_RATIO: 'GOOD_LOAN_RATIO',
  SAFE_TENURE: 'SAFE_TENURE',
};

// Decision status values for async processing
const DECISION_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// Default annual interest rate used for EMI estimate (12%)
const DEFAULT_ANNUAL_RATE = 0.12;

// Score thresholds used by the engine
const SCORE = {
  START: 100,
  APPROVE_MIN: 70,
  MIN: 0,
  MAX: 100,
};

module.exports = {
  BUSINESS_TYPES,
  LOAN_PURPOSES,
  REASON_CODES,
  DECISION_STATUS,
  DEFAULT_ANNUAL_RATE,
  SCORE,
};
