import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// reactstrap components
import { Badge, Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form } from "reactstrap";
import { FaRegEdit, FaSearch} from 'react-icons/fa';

const Shipping = () => {
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderData, setOrderData] = useState({});
    const [deliveryData, setDeliveryData] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [isProductDeleted, setIsProductDeleted] = useState(false);
    const [totalProductPrice, setTotalProductPrice] = useState(0);


    const toggle = () => setModal(!modal);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/order/admin", {
                params: {
                    page: 0,
                    size: 10,
                    status: 2,
                    date: ""
                }
            });
            setConfirm(response.content);

        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const [formData, setFormData] = useState({
        id: null,
        code: "",
        totalMoney: "",
        paymentMethod: "",
        deliveryCost: "",
        percentVoucher: "",
        priceVoucher: "",
        percentPeriod: "",
    });


    const handleRowClick = async (id, confirm) => {
        setSelectedOrderId(id);
        try {
            const [orderResponse, deliveryResponse] = await Promise.all([
                axiosInstance.get(`/order/admin/cart/get-all/${id}`),
                axiosInstance.get(`/order/admin/delivery/${id}`),
            ]);

            const productPrice = orderResponse.reduce((total, product) => {
                return total + product.totalPrice;
            }, 0);

            setTotalProductPrice(productPrice);
            setFormData({
                id: confirm.id,
                code: confirm.code,
                totalMoney: confirm.totalMoney,
                paymentMethod: confirm.paymentMethod,
                deliveryCost: confirm.deliveryCost,
                percentVoucher: confirm.percentVoucher,
                priceVoucher: confirm.priceVoucher,
                percentPeriod: confirm.percentPeriod,
            });
            setOrderData(orderResponse);
            setDeliveryData(deliveryResponse.data);

            setModal(true);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
        }
    };


    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

     //updateStatus
     const handleConfirm = async () => {
        try {
            await Promise.all(selectedIds.map(async (id) => {
                await axiosInstance.put(`/order/admin/update-status/${id}?status=2`);
            }));
            fetchData();

        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
        }
    };

    // useEffect(() => {
    //     if (isProductDeleted) {
    //         setModal(true);
    //         setIsProductDeleted(false);
    //         handleRowClick(selectedOrderId, confirm);
    //     }
    // }, [isProductDeleted]);

    return (
        <>
            <Row >
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

                    <Table className="align-items-center" hover bordered responsive >
                        <thead className="thead-light text-center">
                            <tr>
                                <th scope="col" className="pt-0">
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                    </FormGroup>
                                </th>
                                <th scope="col">Mã hóa đơn</th>
                                <th scope="col">Khách hàng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Phương thức</th>
                                <th scope="col">Nhân viên</th>
                                <th scope="col">Ngày mua</th>
                                <th scope="col">Ngày xác nhận</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            {Array.isArray(confirm) &&
                                confirm.map((confirm, index) => (
                                    <tr key={confirm.id}>
                                        <td className="text-center pt-0">
                                            <FormGroup check>
                                                <Input type="checkbox" onChange={() => handleCheckboxChange(confirm.id)} checked={selectedIds.includes(confirm.id)} />
                                            </FormGroup>
                                        </td>
                                        <td>{confirm.code}</td>
                                        <td>{confirm.createdBy}</td>
                                        <td className="text-right">{confirm.totalMoney.toLocaleString("vi-VN")} VND</td>
                                        <td className="text-center">
                                            <Badge color={confirm.paymentMethod === 1 ? "success" : confirm.paymentMethod === 2 ? "primary" : "secondary"}>
                                                {confirm.paymentMethod === 1 ? "COD" : confirm.paymentMethod === 2 ? "Ví điện tử" : "Không xác định"}
                                            </Badge>
                                        </td>
                                        <td>{confirm.updatedBy}</td>
                                        <td>{format(new Date(confirm.createdTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                        <td>{format(new Date(confirm.updatedTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                        <td className="text-center">
                                            <Button color="link" size="sm" onClick={() => handleRowClick(confirm.id, confirm)}><FaRegEdit /></Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                    <Row className="mt-3 mr-2 justify-content-end">
                        <Button color="primary" outline size="sm" onClick={handleConfirm}>
                            Xác nhận
                        </Button>

                    </Row>

                    <Modal
                        isOpen={modal}
                        toggle={toggle}
                        backdrop={'static'}
                        keyboard={false}
                        style={{ maxWidth: '1100px' }}
                    >
                        <ModalHeader toggle={toggle}>
                            <h3 className="heading-small text-muted mb-0">Chi tiết hóa đơn</h3>
                        </ModalHeader>
                        <ModalBody>
                            <Row style={{ border: "1px solid gray" }}>
                                <Col md={5} >
                                    <h3 className="mt-3 heading-small text-muted">Thông tin khách hàng</h3>
                                    <Form className="m-2" style={{ fontSize: 13 }}>
                                        <FormGroup>
                                            <Label>
                                                Mã hóa đơn
                                            </Label>
                                            <Input
                                                size="sm"
                                                type="text"
                                                value={formData.code}

                                            />
                                        </FormGroup>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Khách hàng
                                                    </Label>
                                                    <Input
                                                        size="sm"
                                                        type="text"
                                                        value={deliveryData.recipientName}
                                                        onChange={(e) => setDeliveryData({ ...deliveryData, recipientName: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Số điện thoại
                                                    </Label>
                                                    <Input
                                                        size="sm"
                                                        type="tel"
                                                        value={deliveryData.recipientPhone}
                                                        onChange={(e) => setDeliveryData({ ...deliveryData, recipientPhone: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label>
                                                Địa chỉ
                                            </Label>
                                            <Input
                                                size="sm"
                                                rows="2"
                                                type="textarea"
                                                value={deliveryData.deliveryAddress}
                                                onChange={(e) => setDeliveryData({ ...deliveryData, deliveryAddress: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                Tổng tiền sản phẩm
                                            </Label>
                                            <InputGroup size="sm">
                                                <Input
                                                    size="sm"
                                                    type="number"
                                                    value={totalProductPrice}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>VNĐ</InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>


                                        <Row >
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Đợt giảm giá
                                                    </Label>
                                                    <InputGroup size="sm">
                                                        <Input
                                                            size="sm"
                                                            type="number"
                                                            value={formData.percentPeriod}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>%</InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>

                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Voucher từ shop
                                                    </Label>
                                                    <InputGroup size="sm">
                                                        <Input
                                                            size="sm"
                                                            type="number"
                                                            value={formData.percentVoucher || formData.priceVoucher || ""}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>{formData.percentVoucher ? "%" : "VNĐ"}</InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row >
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Phí vận chuyển
                                                    </Label>
                                                    <InputGroup size="sm">
                                                        <Input
                                                            size="sm"
                                                            type="number"
                                                            value={deliveryData.deliveryCost}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>VNĐ</InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>

                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <img className="my-3 ml-3"
                                                        width={"80%"}
                                                        alt="..."
                                                        src={require("../../../assets/img/theme/giaohangnhanh.webp")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label>
                                                Thành tiền
                                            </Label>
                                            <InputGroup size="sm">
                                                <Input
                                                    size="sm"
                                                    type="number"
                                                    value={formData.totalMoney}
                                                    onChange={(e) => setFormData({ ...formData, totalMoney: e.target.value })}

                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>VNĐ</InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup className="d-flex align-items-center mb-3">
                                            <Label className="mr-2 mb-0">
                                                Phương thức thanh toán:
                                            </Label>
                                            <span className="border-0" style={{ fontWeight: "bold" }}>
                                                {formData.paymentMethod === 1 ? "Thanh toán sau khi nhận hàng" : formData.paymentMethod === 2 ? "Ví điện tử" : ""}
                                            </span>
                                        </FormGroup>


                                    </Form>
                                </Col>

                                <Col md={7}>
                                    <h3 className="mt-3 heading-small text-muted">Giỏ hàng</h3>
                                    <Table hover size="sm">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                                <th>Thành tiền</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ color: "#000" }}>
                                            {Array.isArray(orderData) &&
                                                orderData.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{product.shoesName}</td>
                                                        <td className="text-center">{product.quantity}</td>
                                                        <td className="text-right">{product.discountPrice}</td>
                                                        <td className="text-right">{product.totalPrice}</td>

                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </ModalBody >
                        <ModalFooter>
                            <div className="text-center">

                                <Button color="danger" outline onClick={toggle} size="sm">
                                    Đóng
                                </Button>
                            </div>
                        </ModalFooter>

                    </Modal >
                </Col>
            </Row>
        </>
    );
};

export default Shipping;
