const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  
});

const Courses = mongoose.model("Courses", coursesSchema);
module.exports = Courses;
