const express = require("express");
const router = express.Router();
const CourseContent = require("../model/Course/courseContentSchema");
const InstructorCourse = require("../model/Instructor/instructorCourseSchema");
const Message = require("../model/messageSchema");
const Courses = require("../model/Course/coursesSchema");


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

router.post('/:courseId/weeks', async (req, res) => {
  const { weekNumber, lessons, assignments } = req.body;

  try {
    const course = await Courses.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const courseContent = new CourseContent({
      courseId: req.params.courseId,
      weeks: [{ weekNumber, lessons, assignments }],
    });

    const savedCourseContent = await courseContent.save();
    res.status(201).json(savedCourseContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:courseId/weeks', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log('Fetching weeks for course:', courseId);

    // Use find instead of findOne to retrieve all weeks for the course
    const courseContent = await CourseContent.find({ courseId });

    if (!courseContent || courseContent.length === 0) {
      console.log('Course content not found for course:', courseId);
      return res.status(404).json({ message: 'Course content not found' });
    }

    const allWeeks = courseContent.flatMap((content) => content.weeks);

    console.log('Weeks found:', allWeeks);
    res.json(allWeeks);
  } catch (error) {
    console.error('Error fetching weeks:', error.message);
    res.status(500).json({ message: error.message });
  }
});



router.put('/:courseId/weeks/:weekId', async (req, res) => {
  const { courseId, weekId } = req.params;

  try {
    // Find the course content document
    const courseContent = await CourseContent.findOne({ courseId });

    // Find the specific week within the course content
    const weekToUpdate = courseContent.weeks.id(weekId);

    // Update the week data with the incoming request data
    weekToUpdate.set(req.body.weeks[0]); // Assuming only one week is updated

    // Save the updated course content
    await courseContent.save();

    res.json({ message: 'Week data updated successfully', week: weekToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Error updating week data', details: error.message });
  }
});






// Add more routes for updating, deleting, or retrieving all course content if needed

router.post('/messages', async (req, res) => {
  try {
    const { courseId, userId, message } = req.body;

    const newMessage = new Message({
      courseId,
      userId,
      message,
      // Add other message-related fields if needed
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/messages/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const messages = await Message.find({ courseId }).populate('userId', 'name');

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});






module.exports = router;
