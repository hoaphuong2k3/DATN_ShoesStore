import { Link } from "react-router-dom";
import { useAuth } from "services/AuthContext.js";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// reactstrap components
import "assets/css/navbar.css";
import "assets/css/cartModal.css";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  DropdownToggle,
  Media,
  DropdownItem,
  UncontrolledDropdown,
  DropdownMenu,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import axiosInstance from "services/custommize-axios";

const UserNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/user/${storedUserId}`);
        setUsername(response.data.username);
        setAvatar(response.data.avatar);
        setGender(response.data.gender);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, []);

  const imageStyle = {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
  };
  const getDefaultAvatar = (gender, avatar) => {
    if (avatar) {
      return `data:image/jpeg;base64,${avatar}`;
    } else if (gender === false) {
      // Nữ
      return "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTu-uhxThn7kpatyW-egV5DpMNflanGQ_oeqUqmgEMx7KUkhyzF";
    } else if (gender === true) {
      // Nam
      return "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSbAVI8wgtBGopfLggnV-HvwW-_NYYvGxwAGRUBdHKwdSoPRjEX";
    } else {
      // Null
      return "https://thumbs.dreamstime.com/b/default-businessman-avatar-icon-vector-business-people-profile-concept-279597784.jpg";
    }
  };

  const storedUserId = localStorage.getItem("userId");
  const [cartData, setCartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:33321/api/cart/${storedUserId}`
      );
      const data = await response.json();
      setCartData(data.content);

      console.log(storedUserId);
      console.log(data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storedUserId]);

  return (
    <>
      <Navbar
        className="navbar fixednavbar navbar-horizontal fixed-top navbar-dark"
        expand="md"
        color-on-scroll="300"
      >
        <Container className="px-4" style={{ maxWidth: "1240px" }}>
          <NavbarBrand to="/shoes/home" tag={Link}>
            <img
              alt="..."
              src={require("../../assets/img/brand/Leather_Gent.png")}
              width={130} style={{height:50}}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/argon-react.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/shoes/home" tag={Link}>
                  <span className="nav-link-inner-text">TRANG CHỦ</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/shoes/product"
                  tag={Link}
                >
                  <span className="nav-link-inner-text">SẢN PHẨM</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/shoes/introduce"
                  tag={Link}
                >
                  <span className="nav-link-inner-text">GIỚI THIỆU</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/shoes/contact"
                  tag={Link}
                >
                  <span className="nav-link-inner-text">LIÊN HỆ</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className="nav-link-icon" to="/shoes/news" tag={Link}>
                  <span className="nav-link-inner-text">TIN TỨC</span>
                </NavLink>
              </NavItem> */}
            </Nav>
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text" />
                  </InputGroup>
                </FormGroup>
              </Form>
              {storedUserId ?
                <>
                  <UncontrolledDropdown>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">

                        <span className="avatar avatar-sm rounded-circle">
                          <img
                            src={getDefaultAvatar(gender, avatar)}
                            alt="Avatar"
                            style={imageStyle}
                          />
                        </span>


                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow">
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      <DropdownItem to="/shoes/account" tag={Link}>
                        <i className="ni ni-single-02" />
                        <span>Tài khoản</span>
                      </DropdownItem>
                      <DropdownItem to="/shoes/bill" tag={Link}>
                        <i className="ni ni-single-02" />
                        <span>Đơn mua</span>
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        <i className="ni ni-favourite-28" />
                        <span>Yêu thích</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={handleLogout}>
                        <i className="ni ni-user-run" />
                        <span>Đăng xuất</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <div>
                    <Button
                      className="button-cart"
                      to="/shoes/cart"
                      tag={Link}
                      color="white"
                    >
                      <i className="ni ni-cart" />
                      <span className="cart-item-count">
                        {cartData ? cartData.length : 0}
                      </span>
                    </Button>
                  </div>
                </>
                :
                <>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/login" tag={Link}>
                      <span className="nav-link-inner--text">Đăng nhập</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/register" tag={Link}>
                      <span className="nav-link-inner--text">Đăng ký</span>
                    </NavLink>
                  </NavItem>

                </>
              }
            </Nav>
            <style>
              {`
                .btn i:not(:last-child), .btn svg:not(:last-child) {
                  margin-right: 0rem;
                }
                .button-cart {
                  position: relative;
                }
                
                .cart-item-count {
                  position: absolute;
                  top: 2px;
                  right: 1px;
                  width: 18px;
                  height: 22px;
                  text-align: center;
                  transform: translate(50%, -50%);
                  background-color: darkgreen;
                  color: white;
                  border-radius: 50%;
                  font-size: 14px;
              }
                `}
            </style>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
