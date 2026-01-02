require("dotenv").config()
const express = require("express");
const app = express();
const port = 3307;

const dbConnection = require("./db/dbConfig")
const questionRoute = require('./routes/questionRoute')
const userRoute = require("./routes/userRoute");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json())

app.use("/api/users", userRoute)
app.use("/api/questions", authMiddleware, questionRoute)

async function start() {
    try {
        const result = await dbConnection.execute("select 'test' ")
        await app.listen(port)
        console.log(`database connection successful`)
        console.log("http://localhost:3307")
    } catch (error) {
    console.log(error.message)
    }
}
start();
