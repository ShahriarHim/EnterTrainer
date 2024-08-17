import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Comp/navbar";
import Footer from "../Comp/footer";
import Layout from "../layout";
import OwlCarousel from 'react-owl-carousel'; // Import Owl Carousel
import 'owl.carousel/dist/assets/owl.carousel.css'; // Import Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Import Owl Carousel CSS
function About() {
  return (
    <div>
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
                  src="/assets/img/Logo2.png"
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
                    <i className="fa fa-chalkboard-teacher text-primary me-2"></i>
                    Skilled Instructors
                  </h4>
                  <h4 className="mb-0">
                    <i className="fa fa-book-open text-primary me-2"></i>
                    Versatile Courses
                  </h4>
                  <h4 className="mb-0">
                    <i className="fa fa-comments text-primary me-2"></i>
                    Student Community
                  </h4>
                </div>
                {/* ... (repeat for other items) ... */}
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="">
                Read More
              </a>
              {/* <div className="mt-2">
                <Link to="/" className="">
                  <i className="fa fa-arrow-left text-primary me-2"></i>Home
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>


      <div
        className="container-fluid bg-registration py-5"
        style={{
          backgroundImage: `url('/assets/img/guitar.jpg')`, // Add background image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: "90px 0",
          position: "relative", // Ensure proper stacking
          zIndex: 1,
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h5
                  className="text-primary text-uppercase mb-3"
                  style={{ letterSpacing: "5px" }}
                >
                  Need Any Courses
                </h5>
                <h1 className="text-white">30% Off For New Students</h1>
              </div>
              <p className="text-white">
                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
                dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
                Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                dolor.
              </p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>
                  Labore eos amet dolor amet diam
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>
                  Etsea et sit dolor amet ipsum
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>
                  Diam dolor diam elitr ipsum vero.
                </li>
              </ul>
            </div>
            <div className="col-lg-5" >
              <div
                className="card border-0 shadow-lg" // Add shadow for better visibility
                style={{
                  zIndex: 2, // Ensure the form is in the foreground
                  position: "relative",
                  // height: "400px"
                }}
              >
                <div className="card-header bg-light text-center " style={{ width: "100%", height: "20%" }}>
                  <h1 className="m-0">Sign Up Now</h1>
                </div>
                <div className="card-body rounded-bottom bg-primary p-5" style={{ width: "100%", height: "50%" }}>
                  <form >
                    <div className="form-group mb-2 " style={{ height: "60px" }}>
                      <input
                        type="text"
                        className="form-control border-0 p-3"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group mb-2" style={{ height: "60px" }}>
                      <input
                        type="email"
                        className="form-control border-0 p-3"
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <select
                        className="custom-select border-0 px-3"
                        style={{ height: "47px", width: "100%" }}
                      >
                        <option defaultValue>Select a course</option>
                        <option value="1">Course 1</option>
                        <option value="2">Course 2</option>
                        <option value="3">Course 3</option>
                      </select>
                    </div>
                    <div>
                    <button
                        className="btn btn-dark btn-block border-0 py-3"
                        type="submit"
                      >
                        Sign Up Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Registration Section End */}

      {/* Testimonial Section Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5
              className="text-primary text-uppercase mb-3"
              style={{ letterSpacing: "5px" }}
            >
              Testimonial
            </h5>
            <h1>What Our Students Say</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                items={1}
                dots={true} // Use dots for navigation
                nav={false} // Disable arrow navigation
                responsive={{
                  0: { items: 1 },
                  600: { items: 1 },
                  1000: { items: 1 },
                }}
              >
                <div className="item text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                  <h4 className="font-weight-normal mb-4">
                    "Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum
                    elitr dolore et eos labore."
                  </h4>
                  <img
                    className="img-fluid mx-auto mb-3 rounded-circle"
                    src="/assets/img/testimonial-1.jpg"
                    alt="Client"
                    style={{
                      width: "150px", // Resize the image
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="m-0">Client Name</h5>
                  <span>Profession</span>
                </div>
                <div className="item text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                  <h4 className="font-weight-normal mb-4">
                    "Rebum elitr dolore et eos labore. Diam sed sed dolor stet
                    amet eirmod eos labore."
                  </h4>
                  <img
                    className="img-fluid mx-auto mb-3 rounded-circle"
                    src="/assets/img/testimonial-2.jpg"
                    alt="Client"
                    style={{
                      width: "150px", // Resize the image
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="m-0">Client Name</h5>
                  <span>Profession</span>
                </div>
                <div className="item text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                  <h4 className="font-weight-normal mb-4">
                    "Diam sed sed dolor stet amet eirmod eos labore diam. Lorem
                    justo sanctus clita."
                  </h4>
                  <img
                    className="img-fluid mx-auto mb-3 rounded-circle"
                    src="/assets/img/testimonial-3.jpg"
                    alt="Client"
                    style={{
                      width: "150px", // Resize the image
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="m-0">Client Name</h5>
                  <span>Profession</span>
                </div>
              </OwlCarousel>
              <style>
                {`
                  .owl-dots {
                    text-align: center;
                    position: absolute;
                    bottom: 10px;
                    left: 100%;
                    width: 100%;
                  }

                  .owl-dot {
                    display: inline-block;
                    margin: 0 5px;
                  }

                  .owl-dot span {
                    background-color: #06bbcc;
                  }

                  .owl-dot.active span {
                    background-color: #333;
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial Section End */}
    </div>

  );
}

export default About;
