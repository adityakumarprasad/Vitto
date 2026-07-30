// ============================================================
// server.js – Bootstraps databases and starts the HTTP server
// ============================================================

const app = require('./app');
const env = require('./config/env');
const { connectPostgres, disconnectPostgres } = require('./config/database');
const { connectMongo, disconnectMongo } = require('./config/mongo');

/**
 * Connect DBs then listen for HTTP requests.
 */
async function startServer() {
  try {
    await connectPostgres();
    await connectMongo();

    const server = app.listen(env.port, () => {
      console.log(`MSME Lending API running on port ${env.port} [${env.nodeEnv}]`);
    });

    // Graceful shutdown on Ctrl+C / container stop
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down...`);
      server.close(async () => {
        await disconnectPostgres();
        await disconnectMongo();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
