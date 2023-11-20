import React from "react";
import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import About from "./HomePage/about";
import Carousel from "./HomePage/carousel";
import Service from "./HomePage/service";


const HomePage = () => {
  return (
    <div>
   
      <Navbar />
      <Carousel />
      <Service />
      <About />
      <Footer />

    </div>
  );
};

export default HomePage;
