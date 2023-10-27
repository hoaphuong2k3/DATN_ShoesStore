import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findShoes } from "services/Product2Service";
import { getAllShoesDetail } from "services/ShoesDetailService.js";
import { Link } from "react-router-dom";
import { getAllColorId, getAllSizeId, getAllColor, getAllSize } from "services/ProductAttributeService";
// reactstrap components
import {
    Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Input, Button, Form, CardTitle, Label, Table
} from "reactstrap";
import { toast } from 'react-toastify';
import Switch from 'react-input-switch';
import axios from "axios";
// core components
import Header from "components/Headers/UserHeader3.js";

const Account = () => {
    return (
        <>
            <Header />
            <Container fluid>
                {/* Table */}
                <Row>
                    <div className="col-2">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row>
                                    <Col lg={3}>
                                        <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/`} width={40} height={40} />
                                    </Col>
                                    <Col lg={9}>
                                        <div>Username</div>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div>Hồ sơ</div>
                                <div>Ngân hàng</div>
                                <div>Địa chỉ</div>
                                <div>Đổi mật khẩu</div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-10">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                >
                                    <h3> Hồ Sơ Của Tôi</h3>
                                    <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="8">
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
                                                            type="text"
                                                            // value={dataEdit.createdBy}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Ngày tạo
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            disabled
                                                        // value={dataEdit.createdTime}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col lg="4">

                                        </Col>
                                    </Row>

                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Account;
