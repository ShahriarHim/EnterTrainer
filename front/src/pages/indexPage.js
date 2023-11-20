import React from "react";
// import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import Dashboard from "./Comp/dashboard";
// import About from "./HomePage/about";
// import Carousel from "./HomePage/carousel";
// import Service from "./HomePage/service";
import Filter_Interest from "./Comp/filter_Interest";

const IndexPage = () => {
  return (
    <div>

      <Dashboard />

      <h2 style={{ textAlign: 'center' }}>Welcome after Login</h2>
      
      <Filter_Interest />
      <Footer />

    </div>
  );
};

export default IndexPage;