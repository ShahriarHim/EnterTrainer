import React, { useEffect, useState } from 'react';
import Footer from './Comp/footer';
import Dashboard from './Comp/dashboard';
import FilterInterest from './Filter/filter_Interest';
import ShowAllCourses from './Instructor/showAllCourses'; // Import the ShowAllCourses component
import jwt_decode from 'jwt-decode';
import Service from './HomePage/service';

const IndexPage = () => {
  const [isInstructor, setIsInstructor] = useState(false);
  const [userName, setUserName] = useState('')
  useEffect(() => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('jw_token');

    // Decode the JWT token to extract user information
    const decodedToken = jwt_decode(token);
    console.log('Decoded token:', decodedToken); // Log the decoded token to check its structure

    const userType = decodedToken.userType;
    setUserName(decodedToken.userName); // Fix this line
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
      <Footer />
    </div>
  );
};

export default IndexPage;
