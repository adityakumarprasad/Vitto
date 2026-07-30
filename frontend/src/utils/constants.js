// ============================================================
// constants.js – Frontend dropdown options & labels
// ============================================================

export const BUSINESS_TYPES = [
  'Retail',
  'Manufacturing',
  'Services',
  'Healthcare',
  'Agriculture',
  'Technology',
  'Education',
  'Others',
];

export const LOAN_PURPOSES = [
  'Expansion',
  'Inventory',
  'Machinery',
  'Working Capital',
  'Marketing',
  'Other',
];

// Friendly labels for reason codes shown on the result card
export const REASON_LABELS = {
  LOW_REVENUE: 'Revenue is below the preferred threshold',
  HIGH_LOAN_RATIO: 'Loan amount is high relative to revenue',
  SHORT_TENURE: 'Tenure is shorter than the preferred range',
  LONG_TENURE: 'Tenure is longer than the preferred range',
  INVALID_PAN: 'PAN number format is invalid',
  DATA_INCONSISTENCY: 'Submitted data failed consistency checks',
  GOOD_REVENUE: 'Healthy monthly revenue',
  GOOD_LOAN_RATIO: 'Loan-to-revenue ratio looks healthy',
  SAFE_TENURE: 'Tenure is within the preferred range',
};
