// ============================================================
// dashboardService.js – Aggregate stats & chart data
// ============================================================

const dayjs = require('dayjs');
const DecisionHistory = require('../models/DecisionHistory');
const { DECISION_STATUS } = require('../config/constants');

/**
 * Summary cards: totals, approval rate, average credit score.
 */
async function getSummaryStats() {
  const completed = { status: DECISION_STATUS.COMPLETED };

  const [total, approved, rejected, avgResult] = await Promise.all([
    DecisionHistory.countDocuments(completed),
    DecisionHistory.countDocuments({ ...completed, approved: true }),
    DecisionHistory.countDocuments({ ...completed, approved: false }),
    DecisionHistory.aggregate([
      { $match: completed },
      { $group: { _id: null, avgScore: { $avg: '$creditScore' } } },
    ]),
  ]);

  const averageCreditScore = avgResult[0]
    ? Math.round(avgResult[0].avgScore * 10) / 10
    : 0;

  const approvalRate = total > 0 ? Math.round((approved / total) * 1000) / 10 : 0;

  return {
    totalApplications: total,
    approved,
    rejected,
    approvalRate,
    averageCreditScore,
  };
}

/**
 * Pie chart data: approved vs rejected counts.
 */
async function getApprovalBreakdown() {
  const stats = await getSummaryStats();
  return [
    { name: 'Approved', value: stats.approved },
    { name: 'Rejected', value: stats.rejected },
  ];
}

/**
 * Histogram buckets for credit scores (0-20, 21-40, ...).
 */
async function getCreditScoreHistogram() {
  const buckets = [
    { name: '0-20', min: 0, max: 20, count: 0 },
    { name: '21-40', min: 21, max: 40, count: 0 },
    { name: '41-60', min: 41, max: 60, count: 0 },
    { name: '61-80', min: 61, max: 80, count: 0 },
    { name: '81-100', min: 81, max: 100, count: 0 },
  ];

  const docs = await DecisionHistory.find(
    { status: DECISION_STATUS.COMPLETED, creditScore: { $ne: null } },
    { creditScore: 1 }
  ).lean();

  docs.forEach((doc) => {
    const score = doc.creditScore;
    const bucket = buckets.find((b) => score >= b.min && score <= b.max);
    if (bucket) bucket.count += 1;
  });

  return buckets.map(({ name, count }) => ({ name, count }));
}

/**
 * Monthly application counts for the last 6 months.
 */
async function getMonthlyApplications() {
  const start = dayjs().subtract(5, 'month').startOf('month').toDate();

  const rows = await DecisionHistory.aggregate([
    {
      $match: {
        status: DECISION_STATUS.COMPLETED,
        createdAt: { $gte: start },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Build a continuous 6-month series (fill missing months with 0)
  const months = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = dayjs().subtract(i, 'month');
    const found = rows.find(
      (r) => r._id.year === d.year() && r._id.month === d.month() + 1
    );
    months.push({
      name: d.format('MMM YYYY'),
      count: found ? found.count : 0,
    });
  }

  return months;
}

/**
 * Full dashboard payload for the frontend.
 */
async function getDashboardData() {
  const [summary, approvalBreakdown, creditScoreHistogram, monthlyApplications] =
    await Promise.all([
      getSummaryStats(),
      getApprovalBreakdown(),
      getCreditScoreHistogram(),
      getMonthlyApplications(),
    ]);

  return {
    summary,
    charts: {
      approvalBreakdown,
      creditScoreHistogram,
      monthlyApplications,
    },
  };
}

module.exports = { getDashboardData };
