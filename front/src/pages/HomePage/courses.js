import React from "react";
// import './Courses.css'; // Add your styling
import Navbar from "../Comp/navbar";
import Footer from "../Comp/footer";
import CourseCategories from "./categories";

const Courses = () => {
    return (
        <div>
            {/* Category Start */}
            <div className="">
                <div className="">
                    {/* <div className="text-center mb-5">
                        <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Subjects</h5>
                        <h1>Explore Top Subjects</h1>
                    </div> */}
                    {/* <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-1.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Web Design</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-2.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Development</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-3.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Game Design</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-4.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Apps Design</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-5.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Marketing</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-6.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Research</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-7.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">Content Writing</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src="/assets/img/cat-8.jpg" alt=""/>
                                <a className="cat-overlay text-white text-decoration-none" href="">
                                    <h4 className="text-white font-weight-medium">SEO</h4>
                                    <span>100 Courses</span>
                                </a>
                            </div>
                        </div>
                    </div> */}
                    <CourseCategories />
                </div>
            </div>
            {/* Category End */}

            {/* Courses Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Courses</h5>
                        <h1>Our Popular Courses</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src="https://images.squarespace-cdn.com/content/v1/5b7d8ac7697a988b951bdc95/1611728210677-016BGGS79ZRHB96CKQS3/image-9.jpg?format=2500w" alt=""
                                    style={{
                                        height: '300px',     // Set the desired height
                                        objectFit: 'cover',   // Ensure the image covers the area without distortion
                                        width: '100%'         // Ensure the image fills the container width
                                    }}
                                />
                                <div className="bg-secondary p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>45 Students</small>
                                        <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>01h 30m</small>
                                    </div>
                                    <a className="h5" href="">Acoustic Guitar</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>4.7 <small>(350)</small></h6>
                                            <h5 className="m-0">$399</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src="https://www.shutterstock.com/image-vector/illustration-young-beautiful-indian-classical-260nw-1478234756.jpg" alt=""
                                    style={{
                                        height: '300px',     // Set the desired height
                                        objectFit: 'cover',   // Ensure the image covers the area without distortion
                                        width: '100%'         // Ensure the image fills the container width
                                    }}
                                />
                                <div className="bg-secondary p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>25 Students</small>
                                        <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>01h 30m</small>
                                    </div>
                                    <a className="h5" href="">Classical Dance</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>4.0 <small>(120)</small></h6>
                                            <h5 className="m-0">$199</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src="https://media.istockphoto.com/id/636761588/photo/used-brushes-on-an-artists-palette-of-colorful-oil-paint.jpg?s=612x612&w=0&k=20&c=38YQxVJVWnNfvGtlb7AXMx_ItyHZMEdmWenNkWNQ91g=" alt=""
                                    style={{
                                        height: '300px',     // Set the desired height
                                        objectFit: 'cover',   // Ensure the image covers the area without distortion
                                        width: '100%'         // Ensure the image fills the container width
                                    }}
                                />
                                <div className="bg-secondary p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>30 Students</small>
                                        <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>01h 30m</small>
                                    </div>
                                    <a className="h5" href="">Acrylic Painting</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>5.0 <small>(190)</small></h6>
                                            <h5 className="m-0">$129</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* More courses go here */}
                    </div>
                </div>
            </div>
            {/* Courses End */}
        </div>
    );
};

export default Courses;
