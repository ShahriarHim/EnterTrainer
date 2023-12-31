import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    university: '',
    bloodGroup: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jw_token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        const userType = decodedToken.userType;

        if (userType === 'INS') {
          // If user type is instructor, fetch instructor information
          const response = await axios.get(`/instructor/${userId}`);
          setUser(response.data);
        } else {
          // If user type is student, fetch student information
          const response = await axios.get(`/user/${userId}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
        // Handle error appropriately
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleEditClick = () => {
    setEditing(true);
    // Populate the form fields with the current user data
    setUpdatedUserInfo({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location || '',
      university: user.university || '',
      bloodGroup: user.bloodGroup || '',
    });
  };

  const handleInputChange = (e) => {
    setUpdatedUserInfo({ ...updatedUserInfo, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('jw_token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      const userType = decodedToken.userType;
      const fieldsToUpdate = {
        name: updatedUserInfo.name,
        email: updatedUserInfo.email,
        phone: updatedUserInfo.phone,
        location: updatedUserInfo.location,
        university: updatedUserInfo.university,
        bloodGroup: updatedUserInfo.bloodGroup,
      };
      if (userType === 'INS') {
        // If user type is instructor, fetch instructor information
        const response = await axios.put(`/instructor/${userId}`, fieldsToUpdate);
        setUser(response.data);
        setEditing(false);
        console.log('Profile updated successfully:', response.data);
      } else {
        // If user type is student, fetch student information
        const response = await axios.put(`/user/${userId}`, fieldsToUpdate);
        setUser(response.data);
        setEditing(false);
        console.log('Profile updated successfully:', response.data);
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ height: '600px', width: '500px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        {editing ? (
          <div>
            {/* Render input fields for editing */}
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedUserInfo.name}
              onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedUserInfo.email}
              onChange={handleInputChange}
            />
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={updatedUserInfo.phone}
              onChange={handleInputChange}
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={updatedUserInfo.location}
              onChange={handleInputChange}
            />
            <label>University:</label>
            <input
              type="text"
              name="university"
              value={updatedUserInfo.university}
              onChange={handleInputChange}
            />
            <label>Blood Group:</label>
            <input
              type="text"
              name="bloodGroup"
              value={updatedUserInfo.bloodGroup}
              onChange={handleInputChange}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button style={{ backgroundColor: '#06BBCC', marginRight: '10px' }}onClick={handleSaveClick}>
                Save
              </button>
              <button style={{ backgroundColor: '#06BBCC' }}>
                <Link style={{ color: 'black', textDecoration: 'none' }} to="/home">
                  Home
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Render user information */}
            <h2 style={{ textAlign: 'center' }}>{user.name}</h2>
            <br></br>
            <h5>Email: {user.email}</h5>
            <br></br>
            <h5>Phone: {user.phone}</h5>
            <br></br>
            <h5>Location: {user.location || 'Not specified'}</h5>
            <br></br>
            <h5>University: {user.university || 'Not specified'}</h5>
            <br></br>
            <h5>Blood Group: {user.bloodGroup || 'Not specified'}</h5>

            {/* Edit button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '160px' }}>
              <button style={{ backgroundColor: '#06BBCC', marginRight: '10px' }} onClick={handleEditClick}>
                Edit
              </button>
              <button style={{ backgroundColor: '#06BBCC' }}>
                <Link style={{ color: 'black', textDecoration: 'none' }} to="/home">
                  Home
                </Link>
              </button>
            </div>

          </div>

        )}
      </div>
    </div>
  );
};

export default Profile;
