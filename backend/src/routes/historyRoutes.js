// ============================================================
// historyRoutes.js – Routes for /api/history
// ============================================================

const express = require('express');
const historyController = require('../controllers/historyController');
const { historyQueryRules } = require('../validators/decisionValidator');
const validate = require('../middlewares/validate');

const router = express.Router();

// GET /api/history
router.get('/', historyQueryRules, validate, historyController.getHistory);

module.exports = router;
