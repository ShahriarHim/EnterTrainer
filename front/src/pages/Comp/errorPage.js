// ErrorPage.js
import React from 'react';

const ErrorPage = ({ message }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
