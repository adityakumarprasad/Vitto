// ============================================================
// DecisionHistory.js – Mongoose model for audit trail
// Every lending decision is stored here for history & analytics.
// ============================================================

const mongoose = require('mongoose');
const { DECISION_STATUS } = require('../config/constants');

const decisionHistorySchema = new mongoose.Schema(
  {
    // Links back to PostgreSQL records
    businessId: { type: String, required: true, index: true },
    loanId: { type: String, required: true, index: true },

    // Denormalized fields for easy search on the History page
    ownerName: { type: String, required: true, index: true },
    pan: { type: String, required: true, index: true },

    // Decision engine outputs
    creditScore: { type: Number, default: null },
    approved: { type: Boolean, default: null },
    decision: { type: String, default: null },
    reasonCodes: { type: [String], default: [] },
    estimatedEMI: { type: Number, default: null },

    // Async processing fields
    status: {
      type: String,
      enum: Object.values(DECISION_STATUS),
      default: DECISION_STATUS.PROCESSING,
      index: true,
    },
    processingTime: { type: Number, default: null }, // milliseconds
    errorMessage: { type: String, default: null },
  },
  {
    // Automatically add createdAt and updatedAt
    timestamps: { createdAt: true, updatedAt: true },
    collection: 'decision_history',
  }
);

const DecisionHistory = mongoose.model('DecisionHistory', decisionHistorySchema);

module.exports = DecisionHistory;
