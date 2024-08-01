// instructorCourseSchema.js

const mongoose = require('mongoose');

const instructorCourseSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor', // Reference to the Instructor model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses', // Reference to the Courses model
    required: true,
  },
});

const InstructorCourse = mongoose.model('InstructorCourse', instructorCourseSchema);
module.exports = InstructorCourse;
