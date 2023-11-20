import React, { useState } from 'react';

const FilterInterest = () => {
  const [selectedValues, setSelectedValues] = useState('');

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
    const values = Array.from(checkedCheckboxes).map((checkbox) => checkbox.value).join(', ');
    setSelectedValues(values);
  };

  const handleCheckboxChange = () => {
    displaySelectedValues();
  };

  return (
    <div id="selection-box" style={{ backgroundColor: '#06BBCC', maxWidth: '300px', padding: '15px', borderRadius: '8px' }}>
      <div className="checkbox-container">
        <input type="checkbox" id="selectAllCheckbox" value="selectAll" onClick={selectAll} /> Select Interest
      </div>

      <div className="checkbox-container">
        <input type="checkbox" id="checkboxOne" value="one" onChange={handleCheckboxChange} />
        <label htmlFor="checkboxOne">Guitar</label>
      </div>

      <div className="checkbox-container">
        <input type="checkbox" id="checkboxTwo" value="two" onChange={handleCheckboxChange} />
        <label htmlFor="checkboxTwo">Violin</label>
      </div>

      <div className="checkbox-container">
        <input type="checkbox" id="checkboxThree" value="three" onChange={handleCheckboxChange} />
        <label htmlFor="checkboxThree">Piano</label>
      </div>

      <div className="checkbox-container">
        <input type="checkbox" id="checkboxFour" value="four" onChange={handleCheckboxChange} />
        <label htmlFor="checkboxFour">Singing</label>
      </div>

      <div className="checkbox-container">
        <input type="checkbox" id="checkboxFive" value="five" onChange={handleCheckboxChange} />
        <label htmlFor="checkboxFive">Mimicry</label>
      </div>

      <p>
        Selected Genres: <span id="selectedValues">{selectedValues}</span>
      </p>
    </div>
  );
};

export default FilterInterest;
