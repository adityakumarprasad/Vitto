// ============================================================
// database.js – Prisma client for PostgreSQL
// One shared client instance is reused across the whole app.
// ============================================================

const { PrismaClient } = require('@prisma/client');
const env = require('./env');

// Create a single Prisma client (avoids too many DB connections)
const prisma = new PrismaClient({
  log: env.isDev ? ['error', 'warn'] : ['error'],
});

/**
 * Connect to PostgreSQL and verify the connection works.
 */
async function connectPostgres() {
  await prisma.$connect();
  console.log('PostgreSQL connected via Prisma');
}

/**
 * Gracefully disconnect Prisma when the server shuts down.
 */
async function disconnectPostgres() {
  await prisma.$disconnect();
  console.log('PostgreSQL disconnected');
}

module.exports = {
  prisma,
  connectPostgres,
  disconnectPostgres,
};
