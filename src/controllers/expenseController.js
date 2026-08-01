const { randomUUID } = require('crypto');
const asyncHandler = require('../middlewares/asyncHandler');
const { readExpenses, writeExpenses } = require('../utils/fileStorage');

const addExpense = asyncHandler(async (req,res)=>{
  const {title,amount,category,date} = req.body;

  if(!title || !amount || !category || !date){
    const error = new Error("Details Not Sufficent");
    error.statusCode = 400;
    throw error;
  }

  if(amount === undefined || amount === null || typeof amount !== 'number' || isNaN(amount) || amount <= 0){
    const error = new Error("Invalid Amount");
    error.statusCode = 400;
    throw error;
  }

  if(typeof title !== 'string' || !title.trim()){
    const error = new Error("Invalid Title");
    error.statusCode = 400;
    throw error;
  }

  if(typeof category !== 'string' || !category.trim()){
    const error = new Error("Invalid category");
    error.statusCode = 400;
    throw error;
  }

  if(isNaN(Date.parse(date))){
    const error = new Error("Invalid Date");
    error.statusCode = 400;
    throw error;
  }

  const expense = {
    id: randomUUID(),
    title,
    amount,
    category,
    date,
  };

  const data = await readExpenses() || [];
  data.push(expense);
  await writeExpenses(data);
  res.status(201).json({
    success: true,
    message: "Expense added Succesfully",
    expense: expense
  })
});

const getAllExpenses = asyncHandler(async (req,res)=>{
  res.sendStatus('200');
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