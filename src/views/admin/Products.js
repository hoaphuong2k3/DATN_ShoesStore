import { React, useState, Link } from "react";

// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row,
  Col, FormGroup, Label, Input, Button, Table, CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Form
} from "reactstrap";
import Switch from 'react-input-switch';
import Header from "components/Headers/Header.js";


const Products = () => {
  const [value, setValue] = useState('no');
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
                    {/* <Link className="btn btn-primary my-2" to={"/admin/product/add"}>
                      Thêm
                    </Link> */}
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
                <Row className="text-center mb-1">
                  <Col lg="6" xl="12">
                    <FormGroup tag="fieldset">
                      <Row>
                        <Col lg="6" xl="4">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                            />
                            {' '}<span className="form-control-label mr--9">Tất cả</span>
                          </FormGroup>
                        </Col>
                        <Col lg="6" xl="3">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                            />
                            {' '}
                            <span className="form-control-label">Hoạt động</span>
                          </FormGroup>
                        </Col>
                        <Col lg="6" xl="3">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                            />
                            {' '}<span className="form-control-label">Ngừng hoạt động</span>
                          </FormGroup>
                        </Col>
                      </Row>

                    </FormGroup>
                  </Col>
                </Row>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Mã
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Người tạo
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="find_createdAt"
                            name="name"
                            placeholder=""
                          />

                        </FormGroup>
                      </Col>
                      <Col lg="6" xl="6">
                        <FormGroup>
                          <Label for="find_createdDate" className="form-control-label">
                            Ngày tạo:
                          </Label>
                          <Row>
                            <Col xl={6}>
                              <Input
                                className="form-control-alternative"
                                id="find_createdDate"
                                name="date"
                                placeholder="date placeholder"
                                type="date"
                              />
                            </Col>
                            <Col xl={6}>
                              <Input
                                className="form-control-alternative"
                                id="find_createdDate"
                                name="date"
                                placeholder="date placeholder"
                                type="date"
                              />

                            </Col>
                          </Row>

                        </FormGroup>
                      </Col>
                    </Row>
                    {value === 'yes' &&
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Hãng
                            </label>
                            <Input id="btn_select_tt"
                              name="select" type="select" >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Thiết kế
                            </label>
                            <Input id="btn_select_tt" name="select" type="select" >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Loại da
                            </label>
                            <Input id="btn_select_tt" name="select" type="select" >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>

                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Đế giày
                            </label>
                            <Input id="btn_select_tt" name="select" type="select" >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Lót giày
                            </label>
                            <Input id="btn_select_tt" name="select" type="select" >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Size
                            </label>
                            <Input id="btn_select_tt" name="select" type="select">
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Màu
                            </label>
                            <Input id="btn_select_tt" name="select" type="select"  >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6" xl="6">
                          <FormGroup>
                            <Label for="find_code" className="form-control-label">
                              Số lượng:
                            </Label>
                            <Row>
                              <Col xl={5}>
                                <Input

                                  id="find_code"
                                  name="code"
                                  placeholder=" "
                                />
                              </Col>
                              <Label for="find_code" xl={1} className="form-control-label">
                                <i class="fa-solid fa-arrow-right"></i>
                              </Label>
                              <Col xl={5}>
                                <Input

                                  id="find_code"
                                  name="code"
                                  placeholder=" "
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg="6" xl="6">
                          <FormGroup>
                            <Label for="find_code" className="form-control-label">
                              Giá:
                            </Label>
                            <Row>
                              <Col xl={5}>
                                <Input

                                  id="find_code"
                                  name="code"
                                  placeholder=" "
                                />
                              </Col>
                              <Label for="find_code" xl={2} className="form-control-label text-center">
                                <i class="fa-solid fa-arrow-right"></i>
                              </Label>
                              <Col xl={5}>
                                <Input

                                  id="find_code"
                                  name="code"
                                  placeholder=" "
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>


                      </Row>
                    }
                  </div>
                </Form>




                <Row className="mt-2">
                  <Col lg="6" xl="4" >
                    <span>
                      <Switch on="yes" off="no" value={value} onChange={setValue} />

                      <span>
                        &nbsp;&nbsp;
                        Tìm kiếm nâng cao
                        &nbsp;&nbsp;
                      </span>
                    </span>
                  </Col>
                  <Col lg="6" xl="8">
                    <Button color="warning" >
                      <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                      Tìm kiếm
                    </Button>
                    <Button color="primary" >
                      Làm mới bộ lọc
                    </Button>
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