import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, Modal } from "reactstrap";

import Header from "components/Headers/Header.js";


const Promotion = () => {

    const [category, setCategory] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col>
                        {/* Tabs with icons */}
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">

                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Khuyến mại</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                className="btn btn-outline-primary"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Thêm mới
                                            </Button>
                                            <Button
                                                className="btn btn-outline-primary"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Cập nhật
                                            </Button>

                                            <Button
                                                className="btn btn-outline-primary"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Reset
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="code"
                                                        >
                                                            Khuyến mại theo:
                                                        </label>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="type"
                                                                    type="radio"
                                                                    value="bills"
                                                                    checked={selectedOption === "bills"}
                                                                    onChange={handleRadioChange}
                                                                />Hóa đơn
                                                            </div>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="type"
                                                                    type="radio"
                                                                    value="products"
                                                                    checked={selectedOption === "products"}
                                                                    onChange={handleRadioChange}
                                                                />Sản phẩm
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="code"
                                                        >
                                                            Mã KM
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Code"
                                                            id="code"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="name"
                                                        >
                                                            Tên KM
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="name"
                                                            placeholder="Tên khuyến mại"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-price">
                                                            Hình thức giảm
                                                        </label>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="price"
                                                                    type="radio"
                                                                    value="persent"
                                                                    checked={selectedOption === "persent"}
                                                                    onChange={handleRadioChange}
                                                                />Phần trăm (%)
                                                            </div>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="price"
                                                                    type="radio"
                                                                    value="money"
                                                                    checked={selectedOption === "money"}
                                                                    onChange={handleRadioChange}
                                                                />Tiền
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                {selectedOption === "persent" && (
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="startDate"
                                                            >
                                                                Giảm giá:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="persent"
                                                                type="number"
                                                                placeholder="eg. 10%"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                )}

                                                {selectedOption === "money" && (
                                                    <Col lg="8" style={{ display: "flex" }}>
                                                        <FormGroup className="col" lg="6">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="startDate"
                                                            >
                                                                Giảm giá từ:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="min"
                                                                type="number"
                                                                placeholder="10000"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup className="col" lg="6">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="startDate"
                                                            >
                                                                Giảm giá đến:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="max"
                                                                type="number"
                                                                placeholder="100000"
                                                            />
                                                        </FormGroup>
                                                    </Col>



                                                )}


                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="startDate"
                                                        >
                                                            Ngày bắt đầu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="startDate"
                                                            type="date"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="endDate"
                                                        >
                                                            Ngày kết thúc
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="endDate"
                                                            type="date"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pl-lg-4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="description"
                                                        >
                                                            Mô tả
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Sản phẩm ....."
                                                            rows="4"
                                                            type="textarea"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                {selectedOption === "products" && (
                                                    <Col lg="12">
                                                    <h6 className="heading-small text-muted mb-4">
                                                      Sản phẩm áp dụng
                                                    </h6>
                                                    <Table className="align-items-center table-flush" responsive>
                                                      <thead className="thead-light">
                                                        <tr className="text-center">
                                                          <th scope="col">#</th>
                                                          <th scope="col">Tên sản phẩm</th>
                                                          <th scope="col">Thương hiệu</th>
                                                          <th scope="col">Giá gốc</th>
                                      
                                      
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                          <td className="text-center"><Input type="checkbox" /></td>
                                                          <td></td>
                                                          <td></td>
                                                          <td></td>
                                      
                                                        </tr>
                                                      </tbody>
                                                    </Table>
                                                  </Col>
                                                )}

                                            </Row>

                                        </div>


                                    </Form>
                                    {/* Description */}
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">Danh sách</h6>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên khuyến mại</th>
                                                <th scope="col">Loại khuyến mại</th>
                                                <th scope="col">Mô tả</th>
                                                <th scope="col">Phần trăm (%)</th>
                                                <th scope="col">Tiền</th>
                                                <th scope="col">Ngày bắt đầu</th>
                                                <th scope="col">Ngày kết thúc</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Hành động</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Promotion;
