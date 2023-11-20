import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "services/custommize-axios";
import { ToastContainer, toast } from "react-toastify";
import { FaQrcode, FaUserPlus, FaUndoAlt, FaTrashAlt } from 'react-icons/fa';
import { TbShoppingBagPlus } from 'react-icons/tb';
import {
    Row, Col, Button, Card, CardBody, CardHeader, Table, InputGroup, Input,
    Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter
} from "reactstrap";

import Product from "views/admin/sells/ListProducts.js";

const Order = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);




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

    const resetSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

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


    //Ship
    const [showShippingForm, setShowShippingForm] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [shippingTotal, setShippingTotal] = useState(0);
    const [selectedToDistrictID, setSelectedToDistrictID] = useState("");
    const [selectedToWardCode, setSelectedToWardCode] = useState("");

    const fetchDataFromAPI = async (url, stateSetter) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'token': '44022259-5cfb-11ee-96dc-de6f804954c9'
                }
            });
            stateSetter(response.data.data);
        } catch (error) {
            console.error(`Lỗi khi lấy dữ liệu từ ${url}:`, error);
        }
    };

    const fetchData = async () => {

        fetchDataFromAPI('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', setProvinces);

        // Nếu có tỉnh/thành được chọn, thì mới fetch quận/huyện
        if (selectedProvince) {
            const districtURL = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvince}`;
            fetchDataFromAPI(districtURL, setDistricts);
        }
        // Nếu có quận/huyện được chọn, thì mới fetch phường/xã
        if (selectedDistrict) {
            const wardURL = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrict}`;
            fetchDataFromAPI(wardURL, setWards);
        } else {
            // Nếu chưa chọn hết xã/phường, đặt shippingTotal về 0
            setShippingTotal(0);
        }

    };

    useEffect(() => {
        fetchData();
    }, [selectedProvince, selectedDistrict]);

    const resetShip = () => {
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedWard("");
        document.getElementById("detailedAddress").value = "";
        document.getElementById('recipientName').value = "";
        document.getElementById('recipientPhone').value = "";
    };

    const handleApiCall = async () => {

        const servicesUrl = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services';
        const servicesPayload = {
            shop_id: '4580194',
            from_district: 3440,
            to_district: selectedToDistrictID,
        };

        try {
            const servicesResponse = await axios.get(servicesUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': '44022259-5cfb-11ee-96dc-de6f804954c9'
                },
                params: servicesPayload,
            });

            const servicesData = servicesResponse.data;
            console.log(servicesData);

            const selectedService = servicesData.data.find(service => service.service_type_id === 2);

            if (selectedService) {
                const serviceId = selectedService.service_id;
                console.log(serviceId);
                const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
                    headers: {
                        'token': '44022259-5cfb-11ee-96dc-de6f804954c9',
                        'shop_id': '4580194',
                        'Content-Type': 'application/json'
                    },
                    params: {
                        service_id: serviceId,
                        insurance_value: 500000,
                        coupon: null,
                        from_district_id: 3440,
                        to_district_id: selectedToDistrictID,
                        to_ward_code: selectedToWardCode,
                        height: 15,
                        length: 15,
                        weight: 2000,
                        width: 15
                    }
                });
                setShippingTotal(response.data.data.total);
            }
        } catch (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        }
    };

    //Product
    const [newProducts, setNewProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const handleSelectProducts = (selectedProductList) => {
        setSelectedProducts(selectedProductList);
    };
    const resetSelectedProducts = () => {
        setSelectedProducts([]);
    };

    const handleQuantityChange = (e, index) => {
        const newQuantity = parseInt(e.target.value, 10) || 0;

        if (newQuantity <= 30) {

            const updatedProducts = [...selectedProducts];
            updatedProducts[index].quantity = newQuantity;

            setSelectedProducts(updatedProducts);

            const newTotalAmount = updatedProducts.reduce((total, detail) => {
                return total + detail.quantity * detail.discountPrice;
            }, 0);
            setTotalAmount(newTotalAmount);
        }
    };

    const handleDeleteRow = (index) => {
        const updatedProducts = [...selectedProducts];

        updatedProducts.splice(index, 1);
        
        setSelectedProducts(updatedProducts);
    };
    

    //Order
    const [deliveryData, setDeliveryData] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const newTotalAmount = selectedProducts.reduce((total, detail) => {
            return total + detail.quantity * detail.discountPrice;
        }, 0);
        setTotalAmount(newTotalAmount);
    }, [selectedProducts]);

    const [isBankTransfer, setIsBankTransfer] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setIsBankTransfer(method === 2);
    };

    const buildDeliveryAddress = () => {
        const addressParts = [];

        const detailedAddress = document.getElementById("detailedAddress").value;
        if (detailedAddress) {
            addressParts.push(detailedAddress);
        }

        if (selectedWard) {
            addressParts.push(selectedWard);
        }

        if (selectedDistrict) {
            addressParts.push(selectedDistrict);
        }

        if (selectedProvince) {
            addressParts.push(selectedProvince);
        }

        const deliveryAddress = addressParts.join(", ");

        return deliveryAddress;
    };
    const createOrder = async () => {

        const idClient = selectedClient ? selectedClient.id : null;

        let deliveryOrderDTO = null;

        if (showShippingForm) {

            const newDeliveryAddress = buildDeliveryAddress();
            setDeliveryData({ ...deliveryData, deliveryAddress: newDeliveryAddress });
            const recipientName = document.getElementById('recipientName')?.value || '';
            const recipientPhone = document.getElementById('recipientPhone')?.value || '';

            deliveryOrderDTO = {
                address: newDeliveryAddress,
                recipientName: recipientName,
                recipientPhone: recipientPhone,
                deliveryCost: shippingTotal,
            };
        }

        try {
            const orderResponse = await axiosInstance.post('/store/create', {
                totalMoney: totalAmount + shippingTotal,
                totalPayment: "",
                paymentMethod: paymentMethod,
                idDiscountPeriods: null,
                idClient: idClient,
                shoesInCart: selectedProducts.map(product => ({
                    quantity: product.quantity,
                    idShoesDetail: product.id
                })),
                deliveryOrderDTO: deliveryOrderDTO,
            });

            console.log('Kết quả từ API tạo hóa đơn:', orderResponse.data);

            toast.success("Tạo đơn hàng thành công");
            resetSelectedProducts();
            setSelectedClient(null);
            setSearchTerm("");
            resetShip();
            setShowShippingForm(false);
            setPaymentMethod(1);

        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi tạo hóa đơn:', error);
        }
    };

    //Tính toán
    const [customerPayment, setCustomerPayment] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);

    const handleCustomerPaymentChange = (e) => {
        const paymentAmount = parseFloat(e.target.value) || 0;
        setCustomerPayment(paymentAmount);

        // Tính toán số tiền thừa
        const remainingAmount = paymentAmount - (totalAmount + shippingTotal);
        setChangeAmount(remainingAmount < 0 ? 0 : remainingAmount);
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
                <Card >
                    <CardHeader className=" h4 border-0">Giỏ hàng</CardHeader>
                    <CardBody>
                        {selectedProducts.length === 0 ? (
                            <div className="text-center text-muted">
                                <TbShoppingBagPlus style={{ width: 100, height: 100 }} />
                                <div>Chưa có sản phẩm trong giỏ.</div>
                            </div>
                        ) : (
                            <Table>

                                <thead className="thead-light text-center">
                                    <tr>
                                        <th scope="col" className="text-dark">STT</th>
                                        <th scope="col" className="text-dark">Ảnh</th>
                                        <th scope="col" className="text-dark">Sản phẩm</th>
                                        <th scope="col" className="text-dark">Giá gốc</th>
                                        <th scope="col" className="text-dark">Giá khuyến mại</th>
                                        <th scope="col" className="text-dark">Số lượng</th>
                                        <th scope="col" className="text-dark">Tổng tiền</th>
                                        <th scope="col" className="text-dark">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14 }}>
                                    {selectedProducts.map((detail, index) => (
                                        <tr key={detail.id}>
                                            <th className="text-center">{index + 1}</th>
                                            <td>

                                                <img
                                                    src={""}
                                                    alt="Ảnh mô tả"
                                                    style={{
                                                        maxWidth: "100%",
                                                        height: "150px",
                                                        border: "1px solid #ccc",
                                                    }}
                                                />

                                            </td>
                                            <td>
                                                <h4>{detail.code} - </h4>
                                                <span className="mr-2">Size: {detail.size}</span>
                                                <span>Màu: {detail.color}</span>
                                            </td>
                                            <td className="text-right" style={{ textDecoration: 'line-through' }}>{detail.price}</td>
                                            <td className="text-right" >{detail.discountPrice}</td>
                                            <td>
                                                <Input className="text-center m-auto"
                                                    type="number"
                                                    size="sm" min={1}
                                                    style={{ width: "50px" }}
                                                    value={detail.quantity}
                                                    onChange={(e) => handleQuantityChange(e, index)}
                                                />
                                            </td>
                                            <td className="text-right" style={{ color: "red" }}>{detail.quantity * detail.discountPrice}</td>
                                            <td className="text-center" onClick={() => handleDeleteRow(index)}>
                                                <FaTrashAlt style={{ cursor: "pointer" }}/>
                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        )}
                    </CardBody>

                </Card>
            </Col>

            <Row className="col">
                <Col lg={7}>

                    <Col lg="12">
                        <Card style={{ border: "1px solid #ccc", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
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
                            {selectedClient && (
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
                            <Card style={{ border: "1px solid #ccc", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
                                <CardHeader>
                                    <Row className="col" style={{ justifyContent: "space-between" }}>
                                        <h4>Thông tin giao hàng</h4>
                                        <FaUndoAlt outline onClick={() => { resetShip(); setShippingTotal(0); }} style={{ cursor: "pointer" }} />

                                    </Row>
                                </CardHeader>
                                <CardBody style={{ fontSize: 14 }}>
                                    <Form>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label>Người nhận</Label>
                                                    <Input type="text" size="sm" id="recipientName" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label>Số điện thoại</Label>
                                                    <Input type="tel" size="sm" id="recipientPhone" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label>Tỉnh/thành phố</Label>
                                                    <Input
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13 }}
                                                        value={selectedProvince}
                                                        onChange={(e) => {
                                                            setSelectedProvince(e.target.value);
                                                            setSelectedDistrict("");
                                                            setSelectedWard("");
                                                        }}
                                                    >
                                                        <option value="">---Chọn---</option>
                                                        {provinces.map((province) => (
                                                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                                                {province.ProvinceName}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label>Quận/huyện</Label>
                                                    <Input
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13 }}
                                                        value={selectedDistrict}
                                                        disabled={!selectedProvince}
                                                        onChange={(e) => {
                                                            setSelectedDistrict(e.target.value);
                                                            setSelectedWard("");
                                                            setSelectedToDistrictID(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">---Chọn---</option>
                                                        {selectedProvince &&
                                                            districts.map((district) => (
                                                                <option key={district.DistrictID} value={district.DistrictID}>
                                                                    {district.DistrictName}
                                                                </option>
                                                            ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label>Xã/phường</Label>
                                                    <Input
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13 }}
                                                        value={selectedWard}
                                                        disabled={!selectedDistrict}
                                                        onChange={(e) => {
                                                            setSelectedWard(e.target.value);
                                                            setSelectedToWardCode(e.target.value.toString());
                                                            handleApiCall();
                                                        }}
                                                    >
                                                        <option value="">---Chọn---</option>
                                                        {selectedDistrict &&
                                                            wards.map((ward) => (
                                                                <option key={ward.WardCode} value={ward.WardCode}>
                                                                    {ward.WardName}
                                                                </option>
                                                            ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <Label>Địa chỉ</Label>
                                                    <Input rows="2"
                                                        type="textarea"
                                                        size="sm"
                                                        id="detailedAddress"
                                                    />
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

                    <Card style={{ border: "1px solid #ccc", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
                        <CardHeader>
                            <Row className="col" style={{ justifyContent: "space-between" }}>
                                <h4>Thanh toán</h4>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            checked={showShippingForm}
                                            onChange={() => setShowShippingForm(!showShippingForm)}
                                        />Ship
                                    </Label>
                                </FormGroup>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ fontSize: 14 }}>
                            <Form>

                                <Row className="mb-1">
                                    <Label className="col">Tiền hàng:</Label>
                                    <Col className="text-right">
                                        <h5>{totalAmount}</h5>
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
                                        <h5>{shippingTotal}</h5>
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
                                        <h5 style={{ color: "red" }}>{totalAmount + shippingTotal}</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col lg="12">
                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={customerPayment}
                                                onChange={handleCustomerPaymentChange}
                                                style={{ textAlign: 'right' }}
                                                disabled={isBankTransfer}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Tiền thừa:</Label>
                                    <Col className="text-right">
                                        <h5 style={{ color: "red" }}>{changeAmount}</h5>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Label className="col">Phương thức:</Label>
                                    <Col className="d-flex">
                                        <div>
                                            <Label className="col" check>
                                                <Input
                                                    type="radio"
                                                    name="money"
                                                    checked={paymentMethod === 1}
                                                    onChange={() => handlePaymentMethodChange(1)}
                                                />
                                                Tiền mặt
                                            </Label>
                                            <Label className="col" check>
                                                <Input
                                                    type="radio"
                                                    name="money"
                                                    checked={paymentMethod === 2}
                                                    onChange={() => handlePaymentMethodChange(2)}
                                                />
                                                Chuyển khoản
                                            </Label>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>

                    </Card>
                </Col>
            </Row>

            <Col lg={12} className="my-3 text-center">
                <Button size="sm" color="primary" onClick={createOrder}>Tạo hóa đơn</Button>
            </Col>
            <ToastContainer />

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
                    <Product onSelectProducts={handleSelectProducts} />
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
        </Row>
    );
};

export default Order;
