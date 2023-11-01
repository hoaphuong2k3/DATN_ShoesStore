import { useState } from "react";
import { NavLink as Link } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  RiHome4Line,
  RiTeamLine,
  RiSwapBoxLine,
  RiExchangeFundsLine,
  RiFolder2Line,
  RiFolderUserLine,
  RiPriceTag3Line,
  RiPriceTag2Line,
  RiStackLine,
  RiLineChartFill,
} from "react-icons/ri";
import {
  SubMenu,
  Menu,
  MenuItem,
} from "react-pro-sidebar";



const Sidebar1 = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const { logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }


  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />

          </NavbarBrand>
        ) : null}

        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          {/* Navigation */}
          <Nav navbar >
            <Menu style={{ fontSize: 15, color: "black" }}>
              <MenuItem icon={<RiHome4Line />}>
                <NavLink to="/admin/index" tag={Link} style={{ fontSize: 15, color: "black" }}>Tổng quan</NavLink>
              </MenuItem>
              <SubMenu
                defaultOpen={false}
                label={"Quản lý giao dịch"}
                icon={<RiSwapBoxLine />}
              >
                <MenuItem icon={<RiExchangeFundsLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/direct-sales" tag={Link}>Bán hàng</NavLink></MenuItem>
                <MenuItem icon={<RiExchangeFundsLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/bills" tag={Link}>Hóa đơn</NavLink></MenuItem>
                <MenuItem icon={<RiExchangeFundsLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/delivery" tag={Link}>Phiếu giao hàng</NavLink></MenuItem>
              </SubMenu>
              <SubMenu
                defaultOpen={false}
                label={"Quản lý sản phẩm"}
                icon={<RiFolder2Line />}
              >
                <MenuItem icon={<RiStackLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/product" tag={Link}>Sản phẩm</NavLink></MenuItem>
                <MenuItem icon={<RiStackLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/product-attributes" tag={Link}>Thuộc tính</NavLink></MenuItem>
                <MenuItem icon={<RiStackLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/product" tag={Link}>Thư viện hình ảnh</NavLink></MenuItem>
              </SubMenu>
              <SubMenu
                defaultOpen={false}
                label={"Quản lý tài khoản"}
                icon={<RiTeamLine />}
              >
                <MenuItem icon={<RiFolderUserLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/staff" tag={Link}>Nhân viên</NavLink></MenuItem>
                <MenuItem icon={<RiFolderUserLine />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/client" tag={Link}>Khách hàng</NavLink></MenuItem>
              </SubMenu>
              <SubMenu
                defaultOpen={false}
                label={"Quản lý khuyến mại"}
                icon={<RiPriceTag2Line />}
              >

                <MenuItem icon={<RiPriceTag3Line />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/promotion" tag={Link}>Đợt giảm giá</NavLink></MenuItem>
                <MenuItem icon={<RiPriceTag3Line />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/discount" tag={Link}>Phiếu giảm giá</NavLink></MenuItem>
              </SubMenu>
              <MenuItem icon={<RiLineChartFill />}><NavLink style={{ fontSize: 15, color: "black" }} to="/admin/statistics" tag={Link}>Thống kê</NavLink></MenuItem>
            </Menu>
          </Nav>

        </Collapse>
      </Container>
    </Navbar>
  );
};


export default Sidebar1;
