const express = require("express");
const lucasRouter = require("./routers/lucas");
const app = express();
app.use(express.json());

app.listen(3000, () => { console.log("3000 connected ...") })

app.use("/lucas", lucasRouter);

app.use((req, res, next) => {
    res.send("API not supported");
})

app.use((error, req, res, next) => {
    if (error && error.message) {
        res.send(error.message);
    } else {
        res.send("Backend Error...");
    }
})
