const mongoose = require("mongoose");

const insSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: 'INS',
    required: false,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  location: {
    type: String, // You can adjust the type based on your needs
    required: false,
  },
  university: {
    type: String, // You can adjust the type based on your needs
    required: false,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
});

const Instructor = mongoose.model("instructors", insSchema);
module.exports = Instructor;
