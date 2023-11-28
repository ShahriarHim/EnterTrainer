import React from 'react';
import { useNavigate } from 'react-router-dom';


const Courses = ({ courses }) => {
  const navigate = useNavigate();

  const handleStartCourse = (courseId) => {

    navigate(`/checkout/${courseId}`);

  };


  return (
    <div>
      <h2 style={{ textAlign: 'center', borderBottom: '2px solid #06BBCC', paddingBottom: '5px' }}>Courses</h2>
      <div className="courses-container">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => {
            return (
              <div
                key={course._id}
                className="course-card"
              >
                <div className="course-card-content">
                  <h3 style={{ color: '#fff', textAlign: 'center' }}>{course.name}</h3>
                  <p style={{ color: 'black', textAlign: 'center' }}>{course.details}</p>
                  <div className="button-container">
                    <button onClick={() => handleStartCourse(course._id)}>Start Course</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No courses to show.</p>
        )}
      </div>
    </div>

  );
};



export default Courses;
