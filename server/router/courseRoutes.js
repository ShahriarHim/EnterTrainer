const express = require("express");
const router = express.Router();
const Courses = require("../model/coursesSchema");
const multer = require('multer');

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

module.exports = router;
