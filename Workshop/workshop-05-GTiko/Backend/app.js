const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const COLLECTION_NAME = "departments";

app.use(express.json());
app.listen(3000, () => {
  console.log("connected on 3000...");
});

app.use(
  cors()
);

let db = null;
async function connectDB() {
  try {
    const uri =
      "mongodb+srv://user:root@cluster0.jxhwpwk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("CS571");
    console.log("DB connected...");
  } catch (error) {
    console.log("DB connection error...");
  }
}
connectDB();

app.put("/departments/:department_code/courses", async (req, res) => {
  try {
    const { department_code } = req.params;
    let obj = { _id: new ObjectId(), ...req.body }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { code: parseInt(department_code) },
      { $push: { courses: obj } }
    )
    console.log("department successfully");
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
})

app.get("/departments/:department_code/courses", async (req, res) => {
  try {
    const { department_code } = req.params;
    console.log("getting data")
    const result = await db.collection(COLLECTION_NAME).findOne(
      { code: parseInt(department_code) })
    res.send(result)
    return result
  } catch (error) {
    console.log(error.message)
    res.send(error.message)
  }
})

app.post("/departments/:department_code/courses", async (req, res) => {
  try {
    const { department_code } = req.params;
    let obj = { _id: new ObjectId(), ...req.body }
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { code: parseInt(department_code) },
      { $push: { courses: obj } }
    )
    console.log("Added successfully");
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
})

app.patch("/departments/:department_code/courses/:course_code", async (req, res) => {
  try {
    const { department_code, course_code } = req.params;

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { code: parseInt(department_code) },
      {
        $set:
        {
          "courses.$[c].title": req.body.title,
          "courses.$[c].faculty": req.body.faculty
        }
      },
      { arrayFilters: [{ "c.code": course_code }] }
    )
    console.log(result);
    return res.send(result);

  } catch (error) {
    res.send(error.message);
  }
})


app.delete("/departments/:department_code/courses/:course_code", async (req, res) => {
  try {
    const { department_code, course_code } = req.params;
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { code: parseInt(department_code) },
      { $pull: { courses: { code: course_code } } }
    )
    console.log(result);

    res.send(result);
    return result;
  } catch (error) {
    res.send(error.message)
  }
})

app.patch("/departments/:department_code/courses/:course_code/reviews", async (req, res) => {
  try {
    const { department_code, course_code } = req.params;

    const review = { _id: new ObjectId(), 
      name: req.body.name, rating: req.body.rating, comment: req.body.comment }

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { code: parseInt(department_code), "courses.code": course_code },
      {
        $set: { "courses.$.rating": req.body.aveRating },
        $push: { "courses.$.reviews": review }
      }
    );
    console.log(result);
    
    res.send("ok");
  } catch (error) {
    res.send(error.message);
  }
});
