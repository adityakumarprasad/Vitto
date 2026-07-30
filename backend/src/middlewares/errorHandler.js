// ============================================================
// errorHandler.js – Global Express error middleware
// Converts any thrown error into a structured JSON response.
// ============================================================

const env = require('../config/env');

/**
 * Final error handler – must be registered AFTER all routes.
 */
function errorHandler(err, req, res, next) {
  // Default values for unexpected errors
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Prisma known request errors (e.g. record not found)
  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors || {}).map((e) => e.message);
  }

  // Log unexpected server errors for debugging
  if (statusCode >= 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Only expose stack traces in development
    ...(env.isDev && { stack: err.stack }),
  });
}

module.exports = errorHandler;
