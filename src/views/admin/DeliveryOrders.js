import React, { useState } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "components/Headers/BillHeader.js";

const DeliveryOrders = () => {
    const [provinces, setProvinces] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col md="12">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Phiếu Giao Hàng</h3>
                                    </div>
                                    <div className="col text-right btn-crud">
                                        <Button
                                            color="primary"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm">
                                            Thêm
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm">
                                            Cập nhật
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm">
                                            Xóa
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm">
                                            Mới
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-ship-date">
                                                        Ngày giao hàng
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-ship-date"
                                                        placeholder="Ngày giao hàng"
                                                        type="date"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-delivery-address">
                                                        Địa chỉ giao hàng
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-delivery-address"
                                                        placeholder="Địa chỉ"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-recipient-name">
                                                        Tên người nhận
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-recipient-name"
                                                        placeholder="Tên người nhận"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-recipient-phone">
                                                        Số điện thoại
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-recipient-phone"
                                                        placeholder="Số điện thoại"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-delivery-cost">
                                                        Phí giao hàng
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-delivery-cost"
                                                        placeholder="Phí giao hàng"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-delivery-cost">
                                                        Trạng thái
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-delivery-cost"
                                                        placeholder="Trạng thái"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{ marginTop: "20px" }}>
                    <Col md="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Danh sách</h3>
                                    </div>
                                    <div className="col text-right" style={{ display: "flex" }}>
                                        <Col>
                                            <Input id="search" type="text" placeholder="Search.." style={{ width: "250px" }} size="sm" />
                                        </Col>

                                        <Button
                                            color="primary"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Export
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Ngày giao</th>
                                        <th scope="col">Địa Chỉ</th>
                                        <th scope="col">Tên người nhận</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Phí giao</th>
                                        <th scope="col">Ngày tạo</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Người tạo</th>
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
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default DeliveryOrders;