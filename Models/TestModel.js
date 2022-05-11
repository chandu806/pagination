const mongoose = require('mongoose')

const testModel = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true, default: "male" },
    age: { type: Number, required: true, default: 21 }

}, {
    versionKey: false
})

module.exports = mongoose.model("test", testModel)