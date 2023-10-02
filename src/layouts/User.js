import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

// core components
import UserNavbar from "components/Navbars/UserNavbar";
import UserFooter from "components/Footers/UserFooter.js";

import routes from "routes-user.js";

const User = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/shoes") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <UserNavbar />
               
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/shoes/home" replace />} />
            </Routes>
           
      </div>
      <UserFooter />
    </>
  );
};

export default User;
