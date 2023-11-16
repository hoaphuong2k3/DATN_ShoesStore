import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "800px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/bannerShoes1.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "right top",
        }}
      >
       
        {/* Header container */}
        <Container fluid className="">
          <Row className="justify-content-end float-right">
            <Col lg="10" md="10">
            <p className="text-white">XU HƯỚNG MỚI</p>
              <h1 className="display-1 text-white">Leather Gent 2023</h1>
              <h4 className="text-white">Làm thế nào để trở thành một quý ông?</h4>
              <p className="text-white mt-0 mb-5">
              Ấn tượng, lịch lãm đầy nam tính cùng với những đôi giày da 2023 của Leather Gent.
              </p>
              <Button
                color="info"
                to="/shoes/product" tag={Link}
              >
                Xem ngay
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
