const nodemailer = require("nodemailer");
const nodeMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  //connect the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "natalia.kirlin@ethereal.email",
      pass: "beH9H3xnJ3CgwagFG4",
    },
  });
  let info = await transporter.sendMail({
    from: '"Sanjay Gogiya 👻" <natalia.kirlin@ethereal.email>', // sender address
    to: "sanjaygogiya123@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);

  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = nodeMail;
