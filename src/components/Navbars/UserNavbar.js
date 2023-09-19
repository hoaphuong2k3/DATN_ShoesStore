
import { Link } from "react-router-dom";
// reactstrap components
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
  Form, FormGroup
} from "reactstrap";

const UserNavbar = () => {
  return (
    <>
      <Navbar className="navbar navbar-horizontal fixed-top navbar-dark" expand="md" color-on-scroll="300">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("../../assets/img/brand/argon-react-white.png")}
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
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">TRANG CHỦ</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">SẢN PHẨM</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">GIỚI THIỆU</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">LIÊN HỆ</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">TIN TỨC</span>
                </NavLink>
              </NavItem>
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

              <UncontrolledDropdown>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow">
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Tài khoản</span>
                  </DropdownItem>
                  <DropdownItem to="/" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Yêu thích</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="ni ni-user-run" />
                    <span>Đăng xuất</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
