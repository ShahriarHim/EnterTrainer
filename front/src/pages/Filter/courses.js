import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = ({ selectedGenres, courses }) => {
  console.log('Selected Genres:', selectedGenres);
  console.log('All Courses:', courses);

  const navigate = useNavigate();

  const handleStartCourse = (courseId) => {
    // You can perform any actions related to starting a course here
    console.log(`Starting course with ID: ${courseId}`);

    // Navigate to the payment page
    navigate('/checkout');
  };
  return (
    <div>
      {selectedGenres.map((selectedGenre, index) => (
        <div key={index}>
          <h2>{selectedGenre} Courses</h2>
          <div className="courses-container">
            {Array.isArray(courses) && courses.length > 0 ? (
              courses
                // .filter((course) => course.genre === selectedGenre)
                .map((course) => (
                  <div key={course._id} className="course-card">
                    <h3 style={{ color: '#fff' }}>{course.name}</h3>
                    <p style={{ color: '#fff' }}>{course.details}</p>
                    <button onClick={() => handleStartCourse(course._id)}>Start Course</button>
              
                  </div>
                ))
            ) : (
              <p>No courses available for {selectedGenre}.</p>
            )}
          </div>
          {index < selectedGenres.length - 1 && <hr style={{ border: '1px solid black' }} />}
        </div>
      ))}
    </div>
  );
};

export default Courses;
