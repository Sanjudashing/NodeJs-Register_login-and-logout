const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nodeMail = require("./nodeMail");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/sendemail", nodeMail);

const start = async (req, res) => {
  try {
    app.listen(port, () => {
      console.log(`listening on  ${port} port`);
    });
  } catch (error) {
    console.log("not to connected" + error);
  }
};

start();
