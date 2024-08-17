import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chat from './chat';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import "./chat.css"


const CourseBar = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseMessages, setCourseMessages] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jw_token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://entertrainer-2.onrender.com/course/subscriptions/${userId}`);
                setCourses(response.data.coursesSubscribed);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (userId) {
            fetchCourses();
        }
    }, []);

    const handleCourseSelect = async (courseId) => {
        setSelectedCourse(courseId);
        setSelectedCourseId(courseId);
        try {
            const response = await axios.get(`http://entertrainer-2.onrender.com/course-content/messages/${courseId}`);
            setCourseMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    return (
        <div className="course-chat-container">
            <div className="course-header">
                <Link to="/home">Home</Link>

            </div>
            <div className="course-sidebar">
                <h2>Course Bar</h2>
                {courses.map((course) => (
                    <div
                        key={course.courseId}
                        onClick={() => handleCourseSelect(course.courseId)}
                        className={`course-item ${selectedCourse === course.courseId ? 'active-course' : ''}`}
                    >
                        {course.courseName}
                    </div>
                ))}
            </div>

            <div className="chat-section">
                {/* Pass courseMessages to Chat component */}
                {selectedCourse ? (
                    <Chat courseMessages={courseMessages} courseId={selectedCourseId} /> 
                ) : (
                    <p>Select a course to start chatting!</p>
                )}
            </div>
        </div>
    );
};

export default CourseBar;
