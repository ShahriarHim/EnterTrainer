import React from "react";
// import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import Dashboard from "./Comp/dashboard";
// import About from "./HomePage/about";
// import Carousel from "./HomePage/carousel";
// import Service from "./HomePage/service";
import FilterInterest from "./Filter/filter_Interest";
// import FilterInterest from "./Filter/demo1";


const IndexPage = () => {
  return (
    <div>

      <Dashboard />
      <FilterInterest />
      {/* <FilterInterest /> */}
      <h2 style={{ textAlign: 'center' }}>Welcome after Login</h2>
      
      <Footer />

    </div>
  );
};

export default IndexPage;