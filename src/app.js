const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("./db/conn");
const Register = require("./models/registerModel");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 8080;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("register");
});
app.get("/secret", (req, res) => {
  res.render("secret");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/register", async (req, res) => {
  try {
    const pwd = req.body.pwd;
    const conpwd = req.body.conpwd;

    if (pwd == conpwd) {
      bcrypt.hash(pwd, 10, async (err, hash) => {
        const studentRegistration = new Register({
          firstname: req.body.firstname,
          gender: req.body.gender,
          phone: req.body.phone,
          email: req.body.email,
          pwd: hash,
          conpwd: conpwd,
        });
        console.log("abc" + studentRegistration);

        const result = await studentRegistration.save();
        console.log("result declared", result);
        res.status(201).render("login", {
          message: "Successfully registered",
        });
      });
    } else {
      res.status(400).send("password is not matching");
    }
  } catch (error) {
    // res.status(400).send(error);
    res.redirect("login");
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;

    const useremail = await Register.findOne({ email: email });

    // console.log("get mail" + useremail);
    // return false;

    const isMatch = await bcrypt.compare(pwd, useremail.pwd);
    console.log("successfully match the record:" + isMatch);

    // console.log("data enter", isMatch);
    // return false;
    if (isMatch) {
      res.status(201).render("secret");
    } else {
      res.status(400).send("password is not matched");
    }
  } catch (error) {
    res.status(400).send("invalid email");
  }
});

app.get("/logout", (req, res) => {
  try {
    res.redirect("login");
    // console.log("show data" + req.Register);
    // await req.Register.save();
    // res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});
// app.get("/login", (req, res) => {
//   res.render("index");
// });

// app.get("/test", (req, res) => {
//   const str = "abc";
//   console.log(str);
// });  output:abc

// app.get("/test", (req, res) => {
//   const str = "abc";
//   if (str == "abc") {
//     const str = "123";
//     console.log(str);
//   }
//   console.log(str);
// });

// app.get("/test", (req, res) => {
//   let str = "123";
//   if (str == "123") {
//     let str = "abc";
//     console.log("op1:" + str);
//   }
//   console.log("op2:" + str);
// });
// app.get("/test", (req, res) => {
//   var str = "123";
//   if (str == "123") {
//     console.log("op1:" + str);
//     var str = "abc";
//     console.log("op2:" + str);
//   }
//   console.log("op2:" + str);
// });
app.listen(port, () => {
  console.log(`sever is running at port no ${port}`);
});
