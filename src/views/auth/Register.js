import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

const Register = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // State để lưu thông báo lỗi

  // const { fullname, phoneNumber, email, username, password, confirmPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:33321/api/account/register", user);
      navigate("/");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Nếu phản hồi chứa thông tin lỗi chi tiết cho từng trường
        setErrors(error.response.data); // Lưu thông báo lỗi vào state errors
      } else {
        setErrors({}); // Nếu không có thông báo lỗi chi tiết, đặt state errors là trống
      }
      console.error("Lỗi từ máy chủ:", error.response ? error.response.data : error.message);
    }
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Đăng kí với</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img alt="..." src={require("../../assets/img/icons/common/github.svg").default} />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img alt="..." src={require("../../assets/img/icons/common/google.svg").default} />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Hoặc đăng kí bằng thông tin xác thực</small>
            </div>
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Fullname"
                    type="text"
                    name="fullname"
                    onChange={onInputChange}
                  />
                </InputGroup>
                {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone number"
                    type="tel"
                    name="phoneNumber"
                    onChange={onInputChange}
                  />
                </InputGroup>
                {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={onInputChange}
                  />
                </InputGroup>
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                    name="username"
                    onChange={onInputChange}
                  />
                </InputGroup>
                {errors.username && <div className="text-danger">{errors.username}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={onInputChange}
                  />
                </InputGroup>
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="confirm-password"
                    name="confirmPassword"
                    onChange={onInputChange}
                  />
                </InputGroup>
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </FormGroup>

              <div className="text-center">
                <Button className="mt-4"
                color="primary"
                type="submit"
              >
                Đăng ký
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </>
);
};

export default Register;
