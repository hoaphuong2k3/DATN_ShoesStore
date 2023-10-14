import React, { useState } from "react";
import { Card, CardBody, Container, Row, Button, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "components/Headers/ProductHeader";

const Checkout = () => {
    const [showVoucherModal, setShowVoucherModal] = useState(false);

    const handleOpenVoucherModal = () => {
        setShowVoucherModal(true);
    };

    const handleCloseVoucherModal = () => {
        setShowVoucherModal(false);
    };

    return (
        <>
            <Header />
            <Container className="mt-5">
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardBody className="row">
                                <div className="col-12">
                                    <h1 className="text-dark text-center d-flex align-items-center justify-content-center">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/2435/2435281.png"
                                            width="40px"
                                            height="40px"
                                            className="mr-3"
                                            alt="Icon"
                                        />
                                        Thanh toán
                                    </h1>
                                </div>
                                <div className="col-12">
                                    <hr color="orange" width="300px" className="mb-5" />
                                </div>
                                <div className="col-md-7">
                                    <div className="item d-flex mb-2">
                                        <img
                                            src="https://laforce.vn/wp-content/uploads/2022/12/giay-tay-nam-GNLAAZ01-1-D-108x136.jpg"
                                            alt="Giày da nam kiểu dáng Oxford GNLAAZ01-1-D"
                                            className="mr-3"
                                        />
                                        <div>
                                            <div className="text-dark mt-3">Giày da nam kiểu dáng Oxford GNLAAZ01-1-D</div>
                                            <div className="text-uppercase text-muted small mt-2">Màu hồng, size 34</div>
                                            <div className="text-danger small mt-2">441.000đ</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <Card style={{ backgroundColor: "#f7f7f7", marginBottom: "26px" }}>
                                        <CardBody>
                                            <div className="p-2 d-flex">
                                                <p className="mr-5 text-dark font-weight-bold mt-1">
                                                    <FontAwesomeIcon icon={faTicketAlt} style={{ color: "gray", marginRight: "  5px" }} />
                                                    ShoesVouchers</p>
                                                <a onClick={handleOpenVoucherModal} className=" mt-1 ml-5 pointer">
                                                    Chọn vouchers
                                                </a>
                                            </div>
                                            <style>
                                                {
                                                    `
                                                    .pointer {
                                                        cursor: pointer;
                                                    }
                                                    `
                                                }
                                            </style>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <div className="justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <h3 className="mr-3 text-dark font-weight-bold mt-1">TẠM TÍNH</h3>
                                                    {/* <span className="badge badge-info">2</span> */}
                                                </div>
                                                <div>
                                                    <span className="mr-2">Tạm tính</span>
                                                    <span className="text-dark font-weight-bold" style={{float: "right"}}>981.000đ</span>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>

            <Modal isOpen={showVoucherModal} toggle={handleCloseVoucherModal}>
                <ModalHeader toggle={handleCloseVoucherModal}>Danh sách vouchers</ModalHeader>
                <ModalBody>
                    <h1>Danh sách vouchers</h1>
                </ModalBody>
                <ModalFooter>
                    <a color="secondary" onClick={handleCloseVoucherModal}>
                        Đóng
                    </a>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Checkout;