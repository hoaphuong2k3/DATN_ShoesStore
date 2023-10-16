import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import "assets/css/pagination.css";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table } from "reactstrap";

import Header from "components/Headers/Header.js";


const Promotion = () => {

    const [discounts, setDiscounts] = useState([]);


    //loads table
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 3,
        fromDate: "",
        toDate: "",
        status: "",
        isdelete: 0,
    });

    const [totalPages, setTotalPages] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/admin/discount-period/getAll", {
                params: queryParams
            });
            setDiscounts(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [queryParams]);

    const handlePageChange = ({ selected }) => {
        setQueryParams(prevParams => ({ ...prevParams, page: selected }));
    };

    const calculateIndex = (index) => {
        return index + 1 + queryParams.page * queryParams.size;
    };




    //lọc
    const handleStatusChange = (selectedStatus) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            status: selectedStatus,
            page: 0
        }));
        setSelectedStatus(selectedStatus);
    };


    //click on selected
    const [formData, setFormData] = useState({
        id: null,
        code: "",
        name: "",
        startDate: "",
        endDate: "",
        salePercent: "",
    });

    const handleRowClick = (discount) => {
        setFormData({
            id: discount.id,
            code: discount.code,
            name: discount.name,
            startDate: discount.startDate,
            endDate: discount.endDate,
            salePercent: discount.salePercent || "",
        });
    };

    //reset
    const resetForm = () => {
        setFormData({
            code: "",
            name: "",
            startDate: "",
            endDate: "",
            salePercent: "",
        });
    };

    //add
    const addDiscount = async () => {
        try {
            await axiosInstance.post('/admin/discount-period/createDiscountPeriod', {

                code: formData.code,
                name: formData.name,
                startDate: formData.startDate,
                endDate: formData.endDate,
                salePercent: formData.salePercent,
            });

            fetchData();

            toast.success("Thêm thành công!");
            resetForm();
        } catch (error) {
            console.error("Error creating discount:", error);
            toast.error("Đã có lỗi xảy ra khi thêm dữ liệu. Vui lòng thử lại sau.");
        }
    };

    //update
    const updateDiscount = async () => {
        try {

            await axiosInstance.put(`/admin/discount-period/updateDiscountPeriod`, {
                id: formData.id,
                code: formData.code,
                name: formData.name,
                salePercent: formData.salePercent,
                startDate: formData.startDate,
                endDate: formData.endDate,
            });

            fetchData();

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

    //delete
    const deleteDiscount = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khuyến mại này không?")) {
            axiosInstance.delete(`/admin/discount-period/deleteDiscountPeriod/${id}`)
                .then(response => {
                    fetchData();
                    toast.success("Xóa thành công");
                    resetForm();
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
                                            <h3 className="mb-0">Đợt giảm giá</h3>
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

                                                <Col lg="6">
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
                                                            value={formData.startDate}
                                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
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
                                                            value={formData.endDate}
                                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </div>


                                    </Form>
                                    {/* Description */}
                                    <hr className="my-4" />
                                    <Col style={{ display: "flex" }}>
                                        <h6 className="heading-small text-muted mb-4">Danh sách</h6>

                                        <div className="col-2">
                                            <Input type="select" value={selectedStatus} onChange={(e) => handleStatusChange(e.target.value)} size="sm">
                                                <option value="">Tất cả</option>
                                                <option value="1">Đang hoạt động</option>
                                                <option value="2">Chờ hoạt động</option>
                                            </Input>
                                        </div>
                                    </Col>

                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Code</th>
                                                <th scope="col">Tên khuyến mại</th>
                                                <th scope="col">Phần trăm (%)</th>
                                                <th scope="col">Ngày bắt đầu</th>
                                                <th scope="col">Ngày kết thúc</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Hành động</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {discounts.map((discount, index) => (
                                                <tr key={discount.id}>
                                                    <td>{calculateIndex(index)}</td>
                                                    <td>{discount.code}</td>
                                                    <td>{discount.name}</td>
                                                    <td>{discount.salePercent}</td>
                                                    <td>{discount.startDate}</td>
                                                    <td>{discount.endDate}</td>
                                                    <td> <label className="custom-toggle">
                                                        <input
                                                            checked={discount.status === 1}
                                                            type="checkbox"
                                                            readOnly
                                                        />
                                                        <span className="custom-toggle-slider rounded-circle" />
                                                    </label></td>
                                                    <td>
                                                        <Button color="info" size="sm" onClick={() => handleRowClick(discount)}><FaEdit /></Button>
                                                        <Button color="danger" size="sm" onClick={() => deleteDiscount(discount.id)}><FaTrash /></Button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {/* Hiển thị thanh phân trang */}
                                    <div className="pagination-container">
                                        <ReactPaginate
                                            previousLabel={"Trang trước"}
                                            nextLabel={"Trang sau"}
                                            breakLabel={"..."}
                                            pageCount={totalPages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageChange}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                        />
                                    </div>
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
