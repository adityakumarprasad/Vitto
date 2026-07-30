// ============================================================
// decisionValidator.js – express-validator rules for Decision
// ============================================================

const { body, param, query } = require('express-validator');

const createDecisionRules = [
  body('businessId')
    .trim()
    .notEmpty()
    .withMessage('businessId is required')
    .isUUID()
    .withMessage('businessId must be a valid UUID'),

  body('loanId')
    .trim()
    .notEmpty()
    .withMessage('loanId is required')
    .isUUID()
    .withMessage('loanId must be a valid UUID'),
];

const decisionIdRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Decision id is required')
    .isMongoId()
    .withMessage('Decision id must be a valid MongoDB ObjectId'),
];

const historyQueryRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('limit must be 1-50'),
  query('pan').optional().trim().isLength({ max: 10 }),
  query('owner').optional().trim().isLength({ max: 100 }),
];

module.exports = {
  createDecisionRules,
  decisionIdRules,
  historyQueryRules,
};
