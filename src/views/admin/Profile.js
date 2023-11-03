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
// core components
import ProfileHeader from "components/Headers/ProfileHeader";
import ImageUpload from "views/admin/discount/ImageUpload.js";

const Profile = () => {


  const [provinces, setProvinces] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [admins, setAdmins] = useState({
    id: "",
    username: "",
    fullname: "",
    gender: false,
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    // address: {
    proviceCode: "",
    districtCode: "",
    communeCode: "",
    addressDetail: "",
    isDeleted: true,
    // },
    status: "",
  });

  const fetchData = async () => {
    try {
      const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(provincesResponse.data);

      const response = await axiosInstance.get("/staff/detail/6");
      setAdmins(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ProfileHeader />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <Row>
          <div class="col-lg-9">
            {/* <!-- Card -->  */}
            <div class="card mb-3 mb-lg-5">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2 class="card-title h4">Basic information</h2>
                <div class="ml-auto mt--5">
                  <ImageUpload className=" bg-light" />
                </div>
              </div>
              {/* <!-- Body --> */}
              <div class="card-body">
                {/* <!-- Form --> */}
                <form>
                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="firstNameLabel" class="col-sm-3 col-form-label input-label">Full name
                      <i class="tio-help-outlined text-body ml-1" data-toggle="tooltip" data-placement="top"></i>
                    </label>

                    <div class="col-sm-9">
                      <div class="input-group input-group-sm-down-break">
                        <Input type="text" class="form-control" name="fullname"
                          placeholder="fullname" value={admins.fullname} />

                      </div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="emailLabel" class="col-sm-3 col-form-label input-label">Email</label>

                    <div class="col-sm-9">
                      <Input type="email" class="form-control" name="email" id="emailLabel"
                        placeholder="Email" aria-label="Email" value={admins.email} />
                    </div>
                  </div>
                  {/* <!-- End Form Group -->

                        <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="phoneLabel" class="col-sm-3 col-form-label input-label">Phone <span
                      class="input-label-secondary">(Optional)</span></label>

                    <div class="col-sm-9">
                      <Input type="text" class="js-masked-input form-control" name="phone" id="phoneLabel"
                        placeholder="+x(xxx)xxx-xx-xx"
                        value={admins.phoneNumber} data-hs-mask-options='{
                             "template": "+0(000)000-00-00"
                           }'/>
                    </div>
                  </div>
                  {/* <!-- End Form Group -->

                        <!-- Form Group --> */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                            value={admins.addressDetail}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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
                  {/* <!-- End Form Group --> */}


                </form>
                {/* <!-- End Form --> */}
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <div id="emailSection" class="card mb-3 mb-lg-5">
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
                    <label for="newEmailLabel" class="col-sm-3 col-form-label input-label">New email
                      address</label>

                    <div class="col-sm-9">
                      <Input type="email" class="form-control" name="newEmail" id="newEmailLabel"
                        placeholder="Enter new email address" aria-label="Enter new email address" />
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}


                </Form>
                {/* <!-- End Form --> */}
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <div id="passwordSection" class="card mb-3 mb-lg-5">
              <div class="card-header">
                <h4 class="card-title">Change your password</h4>
              </div>

              {/* <!-- Body --> */}
              <div class="card-body">
                {/* <!-- Form --> */}
                <form id="changePasswordForm">
                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="currentPasswordLabel" class="col-sm-3 col-form-label input-label">Current
                      password</label>

                    <div class="col-sm-9">
                      <Input type="password" class="form-control" name="currentPassword"
                        id="currentPasswordLabel" placeholder="Enter current password"
                        aria-label="Enter current password" />
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="newPassword" class="col-sm-3 col-form-label input-label">New password</label>

                    <div class="col-sm-9">
                      <Input type="password" class="js-pwstrength form-control" name="newPassword"
                        id="newPassword" placeholder="Enter new password" aria-label="Enter new password"
                        data-hs-pwstrength-options='{
                             "ui": {
                               "container": "#changePasswordForm",
                               "viewports": {
                                 "progress": "#passwordStrengthProgress",
                                 "verdict": "#passwordStrengthVerdict"
                               }
                             }
                           }'/>

                      <p id="passwordStrengthVerdict" class="form-text mb-2" />

                      <div id="passwordStrengthProgress"></div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div class="row form-group">
                    <label for="confirmNewPasswordLabel" class="col-sm-3 col-form-label input-label">Confirm new
                      password</label>

                    <div class="col-sm-9">
                      <div class="mb-3">
                        <Input type="password" class="form-control" name="confirmNewPassword"
                          id="confirmNewPasswordLabel" placeholder="Confirm your new password"
                          aria-label="Confirm your new password" />
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
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <div id="deleteAccountSection" class="card mb-3 mb-lg-5">
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
