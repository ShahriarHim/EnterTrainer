import React from "react";
// import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import Dashboard from "./Comp/dashboard";
// import About from "./HomePage/about";
// import Carousel from "./HomePage/carousel";
// import Service from "./HomePage/service";
import Filter_Interest from "./Comp/filter_Interest";
import CourseGenres from "./Courses/courseGenre";

const IndexPage = () => {
  return (
    <div>

      <Dashboard />

      <h2 style={{ textAlign: 'center' }}>Hello User!</h2>
      
      <Filter_Interest />
      <CourseGenres />
      <Footer />

    </div>
  );
};

export default IndexPage;