# MIU-MSD-CS571-2023-05-Workshop01
## MongoDB Rich Documents Workshop
Please find below a schema structure for a bank application, each document has the following structure for `banks` collection:
```JavaScript
{
    "_id":1,
    "name": "BOA",
    "users":[
        {"_id":1, "name": "Michael", "address": "Fairfield, IA", "accounts":[
            {"_id":1, "type": "debit", "number": 123, "routing": 123, "amount": 100},
        ]}
    ]
}
```
Assume that there are two types of account, debit and credit.
Create an Express application that connects to a MongoDB instance (local or cloud service), and write code for the below routes in `app.js` file:
1. Insert a new bank
2. Query all banks
3. Insert a new user
4. Add the address to an existing user using ID
5. Add a new account to an existing user
6. Update an account's balance
7. Delete an account
8. (Optional) List all account information (bank's name, type, number, routing, amount) of a user
9. (Optional) Calculate a total money which a user has in the system

```JavaScript
// Insert a new bank
app.post('/banks', async (req, res) => {

})
// Query banks
app.get('/banks', async (req, res) => {

})
// Insert a user
app.put('/banks/:bankId/users', async (req, res) => {

})
// Update a user's address
app.patch('/banks/:bankId/users/:userId', async (req, res) => {

})
// Add a new account to specific user
// The request body is {"_id":2, "type": "credit", "number": 456, "routing": 456, "amount": 50}
app.put('/banks/:bankId/users/:userId/accounts', async (req, res) => {
})

// Update a account's balance
// The request body is {"amount": 200}
app.patch('/banks/:bankId/users/:userId/accounts/:accountId', async (req, res) => {
})

// Delete a user
app.delete('/banks/:bankId/users/:userId/accounts/:accountId', async (req, res) => {
})
// List all accounts' information of a user: Return list of accounts like ["bank-name": 'BOA', "type": "debit", "number": 123, "routing": 123, "amount": 100}]
app.get('/banks/:bankId/users/:userId/list-accounts', async (req, res) => {
})
// Get total money of a user: Return the balance of the user like {balance: 300}
app.get('/banks/:bankId/users/:userId/balance', async (req, res) => {
})
```
