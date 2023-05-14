const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());

const COLLECTION_NAME = "products";

let db = null;
async function connectDB() {
  let uri =
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
    console.log("DB error...");
  }
}

main();

app.listen(3000, () => {
  console.log("connected on 3000...");
});

// add products
app.post("/products", async (req, res) => {
  try {
    const result = await db.collection(COLLECTION_NAME).insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// update name of property
app.put("/products/:productId/:propertiesId", async (req, res) => {
  try {
    const { productId, propertiesId } = req.params;
    const { name } = req.body;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(productId), "properties._id": parseInt(propertiesId) },
        { $set: { "properties.$.name": name } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// add new property
app.patch("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const id = Number(productId);
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: id }, { $push: { properties: req.body } });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// update color
app.patch("/products/:productId/:propertiesId", async (req, res) => {
  try {
    const { productId, propertiesId } = req.params;
    const { color } = req.body;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(productId), "properties._id": parseInt(propertiesId) },
        { $set: { "properties.$.color": color } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// delete property
app.delete("/products/:productId/:propertiesId", async (req, res) => {
  try {
    const { productId, propertiesId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(productId), "properties._id": parseInt(propertiesId) },
        { $pull: { properties: { _id: parseInt(propertiesId) } } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// error handler....
app.use((req, res) => {
  res.send("API not supported");
});

app.use((error, req, res) => {
  if (error && error.message) {
    res.send(error.message);
  } else {
    res.send("Backend error");
  }
});
