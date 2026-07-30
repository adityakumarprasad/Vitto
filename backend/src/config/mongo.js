// ============================================================
// mongo.js – Mongoose connection for DecisionHistory audit trail
// ============================================================

const mongoose = require('mongoose');
const env = require('./env');

/**
 * Connect to MongoDB using the URI from environment config.
 */
async function connectMongo() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected via Mongoose');
}

/**
 * Close the MongoDB connection cleanly on shutdown.
 */
async function disconnectMongo() {
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
}

module.exports = {
  connectMongo,
  disconnectMongo,
};
