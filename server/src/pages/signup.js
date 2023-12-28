import React from "react";


function Signup (){

        return(
            <div>

            

                <>
  {/* preloader start here */}
  <div className="preloader">
    <div className="preloader-inner">
      <div className="preloader-icon">
        <span />
        <span />
      </div>
    </div>
  </div>
  {/* preloader ending here */}
  {/* ==========Header Section Starts Here========== */}
  <header className="header-section">
    <div className="header-top">
      <div className="container">
        <div className="header-top-area">
          <ul className="left">
            <li>
              <i className="icofont-ui-call" /> <span>+800-123-4567 6587</span>
            </li>
            <li>
              <i className="icofont-location-pin" /> Beverley, New York 224 USA
            </li>
          </ul>
          <ul className="social-icons d-flex align-items-center">
            <li>
              <p>Find us on :</p>
            </li>
            <li>
              <a href="#" className="fb">
                <i className="icofont-facebook-messenger" />
              </a>
            </li>
            <li>
              <a href="#" className="twitter">
                <i className="icofont-twitter" />
              </a>
            </li>
            <li>
              <a href="#" className="vimeo">
                <i className="icofont-vimeo" />
              </a>
            </li>
            <li>
              <a href="#" className="skype">
                <i className="icofont-skype" />
              </a>
            </li>
            <li>
              <a href="#" className="rss">
                <i className="icofont-rss-feed" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="header-bottom">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <a href="index.html">
              <img src="assets/images/logo/logo.png" alt="logo" />
            </a>
          </div>
          <div className="menu-area">
            <ul className="menu">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="#0">Features</a>
                <ul className="submenu">
                  <li>
                    <a href="members.html">All Members</a>
                  </li>
                  <li>
                    <a href="profile.html">Member Profile</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/signup" className="active">
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a href="pricing-plan.html">Pricing Plan</a>
                  </li>
                  <li>
                    <a href="404.html">404 Page</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="active-group.html">Community</a>
              </li>
              <li>
                <a href="#0">Blog</a>
                <ul className="submenu">
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="blog-single.html">Blog Single</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
            <a href="/login" className="login">
              <i className="icofont-user" /> <span>LOG IN</span>{" "}
            </a>
            <a href="/signup" className="signup">
              <i className="icofont-users" /> <span>SIGN UP</span>{" "}
            </a>
            {/* toggle icons */}
            <div className="header-bar d-lg-none">
              <span />
              <span />
              <span />
            </div>
            <div className="ellepsis-bar d-lg-none">
              <i className="icofont-info-square" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  {/* ==========Header Section Ends Here========== */}
  {/* ==========Page Header Section Start Here========== */}
  <section
    className="page-header-section style-1"
    style={{ background: "url(assets/images/page-header.jpg)" }}
  >
    <div className="container">
      <div className="page-header-content">
        <div className="page-header-inner">
          <div className="page-title">
            <h2>TuruLav Registation</h2>
          </div>
          <ol className="breadcrumb">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li className="active">Sign up</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  {/* ==========Page Header Section Ends Here========== */}
  {/* ==========Sign up Section start Here========== */}
  <div className="login-section padding-tb">
    <div className="container">
      <div className="account-wrapper">
        <h3 className="title">Register Now</h3>
        <form className="account-form">
          <div className="form-group">
            <input type="text" placeholder="User Name" name="username" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Email" name="email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password"
            />
          </div>
          <div className="form-group">
            <button className="d-block lab-btn">
              <span>Get Started Now</span>
            </button>
          </div>
        </form>
        <div className="account-bottom">
          <span className="d-block cate pt-10">
            Are you a member? <a href="/login">Login</a>
          </span>
          <span className="or">
            <span>or</span>
          </span>
          <h5 className="subtitle">Register With Social Media</h5>
          <ul className="social-media social-color justify-content-center d-flex lab-ul">
            <li>
              <a href="#" className="facebook">
                <i className="icofont-facebook" />
              </a>
            </li>
            <li>
              <a href="#" className="twitter">
                <i className="icofont-twitter" />
              </a>
            </li>
            <li>
              <a href="#" className="linkedin">
                <i className="icofont-linkedin" />
              </a>
            </li>
            <li>
              <a href="#" className="instagram">
                <i className="icofont-instagram" />
              </a>
            </li>
            <li>
              <a href="#" className="pinterest">
                <i className="icofont-pinterest" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* ==========Sign up Section ends Here========== */}
  {/* ================ footer Section start Here =============== */}
  <footer className="footer-section">
    <div className="footer-top">
      <div className="container">
        <div className="row g-3 justify-content-center g-lg-0">
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="footer-top-item lab-item">
              <div className="lab-inner">
                <div className="lab-thumb">
                  <img
                    src="assets/images/footer/icons/01.png"
                    alt="Phone-icon"
                  />
                </div>
                <div className="lab-content">
                  <span>Phone Number : +88019 339 702 520</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="footer-top-item lab-item">
              <div className="lab-inner">
                <div className="lab-thumb">
                  <img
                    src="assets/images/footer/icons/02.png"
                    alt="email-icon"
                  />
                </div>
                <div className="lab-content">
                  <span>Email : admin@turulav.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="footer-top-item lab-item">
              <div className="lab-inner">
                <div className="lab-thumb">
                  <img
                    src="assets/images/footer/icons/03.png"
                    alt="location-icon"
                  />
                </div>
                <div className="lab-content">
                  <span>Address : 30 North West New York 240</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="footer-middle padding-tb"
      style={{ backgroundImage: "url(assets/images/footer/bg.png)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-middle-item-wrapper">
              <div className="footer-middle-item mb-lg-0">
                <div className="fm-item-title">
                  <h4>About TuruLav</h4>
                </div>
                <div className="fm-item-content">
                  <p className="mb-4">
                    Energistically coordinate highly efficient procesr
                    partnerships befor revolutionar growth strategie improvement
                    viaing awesome
                  </p>
                  <img
                    src="assets/images/footer/about.jpg"
                    alt="about-image"
                    className="footer-abt-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-middle-item-wrapper">
              <div className="footer-middle-item mb-lg-0">
                <div className="fm-item-title">
                  <h4>our Recent news</h4>
                </div>
                <div className="fm-item-content">
                  <div className="fm-item-widget lab-item">
                    <div className="lab-inner">
                      <div className="lab-thumb">
                        <a href="#">
                          {" "}
                          <img
                            src="assets/images/footer/01.jpg"
                            alt="footer-widget-img"
                          />
                        </a>
                      </div>
                      <div className="lab-content">
                        <h6>
                          <a href="blog-single.html">
                            Enable Seamin Matera Forin And Our Orthonal Create
                            Vortals.
                          </a>
                        </h6>
                        <p>July 23, 2021</p>
                      </div>
                    </div>
                  </div>
                  <div className="fm-item-widget lab-item">
                    <div className="lab-inner">
                      <div className="lab-thumb">
                        <a href="#">
                          <img
                            src="assets/images/footer/02.jpg"
                            alt="footer-widget-img"
                          />
                        </a>
                      </div>
                      <div className="lab-content">
                        <h6>
                          <a href="blog-single.html">
                            Dynamca Network Otuitive Catays For Plagiarize
                            Mindshare After
                          </a>
                        </h6>
                        <p>July 23, 2021</p>
                      </div>
                    </div>
                  </div>
                  <div className="fm-item-widget lab-item">
                    <div className="lab-inner">
                      <div className="lab-thumb">
                        <a href="#">
                          <img
                            src="assets/images/footer/03.jpg"
                            alt="footer-widget-img"
                          />
                        </a>
                      </div>
                      <div className="lab-content">
                        <h6>
                          <a href="blog-single.html">
                            Dynamca Network Otuitive Catays For Plagiarize
                            Mindshare After
                          </a>
                        </h6>
                        <p>July 23, 2021</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-middle-item-wrapper">
              <div className="footer-middle-item-3 mb-lg-0">
                <div className="fm-item-title">
                  <h4>Our Newsletter Signup</h4>
                </div>
                <div className="fm-item-content">
                  <p>
                    By subscribing to our mailing list you will always be update
                    with the latest news from us.
                  </p>
                  <form>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                    <button type="submit" className="lab-btn">
                      Send Massage <i className="icofont-paper-plane" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom-content text-center">
              <p>
                © 2022 <a href="index.html">TuruLav</a> -Best For Dating HTML
                Template.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* ================ footer Section end Here =============== */}
  {/* scrollToTop start here */}
  <a href="#" className="scrollToTop">
    <i className="icofont-rounded-up" />
  </a>
  {/* scrollToTop ending here */}
  {/* All Scripts */}
</>




        </div>
        );
    
}

export default Signup