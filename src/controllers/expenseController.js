const { readExpenses, writeExpenses } = require('../utils/fileStorage');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @desc    Get all expenses
 * @route   GET /api/expenses
 */
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await readExpenses();
  res.status(200).json({
    success: true,
    count: expenses.length,
    data: expenses
  });
});

/**
 * @desc    Get single expense by ID
 * @route   GET /api/expenses/:id
 */
const getExpenseById = asyncHandler(async (req, res, next) => {
  const expenses = await readExpenses();
  const expense = expenses.find((e) => e.id === req.params.id);

  if (!expense) {
    return next(new ApiError(404, `Expense not found with ID of ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: expense
  });
});

/**
 * @desc    Create a new expense
 * @route   POST /api/expenses
 */
const createExpense = asyncHandler(async (req, res, next) => {
  const { title, amount, category, date } = req.body;

  if (!title || amount === undefined) {
    return next(new ApiError(400, 'Please provide title and amount'));
  }

  const expenses = await readExpenses();

  const newExpense = {
    id: Date.now().toString(),
    title,
    amount: Number(amount),
    category: category || 'General',
    date: date || new Date().toISOString().split('T')[0]
  };

  expenses.push(newExpense);
  await writeExpenses(expenses);

  res.status(201).json({
    success: true,
    data: newExpense
  });
});

/**
 * @desc    Update expense by ID
 * @route   PUT /api/expenses/:id
 */
const updateExpense = asyncHandler(async (req, res, next) => {
  const { title, amount, category, date } = req.body;
  const expenses = await readExpenses();

  const index = expenses.findIndex((e) => e.id === req.params.id);

  if (index === -1) {
    return next(new ApiError(404, `Expense not found with ID of ${req.params.id}`));
  }

  const existing = expenses[index];
  const updatedExpense = {
    ...existing,
    ...(title !== undefined && { title }),
    ...(amount !== undefined && { amount: Number(amount) }),
    ...(category !== undefined && { category }),
    ...(date !== undefined && { date })
  };

  expenses[index] = updatedExpense;
  await writeExpenses(expenses);

  res.status(200).json({
    success: true,
    data: updatedExpense
  });
});

/**
 * @desc    Delete expense by ID
 * @route   DELETE /api/expenses/:id
 */
const deleteExpense = asyncHandler(async (req, res, next) => {
  const expenses = await readExpenses();
  const index = expenses.findIndex((e) => e.id === req.params.id);

  if (index === -1) {
    return next(new ApiError(404, `Expense not found with ID of ${req.params.id}`));
  }

  const deletedExpense = expenses.splice(index, 1)[0];
  await writeExpenses(expenses);

  res.status(200).json({
    success: true,
    data: deletedExpense
  });
});

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};
