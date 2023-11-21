import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileAlt,
  FaCamera,
  FaLock,
  FaLockOpen,
  FaFilter,
  FaTimesCircle,
  FaUndoAlt,
  FaSort,
  FaTimes,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import Header from "components/Headers/Header.js";

// reactstrap components
import Switch from "react-input-switch";
import {
  Row,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Table,
  Badge,
  Modal,
  Container,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardBody,
  CardHeader,
  CardFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const Staff = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleModal = () => {
    resetForm();
    setModal(true);
  };

  const [modalFilter, setModalFilter] = useState(false);
  const toggleFilter = () => {
    setModalFilter(!modalFilter);
    // fetchData();
  };
  const handleModalFilter = () => {
    // resetForm();
    setModalFilter(true);
  };

  const [value, setValue] = useState("no");
  const [admins, setAdmins] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 5,
    fullname: "",
    phonenumber: "",
    email: "",
    gender: "",
  });

  //load
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/staff", {
        params: {
          ...queryParams,
          fullname: queryParams.fullname || null,
          phonenumber: queryParams.phonenumber || null,
          email: queryParams.email || null,
          gender: queryParams.gender === "" ? null : queryParams.gender,
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

  // ADDRESS
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const provincesResponse = await axios.get(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        setProvinces(provincesResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tỉnh/thành phố:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleProvinceChange = async (value) => {
    const selectedProvinceCode = value;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        proviceCode: selectedProvinceCode,
        districtCode: "",
        communeCode: "",
      },
    }));

    try {
      const districtsResponse = await axios.get(
        `https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`
      );
      setDistricts(districtsResponse.data.districts);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quận/huyện:", error);
    }
  };

  const handleDistrictChange = async (value) => {
    const selectedDistrictCode = value;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        districtCode: selectedDistrictCode,
        communeCode: "",
      },
    }));

    try {
      const communesResponse = await axios.get(
        `https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`
      );
      setCommunes(communesResponse.data.wards);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phường/xã:", error);
    }
  };

  // END ADDRESS

  const handlePageChange = ({ selected }) => {
    setQueryParams((prevParams) => ({ ...prevParams, page: selected }));
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setQueryParams({ ...queryParams, size: newSize, page: 0 });
  };

  const calculateIndex = (index) => {
    return index + 1 + queryParams.page * queryParams.size;
  };

  const statusMapping = {
    0: { color: "danger", label: "Nghỉ làm" },
    1: { color: "success", label: "Đang làm" },
  };

  //lọc
  const resetFilters = () => {
    setQueryParams({
      page: 0,
      size: 5,
      fullname: "",
      phonenumber: "",
      email: "",
      gender: "",
    });
  };

  //reset
  const resetForm = () => {
    setFormData({
      username: "",
      avatar: null,
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

  //click on selected
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    avatar: null,
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

  const handleRowClick = async (admin) => {
    handleProvinceChange(admin.proviceCode);
    handleDistrictChange(admin.districtCode);

    setFormData({
      id: admin.id,
      username: admin.username,
      fullname: admin.fullname,
      gender: admin.gender,
      avatar: admin.avatar,
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
    if (admin.avatar) {
      // Hiển thị hình ảnh
      const blob = await fetch(`data:image/jpeg;base64,${admin.avatar}`).then(
        (res) => res.blob()
      );
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      setFile(file);
    }else {
      const defaultAvatar = getDefaultAvatar(admin.gender, admin.avatar);
      const blob = await fetch(defaultAvatar).then((res) => res.blob());
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      setFile(file);
    }
    setModal(true);
  };

  //Add
  const saveAdmin = async () => {
    try {
      if (formData.id) {
        await axiosInstance.put(`/staff/update`, formData);
        changeAvatar();
        fetchData();
        toast.success("Cập nhật thành công!");
      } else {
        await axiosInstance.post("/staff/create", {
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
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    }
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
  const imageSize = "110px";
  const imageStyle = {
    width: imageSize,
    height: imageSize,
  };
  const buttonStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    padding: "8px",
    cursor: "pointer",
    border: "1px dashed gray",
    width: imageSize,
    height: imageSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const changeAvatar = async () => {
    try {
      const image = new FormData();
      if (file) {
        image.append("file", file);
      }

      if (file) {
        await axiosInstance.put(`/staff/${formData.id}/multipart-file`, image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchData();
    } catch (error) {
      console.error("Failed to change avatar", error);
      // Xử lý lỗi (nếu cần)
    }
  };

  const getDefaultAvatar = (gender, avatar) => {
    if (avatar) {
      return `data:image/jpeg;base64,${avatar}`;
    } else if (gender === true) {
      // Nữ
      return "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTu-uhxThn7kpatyW-egV5DpMNflanGQ_oeqUqmgEMx7KUkhyzF";
    } else if (gender === false) {
      // Nam
      return "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSbAVI8wgtBGopfLggnV-HvwW-_NYYvGxwAGRUBdHKwdSoPRjEX";
    } else {
      // Null
      return "https://thumbs.dreamstime.com/b/default-businessman-avatar-icon-vector-business-people-profile-concept-279597784.jpg";
    }
  };

  const AvatarReset = () => {
    setFile(null);
  };

  //delete
  const deleteAdmin = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      axiosInstance
        .patch(`/staff/delete/${id}`)
        .then((response) => {
          fetchData();
          toast.success("Xóa thành công");
        })
        .catch((error) => {
          console.error("Lỗi khi xóa dữ liệu:", error);
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
      setShowActions(selectedId.length - 1 > 0);
      // setShowActions(false);
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
  const [selectedStatus, setSelectedStatus] = useState("");

  const filterAdmins = admins.filter((admin) => {
    if (selectedStatus !== "" && admin.status.toString() !== selectedStatus) {
      return false;
    }

    if (
      searchValue !== "" &&
      !admin.fullname.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Lọc
  const handleFilter = () => {
    // const fullname = document.getElementById("fullname").value;
    const phonenumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const genderMale = document.getElementById("genderMale");
    const genderFemale = document.getElementById("genderFemale");
    let gender = "";
    if (genderMale.checked) {
      gender = "false";
    } else if (genderFemale.checked) {
      gender = "true";
    }

    setQueryParams({
      ...queryParams,
      // fullname: fullname || "",
      phonenumber: phonenumber || "",
      email: email || "",
      gender: gender || "",
    });

    toggleFilter(); // Đóng modal lọc
  };

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
                    <div className="col d-flex">
                      <h3 className="heading-small text-dark mb-0">
                        Nhân Viên
                      </h3>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          outline
                          onClick={handleModal}
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
                        onClick={handleModalFilter}
                      >
                        <FaFilter size="16px" className="mr-1" />
                        Bộ lọc
                      </Button>
                      <Button
                        color="warning"
                        outline
                        size="sm"
                        onClick={resetFilters}
                      >
                        <FaTimes size="16px" className="mr-1" />
                        Xóa bộ lọc
                      </Button>
                      <Col>
                        <InputGroup size="sm">
                          <Input
                            type="search"
                            placeholder="Tìm kiếm mã, tên nhân viên..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <FaSearch />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>{" "}
                      {/* Show Action */}
                      {showActions && (
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
                      )}
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
                          <option value="0">Nghỉ làm</option>
                          <option value="1">Đang làm</option>
                        </Input>
                      </Col>
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
                        <th scope="col">Ảnh</th>
                        <th
                          scope="col"
                          style={{
                            position: "sticky",
                            zIndex: "1",
                            left: "0",
                          }}
                        >
                          Trạng thái
                        </th>

                        <th scope="col" style={{ cursor: "pointer" }}>
                          Họ tên
                          <FaSort style={{ cursor: "pointer" }} />
                        </th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col" style={{ cursor: "pointer" }}>
                          Email
                        </th>
                        <th scope="col" style={{ cursor: "pointer" }}>
                          Địa chỉ
                        </th>
                        <th
                          scope="col"
                          style={{
                            position: "sticky",
                            zIndex: "1",
                            right: "0",
                          }}
                        >
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filterAdmins) &&
                      filterAdmins.length > 0 ? (
                        filterAdmins.map((admin, index) => (
                          <tr key={admin.id}>
                            <td className="text-center">
                              <FormGroup check>
                                <Input
                                  type="checkbox"
                                  checked={selectedId.includes(admin.id)}
                                  onChange={() =>
                                    handleCheckboxChange(admin.id)
                                  }
                                />
                              </FormGroup>
                            </td>
                            <td>{calculateIndex(index)}</td>
                            <td>
                              <span className="avatar avatar-sm rounded-circle">
                                <img
                                  src={getDefaultAvatar(admin.gender, admin.avatar)}
                                  alt={admin.username}
                                />
                              </span>
                            </td>
                            <td
                              style={{
                                position: "sticky",
                                zIndex: "1",
                                left: "0",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Badge
                                color={
                                  statusMapping[admin.status]?.color ||
                                  statusMapping.default.color
                                }
                              >
                                {statusMapping[admin.status]?.label ||
                                  statusMapping.default.label}
                              </Badge>
                            </td>

                            <td>{admin.fullname}</td>
                            <td>{admin.dateOfBirth}</td>
                            <td>{admin.gender ? "Nữ" : "Nam"}</td>
                            <td>{admin.phoneNumber}</td>
                            <td
                              style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                maxWidth: "170px",
                              }}
                            >
                              {admin.email}
                            </td>
                            <td
                              style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                maxWidth: "170px",
                              }}
                            >
                              {admin.addressDetail}, {admin.address}
                            </td>

                            <td
                              style={{
                                position: "sticky",
                                zIndex: "1",
                                right: "0",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Button
                                color="link"
                                size="sm"
                                onClick={() => handleRowClick(admin)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                color="link"
                                size="sm"
                                onClick={() => deleteAdmin(admin.id)}
                              >
                                <FaTrash />
                              </Button>
                              {admin.status === 0 && (
                                <Button
                                  color="link"
                                  size="sm"
                                  onClick={() => updateStatus(admin.id, 1)}
                                >
                                  <FaLockOpen />
                                </Button>
                              )}
                              {admin.status === 1 && (
                                <Button
                                  color="link"
                                  size="sm"
                                  onClick={() => updateStatus(admin.id, 0)}
                                >
                                  <FaLock />
                                </Button>
                              )}
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
                        Đang xem{" "}
                        <b>{queryParams.page * queryParams.size + 1}</b> đến{" "}
                        <b>
                          {queryParams.page * queryParams.size + admins.length}
                        </b>{" "}
                        trong tổng số
                        <b> {totalElements}</b> mục
                      </div>
                    </Col>
                    <Col style={{ fontSize: 14 }} lg={2}>
                      <Row>
                        <span>Xem </span>&nbsp;
                        <span>
                          <Input
                            type="select"
                            name="status"
                            style={{ width: "60px", fontSize: 14 }}
                            size="sm"
                            className="mt--1"
                            onChange={handleSizeChange}
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </Input>
                        </span>
                        &nbsp;
                        <span> mục</span>
                      </Row>
                    </Col>
                    <Col
                      lg={4}
                      style={{ fontSize: 11 }}
                      className="mt--1 text-right"
                    >
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

            {/* Add - Update */}
            <Modal
              isOpen={modal}
              toggle={toggle}
              backdrop={"static"}
              keyboard={false}
              style={{ maxWidth: "900px" }}
            >
              <ModalHeader toggle={toggle}>
                <h3 className="heading-small text-muted mb-0">
                  {formData.id ? "Cập Nhật Nhân Viên" : "Thêm Mới Nhân Viên"}
                </h3>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      {!formData.id && (
                        <>
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
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    username: e.target.value,
                                  })
                                }
                              />
                            </FormGroup>
                          </Col>
                        </>
                      )}
                      {formData.id && (
                        <>
                          <Col lg="4" className="d-flex justify-content-center">
                            <div
                              style={{
                                position: "relative",
                                width: imageSize,
                                height: imageSize,
                              }}
                            >
                              {imageUrl && (
                                <img
                                  alt="preview"
                                  src={imageUrl}
                                  style={imageStyle}
                                />
                              )}
                              <Label htmlFor="file-input" style={buttonStyle}>
                                <FaCamera size={15} />
                                {/* <FaTrash size={15} className="ml-2" onClick={AvatarReset}/>  */}
                              </Label>

                              <Input
                                type="file"
                                id="file-input"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />
                            </div>
                          </Col>
                        </>
                      )}
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
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullname: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                dateOfBirth: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="email">
                            Email:
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="gender"
                          >
                            Giới tính:
                          </label>
                          <div style={{ display: "flex" }}>
                            <div className="custom-control custom-radio">
                              <Input
                                className="custom-control-alternative"
                                name="gender"
                                type="radio"
                                checked={!formData.gender}
                                onChange={() =>
                                  setFormData({ ...formData, gender: false })
                                }
                              />
                              Nam
                            </div>
                            <div className="custom-control custom-radio">
                              <Input
                                className="custom-control-alternative"
                                name="gender"
                                type="radio"
                                checked={formData.gender}
                                onChange={(e) =>
                                  setFormData({ ...formData, gender: true })
                                }
                              />
                              Nữ
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
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      {/* // tỉnh thành */}
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Tỉnh / Thành
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={formData.address.proviceCode}
                            onChange={(e) =>
                              handleProvinceChange(e.target.value)
                            }
                          >
                            <option value="">Chọn Tỉnh / Thành</option>
                            {provinces.map((province) => (
                              <option key={province.code} value={province.code}>
                                {province.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* quận huyện*/}
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Quận / Huyện
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={formData.address.districtCode}
                            onChange={(e) =>
                              handleDistrictChange(e.target.value)
                            }
                            disabled={!formData.address.proviceCode}
                          >
                            <option value="">Chọn Quận / Huyện</option>
                            {districts.map((district) => (
                              <option key={district.code} value={district.code}>
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
                            onChange={(e) => {
                              setFormData((prevData) => ({
                                ...prevData,
                                address: {
                                  ...prevData.address,
                                  communeCode: e.target.value,
                                },
                              }));
                            }}
                            disabled={!formData.address.districtCode}
                          >
                            <option value="">Chọn Phường / Xã</option>
                            {communes.map((commune) => (
                              <option key={commune.code} value={commune.code}>
                                {commune.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* detail */}
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
                </Form>
              </ModalBody>
              <ModalFooter>
                <div className="text-center">
                  <Button color="primary" outline onClick={saveAdmin} size="sm">
                    {formData.id ? "Cập nhật" : "Thêm mới"}
                  </Button>
                  {formData.id ? null : (
                    <Button
                      color="primary"
                      outline
                      onClick={resetForm}
                      size="sm"
                    >
                      Reset
                    </Button>
                  )}
                  <Button color="danger" outline onClick={toggle} size="sm">
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </Modal>

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
                    <label
                      className="form-control-label"
                      style={{ fontSize: 13 }}
                    >
                      Giới tính
                    </label>
                    <div style={{ display: "flex" }}>
                      <div className="custom-control custom-radio">
                        <Input
                          className="custom-control-alternative"
                          id="genderMale"
                          name="gender"
                          type="radio"
                          value={false}
                        />
                        Nam
                      </div>
                      <div className="custom-control custom-radio">
                        <Input
                          className="custom-control-alternative"
                          id="genderFemale"
                          name="gender"
                          type="radio"
                          value={true}
                        />
                        Nữ
                      </div>
                    </div>
                  </FormGroup>

                  {/* Số điện thoại */}
                  <FormGroup>
                    <label
                      style={{ fontSize: 13 }}
                      className="form-control-label"
                    >
                      Số điện thoại
                    </label>
                    <Input
                      className="form-control-alternative"
                      size="sm"
                      id="phoneNumber"
                      type="text"
                    />
                  </FormGroup>

                  {/* Email */}
                  <FormGroup>
                    <label
                      style={{ fontSize: 13 }}
                      className="form-control-label"
                    >
                      Email
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="email"
                      type="text"
                      size="sm"
                    />
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
                  {/* <Col className="lg-6">
                    <Button
                      color="primary"
                      outline
                      size="sm"
                      block
                      onClick={resetFilters}
                    >
                      Làm mới
                    </Button>
                  </Col> */}
                  <Col className="lg-3">
                    <Button
                      color="primary"
                      outline
                      size="sm"
                      block
                      onClick={handleFilter}
                    >
                      Lọc
                    </Button>
                  </Col>
                  <Col className="lg-3">
                    <Button
                      color="danger"
                      outline
                      size="sm"
                      block
                      onClick={toggleFilter}
                    >
                      Đóng
                    </Button>
                  </Col>
                </div>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Staff;
