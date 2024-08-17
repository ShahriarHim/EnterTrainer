// Layout.js
import React from 'react';
import Navbar from '../pages/Comp/navbar';
import Footer from '../pages/Comp/footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
