const asyncHandler = require('../middlewares/asyncHandler');

const addExpense = asyncHandler(async (req,res)=>{
  res.sendStatus('501');
});

const getAllExpenses = asyncHandler(async (req,res)=>{
  res.sendStatus('501');
});

const getExpensesBasedOnCategory = asyncHandler(async (req,res)=>{
  res.sendStatus('501');
});

const getTotalExpenses = asyncHandler(async (req,res)=>{
    res.sendStatus('501');
});

const deleteExpense = asyncHandler(async (req,res)=>{
  res.sendStatus('501');
});


module.exports = {addExpense, getAllExpenses,getExpensesBasedOnCategory, getTotalExpenses, deleteExpense};