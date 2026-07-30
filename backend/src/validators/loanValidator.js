// ============================================================
// loanValidator.js – express-validator rules for Loan
// ============================================================

const { body } = require('express-validator');
const { LOAN_PURPOSES } = require('../config/constants');

const createLoanRules = [
  body('businessId')
    .trim()
    .notEmpty()
    .withMessage('businessId is required')
    .isUUID()
    .withMessage('businessId must be a valid UUID'),

  body('loanAmount')
    .notEmpty()
    .withMessage('Loan amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Loan amount must be a positive number'),

  body('tenure')
    .notEmpty()
    .withMessage('Tenure is required')
    .isInt({ min: 6, max: 120 })
    .withMessage('Tenure must be between 6 and 120 months'),

  body('purpose')
    .trim()
    .notEmpty()
    .withMessage('Loan purpose is required')
    .isIn(LOAN_PURPOSES)
    .withMessage(`Purpose must be one of: ${LOAN_PURPOSES.join(', ')}`),
];

module.exports = { createLoanRules };
