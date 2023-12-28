const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    default: 'Student',
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
    type: String, // You can adjust the type based on your use case (e.g., String, Object, etc.)
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
