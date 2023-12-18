import React, { useState, useEffect, useParams } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    FormGroup, Form, Button,
    Input,
    CardTitle, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import { useAuth } from "services/AuthContext.js";
import { FaEdit, FaTrash, FaBook, FaRegUser, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from "services/custommize-axios";
import axios from "axios";


const Rate = (props) => {
    return (
        <>
            <Card className="shadow">
                <CardHeader className="bg-transparent">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        <Row>
                            <span className="col-9">
                                <h3>Lịch sử đánh giá</h3>
                                <div>Quản lý thông tin địa chỉ</div>
                            </span>
                        </Row>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="pl-lg-4">
                        {/* Address content */}
                        <Form>
                            {/* <div className="pl-lg-4">
                                {listAddress.length <= 0 &&
                                    <Row className="text-muted mb-0">
                                        Không có dữ liệu
                                    </Row>
                                }
                                {
                                    listAddress && listAddress.length > 0 &&
                                    listAddress.map((item, index) => {
                                        return (
                                            <>
                                                <Row>
                                                    <Col lg="9"  >
                                                        <div style={{ fontSize: "14" }} className="text-small text-muted mb-0">
                                                            {item.addressDetail}, {item.address}
                                                        </div>
                                                    </Col>
                                                    <Col lg="3" className="mr--1">
                                                        <Button color="link" size="sm" onClick={() => CLickUpdateAddress(item)}>
                                                            <FaEdit color="info" />
                                                        </Button>
                                                        <Button color="link" size="sm" onClick={() => deleteAddress(item.id)}>
                                                            <FaTrash color="danger" />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </>
                                        )
                                    })
                                }
                            </div> */}
                        </Form>
                    </div>
                </CardBody>
            </Card>
            {/* Modal Thêm Địa chỉ */}
            {/* <Modal
                isOpen={modalAddAdress}
                toggle={toggleAddAdress}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '500px' }}
            >
                <ModalHeader toggle={toggleAddAdress}>
                    <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Địa chỉ khách hàng' : 'Thêm Mới Địa chỉ khách hàng'}</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Chi tiết địa chỉ
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="textarea"
                                            value={formData.addressDetail}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    addressDetail: e.target.value
                                                })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label className="form-control-label" htmlFor="input-city">
                                            Tỉnh / Thành
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="select"
                                            value={formData.proviceCode}
                                            onChange={(e) => handleProvinceChange(e.target.value)}
                                        >
                                            <option value="">Chọn Tỉnh / Thành</option>
                                            {provinces.map((province) => (
                                                <option key={province.ProvinceID} value={province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label className="form-control-label" htmlFor="input-country">
                                            Quận / Huyện
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="select"
                                            value={formData.districtCode}
                                            onChange={(e) => handleDistrictChange(e.target.value)}
                                            disabled={!formData.proviceCode}
                                        >
                                            <option value="">Chọn Quận / Huyện</option>
                                            {
                                                districts.map((district) => (
                                                    <option key={district.DistrictID} value={district.DistrictID} >
                                                        {district.DistrictName}
                                                    </option>
                                                ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Phường / Xã
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="select"
                                            value={formData.communeCode}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                communeCode: e.target.value
                                            })}
                                            disabled={!formData.districtCode}
                                        >
                                            <option value="">Chọn Phường / Xã</option>
                                            {
                                                communes.map((commune) => (
                                                    <option key={commune.WardCode} value={commune.WardCode}>
                                                        {commune.WardName}
                                                    </option>
                                                ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center">
                        <Button color="danger" onClick={(e) => saveAddress(e)}>
                            {formData.id ? "Cập nhật" : "Thêm mới"}
                        </Button>{' '}
                        {formData.id
                            ?
                            ""
                            :
                            <Button color="primary" onClick={resetFormData}>
                                Reset
                            </Button>
                        }
                        <Button color="danger" onClick={toggleAddAdress} >
                            Close
                        </Button>
                    </div>
                </ModalFooter>
            </Modal > */}
            {/* Kết thúc thêm modal địa chỉ */}
        </>
    );
}


export default Rate;
