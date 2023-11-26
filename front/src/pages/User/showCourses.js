import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './showCourses.css';
import Dashboard from '../Comp/dashboard';

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
                <h2>Your Subscribed Courses</h2>
                <div className="cards-container">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div className="card" key={course.courseId}>
                                <h3 className="course-name">{course.courseName}</h3>
                                <p className="genre">Genre: {course.genre}</p>
                                <p className="details">Details: {course.details}</p>
                                <p className="subscriptionDate">Subscription Date: {course.subscriptionDate}</p>
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
