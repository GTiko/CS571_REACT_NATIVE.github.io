const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.listen(3000, ()=>{console.log("connected on 3000...")})
const COLLECTION_NAME = "PRODUCT_PRACTICE"

let db = null;
async function connectDB() {
  try {
    let uri =
      "mongodb+srv://user:root@cluster0.jxhwpwk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
     client.connect();
    db = client.db("CS577");
    console.log("DB connected...");
  } catch (error) {
    console.log("Db connection error.....");
  }
}

connectDB();

// * Insert a new product
app.post("/products", async (req, res)=>{
    try {
        const result = await db.collection(COLLECTION_NAME).insertOne(req.body);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})

// * Update the name of a product by _id
app.patch("/products/:productId", async(req, res)=>{
    try {
        const {productId} = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id : parseInt(productId)},
            {$set : {name:req.body.name}}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})


// * Add a new property
app.put("/products/:productId/properties", async (req, res)=>{
    try {
        const {productId} = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id : parseInt(productId)},
            {$push : {properties:req.body}}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})

// * Update the color of a properties by _id
app.patch("/products/:productId/properties/:propertyId", async(req, res)=>{
    try {
        const { productId , propertyId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id: parseInt(productId)},
            { $set: {"properties.$[p].color":req.body.color}},
            {arrayFilters: [{"p._id":parseInt(propertyId)}]}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})

// * Delete a property by _id
app.delete("/products/:productId/properties/:propertyId", async(req, res)=>{
    try {
        const { productId , propertyId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(productId)},
            { $pull: { properties: { _id: parseInt(propertyId)}}}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})


// Error handler
app.use((req, res)=>{
    res.send("AIP not supported")
})

app.use((error,req, res)=>{
    if(error && error,message){
        res.send(error.message)
    }else{
        res.send("Backend error...")
    }
})