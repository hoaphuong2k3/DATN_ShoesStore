import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaLock, FaLockOpen, FaFileAlt } from 'react-icons/fa';
import { FaSort } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import axiosInstance from "services/custommize-axios";
import { getAllShoesUser } from "services/Product2Service";
import { getAllShoesDetail2 } from "services/ShoesDetailService.js";
import {
    getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType,
    getAllToe, getAllSole, getAllLining, getAllCushion
} from "services/ProductAttributeService";
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import "assets/css/pagination.css";
// reactstrap components
import {
    Row, Col, Form, FormGroup, Input, Button, Table, Badge, InputGroup, InputGroupAddon, InputGroupText,
    Modal, ModalBody, ModalFooter, ModalHeader, Label
} from "reactstrap";
import { Tooltip, Popconfirm } from 'antd';

const SaleProduct = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleModal = () => {
        resetForm();
        resetSearch();
        setModal(true);
    }

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const [secondModal, setSecondModal] = useState(false);
    const toggleSecondModal = () => setSecondModal(!secondModal);

    const [thirdModal, setThirdModal] = useState(false);
    const toggleThirdModal = () => setThirdModal(!thirdModal);

    const [fourModal, setFourModal] = useState(false);
    const toggleFourModal = () => setFourModal(!fourModal);

    const [fiveModal, setFiveModal] = useState(false);
    const toggleFiveModal = () => setFiveModal(!fiveModal);
   
    const [discounts, setDiscounts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [listShoes, setListShoes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedShoesIds, setSelectedShoesIds] = useState([]);
    const [selectedDetailIds, setSelectedDetailIds] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [selectAll2, setSelectAll2] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [shoesDetailMapping, setShoesDetailMapping] = useState({});
    const [selectedShoesDetails, setSelectedShoesDetails] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reloadInterval, setReloadInterval] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [listBrand, setListBrand] = useState([]);
    const [listorigin, setListOrigin] = useState([]);
    const [listDesignStyle, setListDesignStyle] = useState([]);
    const [listSkinStype, setListSkinType] = useState([]);
    const [listToe, setListToe] = useState([]);
    const [listSole, setListSole] = useState([]);
    const [listLining, setListLining] = useState([]);
    const [listCushion, setListCushion] = useState([]);

    const [search2, setSearch2] = useState({
        code: "",
        status: 1
    });

    //loads product
    const [search, setSearch] = useState({
        code: "",
        name: "",
        brandId: null,
        originId: null,
        designStyleId: null,
        skinTypeId: null,
        soleId: null,
        liningId: null,
        toeId: null,
        cushionId: null,
        fromPrice: null,
        toPrice: null,
        fromQuantity: null,
        toQuantity: null,
        fromDateStr: "",
        toDateStr: "",
        createdBy: ""
    });
    const resetSearch = () => {
        setSearch({
            code: "",
            name: "",
            brandId: "",
            originId: "",
            designStyleId: "",
            skinTypeId: "",
            soleId: "",
            liningId: "",
            toeId: "",
            cushionId: "",
            fromPrice: "",
            toPrice: "",
            fromQuantity: "",
            toQuantity: "",
            fromDateStr: "",
            toDateStr: "",
            createdBy: ""
        })
    };

    const getlistBrand = async () => {
        let res = await getAllBrand();
        console.log(res);
        if (res && res.data) {
            setListBrand(res.data);
        }
    }
    const getListOrigin = async () => {
        let res = await getAllOrigin();
        if (res && res.data) {
            setListOrigin(res.data);
        }
    }
    const getListDesignStyle = async () => {
        let res = await getAllDesignStyle();
        if (res && res.data) {
            setListDesignStyle(res.data);
        }
    }
    const getListSkinType = async () => {
        let res = await getAllSkinType();
        if (res && res.data) {
            setListSkinType(res.data);
        }
    }
    const getListToe = async () => {
        let res = await getAllToe();
        if (res && res.data) {
            setListToe(res.data);
        }
    }
    const getListSole = async () => {
        let res = await getAllSole();
        if (res && res.data) {
            setListSole(res.data);
        }
    }
    const getListLining = async () => {
        let res = await getAllLining();
        if (res && res.data) {
            setListLining(res.data);
        }
    }
    const getListCushion = async () => {
        let res = await getAllCushion();
        if (res && res.data) {
            setListCushion(res.data);
        }
    }

    const getAll1 = async () => {
        try {
            let res = await getAllShoesUser(page, size, search);
            if (res && res.data && res.data.content) {
                setListShoes(res.data.content);
            }
        } catch (error) {
            setListShoes([]);
        }
    }

    useEffect(() => {
        getAll1(page, size);
        getlistBrand();
        getListOrigin();
        getListDesignStyle();
        getListSkinType();
        getListToe();
        getListSole();
        getListLining();
        getListCushion();
    }, []);

    useEffect(() => {
        getAll1(page, size);
    }, [search]);

    const onInputChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };


    //loads productDetail
    const handleEditButtonClick = async (shoesId) => {
        try {
            const response = await getAllShoesDetail2(shoesId, page, size, search2);
            if (response) {

                setSelectedShoesDetails(response.data.content);
                console.log(response.data.content);
                const mapping = { ...shoesDetailMapping };
                mapping[shoesId] = response.data.content.map(detail => detail.shoesDetailSearchResponse.id);
                setShoesDetailMapping(mapping);
                console.log(mapping);
            }
            setSecondModal(true);

        } catch (error) {
            setSelectedShoesDetails([]);

        }
    };

    //load productPromo
    const getProductPromo = async (discount) => {
        try {
            const response = await axiosInstance.get(`/promos/detailPromo/${discount}`);
            const products = response.data;
            setSelectedProduct(products);
            toggleFourModal();
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };


    //loads voucher
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 10,
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
        // Khởi tạo interval khi component được tạo
        const intervalId = setInterval(() => {
            fetchData();
            console.log("test");
        }, 1000);

        // Lưu intervalId vào state để sau này có thể xóa interval
        setReloadInterval(intervalId);

        return () => {
            clearInterval(intervalId);
        };
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
        0: { color: 'success', label: 'Kích hoạt' },
        1: { color: 'warning', label: 'Chờ kích hoạt' },
        2: { color: 'danger', label: 'Ngừng kích hoạt' }
    };

    //sắp xếp
    const handleSort = (field) => {
        const newSortOrder = queryParams.sortField === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
        setQueryParams({
            ...queryParams,
            sortField: field,
            sortOrder: newSortOrder,
        });
    };

    //lọc
    const resetFilters = () => {
        document.getElementById("minPrice").value = "";
        document.getElementById("maxPrice").value = "";
        document.getElementById("status").value = "";
        document.getElementById("fromDate").value = "";
        document.getElementById("toDate").value = "";
        document.getElementById("sale").value = "";
    };

    const handleFilter = () => {
        // Extract values from modal form fields
        const minPrice = document.getElementById("minPrice").value;
        const maxPrice = document.getElementById("maxPrice").value;
        const status = document.getElementById("status").value;
        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;
        const saleMethod = document.getElementById("sale").value;
        setQueryParams({
            ...queryParams,
            minPrice,
            maxPrice,
            status,
            fromDate,
            toDate,
            saleMethod,
        });
        toggleThirdModal();
    };

    //checkbox promo
    const [showActions, setShowActions] = useState(false);
    const handleCheckboxChange = (idDiscount) => {
        if (selectedItems.includes(idDiscount)) {
            setSelectedItems(selectedItems.filter((id) => id !== idDiscount));
            setShowActions(selectedItems.length - 1 > 0);
        } else {
            setSelectedItems([...selectedItems, idDiscount]);
            setShowActions(true);
        }
    };
    const handleSelectAll2 = () => {
        if (selectAll2) {
            setSelectedItems([]);
            setShowActions(false);
        } else {
            setSelectedItems(discounts.map(discount => discount.id));
            setShowActions(true);
        }
        setSelectAll2(!selectAll2);
    };

    //checkbox product
    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            const allShoesIds = listShoes.map(shoes => shoes.id);
            setSelectedShoesIds(allShoesIds);

            const allDetailIds = allShoesIds.reduce((acc, id) => {
                const ids = shoesDetailMapping[id] || [];
                return acc.concat(ids);
            }, []);
            setSelectedDetailIds(allDetailIds);

        } else {
            setSelectedShoesIds([]);
            setSelectedDetailIds([]);
        }
    };

    const handleShoesCheckboxChange = (shoesId) => {
        let shoesIds = [...selectedShoesIds];
        if (shoesIds.includes(shoesId)) {
            shoesIds = shoesIds.filter(id => id !== shoesId);
        } else {
            shoesIds.push(shoesId);
        }
        setSelectedShoesIds(shoesIds);

        const detailIds = shoesIds.reduce((acc, id) => {
            const ids = shoesDetailMapping[id] || [];
            return acc.concat(ids);
        }, []);
        setSelectedDetailIds(detailIds);
    };

    // const handleSelectAllDetails = () => {
    //     const allDetailsSelected = selectedDetailIds.length === selectedShoesDetails.length;
    //     if (allDetailsSelected) {
    //         setSelectedDetailIds([]);
    //     } else {
    //         // Lấy danh sách ID chi tiết
    //         const detailIds = selectedShoesDetails.map(detail => detail.id);
    //         setSelectedDetailIds(detailIds);
    //     }
    // };

    const handleDetailCheckboxChange = (detailId) => {
        let detailIds = [...selectedDetailIds];
        if (detailIds.includes(detailId)) {
            detailIds = detailIds.filter(id => id !== detailId);
        } else {
            detailIds.push(detailId);
        }
        setSelectedDetailIds(detailIds);
        // handleSelectAllDetails(); 
    };


    //click on selected
    const [formData, setFormData] = useState({
        id: null,
        code: "",
        name: "",
        minPrice: "",
        sale: null,
        salePercent: "",
        salePrice: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        // idShoe: [],
    });

    const handleRowClick = async (discount) => {
        // Lấy chi tiết khuyến mãi từ API
        const promoDetailsResponse = await axiosInstance.get(`/promos/detailPromo/${discount.id}`);
        const promoDetailsData = promoDetailsResponse.data;

        const apiProductIds = promoDetailsData ? promoDetailsData.map(product => product.id) : [];
        setSelectedShoesIds(apiProductIds);

        const productIds = promoDetailsData.map(product => product.idShoeDetail);
        setSelectedDetailIds(productIds);

        setFormData({
            id: discount.id,
            code: discount.code,
            name: discount.name,
            startDate: discount.startDate,
            endDate: discount.endDate,
            description: discount.description,
            minPrice: discount.minPrice,
            status: discount.status
        });

        if (discount.salePercent !== null) {
            setFormData(prevFormData => ({
                ...prevFormData,
                salePercent: discount.salePercent,
                salePrice: "",
                sale: true,
            }));
        }
        if (discount.salePrice !== null) {
            setFormData(prevFormData => ({
                ...prevFormData,
                salePercent: "",
                salePrice: discount.salePrice,
                sale: false,
            }));
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
            idDiscountShoeDetails: "",
            sale: false

        });
        setSelectedShoesIds([]);
        setSelectedDetailIds([]);
        setSelectAll(false);
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
                await axiosInstance.put(`/promos/updatePromos`, {
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
                    idShoe: selectedDetailIds,
                });
                fetchData();
                toast.success("Cập nhật thành công!");
            } else {
                await axiosInstance.post('/promos/createPromos', {
                    code: formData.code,
                    name: formData.name,
                    minPrice: formData.minPrice,
                    sale: formData.sale,
                    description: formData.description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    salePercent: formData.sale ? formData.salePercent : null,
                    salePrice: formData.sale ? null : formData.salePrice,
                    idShoe: selectedDetailIds,
                });
                fetchData();
                toast.success("Thêm mới thành công!");
            }

            setModal(false);
            resetForm();
            resetSearch();
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

    //Update status
    const lock = async (id) => {
        await axiosInstance.patch(`/promos/stopPromos/${id}`);
        toast.success("Cập nhật thành công");
        fetchData();
    };

    const openlock = async (id) => {
        try {
            const selectedDiscount = discounts.find(discount => discount.id === id);

            if (new Date(selectedDiscount.endDate) >= new Date(selectedDiscount.startDate)) {
                await axiosInstance.patch(`/promos/setPromoRun/${id}`);
                toast.success("Cập nhật thành công");
                fetchData();
            } else {
                toast.error("Ngày kết thúc phải >= ngày bắt đầu");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    //delete
    const deleteDiscount = (id) => {
        axiosInstance.delete(`/promos/deletePromos/${id}`)
            .then(response => {
                fetchData();
                toast.success("Xóa thành công");
            })
            .catch(error => {
                console.error('Lỗi khi xóa dữ liệu:', error);
            });
    };
    const handleDeleteButtonClick = () => {
        const idsToDelete = selectedItems.join(',');
        axiosInstance.delete(`/vouchers/deletePromoAll?deleteAll=${idsToDelete}`)
            .then(response => {
                fetchData();
                toast.success("Xóa thành công");
                setSelectedItems([]);
                setSelectAll(false);
            })
            .catch(error => {
                console.error('Lỗi khi xóa dữ liệu:', error);
            });
    };

    return (
        <>

            <div className="col mt-4">

                <Row className="align-items-center my-4">
                    <div className="col d-flex">
                        <Button color="warning" outline size="sm" onClick={toggleThirdModal}>
                            <FaFilter size="16px" className="mr-1" />Bộ lọc
                        </Button>

                        <Col>
                            <InputGroup size="sm">
                                <Input type="search"
                                    placeholder="Tìm kiếm mã, tên voucher..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FaSearch />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </div>
                    <div className="col text-right">
                        {showActions && (
                            <Popconfirm
                                title="Bạn có chắc muốn xóa?"
                                onConfirm={() => handleDeleteButtonClick()}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <Button color="danger" outline size="sm">
                                    Xóa tất cả
                                </Button>
                            </Popconfirm>
                        )}
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
                            <th >
                                <FormGroup check className="pb-4">
                                    <Input
                                        type="checkbox"
                                        checked={selectAll2}
                                        onChange={handleSelectAll2}
                                    />
                                </FormGroup>
                            </th>
                            <th scope="col" style={{ color: "black" }}>STT</th>
                            <th scope="col" style={{ color: "black", position: "sticky", zIndex: '1', left: '0' }}>Trạng thái</th>
                            <th scope="col" style={{ color: "black" }}>
                                Mã
                                <FaSort
                                    style={{ cursor: "pointer" }}
                                    className="text-muted"
                                    onClick={() => handleSort("code")} />
                            </th>
                            <th scope="col" style={{ color: "black" }}>
                                Tên khuyến mại
                                <FaSort
                                    style={{ cursor: "pointer" }}
                                    className="text-muted"
                                    onClick={() => handleSort("name")} />
                            </th>
                            <th scope="col" style={{ color: "black" }}>
                                Sản phẩm <br />tối thiểu
                                <FaSort
                                    style={{ cursor: "pointer" }}
                                    className="text-muted"
                                    onClick={() => handleSort("min_price")} />
                            </th>
                            <th scope="col" style={{ color: "black" }}>Phương thức</th>
                            <th scope="col" style={{ color: "black" }}>Giá trị</th>
                            <th scope="col" style={{ color: "black" }}>
                                Ngày bắt đầu
                                <FaSort
                                    style={{ cursor: "pointer" }}
                                    className="text-muted"
                                    onClick={() => handleSort("start_date")} />
                            </th>
                            <th scope="col" style={{ color: "black" }}>
                                Ngày kết thúc
                                <FaSort
                                    style={{ cursor: "pointer" }}
                                    className="text-muted"
                                    onClick={() => handleSort("end_date")} />
                            </th>
                            <th scope="col" style={{ color: "black" }}>Mô tả</th>
                            <th scope="col" style={{ color: "black", position: "sticky", zIndex: '1', right: '0' }}>Thao tác</th>

                        </tr>
                    </thead>
                    <tbody style={{ color: "black" }}>
                        {Array.isArray(discounts) &&
                            discounts
                                .filter(
                                    (discount) =>
                                        discount.code.toLowerCase().includes(searchValue.toLowerCase()) ||
                                        discount.name.toLowerCase().includes(searchValue.toLowerCase())
                                )
                                .filter((discount) => {
                                    if (queryParams.saleMethod) {
                                        if (queryParams.saleMethod === "0" && discount.salePercent) {
                                            return true;
                                        }
                                        if (queryParams.saleMethod === "1" && discount.salePrice) {
                                            return true;
                                        }
                                        return false;
                                    }
                                    return true;
                                })
                                .map((discount, index) => (
                                    <tr key={discount.id}>
                                        <td>
                                            <FormGroup check className="pb-4">
                                                <Input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(discount.id)}
                                                    onChange={() => handleCheckboxChange(discount.id)}
                                                />

                                            </FormGroup>
                                        </td>
                                        <td>{calculateIndex(index)}</td>
                                        <td style={{ position: "sticky", zIndex: '1', left: '0', background: "#fff", textAlign: "center" }}>
                                            <Badge color={statusMapping[discount.status]?.color || statusMapping.default.color}>
                                                {statusMapping[discount.status]?.label || statusMapping.default.label}
                                            </Badge>
                                        </td>
                                        <td>{discount.code}</td>
                                        <td>{discount.name}</td>
                                        <td style={{ textAlign: "right" }}>{formatter.format(discount.minPrice)}</td>
                                        <td style={{ textAlign: "center" }}>
                                            {discount.salePercent ? (
                                                <span>Phần trăm</span>
                                            ) : discount.salePrice ? (
                                                <span>Tiền mặt</span>
                                            ) : null}
                                        </td>

                                        <td style={{ textAlign: "right" }}>
                                            {discount.salePercent ? `${discount.salePercent}%` : ""}
                                            {discount.salePrice ? `${formatter.format(discount.salePrice)}` : ""}
                                        </td>
                                        <td>{format(new Date(discount.startDate), 'yyyy-MM-dd HH:mm', { locale: vi })}</td>
                                        <td>{format(new Date(discount.endDate), 'yyyy-MM-dd HH:mm', { locale: vi })}</td>
                                        <td>{discount.description}</td>
                                        <td style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff" }}>
                                            {discount.status === 0 &&
                                                <Tooltip title="Ngừng kích hoạt">
                                                    <Button color="link" size="sm" ><FaLockOpen onClick={() => lock(discount.id)} /></Button>
                                                </Tooltip>
                                            }
                                            {(discount.status === 1 || discount.status === 2) &&
                                                <Tooltip title="Kích hoạt">
                                                    <Button color="link" size="sm" ><FaLock onClick={() => openlock(discount.id)} /></Button>
                                                </Tooltip>
                                            }

                                            <Tooltip title="Chỉnh sửa">
                                                <Button color="link" size="sm" onClick={() => handleRowClick(discount)}><FaEdit /></Button>
                                            </Tooltip>

                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa?"
                                                onConfirm={() => deleteDiscount(discount.id)}
                                                okText="Xóa"
                                                cancelText="Hủy"
                                            >
                                                <Tooltip title="Xóa">
                                                    <Button color="link" size="sm"><FaTrash /></Button>
                                                </Tooltip>
                                            </Popconfirm>

                                            <Tooltip title="Chi tiết">
                                                <Button color="link" size="sm" onClick={() => getProductPromo(discount.id)}><FaFileAlt /></Button>
                                            </Tooltip>
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
                                    <option value="10">10</option>
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

            {/* SaleProduct */}
            <Modal
                isOpen={modal}
                toggle={toggle}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '1000px' }}
            >
                <ModalHeader toggle={toggle}>
                    <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Khuyến mại' : 'Thêm Mới Khuyến mại'}</h3>

                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="pl-lg-4">
                            <Row>

                                <Col lg="4">
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

                                <Col lg="4">
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



                                <Col lg="4">
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
                                    <Col lg="4">
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
                                    <Col lg="4">
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


                                <Col lg="4">
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
                                <Col lg="4">
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

                        <Row className="align-items-center mb-3">
                            <div className="col" style={{ display: "flex" }}>
                                <h3 className="heading-small text-black mb-0">Áp dụng với sản phẩm:</h3>

                                <Col >
                                    <InputGroup size="sm" style={{ width: 300, float: "right" }}>
                                        <Input type="search"
                                            placeholder="Tìm kiếm mã, tên sản phẩm..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <FaSearch />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>

                                <Button color="link" outline size="sm" onClick={toggleFiveModal}>
                                    <FaFilter size="16px" />
                                </Button>
                            </div>
                        </Row>

                        <Table bordered hover responsive>
                            <thead className="thead-light text-center">
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
                                    <th scope="col">Hãng</th>
                                    <th scope="col">Xuất xứ</th>
                                    <th scope="col">Thiết kế</th>
                                    <th scope="col">Loại da</th>
                                    <th scope="col">Mũi giày</th>
                                    <th scope="col">Đế giày</th>
                                    <th scope="col">Lót giày</th>
                                    <th scope="col">Đệm giày</th>
                                    <th scope="col">Khoảng giá</th>
                                    <th scope="col" style={{ position: "sticky", zIndex: '1', right: '0' }}>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listShoes
                                    .filter((shoes) =>
                                        shoes.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        shoes.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((shoes, index) => (
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
                                            <td>{shoes.toe}</td>
                                            <td>{shoes.sole}</td>
                                            <td>{shoes.lining}</td>
                                            <td>{shoes.cushion}</td>

                                            <td className="text-right">{formatter.format(shoes.priceMin)} - {formatter.format(shoes.priceMax)}</td>
                                            <td className="text-center" style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff" }}>
                                                <Button color="link" size="sm" onClick={() => handleEditButtonClick(shoes.id)}><FaEdit /></Button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        </Table>

                    </div>
                </ModalBody >
                <ModalFooter>
                    <div className="text-center">
                        <Button color="primary" outline onClick={saveDiscount} size="sm">
                            {formData.id ? "Cập nhật" : "Thêm mới"}
                        </Button>
                        <Button color="primary" outline onClick={resetForm} size="sm">
                            Làm mới
                        </Button>
                        <Button color="danger" outline onClick={toggle} size="sm">
                            Đóng
                        </Button>
                    </div>
                </ModalFooter>

            </Modal >

            {/* ListDetailProduct */}
            <Modal
                isOpen={secondModal}
                toggle={toggleSecondModal}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '500px' }}
            >
                <ModalHeader toggle={toggleSecondModal}>
                    <h3 className="heading-small text-muted mb-0">Chi tiết sản phẩm</h3>
                </ModalHeader>
                <ModalBody>
                    <Table bordered hover responsive>
                        <thead className="thead-light text-center">
                            <tr >
                                <th className="pb-4">
                                    {/* <FormGroup check>
                                        <Input
                                            type="checkbox"
                                            checked={selectedDetailIds.length === selectedShoesDetails.length}
                                            onChange={handleSelectAllDetails}
                                        />
                                    </FormGroup> */}
                                </th>
                                <th scope="col">Mã</th>
                                <th scope="col">Size</th>
                                <th scope="col">Màu</th>
                                <th scope="col">Giá gốc</th>
                                <th scope="col">Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedShoesDetails.map((detail, index) => (
                                <tr key={detail.id}>
                                    <td className="text-center">
                                        <FormGroup check>
                                            <Input
                                                type="checkbox"
                                                checked={selectedDetailIds.includes(detail.shoesDetailSearchResponse.id)}
                                                onChange={() => handleDetailCheckboxChange(detail.shoesDetailSearchResponse.id)}
                                            />
                                        </FormGroup>
                                    </td>
                                    <td>{detail.shoesDetailSearchResponse.code}</td>
                                    <td>{detail.shoesDetailSearchResponse.size}</td>
                                    <td>{detail.shoesDetailSearchResponse.color}</td>
                                    <td className="text-right">{formatter.format(detail.shoesDetailSearchResponse.price)}</td>
                                    <td className="text-right">{detail.shoesDetailSearchResponse.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="sm" onClick={toggleSecondModal}>Đóng</Button>
                </ModalFooter>
            </Modal>

            {/* DetailProductPromo */}
            <Modal
                isOpen={fourModal}
                toggle={toggleFourModal}
                style={{ maxWidth: '900px' }}
                backdrop={false}
            >
                <ModalHeader toggle={toggleFourModal}>
                    <h3 className="heading-small text-muted mb-0">Sản phẩm khuyến mại</h3>
                </ModalHeader>
                <ModalBody style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Table>
                        <thead className="thead-light">
                            <tr>
                                <th className="text-dark">STT</th>
                                <th className="text-dark">Mã</th>
                                <th className="text-dark">Ảnh</th>
                                <th className="text-dark">Tên sản phẩm</th>
                                <th className="text-dark">Size</th>
                                <th className="text-dark">Màu</th>
                                <th className="text-dark">Giá gốc</th>
                                <th className="text-dark">Giá mới</th>
                            </tr>
                        </thead>
                        {selectedProduct &&
                            selectedProduct.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.code}</td>
                                    <td>{product.imgURI}</td>
                                    <td>{product.name}</td>
                                    <td>{product.size}</td>
                                    <td>{product.color}</td>
                                    <td>{formatter.format(product.originPrice)}</td>
                                    <td>{formatter.format(product.discountPrice)}</td>
                                </tr>
                            ))}
                    </Table>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" outline size="sm" onClick={toggleFourModal}>
                        Đóng
                    </Button>
                </ModalFooter>

            </Modal>
            {/* Lọc KM*/}
            <Modal
                isOpen={thirdModal}
                toggle={toggleThirdModal}
                style={{ maxWidth: '350px', right: 'unset', left: 0, position: 'fixed', marginLeft: '252px', marginRight: 0, top: "-27px" }}
                backdrop={false}
            >
                <ModalHeader toggle={toggleThirdModal}>
                    <h3 className="heading-small text-muted mb-0">Bộ lọc tìm kiếm</h3>
                </ModalHeader>
                <ModalBody style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Form >

                        <FormGroup>

                            <Row>
                                <Col xl="6">
                                    <label style={{ fontSize: 13 }}
                                        className="form-control-label"
                                    >
                                        Sản phẩm từ
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="number" size="sm" id="minPrice"
                                    />
                                </Col>

                                <Col xl="6">
                                    <label style={{ fontSize: 13 }}
                                        className="form-control-label"
                                    >
                                        đến
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        type="number" size="sm" id="maxPrice"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <label style={{ fontSize: 13 }}
                                className="form-control-label"
                            >
                                Trạng thái
                            </label>
                            <Input
                                className="form-control-alternative"
                                type="select" size="sm" id="status"
                            >
                                <option value="">Tất cả</option>
                                <option value="0">Đang kích hoạt</option>
                                <option value="1">Chờ kích hoạt</option>
                                <option value="2">Ngừng kích hoạt</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <label style={{ fontSize: 13 }}
                                className="form-control-label"
                            >
                                Phương thức
                            </label>
                            <Input
                                className="form-control-alternative"
                                type="select" size="sm" id="sale"
                            >
                                <option value="">Tất cả</option>
                                <option value="0">Phần trăm</option>
                                <option value="1">Tiền mặt</option>

                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <label style={{ fontSize: 13 }}
                                className="form-control-label"
                            >
                                Ngày bắt đầu
                            </label>
                            <Input
                                className="form-control-alternative"
                                type="date" size="sm" id="fromDate"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label style={{ fontSize: 13 }}
                                className="form-control-label"
                            >
                                Ngày kết thúc
                            </label>
                            <Input
                                className="form-control-alternative"
                                type="date" size="sm" id="toDate"
                            />
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="row w-100">
                        <div className="col-4">
                            <Button color="primary" outline size="sm" block onClick={() => { resetFilters(); }}>
                                Làm mới
                            </Button>
                        </div>
                        <div className="col-4">
                            <Button color="primary" outline size="sm" block onClick={handleFilter}>
                                Lọc
                            </Button>
                        </div>
                        <div className="col-4">
                            <Button color="danger" outline size="sm" block onClick={toggleThirdModal}>
                                Đóng
                            </Button>
                        </div>
                    </div>
                </ModalFooter>

            </Modal>

            {/* Lọc Product */}
            <Modal
                isOpen={fiveModal}
                toggle={toggleFiveModal}
                style={{ maxWidth: '400px', right: 'unset', left: 0, position: 'fixed', marginLeft: '252px', marginRight: 0 }}
                backdrop={false}
            >
                <ModalHeader toggle={toggleFiveModal}>
                    <h3 className="heading-small text-muted mb-0">Bộ lọc tìm kiếm</h3>
                </ModalHeader>
                <ModalBody style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Form>
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Hãng
                                    </label>
                                    <Input id="btn_select_tt" type="select" name="brandId" value={search.brandId}
                                        className="form-control-alternative"
                                        size="sm"
                                        onChange={(e) => onInputChange(e)}>
                                        <option value=" "> -- Chọn --  </option>
                                        {listBrand && listBrand.length > 0 &&
                                            listBrand.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id} >
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Xuất xứ
                                    </label>
                                    <Input id="btn_select_tt" name="originId" type="select" value={search.originId}
                                        className="form-control-alternative"
                                        size="sm"
                                        onChange={(e) => onInputChange(e)}>
                                        <option value="" > -- Chọn --  </option>
                                        {listorigin && listorigin.length > 0 &&
                                            listorigin.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Thiết kế
                                    </label>
                                    <Input id="btn_select_tt" name="designStyleId" type="select" value={search.designStyleId}
                                        onChange={(e) => onInputChange(e)} className="form-control-alternative" size="sm">
                                        <option value="" > -- Chọn --  </option>
                                        {listDesignStyle && listDesignStyle.length > 0 &&
                                            listDesignStyle.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Loại da
                                    </label>
                                    <Input id="btn_select_tt" name="skinTypeId" type="select" value={search.skinTypeId}
                                        onChange={(e) => onInputChange(e)} className="form-control-alternative" size="sm">
                                        <option value="" > -- Chọn --  </option>
                                        {listSkinStype && listSkinStype.length > 0 &&
                                            listSkinStype.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Mũi giày
                                    </label>
                                    <Input id="btn_select_tt" name="toeId" type="select" value={search.toeId}
                                        onChange={(e) => onInputChange(e)} className="form-control-alternative" size="sm">
                                        <option value="" > -- Chọn --  </option>
                                        {listToe && listToe.length > 0 &&
                                            listToe.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Đế giày
                                    </label>
                                    <Input id="btn_select_tt" name="soleId" type="select" value={search.soleId}
                                        onChange={(e) => onInputChange(e)} className="form-control-alternative" size="sm">
                                        <option value="" > -- Chọn --  </option>
                                        {listSole && listSole.length > 0 &&
                                            listSole.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Lót giày
                                    </label>
                                    <Input id="btn_select_tt" name="liningId" type="select" value={search.liningId}
                                        onChange={(e) => onInputChange(e)} className="form-control-alternative" size="sm">
                                        <option value="" > -- Chọn --  </option>
                                        {listLining && listLining.length > 0 &&
                                            listLining.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        style={{ fontSize: 13 }}
                                    >
                                        Đệm giày
                                    </label>
                                    <Input id="btn_select_tt" name="cushionId" type="select" value={search.cushionId}
                                        onChange={(e) => onInputChange(e)} className="form-control-alternative" size="sm">
                                        <option value=" "> -- Chọn --  </option>
                                        {listCushion && listCushion.length > 0 &&
                                            listCushion.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>

                                    <Row>
                                        <Col xl={6}>
                                            <Label style={{ fontSize: 13 }} className="form-control-label">
                                                Giá từ:
                                            </Label>
                                            <Input size="sm"
                                                className="form-control-alternative"
                                                id="find_code"
                                                name="fromPrice"
                                                value={search.fromPrice}
                                                onChange={(e) => onInputChange(e)}
                                            />
                                        </Col>

                                        <Col xl={6}>
                                            <Label style={{ fontSize: 13 }} className="form-control-label">
                                                đến:
                                            </Label>
                                            <Input size="sm"
                                                className="form-control-alternative"
                                                id="find_code"
                                                name="toPrice"
                                                value={search.toPrice}
                                                onChange={(e) => onInputChange(e)}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" outline size="sm" block onClick={resetSearch}>
                        Làm mới
                    </Button>
                </ModalFooter>

            </Modal>

        </>
    );
}

export default SaleProduct;
