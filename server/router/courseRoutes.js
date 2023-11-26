const express = require("express");
const router = express.Router();
const Courses = require("../model/coursesSchema");
const multer = require('multer');
const Subscription = require('../model/subscription')
const InstructorCourse = require('../model/instructorCourseSchema');
const passport = require('passport'); // Assuming you have Passport configured

// const upload = require("../multerConfig");

router.post("/create-course",  async (req, res) => {

  const {  genre, name, details } = req.body;
 

  try {
    const existingCourse = await Courses.findOne({ name });

    if (existingCourse) {
      return res
        .status(422)
        .json({ error: "Course with the same unique_ID already exists" });
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


router.get("/all-courses", async (req, res) => {

  try {
    const courses = await Courses.find();
    console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // Set the file size limit in bytes (e.g., 100MB)
}).single('videoFile'); // 'videoFile' should match the name attribute in your form

// Example route for uploading videos
router.post('/upload-video', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    
    // If the upload is successful, you can access the uploaded file details in req.file
    const { videoTitle } = req.body;
    const videoPath = req.file.path;

    // Now you can save the video title and file path to your database or perform other actions
    // For demonstration purposes, let's just send a success response
    res.json({ message: 'Video uploaded successfully', videoTitle, videoPath });
  });
});

router.post('/subscribe', async (req, res) => {
  const { user_Id, course_Id } = req.body;

  try {
    const course = await Courses.findById(course_Id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if the user is already subscribed
    const existingSubscription = await Subscription.findOne({ user_Id, course_Id });
    if (existingSubscription) {
      return res.status(400).json({ error: 'User is already subscribed to this course' });
    }

    // Create a new subscription
    const subscription = new Subscription({
      user_Id,
      course_Id,
    });

    await subscription.save();

    res.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error(error); // Log the error to your console
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.get('/subscriptions/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all subscriptions for the given user
    const subscriptions = await Subscription.find({ userId });

    // Assuming you want to send back the course details as well
    const courses = await Courses.find({ _id: { $in: subscriptions.map(sub => sub.courseId) } });

    res.json({ subscriptions, courses });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/instructor/courses", async (req, res) => {
  try {
    const instructorId = req.body.instructorId; // Assuming the instructorId is sent in the request body

    // Find all courses associated with the given instructorId
    const courses = await InstructorCourse.find({ instructorId })
      .populate('courseId'); // This will populate the 'courseId' field with the actual course details

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route for instructors to join courses
router.post('/instructor-courses', async (req, res) =>  {
  const { instructorId, courseId } = req.body;

  try {
    // Check if the instructor is already associated with the course
    const existingAssociation = await InstructorCourse.findOne({
      instructorId,
      courseId,
    });

    if (existingAssociation) {
      return res.status(422).json({ error: 'Instructor is already associated with this course' });
    }

    // Create a new association between the instructor and the course
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
