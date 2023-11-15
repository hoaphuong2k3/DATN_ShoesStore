import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { FaQrcode, FaSearch, FaUserPlus } from 'react-icons/fa';
import { TbShoppingBagPlus } from 'react-icons/tb';
import Switch from 'react-input-switch';
import { Row, Col, Button, Card, CardBody, CardHeader, Table, InputGroup, Input, Form, FormGroup, Label, InputGroupAddon, InputGroupText } from "reactstrap";

const OrderHeader = () => {

    const [showShippingForm, setShowShippingForm] = useState(false);
    const products = [];


    return (
        <Row className="my-4">
            <Col lg={12} className="text-right">
                <Button color="warning" outline size="sm">
                    <FaQrcode className="mr-1" />QR Code sản phẩm
                </Button>
                <Button color="primary" outline size="sm">
                    + Thêm sản phẩm
                </Button>
            </Col>

            <Col lg={12} className="my-3">
                <Card>
                    <CardHeader className=" h4 border-0">Giỏ hàng</CardHeader>
                    <CardBody>
                        {products.length === 0 ? (
                            <div className="text-center text-muted">
                                <TbShoppingBagPlus style={{ width: 100, height: 100 }} />
                                <div>Chưa có sản phẩm trong giỏ.</div>
                            </div>
                        ) : (
                            <Table>
                                <thead className="thead-light text-center">
                                    <tr>
                                        <th>#</th>
                                        <th>Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </Table>
                        )}
                    </CardBody>

                </Card>
            </Col>

            <Row className="col">
                <Col lg={7}>

                    <Col lg="12">
                        <Card>
                            <CardHeader>
                                <Row >
                                    <Col sm={7} style={{ display: "flex" }}>
                                        <h4>Khách hàng</h4>
                                        {/* {!hasCustomerData && <p style={{ fontSize: 13, marginLeft: 12, padding: 7, background: "gray", color: "#fff", borderRadius: "50%" }}>Khách lẻ</p>} */}
                                    </Col>
                                    <Col sm={5} style={{ display: "flex" }}>
                                        <InputGroup size="sm" style={{ width: 200 }}>
                                            <Input type="search" placeholder="Tìm kiếm khách hàng" />
                                        </InputGroup>
                                        <FaUserPlus className="m-2" />
                                    </Col>
                                </Row>
                            </CardHeader>

                            {/* {hasCustomerData && ( */}
                            <CardBody style={{ fontSize: 14 }}>
                                <Form>
                                    <Row className="mb-1">
                                        <Label className="col">Tên khách hàng:</Label>
                                        <Col className="text-right">
                                            <h5>Phan Thị Hoa Phượng</h5>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Label className="col">Email:</Label>
                                        <Col className="text-right">
                                            <h5>hoaphuong190723@gmail.com</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Label className="col">Số điện thoại:</Label>
                                        <Col className="text-right">
                                            <h5>0397509321</h5>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            {/* )}  */}
                        </Card>
                    </Col>

                    {showShippingForm && (
                    <Col lg="12" className="mt-3">
                        <Card>
                            <CardHeader className="h4">Thông tin giao hàng</CardHeader>
                            <CardBody style={{ fontSize: 14 }}>
                                <Form>

                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <Label>Người nhận</Label>
                                                <Input type="text" size="sm" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <Label>Số điện thoại</Label>
                                                <Input type="tel" size="sm" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <Label>Tỉnh/thành phố</Label>
                                                <Input type="select" size="sm" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <Label>Quận/huyện</Label>
                                                <Input type="select" size="sm" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <Label>Xã/phường</Label>
                                                <Input type="select" size="sm" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <Label>Địa chỉ</Label>
                                                <Input rows="2" type="textarea" size="sm" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>

                        </Card>
                    </Col>
                    )}

                </Col>

                <Col lg={5}>

                    <Card>
                        <CardHeader>
                            <Row className="col" style={{ justifyContent: "space-between" }}>
                                <h4>Thanh toán</h4>
                                <Switch className="mt-1" on="yes" off="no" checked={showShippingForm} onChange={() => setShowShippingForm(!showShippingForm)} />
                            </Row>
                        </CardHeader>
                        <CardBody style={{ fontSize: 14 }}>
                            <Form>
                                
                                <Row className="mb-1">
                                    <Label className="col">Tiền hàng:</Label>
                                    <Col className="text-right">
                                        <h5>0</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Đợt giảm giá:</Label>
                                    <Col className="text-right">
                                        <h5>0</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Voucher của shop:</Label>
                                    <Col className="text-right">
                                        <h5>0</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Phí vận chuyển:</Label>
                                    <Col className="text-right">
                                        <h5>0</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Giảm phí vận chuyển:</Label>
                                    <Col className="text-right">
                                        <h5>0</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col h5" style={{fontSize:14}}>Thành tiền:</Label>
                                    <Col className="text-right">
                                        <h5 style={{ color: "red" }}>0</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col lg="12">
                                        <InputGroup size="sm">
                                            <Input type="number" placeholder="Nhập số tiền khách đưa" />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Tiền thừa:</Label>
                                    <Col className="text-right">
                                        <h5 style={{ color: "red" }}>0</h5>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>

                    </Card>
                </Col>
            </Row>


        </Row>
    );
};

export default OrderHeader;
