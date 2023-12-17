import { Row, Col, Nav, NavItem, NavLink, Container, Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
      <div
        className="shadow mt-5"
        style={{ backgroundColor: "#0f1820", color: "white" }}
      >
        <style>
          {`
               .logo-footer {
                padding-top: 12px;
                padding-bottom: 28px;
                }
                
                .logo-footer img {
                    
                    vertical-align: middle;
                }
                .text-f-wrapper p {
                    color: var(--color-500);
                    max-width: 440px;
                    font-size: 0.9rem;
                }
                .

                .full-f-wrapper {
                    flex: 0 0 100%;
                    border-top: var(--border-thin);
                    padding-top: 28px;
                }
                .credit-f-wrapper {
                    color: var(--color-700);
                    font-weight: 500;
                    font-size: 0.9rem;
                    margin: 0;
                }
               `}
        </style>
        <Container style={{ color: "white" }}>
          <div className="row">
            <div class="left-f-wrapper col-md-6">
              <div class="logo-footer mt-5">
                {" "}
                <a href="/shoes/home" itemprop="url" aria-label="ShoesStore">
                  {" "}
                  <img
              alt="..."
              src={require("../../assets/img/brand/LeatherGent.png")}
              width={120} style={{height:70}}
            />
                </a>
              </div>
              <div className="text-f-wrapper">
                {" "}
                <p>
                ShoesStore không ngừng sáng tạo để khẳng định thương hiệu trong thế giới đồ da. 
                Sứ mệnh của chúng tôi là tạo ra những sản phẩm đạt tiêu chuẩn chất lượng cao 
                và phổ cập đồ da đến với đông đảo người tiêu dùng Việt Nam.&nbsp;
                </p>{" "}
                <p>&nbsp;</p>{" "}
                
              </div>
              <Nav className="mt-3 mb-5" style={{ fontWeight: "600" }}>
                <NavItem>
                  <NavLink to="/shoes/home" tag={Link}>TRANG CHỦ</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/shoes/product"
                  tag={Link}>SẢN PHẨM</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/shoes/introduce"
                  tag={Link}>GIỚI THIỆU</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/shoes/contact"
                  tag={Link}>LIÊN HỆ</NavLink>
                </NavItem>
              </Nav>
            </div>
            <Navbar
              className=" col-md-6 "
              style={{
                paddingTop: "70px",
                marginBottom: "50px",
                color: "white",
              }}
            >
              <Nav className="right-f-wrapper ">
                <NavItem className="mr-4 ml-3 small">
                  <h5 className="wp-block-heading text-light">Chính sách</h5>
                  <NavItem>
                    <NavLink href="#">
                    Chính sách bảo mật
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                    Đổi trả và bảo hành
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                    Chính sách vận chuyển
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                    Hướng dẫn mua hàng
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                    Hướng dẫn thanh toán
                    </NavLink>
                  </NavItem>
                
                </NavItem>

                <NavItem className="mr-5 ml-2 small">
                  <h5 className="wp-block-heading text-light">Hệ thống cửa hàng</h5>
                  <NavItem>
                    <NavLink href="#">
                      Hà Nội
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      Đà Nẵng
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      Thanh Hóa
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      Tp.HCM
                    </NavLink>
                  </NavItem>
                </NavItem>

                <NavItem className="ml-4 small">
                  <h5 className="wp-block-heading text-light">Kết nối với chúng tôi</h5>
                  <style>
                    {`
                      
                      `}
                  </style>
                  <NavItem>
                    <NavLink href="h#"><FaFacebook className="mr-2"/>Facebook</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      data-type="URL"
                      data-id="#"
                    >
                      <FaTwitter className="mr-2"/> 
                      Twitter
                    </NavLink>
                  </NavItem>
                  
                  <NavItem>
                    <NavLink
                      href="#"
                      data-type="URL"
                      data-id="#"
                    >
                      <FaYoutube className="mr-2"/>
                      Youtube
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      data-type="URL"
                      
                    >
                      <FaInstagram className="mr-2"/>
                      Instagram
                    </NavLink>
                  </NavItem>
                </NavItem>
              </Nav>
            </Navbar>
            <hr />
            <div className="full-f-wrapper m-auto">
              <div className="credit-f-wrapper">
                {" "}
                <p className="small ">
                © {new Date().getFullYear()} ShoesStore - All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
