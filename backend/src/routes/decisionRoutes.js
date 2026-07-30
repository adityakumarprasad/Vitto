// ============================================================
// decisionRoutes.js – Routes for /api/decision
// ============================================================

const express = require('express');
const decisionController = require('../controllers/decisionController');
const {
  createDecisionRules,
  decisionIdRules,
} = require('../validators/decisionValidator');
const validate = require('../middlewares/validate');
const { decisionLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// POST /api/decision – start processing (rate limited)
router.post(
  '/',
  decisionLimiter,
  createDecisionRules,
  validate,
  decisionController.createDecision
);

// GET /api/decision/:id – poll result
router.get('/:id', decisionIdRules, validate, decisionController.getDecision);

module.exports = router;
