const { error } = require("console");
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
const COLLECTION_NAME = "schools";

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

// add new teacher
app.post("/schools/:schoolId/teachers", async (req, res) => {
  try {
    const { schoolId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(schoolId) },
        { $push: { teachers: req.body } },
        { upsert: true }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// update teacher
app.patch("/schools/:schoolId/teachers/:teacherId", async (req, res) => {
  try {
    const { schoolId, teacherId } = req.params;
    const { name } = req.body;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(schoolId), "teachers._id": parseInt(teacherId) },
        { $set: { "teachers.$.name": name } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// delete teacher
app.delete("/schools/:schoolId/teachers/:teacherId", async (req, res) => {
  try {
    const { schoolId, teacherId } = req.params;
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: parseInt(schoolId), "teachers._id": parseInt(teacherId) },
        { $pull: { teachers: { _id: parseInt(teacherId) } } }
      );
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});


// add courses
app.put("/schools/:schoolId/courses", async (req, res)=>{
    try {
        const {schoolId} = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id: parseInt(schoolId)},
            {$addToSet : {courses: req.body} }
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})


// add new student
app.put("/schools/:schoolId/courses/:courseId/students", async (req, res)=>{
    try {
        const {schoolId, courseId} = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id: parseInt(schoolId), "courses._id": parseInt(courseId)},
            { $addToSet : {"courses.$.students":req.body}}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});


// Update a student's name
app.patch("/schools/:schoolId/courses/:courseId/students/:studentId", async (req, res)=>{
    try {
        const {schoolId, courseId, studentId} = req.params;
        const {name} = req.body;

        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id: parseInt(schoolId)},
            {$set: {"courses.$[c].students.$[s].name" : name }},
            {arrayFilters : [{"c._id": parseInt(courseId)}, {"s._id": parseInt(studentId)}]}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})

// Delete a student
app.delete("/schools/:schoolId/courses/:courseId/students/:studentId", async (req, res)=>{
    try {
        const {schoolId, courseId, studentId} = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            {_id: parseInt(schoolId)},
            {$pull: {"courses.$[c].students" : {_id:  parseInt(studentId)} }},
            {arrayFilters : [{"c._id": parseInt(courseId)}]}
        )
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})


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
