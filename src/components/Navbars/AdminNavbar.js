import { useAuth } from "services/AuthContext.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Input,
} from "reactstrap";

const AdminNavbar = (props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:33321/api/staff/detail/${storedUserId}`
        );
        setUsername(response.data.data.username);
        setAvatar(response.data.data.avatar);
        console.log(response.data.data.username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, []);

  const imageStyle = {
    width: "120px",
    height: "43px",
    borderRadius: "20%",
  };

  return (
    <>
      <Navbar
        className="navbar-top"
        expand="md"
        id="navbar-main"
        style={{ background: "#fff" }}
      >
        <Container fluid>
          <Nav
            className="align-items-center d-none d-md-flex  ml-lg-auto"
            navbar
          >
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      src={`data:image/jpeg;base64,${avatar}`}
                      alt="Avatar"
                      style={imageStyle}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    {username && (
                      <span className="mb-0 text-sm font-weight-bold">
                        {username}
                      </span>
                    )}
                  </Media>
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
                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
