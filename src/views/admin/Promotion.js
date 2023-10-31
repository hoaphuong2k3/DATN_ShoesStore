import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from 'react-icons/fa';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import "assets/css/pagination.css";
// reactstrap components
import Switch from 'react-input-switch';
import { Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, Input, Button, Table, Modal, ModalBody, ModalFooter, ModalHeader, Badge } from "reactstrap";

import Header from "components/Headers/Header.js";


const Promotion = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleModal = () => {
        resetForm();
        setModal(true);
    }

    const [value, setValue] = useState('no');
    const [discounts, setDiscounts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 5,
        code: "",
        name: "",
        minPercent: "",
        maxPercent: "",
        fromDate: "",
        toDate: "",
        status: "",
        typePeriod: "",
        isdelete: 0,
    });


    //loads table
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/admin/discount-period/getAll", {
                params: queryParams
            });
            setDiscounts(response.content);
            setTotalElements(response.totalElements);
            setTotalPages(response.totalPages);
            console.log(response.content);
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

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setQueryParams({ ...queryParams, size: newSize, page: 0 });
    };

    const calculateIndex = (index) => {
        return index + 1 + queryParams.page * queryParams.size;
    };

    const statusMapping = {
        0: { color: 'danger', label: 'Kích hoạt' },
        1: { color: 'success', label: 'Chờ kích hoạt' },
    };
    //lọc
    const resetFilters = () => {
        setQueryParams({
            page: 0,
            size: 5,
            code: "",
            name: "",
            minPrice: "",
            maxPrice: "",
            fromDate: "",
            toDate: "",
            status: "",
            isdelete: 0,
        });
    };

    //checkbox
    const handleCheckboxChange = (id) => {
        const updatedSelectedItems = [...selectedItems];
        if (updatedSelectedItems.includes(id)) {
            updatedSelectedItems.splice(updatedSelectedItems.indexOf(id), 1);
        } else {
            updatedSelectedItems.push(id);
        }
        setSelectedItems(updatedSelectedItems);
        setSelectAll(updatedSelectedItems.length === discounts.length);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(discounts.map(discount => discount.id));
        }
        setSelectAll(!selectAll);
    };

    //click on selected
    const [formData, setFormData] = useState({
        id: null,
        code: "",
        name: "",
        minPrice: "",
        salePercent: "",
        startDate: "",
        endDate: "",
        status: "",
        giftId: "",
        typePeriod: "",
    });

    const handleRowClick = (discount) => {
        setFormData({
            id: discount.id,
            code: discount.code,
            name: discount.name,
            minPrice: discount.minPrice,
            salePercent: discount.salePercent,
            startDate: discount.startDate,
            endDate: discount.endDate,
            status: discount.status,
            giftId: discount.giftId,
            typePeriod: discount.typePeriod,
        });

        setModal(true);
    };

    //reset
    const resetForm = () => {
        setFormData({
            name: "",
            minPrice: "",
            salePercent: "",
            startDate: "",
            endDate: "",
            status: "",
            giftId: "",
            typePeriod: "",
        });
    };

    //save
    const saveDiscount = async () => {
        try {
            if (formData.id) {
                await axiosInstance.put(`/admin/discount-period/updateDiscountPeriod`, {
                    id: formData.id,
                    code: formData.code,
                    name: formData.name,
                    minPrice: formData.minPrice,
                    salePercent: formData.salePercent,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    status: formData.status,
                    giftId: formData.giftId,
                    typePeriod: formData.typePeriod,
                });
                toast.success("Cập nhật thành công!");
            } else {
                await axiosInstance.post(`/admin/discount-period/createDiscountPeriod`, {
                    code: formData.code,
                    name: formData.name,
                    minPrice: formData.minPrice,
                    salePercent: formData.salePercent,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    giftId: formData.giftId,
                    typePeriod: formData.typePeriod,
                });
                toast.success("Thêm mới thành công!");
            }

            fetchData();

            setModal(false);
            resetForm();
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                toast.error(error.response.data.message);
            } else {
                toast.error("Đã có lỗi xảy ra.");
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

    const handleDeleteButtonClick = () => {
        if (selectedItems.length > 0) {
            if (window.confirm("Bạn có chắc chắn muốn xóa các khuyến mại đã chọn không?")) {
                selectedItems.forEach(id => {
                    deleteDiscount(id);
                });
                setSelectedItems([]);
            }
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
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="col">

                                        <Row className="align-items-center">
                                            <FaSearch />
                                            <h3 className="heading-small text-black mb-0 ml-1">Tìm kiếm</h3>
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
                                                                Mã Khuyến mại:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="code"
                                                                type="text"
                                                                value={queryParams.code}
                                                                onChange={(e) => setQueryParams({ ...queryParams, code: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="name"
                                                            >
                                                                Tên Khuyến mại:
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="name"
                                                                type="text"
                                                                value={queryParams.name}
                                                                onChange={(e) => setQueryParams({ ...queryParams, name: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                </Row>

                                                {value === 'yes' &&
                                                    <Row>

                                                        <Col lg="2">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="startDate"
                                                                >
                                                                    Trạng thái:
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    type="select"
                                                                    value={queryParams.status}
                                                                    onChange={(e) => setQueryParams({ ...queryParams, status: e.target.value })}
                                                                >
                                                                    <option value="">Tất cả</option>
                                                                    <option value="0">Kích hoạt</option>
                                                                    <option value="1">Chờ kích hoạt</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>

                                                        <Col lg="5">
                                                            <FormGroup>

                                                                <Row>
                                                                    <Col xl="6">
                                                                        <label className="form-control-label">
                                                                            Giá trị từ:
                                                                        </label>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            type="number"
                                                                        />
                                                                    </Col>

                                                                    <Col xl="6">
                                                                        <label className="form-control-label">
                                                                            đến:
                                                                        </label>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            type="number"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="5">
                                                            <FormGroup>
                                                                <Row>
                                                                    <Col xl="6">
                                                                        <label
                                                                            className="form-control-label"
                                                                            htmlFor="startDate"
                                                                        >
                                                                            Từ ngày:
                                                                        </label>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            id="startDate"
                                                                            type="date"
                                                                            value={queryParams.fromDate}
                                                                            onChange={(e) => setQueryParams({ ...queryParams, fromDate: e.target.value })}
                                                                        />
                                                                    </Col>
                                                                    <Col xl="6">
                                                                        <label
                                                                            className="form-control-label"
                                                                            htmlFor="endDate"
                                                                        >
                                                                            Đến ngày:
                                                                        </label>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            id="endDate"
                                                                            type="date"
                                                                            value={queryParams.toDate}
                                                                            onChange={(e) => setQueryParams({ ...queryParams, toDate: e.target.value })}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>

                                                    </Row>
                                                }
                                            </div>
                                        </Form>

                                        <Row className="mt-2">
                                            <Col lg="6" xl="4" >
                                                <span>
                                                    <Switch on="yes" off="no" value={value} onChange={setValue} />
                                                    <span>
                                                        &nbsp;&nbsp;
                                                        Tìm kiếm nâng cao
                                                        &nbsp;&nbsp;
                                                    </span>
                                                </span>
                                                <Button color="warning" size="sm" onClick={resetFilters}>
                                                    Làm mới bộ lọc
                                                </Button>
                                            </Col>
                                        </Row>

                                        <hr className="my-4" />

                                        <Row className="align-items-center my-4">
                                            <div className="col" style={{ display: "flex" }}>

                                                <h3 className="heading-small text-black mb-0"><FaFileAlt size="16px" className="mr-1" />Danh sách</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={handleDeleteButtonClick}
                                                    disabled={selectedItems.length === 0}
                                                >
                                                    Xóa tất cả
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    onClick={handleModal}
                                                    size="sm"
                                                >
                                                    + Thêm mới
                                                </Button>
                                            </div>

                                        </Row>

                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="text-center pb-4">
                                                        <FormGroup check>
                                                            <Input
                                                                type="checkbox"
                                                                checked={selectAll}
                                                                onChange={handleSelectAll}
                                                            />
                                                        </FormGroup>
                                                    </th>
                                                    <th scope="col">STT</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Loại</th>
                                                    <th scope="col">Mã</th>
                                                    <th scope="col">Tên khuyến mại</th>
                                                    <th scope="col">Hóa đơn <br />tối thiểu </th>
                                                    <th scope="col">Giá trị</th>
                                                    <th scope="col">Quà tặng</th>
                                                    <th scope="col">Ngày bắt đầu</th>
                                                    <th scope="col">Ngày kết thúc</th>
                                                    <th scope="col" style={{position: "sticky",zIndex: '1',right: '0'}}>Thao tác</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(discounts) &&
                                                    discounts.map((discount, index) => (
                                                        <tr key={discount.id}>
                                                            <td className="text-center">
                                                                <FormGroup check>
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={selectedItems.includes(discount.id)}
                                                                        onChange={() => handleCheckboxChange(discount.id)}
                                                                    />
                                                                </FormGroup>
                                                            </td>
                                                            <td>{calculateIndex(index)}</td>
                                                            <td>
                                                                <Badge color={statusMapping[discount.status]?.color || statusMapping.default.color}>
                                                                    {statusMapping[discount.status]?.label || statusMapping.default.label}
                                                                </Badge>
                                                            </td>
                                                            <td>{discount.typePeriod == 0 ? "Order" : "FreeShip"}</td>
                                                            <td>{discount.code}</td>
                                                            <td>{discount.name}</td>
                                                            <td>{discount.minPrice}VNĐ</td>
                                                            <td>{discount.salePercent}%</td>
                                                            <td>{discount.giftId}</td>
                                                            <td>{discount.startDate}</td>
                                                            <td>{discount.endDate}</td>

                                                            <td style={{position: "sticky",zIndex: '1',right: '0'}}>
                                                                <Button color="danger" size="sm" onClick={() => handleRowClick(discount)} disabled={discount.status === 2}><i class="fa-solid fa-pen" /></Button>
                                                                <Button color="danger" size="sm" onClick={() => deleteDiscount(discount.id)}> <i class="fa-solid fa-trash" /></Button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                        {/* Hiển thị thanh phân trang */}
                                        <Row className="mt-4">
                                            <Col lg={6}>
                                                <div style={{ fontSize: 14 }}>
                                                    Đang xem <b>{queryParams.page * queryParams.size + 1}</b>  đến <b>{queryParams.page * queryParams.size + discounts.length}</b> trong tổng số <b></b> mục
                                                </div>
                                            </Col>
                                            <Col style={{ fontSize: 14 }} lg={2}>
                                                <Row>
                                                    <span>Xem </span>&nbsp;
                                                    <span>
                                                        <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" className="mt--1" onChange={handleSizeChange}>
                                                            <option value="5">5</option>
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
                                    </div>
                                    <ToastContainer />
                                    <Modal
                                        isOpen={modal}
                                        toggle={toggle}
                                        backdrop={'static'}
                                        keyboard={false}
                                        style={{ maxWidth: '700px' }}
                                    >
                                        <ModalHeader toggle={toggle}>
                                            <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Khuyến mại' : 'Thêm Mới Khuyến mại'}</h3>

                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <div className="pl-lg-4">
                                                    <Row>

                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                >
                                                                    Loại Khuyến mại
                                                                </label>
                                                                <div style={{ display: "flex" }}>

                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            name="type"
                                                                            type="radio"
                                                                            checked={formData.typePeriod === 0}
                                                                            onChange={() => setFormData({ ...formData, typePeriod: 0 })}
                                                                        />Order
                                                                    </div>
                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            type="radio"
                                                                            checked={formData.typePeriod === 1}
                                                                            onChange={() => setFormData({ ...formData, typePeriod: 1 })}
                                                                        />FreeShip
                                                                    </div>

                                                                </div>
                                                            </FormGroup>
                                                        </Col>

                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="name"
                                                                >
                                                                    Tên Khuyến mãi
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
                                                        {formData.typePeriod === 0 ? (
                                                            <>
                                                                <Col lg="6">
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

                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <label
                                                                            className="form-control-label"
                                                                        >
                                                                            Giá trị giảm:
                                                                        </label>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            type="number"
                                                                            value={formData.salePercent}
                                                                            onChange={(e) => setFormData({ ...formData, salePercent: e.target.value })}
                                                                        />
                                                                    </FormGroup>
                                                                </Col>

                                                                {/* <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-price">
                                                                    Khách hàng
                                                                </label>
                                                                <div style={{ display: "flex" }}>
                                                                    
                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            name="client"
                                                                            type="checkbox"
                                                                        />Đồng
                                                                    </div>
                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            name="client"
                                                                            type="checkbox"
                                                                        />Bạc
                                                                    </div>
                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            name="client"
                                                                            type="checkbox"
                                                                        />Vàng
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: "flex" }}>
                                                                    
                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            name="client"
                                                                            type="checkbox"
                                                                        />Kim cương
                                                                    </div>
                                                                    <div className="custom-control custom-radio">
                                                                        <Input
                                                                            className="custom-control-alternative"
                                                                            name="client"
                                                                            type="checkbox"
                                                                        />Khách lẻ
                                                                    </div>
                                                                </div>
                                                            </FormGroup>
                                                        </Col> */}

                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <label
                                                                            className="form-control-label"
                                                                        >
                                                                            Quà tặng kèm:
                                                                        </label>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            type="select"
                                                                            value={formData.giftId}
                                                                            onChange={(e) => setFormData({ ...formData, giftId: e.target.value })}
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </>

                                                        ) : null}
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


                                            </Form >
                                        </ModalBody >
                                        <ModalFooter>
                                            <div className="text-center">
                                                <Button color="primary" onClick={saveDiscount} size="sm">
                                                    {formData.id ? "Cập nhật" : "Thêm mới"}
                                                </Button>
                                                <Button color="primary" onClick={resetForm} size="sm">
                                                    Reset
                                                </Button>
                                                <Button color="danger" onClick={toggle} size="sm">
                                                    Close
                                                </Button>
                                            </div>
                                        </ModalFooter>

                                    </Modal >
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
