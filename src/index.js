import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
<<<<<<< HEAD
import DetailSP from "views/user/detailsp";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/admin/*" element={<AdminLayout />} />
  //     <Route path="/auth/*" element={<AuthLayout />} />
  //     <Route path="*" element={<Navigate to="/auth/login" replace />} />
  //   </Routes>
  // </BrowserRouter>
  <DetailSP />
=======
import UserLayout from "layouts/User.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/*" element={<AuthLayout />} />
      <Route path="/shoes/*" element={<UserLayout />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
>>>>>>> ffa38db537c913cb61d567db30bd726913a17b78
);
