const express = require("express");
const router = express.Router();
const CourseContent = require("../model/courseContentSchema");
const InstructorCourse = require("../model/instructorCourseSchema");

// Middleware to check if the instructor is associated with the course
const checkInstructorAssociation = async (req, res, next) => {
  const { courseId, userId } = req.body;

  try {
    const association = await InstructorCourse.findOne({
      instructorId: userId,
      courseId,
    });

    if (!association) {
      return res.status(403).json({ error: "You are not authorized to edit this course content" });
    }

    next(); // Proceed to the next middleware/route if the instructor is associated
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Route for creating course content for a specific week
router.post("/create-course-content", checkInstructorAssociation, async (req, res) => {
  // Extract other details from req.body, e.g., weekNumber, lesson, assignment
  const { courseId, userId, weekNumber, lesson, assignment } = req.body;

  try {
    // Check if the course content for the given week already exists
    const existingContent = await CourseContent.findOne({ courseId, weekNumber });

    if (existingContent) {
      return res.status(422).json({ error: "Course content for this week already exists" });
    }

    // Create new course content
    const newCourseContent = new CourseContent({
      courseId,
      weekNumber,
      content: {
        lessons: lesson,  // Assuming lesson is an array of lesson objects
        assignments: assignment,  // Assuming assignment is an array of assignment objects
      },
    });

    await newCourseContent.save();

    res.status(200).json({ message: "Course content created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

// Route for retrieving course content for a specific week
router.get("/get-course-content/:courseId/:weekNumber", checkInstructorAssociation, async (req, res) => {
  // Extract courseId and weekNumber from req.params
  const { courseId, weekNumber } = req.params;

  try {
    // Retrieve course content for the given week
    const content = await CourseContent.findOne({ courseId, weekNumber });

    if (!content) {
      return res.status(404).json({ error: "Course content not found for this week" });
    }

    res.status(200).json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add more routes for updating, deleting, or retrieving all course content if needed

module.exports = router;
