import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "services/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
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
  ModalHeader,
} from "reactstrap";

import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [authenticationSuccessful, setAuthenticationSuccessful] =
    useState(false);

  useEffect(() => {
    if (initialized) {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");

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
      const response = await axios.post(
        "http://localhost:33321/api/oauth/oauth/google",
        null,
        {
          params: {
            code: code,
          },
        }
      );

      const { id, token, authorities, userId } = response.data;

      login({ id, token, authorities, userId });

      toast.success("Đăng nhập thành công!");

      if (
        authorities.some((authority) => authority.authority === "ROLE_ADMIN") ||
        authorities.some((authority) => authority.authority === "ROLE_STAFF")
      ) {
        navigate("/admin");
      } else if (
        authorities.some((authority) => authority.authority === "ROLE_USER")
      ) {
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
        const response = await axios.get(
          "http://localhost:33321/api/oauth/googleRedirectUri"
        );
        setGoogleRedirectUri(
          "http://localhost:33321/api/oauth2/authorize/google?redirect_uri=" +
            response.data
        );
      } catch (error) {
        console.error("Error fetching Google Redirect URI:", error);
      }
    };

    fetchGoogleRedirectUri();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:33321/api/oauth/login",
        {
          username,
          password,
          rememberMe: rememberMe === "on",
        }
      );

      const { id, token, authorities, userId } = response.data;

      login({ id, token, authorities, userId }); 
      toast.success("Đăng nhập thành công!");

      // Kiểm tra vai trò người dùng và chuyển hướng đến trang tương ứng
      if (
        authorities.some((authority) => authority.authority === "ROLE_ADMIN") ||
        authorities.some((authority) => authority.authority === "ROLE_STAFF")
      ) {
        navigate("/admin");
      } else if (
        authorities.some((authority) => authority.authority === "ROLE_USER")
      ) {
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

  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Col className="">
        <style>
          {`
                    .evo-button {
                      position: relative;
                      display: inline-block;
                      padding: 14px 28px;
                      line-height: normal;
                      border: 1px solid #1c1c1c;
                      text-transform: uppercase;
                      font-size: 11px;
                      text-align: center;
                      letter-spacing: 1.5px;
                      font-weight: 400;
                      font-style: normal;
                      background-color: #000; /* Màu nền trắng */
                      -webkit-transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
                        border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                      transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
                        border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                      z-index: 1;
                      -webkit-tap-highlight-color: initial;
                      color: #fff; /* Màu chữ đen */
                    }
                    
                    .evo-button:hover {
                      background-color: #fff; /* Màu nền đen khi hover */
                      color: #000; /* Màu chữ trắng khi hover */
                      border: 1px solid #1c1c1c;
                    }
                  `}
        </style>
        
        <Row className="" style={{ backgroundColor: "#47270F" }}>
          {/* image */}
          <Col
            lg="6"
            className="bg-light"
            style={{
              backgroundImage:
                "url('https://laforce.vn/wp-content/uploads/2018/10/ban-giay-tay-nam-oxford-ha-noi.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              height: "auto",
            }}
          ></Col>

          {/* Login */}
          <Col lg="6" className="px-lg-6 py-lg-4">
            <div className="text-center">
            <img              
              alt="..."
              src={require("../../assets/img/brand/Leather_Gent.png")}
               style={{ width: '223px',margin: "auto", display: "block" }}
            />
            </div>
            
            {/* <Card > */}
            <CardHeader className="bg-transparent">
              <div className="text-light text-center mt-2 mb-3">
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
            <CardBody className="px-lg-5 py-lg-4">
              <div className="text-center text-light mb-4">
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
                      type={showPassword ? "password" : "text"}
                      autoComplete="new-password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroupText>
                    </InputGroupAddon>
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
                    <span className="text-light">Remember me</span>
                  </label>
                </div>

                <div className="text-center">
                  <Button
                    className="mt-3 mb-2 evo-button mobile-viewmore"
                    type="submit"
                  >
                    Đăng nhập
                  </Button>
                </div>
              </Form>
            </CardBody>
            {/* </Card> */}

            <Row className="mt-3">
              <Col xs="6">
                <small
                  className="text-light"
                  onClick={toggle}
                  style={{ cursor: "pointer" }}
                >
                  Quên mật khẩu?
                </small>
              </Col>
              <Col className="text-right" xs="6">
                <Link className="text-light" to="/register" tag={Link}>
                  <small>Tạo tài khoản mới</small>
                </Link>
              </Col>
            </Row>

          </Col>
        </Row>
      </Col>
      <ToastContainer />

      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={"static"}
        keyboard={false}
        style={{ maxWidth: "430px" }}
      >
        <ModalHeader toggle={toggle}>
          <h3 className="heading-small text-dark mb-0">Đặt lại mật khẩu</h3>
        </ModalHeader>
        <ModalBody>
          <ForgotPass />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={toggle} size="sm">
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Login;
