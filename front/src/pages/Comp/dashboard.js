import React from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.removeItem('jw_token');
    navigate('/joinform');
  };

  return (

    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">

      <a to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <img 
        src="/assets/img/Icon.png" 
        alt="Icon" 
        className="icon"
        style={{ width: '60px', height: '60px', marginRight: '5px' }} 
        />
        <h2 className="m-0 text-primary">
          Enter-Trainer
        </h2>
      </a>


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
          <a to="" className="nav-item nav-link active" onClick={() => handleNavigation('/home')}>
            Home
          </a>
          <a to="" className="nav-item nav-link" onClick={() => handleNavigation('/show-courses')}>
            Courses
          </a>
          <a to="" className="nav-item nav-link" onClick={() => handleNavigation('/profile')}>
            Profile
          </a>
        </div>

        <a to="/joinform" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block" onClick={handleLogout}>
          Log Out<i className="fa fa-arrow-right ms-3"></i>
        </a>

      </div>
    </nav>

  );
};

export default Dashboard;
