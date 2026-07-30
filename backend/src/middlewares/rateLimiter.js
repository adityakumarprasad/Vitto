// ============================================================
// rateLimiter.js – Protect APIs from abuse with rate limiting
// ============================================================

const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter:
 * Max 100 requests per 15 minutes per IP.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
    errors: [],
  },
});

/**
 * Stricter limiter for decision submissions:
 * Max 20 decisions per 15 minutes per IP.
 */
const decisionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many decision requests. Please try again later.',
    errors: [],
  },
});

module.exports = {
  apiLimiter,
  decisionLimiter,
};
