const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
const COLLECTION_NAME = "NEW SCHOOL";

app.listen(4000, () => {
    console.log("connected on 4000...");
});

let db = null;
async function connectDB() {
    try {
        const uri =
            "mongodb+srv://user:root@cluster0.jxhwpwk.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db("CS577");
        console.log("DB connected...");
    } catch (error) {
        console.log("DB connection error...");
    }
}
connectDB();

app.post("/schools/:schoolId/teachers", async (req, res) => {
    try {
        const { schoolId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $push: { teachers: req.body } },
            { upsert: true }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.patch("/schools/:schoolId/teachers/:teacherId", async (req, res) => {
    try {
        const { schoolId, teacherId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $set: { "teachers.$[t].name": req.body.name } },
            { arrayFilters: [{ "t._id": parseInt(teacherId) }] }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.delete("/schools/:schoolId/teachers/:teacherId", async (req, res) => {
    try {
        const { schoolId, teacherId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $pull: { teachers: { _id: parseInt(teacherId) } } }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.put("/schools/:schoolId/courses", async (req, res) => {
    try {
        const { schoolId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $push: { courses: req.body } }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.put("/schools/:schoolId/courses/:courseId/students", async (req, res) => {
    try {
        const { schoolId, courseId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $push: { "courses.$[c].students": req.body } },
            { arrayFilters: [{ "c._id": parseInt(courseId) }] },
            { upsert: true }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.patch("/schools/:schoolId/courses/:courseId/students/:studentId", async (req, res) => {
    try {
        const { schoolId, courseId, studentId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $set: { "courses.$[c].students.$[s].name": req.body.name } },
            { arrayFilters: [{ "c._id": parseInt(courseId) }, { "s._id": parseInt(studentId) }] }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.delete("/schools/:schoolId/courses/:courseId/students/:studentId", async (req, res) => {
    try {
        const { schoolId, courseId, studentId } = req.params;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: parseInt(schoolId) },
            { $pull: { "courses.$[c].students": { _id: parseInt(studentId) } } },
            { arrayFilters: [{ "c._id": parseInt(courseId) }] }
        );
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

// error handler
app.use((req, res) => {
    res.send("API not supported");
});
app.use((error, req, res) => {
    if (error && error.message) {
        res.send(error.message);
    } else {
        res.send("Backend error...");
    }
});