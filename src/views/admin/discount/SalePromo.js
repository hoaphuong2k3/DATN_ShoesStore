import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
// reactstrap components
import { Row, Col, Form, FormGroup, Input, Button, Table } from "reactstrap";

const Promotion = () => {

    const [selectedStatusFilter, setSelectedStatusFilter] = useState("Trạng thái");
    const [discountTypeFilter, setDiscountTypeFilter] = useState("Hình thức");

    const [filteredDiscounts, setFilteredDiscounts] = useState([]);

    const [discounts, setDiscounts] = useState([]);


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
            const statusCondition =
                selectedStatusFilter === "Trạng thái" ||
                (discount.status === 2 && selectedStatusFilter === "Đang hoạt động") ||
                (discount.status !== 2 && selectedStatusFilter === "Chờ hoạt động");

            const discountTypeCondition =
                discountTypeFilter === "Hình thức" ||
                (discountTypeFilter === "Tiền" && discount.salePrice !== null) ||
                (discountTypeFilter === "Phần trăm" && discount.salePercent !== null);

            return statusCondition && discountTypeCondition;
        });

        setFilteredDiscounts(filteredDiscounts);
    }, [selectedStatusFilter, discountTypeFilter, discounts]);

    //click on selected
    const [formData, setFormData] = useState({
        id: null,
        code: "",
        name: "",
        minPrice: "",
        sale: false,
        salePercent: "",
        salePrice: "",
        description: "",
        startDate: "",
        endDate: ""
    });

    const handleRowClick = (discount) => {
        if (discount.salePercent !== null) {
            setFormData({
                id: discount.id,
                code: discount.code,
                name: discount.name,
                startDate: discount.startDate,
                endDate: discount.endDate,
                description: discount.description,
                salePercent: discount.salePercent,
                salePrice: "",
                minPrice: discount.minPrice,
                sale: true,
            });
        }
        if (discount.salePrice !== null) {
            setFormData({
                id: discount.id,
                code: discount.code,
                name: discount.name,
                startDate: discount.startDate,
                endDate: discount.endDate,
                description: discount.description,
                salePercent: "",
                salePrice: discount.salePrice,
                minPrice: discount.minPrice || "",
                sale: false,
            });
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
            salePercent: "",
            minPrice: "",
            salePrice: "",
            sale: false

        });
        // setSelectedValueType(null);
    };

    //add

    const formatDateTime = (dateString) => {
        const parsedDate = parseISO(dateString, "dd/MM/yyyy hh:mm a", new Date());
        return format(parsedDate, "yyyy-MM-dd HH:mm", { locale: vi });
    };

    const addDiscount = async () => {
        try {
            const formattedStartDate = formatDateTime(formData.startDate);
            const formattedEndDate = formatDateTime(formData.endDate);

            const response = await axiosInstance.post('/vouchers/createVoucher', {
                code: formData.code,
                name: formData.name,
                minPrice: formData.minPrice,
                sale: formData.sale,
                description: formData.description,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                salePercent: formData.sale ? formData.salePercent : null,
                salePrice: formData.sale ? null : formData.salePrice
            });

            setDiscounts([...discounts, response.data]);
            toast.success("Thêm thành công!");
            resetForm();
        } catch (error) {
            console.error("Error creating discount:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                toast.error(error.response.data.message);
            } else {
                toast.error("Đã có lỗi xảy ra khi thêm dữ liệu.");
            }
        }
    };

    //update
    const updateDiscount = async () => {
        try {
            const formattedStartDate = formatDateTime(formData.startDate);
            const formattedEndDate = formatDateTime(formData.endDate);

            const response = await axiosInstance.put(`/vouchers/updateVoucher`, {
                id: formData.id,
                code: formData.code,
                name: formData.name,
                minPrice: formData.minPrice,
                sale: formData.sale,
                description: formData.description,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                salePercent: formData.sale ? formData.salePercent : null,
                salePrice: formData.sale ? null : formData.salePrice
            });

            const updatedDiscounts = discounts.map(d => (d.code === formData.code ? response.data : d));
            setDiscounts(updatedDiscounts);

            toast.success("Cập nhật thành công!");
            resetForm();
        } catch (error) {
            console.error("Error updating discount:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                toast.error(error.response.data.message);
            } else {
                toast.error("Đã có lỗi xảy ra khi cập nhật dữ liệu.");
            }
        }
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

            <div className="col">

                <Row className="align-items-center">
                    <div className="col">
                        <h3 className="heading-small text-muted mb-0"> Thông tin</h3>
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
                <hr className="my-4" />

                <Form>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
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
                            <Col lg="6">
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
                        </Row>
                        <Row>
                            <Col lg="4">
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


                            <Col lg="4">
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
                                                checked={!formData.sale}
                                                onChange={() => setFormData({ ...formData, sale: false })}
                                            />Tiền
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <Input
                                                className="custom-control-alternative"
                                                name="sale"
                                                type="radio"
                                                checked={formData.sale}
                                                onChange={(e) => setFormData({ ...formData, sale: true })}
                                            />Phần trăm
                                        </div>

                                    </div>
                                </FormGroup>
                            </Col>

                            {formData.sale && (
                                <Col lg="4">
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

                            {!formData.sale && (
                                <Col lg="4">
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
                                        type="datetime-local"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
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
                        </Row>

                    </div>


                </Form>
                <hr className="my-4" />
                <Col style={{ display: "flex" }}>
                    <h6 className="heading-small text-muted mb-4">Danh sách</h6>
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
                                                checked={discount.status === 1}
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

            </div>

            <ToastContainer />

        </>
    );
}

export default Promotion;
