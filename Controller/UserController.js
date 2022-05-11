const express = require('express');
const router = express.Router()
const User = require("../Models/User.model")


router.get("/", async (req, res) => {
    try {
        const { page = 1, size = 3 } = req.query
        const offset = (page - 1) * size
        var item = await User.find().skip(offset).limit(size)

        let totalPages = Math.ceil( (await User.find().countDocuments()) / size)
        res.status(200).json({ data: { item, totalPages } })

    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router