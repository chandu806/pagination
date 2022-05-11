const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1634de6252db6a",
      pass: "925638163d443e"
    }
  });

 module.exports=transporter