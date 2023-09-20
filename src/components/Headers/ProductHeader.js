
import {Container, Row, Col } from "reactstrap";

const ProductHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "350px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/bannerShoes7.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
       
        {/* Header container */}
        <Container className="d-flex align-items-center">
          <Row >
            <Col lg="10" md="10">
            
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductHeader;
