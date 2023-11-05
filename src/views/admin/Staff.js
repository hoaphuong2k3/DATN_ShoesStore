import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from 'react-icons/fa';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import Header from "components/Headers/Header.js";


// reactstrap components
import Switch from 'react-input-switch';
import {
  Row, Card, Col, Form, FormGroup,
  Input, Button, Table, Badge, Modal, Container,
  ModalBody, ModalFooter, ModalHeader, CardBody, CardHeader, CardFooter
} from "reactstrap";


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



  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 5,
    fullname: '',
    phonenumber: '',
    email: '',
    gender: '',
  });


  //loads table
  const fetchData = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);

      const response = await axiosInstance.get("/staff", {
        params: {
          ...queryParams,
          fullname: queryParams.fullname || null,
          phonenumber: queryParams.phonenumber || null,
          email: queryParams.email || null,
          gender: queryParams.gender === '' ? null : queryParams.gender,
          // gender: queryParams.gender
        },
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


  const handlePageChange = ({ selected }) => {
    setQueryParams(prevParams => ({ ...prevParams, page: selected }));
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setQueryParams({ ...queryParams, size: newSize, page: 0 });
  };

  const handleFullnameChange = (e) => {
    setQueryParams({ ...queryParams, fullname: e.target.value });
  };

  const handleGenderChange = (e) => {
    const genderValue = e.target.value == "true";
    setQueryParams({ ...queryParams, gender: genderValue });
  }

  const calculateIndex = (index) => {
    return index + 1 + queryParams.page * queryParams.size;
  };

  const statusMapping = {
    0: { color: 'danger', label: 'Ngừng hoạt động' },
    1: { color: 'success', label: 'Đang hoạt động' },

  };
  //lọc
  const resetFilters = () => {
    setQueryParams({
      page: 0,
      size: 5,
      fullname: '',
      phoneNumber: '',
      email: '',
      gender: '',
    });
  };

  //click on selected
  const [formData, setFormData] = useState({
    id: "",
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
      username: admin.username,
      fullname: admin.fullname,
      gender: admin.gender,
      dateOfBirth: admin.dateOfBirth,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      status: admin.status,
      address: {
        proviceCode: admin.proviceCode,
        districtCode: admin.districtCode,
        communeCode: admin.communeCode,
        addressDetail: admin.addressDetail,
        isDeleted: true,
      },
    });
    setModal(true);
  };

  //reset
  const resetForm = () => {
    setFormData({
      id: null,
      username: "",
      fullname: "",
      gender: false,
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
      status: "",
      address: {
        proviceCode: "",
        districtCode: "",
        communeCode: "",
        addressDetail: "",
        isDeleted: true,
      },
    });
  };

  //Add
  const saveAdmin = async () => {
    try {
      if (formData.id) {
        await axiosInstance.put(`/staff/update`, formData);
        fetchData();
        toast.success("Cập nhật thành công!");
      } else {
        await axiosInstance.post('/staff/create', {
          username: formData.username,
          fullname: formData.fullname,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: {
            proviceCode: formData.address.proviceCode,
            districtCode: formData.address.districtCode,
            communeCode: formData.address.communeCode,
            addressDetail: formData.address.addressDetail,
            isDeleted: true,
          },
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
  const deleteAdmin = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      axiosInstance.patch(`/staff/delete/${id}`)
        .then(response => {
          fetchData();
          toast.success("Xóa thành công");
        })
        .catch(error => {
          console.error('Lỗi khi xóa dữ liệu:', error);
        });
    }
  };

  // Select checkbox
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [showActions, setShowActions] = useState(false);

  const handleSelectAll = () => {
    setIsCheckedAll(!isCheckedAll);

    if (!isCheckedAll) {
      const allStaff = admins.map((staff) => staff.id);
      setSelectedId(allStaff);
      setShowActions(true);
    } else {
      setSelectedId([]);
      setShowActions(false);
    }
  };

  const handleCheckboxChange = (idStaff) => {
    if (selectedId.includes(idStaff)) {
      setSelectedId(selectedId.filter((id) => id !== idStaff));
      setShowActions(false);
    } else {
      setSelectedId([...selectedId, idStaff]);
      setShowActions(true);
    }

  };

  // Hiện action deleteAll
  const handleActionSelect = (action) => {
    if (action === "deleteAll") {
      // Xóa everything
    } else if (action === "disableAll") {
      // Ngừng everything
    }
    setShowActions(false);
  };

  //updat-status
  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/staff/update-status/${id}?status=${status}`);
      fetchData();
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Error updating staff status:", error);
    }
  };

  // lọc status
  const [selectedStatus, setSelectedStatus] = useState('');

  const filterAdmins = admins.filter((admin) => {
    if (selectedStatus === '') {
      return true;
    } else {
      return admin.status.toString() === selectedStatus;
    }
  });
  return (
    <>
      {/* <Header /> */}
      <Container className="pt-5 pt-md-7" fluid>
        <Row>
          <Col>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="heading-small text-muted mb-0">Nhân Viên</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="m-2">
                  <Row className="align-items-center">
                    <FaSearch className="ml-3" />
                    <h3 className="heading-small text-black mb-0 ml-2">Tìm kiếm</h3>
                  </Row>
                  <hr className="my-4" />
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
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
                              value={queryParams.fullname}
                              onChange={handleFullnameChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="phoneNumber"
                            >
                              Số điện thoại:
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="phoneNumber"
                              type="text"
                              value={queryParams.phonenumber}
                              onChange={(e) => setQueryParams({ ...queryParams, phonenumber: e.target.value })}
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
                                    value={false}
                                    checked={queryParams.gender === false}
                                    onChange={handleGenderChange}
                                  />Nam
                                </div>
                                <div className="custom-control custom-radio">
                                  <Input
                                    className="custom-control-alternative"
                                    id="nu"
                                    name="gender"
                                    type="radio"
                                    value={true}
                                    checked={queryParams.gender === true}
                                    onChange={handleGenderChange}
                                  />Nữ
                                </div>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="email"
                              >
                                Email:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"
                                type="text"
                                value={queryParams.email}
                                onChange={(e) => setQueryParams({ ...queryParams, email: e.target.value })}
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
                      {/* Show Action */}
                      {showActions && (

                        <Input type="select" className="ml-3" name="action" style={{ width: "150px" }} size="sm" onChange={(e) => handleActionSelect(e.target.value)}>
                          <option value={""}>Chọn thao tác</option>
                          <option value="deleteAll">Xóa tất cả</option>
                          <option value="disableAll">Ngừng hoạt động</option>
                        </Input>

                      )}
                      {/* End Show Action */}

                      {/* filter status */}
                      <Col>
                        <Input type="select" name="status" style={{ width: "150px" }} size="sm"
                          value={selectedStatus}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedStatus(value === '' ? '' : value);
                          }}>
                          <option value="">Tất cả</option>
                          <option value="0">Ngừng hoạt động</option>
                          <option value="1">Đang hoạt động</option>
                        </Input>
                      </Col>
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
                        <th className="text-center pb-4">
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              checked={isCheckedAll}
                              onChange={handleSelectAll}
                            />
                          </FormGroup>
                        </th>
                        <th scope="col">STT</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col" style={{ position: "sticky", zIndex: '1', right: '0' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filterAdmins) && filterAdmins.length > 0 ? (
                        filterAdmins.map((admin, index) => (
                          <tr key={admin.id}>
                            <td className="text-center">
                              <FormGroup check>
                                <Input
                                  type="checkbox"
                                  checked={selectedId.includes(admin.id)}
                                  onChange={() => handleCheckboxChange(admin.id)}
                                />
                              </FormGroup>
                            </td>
                            <td>{calculateIndex(index)}</td>
                            <td>
                              <Badge color={statusMapping[admin.status]?.color || statusMapping.default.color}>
                                {statusMapping[admin.status]?.label || statusMapping.default.label}
                              </Badge>
                            </td>
                            <td>{admin.fullname}</td>
                            <td>{admin.dateOfBirth}</td>
                            <td>{admin.gender ? "Nữ" : "Nam"}</td>
                            <td>{admin.phoneNumber}</td>
                            <td>{admin.email}</td>
                            <td>{admin.addressDetail}, {admin.communeCode}, {admin.districtCode}, {admin.proviceCode} </td>

                            <td style={{ position: "sticky", zIndex: '1', right: '0', backgroundColor: '#fff' }}>
                              <Button color="info" size="sm" onClick={() => handleRowClick(admin)} disabled={false}><FaEdit /></Button>
                              <Button color="danger" size="sm" onClick={() => deleteAdmin(admin.id)}><FaTrash /></Button>
                              {admin.status === 0 &&
                                <Button color="warning" size="sm" onClick={() => updateStatus(admin.id, 1)}>
                                  <i class="fa-solid fa-lock-open fa-flip-horizontal"></i>
                                </Button>
                              }
                              {admin.status === 1 &&
                                <Button color="warning" size="sm" onClick={() => updateStatus(admin.id, 0)} >
                                  <i class="fa-solid fa-lock"></i>
                                </Button>
                              }
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9}>Không có dữ liệu</td>
                        </tr>
                      )}
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
                            disabled={formData.id ? true : false}
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
                      {/* // tỉnh thành */}
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city">
                            Tỉnh / Thành
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={formData.address.proviceCode}
                            onChange={(e) => setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                proviceCode: e.target.value,
                                districtCode: "",
                                communeCode: "",
                              },

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
                      {/* quận huyện*/}
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">
                            Quận / Huyện
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={formData.address.districtCode}
                            onChange={(e) => setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                districtCode: e.target.value,
                                communeCode: "",
                              },
                            })}
                            disabled={!formData.address.proviceCode}
                          >
                            <option value="">Chọn Quận / Huyện</option>
                            {formData.address.proviceCode &&
                              provinces
                                .find((province) => province.name === formData.address.proviceCode)
                                .districts.map((district) => (
                                  <option key={district.code} value={district.name}>
                                    {district.name}
                                  </option>
                                ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* phường xã */}
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label">
                            Phường / Xã
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={formData.address.communeCode}
                            onChange={(e) => setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                communeCode: e.target.value,
                              },
                            })}
                            disabled={!formData.address.districtCode}
                          >
                            <option value="">Chọn Phường / Xã</option>
                            {formData.address.districtCode &&
                              provinces
                                .find((province) => province.name === formData.address.proviceCode)
                                .districts.find((district) => district.name === formData.address.districtCode)
                                .wards.map((ward) => (
                                  <option key={ward.code} value={ward.name}>
                                    {ward.name}
                                  </option>
                                ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* detail */}
                      <Col className="pl-lg-4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="addressDetail">
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Số nhà ....."
                            rows="4"
                            type="textarea"
                            value={formData.address.addressDetail}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: {
                                  ...formData.address,
                                  addressDetail: e.target.value,
                                },
                              })
                            }
                          />
                        </FormGroup>
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
