// ============================================================
// routes/index.js – Mount all API route modules under /api
// ============================================================

const express = require('express');
const businessRoutes = require('./businessRoutes');
const loanRoutes = require('./loanRoutes');
const decisionRoutes = require('./decisionRoutes');
const historyRoutes = require('./historyRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = express.Router();

// Health check – useful for Docker / load balancers
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'MSME Lending API is healthy' });
});

router.use('/business', businessRoutes);
router.use('/loan', loanRoutes);
router.use('/decision', decisionRoutes);
router.use('/history', historyRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
