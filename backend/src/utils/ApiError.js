// ============================================================
// ApiError.js – Custom error class for structured API errors
// Controllers / services throw this; the global handler formats it.
// ============================================================

class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e. for 400, 404, 500)
   * @param {string} message - Human-readable error message
   * @param {Array} errors - Optional list of field-level validation errors
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    // Keep the original stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
