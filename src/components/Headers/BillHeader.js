import { Card, CardBody, CardTitle, Container, Row, Col,CardHeader } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="12">
                <Card className="card-stats mb-4 mb-xl-0 shadow">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardHeader>
                        <h3 className="">Hóa đơn</h3>
                        </CardHeader>
                      
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Traffic
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                         0
                        </span>
                      </div>
                      <Col className="col-auto">
                        {/* <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div> */}
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 0%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
