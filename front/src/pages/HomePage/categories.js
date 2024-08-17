import React from 'react';
import { Link } from "react-router-dom";

const CourseCategories = () => {
  return (
    // Categories Start
    <div className="container-xxl py-5 category">
      <div className="container">
        <div className="text-center wow fadeInUp mb-5" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Categories</h6>
          <h1 className="mb-2">Courses Categories</h1>

            {/* <Link to="/" className="">
            Home
              </Link> */}

        </div>
        <div className="row g-3">
          <div className="col-lg-7 col-md-6">
            <div className="row g-3">
              <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                <a className="position-relative d-block overflow-hidden" href="">
                  <img className="img-fluid" src="/assets/img/Piano.jpg" alt="Web Design" />
                  <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: '1px' }}>
                    <h5 className="m-0">Piano</h5>
                    <small className="text-primary">1 Courses</small>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                <a className="position-relative d-block overflow-hidden" href="">
                  <img className="img-fluid" src="/assets/img/Violin.jpg" alt="Graphic Design" />
                  <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: '1px' }}>
                    <h5 className="m-0">Violin</h5>
                    <small className="text-primary">2 Courses</small>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                <a className="position-relative d-block overflow-hidden" href="">
                  <img className="img-fluid" src="/assets/img/Mic4.jpg" alt="Video Editing" />
                  <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: '1px' }}>
                    <h5 className="m-0">Singing</h5>
                    <small className="text-primary">1 Courses</small>
                  </div>

                </a>
                

              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{ minHeight: '350px' }}>
            <a className="position-relative d-block h-100 overflow-hidden" href="">
              <img
                className="img-fluid position-absolute w-100 h-100"
                src="/assets/img/guitar.jpg"
                alt="Online Marketing"
                style={{ objectFit: 'cover' }}
              />
              <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: '1px' }}>
                <h5 className="m-0">Guitar</h5>
                <small className="text-primary">3 Courses</small>
              </div>
            </a>
          </div>
          <p style={{ color: 'orange', textAlign: 'center', fontSize: '40px', }}>And many more...</p>
        </div>
      </div>
    </div>
    // Categories End
  );
};

export default CourseCategories;
