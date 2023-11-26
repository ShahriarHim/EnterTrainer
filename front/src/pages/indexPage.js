import React from "react";
// import Navbar from "./Comp/navbar";
import Footer from "./Comp/footer";
import Dashboard from "./Comp/dashboard";
// import About from "./HomePage/about";
// import Carousel from "./HomePage/carousel";
// import Service from "./HomePage/service";
import FilterInterest from "./Filter/filter_Interest";
// import ShowCourses from "./User/showCourses";
// import FilterInterest from "./Filter/demo1";


const IndexPage = () => {
  return (
    <div>

      <Dashboard />
      <FilterInterest />
      {/* <iframe width="600" height="300" src="https://www.youtube.com/embed/oMLJn5DB2j0" title="Ruth B. - Dandelions (Lyrics)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      {/* <FilterInterest /> */}
      <h2 style={{ textAlign: 'center' }}>Welcome after Login</h2>
      {/* <ShowCourses/> */}
      <Footer />

    </div>
  );
};

export default IndexPage;