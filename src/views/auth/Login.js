import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "services/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
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
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import ForgotPass from "../auth/ForgotPass.js";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [googleRedirectUri, setGoogleRedirectUri] = useState("");
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const [authenticationSuccessful, setAuthenticationSuccessful] = useState(false);

  useEffect(() => {
    if (initialized) {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code && !authenticationSuccessful) {
        setAuthenticationSuccessful(true);
        console.log(code);
        callApiWithCode(code);
      }
    } else {
      setInitialized(true);
    }
  }, [location.search, authenticationSuccessful, initialized]);

  const callApiWithCode = async (code) => {
    try {
      const response = await axios.post('http://localhost:33321/api/oauth/oauth/google', null, {
        params: {
          code: code
        }
      });

      const { id, token, authorities, userId } = response.data;

      login({ id, token, authorities, userId });

      toast.success("Đăng nhập thành công!");

      if (authorities.some((authority) => authority.authority === "ADMIN") || authorities.some((authority) => authority.authority === "STAFF")) {
        navigate("/admin");
      } else if (authorities.some((authority) => authority.authority === "USER")) {
        navigate("/shoes");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchGoogleRedirectUri = async () => {
      try {
        const response = await axios.get('http://localhost:33321/api/oauth/googleRedirectUri');
        setGoogleRedirectUri('http://localhost:33321/api/oauth2/authorize/google?redirect_uri=' + response.data);
      } catch (error) {
        console.error('Error fetching Google Redirect URI:', error);
      }
    };

    fetchGoogleRedirectUri();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:33321/api/oauth/login", {
        username,
        password,
        rememberMe: rememberMe === "on",
      });

      const { id, token, authorities, userId } = response.data;

      login({ id, token, authorities, userId }); // Lưu ID, token và vai trò người dùng vào Context
      console.log(token);
      toast.success("Đăng nhập thành công!");

      // Kiểm tra vai trò người dùng và chuyển hướng đến trang tương ứng
      if (authorities.some((authority) => authority.authority === "ADMIN") || authorities.some((authority) => authority.authority === "STAFF")) {
        navigate("/admin");
      } else if (authorities.some((authority) => authority.authority === "USER")) {
        navigate("/shoes");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Response data:", error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Đăng nhập với</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href={googleRedirectUri}

              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Hoặc đăng nhập với thông tin người dùng</small>
            </div>
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  onChange={(e) => setRememberMe(e.target.value)}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">

            <small className="text-light" onClick={toggle} style={{ cursor: "pointer" }}>Quên mật khẩu?</small>

          </Col>
          <Col className="text-right" xs="6">
            <Link className="text-light" to="/register" tag={Link}>
              <small>Tạo tài khoản mới</small>
            </Link>
          </Col>
        </Row>
      </Col>
      <ToastContainer />

      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
        style={{ maxWidth: '430px' }}
      >
        <ModalHeader toggle={toggle}>
          <h3 className="heading-small text-dark mb-0">Đặt lại mật khẩu</h3>
        </ModalHeader>
        <ModalBody>
          <ForgotPass />
        </ModalBody >
        <ModalFooter>
          <Button color="danger" outline onClick={toggle} size="sm">
            Đóng
          </Button>
        </ModalFooter>
      </Modal >
    </>
  );
};

export default Login;