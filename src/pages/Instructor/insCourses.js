// src/instructor/insCourses.js
import React from 'react';
import { Link } from 'react-router-dom';
import './insCourses.css'; // Make sure to import your CSS file

const InsCourses = () => {
  return (
    <div className="custom-body">
      <div className="ins-courses-page-container">
        <div className="ins-course-header">
          <h2>Course Title</h2>
        </div>
        
        <div className="ins-course-actions">
          <p>Edit Your Course</p>
          <Link to="/manage-course">
            <button className="ins-add-week-button btn btn-primary">Add Week</button>
          </Link>
        </div>

        <div className="ins-week-container">
          <div className="ins-dropdown">
            <button className="ins-dropdown-button btn btn-secondary" type="button" id="weekDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Select Week
            </button>
            <div className="dropdown-menu" aria-labelledby="weekDropdown">
              <a className="dropdown-item" href="#">Week 1</a>
              <a className="dropdown-item" href="#">Week 2</a>
              {/* Add more weeks as needed */}
            </div>
          </div>

          <div className="ins-lessons-container">
            {/* Container for Lessons */}
            <h3>Lessons</h3>
            {/* Add content for lessons here */}
          </div>

          <div className="ins-assignments-container">
            {/* Container for Assignments */}
            <h3>Assignments</h3>
            {/* Add content for assignments here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsCourses;
