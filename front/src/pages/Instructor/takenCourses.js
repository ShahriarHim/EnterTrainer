import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../User/enrolledCourses.css';
import Dashboard from '../Comp/dashboard';

const TakenCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const handleManageCourse = (courseId) => {
        navigate(`/manage-course/${courseId}`);
    }
    useEffect(() => {
        // Function to fetch user ID from JWT token
        const token = localStorage.getItem('jw_token');

        // Decode the token to get user data
        const decodedToken = jwt_decode(token);
        const insId = decodedToken.id;
        console.log('ins id', insId);

        // Fetch courses for the user from the backend
        
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/course/Instructor/${insId}`);
                setCourses(response.data.coursesTaken || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (insId) {
            fetchCourses();
        }
    }, []);

    return (
        <div>
            <div>
                <Dashboard />
            </div>
            <div className="course-container">
                <h2 style={{textAlign: 'center'}}>Taken Courses</h2>
                <div className="cards-container">
                    {courses.length > 0  ? (
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
                                        <button className="resume-button" onClick={() => handleManageCourse(course.courseId)}>Manage Course</button>
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


export default TakenCourses;
