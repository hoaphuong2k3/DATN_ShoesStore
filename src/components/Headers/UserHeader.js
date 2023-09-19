
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "800px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/bannerShoes2.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
       
        {/* Header container */}
        <Container className="d-flex align-items-center">
          <Row >
            <Col lg="10" md="10">
            <p className="text-white">XU HƯỚNG MỚI</p>
              <h1 className="display-1 text-white">Shoes Store 2023</h1>
              <h4 className="text-white">Làm thế nào để trở thành một quý ông?</h4>
              <p className="text-white mt-0 mb-5">
              Ấn tượng, lịch lãm đầy nam tính cùng với những đôi giày da 2023 của Shoes Store.
              </p>
              <Button
                color="info"
                href="#"
                onClick={(e) => e.preventDefault()}
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
