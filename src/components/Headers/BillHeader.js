import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-light pb-8 pt-5 pt-md-8">
        {/* <Container fluid>
          <div className="header-body">
           
            <Card className="card-stats mb-xl-0 shadow ">
            <CardHeader className="bg-transparent">
                <h3 className="mb-0">Đơn hàng cần xử lý</h3>
            </CardHeader>
              <Row className="m-2 p-2">
                <Col lg="6" xl="3">
                  <div className="col"> 
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-3">
                      Chờ thanh toán
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      0
                    </span>
                  </div>
                </Col>
                <Col lg="6" xl="3">
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-3">
                      Đang giao
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      0
                    </span>
                  </div>
                </Col>
                <Col lg="6" xl="3">
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-3">
                      Đã giao
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      0
                    </span>
                  </div>
                </Col>
                <Col lg="6" xl="3">
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-3">
                      Đã hủy
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      0
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </Container> */}
      </div>
    </>
  );
};

export default Header;
