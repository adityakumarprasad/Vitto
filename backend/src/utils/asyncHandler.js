// ============================================================
// asyncHandler.js – Wrap async route handlers
// Catches rejected promises so Express does not crash.
// ============================================================

/**
 * Wraps an async Express handler and forwards errors to next().
 * @param {Function} fn - Async (req, res, next) handler
 * @returns {Function} Express middleware
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
