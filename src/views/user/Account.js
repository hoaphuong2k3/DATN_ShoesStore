import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup, Form, Button,
  Input,
  CardTitle, Label
} from "reactstrap";
import { toast } from 'react-toastify';
import {
  FaCamera
} from "react-icons/fa";
import axiosInstance from "services/custommize-axios";
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
  const storedUserId = localStorage.getItem('userId');
  const [client, setClient] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/${storedUserId}`);
      if (response && response.data) {
        setClient(response.data);
        if (response.data.avatar) {
          const blob = await fetch(`data:image/jpeg;base64,${response.data.avatar}`).then((res) => res.blob());
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });
          setFile(file);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    id: storedUserId,
    fullname: "",
    phonenumber: "",
    email: "",
    username: "",
    gender: 'false',
    dateOfBirth: ""
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: storedUserId,
      fullname: client ? client.fullname : '',
      phonenumber: client ? client.phonenumber : '',
      email: client ? client.email : '',
      username: client ? client.username : '',
      gender: client ? client.gender : '',
      dateOfBirth: client ? client.dateOfBirth : ''
    }));
  }, [client]);

  const [activeTab, setActiveTab] = useState("profile");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const imageUrl = file ? URL.createObjectURL(file) : null;
  const imageSize = "200px";
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: "50%",
  };
  const buttonStyle = {
    top: "50%",
    left: "50%",
    color: "#000",
    cursor: "pointer",
    border: "1px solid rgba(128, 128, 128, 0.5)",
    width: imageSize,
    height: imageSize,
    borderRadius: "50%",
  };
  const onUpdateClient = async (e) => {
    try {
      changeAvatar()
      fetchData();
      toast.success("Cập nhật thành công!");
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
  }
  const changeAvatar = async () => {
    try {
      const image = new FormData();
      console.log(file);
      if (file) {
        image.append("file", file);
      }

      if (file) {
        await axiosInstance.put(`/user/${formData.id}/multipart-file`, image, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchData();
    } catch (error) {
      console.error("Failed to change avatar", error);
      // Xử lý lỗi (nếu cần)
    }
  };
  const AvatarReset = () => {
    setFile(null);
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-7">
          {client === null &&
            <div>
              Bạn chưa đăng nhập
            </div>
          }
          {client &&
            <>
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
                        <Form>
                          <div className="pl-lg-4">
                            <Row>
                              <Col lg="8">
                                <Col lg="12">
                                  <FormGroup>
                                    <Row>
                                      <label className="form-control-label col-3">
                                        Tên đăng nhập:
                                      </label>
                                      <div className="col-9">
                                        {client.username}
                                      </div>
                                    </Row>
                                  </FormGroup>
                                </Col>
                                <Col lg="12">
                                  <FormGroup>
                                    <Row>
                                      <label className="form-control-label col-3">
                                        Họ tên:
                                      </label>
                                      <div className=" col-9">
                                        <Input
                                          className="form-control-alternative"
                                          type="text"
                                          name="fullname"
                                          value={client.fullname}
                                        // onChange={onInputChange}
                                        />
                                      </div>

                                    </Row>
                                  </FormGroup>
                                </Col>
                                <Col lg="12">
                                  <FormGroup>
                                    <Row>
                                      <label className="form-control-label col-3">
                                        Email:
                                      </label>
                                      <div className=" col-9">
                                        <Input
                                          className="form-control-alternative"
                                          type="text"
                                          name="fullname"
                                          value={client.email}
                                        // onChange={onInputChange}
                                        />
                                      </div>
                                    </Row>
                                  </FormGroup>
                                </Col>
                                <Col lg="12">
                                  <FormGroup>
                                    <Row>
                                      <label className="form-control-label col-3">
                                        Số điện thoại:
                                      </label>
                                      <div className=" col-9">
                                        <Input
                                          className="form-control-alternative"
                                          type="text"
                                          name="fullname"
                                          value={client.phoneNumber}
                                        // onChange={onInputChange}
                                        />
                                      </div>
                                    </Row>
                                  </FormGroup>
                                </Col>
                                <Col lg="12">
                                  <FormGroup>
                                    <Row>
                                      <label className="form-control-label col-3">
                                        Giới tính:
                                      </label>
                                      <div style={{ display: "flex" }} className="col-9">
                                        <div className="custom-control custom-radio ml--4">
                                          <Input
                                            className="custom-control-alternative"
                                            id="nam"
                                            name="gender"
                                            type="radio"
                                            value={false}
                                            defaultChecked
                                            checked={client.gender === 'false'}
                                          // onClick={(e) => onInputChange(e)}
                                          />Nam
                                        </div>
                                        <div className="custom-control custom-radio">
                                          <Input
                                            className="custom-control-alternative"
                                            id="nu"
                                            name="gender"
                                            type="radio"
                                            value={true}
                                            checked={client.gender === 'true'}
                                          // onClick={(e) => onInputChange(e)}
                                          />Nữ
                                        </div>
                                      </div>
                                    </Row>
                                  </FormGroup>

                                </Col>
                                <Col lg="12">

                                  <FormGroup>
                                    <Row>
                                      <label className="form-control-label col-3">
                                        Ngày sinh:
                                      </label>
                                      <div className=" col-9">
                                        <Input
                                          className="form-control-alternative"
                                          type="date"
                                          name="dateOfBirth"
                                          value={client.dateOfBirth}
                                        // onChange={onInputChange}
                                        />
                                      </div>
                                    </Row>
                                  </FormGroup>
                                </Col>
                                <Col lg="12" className="d-flex justify-content-end">
                                  <Button color='primary' onClick={onUpdateClient}>Lưu</Button>
                                </Col>
                              </Col>
                              <Col lg="4" className="text-center">
                                <div style={buttonStyle} lg="4" className="ml-4">
                                  {imageUrl && (
                                    <img style={imageStyle}
                                      alt="preview"
                                      src={imageUrl}
                                    />
                                  )}
                                </div>
                                <Label htmlFor="file-input" className="btn btn-outline-primary mt-2 btn-sm" size="sm">
                                  Chọn file
                                </Label>
                                <Input
                                  type="file"
                                  id="file-input"
                                  style={{ display: "none" }}
                                  onChange={handleFileChange}
                                />
                              </Col>
                            </Row>
                          </div>
                        </Form>
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
            </>
          }
        </Row>
      </Container>
    </>
  );
};

export default Account;