const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const COLLECTION_NAME = "workShop";

app.listen(4000, () => {
  console.log("connected on 4000...");
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

app.get("/schools/:schoolId/students", async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).find({}).toArray();
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/schools/:schoolId/students", async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

app.delete("/schools/:schoolId/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: parseInt(studentId) });
    res.send(result);
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
