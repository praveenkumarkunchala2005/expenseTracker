const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const expenseRoutes = require('./routes/expenseRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(cors());

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Expense Tracker API is healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/expenses', expenseRoutes);

// Handling 404 Routes
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
