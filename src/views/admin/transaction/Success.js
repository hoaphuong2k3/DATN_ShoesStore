import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "services/custommize-axios";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { connect } from 'react-redux';
import { updateData } from './actions';
// reactstrap components
import { Badge, Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form } from "reactstrap";
import { FaRegEdit, FaSearch} from 'react-icons/fa';

const Success = ({ updateData }) => {
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderData, setOrderData] = useState({});
    const [deliveryData, setDeliveryData] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [isProductDeleted, setIsProductDeleted] = useState(false);
    const [totalProductPrice, setTotalProductPrice] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [detailedAddress, setDetailedAddress] = useState('');
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');



    const toggle = () => setModal(!modal);

    const fetchData = async () => {

        const provincesResponse = await axios.get(
            "https://provinces.open-api.vn/api/?depth=3"
        );
        setProvinces(provincesResponse.data);

        try {
            const response = await axiosInstance.get("/order/admin", {
                params: {
                    page: 0,
                    size: 10,
                    status: 3,
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
        percentVoucher: "",
        priceVoucher: "",
        percentPeriod: "",
    });


    //TotalMoney
    const calculateTotalMoney = (productPrice, deliveryCost, percentPeriod, percentVoucher, priceVoucher) => {
        let totalMoney;

        if (percentPeriod !== null) {
            if (priceVoucher !== null) {
                totalMoney = productPrice - (productPrice * percentPeriod / 100) - priceVoucher + Math.floor(deliveryCost);
            } else if (percentVoucher !== null) {
                totalMoney = productPrice - productPrice * ((percentPeriod + percentVoucher) / 100) + Math.floor(deliveryCost);
            } else {
                totalMoney = productPrice - (productPrice * percentPeriod / 100) + Math.floor(deliveryCost);
            }
        } else {
            if (priceVoucher !== null) {
                totalMoney = productPrice - priceVoucher + Math.floor(deliveryCost);
            } else if (percentVoucher !== null) {
                totalMoney = productPrice - (productPrice * percentVoucher / 100) + Math.floor(deliveryCost);
            } else {
                totalMoney = productPrice + Math.floor(deliveryCost);
            }
        }

        return totalMoney;
    };

    //detail
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

            const totalMoney = calculateTotalMoney(
                productPrice,
                deliveryResponse.data.deliveryCost,
                confirm.percentPeriod,
                confirm.percentVoucher,
                confirm.priceVoucher
            );
            setTotalProductPrice(productPrice);

            setFormData({
                id: confirm.id,
                code: confirm.code,
                totalMoney: totalMoney,
                paymentMethod: confirm.paymentMethod,
                percentVoucher: confirm.percentVoucher,
                priceVoucher: confirm.priceVoucher,
                percentPeriod: confirm.percentPeriod,
            });
            setOrderData(orderResponse);
            setDeliveryData(deliveryResponse.data);

            const deliveryAddress = deliveryResponse.data.deliveryAddress;

            // Phân tách chuỗi địa chỉ thành các thành phần
            const addressParts = deliveryAddress.split(', ');
            const [selectedProvince, selectedDistrict, selectedWard, detailedAddress] = addressParts.reverse();
            setDetailedAddress(detailedAddress);
            setSelectedWard(selectedWard);
            setSelectedDistrict(selectedDistrict);
            setSelectedProvince(selectedProvince);

            setModal(true);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
        }
    };

    //checkbox
    const selectAllCheckbox = () => {
        setSelectAllChecked(!selectAllChecked);
        const newSelectedIds = confirm.map(item => item.id);
        setSelectedIds(selectAllChecked ? [] : newSelectedIds);
    };

    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };


    useEffect(() => {
        if (isProductDeleted) {
            setModal(true);
            setIsProductDeleted(false);
        }
    }, [isProductDeleted]);

    return (
        <>
            <Row >
                <Col>
                    <Row className="align-items-center my-4">
                        <Col lg={4} style={{ display: "flex" }}>
                            <InputGroup size="sm">
                                <Input type="search"
                                    placeholder="Tìm kiếm hóa đơn"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
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
                                        <Input type="checkbox"
                                            onChange={() => selectAllCheckbox()}
                                            checked={selectAllChecked}
                                        />
                                    </FormGroup>
                                </th>
                                <th scope="col" className="text-dark">Mã hóa đơn</th>
                                <th scope="col" className="text-dark">Khách hàng</th>
                                <th scope="col" className="text-dark">Tổng tiền</th>
                                <th scope="col" className="text-dark">Phương thức</th>
                                <th scope="col" className="text-dark">Nhân viên</th>
                                <th scope="col" className="text-dark">Ngày mua</th>
                                <th scope="col" className="text-dark">Ngày xác nhận</th>
                                <th scope="col" className="text-dark">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            {Array.isArray(confirm) &&
                                confirm
                                    .filter(
                                        (confirm) =>
                                            confirm.code.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((confirm, index) => (
                                        <tr key={confirm.id}>
                                            <td className="text-center pt-0">
                                                <FormGroup check>
                                                    <Input type="checkbox"
                                                        onChange={() => handleCheckboxChange(confirm.id)}
                                                        checked={selectedIds.includes(confirm.id)} />
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
                                            <td>{confirm.updateBy}</td>
                                            <td>{format(new Date(confirm.createdTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                            <td>{format(new Date(confirm.updatedTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                            <td className="text-center">
                                                <Button color="link" size="sm" onClick={() => handleRowClick(confirm.id, confirm)}><FaRegEdit /></Button>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </Table>

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
                        <ModalBody className="pt-0 pb-0">
                            <Row style={{ border: "1px solid rgba(0, 0, 0, 0.05)", borderRadius: "0.375rem" }}>
                                <Col md={5} >
                                    <h3 className="mt-3 heading-small text-dark">Thông tin khách hàng</h3>
                                    <Form className="m-2" style={{ fontSize: 13 }}>
                                        <FormGroup>
                                            <Label>
                                                Mã hóa đơn
                                            </Label>
                                            <Input
                                                size="sm"
                                                type="text"
                                                value={formData.code}
                                                readOnly style={{ backgroundColor: "#fff" }}
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
                                                        readOnly style={{ backgroundColor: "#fff" }}                                                 />
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
                                                        readOnly style={{ backgroundColor: "#fff" }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Địa chỉ
                                                    </Label>
                                                    <Input
                                                        className="mb-2"
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13 }}
                                                        value={selectedProvince}
                                                    >
                                                        <option value="">Tỉnh/thành phố</option>
                                                        {provinces.map((province) => (
                                                            <option key={province.code} value={province.name}>
                                                                {province.name}
                                                            </option>
                                                        ))}
                                                    </Input>

                                                    <Input
                                                        className="mb-2"
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13 }}
                                                        value={selectedDistrict}
                                                        disabled={!selectedProvince}
                                                    >
                                                        <option value="">Quận/huyện</option>
                                                        {selectedProvince &&
                                                            provinces
                                                                .find((province) => province.name === selectedProvince)
                                                                ?.districts.map((district) => (
                                                                    <option key={district.code} value={district.name}>
                                                                        {district.name}
                                                                    </option>
                                                                ))}
                                                    </Input>

                                                    <Input
                                                        className="mb-2"
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13}}
                                                        value={selectedWard}
                                                        disabled={!selectedDistrict}
                                                        
                                                    >
                                                        <option value="">Xã/phường</option>
                                                        {selectedProvince &&
                                                            selectedDistrict &&
                                                            provinces
                                                                .find((province) => province.name === selectedProvince)
                                                                ?.districts.find((district) => district.name === selectedDistrict)
                                                                ?.wards.map((ward) => (
                                                                    <option key={ward.code} value={ward.name}>
                                                                        {ward.name}
                                                                    </option>
                                                                ))}
                                                    </Input>

                                                </FormGroup>

                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Input className="mt-4"
                                                        style={{ fontSize: 13, backgroundColor: "#fff" }}
                                                        size="sm"
                                                        rows="5"
                                                        type="textarea"
                                                        placeholder="Địa chỉ chi tiết..."
                                                        id="detailedAddress"
                                                        value={detailedAddress}
                                                        readOnly
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <Label>
                                                Tổng tiền sản phẩm
                                            </Label>
                                            <InputGroup size="sm">
                                                <Input
                                                    size="sm"
                                                    type="number"
                                                    value={totalProductPrice}
                                                    readOnly style={{ backgroundColor: "#fff" }}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>VND</InputGroupText>
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
                                                            readOnly style={{ backgroundColor: "#fff" }}
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
                                                            readOnly style={{ backgroundColor: "#fff" }}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>{formData.percentVoucher ? "%" : "VND"}</InputGroupText>
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
                                                            value={Math.floor(deliveryData.deliveryCost)}
                                                            readOnly style={{ backgroundColor: "#fff" }}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>VND</InputGroupText>
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
                                                    value={Math.floor(formData.totalMoney)}
                                                    readOnly style={{ backgroundColor: "#fff" }}

                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>VND</InputGroupText>
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
                                    <h3 className="mt-3 heading-small text-dark">Giỏ hàng</h3>
                                    <Table hover size="sm">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                                <th>Thành tiền</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody style={{ color: "#000" }}>
                                            {Array.isArray(orderData) &&
                                                orderData.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>
                                                            <Row className="col">
                                                                <Col md={4}>
                                                                    <span className="avatar avatar-sm rounded-circle">
                                                                        <img src={`data:image/jpeg;base64,${product.imgUri}`} alt="" />
                                                                    </span>
                                                                </Col>
                                                                <Col md={8}>
                                                                    <h5>{product.shoesName}</h5>
                                                                    <small className="mr-1">Màu: {product.colorName}</small>
                                                                    <small>Size: {product.sizeName}</small>

                                                                </Col>
                                                            </Row>

                                                        </td>
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

const mapDispatchToProps = (dispatch) => ({
    updateData: (tabId, newData) => dispatch(updateData(tabId, newData)),
});

export default connect(null, mapDispatchToProps)(Success);
