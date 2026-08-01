const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = process.env.DATA_FILE_PATH || path.join(__dirname, '../../data/expenses.json');

/**
 * Reads expenses from JSON file.
 * Returns empty array if file does not exist or fails parsing.
 */
async function readExpenses() {
  try {
    const filePath = path.resolve(DATA_FILE);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Return empty array if file does not exist yet
      return [];
    }
    throw error;
  }
}

/**
 * Writes expenses array to JSON file.
 * @param {Array} expenses
 */
async function writeExpenses(expenses) {
  const filePath = path.resolve(DATA_FILE);
  const dirPath = path.dirname(filePath);
  
  // Ensure directory exists
  await fs.mkdir(dirPath, { recursive: true });
  
  // Write formatted JSON
  await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), 'utf-8');
}

module.exports = {
  readExpenses,
  writeExpenses
};
