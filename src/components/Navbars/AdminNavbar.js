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

  const [userData, setUserData] = useState(null);
  const storedUserId = localStorage.getItem("userId");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:33321/api/staff/detail/${storedUserId}`
      );
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storedUserId]);
  // Avatar

  const [file, setFile] = useState(null);
  const imageUrl = file ? URL.createObjectURL(file) : null;
  const [formData, setFormData] = useState({
    username: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchAvt = async () => {
      // setFormData({
      //   username: userData.username,

      // })
      // if(userData.avatar){
      //   const blob = await fetch(`data:image/jpeg;base64,${userData.avatar}`).then((res) => res.blob());
      //   const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      //   setFile(file);
      //   setFormData({
      //     ...formData,
      //     avatar: URL.createObjectURL(file)
      //   });
      // }

    }

    fetchAvt();
    
  }, [userData]);

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
                    {imageUrl && <img src={imageUrl} alt="avatar"/>}
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {/* {userData.username} */}
                    </span>
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
