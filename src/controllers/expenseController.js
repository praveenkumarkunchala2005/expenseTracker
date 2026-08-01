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

  return res.status(201).json({
    success: true,
    message: "Expense added Succesfully",
    expense: expense
  })
});

const getExpenses = asyncHandler(async (req,res)=>{
  const {category} = req.query;
  const data = await readExpenses() || [];
  if(category){
    const filteredData = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    return res.status(200).json({
    success: true,
    count: filteredData.length,
    message: "Expenses",
    data: filteredData
  })
  }
  return res.status(200).json({
    success: true,
    count: data.length,
    message: "Expenses",
    data: data
  })
});


const getTotalExpenses = asyncHandler(async (req,res)=>{
  const {category} = req.query;
  const data = await readExpenses() || [];
  if(category){
    const filteredData = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    var total = 0;
    for(var expense of filteredData){
      total += expense.amount;
    }
    total = Number(total.toFixed(2));
    return res.status(200).json({
    success: true,
    message: `Total for category '${category}'`,
    total: total
  })
  }
  var total = 0;
  for(var expense of data){
    total += expense.amount;
  }
  total = Number(total.toFixed(2));
  return res.status(200).json({
    success: true,
    message: "Total Expenses",
    total: total
  })
});

const deleteExpense = asyncHandler(async (req,res)=>{
  res.sendStatus('501');
});


module.exports = {addExpense, getExpenses, getTotalExpenses, deleteExpense};