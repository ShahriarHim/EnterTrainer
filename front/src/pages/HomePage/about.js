import React from "react";

function About() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ minHeight: "400px" }}
          >
            <div className="position-relative h-100">
              <img
                className="img-fluid position-absolute w-100 h-100"
                src="/assets/img/Logo.png"
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h6 className=" bg-blue text-start text-primary pe-3">
              About Us
            </h6>
            <h1 className="mb-4">Welcome to Enter-Trainer</h1>
            <h6 className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit.
            </h6>
            <h6 className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </h6>
            <div className="row gy-2 gx-4 mb-4">
              <div className="col-sm-6">
                <h4 className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2"></i>Skilled
                  Instructors
                </h4>
              </div>
              {/* ... (repeat for other items) ... */}
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2" href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
