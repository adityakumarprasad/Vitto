// ============================================================
// historyController.js – HTTP handlers for /api/history
// ============================================================

const asyncHandler = require('../utils/asyncHandler');
const historyService = require('../services/historyService');

/**
 * GET /api/history – paginated audit history with optional search
 */
const getHistory = asyncHandler(async (req, res) => {
  const result = await historyService.getHistory({
    page: req.query.page,
    limit: req.query.limit,
    pan: req.query.pan,
    owner: req.query.owner,
  });

  res.status(200).json({
    success: true,
    data: result.items,
    pagination: result.pagination,
  });
});

module.exports = { getHistory };
