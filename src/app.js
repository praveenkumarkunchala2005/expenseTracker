const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors());
app.use(helmet());

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health route for api to check if it is running safely or not.
app.get('/api/health',(req, res) => {
  res.status(200).json({ success: true, status: 'OK' });
});

app.use('/api/expenses',expenseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;