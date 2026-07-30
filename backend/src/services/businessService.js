// ============================================================
// businessService.js – Business create / read operations
// ============================================================

const { prisma } = require('../config/database');
const ApiError = require('../utils/ApiError');
const { normalizePan } = require('../utils/panValidator');

/**
 * Create a new business record in PostgreSQL.
 */
async function createBusiness(data) {
  const business = await prisma.business.create({
    data: {
      ownerName: data.ownerName.trim(),
      pan: normalizePan(data.pan),
      businessType: data.businessType,
      monthlyRevenue: Number(data.monthlyRevenue),
    },
  });

  return business;
}

/**
 * Find a business by id or throw 404.
 */
async function getBusinessById(id) {
  const business = await prisma.business.findUnique({ where: { id } });

  if (!business) {
    throw new ApiError(404, 'Business not found');
  }

  return business;
}

module.exports = {
  createBusiness,
  getBusinessById,
};
