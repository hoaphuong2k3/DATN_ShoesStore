import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "components/Headers/BillHeader.js";

const DeliveryOrders = () => {
    const [provinces, setProvinces] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [delivery, setDelivery] = useState([])


    const fetchData = async () => {
        try {
            const provincesResponse = await axios.get("https://provinces.open-api.vn/api/?depth=3");
            setProvinces(provincesResponse.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                                        type="date"
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
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-recipient-phone">
                                                        Số điện thoại
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-recipient-phone"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-delivery-cost">
                                                        Phí giao hàng
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-delivery-cost"
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
                                                        id="input-delivery-status"
                                                        type="number"
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
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input_city">
                                                        Tỉnh / thành
                                                    </label>
                                                    <Input className="form-control-alternative"
                                                        type="select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                                        <option value="">Chọn tỉnh / thành</option>
                                                        {provinces.map((province) => (
                                                            <option key={province.code} value={province.name}>
                                                                {province.name}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Quận / Huyện
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="select"
                                                        value={selectedDistrict}
                                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                                        disabled={!selectedCity}
                                                    >
                                                        <option value="">Chọn Quận / Huyện</option>
                                                        {selectedCity &&
                                                            provinces
                                                                .find((province) => province.name === selectedCity)
                                                                .districts.map((district) => (
                                                                    <option key={district.code} value={district.name}>
                                                                        {district.name}
                                                                    </option>
                                                                ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label" >
                                                        Phường / Xã
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="select"
                                                        value={selectedWard}
                                                        onChange={(e) => setSelectedWard(e.target.value)}
                                                        disabled={!selectedDistrict}
                                                    >
                                                        <option value="">Chọn Phường / Xã</option>
                                                        {selectedDistrict &&
                                                            provinces
                                                                .find((province) => province.name === selectedCity)
                                                                .districts.find((district) => district.name === selectedDistrict)
                                                                .wards.map((ward) => (
                                                                    <option key={ward.code} value={ward.name}>
                                                                        {ward.name}
                                                                    </option>
                                                                ))}
                                                    </Input>
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
                                <Row className="mt-2 ">
                                    <h6 className="heading-small text-muted mb-4">Danh sách</h6>
                                    <div className="col-2">
                                        <Input type="select" value={''} onChange={(e) => e.preventDefault()} size="sm">
                                            <option value="">Tất cả</option>
                                            <option value="1">Đang hoạt động</option>
                                            <option value="2"></option>
                                        </Input>
                                    </div>
                                    <div className="col text-right">
                                    <Button
                                            color="primary"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm">
                                            <i class="fa fa-print" aria-hidden="true"></i>
                                            In phiếu giao
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