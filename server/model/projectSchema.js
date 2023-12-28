
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  insName: {
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
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
    },
  ],
  submissionDate: {
    type: Date,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses', // Assuming you have a Course model
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
