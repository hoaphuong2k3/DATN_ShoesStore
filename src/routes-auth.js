import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";


var routes = [
 
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-books text-info",
    component: <Login />,
    layout: "/",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-books text-info",
    component: <Register />,
    layout: "/",
  },
];
export default routes;
