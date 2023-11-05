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
import Select from "react-select";
import axiosInstance from "services/custommize-axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from 'react-icons/fa';

// core components
import ProfileHeader from "components/Headers/ProfileHeader";
// import ImageUpload from "views/admin/discount/ImageUpload.js";

const Profile = () => {


  const [provinces, setProvinces] = useState([]);

  const [admins, setAdmins] = useState([]);


  const fetchData = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);

      const response = await axiosInstance.get("/staff/detail/12");
      setAdmins(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  useEffect(() => {
    setFormData({
      id: admins.id,
      fullname: admins.fullname,
      email: admins.email,
      dateOfBirth: admins.dateOfBirth,
      phoneNumber: admins.phoneNumber,
      address: {
        addressDetail: admins.addressDetail,
        proviceCode: admins.proviceCode,
        districtCode: admins.districtCode,
        communeCode: admins.communeCode,
        isDeleted: true,
      },
    });
  }, [admins]);

  //Add

  const saveAdmin = async () => {
    try {
      await axiosInstance.put('/staff/update', formData);
      toast.success('Cập nhật thông tin thành công!');
      fetchData();
    } catch (error) {
      console.error('Lỗi rồi trời ơi:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error('Đã có lỗi xảy ra.');
      }
    }
  };

  const [formData, setFormData] = useState({
    id: '',
    fullname: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: {
      addressDetail: '',
      proviceCode: '',
      districtCode: '',
      communeCode: '',
      isDeleted: true,
    },
  });

  // changePassword
  const [formPass, setFormPass] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const changePassword = async () => {
    try {
      const requestBody = {
        email: formData.email,
        // phoneNumber: formData.phoneNumber,
        newPassword: formPass.newPassword,
        confirmPassword: formPass.confirmPassword,
      };
      console.log(requestBody);
      await axiosInstance.put('/staff/changePassword', requestBody);
      toast.success('Bạn đã thay đổi mật khẩu thành công!');
    } catch (error) {
      console.error('Lỗi rồi trời ơi:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error('Đã có lỗi xảy ra.');
      }
    }
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
                <h2 class="card-title h4">Basic information</h2>

                <div class="ml-auto mt--5">
                  {/* <ImageUpload className=" bg-light" /> */}
                </div>
              </div>
              {/* <!-- Body --> */}
              <div class="card-body">
                {/* <!-- Form --> */}
                <form>
                  {/* <!-- Form Group Fullname --> */}
                  <div class="row form-group">
                    <label for="firstNameLabel" class="ml-2 col-sm-3 input-label">Họ Tên
                      <i class="tio-help-outlined text-body ml-1" data-toggle="tooltip" data-placement="top"></i>
                    </label>

                    <div class="col-sm-8">
                      <div class="input-group input-group-sm-down-break">
                        <Input type="text" class="form-control" name="fullname"
                          placeholder="fullname"
                          value={formData.fullname}
                          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}                          // onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group DateOfBirth--> */}
                  <div class="row form-group">
                    <label for="emailLabel" class="ml-2 col-sm-3 input-label">Ngày Sinh</label>

                    <div class="col-sm-8">
                      <Input type="date" class="form-control" name="email" id="emailLabel"
                        placeholder="dateOfBirth" aria-label="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* <!-- End Form Group -->

                  <!-- Form Group Phone --> */}
                  <div class="row form-group">
                    <label for="phoneLabel" class="ml-2 col-sm-3 input-label">Số điện thoại</label>

                    <div class="col-sm-8">
                      <Input type="text" class="js-masked-input form-control" name="phone" id="phoneLabel"
                        placeholder="+x(xxx)xxx-xx-xx"
                        value={formData.phoneNumber} data-hs-mask-options='{
                             "template": "+0(000)000-00-00"
                           }'
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* <!-- End Form Group -->

                        <!-- Form Group address --> */}
                  {/* <div className="pl-lg-4"> */}
                  <div class="row form-group">
                    <label for="addressLabel" class="ml-2 col-sm-3 input-label">Địa Chỉ</label>

                    <div class="col-sm-8">
                      <Input type="textarea" class="form-control" name="address"
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
                        } />
                    </div>
                    {/* </div> */}
                    <Row className="mt-5 ml-3">
                      {/* Tỉnh thành */}
                      <Col lg="4">
                        <FormGroup>
                          <label className="input-label" htmlFor="input-city">
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
                          <label className="input-label" htmlFor="input-country">
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
                          <label className="input-label">
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
                    </Row>
                  </div>
                  {/* <!-- End Form Group --> */}

                </form>
                {/* <!-- End Form --> */}
                <div class="d-flex justify-content-end ">
                  <button type="submit" class="btn btn-primary small" onClick={saveAdmin} >Save changes</button>
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
                <p>Your current email address is <span class="font-weight-bold">mark@example.com</span></p>

                {/* <!-- Form --> */}
                <Form>
                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="newEmailLabel" class="col-sm-3 input-label">New email
                      address</label>

                    <div class="col-sm-9">
                      <Input type="email" class="form-control" name="newEmail" id="newEmailLabel"
                        placeholder="Enter new email address" aria-label="Enter new email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}
                </Form>
                {/* <!-- End Form --> */}
                <div class="d-flex justify-content-end ">
                  <button type="submit" class="btn btn-primary small" onClick={saveAdmin} >Save changes</button>
                </div>
              </div>
              {/* <!-- End Body --> */}
              
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card Password--> */}
            <div id="passwordSection" class="card mb-3 mb-lg-5 small">
              <div class="card-header">
                <h4 class="card-title">Change your password</h4>
              </div>

              {/* <!-- Body --> */}
              <div class="card-body">
                {/* <!-- Form --> */}
                <form id="changePasswordForm">

                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="newPassword" class="col-sm-3 col-form-label input-label">New password</label>

                    <div class="col-sm-9">
                      <Input type="password" class="js-pwstrength form-control" name="newPassword"
                        id="newPassword" placeholder="Enter new password" aria-label="Enter new password"
                        onChange={(e) => setFormPass({ ...formPass, newPassword: e.target.value })}

                        />

                      <p id="passwordStrengthVerdict" class="form-text mb-2" />

                      <div id="passwordStrengthProgress"></div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="confirmPasswordLabel" class="col-sm-3 col-form-label input-label">Confirm new
                      password</label>

                    <div class="col-sm-9">
                      <div class="mb-3">
                        <Input type="password" class="form-control" name="confirmPassword"
                          id="confirmPasswordLabel" placeholder="Confirm your new password"
                          aria-label="Confirm your new password" 
                          onChange={(e) => setFormPass({ ...formPass, confirmPassword: e.target.value })}
                          />
                      </div>

                      <h5>Password requirements:</h5>

                      <p class="font-size-sm mb-2">Ensure that these requirements are met:</p>

                      <ul class="font-size-sm">
                        <li>Minimum 8 characters long - the more, the better</li>
                        <li>At least one lowercase character</li>
                        <li>At least one uppercase character</li>
                        <li>At least one number, symbol, or whitespace character</li>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}
                </form>
                {/* <!-- End Form --> */}
                <div class="d-flex justify-content-end ">
                  <button type="submit" class="btn btn-primary small" onClick={changePassword} >Save changes</button>
                </div>
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <div id="deleteAccountSection" class="card mb-3 mb-lg-5 small">
              <div class="card-header">
                <h4 class="card-title">Delete your account</h4>
              </div>

              {/* <!-- Body --> */}
              <CardBody>
                <p class="card-text">When you delete your account, you lose access to Front account services, and we
                  permanently delete your personal data. You can cancel the deletion for 14 days.</p>

                <FormGroup >
                  {/* <!-- Custom Checkbox --> */}
                  <div class="custom-control custom-checkbox">
                    <Input type="checkbox" class="custom-control-input" id="deleteAccountCheckbox" />
                    <label class="custom-control-label" for="deleteAccountCheckbox">Confirm that I want to
                      delete my account.</label>
                  </div>
                  {/* <!-- End Custom Checkbox --> */}
                </FormGroup>

                <div class="d-flex justify-content-end">
                  <a class="btn btn-white mr-2" href="#">Learn more <i class="tio-open-in-new ml-1"></i></a>

                  <button type="submit" class="btn btn-danger">Delete</button>
                </div>
              </CardBody>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Sticky Block End Point --> */}
            <div id="stickyBlockEndPoint"></div>
          </div>

          <div class="col-lg-3">
            {/* <!-- Navbar --> */}
            <div class="navbar-vertical navbar-expand-lg mb-lg-5 mt-6">
              <div id="navbarVerticalNavMenu" class="">
                {/* <!-- Navbar Nav --> */}
                <ul id="navbarSettings" class="js-sticky-block js-scrollspy navbar-nav navbar-nav-lg nav-tabs card card-navbar-nav"
                data-hs-sticky-block-options='{
                  "parentSelector": "#navbarVerticalNavMenu",
                  "breakpoint": "lg",
                  "startPoint": "#navbarVerticalNavMenu",
                  "endPoint": "#stickyBlockEndPoint",
                  "stickyOffsetTop": 20
                }'
                >
                  <li class="nav-item">
                    <a class="nav-link active" href="#content">
                      <i class="tio-user-outlined nav-icon"></i> Basic information
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#emailSection">
                      <i class="tio-online nav-icon"></i> Email
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#passwordSection">
                      <i class="tio-lock-outlined nav-icon"></i> Password
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="#deleteAccountSection">
                      <i class="tio-delete-outlined nav-icon"></i> Delete account
                    </a>
                  </li>
                </ul>
                {/* <!-- End Navbar Nav --> */}
              </div>
            </div>
            {/* <!-- End Navbar --> */}
          </div>
        </Row>
      </Container >
    </>
  );
};

export default Profile;
