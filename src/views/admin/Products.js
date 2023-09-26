import React from "react";

// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row,
  Col, FormGroup, Label, Input, Button, Table, CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Form
} from "reactstrap";
import Header from "components/Headers/Header.js";


const Products = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mb-4">
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

        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card>
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      <h3>Tìm kiếm</h3>
                    </CardTitle>

                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
                </Row>
                {/* start row find  productAttrinutes*/}
                <Row className="text-center mb-4">
                  <Col lg="6" xl="12">
                    <FormGroup tag="fieldset">
                      <Row>
                        <Col lg="6" xl="4">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                            />
                            {' '}Tất cả
                          </FormGroup>
                        </Col>
                        <Col lg="6" xl="4">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                            />
                            {' '}Hoạt động
                          </FormGroup>
                        </Col>
                        <Col lg="6" xl="4">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                            />
                            {' '}Ngừng hoạt động
                          </FormGroup>
                        </Col>
                      </Row>

                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_code" xl={3}>
                        Mã:
                      </Label>
                      <Col xl={9}>
                        <Input
                          id="find_code"
                          name="code"
                          placeholder=" "
                        />
                      </Col>

                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_name" xl={3}>
                        Tên SP:
                      </Label>
                      <Col xl={9}>
                        <Input
                          id="find_name"
                          name="name"
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_createdAt" xl={3}>
                        Người tạo:
                      </Label>
                      <Col xl={9}>
                        <Input
                          id="find_createdAt"
                          name="name"
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_createdDate" xl={3}>
                        Người tạo:
                      </Label>
                      <Col xl={4}>
                        <Input
                          id="find_createdDate"
                          name="date"
                          placeholder="date placeholder"
                          type="date"
                        />
                      </Col>
                      <Col xl={5}>
                        <Input
                          id="find_createdDate"
                          name="date"
                          placeholder="date placeholder"
                          type="date"
                        />
                      </Col>

                    </FormGroup>
                  </Col>
                  <Col className="text-center" lg="6" xl="12" >
                    <td >
                      <Form>
                        <FormGroup switch>
                          <Input type="switch" role="switch" />
                          <Label check>Default switch checkbox input</Label>
                        </FormGroup>
                      </Form>
                      <Button color="warning" >
                        <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                        Tìm kiếm
                      </Button>
                      <Button color="primary" >
                        Làm mới bộ lọc
                      </Button>
                    </td>
                  </Col>
                </Row>

                {/* end row find  productAttrinutes*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col lg="6" xl="12">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      <h3> DANH SÁCH</h3>

                    </CardTitle>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
                </Row>
                {/*  */}

                <Table bordered dark hover responsive striped>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã</th>
                      <th>Tên</th>
                      <th className="text-center pb-4" >
                        <FormGroup check>
                          <Input type="checkbox" />
                        </FormGroup>

                      </th>
                      <th colSpan={2}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {listCategory.length <= 0 &&
                      <th className="text-center" colSpan={6}>
                        Không có dữ liệu
                      </th>
                    }
                    {listCategory && listCategory.length > 0 &&
                      listCategory.map((item, index) => {
                        return (
                          <tr key={item.id} >
                            <th scope="row"> {index + 1}</th>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td className="text-center">
                              <FormGroup check>
                                <Input type="checkbox" />
                              </FormGroup>
                            </td>
                            <td>
                              <Button color="danger" onClick={() => handleEditBrands(item)}>
                                <i class="fa-solid fa-pen" />
                              </Button>
                              <Button color="warning" onClick={() => handleDeleteBrands(item)}>
                                <i class="fa-solid fa-trash" />
                              </Button>
                            </td>
                          </tr>
                        )

                      })
                    } */}

                  </tbody>
                </Table>


                {/*  */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default Products;