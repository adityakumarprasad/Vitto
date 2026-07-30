// ============================================================
// loanRoutes.js – Routes for /api/loan
// ============================================================

const express = require('express');
const loanController = require('../controllers/loanController');
const { createLoanRules } = require('../validators/loanValidator');
const validate = require('../middlewares/validate');

const router = express.Router();

// POST /api/loan
router.post('/', createLoanRules, validate, loanController.createLoan);

module.exports = router;
