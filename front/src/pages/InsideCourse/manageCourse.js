import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './manageCourse.css';

const ManageCourse = () => {
  const navigate = useNavigate();
  const [showWeek1, setShowWeek1] = useState(false);
  const [lessonLink, setLessonLink] = useState('');
  const [assignmentLink, setAssignmentLink] = useState('');

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleWeekToggle = () => {
    setShowWeek1(!showWeek1);
  };

  return (
    <div className="manage-course-container">
      {/* First Row */}
      <div className="nav-links">
        <a href="#" onClick={() => handleNavigate('/home')}>
          Home
        </a>
        <a href="#" onClick={() => handleNavigate('/taken-courses')}>
          Courses
        </a>
      </div>

      {/* Second Row */}
      <div className="course-name">
        Course Name
      </div>

      {/* Two Row Gap */}
      <br />
      <br />

      {/* Third Row */}
      <div className="manage-add-week">
        <div className="manage-course">
          Manage Course
        </div>
        <button className="add-week-button" onClick={handleWeekToggle}>
          Add Week
        </button>
      </div>

      {/* Week 1 Section */}
      {showWeek1 && (
        <div className="week-section">
          <button className="week-button" onClick={handleWeekToggle}>
            Week 1
          </button>
          {showWeek1 && (
            <div className="nested-buttons">
              <button onClick={handleWeekToggle}>
                Lessons
              </button>
              {showWeek1 && (
                <div className="lesson-input">
                  <input
                    type="text"
                    placeholder="Enter lesson link"
                    value={lessonLink}
                    onChange={(e) => setLessonLink(e.target.value)}
                  />
                  <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${lessonLink}`}
                    title="Lesson Content"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ display: 'block', margin: '0 auto' }}
                  ></iframe>
                </div>
              )}

              <button onClick={() => setAssignmentLink('')}>
                Assignments
              </button>
              {assignmentLink !== '' && (
                <input
                  type="text"
                  placeholder="Enter assignment link"
                  value={assignmentLink}
                  onChange={(e) => setAssignmentLink(e.target.value)}
                />
              )}
            </div>
          )}

        </div>
      )}

      {/* Rest of the Content */}
      {/* ... */}
    </div>
  );
};

export default ManageCourse;
