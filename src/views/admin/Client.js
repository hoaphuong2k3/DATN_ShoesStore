import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, CardFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText, CardTitle, Label, Modal, ModalHeader, ModalFooter, ModalBody, Badge
} from "reactstrap";
import Select from "react-select";
import ReactPaginate from 'react-paginate';
import { getAllClient, postNewClient, detailClient, updateClient, deleteClient } from "services/ClientService";
import { FaEdit, FaTrash, FaSearch, FaFileAlt, FaCamera, FaLockOpen, FaLock, FaFilter, FaTimes } from 'react-icons/fa';
import Header from "components/Headers/Header.js";
import Switch from 'react-input-switch';
import { toast } from 'react-toastify';
import axiosInstance from "services/custommize-axios";


const Client = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [modalAdd, setModalAdd] = useState(false);
  const toggle = () => setModalAdd(!modalAdd);
  const [value, setValue] = useState('no');

  const [listClient, setListClient] = useState([]);

  const [modalFilter, setModalFilter] = useState(false);
  const toggleFilter = () => {
    setModalFilter(!modalFilter);
    // fetchData();
  };
  const [client, setClient] = useState({
    id: null,
    fullname: "",
    phonenumber: "",
    email: "",
    username: "",
    gender: 'false',
    dateOfBirth: ""
  });
  const resetClient = () => {
    setClient({
      fullname: "",
      phonenumber: "",
      email: "",
      username: "",
      gender: 'false',
      dateOfBirth: ""
    });
  };
  useEffect(() => {
    { value === 'no' && setSearch({ ...search, email: "", gender: "" }) }
  }, [value]);
  const [search, setSearch] = useState({
    fullname: null,
    gender: null,
    dateOfBirth: null,
    email: null,
    phonenumber: null,
  })

  const resetSearch = () => {
    setSearch({
      fullname: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      phonenumber: "",
    });
  };
  const onInputChangeSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log(search)
    getAll();
  }, [search]);
  //Page, Size
  const handlePageClick = (event) => {
    setPage(+event.selected);
    getAll(+event.selected + 1);
  }
  const onChangeSize = (e) => {
    setSize(+e.target.value);
  }
  //

  const onInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  // const fetchData = async () => {
  //   try {
  //     const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
  //     setProvinces(provincesResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };
  const getAll = async () => {
    try {
      const res = await getAllClient(page, size, search);
      console.log(res);
      setListClient(res.content);
      setTotalElenments(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  useEffect(() => {
    getAll();
  }, [size, page]);
  useEffect(() => {
    // fetchData();
    getAll();
  }, []);

  useEffect(() => {
    console.log(client);
  }, [client]);

  // bắt đầu Client
  const onClickDeleteClient = async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa khách hàng này không?`)) {
      try {
        const res = await deleteClient(id);
        getAll();
        toast.success("Xóa thành công");
      } catch (error) {
        console.error("Error fetching data: ", error);
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    }
  };
  //Kết thúc client
  //Hàm add client
  const onAddClient = async (e) => {
    e.preventDefault();
    console.log(client);
    try {
      const response = await postNewClient(client);
      getAll();
      resetClient();
      toggle();
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
  }
  // End hàm add client

  //Bắt đầu hàm update
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [editClient, setEditClient] = useState({
    id: null,
    avatar: null,
    fullname: "",
    phoneNumber: "",
    email: "",
    username: "",
    gender: false,
    dateOfBirth: "",
  });

  const resetEditClient = () => {
    setEditClient({
      id: null,
      avatar: null,
      fullname: "",
      phoneNumber: "",
      email: "",
      username: "",
      gender: false,
      dateOfBirth: "",
    });
  };
  const handleRowClick = async (id) => {
    const response = await detailClient(id);
    setEditClient({
      id: id,
      // avatar: response.data.avatar,
      fullname: response.data.fullname,
      phoneNumber: response.data.phoneNumber,
      email: response.data.email,
      username: response.data.username,
      gender: response.data.gender,
      dateOfBirth: response.data.dateOfBirth,
    });
    if (response.data.avatar) {
      // Hiển thị hình ảnh
      const blob = await fetch(`data:image/jpeg;base64,${response.data.avatar}`).then((res) => res.blob());
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      setFile(file);
    }
    console.log(editClient);
    toggleEdit();
  };
  // upload image
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const imageUrl = file ? URL.createObjectURL(file) : null;
  const imageSize = '140px';
  const imageHi = '190px';
  const imageStyle = {
    width: imageSize,
    height: imageHi,
  };
  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    padding: '8px',
    cursor: 'pointer',
    border: '1px dashed gray',
    width: imageSize,
    height: imageHi,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const changeAvatar = async () => {

    try {
      const image = new FormData();
      if (file) {
        image.append('file', file);
      }

      if (file) {
        await axiosInstance.put(`/user/${editClient.id}/multipart-file`, image, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      getAll();
    } catch (error) {
      console.error('Failed to change avatar', error);
      // Xử lý lỗi (nếu cần)
    }
  };
  const AvatarReset = () => {
    setFile(null);
  };



  const onInputChangeDataUpdate = (e) => {
    setEditClient({ ...editClient, [e.target.name]: e.target.value });
  };
  const onUpdateClient = async (e) => {
    e.preventDefault();
    console.log(client);
    try {
      const response = await updateClient(editClient);
      changeAvatar()
      getAll();
      resetEditClient();
      toggleEdit();
      toast.success("Cập nhật thành công!");
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
  }
  //Kết thúc hàm update

  //Hàm khóa khách hàng
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:33321/api/client/admin/update-status/${id}?status=${status}`);
      getAll();
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Error updating staff status:", error);
    }
  };
  const statusMapping = {
    1: { color: 'success', label: 'Đang hoạt động' },
    0: { color: 'danger', label: 'Ngừng hoạt động' },

  };
  //Kết thúc hàm khóa khách hàng

  //Xử lý địa chỉ
  // ADDRESS
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const fetchDataFromAPI = async (url, stateSetter) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'token': '44022259-5cfb-11ee-96dc-de6f804954c9'
        }
      });
      stateSetter(response.data.data);
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu từ ${url}:`, error);
    }
  };
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        fetchDataFromAPI('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', setProvinces);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tỉnh/thành phố:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleProvinceChange = async (value) => {
    console.log(value);
    const selectedProvinceCode = value;
    setFormData({
      ...formData,
      proviceCode: selectedProvinceCode,
      districtCode: "",
      communeCode: ""
    });

    try {
      const districtURL = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvinceCode}`;
      fetchDataFromAPI(districtURL, setDistricts);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quận/huyện:", error);
    }
  };

  const handleDistrictChange = async (value) => {
    const selectedDistrictCode = value;
    setFormData({
      ...formData,
      districtCode: selectedDistrictCode,
      communeCode: ""
    });
    try {
      const wardURL = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrictCode}`;
      fetchDataFromAPI(wardURL, setCommunes);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phường/xã:", error);
    }
  };

  // END ADDRESS

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
    const res = await axios.get(`http://localhost:33321/api/address/${formData.idClient}`);
    if (res && res.data) {
      setListAddress(res.data.content);
      console.log(listAddress);
    }
  }

  const onClickListAdress = async (id) => {
    const res = await axios.get(`http://localhost:33321/api/address/${id}`);
    console.log(res.data.content)
    setListAddress(res.data.content);
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
    handleProvinceChange(item.proviceCode)
    handleDistrictChange(item.districtCode);
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
        await axios.put(`http://localhost:33321/api/address/update`, {
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
        await axios.post('http://localhost:33321/api/address/create', {
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
      axios.patch(`http://localhost:33321/api/address/delete/${id}`)
        .then(response => {
          getAllAddress();
          toast.success("Xóa thành công");
        })
        .catch(error => {
          console.error('Lỗi khi xóa dữ liệu:', error);
        });
    }
  };
  //Kết thúc xử lý địa chỉ
  const [selectedStatus, setSelectedStatus] = useState('');

  const filterAdmins = listClient.filter((admin) => {
    if (selectedStatus === '') {
      return true;
    } else {
      return admin.status.toString() === selectedStatus;
    }
  });
  return (
    <>
      {/* <Header /> */}
      {/* Page content */}
      <Container className="pt-5 pt-md-7" fluid>
        <Row>
          <Col>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col d-flex">
                      <h3 className="heading-small text-dark mb-0">
                        Khách Hàng
                      </h3>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          outline
                          onClick={toggle}
                          size="sm"
                        >
                          + Thêm mới
                        </Button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="m-2">
                  <Row className="align-items-center my-4">
                    <div className="col" style={{ display: "flex" }}>
                      <Button
                        color="success"
                        outline
                        size="sm"
                        onClick={toggleFilter}
                      >
                        <FaFilter size="16px" className="mr-1" />
                        Bộ lọc
                      </Button>
                      <Button
                        color="warning"
                        outline
                        size="sm"
                        onClick={resetSearch}
                      >
                        <FaTimes size="16px" className="mr-1" />
                        Xóa bộ lọc
                      </Button>
                      <Col>
                        <InputGroup size="sm">
                          <Input
                            type="search"
                            placeholder="Tìm kiếm theo tên, số điện thoại, email"
                            name="fullname"
                            onChange={(e) => onInputChangeSearch(e)}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <FaSearch />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>{" "}
                      {/* Show Action */}

                      {/* End Show Action */}
                      {/* filter status */}
                      <Col className="d-flex justify-content-end">
                        <Input
                          type="select"
                          name="status"
                          style={{ width: "150px" }}
                          size="sm"
                          value={selectedStatus}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedStatus(value === "" ? "" : value);
                          }}
                        >
                          <option value="">Tất cả</option>
                          <option value="0">Ngừng hoạt động</option>
                          <option value="1">Đang hoạt động</option>
                        </Input>
                      </Col>
                      {/* {showActions && (
                        <Input
                          type="select"
                          className="ml-3"
                          name="action"
                          style={{ width: "150px" }}
                          size="sm"
                          onChange={(e) => handleActionSelect(e.target.value)}
                        >
                          <option value={""}>Chọn thao tác</option>
                          <option value="deleteAll">Xóa tất cả</option>
                          <option value="disableAll">Ngừng hoạt động</option>
                        </Input>
                      )} */}
                    </div>
                  </Row>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center pb-4" >
                          <FormGroup check>
                            <Input type="checkbox" />
                          </FormGroup>

                        </th>
                        <th scope="col">STT</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Họ tên <i class="fa-solid fa-arrow-up"></i><i class="fa-solid fa-arrow-down"></i></th>
                        <th scope="col">Email <i class="fa-solid fa-arrow-up"></i><i class="fa-solid fa-arrow-down"></i></th>
                        <th scope="col">Số điện thoại <i class="fa-solid fa-arrow-up"></i><i class="fa-solid fa-arrow-down"></i></th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Ngày sinh <i class="fa-solid fa-arrow-up"></i><i class="fa-solid fa-arrow-down"></i></th>
                        <th scope="col" style={{ position: "sticky", zIndex: '1', right: '0' }}>Thao tác</th>

                      </tr>
                    </thead>
                    <tbody>
                      {listClient.length <= 0 &&
                        <th className="text-center" colSpan={17}>
                          Không có dữ liệu
                        </th>
                      }
                      {filterAdmins && filterAdmins.length > 0 && filterAdmins.map((item, index) => (

                        <tr key={item.id}>
                          <th className="text-center pb-4" >
                            <FormGroup check>
                              <Input type="checkbox" />
                            </FormGroup>

                          </th>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <Badge color={statusMapping[item.status]?.color || statusMapping.default.color}>
                              {statusMapping[item.status]?.label || statusMapping.default.label}
                            </Badge>
                          </td>
                          <td>
                            <span className="avatar avatar-sm rounded-circle">
                              <img src={`data:image/jpeg;base64,${item.avatar}`} alt="" />
                            </span>
                          </td>
                          <td>
                            {item.fullname}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.phoneNumber}</td>
                          <td className="text-center">{item.gender ? "Nữ" : "Nam"}</td>
                          <td>{item.dateOfBirth}</td>
                          <td style={{ position: "sticky", zIndex: '1', right: '0', backgroundColor: '#fff' }}>
                            <Button color="link" size="sm"
                              onClick={() => onClickListAdress(item.id)}>
                              <i class="fa-regular fa-address-book" color="primary"></i>
                            </Button>
                            <Button color="link" size="sm" onClick={() => handleRowClick(item.id)} >
                              <FaEdit />
                            </Button>
                            {item.status === 0 &&
                              <Button color="link" size="sm" onClick={() => updateStatus(item.id, 1)}>
                                <FaLock />
                              </Button>
                            }
                            {item.status === 1 &&
                              <Button color="link" size="sm" onClick={() => updateStatus(item.id, 0)} >
                                <FaLockOpen />
                              </Button>
                            }
                            <Button color="link" size="sm" onClick={() => onClickDeleteClient(item.id)}>
                              <FaTrash />
                            </Button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* Hiển thị thanh phân trang */}
                  <Row className="mt-4">
                    <Col lg={6}>
                      <div style={{ fontSize: 14 }}>
                        Đang xem <b>1</b> đến <b>{totalElements < size ? totalElements : size}</b> trong tổng số <b>{totalElements}</b> mục
                      </div>
                    </Col>
                    <Col style={{ fontSize: 14 }} lg={2}>
                      <Row>
                        <span>Xem </span>&nbsp;
                        <span>
                          <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" onChange={(e) => onChangeSize(e)} className="mt--1">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </Input>
                        </span>&nbsp;
                        <span> mục</span>
                      </Row>

                    </Col>
                    <Col lg={4} style={{ fontSize: 11 }} className="mt--1 d-flex justify-content-end">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        pageRangeDisplayed={1} // Number of pages to display on each side of the selected page
                        pageCount={totalPages} // Total number of pages
                        previousLabel="<"
                        onPageChange={handlePageClick}
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

          </Col>
        </Row>
      </Container>
      {/*  */}

      <Modal
        isOpen={modalAdd}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
        style={{ maxWidth: '900px' }}
      >
        <ModalHeader toggle={toggle}>
          <h3 className="heading-small text-muted mb-0">Thêm Mới Khách hàng</h3>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>

                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Tên đăng nhập
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="username"
                      value={client.username}
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Họ tên
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="fullname"
                      value={client.fullname}
                      onChange={onInputChange}
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
                      type="text"
                      name="email"
                      value={client.email}
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Số điện thoại
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="phonenumber"
                      value={client.phonenumber}
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>
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
                          defaultChecked
                          checked={client.gender === 'false'}
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
                          checked={client.gender === 'true'}
                          onClick={(e) => onInputChange(e)}
                        />Nữ
                      </div>
                    </div>
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
                      name="dateOfBirth"
                      value={client.dateOfBirth}
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" size="sm" onClick={(e) => onAddClient(e)}>
              Thêm
            </Button>{' '}
            <Button color="primary" size='sm' onClick={resetClient}>
              Reset
            </Button>
            <Button color="danger" size="sm" onClick={toggle} >
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal >
      {/* Modal sửa */}
      <Modal
        isOpen={modalEdit}
        toggle={toggleEdit}
        backdrop={'static'}
        keyboard={false}
        style={{ maxWidth: '900px' }}
      >
        <ModalHeader toggle={toggleEdit}>
          <h3 className="heading-small text-muted mb-0">Cập Nhật Thông Tin Khách Hàng</h3>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>

                <Col lg="6" className="d-flex justify-content-center align-items-center" >
                  <div
                    style={{ position: 'relative', width: imageSize, height: imageHi }}
                  >
                    {imageUrl && <img alt="preview" src={imageUrl} style={imageStyle} />}
                    <Label htmlFor="file-input" style={buttonStyle}>
                      <FaCamera size={15} />
                      {/* <FaTrash size={15} className="ml-2" onClick={AvatarReset} /> */}
                    </Label>
                    <Input
                      type="file"
                      id="file-input"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                </Col>

                <Col>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label">
                          Số điện thoại
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          name="phoneNumber"
                          value={editClient.phoneNumber}
                          onChange={onInputChangeDataUpdate}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label">
                          Email
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          name="email"
                          value={editClient.email}
                          onChange={onInputChangeDataUpdate}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Tên đăng nhập
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="username"
                      value={editClient.username}
                      disabled
                    />
                  </FormGroup>
                </Col>
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
                          checked={editClient.gender === 'false' || editClient.gender === false}
                          onClick={(e) => onInputChangeDataUpdate(e)}
                        />Nam
                      </div>
                      <div className="custom-control custom-radio">
                        <Input
                          className="custom-control-alternative"
                          id="nu"
                          name="gender"
                          type="radio"
                          value={true}
                          checked={editClient.gender === 'true' || editClient.gender === true}
                          onClick={(e) => onInputChangeDataUpdate(e)}
                        />Nữ
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Họ tên
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="fullname"
                      value={editClient.fullname}
                      onChange={onInputChangeDataUpdate}
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
                      name="dateOfBirth"
                      value={editClient.dateOfBirth}
                      onChange={onInputChangeDataUpdate}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" size="sm" onClick={(e) => onUpdateClient(e)}>
              Sửa
            </Button>{' '}
            <Button color="danger" size="sm" onClick={toggleEdit} >
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal >
      {/* Kết thúc modal sửa */}
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
                      onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                      <option value="">Chọn Tỉnh / Thành</option>
                      {provinces.map((province) => (
                        <option key={province.ProvinceID} value={province.ProvinceID}>
                          {province.ProvinceName}
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
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={!formData.proviceCode}
                    >
                      <option value="">Chọn Quận / Huyện</option>
                      {
                        districts.map((district) => (
                          <option key={district.DistrictID} value={district.DistrictID} >
                            {district.DistrictName}
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
                      {
                        communes.map((commune) => (
                          <option key={commune.WardCode} value={commune.WardCode}>
                            {commune.WardName}
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
      {/* Modal hiển thị ds Địa chỉ */}
      <Modal
        isOpen={modalAdress}
        toggle={toggleAdress}
        backdrop={'static'}
        keyboard={false}
        style={{ maxWidth: '500px' }}
      >
        <ModalHeader toggle={toggleAdress}>
          <h3 className="heading-small text-muted mb-0">Địa chỉ khách hàng</h3>
        </ModalHeader>
        <ModalBody>
          <Row className="mb-4 mt--4 mr--5">

            <span className="col-8">
              <label className="form-control-label">
                Danh sách địa chỉ
              </label>
            </span>
            <span className="col-3 d-flex justify-content-end">
              <Button color="primary" onClick={toggleAddAdress} size="sm"  >
                + Thêm
              </Button>
            </span>
          </Row>
          <Form>
            <div className="pl-lg-4">
              {listAddress.length <= 0 &&
                <Row style={{ fontSize: 13 }} className="text-small text-muted mb-0">
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
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" onClick={toggleAdress} >
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal >
      {/* Kết thúc modal hiển thị ds  địa chỉ */}
      {/* Filter */}
      <Modal
        isOpen={modalFilter}
        toggle={toggleFilter}
        style={{
          width: "380px",
          right: "unset",
          left: 0,
          position: "fixed",
          marginLeft: "252px",
          marginRight: 0,
          top: "-27px",
          maxHeight: "640px",
          overflowY: "auto",
          height: "fit-content",
        }}
        backdrop={false}
      >
        <ModalHeader toggle={toggleFilter}>
          <h3 className="heading-small text-muted mb-0">
            Bộ lọc tìm kiếm
          </h3>
        </ModalHeader>
        <ModalBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Form>
            {/* Ngày Sinh */}
            <FormGroup>
              <label
                style={{ fontSize: 13 }}
                className="form-control-label"
              >
                Ngày sinh
              </label>
              <Input
                className="form-control-alternative"
                type="date"
                size="sm"
              />
            </FormGroup>

            {/* Gioi tính */}
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
                    checked={search.gender === false || search.gender === 'false'}
                    onClick={(e) => onInputChangeSearch(e)}
                  />Nam
                </div>
                <div className="custom-control custom-radio">
                  <Input
                    className="custom-control-alternative"
                    id="nu"
                    name="gender"
                    type="radio"
                    value={true}
                    checked={search.gender === true || search.gender === 'true'}
                    onClick={(e) => onInputChangeSearch(e)}
                  />Nữ
                </div>
              </div>
            </FormGroup>

            {/* Địa Chỉ */}
            <FormGroup>
              <label
                style={{ fontSize: 13 }}
                className="form-control-label"
              >
                Địa chỉ
              </label>
              <Input
                className="form-control-alternative"
                type="text"
                size="sm"
              />
            </FormGroup>

            {/* Ngày tạo */}
            <FormGroup>
              <label
                style={{ fontSize: 13 }}
                className="form-control-label"
              >
                Ngày tạo
              </label>
              <Input
                className="form-control-alternative"
                type="date"
                size="sm"
              />
            </FormGroup>

            {/* Ngày cập nhật */}
            <FormGroup>
              <label
                style={{ fontSize: 13 }}
                className="form-control-label"
              >
                Ngày cập nhật
              </label>
              <Input
                className="form-control-alternative"
                type="date"
                size="sm"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="row w-100">
            <div className="col-4">
              <Button color="primary" outline size="sm" block onClick={() => { resetSearch(); }}>
                Làm mới
              </Button>
            </div>
            <div className="col-4">
              <Button color="primary" outline size="sm" block onClick={toggleFilter}>
                Lọc
              </Button>
            </div>
            <div className="col-4">
              <Button color="danger" outline size="sm" block onClick={toggleFilter}>
                Đóng
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default Client;
