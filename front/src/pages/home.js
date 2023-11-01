import React from 'react';
import { Link } from 'react-router-dom';

const homePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'transparent',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
};

const linkContainerStyle = {
  display: 'flex',
  gap: '10px',
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid white',
  color: 'white',
  padding: '10px 20px',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'background-color 0.3s, color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: 'white',
  color: 'black',
};

function HomePage() {
  return (
    <div style={homePageStyle}>
      <h1>Welcome to Our 470 Project</h1>
      <div style={linkContainerStyle}>
        <Link to="/login" style={{ ...buttonStyle, ...linkStyle }}>
          Login
        </Link>
        <Link to="/signup" style={{ ...buttonStyle, ...linkStyle }}>
          Signup
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: 'none',
};

export default HomePage;
