// ============================================================
// decisionEngine.js – Pure credit scoring & approval logic
// No database calls here – easy to unit test and reuse.
// ============================================================

const { REASON_CODES, SCORE } = require('../config/constants');
const { isValidPan } = require('../utils/panValidator');
const { calculateEMI } = require('../utils/emiCalculator');

/**
 * Clamp a number between min and max inclusive.
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Apply hard reject rules. Returns reason codes if rejected.
 */
function getHardRejectReasons(pan, monthlyRevenue, loanAmount) {
  const reasons = [];

  if (!isValidPan(pan)) {
    reasons.push(REASON_CODES.INVALID_PAN);
  }

  if (monthlyRevenue < 20000) {
    reasons.push(REASON_CODES.LOW_REVENUE);
  }

  // Loan cannot exceed 100x monthly revenue
  if (loanAmount > monthlyRevenue * 100) {
    reasons.push(REASON_CODES.HIGH_LOAN_RATIO);
    reasons.push(REASON_CODES.DATA_INCONSISTENCY);
  }

  return reasons;
}

/**
 * Score revenue-related rules (Rules 1 & 2).
 */
function scoreRevenue(monthlyRevenue, reasons) {
  let delta = 0;

  if (monthlyRevenue >= 500000) {
    delta += 20;
    reasons.push(REASON_CODES.GOOD_REVENUE);
  } else if (monthlyRevenue >= 200000) {
    delta += 10;
    reasons.push(REASON_CODES.GOOD_REVENUE);
  } else if (monthlyRevenue < 20000) {
    reasons.push(REASON_CODES.LOW_REVENUE);
  }

  return delta;
}

/**
 * Score loan-to-revenue ratio (Rules 3 & 4).
 */
function scoreLoanRatio(loanAmount, monthlyRevenue, reasons) {
  let delta = 0;
  const ratio = loanAmount / monthlyRevenue;

  if (ratio <= 5) {
    delta += 20;
    reasons.push(REASON_CODES.GOOD_LOAN_RATIO);
  } else if (ratio <= 10) {
    delta += 10;
    reasons.push(REASON_CODES.GOOD_LOAN_RATIO);
  } else {
    reasons.push(REASON_CODES.HIGH_LOAN_RATIO);
  }

  return delta;
}

/**
 * Score tenure rules (Rules 5, 6 & 7).
 */
function scoreTenure(tenure, reasons) {
  let delta = 0;

  if (tenure >= 12 && tenure <= 48) {
    delta += 15;
    reasons.push(REASON_CODES.SAFE_TENURE);
  } else if (tenure >= 6 && tenure <= 11) {
    delta -= 5;
    reasons.push(REASON_CODES.SHORT_TENURE);
  } else if (tenure > 84) {
    delta -= 10;
    reasons.push(REASON_CODES.LONG_TENURE);
  }

  return delta;
}

/**
 * Run the full MSME lending decision engine.
 * @param {{ pan, monthlyRevenue, loanAmount, tenure }} input
 * @returns {{ creditScore, approved, decision, reasonCodes, estimatedEMI }}
 */
function runDecisionEngine(input) {
  const { pan, monthlyRevenue, loanAmount, tenure } = input;
  const reasonCodes = [];

  // Hard reject rules first (Rules 8, 9, 10)
  const hardRejects = getHardRejectReasons(pan, monthlyRevenue, loanAmount);
  if (hardRejects.length > 0) {
    return {
      creditScore: 0,
      approved: false,
      decision: 'Rejected',
      reasonCodes: [...new Set(hardRejects)],
      estimatedEMI: calculateEMI(loanAmount, tenure),
    };
  }

  // Start from base score and apply positive / negative rules
  let score = SCORE.START;
  score += scoreRevenue(monthlyRevenue, reasonCodes);
  score += scoreLoanRatio(loanAmount, monthlyRevenue, reasonCodes);
  score += scoreTenure(tenure, reasonCodes);

  score = clamp(score, SCORE.MIN, SCORE.MAX);

  const approved = score >= SCORE.APPROVE_MIN;

  return {
    creditScore: score,
    approved,
    decision: approved ? 'Approved' : 'Rejected',
    reasonCodes: [...new Set(reasonCodes)],
    estimatedEMI: calculateEMI(loanAmount, tenure),
  };
}

module.exports = { runDecisionEngine };
