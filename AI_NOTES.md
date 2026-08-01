#AI_NOTES.MD

#AI Colabration Notes.

## 1. Code Generated/Suggestions By AI:
   - Created intial Rest Api Project Boilerplate using Node.js and Express.js.
   - Generated the initial middleware setup (`asyncHandler.js`, `errorHandler.js`, `notFound.js`).
   - Generated the File based Data handling utilty Functions.
   - Used AI To Find Edges Cases missed in `addExpense()` function and helped me to fix them (date validation, white space only strings, amount is 0).
   - Used AI Suggestion to integrate category filtering in `getAllExpenses()` instead of seperate route.
   - AI helped identify an issue where data from previous test executions persisted in the JSON file, causing subsequent tests to fail. (fix: clearing the test data file before each test using `beforeEach()`).
   - Used AI Support and Suggestion for `README.md`.
   

## 2. Code Written By Me:
   - `app.js` , `server.js`.
   - `./routes/expenseRoutes.js`.
   - `./controllers/expenseController.js` skeleton.
   - Implemented addExpense() with validations (non numeric, negative ammount, empty strings, invalid strings).
   - Created Set of Test's for POST /api/expenses endpoint.
   - Implemented `getAllExpenses()` with category filtering.
   - Created Set of Test's for GET /api/expenses endpoint.
   - Implemented `getTotalExpenses()` with category based Support.
   - Created Set of Test's for GET /api/expenses/total endpoint.
   - Implemented `deleteExpense()`.
   - Created Set of Test's for DELETE /api/expenses/:id endpoint.

## 3. Code Suggestions Rejected By Me:
   - Usage of Custom Error class for standard API errors (Instead used simple Error object and error handler middleware).



    



