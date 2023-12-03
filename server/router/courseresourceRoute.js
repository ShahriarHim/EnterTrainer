const express = require('express');
const router = express.Router();

const Resource = require('../model/courseresource');

// Route for adding or updating resources
router.post('/addOrUpdateResource', async (req, res) => {
  const { courseId, weekNumber, link } = req.body;

  try {
    // Check if the resource already exists for the given course and week
    const existingResource = await Resource.findOne({ courseId, weekNumber });

    if (existingResource) {
      // Update the existing resource
      existingResource.link = link;
      await existingResource.save();
      return res.status(200).json({ message: 'Resource updated successfully' });
    }

    // If the resource does not exist, create a new one
    const newResource = new Resource({ courseId, weekNumber, link });
    await newResource.save();

    // Respond with success message
    res.status(201).json({ message: 'Resource added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getAllResources/:courseId', async (req, res) => {
    const { courseId } = req.params;
  
    try {
      // Find all resources for the given course
      const resources = await Resource.find({ courseId });
  
      // Extract and organize the data by weeks
      const weeksData = resources.reduce((acc, resource) => {
        const { weekNumber, link } = resource;
        if (!acc[weekNumber]) {
          acc[weekNumber] = [];
        }
        acc[weekNumber].push({ link });
        return acc;
      }, {});
  
      // Respond with the organized data
      res.status(200).json({ weeks: weeksData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
// Other routes for fetching, updating, or deleting resources can be added here

module.exports = router;
