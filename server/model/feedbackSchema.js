const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
