import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
  Col,
} from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "services/AuthContext.js";
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

const Register = () => {
  let navigate = useNavigate();
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

  const [user, setUser] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    fullname: yup.string().required('Vui lòng nhập họ và tên'),
    phoneNumber: yup.string().matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số điện thoại'),
    email: yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập địa chỉ email'),
    username: yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(20, 'Mật khẩu không được quá 20 ký tự')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,20}$/,
        'Mật khẩu từ 8-20 ký tự, phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, và 1 ký tự đặc biệt')
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp').required('Vui lòng xác nhận mật khẩu'),
  });

  const validateInput = async () => {
    try {
      await schema.validate(user, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (await validateInput()) {
      try {
        const response = await axios.post("http://localhost:33321/api/user/register", user);
        toast.success("Đăng ký thành công");
        navigate("/");
        console.log(response.data);
      } catch (error) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Vui lòng kiểm tra lại thông tin đăng ký");
    }
  };

  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [showRessPass, setRessShowPass] = useState(true);
  const toggleRessPassword = () => {
    setRessShowPass((prev) => !prev);
  };

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-4">
            <small>Đăng ký với</small>
          </div>
          <div className="text-center">
            <Button className="btn-neutral btn-icon mr-4" color="default" href="#" onClick={(e) => e.preventDefault()}>
              <span className="btn-inner--icon">
                <img alt="..." src={require("../../assets/img/icons/common/github.svg").default} />
              </span>
              <span className="btn-inner--text">Github</span>
            </Button>
            <Button className="btn-neutral btn-icon" color="default" href={googleRedirectUri}>
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
                  type="text" name="fullname"
                  onChange={onInputChange}
                  className={errors.fullname ? "is-invalid" : ""}
                />
                {errors.fullname && <div className="invalid-feedback ml-3">{errors.fullname}</div>}
              </InputGroup>

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
                  type="tel" name="phoneNumber"
                  onChange={onInputChange}
                  className={errors.phoneNumber ? "is-invalid" : ""}
                />
                {errors.phoneNumber && <div className="invalid-feedback ml-3">{errors.phoneNumber}</div>}
              </InputGroup>
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
                  type="email" name="email"
                  onChange={onInputChange}
                  className={errors.email ? "is-invalid" : ""}
                />
                {errors.email && <div className="invalid-feedback ml-3">{errors.email}</div>}
              </InputGroup>
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
                  type="text" name="username"
                  onChange={onInputChange}
                  className={errors.username ? "is-invalid" : ""}
                />
                {errors.username && <div className="invalid-feedback ml-3">{errors.username}</div>}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Password"
                  type={showPassword ? "password" : "text"}
                  name="password" onChange={onInputChange}
                  className={errors.password ? "is-invalid" : ""}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    style={{ cursor: "pointer" }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroupText>
                </InputGroupAddon>
                {errors.password && <div className="invalid-feedback ml-3 mr-4">{errors.password}</div>}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-key-25" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Confirm Password"
                  type={showRessPass ? "password" : "text"}
                  name="confirmPassword" onChange={onInputChange}
                  className={errors.confirmPassword ? "is-invalid" : ""}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    style={{ cursor: "pointer" }}
                    onClick={toggleRessPassword}
                  >
                    {showRessPass ? <FaEyeSlash /> : <FaEye />}
                  </InputGroupText>
                </InputGroupAddon>
                {errors.confirmPassword && <div className="invalid-feedback ml-3">{errors.confirmPassword}</div>}
              </InputGroup>
            </FormGroup>

            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit">
                Đăng ký
              </Button>
            </div>
            <ToastContainer />
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
