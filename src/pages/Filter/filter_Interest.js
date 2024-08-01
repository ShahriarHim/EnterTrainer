// FilterInterest.js
import React, { useState, useEffect } from 'react';
import Courses from './courses';
import './FilterInterest.css';

const FilterInterest = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Make a request to your backend with the selected values
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/course/genre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ genre: selectedValues }),
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Fetch data when selectedValues change
    fetchData();
  }, [selectedValues]);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectAll = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = selectAllCheckbox.checked;
    }

    displaySelectedValues();
  };

  const displaySelectedValues = () => {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const values = Array.from(checkedCheckboxes)
      .filter((checkbox) => checkbox.value !== 'Selected All')
      .map((checkbox) => checkbox.value);

    // Ensure that genres are always passed as an array
    setSelectedValues(values.length > 0 ? values : []);
  };

  const handleCheckboxChange = () => {
    displaySelectedValues();
  };

  return (
    <div>
      <div className="filter-interest" style={{ marginTop: '20px', backgroundColor: '#06BBCC', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <button onClick={handleToggleOptions} style={{ padding: '8px', backgroundColor: '#fff', color: '#06BBCC', border: '1px solid #06BBCC', borderRadius: '5px', cursor: 'pointer' }}>Select Interest</button>

        <div className="options-container" style={{ display: showOptions ? 'flex' : 'none', marginLeft: '10px' }}>
          <div className="checkbox-container" style={{ marginRight: '15px' }}>
            <input type="checkbox" id="selectAllCheckbox" value="Selected All" onClick={selectAll} /> Select All
          </div>
          <div className="checkbox-container" style={{ marginRight: '15px' }}>
            <input type="checkbox" id="checkboxOne" value="Guitar" onChange={handleCheckboxChange} />
            <label htmlFor="checkboxOne">Guitar</label>
          </div>

          <div className="checkbox-container" style={{ marginRight: '15px' }}>
            <input type="checkbox" id="checkboxTwo" value="Piano" onChange={handleCheckboxChange} />
            <label htmlFor="checkboxTwo">Piano</label>
          </div>

          <div className="checkbox-container" style={{ marginRight: '15px' }}>
            <input type="checkbox" id="checkboxThree" value="Violin" onChange={handleCheckboxChange} />
            <label htmlFor="checkboxThree">Violin</label>
          </div>

          <div className="checkbox-container" style={{ marginRight: '15px' }}>
            <input type="checkbox" id="checkboxFour" value="Mimicry" onChange={handleCheckboxChange} />
            <label htmlFor="checkboxFour">Mimicry</label>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="checkboxFive" value="Singing" onChange={handleCheckboxChange} />
            <label htmlFor="checkboxFive">Singing</label>
          </div>
        </div>

        {selectedValues.length > 0 && (
          <p style={{ marginLeft: '10px', fontSize: '20px', color: 'black' }}>
            Selected Interests: {selectedValues.join(', ')}
          </p>
        )}
      </div>

      <Courses selectedGenres={selectedValues} courses={courses} />
    </div>
  );
};

export default FilterInterest;
