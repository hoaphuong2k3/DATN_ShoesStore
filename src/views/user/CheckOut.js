import React from "react";
import { useState } from "react";
import Select from "react-select";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Table,
    Input,
    Button,
} from "reactstrap";
import Header from "components/Headers/ProductHeader";

const Checkout = () => {


    const provinces = [
        { value: "tpHCM", label: "TP. Hồ Chí Minh" },
        { value: "haNoi", label: "Hà Nội" }

    ];
    const districts = {
        tpHCM: [
            { value: "quan1", label: "Quận 1" },
            { value: "quan3", label: "Quận 3" }

        ],
        haNoi: [
            { value: "quanCauGiay", label: "Quận Cầu Giấy" },
            { value: "quanHoangMai", label: "Quận Hoàng Mai" }
            // Thêm các quận huyện của Hà Nội khác
        ],
    }
    const ward = {
        tpHCM: [
            {
                quan1: [
                    { value: "benNghe", label: "Phường Bến Nghé" },
                    { value: "benThanh", label: "Phường Bến Thành" }
                ],
                quan3: [
                    { value: "voThiSau", label: "Phường Võ Thị Sáu" },
                    { value: "phuong1", label: "Phường 01" }
                ]
            }
        ],
        haNoi: [
            {
                quanCauGiay: [
                    { value: "maiDich", label: "Phường Mai Dịch" },
                    { value: "dichVong", label: "Phường Dịch Vọng" }
                ],
                quanHoangMai: [
                    { value: "giapBat", label: "Phường Giáp Bát" },
                    { value: "thanhTri", label: "Phường Thanh Trì" }
                ]
            }
        ],
    }
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedDistrict(null);
    };

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        setSelectedWard(null);
    };

    const handleWardChange = (selectedOption) => {
        setSelectedWard(selectedOption);
    };


    return (
        <>
            <Header />
            <Container className="mt-5">
                <Row>
                    <div className="col-md-6">
                        <Card className="shadow">
                            <CardBody>
                                <div className="inner">
                                    <h3 className="text-dark">Thông tin thanh toán</h3>
                                    <form action="/checkout" method="post" noValidate className="checkout table-wrap medium--hide small--hide">
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    placeholder="Họ và tên"
                                                />
                                            </div>
                                            <div className="form-group col-md-8">
                                                <Input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <Input
                                                    type="tel"
                                                    className="form-control"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    placeholder="Điện thoại"
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    name="address"
                                                    required
                                                    placeholder="Địa chỉ"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Select
                                                    value={selectedProvince}
                                                    onChange={handleProvinceChange}
                                                    options={provinces}
                                                    placeholder="Tỉnh thành"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Select
                                                    value={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    options={selectedProvince ? districts[selectedProvince.value] : []}
                                                    placeholder="Quận huyện"
                                                    isDisabled={!selectedProvince}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Select
                                                    value={selectedWard}
                                                    onChange={handleWardChange}
                                                    options={
                                                        selectedDistrict && selectedProvince && ward[selectedProvince.value][0]
                                                            ? ward[selectedProvince.value][0][selectedDistrict.value] || []
                                                            : []
                                                    }
                                                    placeholder="Phường"
                                                    isDisabled={!selectedDistrict}
                                                />
                                            </div>
                                        </div>
                                        <Button className="btn btn-info">Phương thức thanh toán</Button>
                                    </form>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card className="shadow bg-light">
                            <CardBody>
                                <div className="inner row">
                                    {/* <h1>Thông tin chi tiết sản phẩm</h1> */}
                                    <div className="col-md-2">
                                        <img src="https://laforce.vn/wp-content/uploads/2022/12/giay-tay-nam-GNLAAZ01-1-D-108x136.jpg" alt="Giày da nam kiểu dáng Oxford GNLAAZ01-1-D" />
                                    </div>
                                    <p className="text-dark small col-md-6 ml-5">Giày da nam kiểu dáng Oxford GNLAAZ01-1-D</p>
                                    <p className="text-dark small col-md-2">3,600,000₫</p>
                                </div>
                                <hr></hr>
                                <div className="inner row">
                                    <Input type="text" className="w-75 ml-2 mr-2" placeholder="Mã giảm giá" />
                                    <Button className="btn h-25">Sử dụng</Button>
                                </div>
                                <hr></hr>
                                <div className="inner row">
                                    <p className="text-dark ml-2 col-md-7">Tạm tính</p>
                                    <p className="text-dark  col-md-4">3,600,000₫</p>
                                    <p className="text-dark ml-2 col-md-7">Phí ship</p>
                                    <p className="text-dark  col-md-4">Miễn Phí</p>
                                </div>
                                <hr></hr>
                                <div className="inner row">
                                    <h3 className="text-dark col-md-7 ml-2">Tổng Tiền</h3>
                                    <h3 className="text-dark col-md-4">VND 3,600,000₫</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Checkout;