import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes-auth.js";

const Auth = (props) => {

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
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
      <div className="main-content" style={{ backgroundImage: "url('https://designs.vn/wp-content/images/22-08-2019/6-phoi-canh-de-anh-chup-bai-bien-tro-nen-thu-vi-hon-1.jpg')", backgroundSize: "cover", backgroundPosition: "center center", height: "auto" }}>
        <AuthNavbar />
        {/* <div className="header py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Xin chào!</h1>
                  <p className="text-lead text-light">
                    Chúng tôi chân thành chào đón tất cả các bạn đã ghé thăm trang web của Leather Gent.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div> */}
        {/* Page content */}
        <Container className="pt-9">
          <Row className="justify-content-center">
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Row>
        </Container>

        <AuthFooter />
      </div>
      
    </>
  );
};

export default Auth;
