import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserLayout from "layouts/User.js";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./contexts/Cart";
import { AuthProvider } from 'services/AuthContext.js';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/*" element={<AuthLayout />} />
          <Route path="/shoes/*" element={<UserLayout />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
    {/* // <DetailSP /> */}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);
