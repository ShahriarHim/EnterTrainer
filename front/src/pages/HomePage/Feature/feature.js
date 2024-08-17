import React, { useState } from "react";
import Navbar from "../../Comp/navbar";
import Footer from "../../Comp/footer";
import './style.css'; // Import the CSS file for styling

function Feature() {
  const [view, setView] = useState("student");
  const [isAboutVisible, setIsAboutVisible] = useState(false); // State to toggle About section visibility
  const [courses, setCourses] = useState([
    { id: 1, name: "Acoustic Guitar", category: "Music", image: "https://images.squarespace-cdn.com/content/v1/5b7d8ac7697a988b951bdc95/1611728210677-016BGGS79ZRHB96CKQS3/image-9.jpg?format=2500w", instructorId: "ins1" },
    { id: 2, name: "Classical", category: "Dance", image: "https://www.shutterstock.com/image-vector/illustration-young-beautiful-indian-classical-260nw-1478234756.jpg", instructorId: "ins2" },
    { id: 3, name: "Acrylic Painting", category: "Art", image: "https://media.istockphoto.com/id/636761588/photo/used-brushes-on-an-artists-palette-of-colorful-oil-paint.jpg?s=612x612&w=0&k=20&c=38YQxVJVWnNfvGtlb7AXMx_ItyHZMEdmWenNkWNQ91g=", instructorId: "ins1" },
  ]);
  
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [studentId, setStudentId] = useState(""); 
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [foundCourses, setFoundCourses] = useState([]);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
  const handleCreateCourse = (newCourse) => setCourses([...courses, newCourse]);
  const handleInstructorIdChange = (e) => setInstructorId(e.target.value);
  const handleStudentIdChange = (e) => setStudentId(e.target.value);
  const handleSelectCourse = (courseId) => {
    setSelectedCourses(selectedCourses.includes(courseId) ? 
      selectedCourses.filter(id => id !== courseId) : 
      [...selectedCourses, courseId]);
  };
  const handleRemoveSelectedCourses = () => {
    setCourses(courses.filter(course => !selectedCourses.includes(course.id)));
    setSelectedCourses([]);
  };
  const handleFindCourses = () => {
    const filteredCourses = courses.filter(course => course.instructorId === instructorId);
    setFoundCourses(filteredCourses);
  };

  const toggleAboutVisibility = () => setIsAboutVisible(!isAboutVisible);

  return (
    <div>
      {/* Expandable About Section */}
      <div className="about-section" onClick={toggleAboutVisibility} style={{ cursor: "pointer", padding: "10px 20px", background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
        <div className="about-header">
          <i className="fa fa-info-circle" aria-hidden="true"></i> 
          <span style={{ marginLeft: "10px" }}>About Feature Section</span>
          <i className={`fa fa-chevron-${isAboutVisible ? "up" : "down"}`} style={{ float: "right" }}></i>
        </div>
        {isAboutVisible && (
          <div className="about-content" style={{ marginTop: "10px", padding: "10px", background: "#ffffff", border: "1px solid #ddd", borderRadius: "5px" }}>
            <p>
              This Feature view is a demo outlook on the profiles and their individual attributes. Due to server and security issues Database is not allowed, so Login and Signup as Instructor or as Student is prohibited to public access. For that reason This outlook is given to have a closer insight.Thank You.
            </p>
            <p>
              For detailed feature review and module wise features check out the below documentation. 
              <br />
              <a href="http://tinyurl.com/ypp8b2uc" target="_blank" rel="noopener noreferrer">Link: http://tinyurl.com/ypp8b2uc</a>
            </p>
          </div>
        )}
      </div>

      {/* Button Container */}
      <div className="button-container">
        <button className={view === "student" ? "active" : ""} onClick={() => setView("student")}>Student</button>
        <button className={view === "instructor" ? "active" : ""} onClick={() => setView("instructor")}>Instructor</button>
      </div>

      {view === "student" && (
        <div>
          <h1>Student View</h1>
          <div className="instructor-id-container">
            <input
              type="text"
              className="small-input"
              placeholder="Student ID"
              value={studentId}
              onChange={handleStudentIdChange}
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
                    <p>This is a description for {course.name}. You can add more details here.</p>
                    <p>
                      Category: <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{course.category}</span>
                    </p>
                    <a href="#" className="read-more">
                      Enroll
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
                <button className="small-button" onClick={() => setShowSelect(!showSelect)}>Select</button>
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
                        <p>This is a description for {course.name}. You can add more details here.</p>
                        <a href="#" className="read-more">
                          Manage
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
