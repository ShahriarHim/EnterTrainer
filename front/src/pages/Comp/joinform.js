import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const JoinForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    cpassword: '',
  });


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          cpassword: formData.cpassword,  
        }),
      });

      const data = await response.json();
      console.log(data);

     
      if (response.ok) {
        alert('Registration successful');
        handleLoginClick();
      } else {
        alert(data.message);
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,  
        }),
      });

      const data = await response.json();
      console.log(data);


      if (response.ok) {
        alert('Log in Successful!');
        navigate('/');
      } else {
  
        alert('Invalid credentials! Try again');
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleSignupClick = () => {
   
      const loginForm = document.querySelector("form.login");
      const loginText = document.querySelector(".title-text .login");
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    };
  
    const handleLoginClick = () => {

      const loginForm = document.querySelector("form.login");
      const loginText = document.querySelector(".title-text .login");
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    };
  
    const handleSignupLinkClick = (e) => {
      e.preventDefault();
      const signupBtn = document.querySelector("label.signup");
      signupBtn.click();
    };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" defaultChecked />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login" onClick={handleLoginClick}>
            Login
          </label>
          <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
        <form action="#" className='login'onSubmit={handleLoginSubmit }>
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login"/>
            </div>
            <br></br><br></br>
            <div className="signup-link">
              Not a member?{' '}
              <a href=""  onClick={handleSignupLinkClick}>
                Signup now
              </a>
            </div>
            <Link to="/" style={{ display: 'block', textAlign: 'center' }}>
              Go to Home
            </Link>

          </form>
          <form action="#" className="signup" onSubmit={handleSignupSubmit}>
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm password"
              value={formData.cpassword}
              onChange={handleChange}
              required
            />
          </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default JoinForm;
