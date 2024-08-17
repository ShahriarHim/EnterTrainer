// InstructorCourseManagement.js
import React, { useState } from "react";

function InstructorCourseManagement({ course, onBack }) {
    const [lessons, setLessons] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [newLesson, setNewLesson] = useState("");
    const [newAssignment, setNewAssignment] = useState("");
    const [week, setWeek] = useState(1);

    const handleAddLesson = () => {
        setLessons([...lessons, { week, link: newLesson }]);
        setNewLesson("");
    };

    const handleAddAssignment = () => {
        setAssignments([...assignments, { week, task: newAssignment }]);
        setNewAssignment("");
    };

    return (
        <div className="instructor-course-management">
            <button className="close-button" onClick={onBack}>×</button>
            <h2>Manage Course: {course.name}</h2>
            {/* Course management code */}

            <div className="lesson-section">
                <h3>Add Lesson for Week {week}</h3>
                <input
                    type="text"
                    placeholder="YouTube Video Link"
                    value={newLesson}
                    onChange={(e) => setNewLesson(e.target.value)}
                />
                <button onClick={handleAddLesson}>Add Lesson</button>
            </div>

            <div className="assignment-section">
                <h3>Add Assignment for Week {week}</h3>
                <input
                    type="text"
                    placeholder="Assignment"
                    value={newAssignment}
                    onChange={(e) => setNewAssignment(e.target.value)}
                />
                <button onClick={handleAddAssignment}>Add Assignment</button>
            </div>

            <div className="week-navigation">
                <button onClick={() => setWeek(week - 1)} disabled={week <= 1}>Previous Week</button>
                <button onClick={() => setWeek(week + 1)}>Next Week</button>
            </div>

            <h4>Lessons and Assignments:</h4>
            <div className="lesson-list">
                {lessons.map((lesson, index) => (
                    <div key={index}>
                        <strong>Week {lesson.week}</strong>: <a href={lesson.link}>{lesson.link}</a>
                    </div>
                ))}
            </div>
            <div className="assignment-list">
                {assignments.map((assignment, index) => (
                    <div key={index}>
                        <strong>Week {assignment.week}</strong>: {assignment.task}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InstructorCourseManagement;