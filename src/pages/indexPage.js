import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from './Comp/footer';
import Dashboard from './Comp/dashboard';
import FilterInterest from './Filter/filter_Interest';
import ShowAllCourses from './Instructor/showAllCourses';
import jwt_decode from 'jwt-decode';
import Service from './HomePage/service';

const IndexPage = () => {
  const [isInstructor, setIsInstructor] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('jw_token');

    // Decode the JWT token to extract user information
    const decodedToken = jwt_decode(token);
    console.log('Decoded token:', decodedToken);

    const userType = decodedToken.userType;
    setUserName(decodedToken.userName);

    // Check if the userType in the decoded token is 'INS'
    if (userType === 'INS') {
      setIsInstructor(true);
    }
  }, []);

  return (
    <div>
      <Dashboard />
      {isInstructor ? <ShowAllCourses /> : <FilterInterest />}
      <h2 style={{ textAlign: 'center' }}>Welcome! Hello... {userName}</h2>
      <Service />

      {/* Add a button to navigate to Create Course page */}
      {isInstructor && (
        <Link to="/create-course" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
          <button style={{ backgroundColor: '#06BBCC', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}>
            Create Course
          </button>
        </Link>
      )}

      <Footer />
    </div>
  );
};

export default IndexPage;
