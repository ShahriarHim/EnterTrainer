const express = require("express");
const router = express.Router();
const Courses = require("../model/coursesSchema");
const multer = require('multer');
const Subscription = require('../model/subscription')
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
  const { user_Id , course_Id} = req.body;


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
  try {
    const userId = req.params.userId; // Extracting user ID from the request parameter

    // Find subscriptions for the given user ID and populate course details
    const userSubscriptions = await Subscription.find({ user_Id: userId })
      .populate({
        path: 'course_Id',
        select: 'name genre details' // Update to select 'name' field from the Courses model
      })
      .exec();

    // Check if userSubscriptions array is empty
    if (userSubscriptions.length === 0) {
      return res.json({ message: 'No subscriptions yet for this user.' });
    }

    // Extract course details from subscriptions and send as a response
    const coursesSubscribed = userSubscriptions.map(subscription => {
      return {
        courseId: subscription.course_Id._id,
        courseName: subscription.course_Id.name, // Accessing the 'name' field here
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

module.exports = router;

module.exports = router;











module.exports = router;
