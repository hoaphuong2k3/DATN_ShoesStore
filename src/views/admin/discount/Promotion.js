import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt, FaLock, FaLockOpen, FaCamera } from 'react-icons/fa';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import "assets/css/pagination.css";
// reactstrap components
import Switch from 'react-input-switch';
import Carousel from 'react-bootstrap/Carousel';
import {
    Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup,
    Input, Button, Table, Modal, ModalBody, ModalFooter, ModalHeader, Badge, Label
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Promotion = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleModal = () => {
        resetForm();
        setModal(true);
    }
    const [secondModal, setSecondModal] = useState(false);
    const toggleSecondModal = () => setSecondModal(!secondModal);
    const handleModal2 = () => {
        resetGift();
        setSecondModal(true);
    }

    const [file, setFile] = useState(null);
    const [value, setValue] = useState('no');
    const [discounts, setDiscounts] = useState([]);
    const [freeGift, setfreeGift] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedGiftId, setSelectedGiftId] = useState(null);
    const [clickedOnce, setClickedOnce] = useState(false);

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

    const [queryParams2, setQueryParams2] = useState({
        page: 0,
        size: 10,
    });

    //loads table
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/admin/discount-period/getAll", {
                params: queryParams
            });
            const response2 = await axiosInstance.get("/free-gift", {
                params: queryParams2
            });
            setfreeGift(response2.content);
            setDiscounts(response.content);

            setTotalElements(response.totalElements);
            setTotalPages(response.totalPages);

        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [queryParams, queryParams2]);

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
        2: { color: 'warning', label: 'Ngừng kích hoạt' }
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
        typePeriod: 0,
    });
    //click on selected 
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
        setSelectedGiftId(discount.giftId);
        setModal(true);
    };

    const handleImageClick = (giftId) => {
        if (selectedGiftId === giftId) {

            setSelectedGiftId(null);
            setClickedOnce(false);
        } else {

            setSelectedGiftId(giftId);
            setClickedOnce(true);
        }
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
            typePeriod: 0,
        });
        setSelectedGiftId(null);
    };
    //save Promotion
    const saveDiscount = async () => {
        try {
            const apiUrl = formData.id
                ? `/admin/discount-period/updateDiscountPeriod`
                : `/admin/discount-period/createDiscountPeriod`;

            await axiosInstance({
                method: formData.id ? 'put' : 'post',
                url: apiUrl,
                data: {
                    id: formData.id,
                    code: formData.code,
                    name: formData.name,
                    minPrice: formData.minPrice,
                    salePercent: formData.salePercent,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    status: formData.status,
                    giftId: selectedGiftId,
                    typePeriod: formData.typePeriod,
                },
            });

            if (formData.id) {
                toast.success("Cập nhật thành công!");
            } else {
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
    //delete Promotion
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

    // FreeGift //
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    //UploadImage
    const imageUrl = file ? URL.createObjectURL(file) : null;
    const imageSize = '110px';
    const imageStyle = {
        width: imageSize,
        height: imageSize,
    };
    const buttonStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#000',
        padding: '8px',
        cursor: 'pointer',
        border: '1px dashed gray',
        width: imageSize,
        height: imageSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const [formData2, setFormData2] = useState({
        id: null,
        name: "",
        image: "",
        quantity: "",
        status: "",
    });
    //select
    const handleRowClick2 = async (id) => {
        try {
            const response = await axiosInstance.patch(`/free-gift/detail/${id}`);
            const { name, quantity, status, image } = response.data;
            setFormData2({ id, name, quantity, status });
            if (image) {
                // Hiển thị hình ảnh
                const blob = await fetch(`data:image/jpeg;base64,${image}`).then((res) => res.blob());
                const file = new File([blob], "image.jpg", { type: "image/jpeg" });
                setFile(file);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    //reset
    const resetGift = () => {
        setFormData2({
            id: null,
            name: "",
            image: "",
            quantity: "",
            status: "",
        });
        setFile(null);
    };
    //save FreeGift
    const saveGift = async (e) => {
        e.preventDefault();
        try {
            let imageFormData = new FormData();
            if (file) {
                imageFormData.append('file', file);
            }

            let freeGiftResponse;
            if (formData2.id) {
                freeGiftResponse = await axiosInstance.put(`/free-gift/update`, formData2);
            } else {
                freeGiftResponse = await axiosInstance.post(`/free-gift/create`, formData2);
            }

            const freeGiftId = freeGiftResponse.data.id;

            if (file) {
                await axiosInstance.post(`/free-gift/image/${freeGiftId}`, imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            toast.success(formData2.id ? "Cập nhật thành công!" : "Thêm mới thành công!");
            fetchData();
            resetGift();
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                toast.error(error.response.data.message);
            } else {
                toast.error("Đã có lỗi xảy ra.");
            }
        }
    };
    //delete Gift
    const deletel = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
            axiosInstance.patch(`/free-gift/delete/${id}`)
                .then(response => {
                    fetchData();
                    toast.success("Xóa thành công");
                    resetGift();
                })
                .catch(error => {
                    console.error('Lỗi khi xóa dữ liệu:', error);
                });
        }
    };
    //========//


    return (
        <>
            {/* <Header /> */}
            {/* Page content */}
            <Container className="pt-5 pt-md-7" fluid>
                <Row>
                    <Col>
                        {/* Tabs with icons */}
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">

                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="heading-small text-muted mb-0">Đợt giảm giá</h3>
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
                                                <Button color="warning" outline size="sm" onClick={resetFilters}>
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
                                                    color="danger" outline
                                                    size="sm"
                                                    onClick={handleDeleteButtonClick}
                                                    disabled={selectedItems.length === 0}
                                                >
                                                    Xóa tất cả
                                                </Button>
                                                <Button
                                                    color="primary" outline
                                                    onClick={handleModal}
                                                    size="sm"
                                                >
                                                    + Thêm mới
                                                </Button>
                                            </div>

                                        </Row>

                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light text-center">
                                                <tr>

                                                    <th scope="col" style={{ color: "black", position: "sticky", zIndex: '1', left: '0' }}>Trạng thái</th>
                                                    <th >
                                                        <FormGroup check className="pb-4">
                                                            <Input
                                                                type="checkbox"
                                                                checked={selectAll}
                                                                onChange={handleSelectAll}
                                                            />
                                                        </FormGroup>
                                                    </th>
                                                    <th scope="col" style={{ color: "black" }}>Mã</th>
                                                    <th scope="col" style={{ color: "black" }}>Loại</th>
                                                    <th scope="col" style={{ color: "black" }}>Tên khuyến mại</th>
                                                    <th scope="col" style={{ color: "black" }}>Hóa đơn <br />tối thiểu </th>
                                                    <th scope="col" style={{ color: "black" }}>Giá trị</th>
                                                    <th scope="col" style={{ color: "black" }}>Quà tặng</th>
                                                    <th scope="col" style={{ color: "black" }}>Ngày bắt đầu</th>
                                                    <th scope="col" style={{ color: "black" }}>Ngày kết thúc</th>
                                                    <th scope="col" style={{ color: "black", position: "sticky", zIndex: '1', right: '0' }}>Thao tác</th>

                                                </tr>
                                            </thead>
                                            <tbody style={{ color: "black" }}>
                                                {Array.isArray(discounts) &&
                                                    discounts.map((discount, index) => (
                                                        <tr key={discount.id}>

                                                            <td style={{ position: "sticky", zIndex: '1', left: '0', background: "#fff", textAlign: "center" }}>
                                                                <Badge color={statusMapping[discount.status]?.color || statusMapping.default.color}>
                                                                    {statusMapping[discount.status]?.label || statusMapping.default.label}
                                                                </Badge>
                                                            </td>
                                                            <td>
                                                                <FormGroup check className="pb-4">
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={selectedItems.includes(discount.id)}
                                                                        onChange={() => handleCheckboxChange(discount.id)}
                                                                    />
                                                                
                                                                </FormGroup>
                                                            </td>
                                                            <td>{discount.code}</td>
                                                            <td>{discount.typePeriod === 0 ? "Order" : "FreeShip"}</td>
                                                            <td>{discount.name}</td>
                                                            <td style={{ textAlign: "right" }}>
                                                                {discount.typePeriod === 0 ? `${discount.minPrice} VNĐ` : ""}
                                                            </td>
                                                            <td style={{ textAlign: "right" }}>
                                                                {discount.typePeriod === 0 ? `${discount.salePercent}%` : ""}
                                                            </td>
                                                            <td>{discount.giftId}</td>
                                                            <td>{discount.startDate}</td>
                                                            <td>{discount.endDate}</td>

                                                            <td style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff" }}>
                                                                {discount.status === 0 &&
                                                                    <Button color="link" size="sm"><FaLockOpen /></Button>
                                                                }
                                                                {(discount.status === 1 || discount.status === 2) &&
                                                                    <Button color="link" size="sm"><FaLock /></Button>
                                                                }
                                                                <Button color="link" size="sm" onClick={() => handleRowClick(discount)}><FaEdit /></Button>
                                                                <Button color="link" size="sm" onClick={() => deleteDiscount(discount.id)}> <FaTrash /></Button>
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
                                        style={{ maxWidth: '600px' }}
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

                                                                <Col lg="12">
                                                                    <FormGroup>
                                                                        <label className="form-control-label">
                                                                            Quà tặng kèm:
                                                                            <Button className="ml-2" size="sm" onClick={handleModal2}>+</Button>
                                                                        </label>
                                                                        <Carousel interval={null}>
                                                                            {freeGift.map((gift, index) => (
                                                                                <Carousel.Item key={gift.id}>
                                                                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                                        {freeGift.slice(index, index + 3).map((gift) => (
                                                                                            <div
                                                                                                key={gift.id}
                                                                                                style={{
                                                                                                    textAlign: 'center',
                                                                                                    flex: '0 0 33.33%',
                                                                                                    color: selectedGiftId === gift.id ? 'red' : 'black'
                                                                                                }}
                                                                                                onClick={() => handleImageClick(gift.id)}
                                                                                            >
                                                                                                <img
                                                                                                    src={`data:image/jpeg;base64,${gift.image}`}
                                                                                                    alt={gift.name}
                                                                                                    width="100"
                                                                                                    height="100"
                                                                                                />
                                                                                                <p style={{ fontSize: 13 }}>{gift.name}</p>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </Carousel.Item>
                                                                            ))}
                                                                        </Carousel>
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
                                                <Button color="primary" outline onClick={saveDiscount} size="sm">
                                                    {formData.id ? "Cập nhật" : "Thêm mới"}
                                                </Button>
                                                <Button color="primary" outline onClick={resetForm} size="sm">
                                                    Reset
                                                </Button>
                                                <Button color="danger" outline onClick={toggle} size="sm">
                                                    Đóng
                                                </Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal >

                                    <Modal isOpen={secondModal} toggle={toggleSecondModal} style={{ maxWidth: '600px' }}>
                                        <ModalHeader toggle={toggleSecondModal}>
                                            Quà tặng
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>

                                                <Row>
                                                    <Col lg="6" className="d-flex justify-content-center" >
                                                        <div
                                                            style={{ position: 'relative', width: imageSize, height: imageSize }}
                                                        >
                                                            {imageUrl && <img alt="preview" src={imageUrl} style={imageStyle} />}
                                                            <Label htmlFor="file-input" style={buttonStyle}>
                                                                <FaCamera size={15} />
                                                            </Label>
                                                            <Input
                                                                type="file"
                                                                id="file-input"
                                                                style={{ display: 'none' }}
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <Col lg="12">
                                                                <FormGroup>
                                                                    <Input
                                                                        className="form-control-alternative"
                                                                        type="text"
                                                                        placeholder="Tên quà tặng"
                                                                        value={formData2.name}
                                                                        onChange={(e) => setFormData2({ ...formData2, name: e.target.value })}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="12">
                                                                <FormGroup>
                                                                    <Input
                                                                        className="form-control-alternative"
                                                                        type="number" min={0}
                                                                        placeholder="Số lượng"
                                                                        value={formData2.quantity}
                                                                        onChange={(e) => setFormData2({ ...formData2, quantity: e.target.value })}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Table>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th scope="col">STT</th>
                                                                <th scope="col">Mã</th>
                                                                <th scope="col">Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Số lượng</th>
                                                                <th scope="col">Thao tác</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {freeGift.map((gift, index) => (
                                                                <tr key={gift.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{gift.code}</td>
                                                                    <td>
                                                                        <span className="avatar avatar-sm rounded-circle">
                                                                            <img src={`data:image/jpeg;base64,${gift.image}`} alt="" />
                                                                        </span>

                                                                    </td>
                                                                    <td>{gift.name}</td>
                                                                    <td>{gift.quantity}</td>
                                                                    <td>
                                                                        <Button color="link" size="sm" onClick={() => handleRowClick2(gift.id)}><FaEdit /></Button>
                                                                        <Button color="link" size="sm" onClick={() => deletel(gift.id)}><FaTrash /></Button>
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </Table>
                                                </Row>

                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>

                                            <Button color="primary" outline onClick={saveGift} size="sm">
                                                {formData2.id ? "Cập nhật" : "Thêm mới"}
                                            </Button>
                                            <Button color="primary" outline onClick={resetGift} size="sm">
                                                Reset
                                            </Button>
                                            <Button color="danger" outline size="sm" onClick={toggleSecondModal}>
                                                Đóng
                                            </Button>

                                        </ModalFooter>
                                    </Modal>

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
