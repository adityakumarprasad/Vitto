// ============================================================
// dashboardRoutes.js – Routes for /api/dashboard
// ============================================================

const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

// GET /api/dashboard
router.get('/', dashboardController.getDashboard);

module.exports = router;
