// ============================================================
// decisionService.js – Async decision processing + polling
// Creates a "processing" record, then finishes in the background.
// ============================================================

const dayjs = require('dayjs');
const DecisionHistory = require('../models/DecisionHistory');
const ApiError = require('../utils/ApiError');
const env = require('../config/env');
const { DECISION_STATUS } = require('../config/constants');
const { getBusinessById } = require('./businessService');
const { getLoanById } = require('./loanService');
const { runDecisionEngine } = require('./decisionEngine');

/**
 * Background job: wait, run engine, update MongoDB record.
 */
async function processDecisionInBackground(decisionId, business, loan, startedAt) {
  try {
    // Simulate background / async processing delay
    await new Promise((resolve) => setTimeout(resolve, env.decisionDelayMs));

    const result = runDecisionEngine({
      pan: business.pan,
      monthlyRevenue: business.monthlyRevenue,
      loanAmount: loan.loanAmount,
      tenure: loan.tenure,
    });

    const processingTime = dayjs().diff(dayjs(startedAt));

    await DecisionHistory.findByIdAndUpdate(decisionId, {
      creditScore: result.creditScore,
      approved: result.approved,
      decision: result.decision,
      reasonCodes: result.reasonCodes,
      estimatedEMI: result.estimatedEMI,
      status: DECISION_STATUS.COMPLETED,
      processingTime,
    });
  } catch (err) {
    console.error('Background decision failed:', err.message);
    await DecisionHistory.findByIdAndUpdate(decisionId, {
      status: DECISION_STATUS.FAILED,
      errorMessage: err.message,
      processingTime: dayjs().diff(dayjs(startedAt)),
    });
  }
}

/**
 * Start a new decision: validate IDs, create audit row, kick off async job.
 */
async function startDecision({ businessId, loanId }) {
  const business = await getBusinessById(businessId);
  const loan = await getLoanById(loanId);

  // Loan must belong to the given business
  if (loan.businessId !== business.id) {
    throw new ApiError(400, 'Loan does not belong to the given business', [
      { field: 'loanId', message: 'DATA_INCONSISTENCY' },
    ]);
  }

  const startedAt = new Date();

  // Create audit trail entry in "processing" state
  const history = await DecisionHistory.create({
    businessId: business.id,
    loanId: loan.id,
    ownerName: business.ownerName,
    pan: business.pan,
    status: DECISION_STATUS.PROCESSING,
  });

  // Fire-and-forget background processing (do not await)
  processDecisionInBackground(history._id, business, loan, startedAt);

  return {
    id: history._id.toString(),
    status: DECISION_STATUS.PROCESSING,
    message: 'Decision is being processed',
  };
}

/**
 * Get a decision by MongoDB id (used for frontend polling).
 */
async function getDecisionById(id) {
  const history = await DecisionHistory.findById(id);

  if (!history) {
    throw new ApiError(404, 'Decision not found');
  }

  return {
    id: history._id.toString(),
    businessId: history.businessId,
    loanId: history.loanId,
    ownerName: history.ownerName,
    pan: history.pan,
    status: history.status,
    success: history.status === DECISION_STATUS.COMPLETED,
    creditScore: history.creditScore,
    decision: history.decision,
    approved: history.approved,
    reasonCodes: history.reasonCodes,
    estimatedEMI: history.estimatedEMI,
    processingTime: history.processingTime,
    errorMessage: history.errorMessage,
    createdAt: history.createdAt,
  };
}

module.exports = {
  startDecision,
  getDecisionById,
};
