import React from "react";

// reactstrap components
import { Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FaFileAlt, FaSearch } from 'react-icons/fa';


const Cancel = () => {
    return (
        <>
            <Row>
                <Col>
                    <Row className="align-items-center my-4">
                        <Col lg={4} style={{ display: "flex" }}>
                            <InputGroup size="sm">
                                <Input type="text" placeholder="Tìm kiếm hóa đơn" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FaSearch color="black" />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>

                    </Row>

                    <Table className="align-items-center" hover bordered responsive>
                        <thead className="thead-light text-center">
                            <tr >
                                <th scope="col" className="pt-0">
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                    </FormGroup>
                                </th>
                                <th scope="col">Mã hóa đơn</th>
                                <th scope="col">Khách hàng</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Tổng tiền (VND)</th>
                                <th scope="col">Ngày mua</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center pt-0">
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">
                                    <Button color="link" size="sm"><FaFileAlt /></Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Row className="mt-3 mr-2 justify-content-end">
                        <Button color="danger" outline  size="sm">
                           Hủy
                        </Button>
                        <Button color="primary" outline  size="sm">
                            Xác nhận
                        </Button>
                    </Row>
                </Col>


            </Row>
        </>
    );
};

export default Cancel;
