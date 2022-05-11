const express = require('express');
const router = express.Router()
const Test = require("../Models/Test.model")
const { body, validationResult } = require('express-validator');
const transporter = require("../Mail")


router.get("/", async (req, res) => {
    try {
        const { page = 1, size = 3 } = req.query
        const offset = (page - 1) * size
        var item = await Test.find().skip(offset).limit(size)

        let totalPages = Math.ceil((await Test.find().countDocuments()) / size)
        res.status(200).json({ data: { item, totalPages } })

    }
    catch (err) {
        console.log(err)
    }
})
router.post("/",
    body("firstname").isLength({ min: 3, max: 10 }).withMessage("Please Enter the name of min length 3 and max length 10"),
    body("lastname").isLength({ min: 3, max: 10 }).withMessage("Please Enter the lastname of min length 3 and max length 10"),
    body("email").isEmail().withMessage("Please Enter The valid Email"),
    body("age").isFloat({ min: 1, max: 120 }).withMessage("please add valid age"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const createUser = await Test.create(req.body)


            

            let info1 = await transporter.sendMail({
                from: "daanechandu@gmail.com", // sender address
                to: ["customer@gmail.com","customer2@gmail.com","customer3@gmail.com","customer3@gmail.com" ,"customer4@gmail.com","customer5@gmail.com"], // list of receivers
                subject: `${createUser.firstname} ${createUser.lastname} has registered with us`, // Subject line
                text: `Please Welcome ${createUser.firstname} ${createUser.lastname}`, // plain text body
                html: "<b>Hello world?</b>", // html body
            })

            res.status(201).send("registration email send")

        }
        catch (err) {
            console.log(err)
        }
    })
module.exports = router