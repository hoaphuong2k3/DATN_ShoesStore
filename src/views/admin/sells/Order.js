import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { FaQrcode, FaSearch, FaUserPlus } from 'react-icons/fa';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { Row, Col, Button, Card, CardBody, CardHeader, Table, InputGroup, Input, Form, FormGroup, Label } from "reactstrap";

const OrderHeader = () => {

    const [hasCustomerData, setHasCustomerData] = useState(false);
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

            <Col lg={6}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col sm={5} style={{display:"flex"}}>
                                <h4>Khách hàng</h4>
                                {!hasCustomerData && <p style={{fontSize: 14, marginLeft:10}}>Khách lẻ</p>}
                            </Col>
                            <Col sm={7} style={{display:"flex"}}>
                                <InputGroup size="sm" style={{ width: 200 }}>
                                <Input type="text" placeholder="Tìm kiếm khách hàng" />
                            </InputGroup> 
                                <Button className="mb-5" size="sm" color="link"><FaUserPlus className="m-1" /></Button>
                            </Col>
                        </Row>

                    </CardHeader>

                    {/* {hasCustomerData && ( */}
                    <CardBody style={{ fontSize: 14 }}>
                        <Form>
                            <FormGroup row>
                                <Label sm={4}>Tên khách hàng:</Label>
                                <Col sm={8}>
                                    <Input type="text" size="sm" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Email:</Label>
                                <Col sm={8}>
                                    <Input type="email" size="sm" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Số điện thoại:</Label>
                                <Col sm={8}>
                                    <Input type="tel" size="sm" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    {/* )} */}
                </Card>
            </Col>

            <Col lg={6}>
                <Card>
                    <CardHeader className="h4">Thanh toán</CardHeader>
                    <CardBody>

                    </CardBody>

                </Card>
            </Col>
        </Row>
    );
};

export default OrderHeader;
