const express = require("express");
const router = express.Router();
const Courses = require("../model/coursesSchema");


const upload = require("../multerConfig");

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


module.exports = router;
