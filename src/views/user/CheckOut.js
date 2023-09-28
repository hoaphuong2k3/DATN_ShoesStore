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
            { value: "quan2", label: "Quận 2" }

        ],
        haNoi: [
            { value: "quanCauGiay", label: "Quận Cầu Giấy" },
            { value: "quanHaongMai", label: "Quận Hoàng Mai" }
            // Thêm các quận huyện của Hà Nội khác
        ],
    }

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedDistrict(null);
    };

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
    };


    return (
        <>
            {/* <Header /> */}
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
                                                    placeholder="Chọn tỉnh thành"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Select
                                                    value={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    options={selectedProvince ? districts[selectedProvince.value] : []}
                                                    placeholder="Chọn quận huyện"
                                                    isDisabled={!selectedProvince}
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
                                    
                                    <Input type="text" className="w-75 ml-2 mr-2" placeholder="Mã giảm giá"/>
                                    <Button className="btn h-25">Sử dụng</Button>
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