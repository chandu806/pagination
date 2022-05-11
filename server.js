const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const usercontroller = require("./Controller/UserController")
const testcontroller = require("./Controller/TestController")

const app = express()
const PORT = 9000
app.use(cors())
app.use(express.json())

app.use("/users", usercontroller)
app.use("/tests", testcontroller)

mongoose.connect('mongodb://localhost:27017/email')
mongoose.connection.once("open", function (ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
});


app.listen((PORT), () => {
    console.log(`Listening at port No ${PORT}`)
})