import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPass.css';

const ResetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    try {
      // Make a request to your backend to validate the token and update the password
      const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password Reset successful!');
        navigate('/joinForm');
      } else {
        alert(data.error || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div className="card">
      <p className="lock-icon"><i className="fas fa-lock"></i></p>
      <h2>Reset Password</h2>
      <input
        type="text"
        className="passInput"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="passInput"
        placeholder="Enter Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <input
        type="password"
        className="passInput"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ResetPass;
