import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import ProfileHeader from "components/Headers/ProfileHeader";

const Profile = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lấy userId từ localStorage
    const userId = localStorage.getItem("userId");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:33321/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, []);


  return (
    <>
      <ProfileHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody className="pt-0 pt-md-4">

                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-7">
                    <h3>
                      HoaPhuong
                    </h3>
                  </div>
                </div>

                <div className="text-center">
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Hồ sơ</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin cá nhân
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="fullname"
                          >
                            Họ tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="fullname"
                            type="text"
                            value={userData.fullname}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            type="email"
                            value={userData.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="birthday"
                          >
                            Sinh nhật
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="birthday"
                            type="date"
                            value={userData.dateOfBirth}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="phoneNumber"
                          >
                            Số điện thoại
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="phoneNumber"
                            type="tel"
                            value={userData.phoneNumber}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin liên lạc
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="address"
                            type="text"
                            value={userData.address}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Thành phố
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="city"
                            type="select"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Quận, Huyện
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="country"
                            type="select"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Xã
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="postal"
                            type="select"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
