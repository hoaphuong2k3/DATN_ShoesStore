import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from 'react-icons/fa';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

// reactstrap components
import Switch from 'react-input-switch';
import {
  Row, Card, Col, Form, FormGroup,
  Input, Button, Table, Badge, Modal, Container,
  ModalBody, ModalFooter, ModalHeader, CardBody, CardHeader, CardFooter
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Staff = () => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleModal = () => {
    resetForm();
    setModal(true);
  }

  const [value, setValue] = useState('no');
  const [admins, setAdmins] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // ADDRESS
  const [provinces, setProvinces] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");


  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 5,
    type: 0,
    code: "",
    name: "",
    fromDate: "",
    toDate: "",
    status: "",
    isdelete: 0,
  });


  //loads table
  const fetchData = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);

      const response = await axiosInstance.get("/admin", {
        params: queryParams
      });
      setAdmins(response.content);
      console.log(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [queryParams]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    const selectedProvince = provinces.find((province) => province.name === selectedCity);
    const districts = selectedProvince.districts;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        proviceCode: selectedProvince.code,
        districtCode: "",
        communeCode: "",
      },
    });
  };
  
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    const selectedProvince = provinces.find((province) => province.name === selectedCity);
    const selectedDistrictObj = selectedProvince.districts.find((district) => district.name === selectedDistrict);
    const wards = selectedDistrictObj.wards;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        districtCode: selectedDistrictObj.code,
        communeCode: "",
      },
    });
  };
  
  const handleWardChange = (e) => {
    const selectedWard = e.target.value;
    setSelectedWard(selectedWard);
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        communeCode: selectedWard,
      },
    });
  };

  const handlePageChange = ({ selected }) => {
    setQueryParams(prevParams => ({ ...prevParams, page: selected }));
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setQueryParams({ ...queryParams, size: newSize, page: 0 });
  };



  const calculateIndex = (index) => {
    return index + 1 + queryParams.page * queryParams.size;
  };

  const statusMapping = {
    0: { color: 'danger', label: 'Ngừng hoạt động' },
    1: { color: 'success', label: 'Đang hoạt động' },
    // 2: { color: 'warning', label: 'Đã hủy' },
  };
  //lọc
  const resetFilters = () => {
    setQueryParams({
      page: 0,
      size: 5,
      type: 0,
      code: "",
      name: "",
      fromDate: "",
      toDate: "",
      status: "",
      isdelete: 0,
    });
  };

  //click on selected
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    username: "",
    fullname: "",
    gender: false,
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: {
      proviceCode: "",
      districtCode: "",
      communeCode: "",
      addressDetail: "",
      isDeleted: true,
    },
    status: "",
  });

  const handleRowClick = (admin) => {

    setFormData({
      id: admin.id,
      code: admin.code,
      username: admin.username,
      fullname: admin.fullname,
      gender: admin.gender,
      dateOfBirth: admin.dateOfBirth,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      // minPrice: admin.minPrice || "",
      // sale: false,
      status: admin.status
    });


    setModal(true);
  };

  //reset
  const resetForm = () => {
    setFormData({
      id: null,
      code: "",
      username: "",
      fullname: "",
      gender: false,
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
      status: "",

    });
    // setSelectedValueType(null);
  };

  //save
  // const formatDateTime = (dateString) => {
  //   const parsedDate = parseISO(dateString, "dd/MM/yyyy hh:mm a", new Date());
  //   return format(parsedDate, "yyyy-MM-dd HH:mm", { locale: vi });
  // };

  const saveAdmin = async () => {
    try {

      if (formData.id) {
        await axiosInstance.put(`/admin/update`, {
          id: formData.id,
          code: formData.code,
          username: formData.username,
          fullname: formData.fullname,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phoneNumber: formData.phoneNumber,

          status: formData.status
        });

        fetchData();

        toast.success("Cập nhật thành công!");
      } else {
        await axiosInstance.post('/admin/create', {
          code: formData.code,
          username: formData.username,
          fullname: formData.fullname,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phoneNumber: formData.phoneNumber,

        });

        fetchData();
        toast.success("Thêm mới thành công!");
      }

      // Đóng modal và reset form
      setModal(false);
      resetForm();
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


  //delete
  const confirmDelete = () => {
    return window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?");
  };
  const deleteAdmin = (id) => {
    if (confirmDelete()) {
      axiosInstance.delete(`/admin/delete/${id}`)
        .then(response => {
          fetchData();
          toast.success("Xóa thành công");
        })
        .catch(error => {
          console.error('Lỗi khi xóa dữ liệu:', error);
        });
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent m-2">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Nhân Viên</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="m-2">
                  <Row className="align-items-center">
                    <FaSearch className="ml-3" />
                    <h3 className="heading-small text-black mb-0 ml-2">Tìm kiếm</h3>
                  </Row>
                  <hr className="my-4" />
                  <Form className="search">
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="code"
                            >
                              Mã Nhân Viên:
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="code"
                              type="text"
                              value={queryParams.code}
                              onChange={(e) => setQueryParams({ ...queryParams, code: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="name"
                            >
                              Tên Nhân Viên:
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="name"
                              type="text"
                              value={queryParams.name}
                              onChange={(e) => setQueryParams({ ...queryParams, name: e.target.value })}
                            />
                          </FormGroup>
                        </Col>

                      </Row>

                      {value === 'yes' &&
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="startDate"
                              >
                                Hóa đơn tối thiểu:
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="startDate"
                              >
                                Hình thức:
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="select"

                              >
                                <option>Tất cả</option>
                                <option>Tiền</option>
                                <option>Phần trăm</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="startDate"
                              >
                                Trị giá giảm:
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="startDate"
                              >
                                Trạng thái:
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="select"
                                value={queryParams.status}
                                onChange={(e) => setQueryParams({ ...queryParams, status: e.target.value })}
                              >
                                <option value="">Tất cả</option>
                                <option value="0">Kích hoạt</option>
                                <option value="1">Chờ kích hoạt</option>
                                <option value="2">Đã hủy</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="startDate"
                              >
                                Từ ngày:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="startDate"
                                type="date"
                                value={queryParams.fromDate}
                                onChange={(e) => setQueryParams({ ...queryParams, fromDate: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="endDate"
                              >
                                Đến ngày:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="endDate"
                                type="date"
                                value={queryParams.toDate}
                                onChange={(e) => setQueryParams({ ...queryParams, toDate: e.target.value })}
                              />
                            </FormGroup>
                          </Col>



                        </Row>
                      }
                    </div>
                  </Form>

                  <Row className="mt-2">
                    <Col lg="6" xl="4" >
                      <span>
                        <Switch on="yes" off="no" value={value} onChange={setValue} />
                        <span className="mb-3">
                          &nbsp;&nbsp;
                          Tìm kiếm nâng cao
                          &nbsp;&nbsp;
                        </span>
                      </span>
                      <Button color="warning" size="sm" className="mt-3" onClick={resetFilters}>
                        Làm mới bộ lọc
                      </Button>
                    </Col>
                  </Row>

                  <hr className="my-4" />

                  <Row className="align-items-center my-4">
                    <div className="col" style={{ display: "flex" }}>

                      <h3 className="heading-small text-black mb-0"><FaFileAlt size="16px" className="mr-1" />Danh sách</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={handleModal}
                        size="sm"
                      >
                        + Thêm mới
                      </Button>
                    </div>

                  </Row>

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

                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>

                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(admins) &&
                        admins.map((admin, index) => (
                          <tr key={admin.id}>
                            <td>{calculateIndex(index)}</td>
                            <td>{admin.fullname}</td>
                            <td>{admin.dateOfBirth}</td>
                            <td>{admin.gender ? "Nữ" : "Nam"}</td>
                            <td>{admin.phoneNumber}</td>
                            <td>{admin.email}</td>
                            <td>{admin.addressDetail}, {admin.communeCode}, {admin.districtCode}, {admin.proviceCode} </td>
                            <td>
                              <Badge color={statusMapping[admin.status]?.color || statusMapping.default.color}>
                                {statusMapping[admin.status]?.label || statusMapping.default.label}
                              </Badge>
                            </td>
                            <td>
                              <Button color="info" size="sm" onClick={() => handleRowClick(admin)} disabled={admin.status === 0}><FaEdit /></Button>
                              <Button color="danger" size="sm" onClick={() => deleteAdmin(admin.id)}><FaTrash /></Button>
                            </td>

                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {/* Hiển thị thanh phân trang */}
                  <Row className="mt-4">
                    <Col lg={6}>
                      <div style={{ fontSize: 14 }}>
                        Đang xem <b>{queryParams.page * queryParams.size + 1}</b>  đến <b>{queryParams.page * queryParams.size + admins.length}</b> trong tổng số <b></b> mục
                      </div>
                    </Col>
                    <Col style={{ fontSize: 14 }} lg={2}>
                      <Row>
                        <span>Xem </span>&nbsp;
                        <span>
                          <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" className="mt--1" onChange={handleSizeChange}>
                            <option value="5">5</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </Input>
                        </span>&nbsp;
                        <span> mục</span>
                      </Row>
                    </Col>
                    <Col lg={4} style={{ fontSize: 11 }} className="mt--1 text-right">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        pageRangeDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="<"
                        onPageChange={handlePageChange}
                        renderOnZeroPageCount={null}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        marginPagesDisplayed={1}
                      />
                    </Col>

                  </Row>
                </CardBody>
              </Card>
            </div>
            <ToastContainer />
            <Modal
              isOpen={modal}
              toggle={toggle}
              backdrop={'static'}
              keyboard={false}
              style={{ maxWidth: '900px' }}
            >
              <ModalHeader toggle={toggle}>
                <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Nhân Viên' : 'Thêm Mới Nhân Viên'}</h3>

              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="username"
                          >
                            Tên tài khoản:
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="fullname"
                          >
                            Họ tên:
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="fullname"
                            type="text"
                            value={formData.fullname}
                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="dateOfBirth"
                          >
                            Ngày sinh:
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="email"
                          >
                            Email:
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="gender">
                            Giới tính:
                          </label>
                          <div style={{ display: "flex" }}>
                            <div className="custom-control custom-radio">
                              <Input
                                className="custom-control-alternative"
                                name="gender"
                                type="radio"
                                checked={!formData.gender}
                                onChange={() => setFormData({ ...formData, gender: false })}
                              />Nam
                            </div>
                            <div className="custom-control custom-radio">
                              <Input
                                className="custom-control-alternative"
                                name="gender"
                                type="radio"
                                checked={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: true })}
                              />Nữ
                            </div>

                          </div>
                        </FormGroup>
                      </Col>
                      <Col className="pl-lg-4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="phoneNumber"
                          >
                            Số điện thoại:
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder=""
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city">
                            Tỉnh / Thành
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={selectedCity}
                            onChange={handleCityChange}
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
                            onChange={handleDistrictChange}
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
                            onChange={handleWardChange}
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
                      <Col className="pl-lg-4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="addressDetail"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Số nhà ....."
                            rows="4"
                            type="textarea"
                            value={formData.address.addressDetail}
                            onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-lg-4">
                        {formData.id && (
                          <FormGroup>
                            <label className="form-control-label">
                              Trạng thái
                            </label>
                            <div className="form-control-alternative custom-toggle ml-2">
                              <Input
                                checked={formData.status === 0}
                                type="checkbox"
                              />
                              <span className="custom-toggle-slider rounded-circle" />
                            </div>

                          </FormGroup>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Form >
              </ModalBody >
              <ModalFooter>
                <div className="text-center">
                  <Button color="primary" onClick={saveAdmin} size="sm">
                    {formData.id ? "Cập nhật" : "Thêm mới"}
                  </Button>
                  <Button color="primary" onClick={resetForm} size="sm">
                    Reset
                  </Button>
                  <Button color="danger" onClick={toggle} size="sm">
                    Close
                  </Button>
                </div>
              </ModalFooter>

            </Modal >

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Staff;
