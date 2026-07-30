// ============================================================
// env.js – Load and expose environment variables safely
// Central place so the rest of the app never reads process.env directly.
// ============================================================

const dotenv = require('dotenv');

// Load variables from the .env file into process.env
dotenv.config();

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/msme_lending',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  // How long the async decision engine "thinks" before finishing
  decisionDelayMs: Number(process.env.DECISION_DELAY_MS) || 3000,
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
};

module.exports = env;
