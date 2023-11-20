// FilterInterest.js

import React, { useState } from 'react';

const FilterInterest = () => {
  // State to store selected values
  const [selectedValues, setSelectedValues] = useState([]);

  // Options for the select dropdown
  const options = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
    { value: '5', label: 'Five' },
  ];

  // Handler for selecting values
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setSelectedValues(selectedOptions);
  };

  return (
    <div className="filter-interest">
      <select className="select" multiple onChange={handleSelectChange} value={selectedValues}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="form-label select-label">Example label</label>
    </div>
  );
};

export default FilterInterest;
