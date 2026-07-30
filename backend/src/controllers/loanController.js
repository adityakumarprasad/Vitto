// ============================================================
// loanController.js – HTTP handlers for /api/loan
// ============================================================

const asyncHandler = require('../utils/asyncHandler');
const loanService = require('../services/loanService');

/**
 * POST /api/loan – create a loan application
 */
const createLoan = asyncHandler(async (req, res) => {
  const loan = await loanService.createLoan(req.body);

  res.status(201).json({
    success: true,
    message: 'Loan application created successfully',
    data: loan,
  });
});

module.exports = { createLoan };
