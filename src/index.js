import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { debounce } from 'lodash';

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
import { AuthProvider, useAuth } from 'services/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

const showToast = debounce((message) => {
  toast.error(message);
}, 100);

const PrivateRoute = ({ element, path }) => {
  const { hasAdminOrStaffRole, token } = useAuth();

  if (path.startsWith('/admin') && !hasAdminOrStaffRole() && !token) {
    showToast("Bạn không có quyền truy cập");
    return <Navigate to="/login" replace />;
  }
  return element;
};



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/admin/*" element={<PrivateRoute element={<AdminLayout />} path="/admin/*" />} />
            <Route path="/*" element={<AuthLayout />} />
            <Route path="/shoes/*" element={<UserLayout />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
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
  </React.StrictMode>
);
