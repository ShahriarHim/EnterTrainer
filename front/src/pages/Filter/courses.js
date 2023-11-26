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
                <h3 style={{ color: '#fff', textAlign: 'center' }}>{course.name}</h3>
                <p style={{ color: 'black', textAlign: 'center' }}>{course.details}</p>
                <button onClick={() => handleStartCourse(course._id)}>Start Course</button>
              </div>
            );
          })
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};



export default Courses;
