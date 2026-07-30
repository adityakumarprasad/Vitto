// ============================================================
// app.js – Express application setup (middleware + routes)
// Separated from server.js so tests can import the app alone.
// ============================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const apiRoutes = require('./routes');
const { apiLimiter } = require('./middlewares/rateLimiter');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ---------- Security & parsing middleware ----------
app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------- Request logging ----------
app.use(morgan(env.isDev ? 'dev' : 'combined'));

// ---------- Rate limiting on all /api routes ----------
app.use('/api', apiLimiter);

// ---------- API routes ----------
app.use('/api', apiRoutes);

// ---------- 404 + global error handler (order matters) ----------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
