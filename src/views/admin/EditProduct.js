import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { postCreateBrands, getAll, updateBrand, deleteBrand } from "services/ProductAttributeService";
// reactstrap components
import {
    Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Label, Input, Button, Table, CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Form
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";


const EditProduct = () => {

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="mb-4">
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Thuộc tính sản phẩm</h3>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
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
                                        </Row>
                                        <Row>
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
                                                        Màu
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
                                                        <option value="loaisp">
                                                            sfdsfsf
                                                        </option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="pl-lg-4">
                                        <FormGroup>
                                            <label>Mô tả</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="A few words about you ..."
                                                rows="4"
                                                defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                                                type="textarea"
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Số lượng
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
                                                        htmlFor="input-username"
                                                    >
                                                        Giá
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
                                        </Row>

                                    </div>

                                    <div className="pl-lg-4">
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
                                                        defaultValue="lucky.jesse"
                                                        id="input-username"
                                                        placeholder="Username"
                                                        type="text"
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
                                                        id="input-email"
                                                        placeholder="jesse@example.com"
                                                        type="email"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                    </div>



                                    <div className="pl-lg-4 mt-3">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Row>
                                                        <label
                                                            className="form-control-label col-md-3"
                                                            htmlFor="input-address"
                                                        >
                                                            Trạng thái
                                                        </label>
                                                        <FormGroup check >
                                                            <span className="col-md-3">
                                                                <Input
                                                                    name="radio2"
                                                                    type="radio"
                                                                    checked
                                                                />
                                                                {' '}
                                                                <Label check>
                                                                    Hoạt động
                                                                </Label>
                                                            </span>
                                                            &emsp;&emsp;&emsp;
                                                            <span xl={3} className="col-md-3">
                                                                <Input
                                                                    name="radio2"
                                                                    type="radio"
                                                                />
                                                                {' '}
                                                                <Label check>
                                                                    Ngừng hoạt động
                                                                </Label>
                                                            </span>
                                                        </FormGroup>
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                    </div>

                                    <div className="text-center">
                                        <Button color="warning" >
                                            <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                                            Sửa
                                        </Button>
                                    </div>
                                    <hr className="my-4" />

                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>


            </Container>
        </>
    );
};


export default EditProduct;