const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  weekNumber: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;
