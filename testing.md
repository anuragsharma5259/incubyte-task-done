🧪 Testing & TDD Approach

This project uses Jest + Supertest for API testing.
While developing the backend, I followed the TDD (Test-Driven Development) workflow:

1️⃣ RED — Write a failing test

I first wrote a test for the root API route (GET /) inside src/__tests__/root.test.js

The test initially expected a wrong status code intentionally so it failed

This creates the RED phase and confirms the test is actually validating behavior

Example:

expect(res.status).toBe(201); // intentional fail

2️⃣ GREEN — Make the test pass

I updated the expected value to the correct one (200)

After fixing, I ran tests again and ensured everything passed

This is the GREEN phase

expect(res.status).toBe(200);

3️⃣ REFACTOR — Improve code without changing behavior

After ensuring tests passed, I refactored the src/app.js file

I extracted the repeated API response into a constant (API_INFO)

Test still passed, confirming refactor didn’t break behavior

app.get('/', (req, res) => res.json(API_INFO));

✔ Result

The commit history clearly shows:

test: add failing root route test (red)

feat: fix root route test to pass (green)

refactor: clean root route using API_INFO constant (refactor)

This demonstrates a complete TDD cycle on a real endpoint.

🧪 Test Commands

Run all tests:

npm test


The test script uses ESM-compatible Jest runner:

node --experimental-vm-modules ./node_modules/jest/bin/jest.js

🧰 Tools Used for Testing
Tool	Purpose
Jest	Test runner
Supertest	API endpoint testing (no need to start server)
ESM (type: module)	For modern JavaScript import/export
app.js	Express app isolated for testing without DB connection
📌 What This Achieves

Ensures API routes work as expected

Guarantees no refactor breaks functionality

Shows real TDD discipline with proper commit history

Tests run fast because server and DB are not started during testing

Clear separation of app.js (for tests) and server.js (for production)
