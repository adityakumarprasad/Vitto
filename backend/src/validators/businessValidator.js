// ============================================================
// businessValidator.js – express-validator rules for Business
// ============================================================

const { body } = require('express-validator');
const { BUSINESS_TYPES } = require('../config/constants');
const { PAN_REGEX } = require('../utils/panValidator');

const createBusinessRules = [
  body('ownerName')
    .trim()
    .notEmpty()
    .withMessage('Owner name is required')
    .isLength({ min: 3 })
    .withMessage('Owner name must be at least 3 characters'),

  body('pan')
    .trim()
    .notEmpty()
    .withMessage('PAN is required')
    .customSanitizer((value) => String(value).toUpperCase())
    .matches(PAN_REGEX)
    .withMessage('PAN must match format ABCDE1234F'),

  body('businessType')
    .trim()
    .notEmpty()
    .withMessage('Business type is required')
    .isIn(BUSINESS_TYPES)
    .withMessage(`Business type must be one of: ${BUSINESS_TYPES.join(', ')}`),

  body('monthlyRevenue')
    .notEmpty()
    .withMessage('Monthly revenue is required')
    .isFloat({ gt: 0 })
    .withMessage('Monthly revenue must be a positive number'),
];

module.exports = { createBusinessRules };
