import React from "react";

// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row,
  Col, FormGroup, Label, Input, Button, Table, CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Header from "components/Headers/Header.js";


const Products = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Sản phẩm</h3>

              </CardHeader>
              <CardBody>
                <Row className="text-center">
                  <Col lg="6" xl="2">
                    <Button color="primary" >
                      Thêm
                    </Button>
                  </Col>
                  <Col lg="6" xl="2">
                    <Button color="primary" >
                      Tải mẫu
                    </Button>
                  </Col>
                  <Col lg="6" xl="2">
                    <Button color="primary" >
                      Nhập Excel
                    </Button>
                  </Col>
                  <Col lg="6" xl="2">
                    <Button color="primary" >
                      Xuất Excel
                    </Button>
                  </Col>
                  <Col lg="6" xl="2">
                    <Button color="primary" >
                      Xuất PDF
                    </Button>
                  </Col>
                  <Col lg="6" xl="2">
                    <Button color="primary" >
                      Báo cáo
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>

        <Row>

        </Row>
      </Container>
    </>
  );
};

export default Products;
