// ============================================================
// emiCalculator.js – Estimate Equated Monthly Installment (EMI)
// Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
// ============================================================

const { DEFAULT_ANNUAL_RATE } = require('../config/constants');

/**
 * Calculate estimated EMI for a loan.
 * @param {number} principal - Loan amount
 * @param {number} tenureMonths - Tenure in months
 * @param {number} annualRate - Annual interest rate (default 12%)
 * @returns {number} Round EMI amount
 */
function calculateEMI(principal, tenureMonths, annualRate = DEFAULT_ANNUAL_RATE) {
  if (!principal || !tenureMonths || principal <= 0 || tenureMonths <= 0) {
    return 0;
  }

  // Convert annual rate to monthly rate
  const monthlyRate = annualRate / 12;

  // If interest is zero, EMI is just principal / months
  if (monthlyRate === 0) {
    return Math.round(principal / tenureMonths);
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);

  return Math.round(emi);
}

module.exports = { calculateEMI };
