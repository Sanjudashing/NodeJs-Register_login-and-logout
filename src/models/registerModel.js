const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  conpwd: {
    type: String,
    required: true,
  },
});

const Register = new mongoose.model("Register", studentSchema);
module.exports = Register;
