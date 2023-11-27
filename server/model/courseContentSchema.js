// courseContentSchema.js

const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses', // Reference to the Courses model
    required: true,
  },
  weekNumber: {
    type: Number,
    required: true,
  },
  content: {
    lessons: [
      {
        title: {
          type: String,
          required: true,
        },
        videoLink: {
          type: String, // Assuming a string to store the link of a YouTube video
          required: true,
        },
      },
    ],
    assignments: [
      {
        assignmentNumber: {
          type: String,
          required: true,
        },
        dueDate: {
          type: Date,
          required: true,
        },
        questionDocLink: {
          type: String, // Assuming a string to store the link of a Google doc containing questions
          required: true,
        },
        submissionFormLink: {
          type: String, // Assuming a string to store the link for submission
          required: true,
        },
      },
    ],
  },
});

const CourseContent = mongoose.model('CourseContent', courseContentSchema);
module.exports = CourseContent;
