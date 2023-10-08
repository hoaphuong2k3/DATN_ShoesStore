import axios from "axios";
import React, { useState, useEffect } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, CardFooter } from "reactstrap";
import Select from "react-select";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from "components/Headers/Header.js";


const Staff = () => {
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };


  const [provinces, setProvinces] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [gender, setGender] = useState(false);

  const fetchData = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);

      const adminsResponse = await axios.get("http://localhost:33321/api/account/admin");
      setAdmins(adminsResponse.data.content);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleRowClick = (admin) => {
    setSelectedAdmin(admin);
    setGender(admin.gender);
  };

  const deleteAdmin = (id) => {
    // Xử lý logic xóa admin ở đây
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Nhân viên</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm">
                      Thêm
                    </Button>
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm">
                      Cập nhật
                    </Button>
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm">
                      Xóa
                    </Button>
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm">
                      Mới
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>

                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label">
                            Tên tài khoản
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            id="user"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label">
                            Mật khẩu
                          </label>
                          {/* <InputGroup > */}
                          <Input
                            className="form-control-alternative"
                            type="text"
                            id="pass"
                          />
                          {/* <InputGroupAddon addonType="append">
                              <InputGroupText style={{ cursor: "pointer" }} onClick={toggleShowPassword}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup> */}
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label">
                            Giới tính
                          </label>
                          <div style={{ display: "flex" }}>
                            <div className="custom-control custom-radio">
                              <Input
                                className="custom-control-alternative"
                                id="nam"
                                name="gender"
                                type="radio"
                                value="Nam"
                                checked={!gender}
                                onChange={() => setGender(false)}
                              />Nam
                            </div>
                            <div className="custom-control custom-radio">
                              <Input
                                className="custom-control-alternative"
                                id="nu"
                                name="gender"
                                type="radio"
                                value="Nữ"
                                checked={gender}
                                onChange={() => setGender(true)}
                              />Nữ
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Họ tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            id="fullname"
                            value={selectedAdmin ? selectedAdmin.fullname : ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Sinh nhật
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            id="birth"
                            value={selectedAdmin ? selectedAdmin.dateOfBirth : ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Số điện thoại
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="tel"
                            id="phoneNumber"
                            value={selectedAdmin ? selectedAdmin.phoneNumber : ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            id="email"
                            value={selectedAdmin ? selectedAdmin.email : ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>


                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Thành Phố / Tỉnh
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                          >
                            <option value="">Chọn Thành Phố/Tỉnh</option>
                            {provinces.map((province) => (
                              <option key={province.code} value={province.name}>
                                {province.name}
                              </option>
                            ))}
                          </Input>


                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Quận/Huyện
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedCity}
                          >
                            <option value="">Chọn Quận/Huyện</option>
                            {selectedCity &&
                              provinces
                                .find((province) => province.name === selectedCity)
                                .districts.map((district) => (
                                  <option key={district.code} value={district.name}>
                                    {district.name}
                                  </option>
                                ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label" >
                            Phường/Xã
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            disabled={!selectedDistrict}
                          >
                            <option value="">Chọn Phường/Xã</option>
                            {selectedDistrict &&
                              provinces
                                .find((province) => province.name === selectedCity)
                                .districts.find((district) => district.name === selectedDistrict)
                                .wards.map((ward) => (
                                  <option key={ward.code} value={ward.name}>
                                    {ward.name}
                                  </option>
                                ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col md="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Danh sách</h3>
                  </div>
                  <div className="col text-right" style={{ display: "flex" }}>
                    <Col>
                      <Input id="search" type="text" placeholder="Search.." style={{ width: "250px" }} size="sm" />
                    </Col>

                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Export
                    </Button>
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Export
                    </Button>
                    <Button
                      color="primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Export
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Sinh nhật</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Hành động</th>

                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(admins) && admins.map((admin, index) => (

                    <tr key={admin.id}>
                      <td>{index + 1}</td>
                      <td>{admin.fullname}</td>
                      <td>{admin.dateOfBirth}</td>
                      <td>{admin.gender ? "Nữ" : "Nam"}</td>
                      <td>{admin.phoneNumber}</td>
                      <td>{admin.email}</td>
                      <td>{admin.addressDetail}, {admin.communeCode}, {admin.districtCode}, {admin.proviceCode} </td>
                      <td>
                        <Button color="info" size="sm" onClick={() => handleRowClick(admin)}>
                          <FaEdit />
                        </Button>
                        <Button color="danger" size="sm" onClick={() => deleteAdmin(admin.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <CardFooter>
                {/* Pagination */}
                {/* <div>
                  <button onClick={() => setPage(page - 1)}>Previous</button>
                  <span>Page {page + 1}</span>
                  <button onClick={() => setPage(page + 1)}>Next</button>
                </div> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default Staff;
