import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    genre: '',
    name: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://entertrainer-2.onrender.com/course/create-course', courseData);

      if (response.data.success) {
        alert('Course created successfully');
        // Optionally, you can redirect the user to another page or perform other actions
      } else {
        alert('Failed to create course. Please check your input.');
      }
    } catch (error) {
      console.error('Error creating course:', error.response ? error.response.data.error : error.message);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={courseData.genre}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Course Name:</label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Details:</label>
          <textarea
            name="details"
            value={courseData.details}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          ></textarea>
        </div>

        <button type="submit" style={{ backgroundColor: '#06BBCC', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}>
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
