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
  CardTitle, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from "services/custommize-axios";
import axios from "axios";
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
        onClickListAdress(storedUserId);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
  const [formData1, setFormData1] = useState({
    id: storedUserId,
    fullname: "",
    phoneNumber: "",
    email: "",
    username: "",
    gender: '',
    dateOfBirth: ""
  });
  useEffect(() => {
    setFormData1((prevFormData) => ({
      ...prevFormData,
      id: storedUserId,
      fullname: client ? client.fullname : '',
      phoneNumber: client ? client.phoneNumber : '',
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
  const onInputChange = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  }
  const onUpdateClient = async (e) => {
    try {
      await axiosInstance.put(`/client/admin/update`, formData1);
      changeAvatar();
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
        await axiosInstance.put(`/user/${formData1.id}/multipart-file`, image, {
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
  //Xử lý địa chỉ
  const fetchData2 = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const [provinces, setProvinces] = useState([]);
  const [modalAdress, setModalAdress] = useState(false);
  const toggleAdress = () => setModalAdress(!modalAdress);

  useEffect(() => {
    if (modalAdress === false && modalAddAdress === false) {
      setFormData({ ...formData, idClient: "" });
      setListAddress([])
    }
    console.log("modalAdress:", modalAdress, modalAddAdress);
  }, [modalAdress]);

  const [modalAddAdress, setModalAddAdress] = useState(false);
  const toggleAddAdress = () => setModalAddAdress(!modalAddAdress);

  useEffect(() => {
    if (modalAddAdress === false) {
      resetFormData();
    }
    console.log("modalAddAdress:", modalAdress, modalAddAdress);
  }, [modalAddAdress]);
  const [listAddress, setListAddress] = useState([]);
  const getAllAddress = async () => {
    const res = await axiosInstance.get(`http://localhost:33321/api/address/${formData.idClient}`);
    if (res && res.data) {
      setListAddress(res.data.content);
      console.log(listAddress);
    }
  }

  const onClickListAdress = async (id) => {
    const res = await axiosInstance.get(`http://localhost:33321/api/address/${id}`);
    if (res && res.data.content) {
      setListAddress(res.data.content);
    }
    setFormData({ ...formData, idClient: id });
    toggleAdress();
  };

  const [formData, setFormData] = useState({
    id: null,
    proviceCode: null,
    districtCode: null,
    communeCode: null,
    addressDetail: null,
    idClient: ""
  });
  const resetFormData = () => {
    setFormData({
      ...formData,
      id: null,
      proviceCode: "",
      districtCode: "",
      communeCode: "",
      addressDetail: ""
    });
  }
  useEffect(() => {
    console.log("check", formData);
  }, [formData]);

  const CLickUpdateAddress = (item) => {
    setFormData({
      ...formData,
      id: item.id,
      proviceCode: item.proviceCode,
      districtCode: item.districtCode,
      communeCode: item.communeCode,
      addressDetail: item.addressDetail
    });
    toggleAddAdress();
  }
  const saveAddress = async () => {
    try {
      if (formData.id) {
        await axiosInstance.put(`http://localhost:33321/api/address/update`, {
          id: formData.id,
          proviceCode: formData.proviceCode,
          districtCode: formData.districtCode,
          communeCode: formData.communeCode,
          addressDetail: formData.addressDetail,
          idClient: formData.idClient
        });
        getAllAddress();
        toast.success("Cập nhật thành công!");
      } else {
        await axiosInstance.post('http://localhost:33321/api/address/create', {
          proviceCode: formData.proviceCode,
          districtCode: formData.districtCode,
          communeCode: formData.communeCode,
          addressDetail: formData.addressDetail,
          idClient: formData.idClient
        });
        getAllAddress();
        toast.success("Thêm mới thành công!");
      }

      // Đóng modal và reset form
      toggleAddAdress();
      resetFormData();
    } catch (error) {
      // Xử lý lỗi
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    }
  };
  const deleteAddress = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      axiosInstance.patch(`http://localhost:33321/api/address/delete/${id}`)
        .then(response => {
          getAllAddress();
          toast.success("Xóa thành công");
        })
        .catch(error => {
          console.error('Lỗi khi xóa dữ liệu:', error);
        });
    }
  };
  //Kết thúc địa chỉ
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
                                          value={formData1.fullname}
                                          onChange={onInputChange}
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
                                          name="email"
                                          value={formData1.email}
                                          onChange={onInputChange}
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
                                          name="phoneNumber"
                                          value={formData1.phoneNumber}
                                          onChange={onInputChange}
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
                                            checked={formData1.gender === 'false' || formData1.gender === false}
                                            onClick={(e) => onInputChange(e)}
                                          />Nam
                                        </div>
                                        <div className="custom-control custom-radio">
                                          <Input
                                            className="custom-control-alternative"
                                            id="nu"
                                            name="gender"
                                            type="radio"
                                            value={true}
                                            checked={formData1.gender === 'true' || formData1.gender === true}
                                            onClick={(e) => onInputChange(e)}
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
                                          value={formData1.dateOfBirth}
                                          onChange={onInputChange}
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
                  <>
                    <Card className="shadow">
                      <CardHeader className="bg-transparent">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Row>
                            <span className="col-9">
                              <h3>Địa Chỉ</h3>
                              <div>Quản lý thông tin địa chỉ</div>
                            </span>
                            <span className="col-3 justify-content-end mt-3">
                              <Button color="primary" onClick={toggleAddAdress} outline size="sm">
                                + Thêm địa chỉ mới
                              </Button>
                            </span>
                          </Row>
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="pl-lg-4">
                          {/* Address content */}
                          <Form>
                            <div className="pl-lg-4">
                              {listAddress.length <= 0 &&
                                <Row className="text-muted mb-0">
                                  Không có dữ liệu
                                </Row>
                              }
                              {
                                listAddress && listAddress.length > 0 &&
                                listAddress.map((item, index) => {
                                  return (
                                    <>
                                      <Row>
                                        <Col lg="9"  >
                                          <div style={{ fontSize: 13 }} className="text-small text-muted mb-0">
                                            {item.addressDetail},&nbsp;{item.communeCode},&nbsp;{item.districtCode},&nbsp;{item.proviceCode}
                                          </div>
                                        </Col>
                                        <Col lg="3" className="mr--1">
                                          <Button color="info" size="sm" onClick={() => CLickUpdateAddress(item)}>
                                            <FaEdit />
                                          </Button>
                                          <Button color="danger" size="sm" onClick={() => deleteAddress(item.id)}>
                                            <FaTrash />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <hr />
                                    </>
                                  )
                                })
                              }
                            </div>
                          </Form>
                        </div>
                      </CardBody>
                    </Card>
                    {/* Modal Thêm Địa chỉ */}
                    <Modal
                      isOpen={modalAddAdress}
                      toggle={toggleAddAdress}
                      backdrop={'static'}
                      keyboard={false}
                      style={{ maxWidth: '500px' }}
                    >
                      <ModalHeader toggle={toggleAddAdress}>
                        <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Địa chỉ khách hàng' : 'Thêm Mới Địa chỉ khách hàng'}</h3>
                      </ModalHeader>
                      <ModalBody>
                        <Form>
                          <div className="pl-lg-4">
                            <Row>
                              <Col lg="12">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Chi tiết địa chỉ
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    type="textarea"
                                    value={formData.addressDetail}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        addressDetail: e.target.value
                                      })}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label" htmlFor="input-city">
                                    Tỉnh / Thành
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    type="select"
                                    value={formData.proviceCode}
                                    onChange={(e) => setFormData({
                                      ...formData,
                                      proviceCode: e.target.value,
                                      districtCode: null,
                                      communeCode: null
                                    })}
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
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label" htmlFor="input-country">
                                    Quận / Huyện
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    type="select"
                                    value={formData.districtCode}
                                    onChange={(e) => setFormData({
                                      ...formData,
                                      districtCode: e.target.value,
                                      communeCode: ""
                                    })}
                                    disabled={!formData.proviceCode}
                                  >
                                    <option value="">Chọn Quận / Huyện</option>
                                    {formData.proviceCode &&
                                      provinces
                                        .find((province) => province.name === formData.proviceCode)
                                        .districts.map((district) => (
                                          <option key={district.code} value={district.name}>
                                            {district.name}
                                          </option>
                                        ))}
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Phường / Xã
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    type="select"
                                    value={formData.communeCode}
                                    onChange={(e) => setFormData({
                                      ...formData,
                                      communeCode: e.target.value
                                    })}
                                    disabled={!formData.districtCode}
                                  >
                                    <option value="">Chọn Phường / Xã</option>
                                    {formData.districtCode &&
                                      provinces
                                        .find((province) => province.name === formData.proviceCode)
                                        .districts.find((district) => district.name === formData.districtCode)
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
                          <Button color="danger" onClick={(e) => saveAddress(e)}>
                            {formData.id ? "Cập nhật" : "Thêm mới"}
                          </Button>{' '}
                          {formData.id
                            ?
                            ""
                            :
                            <Button color="primary" onClick={resetFormData}>
                              Reset
                            </Button>
                          }
                          <Button color="danger" onClick={toggleAddAdress} >
                            Close
                          </Button>
                        </div>
                      </ModalFooter>
                    </Modal >
                    {/* Kết thúc thêm modal địa chỉ */}
                  </>
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