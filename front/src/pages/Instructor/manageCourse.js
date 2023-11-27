// src/instructor/manageCourse.js
import React, { useState } from 'react';
import './manageCourse.css'; // Import the CSS file

const ManageCourse = () => {
  const [courseData, setCourseData] = useState({
    weekNumber: '',
    lessonTitle: '',
    videoLink: '',
    assignmentNumber: '',
    dueDate: '',
    questionLink: '',
    submissionLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleAddLesson = () => {
    // Add code to handle adding a new lesson
    console.log('Adding Lesson:', courseData);
  };

  const handleAddAssignment = () => {
    // Add code to handle adding a new assignment
    console.log('Adding Assignment:', courseData);
  };

  return (
    <div className="manage-course-container">
      <h2>Manage Course</h2>

      <div>
        <label>Week Number:</label>
        <input
          type="text"
          name="weekNumber"
          value={courseData.weekNumber}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Lesson Title:</label>
        <input
          type="text"
          name="lessonTitle"
          value={courseData.lessonTitle}
          onChange={handleInputChange}
        />
        <label>Video Link:</label>
        <input
          type="text"
          name="videoLink"
          value={courseData.videoLink}
          onChange={handleInputChange}
        />
        <button onClick={handleAddLesson}>Add Lesson</button>
      </div>

      <div>
        <label>Assignment Number:</label>
        <input
          type="text"
          name="assignmentNumber"
          value={courseData.assignmentNumber}
          onChange={handleInputChange}
        />
        <label>Due Date:</label>
        <input
          type="text"
          name="dueDate"
          value={courseData.dueDate}
          onChange={handleInputChange}
        />
        <label>Question Link:</label>
        <input
          type="text"
          name="questionLink"
          value={courseData.questionLink}
          onChange={handleInputChange}
        />
        <label>Submission Link:</label>
        <input
          type="text"
          name="submissionLink"
          value={courseData.submissionLink}
          onChange={handleInputChange}
        />
        <button onClick={handleAddAssignment}>Add Assignment</button>
      </div>
    </div>
  );
};

export default ManageCourse;
