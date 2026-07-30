// ============================================================
// validate.js – Run express-validator checks and return errors
// Place after validation chains in a route definition.
// ============================================================

const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Middleware that checks validation results from express-validator.
 * If any field failed, respond with 400 and a list of field errors.
 */
function validate(req, res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  // Build a clean list of { field, message } objects
  const errors = result.array().map((item) => ({
    field: item.path,
    message: item.msg,
  }));

  next(new ApiError(400, 'Validation failed', errors));
}

module.exports = validate;
