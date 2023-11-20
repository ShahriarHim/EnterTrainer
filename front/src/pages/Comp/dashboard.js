import React from 'react';

import { Link } from 'react-router-dom';


const Dashboard = () => {

  return (

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
          <Link to="/courses" className="nav-item nav-link">
            Courses
          </Link>
          <Link to="/contact" className="nav-item nav-link">
            Profile
          </Link>
        </div>

          <Link to="/joinform" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
            Log Out<i className="fa fa-arrow-right ms-3"></i>
          </Link>
          
      </div>
    </nav>

  );
};

export default Dashboard;
