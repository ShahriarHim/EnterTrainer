import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ShowAllCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [showCourses, setShowCourses] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/course/all-courses');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (showCourses) {
            fetchData();
        }
    }, [showCourses]);


    const handleShowCourses = () => {
        setShowCourses(!showCourses);
    };
    const handleTakeCourse = (courseId) => {

        navigate(`/checkout/${courseId}`);

    };


    return (
        <div>
            <div
                className="show-all-courses"
                style={{
                    marginTop: '20px',
                    backgroundColor: '#06BBCC',
                    padding: '15px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <button
                    onClick={handleShowCourses}
                    style={{
                        padding: '8px',
                        backgroundColor: '#fff',
                        color: '#06BBCC',
                        border: '1px solid #06BBCC',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Show Available Courses
                </button>
            </div>

            {showCourses && (
                <div className="courses-container">
                    {courses.map(course => (
                        <div
                            key={course._id}
                            className="course-card"
                        >
                            <div className="course-card-content">
                                <h3 style={{ color: '#fff', textAlign: 'center' }}>{course.name}</h3>
                                <h6  style={{ color: 'green', textAlign: 'center' }}> Genre: {course.genre}</h6>
                                <p style={{ color: 'black', textAlign: 'center' }}>{course.details}</p>
                                <div className="button-container">
                                    <button onClick={() => handleTakeCourse(course._id)}>Add Course</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default ShowAllCourses;
