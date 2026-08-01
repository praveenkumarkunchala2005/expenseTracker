const request = require('supertest');
const app = require('../src/app');

describe('Health Api',()=>{
    test('GET /api/health should return 200', async ()=>{
        const res = await request(app)
            .get('/api/health');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.status).toBe("OK");
    });
});

describe('Add an expense (title, amount, category, date)',()=>{
    test('POST /api/expense should return 201 if details are suffecient and added Succesfully', async()=>{
        const expense = {
            title: "Cloths",
            amount: 1000,
            category: "Fashion",
            date: "2026-01-01"
        };

        const res = await request(app)
            .post("/api/expenses")
            .send(expense);

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Expense added Succesfully");
        expect(res.body.expense).toMatchObject(expense);
    })
});

describe('Add an expense (title, amount, category, date)',()=>{
    test('POST /api/expense should return 400 if data type is not correct', async()=>{
        const expense = {
            title: "Groceries",
            amount: "100",
            category: "Food",
            date: "2022-01-01"
        };

        const res = await request(app)
            .post("/api/expenses")
            .send(expense);

        expect(res.statusCode).toBe(400);
    })
});
describe('Add an expense (title, amount, category, date)',()=>{
    test('POST /api/expense should return 400 if amount is negative', async()=>{
        const expense = {
            title: "Groceries",
            amount: -100,
            category: "Food",
            date: "2022-01-01"
        };

        const res = await request(app)
            .post("/api/expenses")
            .send(expense);

        expect(res.statusCode).toBe(400);
    })
});
describe('Add an expense (title, amount, category, date)',()=>{
    test('POST /api/expense should return 400 if date is invalid', async()=>{
        const expense = {
            title: "Groceries",
            amount: 100,
            category: "Food",
            date: "2022-14-01"
        };

        const res = await request(app)
            .post("/api/expenses")
            .send(expense);

        expect(res.statusCode).toBe(400);
    })
});


describe('Get All Expenses',()=>{
    test('GET /api/expense should return 200', async()=>{
        const res = await request(app)
            .get("/api/expenses");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    })
}); 
describe('Get All Expenses',()=>{
    test('GET /api/expense=fashion should return 200', async()=>{
        const res = await request(app)
            .get("/api/expenses");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    })
}); 
describe('Get All Expenses based on category',()=>{
    test('GET /api/expense?category=fashion should return 200', async()=>{
        const res = await request(app)
            .get("/api/expenses?category=fashion");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    })
}); 
describe('Get Total Expenses',()=>{
    test('GET /api/expenses/total should return 200 and Sum of All Expenses', async()=>{
        const res = await request(app)
            .get("/api/expenses/total");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    })
}); 

describe('Get Total Expenses based on category',()=>{
    test('GET /api/expenses/total?category=fashion should return 200', async()=>{
        const res = await request(app)
            .get("/api/expenses/total?category=fashion");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    })
}); 



