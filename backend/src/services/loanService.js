// ============================================================
// loanService.js – Loan application create / read operations
// ============================================================

const { prisma } = require('../config/database');
const ApiError = require('../utils/ApiError');
const { getBusinessById } = require('./businessService');

/**
 * Create a loan linked to an existing business.
 * Also enforces: loan amount cannot exceed 100x monthly revenue.
 */
async function createLoan(data) {
  const business = await getBusinessById(data.businessId);
  const loanAmount = Number(data.loanAmount);
  const maxAllowed = business.monthlyRevenue * 100;

  if (loanAmount > maxAllowed) {
    throw new ApiError(
      400,
      `Loan amount cannot exceed 100x monthly revenue (max ${maxAllowed})`
    );
  }

  const loan = await prisma.loan.create({
    data: {
      businessId: business.id,
      loanAmount,
      tenure: Number(data.tenure),
      purpose: data.purpose,
    },
  });

  return loan;
}

/**
 * Find a loan by id (with its business) or throw 404.
 */
async function getLoanById(id) {
  const loan = await prisma.loan.findUnique({
    where: { id },
    include: { business: true },
  });

  if (!loan) {
    throw new ApiError(404, 'Loan not found');
  }

  return loan;
}

module.exports = {
  createLoan,
  getLoanById,
};
