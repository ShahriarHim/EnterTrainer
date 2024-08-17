import React, { useState } from "react";
import Navbar from "../../Comp/navbar";
import Footer from "../../Comp/footer";
import './style.css'; // Import the CSS file for styling

function Feature() {
  const [view, setView] = useState("student");
  const [courses, setCourses] = useState([
    { id: 1, name: "Guitar", category: "Music", image: "https://images.squarespace-cdn.com/content/v1/5b7d8ac7697a988b951bdc95/1611728210677-016BGGS79ZRHB96CKQS3/image-9.jpg?format=2500w", instructorId: "ins1" },
    { id: 2, name: "Piano", category: "Music", image: "https://wfuogb.com/wp-content/uploads/2021/10/900x520_piano-min.jpeg", instructorId: "ins2" },
    { id: 3, name: "Violin", category: "Music", image: "https://www.yamaha.com/en/musical_instrument_guide/common/images/violin/maintenance_main.jpg", instructorId: "ins1" },
  ]);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [studentId, setStudentId] = useState(""); // New Student ID state
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [foundCourses, setFoundCourses] = useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleCreateCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleInstructorIdChange = (e) => {
    setInstructorId(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value); // Handling student ID input
  };

  const handleSelectCourse = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleRemoveSelectedCourses = () => {
    setCourses(courses.filter(course => !selectedCourses.includes(course.id)));
    setSelectedCourses([]);
  };

  const handleFindCourses = () => {
    const filteredCourses = courses.filter(course => course.instructorId === instructorId);
    setFoundCourses(filteredCourses);
  };

  return (
    <div>
      <div className="button-container">
        <button
          className={view === "student" ? "active" : ""}
          onClick={() => setView("student")}
        >
          Student
        </button>
        <button
          className={view === "instructor" ? "active" : ""}
          onClick={() => setView("instructor")}
        >
          Instructor
        </button>
      </div>

      {view === "student" && (
        <div>
          <h1>Student View</h1>
          <div className="instructor-id-container">
            <input
              type="text"
              className="small-input"
              placeholder="Student ID"
              value={studentId} // Binding student ID to input
              onChange={handleStudentIdChange} // Handling student ID change
              required
            />
            <button className="find-button" onClick={handleFindCourses}>Find</button>
          </div>
          <div className="filter-container">
            <input
              type="text"
              className="filter-bar"
              placeholder="Filter courses"
              value={filter}
              onChange={handleFilterChange}
            />
            <select
              className="filter-dropdown"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Dance">Dance</option>
              <option value="Programming">Programming</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <section className="articles">
            {courses.filter(course =>
              course.name.toLowerCase().includes(filter.toLowerCase()) &&
              (categoryFilter === "" || course.category === categoryFilter)
            ).map(course => (
              <article key={course.id}>
                <div className="article-wrapper">
                  <figure>
                    <img src={course.image} alt={course.name} />
                  </figure>
                  <div className="article-body">
                    <h2>{course.name}</h2>
                    <p>
                      This is a description for {course.name}. You can add more details here.
                    </p>
                    <a href="#" className="read-more">
                      Enroll
                      {/* <span className="sr-only"> about {course.name}</span> */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      )}

      {view === "instructor" && (
        <div>
          <h1>Instructor View</h1>
          <div className="instructor-id-container">
            <input
              type="text"
              className="small-input"
              placeholder="Instructor ID"
              value={instructorId}
              onChange={handleInstructorIdChange}
              required
            />
            <button className="find-button" onClick={handleFindCourses}>Find</button>
          </div>

          {foundCourses.length > 0 && (
            <>
              <h2>Manage Courses</h2>
              <div className="select-remove-container">
                <button
                  className="small-button"
                  onClick={() => setShowSelect(!showSelect)}
                >
                  Select
                </button>
                {showSelect && (
                  <button className="small-button" onClick={handleRemoveSelectedCourses}>Remove</button>
                )}
              </div>
              <section className="articles">
                {foundCourses.map(course => (
                  <article key={course.id}>
                    <div className="article-wrapper">
                      {showSelect && (
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => handleSelectCourse(course.id)}
                        />
                      )}
                      <figure>
                        <img src={course.image} alt={course.name} />
                      </figure>
                      <div className="article-body">
                        <h2>{course.name}</h2>
                        <p>
                          This is a description for {course.name}. You can add more details here.
                        </p>
                        <a href="#" className="read-more">
                          Manage
                          {/* <span className="sr-only"> about {course.name}</span> */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}

          <h2>Create a New Course</h2>
          <CourseCreationForm onCreateCourse={handleCreateCourse} instructorId={instructorId} />
        </div>
      )}
    </div>
  );
}

const CourseCreationForm = ({ onCreateCourse, instructorId }) => {
  const [newCourse, setNewCourse] = useState({
    ins_id: "",
    name: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCourse({ id: Date.now(), instructorId: parseInt(instructorId), ...newCourse });
    setNewCourse({ ins_id: "", name: "", category: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ins_id"
        placeholder="Instructor ID"
        value={newCourse.ins_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={newCourse.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newCourse.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newCourse.image}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Course</button>
    </form>
  );
};

export default Feature;
