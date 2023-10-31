import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from 'react-icons/fa';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import { getAllShoes } from "services/Product2Service";
import { getAllShoesDetail2 } from "services/ShoesDetailService.js";
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import "assets/css/pagination.css";
// reactstrap components
import Switch from 'react-input-switch';
import { Row, Col, Form, FormGroup, Input, Button, Table, Badge, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const SaleProduct = () => {

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

    const [listShoes, setListShoes] = useState([]);
    const [listDetail, setListShoesDetail] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedShoesIds, setSelectedShoesIds] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);



    const [search1, setSearch1] = useState({
        code: "",
        name: "",
    });
    const [search2, setSearch2] = useState({
        code: "",
        "status": 1
    });

    //loads product
    const getAll1 = async (page, size) => {
        try {
            let res = await getAllShoes(page, size, search1);
            if (res && res.data && res.data.content) {
                setListShoes(res.data.content);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }
    useEffect(() => {
        getAll1(page, size);
    }, [search1]);

    //loads productDetail
    const getAll2 = async (id, page, size) => {
        try {
            let res = await getAllShoesDetail2(id ,page, size, search2);
            console.log(res);
            if (res && res.data && res.data.content) {
                setListShoesDetail(res.data.content);
            }
        } catch (error) {
            setListShoesDetail([]);
        }
    }
    useEffect(() => {
        getAll2(page, size);
    }, [search2]);

    //loads voucher
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 5,
        type: 1,
        code: "",
        name: "",
        fromDate: "",
        toDate: "",
        status: "",
        isdelete: 0,
    });

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/vouchers/getAll", {
                params: queryParams
            });
            setDiscounts(response.content);
            setTotalElements(response.totalElements);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [queryParams]);

    //phân trang
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

    //status
    const statusMapping = {
        0: { color: 'danger', label: 'Kích hoạt' },
        1: { color: 'success', label: 'Chờ kích hoạt' },
        2: { color: 'warning', label: 'Đã hủy' },
    };

    //lọc
    const resetFilters = () => {
        setQueryParams({
            page: 0,
            size: 5,
            type: 0,
            code: "",
            name: "",
            fromDate: "",
            toDate: "",
            status: "",
            isdelete: 0,
        });
    };

    //checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            const allShoesIds = listShoes.map(shoes => shoes.id);
            setSelectedShoesIds(allShoesIds);
            
        } else {
            setSelectedShoesIds([]);
        }
    };
   
    const handleShoesCheckboxChange = (shoesId) => {
        let updatedSelectedShoesIds = [...selectedShoesIds];
        if (updatedSelectedShoesIds.includes(shoesId)) {
            updatedSelectedShoesIds = updatedSelectedShoesIds.filter(id => id !== shoesId);
        } else {
            updatedSelectedShoesIds.push(shoesId);
        }
        setSelectedShoesIds(updatedSelectedShoesIds);
    };

    const fetchSelectedShoesDetails = () => {
        if (selectedShoesIds.length > 0) {
            selectedShoesIds.forEach(shoesId => {
                getAll2(shoesId, page, size);
            });
        } else {
            setListShoesDetail([]);
        }
    };

    useEffect(() => {
        fetchSelectedShoesDetails();
    }, [selectedShoesIds, page, size]);


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
        endDate: "",
        status: "",
        idShoe: [""],
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
                status: discount.status
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
                status: discount.status
            });
        }

        setModal(true);
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

    //save
    const formatDateTime = (dateString) => {
        const parsedDate = parseISO(dateString, "dd/MM/yyyy hh:mm a", new Date());
        return format(parsedDate, "yyyy-MM-dd HH:mm", { locale: vi });
    };

    const saveDiscount = async () => {
        try {
            const formattedStartDate = formatDateTime(formData.startDate);
            const formattedEndDate = formatDateTime(formData.endDate);

            if (formData.id) {
                await axiosInstance.put(`/vouchers/updateVoucher`, {
                    id: formData.id,
                    code: formData.code,
                    name: formData.name,
                    minPrice: formData.minPrice,
                    sale: formData.sale,
                    description: formData.description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    salePercent: formData.sale ? formData.salePercent : null,
                    salePrice: formData.sale ? null : formData.salePrice,
                    status: formData.status,
                    idShoe: formData.idShoe,
                });

                fetchData();

                toast.success("Cập nhật thành công!");
            } else {
                await axiosInstance.post('/vouchers/createVoucher', {
                    code: formData.code,
                    name: formData.name,
                    minPrice: formData.minPrice,
                    sale: formData.sale,
                    description: formData.description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    salePercent: formData.sale ? formData.salePercent : null,
                    salePrice: formData.sale ? null : formData.salePrice,
                    idShoe: formData.idShoe,
                });

                fetchData();
                toast.success("Thêm mới thành công!");
            }

            // Đóng modal và reset form
            setModal(false);
            resetForm();
        } catch (error) {
            // Xử lý lỗi
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
    const confirmDelete = () => {
        return window.confirm("Bạn có chắc chắn muốn xóa khuyến mại này không?");
    };
    const deleteDiscount = (id) => {
        if (confirmDelete()) {
            axiosInstance.delete(`/vouchers/deleteVoucher/${id}`)
                .then(response => {
                    fetchData();
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

                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="startDate"
                                        >
                                            Trị giá giảm:
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="number"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
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
                                            <option value="2">Đã hủy</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col lg="6">
                                    <FormGroup>
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
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
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
                            <th scope="col">STT</th>
                            <th scope="col">Code</th>
                            <th scope="col">Tên khuyến mại</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Giá trị  <br /> sản phẩm</th>
                            <th scope="col">Giá trị</th>
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao tác</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(discounts) &&
                            discounts.map((discount, index) => (
                                <tr key={discount.id}>
                                    <td>{calculateIndex(index)}</td>
                                    <td>{discount.code}</td>
                                    <td>{discount.name}</td>
                                    <td>{discount.description}</td>
                                    <td>{discount.minPrice} VNĐ</td>
                                    <td>
                                        {discount.salePercent ? `${discount.salePercent}%` : ""}
                                        {discount.salePrice ? `${discount.salePrice} VNĐ` : ""}
                                    </td>

                                    <td>{format(new Date(discount.startDate), 'yyyy-MM-dd HH:mm', { locale: vi })}</td>
                                    <td>{format(new Date(discount.endDate), 'yyyy-MM-dd HH:mm', { locale: vi })}</td>
                                    <td>
                                        <Badge color={statusMapping[discount.status]?.color || statusMapping.default.color}>
                                            {statusMapping[discount.status]?.label || statusMapping.default.label}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button color="info" size="sm" onClick={() => handleRowClick(discount)} disabled={discount.status === 2}><FaEdit /></Button>
                                        <Button color="danger" size="sm" onClick={() => deleteDiscount(discount.id)}><FaTrash /></Button>
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </Table>
                {/* Hiển thị thanh phân trang */}
                <Row className="mt-4">
                    <Col lg={6}>
                        <div style={{ fontSize: 14 }}>
                            Đang xem <b>{queryParams.page * queryParams.size + 1}</b>  đến <b>{queryParams.page * queryParams.size + discounts.length}</b> trong tổng số <b>{totalElements}</b> mục
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
                style={{ maxWidth: '1200px' }}
            >
                <ModalHeader toggle={toggle}>
                    <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Khuyến mại' : 'Thêm Mới Khuyến mại'}</h3>

                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="pl-lg-4">
                            <Row>

                                <Col lg="3">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            style={{ fontSize: 13 }}
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

                                <Col lg="3">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            style={{ fontSize: 13 }}
                                        >
                                            Giá trị sản phẩm từ:
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="number"
                                            value={formData.minPrice}
                                            onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>


                                <Col lg="3">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            style={{ fontSize: 13 }}
                                        >
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
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                style={{ fontSize: 13 }}
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
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                style={{ fontSize: 13 }}
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


                                <Col lg="3">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            style={{ fontSize: 13 }}
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
                                            style={{ fontSize: 13 }}
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
                                            style={{ fontSize: 13 }}
                                        >
                                            Mô tả
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Sản phẩm ....."
                                            rows="3"
                                            type="textarea"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Form >

                    <div className="pl-lg-4">

                        <Row className="align-items-center">
                            <h3 className="heading-small text-muted mb-0">Áp dụng với:</h3>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <Row className="align-items-center my-4">
                                    <div className="col" style={{ display: "flex" }}>
                                        <h3 className="heading-small text-black mb-0">Loại sản phẩm</h3>
                                    </div>

                                </Row>

                                <Table bordered hover responsive>
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

                                            <th scope="col">Mã</th>
                                            <th scope="col">Tên sản phẩm</th>
                                            <th scope="col">Thương hiệu</th>
                                            <th scope="col">Xuất xứ</th>
                                            <th scope="col">Thiết kế</th>
                                            <th scope="col">Loại da</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listShoes.map((shoes, index) => (
                                            <tr key={shoes.id}>
                                                <td className="text-center">
                                                    <FormGroup check>
                                                        <Input
                                                            type="checkbox"
                                                            checked={selectedShoesIds.includes(shoes.id)}
                                                            onChange={() => handleShoesCheckboxChange(shoes.id)}
                                                        />
                                                    </FormGroup>
                                                </td>
                                                <td>{shoes.code}</td>
                                                <td>{shoes.name}</td>
                                                <td>{shoes.brand}</td>
                                                <td>{shoes.origin}</td>
                                                <td>{shoes.designStyle}</td>
                                                <td>{shoes.skinType}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </Col>
                            <Col lg="6">
                                <Row className="align-items-center my-4">
                                    <div className="col" style={{ display: "flex" }}>
                                        <h3 className="heading-small text-black mb-0">Chi tiết sản phẩm</h3>
                                    </div>
                                    <div className="col-4 text-right">
                                        <Input type="text" size="sm" placeholder="Mã hoặc tên sản phẩm" style={{ fontSize: 11 }} />
                                    </div>
                                </Row>
                                <Table bordered hover responsive>
                                    <thead className="thead-light">
                                        <tr >
                                            <th className="text-center pb-4" >
                                                <FormGroup check>
                                                    <Input type="checkbox" />
                                                </FormGroup>
                                            </th>
                                            <th scope="col">Mã</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Màu</th>
                                            <th scope="col">Giá gốc</th>
                                            <th scope="col">Giá mới</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {listDetail.map((detail, index) => (
                                        <tr key={detail.id}>
                                            <td className="text-center">
                                                <FormGroup check>
                                                    <Input type="checkbox" />
                                                </FormGroup>
                                            </td>
                                            <td>{detail.code}</td>
                                            <td>{detail.size}</td>
                                            <td>{detail.color}</td>
                                            <td>{detail.price}</td>
                                            <td></td>
                                            <td>{detail.status === 1 ? "Đang kinh doanh": ""}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="pagination-container" style={{ fontSize: 8 }}>
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
                                </div>
                            </Col>
                        </Row>



                    </div>
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

        </>
    );
}

export default SaleProduct;
