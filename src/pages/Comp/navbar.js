import React from 'react';
// import axios from "axios";
import { NavLink } from 'react-router-dom';


const Navbar = () => {




  return (
    // Navbar Start
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <NavLink
        to="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">
          <i className=""></i>Enter-Trainer
        </h2>
      </NavLink>
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
          <NavLink to="/" className="nav-item nav-link active">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item nav-link">
            About
          </NavLink>
          <NavLink to="/categories" className="nav-item nav-link">
            Categories
          </NavLink>
          {/*<div className="nav-item dropdown">
             <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Pages
            </Link> */}
          {/* <div className="dropdown-menu fade-down m-0">
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
        </div> */}

          <NavLink to="/joinform" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
            Join Now<i className="fa fa-arrow-right ms-3"></i>
          </NavLink>

        </div>
      </div>
    </nav>
    // Navbar End
  );
};

export default Navbar;
