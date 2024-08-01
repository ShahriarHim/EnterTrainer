const express = require("express");
const router = express.Router();
const Courses = require("../model/Course/coursesSchema");
const Subscription = require('../model/Course/subscription');
const InstructorCourse = require('../model/Instructor/instructorCourseSchema');
const Feedback = require('../model/feedbackSchema'); // Import the feedback schema

// Create course
router.post("/create-course", async (req, res) => {
  const { genre, name, details } = req.body;

  try {
    const existingCourse = await Courses.findOne({ name });

    if (existingCourse) {
      return res.status(422).json({ error: "Course with the same unique_ID already exists" });
    }

    const course = new Courses({
      genre,
      name,
      details,
    });

    const savedCourse = await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get courses by genre
router.post('/genre', async (req, res) => {
  const { genre } = req.body;

  try {
    const courses = await Courses.find({ genre }, 'name details');
    if (courses.length === 0) {
      res.json({ message: 'This genre has no courses.' });
    } else {
      res.json(courses);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all courses
router.get("/all-courses", async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get course by ID
router.get('/:courseId', async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Courses.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching course details', details: error.message });
  }
});

// Subscribe to a course
router.post('/subscribe', async (req, res) => {
  const { user_Id, course_Id } = req.body;

  try {
    const course = await Courses.findById(course_Id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const existingSubscription = await Subscription.findOne({ user_Id, course_Id });
    if (existingSubscription) {
      return res.status(400).json({ error: 'User is already subscribed to this course' });
    }

    const subscription = new Subscription({
      user_Id,
      course_Id,
    });

    await subscription.save();

    res.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Get user subscriptions
router.get('/subscriptions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userSubscriptions = await Subscription.find({ user_Id: userId })
      .populate({
        path: 'course_Id',
        select: 'name genre details'
      })
      .exec();

    if (userSubscriptions.length === 0) {
      return res.json({ message: 'No subscriptions yet for this user.' });
    }

    const coursesSubscribed = userSubscriptions.map(subscription => {
      return {
        courseId: subscription.course_Id._id,
        courseName: subscription.course_Id.name,
        genre: subscription.course_Id.genre,
        details: subscription.course_Id.details,
        subscriptionDate: subscription.subscriptionDate
      };
    });

    res.json({ coursesSubscribed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get instructor courses
router.get('/Instructor/:instructorId', async (req, res) => {
  try {
    const insId = req.params.instructorId;

    const insCourses = await InstructorCourse.find({ instructorId: insId })
      .populate({
        path: 'courseId',
        select: 'name genre details'
      })
      .exec();

    if (insCourses.length === 0) {
      return res.json({ message: 'No subscriptions yet for this user.' });
    }

    const coursesTaken = insCourses.map(insCourses => {
      return {
        courseId: insCourses.courseId._id,
        courseName: insCourses.courseId.name,
        genre: insCourses.courseId.genre,
        details: insCourses.courseId.details,
      };
    });

    res.json({ coursesTaken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get enrolled users for a course
router.get('/enrolled-users/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const userSubscriptions = await Subscription.find({ course_Id: courseId })
      .populate({
        path: 'user_Id',
        select: 'name'
      })
      .exec();

    if (userSubscriptions.length === 0) {
      return res.json({ message: 'No subscriptions yet for this course.' });
    }

    const userSubscribed = userSubscriptions.map(subscription => {
      return {
        userId: subscription.user_Id._id,
        userName: subscription.user_Id.name,
        subscriptionDate: subscription.subscriptionDate
      };
    });

    res.json({ userSubscribed });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add route for submitting feedback
router.post('/:courseId/submit-feedback', async (req, res) => {
  const { courseId } = req.params;
  const { studentId, instructorId, assignmentId, feedback, marks, grade } = req.body;

  try {
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const newFeedback = new Feedback({
      courseId,
      studentId,
      instructorId,
      assignmentId,
      feedback,
      marks,
      grade,
    });

    await newFeedback.save();

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Add route for fetching all feedback for a course and student
router.get('/:courseId/feedback/:studentId', async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const feedbackList = await Feedback.find({ courseId, studentId });

    res.json({ feedbackList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
// Update feedback route
router.put('/feedback/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  const { feedback, marks, grade } = req.body;

  try {
    // Find the feedback document using the assignmentId
    const existingFeedback = await Feedback.findOne({ assignmentId });

    if (!existingFeedback) {
      return res.status(404).json({ error: 'Feedback not found for the given assignmentId' });
    }

    // Update feedback properties
    existingFeedback.feedback = feedback;
    existingFeedback.marks = marks;
    existingFeedback.grade = grade;

    // Save the updated feedback
    await existingFeedback.save();

    res.json({ message: 'Feedback updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Instructor enrollment route
router.post('/instructor-enrollment', async (req, res) => {
  const { instructorId, courseId } = req.body;

  try {
    const existingAssociation = await InstructorCourse.findOne({
      instructorId,
      courseId,
    });

    if (existingAssociation) {
      return res.status(422).json({ error: 'Instructor is already associated with this course' });
    }

    const newAssociation = new InstructorCourse({
      instructorId,
      courseId,
    });

    await newAssociation.save();

    res.status(201).json({
      success: true,
      message: 'Instructor joined the course successfully',
      association: newAssociation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
