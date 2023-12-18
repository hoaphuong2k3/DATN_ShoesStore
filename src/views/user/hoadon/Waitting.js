import React, { useState, useEffect } from "react";
import axios from 'axios';
import axiosInstance from "services/custommize-axios";
import 'assets/css/hoadon.css';
// reactstrap components
import { Badge, Row, Col, Button, Table, Input, FormGroup, CardBody, CardFooter, InputGroup, InputGroupAddon, Card, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, CardHeader } from "reactstrap";
import { FaRegEdit, FaSearch, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import {
    MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Waitting = (props) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const formattedDate = `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
        return formattedDate;
    }
    const [list, setList] = useState([]);
    const storedUserId = localStorage.getItem("userId");
    const getAllConfirm = async () => {
        try {
            const response = await axiosInstance.get(`http://localhost:33321/api/order/order-detail/${storedUserId}?status=1`);
            console.log(response)
            if (response && response.content) {
                setList(response.content);
                console.log(response.content)
            }
        } catch (error) {
            console.error("Error:", error);
            console.error("Response data:", error.response.data);
        }
    }
    useEffect(() => {
        getAllConfirm();
    }, [props.activeTab]);
    const [itemDetail, setItemDetail] = useState({});
    const [modalDetail, setModalDetail] = useState(false);
    const toggleDetail = () => {
        setModalDetail(!modalDetail);
    };
    const [detailDiaChi, setDetailDiaChi] = useState("");
    const getOneOrder = async (id) => {
        try {
            const response = await axiosInstance.get(`http://localhost:33321/api/order/detail-bill/${id}`);
            console.log(response)
            if (response && response.data) {
                setItemDetail(response.data);
                const addressParts = response.data.addressDelivery.split(', ');
                const [selectedProvince, selectedDistrict, selectedWard, detailedAddress] = addressParts.reverse();
                console.log(detailedAddress, selectedProvince, selectedDistrict, selectedWard)
                try {
                    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                        headers: {
                            'token': '44022259-5cfb-11ee-96dc-de6f804954c9'
                        }
                    });
                    const filteredProvince = response.data.data.filter(user => selectedProvince === user.ProvinceID.toString());
                    console.log("địa chỉ", response.data.data)
                    console.log(filteredProvince);
                    try {
                        const res = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvince}`, {
                            headers: {
                                'token': '44022259-5cfb-11ee-96dc-de6f804954c9'
                            }
                        });
                        const filteredDistrict = res.data.data.filter(user => selectedDistrict === user.DistrictID.toString());
                        try {
                            const res2 = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrict}`, {
                                headers: {
                                    'token': '44022259-5cfb-11ee-96dc-de6f804954c9'
                                }
                            });
                            const filteredWard = res2.data.data.filter(user => selectedWard === user.WardCode.toString());
                            setDetailDiaChi(`${detailedAddress}, ${filteredWard[0].WardName}, ${filteredDistrict[0].DistrictName}, ${filteredProvince[0].ProvinceName}`)

                        } catch (error) {
                            console.error(`Lỗi khi lấy dữ liệu từ xã`, error);
                        }
                    } catch (error) {
                        console.error(`Lỗi khi lấy dữ liệu từ huyện `, error);
                    }
                } catch (error) {
                    console.error(`Lỗi khi lấy dữ liệu tỉnh:`, error);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            console.error("Response data:", error.response.data);
        }
    }
    const handleDetail = (id) => {
        getOneOrder(id);
        setModalDetail(true);
    }
    const huyDonHang = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn hủy đơn hàng này ?")) {
            try {
                await axiosInstance.put(`/order/confirm`, {
                    "idClient": storedUserId,
                    "idOrder": id,
                    "status": 7
                });
                getAllConfirm();
                toast.success("Hủy đơn hàng thành công");
            } catch (error) {
                let errorMessage = "Lỗi từ máy chủ";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                toast.error(errorMessage);
            }
        }
    }
    let navigate = useNavigate();
    const chuyenHuong = (idShoes) => {
        navigate(`/shoes/productdetail/${idShoes}`);
    }
    return (
        <>
            <Row >
                <Col>
                    <Row className="align-items-center my-4">
                        <Col lg={4} style={{ display: "flex" }}>
                            <InputGroup size="sm">
                                <Input type="search"
                                    placeholder="Tìm kiếm hóa đơn"
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FaSearch color="black" />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                    {list && list.length > 0 && list.map((item, index) => (
                        <Card className="mb-4 shadow">
                            <CardHeader>
                                <Row>
                                    <Col lg="3"><b>{item.code}</b></Col>
                                    <Col lg="9" className="d-flex justify-content-end" style={{ color: "blue", fontSize: "15px" }}>
                                        {item.status === 0 &&
                                            <>
                                                Đơn hàng đang được chờ xác nhận
                                            </>
                                        }
                                        {item.status === 1 && "Chờ vận chuyển"}
                                        {item.status === 2 && "Đang vận chuyển"}
                                        {item.status === 3 && "Đơn hàng giao thành công"}
                                        {item.status === 6 && "Đã nhận hàng"}
                                        {item.status === 7 && "Hủy "}
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody onClick={() => handleDetail(item.id)}>
                                {item.listCart && item.listCart.length > 0 && item.listCart.slice(0, 2).map((itemC, i) => (

                                    <>
                                        <Row key={itemC.id} className="">
                                            <Col lg="2">
                                                <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${itemC.imgUri}`} alt="" wight="70px" height="70px" />
                                            </Col>
                                            <Col lg="7">
                                                <div>
                                                    <b style={{ fontSize: "18px" }}>{itemC.shoesName}</b>
                                                </div>
                                                <div style={{ color: "gray", fontSize: "14px" }}>
                                                    Size: {itemC.sizeName}, Màu :{itemC.colorName}
                                                </div>
                                                <div style={{ color: "black", fontSize: "14px" }}>
                                                    X {itemC.quantity}
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                {
                                                    itemC.discountPrice === null
                                                        ?
                                                        <>
                                                            <div className="d-flex justify-content-end" style={{ color: "red" }}>
                                                                {formatter.format(itemC.price)}
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            {itemC.discountPrice < itemC.price ?
                                                                <>
                                                                    <span className="d-flex justify-content-end">
                                                                        <div className="mt-1" style={{ color: "gray", fontSize: "12px", textDecoration: "line-through" }}>
                                                                            {formatter.format(itemC.price)}
                                                                        </div>&nbsp;&nbsp;
                                                                        <div style={{ color: "red" }}>
                                                                            {formatter.format(itemC.discountPrice)}
                                                                        </div>
                                                                    </span>
                                                                </> :
                                                                <>
                                                                    <div className="d-flex justify-content-end" style={{ color: "red" }}>
                                                                        {formatter.format(itemC.price)}
                                                                    </div>
                                                                </>
                                                            }
                                                        </>
                                                }
                                            </Col>
                                        </Row>
                                        {item.listCart.length > 2 ?
                                            <>{(i + 1) < 2 && <hr />}</>
                                            : <> {(i + 1) < item.listCart.length && <hr />}</>
                                        }
                                    </>
                                ))}
                                <Row>
                                    <Col lg="12" className="d-flex justify-content-end">
                                        <span style={{ fontSize: "13px" }} className="mt-2">Thành tiền:&nbsp;</span>
                                        <span style={{ color: "red", fontSize: "24px" }}>{formatter.format(item.totalPayment)}</span>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col lg="4" style={{ color: "gray", fontSize: "14px" }}>
                                        <b> Ngày mua: </b> {formatDate(item.createTime)}
                                    </Col>
                                    <Col lg="8" className="d-flex justify-content-end">
                                        <button class="evo-button mobile-viewmore" aria-label="35" aria-disabled="false"
                                            style={{ backgroundColor: '#cccccc' }}
                                            onClick={() => huyDonHang(item.id)}
                                        >
                                            Hủy đơn hàng
                                        </button>
                                    </Col>
                                </Row>

                            </CardFooter>
                        </Card>
                    ))}
                </Col>
            </Row >
            <Modal
                isOpen={modalDetail}
                toggle={toggleDetail}
                backdrop={"static"}
                keyboard={false}
                style={{ maxWidth: "1000px" }}
            >
                <ModalHeader toggle={toggleDetail}>
                    <h3 className="heading-small text-muted mb-0">
                        Thông tin đơn hàng
                    </h3>
                </ModalHeader>
                <ModalBody>
                    <>
                        <MDBContainer className="mt--5 mb-5">
                            <MDBRow className="justify-content-center align-items-center">
                                <MDBCol size="12">
                                    <MDBCard
                                        className="card-stepper text-black border-0"
                                        style={{ borderRadius: "16px" }}
                                    >
                                        <div className="p-5 pt--5">
                                            <ul
                                                id="progressbar-2"
                                                className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                                            >
                                                <li className="step0 active text-center" id="step1" ></li>
                                                <li className="step0 active text-muted text-center" id="step22"></li>
                                                <li className="step0 text-muted text-center" id="step3"></li>
                                                <li className="step0 text-muted text-center" id="step4"></li>
                                                <li className="step0 text-muted text-end" id="step5"></li>
                                            </ul>
                                            <div className="d-flex justify-content-between mt--5">
                                                <div className="d-lg-flex align-items-center ml--4">
                                                    <b>Chờ xác nhận</b>
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    <b>Chờ vận chuyển</b>
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    <b>Đang vận chuyển</b>
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    <b>Hoàn thành</b>
                                                </div>
                                                <div className="d-lg-flex align-items-center mr--6">
                                                    <b>Nhận hàng thành công</b>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-lg-flex align-items-center ml--5">
                                                    {formatDate(itemDetail.createTime)}
                                                </div>
                                            </div>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <Card className="shadow mt--5">
                            <CardHeader>
                                <b>THÔNG TIN ĐƠN HÀNG</b>
                            </CardHeader>
                            <CardBody>
                                <Row className="mb-3">
                                    <Col lg={1}></Col>
                                    <Col lg={2}><b>Mã hóa đơn:</b></Col>
                                    <Col lg={3}>{itemDetail.code}</Col>
                                    <Col lg={1}></Col>
                                    <Col lg={2}><b>Trạng thái:</b></Col>
                                    <Col lg={3}>
                                        <Badge color={'success'}>
                                            Chờ vận chuyển
                                        </Badge>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col lg={1}></Col>
                                    <Col lg={2}><b>Họ và tên:</b></Col>
                                    <Col lg={3}>{itemDetail.nameDelivery}</Col>
                                    <Col lg={1}></Col>
                                    <Col lg={2}><b>Số điện thoại:</b></Col>
                                    <Col lg={3}>{itemDetail.phonenumberDelivery}</Col>
                                </Row>
                                <Row>
                                    <Col lg={1}></Col>
                                    <Col lg={2}><b>Địa chỉ:</b></Col>
                                    <Col lg={9}>{detailDiaChi}</Col>
                                </Row>

                            </CardBody>
                        </Card>
                        <Card className="shadow mt-2">
                            <CardBody>
                                {itemDetail.listCart && itemDetail.listCart.length > 0 && itemDetail.listCart.map((itemC, i) => (
                                    <>
                                        <Row key={itemC.id} className="" onClick={() => chuyenHuong(itemC.idShoes)}>
                                            <Col lg={1} className="text-center">
                                                {i + 1}
                                            </Col>
                                            <Col lg="2">
                                                <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${itemC.imgUri}`} alt="" wight="70px" height="70px" />
                                            </Col>
                                            <Col lg="6">
                                                <div>
                                                    <b style={{ fontSize: "18px" }}>{itemC.shoesName}</b>
                                                </div>
                                                <div style={{ color: "gray", fontSize: "14px" }}>
                                                    Size: {itemC.sizeName}, Màu :{itemC.colorName}
                                                </div>
                                                <div style={{ color: "black", fontSize: "14px" }}>
                                                    X {itemC.quantity}
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                {
                                                    itemC.discountPrice === null
                                                        ?
                                                        <>
                                                            <div className="d-flex justify-content-end" style={{ color: "red" }}>
                                                                {formatter.format(itemC.price)}
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            {itemC.discountPrice < itemC.price ?
                                                                <>
                                                                    <span className="d-flex justify-content-end">
                                                                        <div className="mt-1" style={{ color: "gray", fontSize: "12px", textDecoration: "line-through" }}>
                                                                            {formatter.format(itemC.price)}
                                                                        </div>&nbsp;&nbsp;
                                                                        <div style={{ color: "red" }}>
                                                                            {formatter.format(itemC.discountPrice)}
                                                                        </div>
                                                                    </span>
                                                                </> :
                                                                <>
                                                                    <div className="d-flex justify-content-end" style={{ color: "red" }}>
                                                                        {formatter.format(itemC.price)}
                                                                    </div>
                                                                </>
                                                            }
                                                        </>
                                                }
                                            </Col>
                                        </Row>
                                        {(i + 1) < itemDetail.listCart.length && <hr />}
                                    </>
                                ))}
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col lg="10" className="d-flex justify-content-end">
                                        <span style={{ fontSize: "13px" }} className="mt-2">Tiền hàng: &nbsp;&nbsp;</span>
                                    </Col>
                                    <Col lg="2" className="d-flex justify-content-end">
                                        <span style={{ color: "red", fontSize: "20px" }}>{formatter.format(itemDetail.totalMoney)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="10" className="d-flex justify-content-end">
                                        <span style={{ fontSize: "13px" }} className="mt-2">Phí vận chuyển: &nbsp;&nbsp;</span>
                                    </Col>
                                    <Col lg="2" className="d-flex justify-content-end">
                                        <span style={{ color: "red", fontSize: "20px" }}>{formatter.format(itemDetail.shipPrice)}</span>
                                    </Col>
                                </Row>
                                {(itemDetail.totalPayment - itemDetail.shipPrice - itemDetail.totalMoney > 0) &&
                                    <Row>
                                        <Col lg="10" className="d-flex justify-content-end">
                                            <span style={{ fontSize: "13px" }} className="mt-2">Tiền giảm: &nbsp;&nbsp;</span>
                                        </Col>
                                        <Col lg="2" className="d-flex justify-content-end">
                                            <span style={{ color: "red", fontSize: "20px" }}>{formatter.format(itemDetail.totalPayment - itemDetail.shipPrice - itemDetail.totalMoney)}</span>
                                        </Col>
                                    </Row>
                                }
                                <Row>
                                    <Col lg="10" className="d-flex justify-content-end">
                                        <span style={{ fontSize: "13px" }} className="mt-2">Thành tiền: &nbsp;</span>
                                    </Col>
                                    <Col lg="2" className="d-flex justify-content-end">
                                        <span style={{ color: "red", fontSize: "24px" }}>{formatter.format(itemDetail.totalPayment)}</span>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" outline size="sm" bloc onClick={toggleDetail}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    );
};


export default Waitting;
