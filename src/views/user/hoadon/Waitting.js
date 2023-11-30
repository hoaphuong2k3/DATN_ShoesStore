import React, { useState, useEffect } from "react";
import axios from "services/custommize-axios";
import axiosInstance from "services/custommize-axios";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { connect } from 'react-redux';
import { updateData } from './actions';
// reactstrap components
import {
    Badge, Row, Col, Button, Table, Input, FormGroup, InputGroup,
    InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, Card, CardHeader, CardBody, CardFooter
} from "reactstrap";
import { FaRegEdit, FaSearch, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

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
            const response = await axios.get(`http://localhost:33321/api/order/order-detail/${storedUserId}?status=1`);
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
    const [modalDetail, setModalDetail] = useState(false);
    const toggleDetail = () => {
        setModalDetail(!modalDetail);
        // fetchData();
    };
    const steps = [
        { label: 'Đơn hàng đã đặt', date: '01:32 25-10-2023', status: 'finish' },
        { label: 'Đơn hàng đã thanh toán (₫5.600)', date: '01:33 25-10-2023', status: 'finish' },
        { label: 'Đã giao cho ĐVVC', date: '15:19 25-10-2023', status: 'finish' },
        { label: 'Đã nhận được hàng', date: '07:48 30-10-2023', status: 'finish' },
        { label: 'Đánh giá', date: '', status: 'pending' },
    ];
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
                        <Card className="mb-4 shadow" onClick={toggleDetail}>
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
                            <CardBody>
                                {item.listCart && item.listCart.length > 0 && item.listCart.map((itemC, i) => (
                                    <>
                                        <Row key={itemC.id} className="">
                                            <Col lg="2">
                                                <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${itemC.imgUri}`} alt="" wight="70px" height="70px" />
                                            </Col>
                                            <Col lg="7">
                                                <div>
                                                    <b style={{ fontSize: "18px" }}>Tên sp</b>
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
                                        {(i + 1) < item.listCart.length && <hr />}
                                    </>
                                ))}
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col lg="4" style={{ color: "gray", fontSize: "14px" }}>
                                        <b> Ngày mua: </b> {formatDate(item.createTime)}
                                    </Col>
                                    <Col lg="8" className="d-flex justify-content-end">
                                        <span style={{ fontSize: "13px" }} className="mt-2">Thành tiền: &nbsp;</span>
                                        <span style={{ color: "red", fontSize: "24px" }}>{formatter.format(item.totalMoney)}</span>
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
                style={{ maxWidth: "900px" }}
            >
                <ModalHeader toggle={toggleDetail}>
                    <h3 className="heading-small text-muted mb-0">
                        Thông tin đơn hàng
                    </h3>
                </ModalHeader>
                <ModalBody>
                    <div className="mt--4">
                        <div className="bHBbO4">
                            <div className="stepper">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className={`stepper__step stepper__step--${step.status}`}
                                        aria-label={`${step.label}, ${step.date}`}
                                        tabIndex="0"
                                    >
                                        <div className={`stepper__step-icon stepper__step-icon--${step.status}`}>
                                            {/* Your SVG icon here */}
                                            {step.status === 'finish' ? (
                                                <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0">
                                                    {/* SVG path for finished step */}
                                                </svg>
                                            ) : (
                                                <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0">
                                                    {/* SVG path for pending step */}
                                                </svg>
                                            )}
                                        </div>
                                        <div className="stepper__step-text">{step.label}</div>
                                        <div className="stepper__step-date">{step.date}</div>
                                    </div>
                                ))}
                                <div className="stepper__line">
                                    <div className="stepper__line-background" style={{ background: 'rgb(224, 224, 224)' }}></div>
                                    <div
                                        className="stepper__line-foreground"
                                        style={{ width: 'calc((100% - 140px) * 1)', background: 'rgb(45, 194, 88)' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" outline size="sm" bloc onClick={toggleDetail}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    updateData: (tabId, newData) => dispatch(updateData(tabId, newData)),
});

export default connect(null, mapDispatchToProps)(Waitting);
