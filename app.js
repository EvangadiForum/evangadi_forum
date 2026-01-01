const express = require("express");
const app = express();
const port = 3307;

const userRoute = require("./routes/userRoute")
app.use("/api/users", userRoute)

app.listen(port, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log(`Listening on ${port}`)
        console.log("http://localhost:3307")
    }
})