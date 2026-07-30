// ============================================================
// businessController.js – HTTP handlers for /api/business
// Controllers stay thin; business logic lives in services.
// ============================================================

const asyncHandler = require('../utils/asyncHandler');
const businessService = require('../services/businessService');

/**
 * POST /api/business – create a new business profile
 */
const createBusiness = asyncHandler(async (req, res) => {
  const business = await businessService.createBusiness(req.body);

  res.status(201).json({
    success: true,
    message: 'Business created successfully',
    data: business,
  });
});

module.exports = { createBusiness };
