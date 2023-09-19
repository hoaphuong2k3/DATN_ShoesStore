import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";

// components

import UserNavbar from "components/Navbars/UserNavbar.js";
import UserFooter from "components/Footers/UserFooter.js";

// views

import Home from "views/user/Home.js";
import Product from "views/user/ListProduct.js";
import News from "views/user/News.js";
import Introduce from "views/user/Introduce.js";
import Contact from "views/user/Contact.js";

const User = () => {
  return (
    <>
      
        <UserNavbar />
          <Routes>
            <Route path="/shoes/home" element={<Home />} />
            <Route path="/shoes/introduce" element={<Introduce />} />
            <Route path="/shoes/product" element={<Product />} />
            <Route path="/shoes/news" element={<News />} />
            <Route path="/shoes/contact" element={<Contact />} />
            <Route path="/shoes" element={<Navigate to="/shoes/home" replace />} />
          </Routes>
          <UserFooter />
      
    
    </>
  );
}
export default User;