import React from "react";
import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import About from "./HomePage/about";
import Carousel from "./HomePage/carousel";
import Service from "./HomePage/service";
// import CourseCategories from "./HomePage/categories";
import Instructors from "./HomePage/instructors";
import Courses from "./HomePage/courses";
// import Dashboard from "./Comp/dashboard";


const HomePage = () => {
  return (

    <div>
      <Carousel />
      <Courses />
      <Instructors />
      <Service />
      <About />
    </div>
  )
  {/* <Dashboard /> */ }


  {/* <Footer /> */ }



};

export default HomePage;
