import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import About from "./HomePage/about";
import Carousel from "./HomePage/carousel";
import Service from "./HomePage/service";

function HomePage() {
  return (
    <div>
      {/* Add the Navbar component */}
      <Navbar />
      {/* Add the Carousel component */}
      <Carousel />
      {/* Add the Service component */}
      <Service />
      {/* Add the About component */}
      <About />
      {/* Add the Footer component */}
      <Footer />
    </div>
  );
}
const linkStyle = {
  textDecoration: "none",
};

export default HomePage;
