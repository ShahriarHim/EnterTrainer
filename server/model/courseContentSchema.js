// models/CourseContent.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonSchema = new Schema({
  title: { type: String },
  link: { type: String, required: true },
});

const assignmentSchema = new Schema({
  link: { type: String, required: true },
  submissions: [{ type: String }],
});

const weekSchema = new Schema({
  weekNumber: { type: Number, required: true },
  lessons: [lessonSchema],
  assignments: [assignmentSchema],
});

const courseContentSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
  weeks: [weekSchema],
});

const CourseContent = mongoose.model('CourseContent', courseContentSchema);

module.exports = CourseContent;
