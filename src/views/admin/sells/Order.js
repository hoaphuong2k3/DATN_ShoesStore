import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import { ToastContainer, toast } from "react-toastify";
import { FaQrcode, FaUserPlus } from 'react-icons/fa';
import { TbShoppingBagPlus } from 'react-icons/tb';
import Switch from 'react-input-switch';
import {
    Row, Col, Button, Card, CardBody, CardHeader, Table, InputGroup, Input, InputGroupAddon,
    Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter
} from "reactstrap";

import Product from "views/admin/sells/ListProducts.js";

const Order = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const [showShippingForm, setShowShippingForm] = useState(false);
    const products = [];

    //Client
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    const [client, setClient] = useState({
        id: null,
        fullname: "",
        phonenumber: "",
        email: "",
        username: "",
    });

    // Get Client
    const fetchClients = async () => {
        try {
            const response = await axiosInstance.get('/client/admin');
            setClients(response.content);
        } catch (error) {
            console.error('Lỗi khi tải lại dữ liệu khách hàng:', error);
        }
    };
    useEffect(() => {
        fetchClients();
    }, []);

    //search Client
    const handleSearch = () => {
        const filteredClients = clients.filter((client) =>
            (client.fullname && client.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (client.phoneNumber && client.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(filteredClients);
    };
    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    //Add client
    const onAddClient = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/client/admin/create', client);
            resetClient();
            toggle2();
            fetchClients();
            toast.success("Thêm khách hàng thành công");
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }
    };
    const onInputChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };
    const resetClient = () => {
        setClient({
            fullname: "",
            phonenumber: "",
            email: "",
            username: "",
        });
    };


    return (
        <Row className="my-4">
            <Col lg={12} className="text-right">
                <Button color="warning" outline size="sm">
                    <FaQrcode className="mr-1" />QR Code sản phẩm
                </Button>
                <Button color="primary" outline size="sm" onClick={toggle}>
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
                                <Row>
                                    <Col md={7} >
                                        <h4>Khách hàng</h4>
                                    </Col>
                                    <Col md={5} className="pr-0">
                                        <Row>
                                            <InputGroup size="sm" style={{ width: 200 }}>
                                                <Input
                                                    type="text"
                                                    placeholder="Tìm kiếm khách hàng"
                                                    value={selectedClient ? selectedClient.fullname : searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            setSelectedClient(null);
                                                            setSearchTerm("");
                                                        }
                                                    }}
                                                />
                                            
                                            </InputGroup>
                                            <FaUserPlus className="m-2" style={{ cursor: "pointer" }} onClick={toggle2} />
                                        </Row>
                                        <Row>
                                            <Form style={{ position: "absolute", zIndex: 1, background: "#fff" }}>
                                                {searchTerm && searchResults.length > 0 && (
                                                    <ul style={{ listStyle: "none", fontSize: 12, border: "1px solid #ccc", borderRadius: 8, padding: 0, marginTop: 10, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                                                        {searchResults.map((result) => (
                                                            <li
                                                                key={result.id}
                                                                onClick={() => {
                                                                    setSelectedClient(result);
                                                                    setSearchTerm("");
                                                                }}
                                                                style={{ padding: 5, borderBottom: "1px solid #ccc", borderRadius: 8, cursor: "pointer" }}
                                                            >
                                                                {result.fullname}- {result.phoneNumber}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </Form>
                                        </Row>
                                    </Col>


                                </Row>
                            </CardHeader>
                            {selectedClient  && (
                            <CardBody style={{ fontSize: 14, position: "relative", zIndex: 0 }}>
                                <Form>
                                    <Form>
                                        <Row className="mb-1">
                                            <Label className="col">Tên khách hàng:</Label>
                                            <Col className="text-right">
                                                <h5>{selectedClient ? selectedClient.fullname : ""}</h5>
                                            </Col>
                                        </Row>
                                        <Row className="mb-1">
                                            <Label className="col">Email:</Label>
                                            <Col className="text-right">
                                                <h5>{selectedClient ? selectedClient.email : ""}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Label className="col">Số điện thoại:</Label>
                                            <Col className="text-right">
                                                <h5>{selectedClient ? selectedClient.phoneNumber : ""}</h5>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Form>
                            </CardBody>
                            )}
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
                                    <Label className="col h5" style={{ fontSize: 14 }}>Thành tiền:</Label>
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

            {/* ListProduct */}
            <Modal
                isOpen={modal}
                toggle={toggle}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '1000px' }}
            >
                <ModalHeader toggle={toggle}>
                    <h3 className="heading-small text-dark mb-0">Danh sách sản phẩm</h3>
                </ModalHeader>
                <ModalBody>
                    <Product />
                </ModalBody >
                <ModalFooter>
                    <div className="text-center">
                        <Button color="danger" outline onClick={toggle} size="sm">
                            Đóng
                        </Button>
                    </div>
                </ModalFooter>
            </Modal >

            {/* Client */}
            <Modal
                isOpen={modal2}
                toggle={toggle2}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '550px' }}
            >
                <ModalHeader toggle={toggle2}>
                    <h3 className="heading-small text-dark mb-0">Thêm khách hàng</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label className="form-control-label">
                                        Họ tên
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        name="fullname"
                                        value={client.fullname}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <FormGroup>
                                    <label className="form-control-label">
                                        Tên đăng nhập
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        name="username"
                                        value={client.username}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label className="form-control-label">
                                        Email
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="email"
                                        name="email"
                                        value={client.email}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label className="form-control-label">
                                        Số điện thoại
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="tel"
                                        name="phonenumber"
                                        value={client.phonenumber}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody >
                <ModalFooter>
                    <div className="text-center">
                        <Button color="primary" outline size="sm" onClick={resetClient}>
                            Làm mới
                        </Button>
                        <Button color="primary" outline size="sm" onClick={onAddClient}>
                            Thêm
                        </Button>
                        <Button color="danger" outline onClick={toggle2} size="sm">
                            Đóng
                        </Button>
                    </div>
                </ModalFooter>
            </Modal >

            <ToastContainer />
        </Row>
    );
};

export default Order;
