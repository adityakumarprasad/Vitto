// ============================================================
// businessRoutes.js – Routes for /api/business
// ============================================================

const express = require('express');
const businessController = require('../controllers/businessController');
const { createBusinessRules } = require('../validators/businessValidator');
const validate = require('../middlewares/validate');

const router = express.Router();

// POST /api/business
router.post('/', createBusinessRules, validate, businessController.createBusiness);

module.exports = router;
