import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "services/custommize-axios";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// reactstrap components
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { Badge, Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form } from "reactstrap";
import { FaRegEdit, FaSearch, FaRegHandPointLeft } from 'react-icons/fa';
import { DatePicker, Tooltip, Popconfirm } from 'antd';

const Shipping = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const storedUserId = localStorage.getItem("userId");
    const [confirm, setConfirm] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderData, setOrderData] = useState({});
    const [deliveryData, setDeliveryData] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [detailedAddress, setDetailedAddress] = useState('');

    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 10,
        status: 2,
    });

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
        }

        try {

            const response = await axiosInstance.get("/order/admin", {
                params: queryParams
            });
            setConfirm(response.content);
            setTotalElements(response.totalElements);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedProvince, selectedDistrict]);

    const handlePageChange = ({ selected }) => {
        setQueryParams(prevParams => ({ ...prevParams, page: selected }));
    };

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setQueryParams({ ...queryParams, size: newSize, page: 0 });
    };

    const calculateIndex = (index) => {
        return index + 1 + queryParams.page * queryParams.size;
    };

    const [formData, setFormData] = useState({
        id: null,
        code: "",
        fullnameClient: "",
        phoneNumber: "",
        totalMoney: "",
        totalPayment: "",
        paymentMethod: "",
        percentVoucher: "",
        priceVoucher: "",
        percentPeriod: "",
        nameFreeGift: "",
        imageFreeGift: ""
    });

    //detail
    const handleRowClick = async (id, confirm) => {
        setSelectedOrderId(id);

        try {
            const [orderResponse, deliveryResponse] = await Promise.all([
                axiosInstance.get(`/order/admin/cart/get-all/${id}`),
                axiosInstance.get(`/order/admin/delivery/${id}`),
            ]);

            setFormData({
                id: confirm.id,
                code: confirm.code,
                fullnameClient: confirm.fullnameClient,
                phoneNumber: confirm.phoneNumber,
                totalMoney: confirm.totalMoney,
                totalPayment: confirm.totalPayment,
                paymentMethod: confirm.paymentMethod,
                percentVoucher: confirm.percentVoucher,
                priceVoucher: confirm.priceVoucher,
                percentPeriod: confirm.percentPeriod,
                nameFreeGift: confirm.nameFreeGift,
                imageFreeGift: confirm.imageFreeGift
            });

            setOrderData(orderResponse);


            // Kiểm tra nếu có dữ liệu từ API vận chuyển
            if (deliveryResponse && deliveryResponse.data) {
                setDeliveryData(deliveryResponse.data);

                const deliveryAddress = deliveryResponse.data.deliveryAddress;
                // Phân tách chuỗi địa chỉ thành các thành phần
                const addressParts = deliveryAddress.split(', ');
                const [selectedProvince, selectedDistrict, selectedWard, detailedAddress] = addressParts.reverse();
                setDetailedAddress(detailedAddress);
                setSelectedWard(selectedWard);
                setSelectedDistrict(selectedDistrict);
                setSelectedProvince(selectedProvince);
            }

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


    //updateStatus
    const handleConfirmDetail = async (orderId) => {

        try {
            await axiosInstance.put(`/order/admin/update-status/${orderId}/${storedUserId}?status=3`);

            toast.success('Đơn hàng hoàn thành', { autoClose: 2000 });
            fetchData();
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
            toast.error('Lỗi khi xác nhận đơn hàng');

        }
    };

    const handleConfirm = async () => {

        if (selectedIds.length === 0) {
            toast.warning('Mời chọn ít nhất một đơn hàng.');
            return;
        }
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn xác nhận các đơn hàng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: async () => {
                        try {
                            await Promise.all(selectedIds.map(async (id) => {
                                await axiosInstance.put(`/order/admin/update-status/${id}/${storedUserId}?status=3`);
                            }));
                            fetchData();
                            toast.success("Đơn hàng hoàn thành", { autoClose: 2000 });
                            window.location.reload();
                        } catch (error) {
                            console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
                        }
                    },
                },
                {
                    label: 'Không',
                    onClick: () => {
                    },
                },
            ],
        });
    };


    const paymentMethodColors = {
        1: { color: "success", label: "COD" },
        2: { color: "primary", label: "Ví điện tử" },
        3: { color: "info", label: "Chuyển khoản" },
        4: { color: "warning", label: "Tiền mặt" },
    };

    const getPaymentMethodText = (method) => {
        switch (method) {
            case 1:
                return "Thanh toán sau khi nhận hàng";
            case 2:
                return "Ví điện tử";
            case 3:
                return "Chuyển khoản";
            case 4:
                return "Tiền mặt";
            default:
                return "";
        }
    };

    //Export
    const [selectedDate, setSelectedDate] = useState(null);

    const handleExport = async () => {
        try {

            let requestData = {
                status: 2,
            };

            if (selectedDate) {
                requestData.date = selectedDate.format('YYYY-MM-DD');
            }

            const response = await axiosInstance.get('/order/admin/export', {
                params: requestData,
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const blob = new Blob([response], { type: 'application/excel' });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'duong.xlsx';
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success('Xuất dữ liệu thành công!');
            setSelectedDate(null);
        } catch (error) {
            console.error('Lỗi khi xuất dữ liệu:', error);
            toast.error('Có lỗi xảy ra khi xuất dữ liệu.');
        }
    };

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

                        <Col className="text-right">
                            <DatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} />
                            <Popconfirm
                                title="Xác nhận xuất dữ liệu?"
                                onConfirm={handleExport}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button className="ml-2 bg-gradient-info" size="sm">
                                    <i className="fa-solid fa-arrow-up-from-bracket" style={{ color: "#fff" }} />
                                </Button>
                            </Popconfirm>
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
                                <th scope="col" style={{ color: "black" }}>STT</th>
                                <th scope="col" className="text-dark">Mã hóa đơn</th>
                                <th scope="col" className="text-dark">Khách hàng</th>
                                <th scope="col" className="text-dark">Số điện thoại</th>
                                <th scope="col" className="text-dark">Tổng tiền</th>
                                <th scope="col" className="text-dark">Thanh toán</th>
                                <th scope="col" className="text-dark">Nhân viên</th>
                                <th scope="col" className="text-dark">Ngày mua</th>
                                <th scope="col" className="text-dark">Ngày xác nhận</th>
                                <th scope="col" className="text-dark" style={{ position: "sticky", zIndex: '1', right: '0' }}>Thao tác</th>
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
                                            <td className="text-center">{calculateIndex(index)}</td>
                                            <td>{confirm.code}</td>
                                            <td>{confirm.fullnameClient}</td>
                                            <td>{confirm.phoneNumber}</td>
                                            <td className="text-right">{formatter.format(confirm.totalPayment)}</td>
                                            <td className="text-center">
                                                <Badge color={paymentMethodColors[confirm.paymentMethod]?.color || "secondary"}>
                                                    {paymentMethodColors[confirm.paymentMethod]?.label || "Không xác định"}
                                                </Badge>
                                            </td>

                                            <td>{confirm.fullnameStaff}</td>
                                            <td>{format(new Date(confirm.createdTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                            <td>{format(new Date(confirm.updatedTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                            <td className="text-center d-flex" style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff" }}>
                                                <Tooltip title="Xác nhận">
                                                    <Popconfirm
                                                        title="Xác nhận đơn hàng?"
                                                        onConfirm={() => handleConfirmDetail(confirm.id)}
                                                        okText="Xác nhận"
                                                        cancelText="Hủy"
                                                    >
                                                        <Button color="link" size="sm">
                                                            <FaRegHandPointLeft />
                                                        </Button>
                                                    </Popconfirm>
                                                </Tooltip>
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

                    <Row className="mt-4">
                        <Col lg={6}>
                            <div style={{ fontSize: 14 }}>
                                Đang xem <b>{queryParams.page * queryParams.size + 1}</b>  đến <b>{queryParams.page * queryParams.size + confirm.length}</b> trong tổng số <b></b> mục
                            </div>
                        </Col>
                        <Col style={{ fontSize: 14 }} lg={2}>
                            <Row>
                                <span>Xem </span>&nbsp;
                                <span>
                                    <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" className="mt--1" onChange={handleSizeChange}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </Input>
                                </span>&nbsp;
                                <span> mục</span>
                            </Row>
                        </Col>
                        <Col lg={4} style={{ fontSize: 11 }} className="mt--1 text-right">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                pageRangeDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="<"
                                onPageChange={handlePageChange}
                                renderOnZeroPageCount={null}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                marginPagesDisplayed={1}
                            />
                        </Col>

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
                                        <Row>
                                            {formData.fullnameClient && (
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>
                                                            Khách hàng
                                                        </Label>
                                                        <Input
                                                            size="sm"
                                                            type="text"
                                                            value={formData.fullnameClient}
                                                            readOnly style={{ backgroundColor: "#fff" }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            )}
                                            {formData.phoneNumber && (
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>
                                                            Số điện thoại
                                                        </Label>
                                                        <Input
                                                            size="sm"
                                                            type="tel"
                                                            value={formData.phoneNumber}
                                                            readOnly style={{ backgroundColor: "#fff" }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <h3 className="heading-small text-dark">Thông tin phiếu giao</h3>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>
                                                        Người nhận
                                                    </Label>
                                                    <Input
                                                        size="sm"
                                                        type="text"
                                                        value={deliveryData.recipientName}
                                                        readOnly style={{ backgroundColor: "#fff" }}
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
                                                        <option value="">Chọn tỉnh/thành phố</option>
                                                        {provinces.map((province) => (
                                                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                                                {province.ProvinceName}
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
                                                        <option value="">Chọn quận/huyện</option>
                                                        {selectedProvince &&
                                                            districts.map((district) => (
                                                                <option key={district.DistrictID} value={district.DistrictID}>
                                                                    {district.DistrictName}
                                                                </option>
                                                            ))}
                                                    </Input>

                                                    <Input
                                                        className="mb-2"
                                                        size="sm"
                                                        type="select"
                                                        style={{ fontSize: 13 }}
                                                        value={selectedWard}
                                                        disabled={!selectedDistrict}
                                                    >
                                                        <option value="">Chọn xã/phường</option>
                                                        {selectedDistrict &&
                                                            wards.map((ward) => (
                                                                <option key={ward.WardCode} value={ward.WardCode}>
                                                                    {ward.WardName}
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
                                        <Row>
                                            <Col md={12}>
                                                <h3 className="heading-small text-dark">Thanh toán</h3>
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
                                                    value={formData.totalMoney}
                                                    readOnly style={{ backgroundColor: "#fff" }}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>VND</InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>


                                        <Row >
                                            {formData.percentPeriod && formData.percentPeriod !== -1 && (
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
                                            )}
                                            {(formData.percentVoucher || formData.priceVoucher) && (
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
                                                                <InputGroupText>{formData.percentVoucher ? "%" : "VND"}</InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            )}
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
                                                    value={formData.totalPayment}
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
                                                {getPaymentMethodText(formData.paymentMethod)}
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
                                                                    <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.imgUri}`}
                                                                        alt=""
                                                                        style={{ width: "60px", height: "45px" }}
                                                                    />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <h5>{product.shoesName}</h5>
                                                                    <small className="mr-1">Màu: {product.colorName}</small>
                                                                    <small>Size: {product.sizeName}</small>

                                                                </Col>
                                                            </Row>

                                                        </td>
                                                        <td className="text-center">{product.quantity}</td>
                                                        <td className="text-right">{formatter.format(product.price)}</td>
                                                        <td className="text-right">{formatter.format(product.totalPrice)}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                    {formData.imageFreeGift && formData.nameFreeGift && (
                                        <div style={{ padding: "15px 0 5px 0", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                                            <div className="item d-flex">
                                                <div className="product-container mr-4 ml-5">
                                                    <img
                                                        src={`data:image/jpeg;base64,${formData.imageFreeGift}`}
                                                        alt={formData.nameFreeGift}
                                                        style={{ width: "50px" }}
                                                    />
                                                    <div className="quantity-badge">
                                                        <span className="quantity">1</span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-warning text-center" style={{ border: "1px solid", fontSize: 11, width: 60 }}>Quà tặng</div>
                                                    <div className="small mt-1">{formData.nameFreeGift}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
