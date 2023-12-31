const express = require('express');
const router = express.Router()
const Project = require("../model/projectSchema");
const ProjectSubmission = require("../model/projectSubmission");
const Event = require("../model/eventSchema");
const AssignmentSubmission = require("../model/Course/assignmentSubmissionSchema");
const LiveSession = require("../model/liveSessionSchema");


router.post('/create-project/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { insName, name, details, participants, submissionDate } = req.body;

    // Validate input
    if (!insName || !name || !details || !participants || !submissionDate) {
      return res.status(400).json({ error: 'All fields are required' });
    };

    // Check if a project with the given courseId already exists
    const existingProject = await Project.findOne({ courseId, name });

    if (existingProject) {
      // Update the existing project only if there are participants
      if (participants && participants.length > 0) {
        existingProject.insName = insName;
        existingProject.name = name;
        existingProject.details = details;
        existingProject.participants = participants;
        existingProject.submissionDate = submissionDate;

        await existingProject.save();

        return res.status(200).json({ message: 'Project Information Updated', project: existingProject });
      } else {
        return res.status(400).json({ error: 'Participants cannot be empty for project update' });
      };

    } else {
      // Create a new project
      const newProject = new Project({
        insName,
        name,
        details,
        participants,
        submissionDate,
        courseId,
      });

      await newProject.save();

      return res.status(201).json({ message: 'Project Assigned Successfully', project: newProject });
    };
  } catch (error) {
    console.error('Error creating/updating project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  };
});

// Assuming you have an endpoint like '/projects/user/:userId' to fetch projects by user ID
const mongoose = require('mongoose');

router.get('/showProjects/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Convert userId string to ObjectId
    const ObjectId = mongoose.Types.ObjectId;
    const userIdAsObjectId = ObjectId(userId);

    // Find projects where the given userId exists in participants
    const userProjects = await Project.find({ participants: userIdAsObjectId })
      .populate({
        path: 'participants',
        select: 'name', 
        model: 'User',
      });
  

    if (!userProjects || userProjects.length === 0) {
      return res.status(404).json({ error: 'No projects found for this user' });
    }

    res.status(200).json({ projects: userProjects });
  } catch (error) {
    console.error('Error fetching user projects:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/submit-work/:projectId/:userId', async (req, res) => {
  try {
    const { projectId ,userId } = req.params;
    const { submission } = req.body;


    const projectSubmission = new ProjectSubmission({
      project: projectId,
      submission,
      submittedBy: userId,
    });

    await projectSubmission.save();

    res.status(201).json({ message: 'Work submitted successfully', projectSubmission });
  } catch (error) {
    console.error('Error submitting work:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/check-submission/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if a submission exists for the provided project ID
    const existingSubmission = await ProjectSubmission.findOne({ project: projectId });

    // If a submission exists, return submitted: true; otherwise, submitted: false
    if (existingSubmission) {
      res.status(200).json({ submitted: true });
    } else {
      res.status(200).json({ submitted: false });
    }
  } catch (error) {
    console.error('Error checking submission:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/create-event", async (req, res) => {
  try {
    const { eventName, eventPlace, eventDetails, eventDate, eventReference } = req.body;

    // Validate input
    if (!eventName || !eventPlace || !eventDetails || !eventDate || !eventReference) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if an event with the given eventName already exists
    const existingEvent = await Event.findOne({ eventName });

    if (existingEvent) {
      // Update the existing event
      existingEvent.eventName = eventName;
      existingEvent.eventPlace = eventPlace;
      existingEvent.eventDetails = eventDetails;
      existingEvent.eventDate = eventDate;
      existingEvent.eventReference = eventReference;

      await existingEvent.save();

      return res.status(200).json({ message: 'Event Information Updated', event: existingEvent });
    } else {
      // Create a new event
      const newEvent = new Event({
        eventName,
        eventPlace,
        eventDetails,
        eventDate,
        eventReference,
      });

      const savedEvent = await newEvent.save();

      return res.status(201).json({ message: 'Event Created Successfully', event: savedEvent });
    }
  } catch (err) {
    console.error('Error creating/updating event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET route to fetch all event details
router.get("/show-events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Assignment submission Route

router.post('/submit-assignment', async (req, res) => {
  try {
    const { userId, courseId, weekNumber, submissionLink, submissionDate } = req.body;

    // Check if there is an existing submission for the same week
    const existingSubmission = await AssignmentSubmission.findOne({
      userId,
      courseId,
      weekNumber,
    });

    if (existingSubmission) {
      return res.status(400).json({ error: 'Assignment already submitted for this week' });
    }

    // Create a new assignment submission
    const assignmentSubmission = new AssignmentSubmission({
      userId,
      courseId,
      weekNumber,
      submissionLink,
      submissionDate,

    });

    // Save the assignment submission
    await assignmentSubmission.save();

    res.status(201).json({ message: 'Assignment submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
});

// Assignment Fetching Route
router.get('/submissions/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Fetch submissions for the specified user and course
    const submissions = await AssignmentSubmission.find({ userId, courseId });

    res.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Live session Route
router.post('/create-session/:courseId', async (req, res) => {
  try {
    const { topic, link, date, time } = req.body;
    const { courseId } = req.params; // Extract courseId from URL params
    const newSession = new LiveSession({ topic, link, date, time, courseId });
    const savedSession = await newSession.save();
    res.json(savedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Route to get all meetings
router.get('/sessions/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params; // Extract courseId from URL params
    const meetings = await LiveSession.find({ courseId }); // Fetch meetings by courseId
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/sessions/:courseId/:meetingId', async (req, res) => {
  try {
    const { courseId, meetingId } = req.params;

    // Check if the meeting exists for the given courseId and meetingId
    const meeting = await LiveSession.findOne({ _id: meetingId, courseId });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // If the meeting exists, remove it
    await LiveSession.findByIdAndDelete(meetingId);
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;