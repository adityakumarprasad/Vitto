// ============================================================
// historyService.js – Paginated audit history with search
// ============================================================

const DecisionHistory = require('../models/DecisionHistory');
const { DECISION_STATUS } = require('../config/constants');

/**
 * Build a MongoDB filter from optional PAN / owner search terms.
 */
function buildHistoryFilter({ pan, owner }) {
  const filter = { status: DECISION_STATUS.COMPLETED };

  if (pan) {
    filter.pan = { $regex: pan.trim().toUpperCase(), $options: 'i' };
  }

  if (owner) {
    filter.ownerName = { $regex: owner.trim(), $options: 'i' };
  }

  return filter;
}

/**
 * Return paginated decision history for the History page.
 */
async function getHistory({ page = 1, limit = 10, pan, owner } = {}) {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(50, Math.max(1, Number(limit) || 10));
  const skip = (pageNum - 1) * limitNum;
  const filter = buildHistoryFilter({ pan, owner });

  const [items, total] = await Promise.all([
    DecisionHistory.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    DecisionHistory.countDocuments(filter),
  ]);

  return {
    items: items.map((item) => ({
      id: item._id.toString(),
      businessId: item.businessId,
      loanId: item.loanId,
      ownerName: item.ownerName,
      pan: item.pan,
      creditScore: item.creditScore,
      decision: item.decision,
      approved: item.approved,
      reasonCodes: item.reasonCodes,
      estimatedEMI: item.estimatedEMI,
      processingTime: item.processingTime,
      createdAt: item.createdAt,
    })),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
  };
}

module.exports = { getHistory };
