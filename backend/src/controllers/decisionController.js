// ============================================================
// decisionController.js – HTTP handlers for /api/decision
// ============================================================

const asyncHandler = require('../utils/asyncHandler');
const decisionService = require('../services/decisionService');

/**
 * POST /api/decision – start async decision processing
 */
const createDecision = asyncHandler(async (req, res) => {
  const result = await decisionService.startDecision(req.body);

  res.status(202).json({
    success: true,
    message: result.message,
    data: result,
  });
});

/**
 * GET /api/decision/:id – poll decision status / result
 */
const getDecision = asyncHandler(async (req, res) => {
  const decision = await decisionService.getDecisionById(req.params.id);

  res.status(200).json({
    success: true,
    data: decision,
  });
});

module.exports = {
  createDecision,
  getDecision,
};
