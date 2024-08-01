import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPass.css';

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      // Send a request to your backend to generate a token
      const response = await fetch('/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Token generated successfully!');
        navigate('/reset-password');
      } else {
        alert(data.error || 'Token generation failed.');
      }
    } catch (error) {
      console.error('Error during token generation:', error);
    }
  };

  return (
    <div className="card">
      <p className="lock-icon"><i className="fas fa-lock"></i></p>
      <h2>Forgot Password?</h2>
      <p>You can reset your Password here</p>
      <input
        type="text"
        className="passInput"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ForgotPass;
