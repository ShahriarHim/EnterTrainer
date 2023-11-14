import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="wrapper">
      <Link to="/" style={backLinkStyle}>
        <i className="fas fa-arrow-left"></i> Home
      </Link>
      <div className="title">
        Login Form
      </div>
      <form action="#">
        <div className="field">
          <input type="text" required />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input type="password" required />
          <label>Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <div className="pass-link">
            <a href="#">Forgot password?</a>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <a href="/signup">Signup now</a>
        </div>
      </form>
    </div>
  );
}

const backLinkStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  textDecoration: 'none',
  color: 'black',
  display: 'flex',
  alignItems: 'center',
};

export default LoginPage;
