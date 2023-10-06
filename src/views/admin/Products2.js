import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllShoes } from "services/Product2Service";
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


const Products2 = () => {
  //btn Tìm kiếm nâng cao
  const [value, setValue] = useState('no');
  const [listShoes, setListShoes] = useState([]);
  const [listBrand,setListBrand] = useState([]);
  const [search, setSearch] = useState({
    code: "",
    name: "",
    brandId: null,
    originId: null,
    designStyleId: null,
    skinTypeId: null,
    soleId: null,
    liningId: null,
    toeId: null,
    cushionId: null,
    fromPrice: null,
    toPrice: null,
    fromQuantity: null,
    toQuantity: null,
    fromDateStr: "",
    toDateStr: "",
    createdBy: ""
  });

  useEffect(() => {
    getAll(0, 10);
    getBrand();
  }, []);

  const getBrand = async () => {
    let res = await getAll(); 
    if (res && res.data) {    
      const data = res.data;
      const list = Object.keys(data).map((key) => ({

        id: data[key].id,
        code: data[key].code,
        name: data[key].name,
      }));
      setListBrand(list);
      console.log("checkk:",listBrand);
    }
  }

  //getAll
  const getAll = async (page, size) => {
    let res = await getAllShoes(page, size, search);
    if (res && res.data && res.data.content) {
      setListShoes(res.data.content);
      // setListShoes
      // setTotalUsers(res.total);
      // setTotalPages(res.total_pages);
      // setlistUsers(res.data);
    }
    console.log(">>> check res: ", listShoes);
  }


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mb-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col-2">
                    <h3 className="mb-0">Sản phẩm</h3>
                  </div>
                  <div className="col-10 text-right">
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                      to="/admin/product2/add" tag={Link}
                    >
                      Thêm mới
                    </Button>
                    <Button
                      className="btn btn-outline-primary"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Tải mẫu
                    </Button>

                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Nhập Excel
                    </Button>
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Xuất Excel
                    </Button>
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Xuất PDF
                    </Button>
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Báo cáo
                    </Button>
                  </div>
                </Row>

              </CardHeader>
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
                              Xuất xứ
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
                              htmlFor="input-first-name"
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
                              htmlFor="input-last-name"
                            >
                              Mũi giày
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
                              Đế giày
                            </label>
                            <Input id="btn_select_tt" name="select" type="select" >
                              <option value="loaisp">
                                sfdsfsf
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
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

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Đệm giày
                            </label>
                            <Input id="btn_select_tt" name="select" type="select" >
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
                              <Label for="find_code" xl={1} className="form-control-label text-center">
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
                      <th className="text-center pb-4" >
                        <FormGroup check>
                          <Input type="checkbox" />
                        </FormGroup>

                      </th>
                      <th>STT</th>
                      <th>Mã</th>
                      <th>Tên</th>
                      <th>Hãng</th>
                      <th>Xuất xứ</th>
                      <th>Thiết kế</th>
                      <th>Loại da</th>
                      <th>Mũi giày</th>
                      <th>Đế giày</th>
                      <th>Lót giày</th>
                      <th>Đệm giày</th>
                      <th>Số lượng</th>
                      <th>Số CTSP</th>
                      <th>Giá Min</th>
                      <th>Giá Max</th>

                      <th colSpan={2}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listShoes.length <= 0 &&
                      <th className="text-center" colSpan={17}>
                        Không có dữ liệu
                      </th>
                    }

                    {listShoes && listShoes.length > 0 &&
                      listShoes.map((item, index) => {
                        return (
                          <tr key={item.id} >
                            <td className="text-center">
                              <FormGroup check>
                                <Input type="checkbox" />
                              </FormGroup>
                            </td>
                            <th scope="row"> {index + 1}</th>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.origin}</td>
                            <td>{item.designStyle}</td>
                            <td>{item.skinType}</td>
                            <td>{item.toe}</td>
                            <td>{item.sole}</td>
                            <td>{item.lining}</td>
                            <td>{item.cushion}</td>
                            <td>{item.priceMin}</td>
                            <td>{item.priceMax}</td>
                            <td>{item.totalQuantity}</td>
                            <td>{item.totalRecord}</td>
                            <td>
                              <Button color="danger" >
                                <i class="fa-solid fa-pen" />
                              </Button>
                              <Button color="warning" >
                                <i class="fa-solid fa-trash" />
                              </Button>
                            </td>
                          </tr>
                        )

                      })
                    }

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

export default Products2;