// ============================================================
// dashboardController.js – HTTP handlers for /api/dashboard
// ============================================================

const asyncHandler = require('../utils/asyncHandler');
const dashboardService = require('../services/dashboardService');

/**
 * GET /api/dashboard – summary cards + chart datasets
 */
const getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardData();

  res.status(200).json({
    success: true,
    data,
  });
});

module.exports = { getDashboard };
