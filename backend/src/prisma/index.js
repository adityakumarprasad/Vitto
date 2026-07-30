// ============================================================
// prisma/index.js – Re-export the shared Prisma client
// Keeps a clear "prisma" module under src/ as expected.
// ============================================================

const { prisma } = require('../config/database');

module.exports = prisma;
