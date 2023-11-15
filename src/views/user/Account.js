import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  CardTitle,
} from "reactstrap";

const Menu = ({ setActiveTab }) => {
  return (
    <div className="col-3">
      <Card
        className="shadow navbar-vertical navbar-expand-lg bg-white mb-lg-2 mt-3 pb-5"
        style={{ position: "sticky", top: "5", height: "90vh" }}
      >
        <CardHeader className="bg-transparent">
          <Row>
            <Col lg={3}>
              <img
                src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/`}
                alt=""
                width={40}
                height={40}
              />
            </Col>
            <Col lg={9}>
              <div>Username</div>
            </Col>
          </Row>
        </CardHeader>
        <style>
        {
            `
            .menu-link {
                display: block;
                padding: 10px;
                cursor: pointer;
                color: #333;
                text-decoration: none;
                transition: background-color 0.3s;
              }
              
              .menu-link:hover {
                background-color: #f0f0f0;
              }
            `
        }
    </style>
        <CardBody>
          <span
            className="menu-link"
            onClick={() => setActiveTab("profile")}
          >
            Hồ sơ
          </span>
          <span className="menu-link" onClick={() => setActiveTab("bank")}>
            Ngân hàng
          </span>
          <span className="menu-link" onClick={() => setActiveTab("address")}>
            Địa chỉ
          </span>
          <span
            className="menu-link"
            onClick={() => setActiveTab("password")}
          >
            Đổi mật khẩu
          </span>
        </CardBody>
      </Card>
    </div>
  );
};

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Container fluid>
        <Row className="mt-7">
          <Menu setActiveTab={setActiveTab} />
          <div className="col-9">
            {/* Profile */}
            {activeTab === "profile" && (
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    <h3> Hồ Sơ Của Tôi</h3>
                    <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    {/* Profile content */}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Bank */}
            {activeTab === "bank" && (
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    <h3>Ngân Hàng</h3>
                    <div>Quản lý thông tin ngân hàng</div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    {/* Bank content */}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Address */}
            {activeTab === "address" && (
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    <h3>Địa Chỉ</h3>
                    <div>Quản lý thông tin địa chỉ</div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    {/* Address content */}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Password */}
            {activeTab === "password" && (
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    <h3>Đổi Mật Khẩu</h3>
                    <div>Thay đổi mật khẩu của tài khoản</div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    {/* Password content */}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Account;