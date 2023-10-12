import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table } from "reactstrap";

import Header from "components/Headers/Header.js";


const Promotion = () => {

    const [selectedValueType, setSelectedValueType] = useState(null);
    const [selectedValueType2, setSelectedValueType2] = useState(null);

    const [selectedTypeFilter, setSelectedTypeFilter] = useState("Loại");
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("Trạng thái");
    const [discountTypeFilter, setDiscountTypeFilter] = useState("Hình thức");

    const [filteredDiscounts, setFilteredDiscounts] = useState([]);

    const [discounts, setDiscounts] = useState([]);
    const [product, setProducts] = useState([]);

    //loads table
    useEffect(() => {
        const fetchData = async () => {
            try {
                const discountsData = await axiosInstance.get("/vouchers/getAll");
                setDiscounts(discountsData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    //lọc
    useEffect(() => {
        const filteredDiscounts = discounts.filter((discount) => {
            const typeCondition =
                selectedTypeFilter === "Loại" ||
                (discount.discountType === 2 && selectedTypeFilter === "Hóa đơn") ||
                (discount.discountType !== 2 && selectedTypeFilter === "Sản phẩm");

            const statusCondition =
                selectedStatusFilter === "Trạng thái" ||
                (discount.status === 2 && selectedStatusFilter === "Đang hoạt động") ||
                (discount.status !== 2 && selectedStatusFilter === "Chờ hoạt động");

            const discountTypeCondition =
                discountTypeFilter === "Hình thức" ||
                (discountTypeFilter === "Tiền" && discount.salePrice !== null) ||
                (discountTypeFilter === "Phần trăm" && discount.salePercent !== null);

            return typeCondition && statusCondition && discountTypeCondition;
        });

        setFilteredDiscounts(filteredDiscounts);
    }, [selectedTypeFilter, selectedStatusFilter, discountTypeFilter, discounts]);

    //click on selected
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        discountType: "",
        salePercent: "",
        minPrice: "",
        salePrice: "",
        sale: "",
    });

    function convertISOToCustomDateTime(isoDateString) {
        const isoDateTime = new Date(isoDateString);
        const day = isoDateTime.getDate().toString().padStart(2, '0');
        const month = (isoDateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = isoDateTime.getFullYear();
        let hours = isoDateTime.getHours();
        const minutes = isoDateTime.getMinutes().toString().padStart(2, '0');
        let period = 'SA';
        if (hours >= 12) {
            period = 'CH';
            if (hours > 12) {
                hours -= 12;
            }
        }

        return `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
    }

    const handleRowClick = (discount) => {
        setFormData({
            id: discount.id,
            code: discount.code,
            name: discount.name,
            startDate: convertISOToCustomDateTime(discount.startDate),
            endDate: convertISOToCustomDateTime(discount.endDate),
            description: discount.description,
            discountType: discount.discountType,
            salePercent: discount.salePercent || "",
            minPrice: discount.minPrice || "",
            salePrice: discount.salePrice || "",
        });
        if (discount.salePercent) {
            setSelectedValueType(true);
        } else if (discount.salePrice) {
            setSelectedValueType(false);
        } else {
            setSelectedValueType(null);
        }

        if (discount.discountType === 2) {
            setSelectedValueType2(2);
        } else if (discount.discountType === 1) {
            setSelectedValueType2(1);
        } else {
            setSelectedValueType2(null);
        }
    };

    //reset
    const resetForm = () => {
        setFormData({
            code: "",
            name: "",
            startDate: "",
            endDate: "",
            description: "",
            discountType: "",
            salePercent: "",
            minPrice: "",
            salePrice: "",

        });
        setSelectedValueType(null);
        setSelectedValueType2(null);
    };

    //add
    const addDiscount = async () => {
        try {
            const response = await axiosInstance.post('/vouchers/createVoucher', {


                // type: selectedValueType2,
                code: formData.code,
                name: formData.name,
                startDate: formData.startDate,
                endDate: formData.endDate,
                description: formData.description,
                // discountType: formData.discountType,
                salePercent: formData.salePercent,
                minPrice: formData.minPrice,
                salePrice: formData.salePrice,
                sale: selectedValueType,
            });

        console.log(response.data);
        toast.success("Thêm thành công!");
    } catch (error) {
        console.error("Error creating discount:", error);
        toast.error("Đã có lỗi xảy ra khi thêm dữ liệu. Vui lòng thử lại sau.");
    }
};

//update
const updateDiscount = () => {
    const updateData = {
        name: formData.name,
        start_date: formData.start_date,
        end_date: formData.end_date,
        description: formData.description,
        discounts_type: formData.discounts_type,
    };


    if (selectedValueType === 'percent') {
        updateData.sale_percent = formData.sale_percent;
    } else {
        updateData.min_price = formData.min_price;
        updateData.sale_price = formData.sale_price;
    }

    axiosInstance.put(`https://651d650344e393af2d59b053.mockapi.io/discounts/${formData.id}`, updateData)
        .then(response => {

            axiosInstance.get('https://651d650344e393af2d59b053.mockapi.io/discounts')
                .then((response) => {
                    setDiscounts(response.data);
                    toast.success("Cập nhật thành công!");
                    resetForm();
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy dữ liệu mới:', error);
                });
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
        });
};

const handleStatusChange = (discount) => {

    const updatedDiscounts = discounts.map((d) => {
        if (d.id === discount.id) {
            return { ...d, status: d.status === 0 ? 1 : 0 };
        }
        return d;
    });

    setDiscounts(updatedDiscounts);

    axiosInstance.put(`https://651d650344e393af2d59b053.mockapi.io/discounts/${discount.id}`, { status: discount.status === 0 ? 1 : 0 })
        .then(response => {
            console.log("Cập nhật trạng thái thành công!");
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        });
};


//delete
const confirmDelete = () => {
    return window.confirm("Bạn có chắc chắn muốn xóa khuyến mại này không?");
};
const deleteDiscount = (id) => {
    if (confirmDelete()) {
        axiosInstance.delete(`/vouchers/deleteVoucher/${id}`)
            .then(response => {
                const updatedDiscounts = discounts.filter(discount => discount.id !== id);
                setDiscounts(updatedDiscounts);
                toast.success("Xóa thành công");
            })
            .catch(error => {
                console.error('Lỗi khi xóa dữ liệu:', error);
            });
    }
};

return (
    <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
            <Row>
                <Col>
                    {/* Tabs with icons */}
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">

                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Khuyến mại</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            className="btn btn-outline-primary"
                                            onClick={addDiscount}
                                            size="sm"
                                        >
                                            Thêm mới
                                        </Button>
                                        <Button
                                            className="btn btn-outline-primary"
                                            onClick={updateDiscount}
                                            size="sm"
                                        >
                                            Cập nhật
                                        </Button>

                                        <Button
                                            className="btn btn-outline-primary"
                                            onClick={resetForm}
                                            size="sm"
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Thông tin
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="code"
                                                    >
                                                        Loại:
                                                    </label>
                                                    <div style={{ display: "flex" }}>
                                                        <div className="custom-control custom-radio">
                                                            <Input
                                                                className="custom-control-alternative"
                                                                name="type"
                                                                type="radio"
                                                                checked={selectedValueType2 === 1}
                                                                onChange={() => setSelectedValueType2(1)}
                                                            />Hóa đơn
                                                        </div>
                                                        <div className="custom-control custom-radio">
                                                            <Input
                                                                className="custom-control-alternative"
                                                                name="type"
                                                                type="radio"
                                                                checked={selectedValueType2 === 2}
                                                                onChange={() => setSelectedValueType2(2)}
                                                            />Sản phẩm
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            {selectedValueType2 === 1 && (
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="startDate"
                                                        >
                                                            Hóa đơn tối thiểu:
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="number"
                                                            value={formData.minPrice}
                                                            onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            )}

                                            <Col lg="3">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-price">
                                                        Hình thức
                                                    </label>
                                                    <div style={{ display: "flex" }}>
                                                        <div className="custom-control custom-radio">
                                                            <Input
                                                                className="custom-control-alternative"
                                                                name="sale"
                                                                type="radio"
                                                                checked={selectedValueType === true}
                                                                onChange={() => setSelectedValueType(true)}
                                                            />Phần trăm
                                                        </div>
                                                        <div className="custom-control custom-radio">
                                                            <Input
                                                                className="custom-control-alternative"
                                                                name="sale"
                                                                type="radio"
                                                                checked={selectedValueType === false}
                                                                onChange={() => setSelectedValueType(false)}
                                                            />Tiền
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>

                                            {selectedValueType === true && (
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="startDate"
                                                        >
                                                            Phần trăm:
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="number"
                                                            value={formData.salePercent}
                                                            onChange={(e) => setFormData({ ...formData, salePercent: e.target.value })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            )}

                                            {selectedValueType === false && (
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="startDate"
                                                        >
                                                            Trị giá (tiền):
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="number"
                                                            value={formData.salePrice}
                                                            onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            )}
                                        </Row>


                                        <Row>

                                            <Col lg="3">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="code"
                                                    >
                                                        Mã KM
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="code"
                                                        type="text"
                                                        value={formData.code}
                                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="name"
                                                    >
                                                        Tên KM
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="name"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="3">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="startDate"
                                                    >
                                                        Ngày bắt đầu
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="startDate"
                                                        type="datetime-local"
                                                        value={formData.startDate}
                                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="endDate"
                                                    >
                                                        Ngày kết thúc
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="endDate"
                                                        type="datetime-local"
                                                        value={formData.endDate}
                                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col className="pl-lg-4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="description"
                                                    >
                                                        Mô tả
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        placeholder="Sản phẩm ....."
                                                        rows="4"
                                                        type="textarea"
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            {selectedValueType2 === 2 && (
                                                <Col lg="12">
                                                    <h6 className="heading-small text-muted mb-4">
                                                        Sản phẩm áp dụng
                                                    </h6>
                                                    <Table className="align-items-center table-flush" responsive>
                                                        <thead className="thead-light">

                                                            <tr className="text-center">
                                                                <th scope="col">#</th>
                                                                <th scope="col">Tên sản phẩm</th>
                                                                <th scope="col">Thương hiệu</th>
                                                                <th scope="col">Giá gốc</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {product.map((product, index) => (
                                                                <tr>
                                                                    <td className="text-center"><Input type="checkbox" /></td>
                                                                    <td>{product.name}</td>
                                                                    <td>{product.brand}</td>
                                                                    <td>{product.price}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            )}

                                        </Row>

                                    </div>


                                </Form>
                                {/* Description */}
                                <hr className="my-4" />
                                <Col style={{ display: "flex" }}>
                                    <h6 className="heading-small text-muted mb-4">Danh sách</h6>
                                    <div className="col-2">
                                        <Input
                                            type="select"
                                            size="sm"
                                            value={selectedTypeFilter}
                                            onChange={(e) => setSelectedTypeFilter(e.target.value)}
                                        >
                                            <option>Loại</option>
                                            <option>Hóa đơn</option>
                                            <option>Sản phẩm</option>
                                        </Input>
                                    </div>
                                    <div className="col-2">
                                        <Input
                                            type="select"
                                            size="sm"
                                            value={discountTypeFilter}
                                            onChange={(e) => setDiscountTypeFilter(e.target.value)}
                                        >
                                            <option>Hình thức</option>
                                            <option>Tiền</option>
                                            <option>Phần trăm</option>
                                        </Input>
                                    </div>

                                    <div className="col-2">
                                        <Input
                                            type="select"
                                            size="sm"
                                            value={selectedStatusFilter}
                                            onChange={(e) => setSelectedStatusFilter(e.target.value)}
                                        >
                                            <option>Trạng thái</option>
                                            <option>Chờ hoạt động</option>
                                            <option>Đang hoạt động</option>
                                            <option>Hết hạn</option>
                                        </Input>
                                    </div>
                                </Col>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Code</th>
                                            <th scope="col">Loại</th>
                                            <th scope="col">Tên khuyến mại</th>
                                            <th scope="col">Mô tả</th>
                                            <th scope="col">Hóa đơn <br />tối thiểu</th>
                                            <th scope="col">Phần trăm (%)</th>
                                            <th scope="col">Tiền</th>
                                            <th scope="col">Ngày bắt đầu</th>
                                            <th scope="col">Ngày kết thúc</th>
                                            <th scope="col">Trạng thái</th>
                                            <th scope="col">Hành động</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(filteredDiscounts) &&
                                            filteredDiscounts.map((discount, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{discount.code}</td>
                                                    <td>{discount.discountType === 1 ? "Hóa đơn" : "Sản phẩm"}</td>
                                                    <td>{discount.name}</td>
                                                    <td>{discount.description}</td>
                                                    <td>{discount.minPrice}</td>
                                                    <td>{discount.salePercent}</td>
                                                    <td>{discount.salePrice}</td>
                                                    <td>{discount.startDate}</td>
                                                    <td>{discount.endDate}</td>
                                                    <td>
                                                        <label className="custom-toggle">
                                                            <input
                                                                checked={discount.status === 2}
                                                                type="checkbox"
                                                                onChange={() => handleStatusChange(discount)}
                                                            />
                                                            <span className="custom-toggle-slider rounded-circle" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <Button color="info" size="sm" onClick={() => handleRowClick(discount)}><FaEdit /></Button>
                                                        <Button color="danger" size="sm" onClick={() => deleteDiscount(discount.id)}><FaTrash /></Button>
                                                    </td>

                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    </>
);
}

export default Promotion;
