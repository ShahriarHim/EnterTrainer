import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';


const Navbar = () => {

  // const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");

  // const handleLogout = async () => {
  //   try {
  //     await axios.get("http://localhost:5000/logout");
  //     localStorage.removeItem("token"); // Remove token from local storage
  //     navigate("/joinform"); // Redirect to login page
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .get("http://localhost:5000/bot", {
  //         headers: {
  //           Authorization: token,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         setIsLoggedIn(true);
  //         setUsername(res.data.user.username); // Assuming the response contains the username
  //         console.log(res.data.user.username);
  //         // console.log(res.data.user.id)style={{ width: '150px', height: '70px' }
  //       })
  //       .catch((err) => {
  //         setIsLoggedIn(false);
  //         navigate("/");
  //       });
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);


  return (
    // Navbar Start
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">
          <i className=""></i>Enter-Trainers
        </h2>
      </Link>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          <Link to="/about" className="nav-item nav-link">
            About
          </Link>
          <Link to="/courses" className="nav-item nav-link">
            Courses
          </Link>
          <div className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Pages
            </Link>
            <div className="dropdown-menu fade-down m-0">
              <Link to="/team" className="dropdown-item">
                Our Team
              </Link>
              <Link to="/testimonial" className="dropdown-item">
                Testimonial
              </Link>
              <Link to="/404" className="dropdown-item">
                404 Page
              </Link>
            </div>
          </div>
          <Link to="/contact" className="nav-item nav-link">
            Contact
          </Link>
        </div>

          <Link to="/joinform" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
            Join Now<i className="fa fa-arrow-right ms-3"></i>
          </Link>
          
      </div>
    </nav>
    // Navbar End
  );
};

export default Navbar;
