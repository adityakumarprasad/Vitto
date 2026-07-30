// ============================================================
// notFound.js – 404 middleware for unknown routes
// ============================================================

const ApiError = require('../utils/ApiError');

/**
 * Runs when no previous route matched the request URL.
 */
function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

module.exports = notFound;
