# Expense Tracker REST API

A REST API for managing personal expenses built with **Node.js**, **Express.js**, **Jest**, and **Docker**.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Run the test suite
npm test
```

---

## Features

- Create, retrieve, filter, summarize, and delete expenses
- Persistent JSON file storage
- Input validation and error handling
- Automated API testing with Jest and Supertest
- Docker support

---

## Installation

### Clone the repository

```bash
git clone https://github.com/praveenkumarkunchala2005/expenseTracker.git
cd expenseTracker
```

### Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=5005
NODE_ENV=development
DATA_FILE_PATH=./data/expenses.json
```

---

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will be available at:

```
http://localhost:5005
```

---

## Docker

Build the Docker image:

```bash
docker build -t expense-tracker-api .
```

Run the container:

```bash
docker run -p 5005:5005 expense-tracker-api
```

---

## Running Tests

Run the automated test suite:

```bash
npm test
```

The test suite covers:

- Health check endpoint
- Expense creation and validation
- Fetching all expenses
- Filtering expenses by category
- Expense total calculation
- Expense deletion
- Error handling

---

## API Reference

| Method | Endpoint | Description |
| :----: | :------- | :---------- |
| `GET` | `/api/health` | Check if the API is running. |
| `POST` | `/api/expenses` | Create a new expense. |
| `GET` | `/api/expenses` | Retrieve all expenses or filter by category. |
| `GET` | `/api/expenses/total` | Retrieve the total expenses overall or for a specific category. |
| `DELETE` | `/api/expenses/:id` | Delete an expense by its unique ID. |

### Query Parameters

| Endpoint | Parameter | Description |
| :------- | :-------- | :---------- |
| `/api/expenses` | `category` *(optional)* | Returns expenses for the specified category (case-insensitive). |
| `/api/expenses/total` | `category` *(optional)* | Returns the total amount spent for the specified category. If omitted, returns the overall total. |

### Response Codes

| Status Code | Description |
| :---------: | :---------- |
| `200 OK` | Request completed successfully. |
| `201 Created` | Expense created successfully. |
| `400 Bad Request` | Invalid or missing request data. |
| `404 Not Found` | Requested resource was not found. |
| `500 Internal Server Error` | Unexpected server error. |

---

## Example Requests

### Health Check

```bash
curl http://localhost:5005/api/health
```

Response:

```json
{
  "success": true,
  "status": "OK"
}
```

---

### Create Expense

```bash
curl -X POST http://localhost:5005/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dinner with friends",
    "amount": 45.50,
    "category": "Food",
    "date": "2026-08-01"
  }'
```

Response:

```json
{
  "success": true,
  "message": "Expense added successfully.",
  "expense": {
    "id": "cf9a24cf-768d-429b-920c-1f396484c27e",
    "title": "Dinner with friends",
    "amount": 45.5,
    "category": "Food",
    "date": "2026-08-01"
  }
}
```

---

### Get Expenses

```bash
curl "http://localhost:5005/api/expenses"
```

Filter by category:

```bash
curl "http://localhost:5005/api/expenses?category=food"
```

---

### Get Total Expenses

```bash
curl "http://localhost:5005/api/expenses/total"
```

Category-wise total:

```bash
curl "http://localhost:5005/api/expenses/total?category=food"
```

---

### Delete Expense

```bash
curl -X DELETE http://localhost:5005/api/expenses/<expense-id>
```