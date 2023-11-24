import React from "react";
import Footer from "../Comp/footer";
import Dashboard from "../Comp/dashboard";
import FilterInterest from "../Filter/filter_Interest";



const InsHome = () => {
  return (
    <div>

      <Dashboard />
      <FilterInterest />
      <h2 style={{ textAlign: 'center' }}>Hello Instructor</h2>
      <Footer />

    </div>
  );
};

export default InsHome;