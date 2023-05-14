const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
const COLLECTION_NAME = "banks";

app.listen(3000, () => {
  console.log("connected on 3000...");
});

let db = null;
async function connectDB() {
  const uri =
    "mongodb+srv://user:root@cluster0.jxhwpwk.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("CS571");
  console.log("DB connected...");
}

async function main() {
  try {
    await connectDB();
  } catch (error) {
    console.log("DB connection error...");
  }
}

main();

// Insert a new bank
app.post("/banks", async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// Query banks
app.get("/banks", async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).find({}).toArray();
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// Insert a user
app.put("/banks/:bankId/users", async (req, res) => {
  try {
    const { bankId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: parseInt(bankId) }, { $push: { users: req.body } });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// Update a user's address
app.patch("/banks/:bankId/users/:userId", async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(bankId), "users._id": parseInt(userId) },
        { $set: { "users.$.address": req.body.address } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// Add a new account to specific user
// The request body is {"_id":2, "type": "credit", "number": 456, "routing": 456, "amount": 50}
app.put("/banks/:bankId/users/:userId/accounts", async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(bankId), "users._id": parseInt(userId) },
        { $push: { "users.$.accounts": req.body } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// Update a account's balance
// The request body is {"amount": 200}
app.patch(
  "/banks/:bankId/users/:userId/accounts/:accountId",
  async (req, res) => {
    try {
      const { bankId, userId, accountId } = req.params;
      const result = await db.collection(COLLECTION_NAME).updateOne(
        { _id: parseInt(bankId) },
        { $set: { "users.$[u].accounts.$[a].amount": req.body.amount } },
        {
          arrayFilters: [
            { "u._id": parseInt(userId) },
            { "a._id": parseInt(accountId) },
          ],
        }
      );
      res.send(result);
    } catch (error) {
      res.send(error.message);
    }
  }
);

// Delete a user account
app.delete(
  "/banks/:bankId/users/:userId/accounts/:accountId",
  async (req, res) => {
    try {
      const { bankId, userId, accountId } = req.params;
      const result = await db
        .collection(COLLECTION_NAME)
        .updateOne(
          { _id: parseInt(bankId) },
          { $pull: { "users.$[u].accounts": { _id: parseInt(accountId) } } },
          { arrayFilters: [{ "u._id": parseInt(userId) }] }
        );
      res.send(result);
    } catch (error) {
      res.send(error.message);
    }
  }
);

// List all accounts' information of a user: Return list of accounts like
// ["bank-name": 'BOA', "type": "debit", "number": 123, "routing": 123, "amount": 100}]
app.get("/banks/:bankId/users/:userId/list-accounts", async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .find({ _id: parseInt(bankId), "users._id": parseInt(userId) })
      .project({
        _id: false,
        "users._id": false,
        "users.name": false,
        "users.address": false,
      })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// Get total money of a user: Return the balance of the user like {balance: 300}
app.get("/banks/:bankId/users/:userId/balance", async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: parseInt(bankId), "users._id": parseInt(userId) });

// let sum = 0;
// for (let each of result.users) {
//   for (let all of each.accounts) {
//     sum += all.amount;
//   }
// }

    let sum = result.users.reduce((acc, cur) => {
      return cur.accounts.reduce((acc2, cur2) => {
        return acc2 + cur2.amount;
      }, acc);
    }, 0);
    res.send({ balance: sum });
  } catch (error) {
    res.send(error.message);
  }
});

// error handler...
app.use((req, res) => {
  res.send("AIP not supported");
});

app.use((error, req, res) => {
  if (error && error.message) {
    res.send(error.message);
  } else {
    res.send("Backend error...");
  }
});

