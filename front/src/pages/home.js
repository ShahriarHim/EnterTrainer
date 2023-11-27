import React from "react";
import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import About from "./HomePage/about";
import Carousel from "./HomePage/carousel";
import Service from "./HomePage/service";
import CourseCategories from "./HomePage/categories";

const HomePage = () => {
  return (
    <div>
   
      <Navbar />
      <Carousel />
      <CourseCategories />
      <Service />
      <About />
      <Footer />

    </div>
  );
};

export default HomePage;
