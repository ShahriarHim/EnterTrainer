import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './enrolledCourses.css';
import Dashboard from '../Comp/dashboard';

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Function to fetch user ID from JWT token
        const token = localStorage.getItem('jw_token');

        // Decode the token to get user data
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        console.log('user id', userId);

        // Fetch courses for the user from the backend
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/course/subscriptions/${userId}`);
                setCourses(response.data.coursesSubscribed || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
                

                  
            }
        };

        if (userId) {
            fetchCourses();
        }
    }, []);
    const handleResumeCourse = (courseId) => {
        // Step 2: Pass navigate to the function
        navigate(`/manage-course/${courseId}`); // Step 3 and 4: Use navigate to go to the desired route
    };

    return (
        <div>
            <div>
                <Dashboard />
            </div>
            <div className="course-container">
                <h2 style={{ textAlign: 'center' }}>Your Subscribed Courses</h2>
                <div className="cards-container">
                    {courses.length >0 ? (
                        courses.map(course => (
                            <div className="card" key={course.courseId}>
                                <div className="left-section">
                                    <div className="photo">
                                        {/* Use the image */}
                                        <img src='/assets/img/Logo3.png' alt="Course Thumbnail" />
                                    </div>
                                    <div className="line"></div>
                                </div>
                                <div className="right-section">
                                    <div className="details-section">
                                        <h3 className="course-name">
                                            <span className="label">Course Name:</span> {course.courseName}
                                        </h3>
                                        <p className="genre">
                                            <span className="label">Genre:</span> {course.genre}
                                        </p>
                                        <p className="details">
                                            <span className="label">Details:</span> {course.details}
                                        </p>
                                        <button className="resume-button" onClick={() => handleResumeCourse(course.courseId)}>
                                            Resume Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h5 style={{textAlign:'center'}}>No subscriptions yet for this user.</h5>
                    )}
                </div>
            </div>
        </div>
    );
};


export default EnrolledCourses;
