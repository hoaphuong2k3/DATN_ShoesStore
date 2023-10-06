import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/axiosInstance";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table } from "reactstrap";

import Header from "components/Headers/Header.js";


const Promotion = () => {

    const [selectedValueType, setSelectedValueType] = useState(null);

    const [discounts, setDiscounts] = useState([]);
    const [product, setProducts] = useState([]);

    //loads table
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [discountsData, productsData] = await Promise.all([
                    axiosInstance.get('https://651d650344e393af2d59b053.mockapi.io/discounts'),
                    axiosInstance.get('https://651d650344e393af2d59b053.mockapi.io/product')
                ]);

                setDiscounts(discountsData.data);
                setProducts(productsData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const [formData, setFormData] = useState({
        code: "",
        name: "",
        start_date: "",
        end_date: "",
        description: "",
        discounts_type: "",
        sale_percent: "",
        min_price: "",
        sale_price: "",

    });

    const handleRowClick = (discount) => {
        setFormData({
            id: discount.id,
            code: discount.code,
            name: discount.name,
            start_date: discount.start_date,
            end_date: discount.end_date,
            description: discount.description,
            discounts_type: discount.discounts_type,
            sale_percent: discount.sale_percent || "",
            min_price: discount.min_price || "",
            sale_price: discount.sale_price || "",
        });
        if (discount.sale_percent) {
            setSelectedValueType("percent");
        } else if (discount.min_price && discount.sale_price) {
            setSelectedValueType("money");
        } else {
            setSelectedValueType(null);
        }
    };

    //reset
    const resetForm = () => {
        setFormData({
            code: "",
            name: "",
            start_date: "",
            end_date: "",
            description: "",
            discounts_type: "",
            sale_percent: "",
            min_price: "",
            sale_price: "",
        });
        setSelectedValueType(null);
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
            axiosInstance.delete(`https://651d650344e393af2d59b053.mockapi.io/discounts/${id}`)
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
                                                onClick={(e) => e.preventDefault()}
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
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="code"
                                                        >
                                                            Khuyến mại theo:
                                                        </label>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="type"
                                                                    type="radio"
                                                                    value="0"
                                                                    checked={formData.discounts_type === 0}
                                                                    onChange={(e) => setFormData({ ...formData, discounts_type: parseInt(e.target.value) })}
                                                                />Hóa đơn
                                                            </div>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="type"
                                                                    type="radio"
                                                                    value="1"
                                                                    checked={formData.discounts_type === 1}
                                                                    onChange={(e) => setFormData({ ...formData, discounts_type: parseInt(e.target.value) })}
                                                                />Sản phẩm
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
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
                                                <Col lg="4">
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

                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-price">
                                                            Hình thức giảm
                                                        </label>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="price"
                                                                    type="radio"
                                                                    value="percent"
                                                                    checked={selectedValueType === "percent"}
                                                                    onChange={() => setSelectedValueType("percent")}
                                                                />Phần trăm (%)
                                                            </div>
                                                            <div className="custom-control custom-radio">
                                                                <Input
                                                                    className="custom-control-alternative"
                                                                    name="price"
                                                                    type="radio"
                                                                    value="money"
                                                                    checked={selectedValueType === "money"}
                                                                    onChange={() => setSelectedValueType("money")}
                                                                />Tiền
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                {selectedValueType === "percent" && (
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="startDate"
                                                            >
                                                                Giảm giá:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                type="number"
                                                                value={formData.sale_percent}
                                                                onChange={(e) => setFormData({ ...formData, sale_percent: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                )}

                                                {selectedValueType === "money" && (
                                                    <Col lg="8" style={{ display: "flex" }}>
                                                        <FormGroup className="col" lg="6">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="startDate"
                                                            >
                                                                Giảm giá từ:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                type="number"
                                                                value={formData.min_price}
                                                                onChange={(e) => setFormData({ ...formData, min_price: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup className="col" lg="6">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="startDate"
                                                            >
                                                                Giảm giá đến:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                type="number"
                                                                value={formData.sale_price}
                                                                onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                )}


                                                <Col lg="4">
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
                                                            type="date"
                                                            value={formData.start_date}
                                                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
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
                                                            type="date"
                                                            value={formData.end_date}
                                                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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

                                                {formData.discounts_type === 1 && (
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
                                    <h6 className="heading-small text-muted mb-4">Danh sách</h6>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Code</th>
                                                <th scope="col">Loại</th>
                                                <th scope="col">Tên khuyến mại</th>
                                                <th scope="col">Mô tả</th>
                                                <th scope="col">Phần trăm (%)</th>
                                                <th scope="col">Tiền</th>
                                                <th scope="col">Ngày bắt đầu</th>
                                                <th scope="col">Ngày kết thúc</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Hành động</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {discounts.map((discount, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{discount.code}</td>
                                                    <td>{discount.discounts_type === 0 ? "Hóa đơn" : "Sản phẩm"}</td>
                                                    <td>{discount.name}</td>
                                                    <td>{discount.description}</td>
                                                    <td>{discount.sale_percent}</td>
                                                    <td>{discount.min_price} - {discount.sale_price}</td>
                                                    <td>{discount.start_date}</td>
                                                    <td>{discount.end_date}</td>
                                                    <td>
                                                        <label className="custom-toggle">
                                                            <input
                                                                checked={discount.status === 0}
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
