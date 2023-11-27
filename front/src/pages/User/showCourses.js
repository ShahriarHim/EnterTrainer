import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './showCourses.css';
import Dashboard from '../Comp/dashboard';
import Image from '../Images/Logo1.png';
const ShowCourses = () => {
    const [courses, setCourses] = useState([]);

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
                setCourses(response.data.coursesSubscribed);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (userId) {
            fetchCourses();
        }
    }, []);

    return (
        <div>
            <div>
                <Dashboard />
            </div>
            <div className="course-container">
                <h2 style={{textAlign: 'center'}}>Your Subscribed Courses</h2>
                <div className="cards-container">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div className="card" key={course.courseId}>
                                <div className="left-section">
                                    <div className="photo">
                                        {/* Use the image */}
                                        <img src={Image} alt="Course Thumbnail" />
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
                                        <button className="resume-button">Resume Course</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No subscriptions yet for this user.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ShowCourses;
