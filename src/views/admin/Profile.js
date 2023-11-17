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
  Label,
  Col,
} from "reactstrap";
import Select from "react-select";
import axiosInstance from "services/custommize-axios";
import { ToastContainer, toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileAlt,
  FaCamera,
  FaUser,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

// core components
import ProfileHeader from "components/Headers/ProfileHeader";
// import ImageUpload from "views/admin/discount/ImageUpload.js";

const Profile = () => {
  // const [userInfo, setUserInfo] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  const [admins, setAdmins] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/staff/detail/${storedUserId}`);
      handleProvinceChange(response.data.proviceCode);
      handleDistrictChange(response.data.districtCode);
      setAdmins(response.data);
      

      console.log(response.data.proviceCode);
      console.log(storedUserId);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storedUserId]);

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

  //update
  useEffect(() => {
    const fetchAvt = async () => {
      if (admins && admins.avatar) {
        const blob = await fetch(
          `data:image/jpeg;base64,${admins.avatar}`
        ).then((res) => res.blob());
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        setFile(file);
      }
    };

    const updateFormData = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: storedUserId,
        username: admins ? admins.username : "",
        fullname: admins ? admins.fullname : "",
        email: admins ? admins.email : "",
        dateOfBirth: admins ? admins.dateOfBirth : "",
        phoneNumber: admins ? admins.phoneNumber : "",
        address: {
          addressDetail: admins ? admins.addressDetail : "",
          proviceCode: admins ? admins.proviceCode : "",
          districtCode: admins ? admins.districtCode : "",
          communeCode: admins ? admins.communeCode : "",
          isDeleted: true,
        },
      }));
    };

    updateFormData();
    fetchAvt();
  }, [admins]);

  const saveAdmin = async () => {
    try {
      await axiosInstance.put("/staff/update", formData);
      changeAvatar();
      fetchData();
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi rồi trời ơi:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    }
  };

  const [formData, setFormData] = useState({
    id: storedUserId,
    username: "",
    fullname: "",
    avatar: null,
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: {
      addressDetail: "",
      proviceCode: "",
      districtCode: "",
      communeCode: "",
      isDeleted: true,
    },
  });

  // upload image
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const imageUrl = file ? URL.createObjectURL(file) : null;
  const imageSize = "150px";
  const imageStyle = {
    width: "140px",
    height: imageSize,
    borderRadius: "50%",
  };
  const buttonStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    padding: "8px",
    cursor: "pointer",
    border: "1px solid gray",
    width: "140px",
    height: imageSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  };
  const changeAvatar = async () => {
    try {
      const image = new FormData();
      if (file) {
        image.append("file", file);
      }
      if (file) {
        await axiosInstance.put(
          `/staff/${storedUserId}/multipart-file`,
          image,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      fetchData();
    } catch (error) {
      console.error("Failed to change avatar", error);
    }
  };

  // changePassword

  const [formPass, setFormPass] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const changePassword = async () => {
    try {
      const requestBody = {
        id: storedUserId,
        newPassword: formPass.newPassword,
        confirmPassword: formPass.confirmPassword,
      };
      console.log(requestBody);
      await axiosInstance.put("/staff/changePassword", requestBody);
      toast.success("Bạn đã thay đổi mật khẩu thành công!");
    } catch (error) {
      console.error("Lỗi rồi trời ơi:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    }
  };

  // SetActive
  const [activeLink, setActiveLink] = useState("content");
  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <>
      <ProfileHeader />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <Row>
          <div class="col-lg-9">
            {/* <!-- Card -->  */}
            <div class="card mb-3 mb-lg-5 small">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2 class="card-title h4">Thông tin cơ bản</h2>
              </div>
              {/* <!-- Body --> */}
              <div class="card-body">
                {/* <!-- Form --> */}
                <form>
                  {/* Username */}
                  <div class="row form-group">
                    <label class="ml-2 col-sm-3 input-label">
                      Tên tài khoản
                      <i
                        class="tio-help-outlined text-body ml-1"
                        data-toggle="tooltip"
                        data-placement="top"
                      ></i>
                    </label>

                    <div class="col-sm-8">
                      <div class="input-group input-group-sm-down-break">
                        <Input
                          type="text"
                          disabled
                          class="form-control"
                          name="username"
                          placeholder="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                          // onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- Form Group Fullname --> */}
                  <div class="row form-group">
                    <label
                      for="firstNameLabel"
                      class="ml-2 col-sm-3 input-label"
                    >
                      Họ Tên
                      <i
                        class="tio-help-outlined text-body ml-1"
                        data-toggle="tooltip"
                        data-placement="top"
                      ></i>
                    </label>

                    <div class="col-sm-8">
                      <div class="input-group input-group-sm-down-break">
                        <Input
                          type="text"
                          class="form-control"
                          name="fullname"
                          placeholder="fullname"
                          value={formData.fullname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullname: e.target.value,
                            })
                          } // onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group DateOfBirth--> */}
                  <div class="row form-group">
                    <label for="emailLabel" class="ml-2 col-sm-3 input-label">
                      Ngày Sinh
                    </label>

                    <div class="col-sm-8">
                      <Input
                        type="date"
                        class="form-control"
                        name="email"
                        id="emailLabel"
                        placeholder="dateOfBirth"
                        aria-label="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* <!-- End Form Group -->

                  <!-- Form Group Phone --> */}
                  <div class="row form-group">
                    <label for="phoneLabel" class="ml-2 col-sm-3 input-label">
                      Số điện thoại
                    </label>

                    <div class="col-sm-8">
                      <Input
                        type="text"
                        class="js-masked-input form-control"
                        name="phone"
                        id="phoneLabel"
                        placeholder="+x(xxx)xxx-xx-xx"
                        value={formData.phoneNumber}
                        data-hs-mask-options='{
                             "template": "+0(000)000-00-00"
                           }'
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* <!-- End Form Group -->

                  <!-- Form Group address --> */}
                  <div class="row form-group">
                    <label for="addressLabel" class="ml-2 col-sm-3 input-label">
                      Địa Chỉ
                    </label>

                    <div class="col-sm-8">
                      <Input
                        type="textarea"
                        class="form-control"
                        name="address"
                        placeholder="addressDetail"
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
                    </div>
                    {/* </div> */}
                    <Row className="mt-5 ml-3">
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
                    </Row>
                  </div>
                  {/* <!-- End Form Group --> */}
                </form>
                {/* <!-- End Form --> */}
                <div class="d-flex justify-content-end ">
                  <Button
                    type="submit"
                    color="primary"
                    size="sm"
                    onClick={saveAdmin}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card email --> */}
            <div id="emailSection" class="card mb-3 mb-lg-5 small">
              <div class="card-header">
                <h3 class="card-title h4">Email</h3>
              </div>

              {/* <!-- Body --> */}
              <div class="card-body">
                <p size="sm">
                  Email của bạn là:{" "}
                  <span class="font-weight-bold"> mark@example.com</span>
                </p>

                {/* <!-- Form --> */}
                <Form>
                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="newEmailLabel" class="col-sm-3 input-label">
                      Địa chỉ email
                    </label>

                    <div class="col-sm-9">
                      <Input
                        type="email"
                        class="form-control"
                        name="newEmail"
                        id="newEmailLabel"
                        placeholder="Enter new email address"
                        aria-label="Enter new email address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}
                </Form>
                {/* <!-- End Form --> */}
                <div class="d-flex justify-content-end ">
                  <Button
                    type="submit"
                    color="primary"
                    size="sm"
                    onClick={saveAdmin}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card Password--> */}
            <div id="passwordSection" class="card mb-3 mb-lg-5 small">
              <div class="card-header">
                <h4 class="card-title">Thay đổi mật khẩu</h4>
              </div>

              {/* <!-- Body ChangePass --> */}
              <div class="card-body">
                {/* <!-- Form --> */}
                <form id="changePasswordForm">
                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label
                      for="newPassword"
                      class="col-sm-3 col-form-label input-label"
                    >
                      Mật khẩu mới
                    </label>

                    <div class="col-sm-9">
                      <Input
                        type="password"
                        class="js-pwstrength form-control"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter new password"
                        aria-label="Enter new password"
                        onChange={(e) =>
                          setFormPass({
                            ...formPass,
                            newPassword: e.target.value,
                          })
                        }
                      />

                      <p id="passwordStrengthVerdict" class="form-text mb-2" />

                      <div id="passwordStrengthProgress"></div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label
                      for="confirmPasswordLabel"
                      class="col-sm-3 col-form-label input-label"
                    >
                      Nhập lại mật khẩu
                    </label>

                    <div class="col-sm-9">
                      <div class="mb-3">
                        <Input
                          type="password"
                          class="form-control"
                          name="confirmPassword"
                          id="confirmPasswordLabel"
                          placeholder="Confirm your new password"
                          aria-label="Confirm your new password"
                          onChange={(e) =>
                            setFormPass({
                              ...formPass,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>

                      <h5>Yêu cầu về mật khẩu:</h5>
                      <p class="font-size-sm mb-2">
                        Đảm bảo các yêu cầu sau được đáp ứng:
                      </p>
                      <ul class="font-size-sm">
                        <li>Tối thiểu 8 ký tự - càng nhiều càng tốt</li>
                        <li>Ít nhất một ký tự viết thường</li>
                        <li>Ít nhất một ký tự viết hoa</li>
                        <li>Ít nhất một số, ký hiệu hoặc ký tự khoảng trắng</li>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}
                </form>
                {/* <!-- End Form --> */}
                <div class="d-flex justify-content-end ">
                  <Button
                    type="submit"
                    color="primary"
                    size="sm"
                    onClick={changePassword}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}
          </div>
          <style>
            {`
              .nav-item.active::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                background-color: #5c5f83;
              }
              `}
          </style>
          <div class="col-lg-3">
            {/* <!-- Navbar --> */}
            <div
              class=" navbar-vertical navbar-expand-lg bg-white mb-lg-2 mt-3 pb-5"
              style={{ position: "sticky", top: "5 ", height: "90vh" }}
            >
              <div id="navbarVerticalNavMenu" class="">
                {/* <!-- Navbar Nav --> */}
                <ul
                  id="navbarSettings"
                  class=" navbar-nav navbar-nav-lg nav-tabs"
                >
                  {/* Avatar */}
                  <div class="ml-auto mb-5 mt-3 ">
                    <Col lg="8" className="d-flex justify-content-center">
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
                            src={`data:image/jpeg;base64,${admins.avatar}`}
                            style={imageStyle}
                          />
                        )}
                        <Label htmlFor="file-input" style={buttonStyle}>
                          <FaCamera size={15} />
                        </Label>

                        <Input
                          type="file"
                          id="file-input"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>
                    </Col>
                    <div class=" ml-3 mt-3 ">
                      <Button color="primary" size="sm" onClick={saveAdmin}>
                        Cập nhật Ảnh
                      </Button>
                    </div>
                  </div>
                  {/* menu */}
                  <li
                    className={`nav-item ${
                      activeLink === "content" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="#content"
                      onClick={() => handleLinkClick("content")}
                    >
                      <FaUser className="nav-icon mr-2" /> Thông tin cơ bản
                    </a>
                  </li>
                  <li
                    className={`nav-item ${
                      activeLink === "emailSection" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="#emailSection"
                      onClick={() => handleLinkClick("emailSection")}
                    >
                      <FaEnvelope className="nav-icon mr-2" />
                      Email
                    </a>
                  </li>
                  <li
                    className={`nav-item ${
                      activeLink === "passwordSection" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="#passwordSection"
                      onClick={() => handleLinkClick("passwordSection")}
                    >
                      <FaLock className="nav-icon mr-2" /> Mật khẩu
                    </a>
                  </li>
                </ul>
                {/* <!-- End Navbar Nav --> */}
              </div>
            </div>
            {/* <!-- End Navbar --> */}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
