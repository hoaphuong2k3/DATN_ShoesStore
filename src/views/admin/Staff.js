import axios from "axios";
import React, { useState, useEffect } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, CardFooter, CardTitle, Label, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import Select from "react-select";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from "components/Headers/Header.js";
import Switch from 'react-input-switch';
import { toast } from 'react-toastify';


const Staff = () => {

  const [modalAdd, setModalAdd] = useState(false);
  const toggle = () => setModalAdd(!modalAdd);
  const [value, setValue] = useState('no');
  const [provinces, setProvinces] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [gender, setGender] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [admin, setAdmin] = useState({
    username: "",
    fullname: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",

  });

  const onInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("http://localhost:33321/api/admin/create");
      toggle();
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
  };

  const handleModalAdd = () => {
    toggle();
  }

  const fetchData = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);

      const adminsResponse = await axios.get("http://localhost:33321/api/admin");
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
              <CardBody className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Nhân viên</h3>
                  </div>
                  <div className="col text-right btn-crud">
                    <Button
                      color="primary"
                      onClick={handleModalAdd}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4 mt-4">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card>
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      <h3>Tìm kiếm</h3>
                    </CardTitle>

                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
                </Row>
                <Form className="search">
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Mã
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Nhập mã"
                            type="text"
                            name="code"
                          // value={search.code}
                          // onChange={(e) => onInputChange(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Nhập tên"
                            type="text"
                            name="name"
                          // value={search.name}
                          // onChange={(e) => onInputChange(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {value === 'yes' &&
                      <Row>
                        <Col lg="6">
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
                        <Col lg="6">
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
                      </Row>
                    }
                  </div>
                </Form>
                <Row className="mt-2 search">
                  <Col lg="6" xl="4" >
                    <span>
                      <Switch on="yes" off="no" value={value} onChange={setValue} />
                      <span>
                        &nbsp;&nbsp;
                        Tìm kiếm nâng cao
                        &nbsp;&nbsp;
                      </span>
                    </span>
                  </Col>
                  <Col lg="6" xl="8">
                    <Button color="warning" >
                      <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                      Tìm kiếm
                    </Button>
                    <Button color="primary">
                      Làm mới bộ lọc
                    </Button>
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col md="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center export">
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
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Ngày sinh</th>
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

              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container >
      <Modal
        isOpen={modalAdd}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
        style={{ maxWidth: '900px' }}
      >
        <ModalHeader toggle={toggle}>
          Thêm nhân viên
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
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
                      name="username"
                      onChange={onInputChange}
                      value={admin.username}
                    />
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
                      name="fullname"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Ngày sinh
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="date"
                      id="birth"
                      name="dateOfBirth"
                      onChange={(e) => onInputChange(e)}
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
                      onChange={(e) => onInputChange(e)}
                      id="phoneNumber"
                      name="phoneNumber"
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
                      onChange={(e) => onInputChange(e)}
                      id="email"
                      name="email"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className="pl-lg-4">
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      Tỉnh / Thành
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Chọn Tỉnh / Thành</option>
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
                    <label className="form-control-label" htmlFor="input-country">
                      Quận / Huyện
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      disabled={!selectedCity}
                    >
                      <option value="">Chọn Quận / Huyện</option>
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
                    <label className="form-control-label">
                      Phường / Xã
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                      disabled={!selectedDistrict}
                    >
                      <option value="">Chọn Phường / Xã</option>
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
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" type="submit">
              Thêm
            </Button>
            <Button color="secondary" onClick={toggle}>
              Hủy
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Staff;
