const mongoose = require('mongoose');

const liveSessionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Course ID
    ref: 'Course', // Refers to the Course model
    required: true
  }
});


const LiveSession = mongoose.model('LiveSession', liveSessionSchema);
module.exports = LiveSession;