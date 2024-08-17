import React, { useState } from "react";

function StudentView({ courses }) {
  const [studentId, setStudentId] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleFindCourses = () => {
    const studentCourses = courses.filter(course => course.enrolledStudents.includes(studentId));
    setEnrolledCourses(studentCourses);
  };

  return (
    <div>
      <h1>Student View</h1>
      <div>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleFindCourses}>Find</button>
      </div>

      <section className="enrolled-courses">
        {enrolledCourses.map(course => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {/* Display course materials such as lessons, assignments */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default StudentView;
