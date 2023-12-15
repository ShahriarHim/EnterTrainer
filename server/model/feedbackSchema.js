const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Courses',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Instructors',
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'AssignmentSubmission',
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
