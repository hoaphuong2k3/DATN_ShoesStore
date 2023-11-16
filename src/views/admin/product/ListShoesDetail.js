import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findShoes } from "services/Product2Service";
import { getAllShoesDetail } from "services/ShoesDetailService.js";
import ReactPaginate from 'react-paginate';
import { FaEdit, FaTrash, FaLock, FaLockOpen, FaAngleDown, FaAngleUp, FaFilter, FaSearch } from 'react-icons/fa';
import { getAllColorId, getAllSizeId, getAllColor, getAllSize } from "services/ProductAttributeService";
import {
    Card, CardBody, Container, Row, Col, FormGroup, Input, Button, Form, CardTitle, Label, Table, Badge, Modal, ModalHeader, ModalFooter, ModalBody, CardHeader, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import { toast } from 'react-toastify';
import Switch from 'react-input-switch';
import axios from "axios";

const ListShoesDetail = () => {
    const [value, setValue] = useState('no');
    const { id } = useParams();
    const statusMapping = {
        0: { color: 'danger', label: 'Ngừng kinh doanh' },
        1: { color: 'success', label: 'Đang kinh doanh' },
        2: { color: 'warning', label: 'Hết hàng' }
    };

    let navigate = useNavigate();
    const [ListShoesDetail, setListShoesDetail] = useState([]);
    const [listSizeById, setListSizeById] = useState([]);
    const [listColorById, setListColorById] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [dataShoesById, setDataShoesById] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElenments] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const handlePageClick = (event) => {
        setPage(+event.selected);
    }
    const onChangeSize = (e) => {
        setSize(+e.target.value);
    }
    //getData
    const [search, setSearch] = useState({
        code: "",
        sizeId: null,
        colorId: null,
        fromQuantity: null,
        toQuantity: null,
        fromPrice: null,
        toPrice: null,
        status: null,
        fromDateStr: "",
        toDateStr: "",
        createdBy: "",
        fromDate: "",
        toDate: ""
    });
    const resetSearch = () => {
        setSearch({
            code: "",
            sizeId: "",
            colorId: "",
            fromQuantity: "",
            toQuantity: "",
            fromPrice: "",
            toPrice: "",
            status: "",
            fromDateStr: "",
            toDateStr: "",
            createdBy: "",
            fromDate: "",
            toDate: ""
        })
    };
    const getData = async () => {
        try {
            let res = await findShoes(id);
            if (res && res.data) {
                setDataShoesById(res.data);
            }
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
            navigate("/admin/product");
        }
    }
    //getAll
    const getAll = async () => {
        try {
            let res = await getAllShoesDetail(id, page, size, search);
            if (res && res.data && res.data.content) {
                setListShoesDetail(res.data.content);
                console.log(res);
                setTotalElenments(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                // setListShoes
                // setTotalUsers(res.total);
                // setTotalPages(res.total_pages);
                // setlistUsers(res.data);
            }
        } catch (error) {
            setListShoesDetail([]);
        }
    }
    useEffect(() => {
    }, [ListShoesDetail]);
    useEffect(() => {
        console.log(search);
        getAll();
    }, [search]);
    useEffect(() => {
        console.log("size", size);
        getAll();
    }, [size]);
    useEffect(() => {
        console.log("page", page);
        getAll();
    }, [page]);
    useEffect(() => {
        getlistColorById();
        getlistSizeById();
        getlistColor();
        getlistSize();
        getData();
        getAll();
    }, []);


    const onInputChange = async (e) => {
        await setSearch({ ...search, [e.target.name]: e.target.value });
    };
    //Hiển thị combobox
    const getlistColorById = async () => {
        let res = await getAllColorId(id);
        if (res && res.data) {
            setListColorById(res.data);
        }
    }
    const getlistSizeById = async () => {
        let res = await getAllSizeId(id);
        if (res && res.data) {
            setListSizeById(res.data);
        }
    }
    //Bắt đầu conmbobox
    const getlistColor = async () => {
        let res = await getAllColor();
        if (res && res.data) {
            setListColor(res.data);
        }
    }
    const getlistSize = async () => {
        let res = await getAllSize();
        if (res && res.data) {
            setListSize(res.data);
        }
    }

    //Cbb selected
    const [selectAllSize, setSelectAllSize] = useState(false);
    const [checkboxesSize, setCheckboxesSize] = useState([]);
    const [selectedValuesSize, setSelectedValuesSize] = useState([]);
    const initializeCheckboxesSize = () => {
        const initialCheckboxesSize = listSize.map((item) => ({
            id: item.id,
            label: item.name,
            checked: false,
        }));
        setCheckboxesSize(initialCheckboxesSize);
    };

    function handleSelectAllSize() {
        const updatedCheckboxesSize = checkboxesSize.map((checkbox) => ({
            ...checkbox,
            checked: !selectAllSize,
        }));
        setCheckboxesSize(updatedCheckboxesSize);
        setSelectAllSize(!selectAllSize);
        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesSize = updatedCheckboxesSize
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesSize(selectedValuesSize);
    }

    function handleCheckboxSizeChange(checkboxId) {
        const updatedCheckboxesSize = checkboxesSize.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setCheckboxesSize(updatedCheckboxesSize);

        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesSize = updatedCheckboxesSize
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesSize(selectedValuesSize);
    }
    useEffect(() => {
        initializeCheckboxesSize();
    }, [listSize]);
    //End Cbb selected

    //Cbb selected color
    const [selectAllColor, setSelectAllColor] = useState(false);
    const [checkboxesColor, setCheckboxesColor] = useState([]);
    const [selectedValuesColor, setSelectedValuesColor] = useState([]);
    const initializeCheckboxesColor = () => {
        const initialCheckboxesColor = listColor.map((item) => ({
            id: item.id,
            label: item.name,
            checked: false,
        }));
        setCheckboxesColor(initialCheckboxesColor);
    };

    function handleSelectAllColor() {
        const updatedCheckboxesColor = checkboxesColor.map((checkbox) => ({
            ...checkbox,
            checked: !selectAllColor,
        }));
        setCheckboxesColor(updatedCheckboxesColor);
        setSelectAllColor(!selectAllColor);

        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesColor = updatedCheckboxesColor
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesColor(selectedValuesColor);
    }

    function handleCheckboxColorChange(checkboxId) {
        const updatedCheckboxesColor = checkboxesColor.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setCheckboxesColor(updatedCheckboxesColor);

        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesColor = updatedCheckboxesColor
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesColor(selectedValuesColor);
    }
    useEffect(() => {
        initializeCheckboxesColor();
    }, [listColor]);


    //Xử lý thêm chi tiết sản phẩm
    const [listAddMany, setListAddMany] = useState([]);
    useEffect(() => {
        console.log("trc khi selectedValuesColor:", selectedValuesColor);
        if (listAddMany.length > 0) {
            if (selectedValuesColor.length === 0 || selectedValuesSize.length === 0) {
                setListAddMany([]);
            } else {
                setListAddMany(listAddMany.filter(itemB => selectedValuesColor.some(itemA => itemA.id === itemB.colorId)));
            }
        }
    }, [selectedValuesColor]);
    useEffect(() => {
        console.log("trc khi selectedValuesSize:", selectedValuesSize);
        if (listAddMany.length > 0) {
            if (selectedValuesColor.length === 0 || selectedValuesSize.length === 0) {
                console.log("trc khi selectedValuesSize selectedValuesColor.length === 0 || selectedValuesSize.length === 0:", selectedValuesSize);
                setListAddMany([]);
            } else {
                console.log("trc khi selectedValuesSize else:", selectedValuesSize);
                setListAddMany(listAddMany.filter(itemB => selectedValuesSize.some(itemA => itemA.id === itemB.sizeId)));
            }
        }
    }, [selectedValuesSize]);

    const [shoesdetail, setShoesDetail] = useState({
        sizeId: "",
        colorId: "",
        quantity: "",
        price: "",
        status: "1"
    });

    const onInputChangeAdd = (e, idSize, idColor) => {
        const { name, value } = e.target;
        if (listAddMany.length > 0) {
            const existingItem = listAddMany.find(item => item && item.sizeId === idSize && item.colorId === idColor);
            console.log("existingItem", existingItem);
            if (existingItem) {
                setShoesDetail({
                    ...shoesdetail, sizeId: existingItem.sizeId,
                    colorId: existingItem.colorId,
                    quantity: existingItem.quantity,
                    price: existingItem.price,
                    status: existingItem.status, [name]: value, sizeId: idSize, colorId: idColor
                });
            } else {
                setShoesDetail({
                    ...shoesdetail, sizeId: "",
                    colorId: "",
                    quantity: "",
                    price: "",
                    status: "1", [name]: value, sizeId: idSize, colorId: idColor
                });
            }
        } else {
            setShoesDetail({ ...shoesdetail, [name]: value, sizeId: idSize, colorId: idColor });
        }
    };

    useEffect(() => {
        console.log('list', listAddMany);
    }, [listAddMany]);

    useEffect(() => {
        console.log(shoesdetail);
        console.log('list', listAddMany);
        if (listAddMany.length > 0) {
            const existingItem = listAddMany.find(item => item && item.sizeId === shoesdetail.sizeId && item.colorId === shoesdetail.colorId);
            console.log("existingItem", existingItem);
            if (existingItem) {
                const updatedArray = listAddMany.map(item => {
                    if (item && item.sizeId === shoesdetail.sizeId && item.colorId === shoesdetail.colorId) {
                        return {
                            ...item, sizeId: shoesdetail.sizeId, colorId: shoesdetail.colorId, quantity: shoesdetail.quantity, price: shoesdetail.price, status: shoesdetail.status

                        };
                    }
                    return item;
                });
                console.log("updatedArray", updatedArray);
                setListAddMany(updatedArray);
            } else {
                setListAddMany([...listAddMany, shoesdetail]);
            }
        } else {
            setListAddMany([shoesdetail]);
        }
    }, [shoesdetail]);
    //Kêt thúc conmbobox
    const onClickAddMany = async () => {
        console.log({ 'shoesDetailCreateRequests': [...listAddMany] });
        try {
            await axios.post(`http://localhost:33321/api/admin/shoesdetail/${id}`, { 'shoesDetailCreateRequests': [...listAddMany] });
            getAll();
            toast.success("Thêm thành công!");
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }
    };
    //Khóa
    const lock = async (id) => {
        await axios.put(`http://localhost:33321/api/admin/shoesdetail/stop-business/${id}`);
        getAll();
    };
    const openlock = async (id) => {
        await axios.put(`http://localhost:33321/api/admin/shoesdetail/on-business/${id}`);
        getAll();
    };
    //End Hiển Thi Combobox

    const exportExcel = async () => {
        try {
            const requestData = ListShoesDetail; // Dữ liệu trong ListShoesDetail
            const res = await axios.post(`http://localhost:33321/api/admin/shoesdetail/export/excel`, requestData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const blob = new Blob([res.data], { type: 'application/excel' });

            // Tạo một URL cho Blob và tạo một thẻ a để download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'shoesdetail_export.xlsx';
            document.body.appendChild(a);
            a.click();

            // Giải phóng tài nguyên
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
        }
    };
    //Import Excel
    const fileInputRef = useRef(null);

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };
    const formData = new FormData();
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            formData.append('file', selectedFile);
            try {
                console.log(formData)
                const response = await axios.post(`http://localhost:33321/api/admin/shoesdetail/import-excel`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response);
                getAll();
                toast.success("Nhập excel thành công");
                // navigate("/admin/product");
            } catch (error) {
                let errorMessage = "Lỗi từ máy chủ";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                toast.error(errorMessage);
            }
        }
    };
    //Kết thúc import excel

    //Tải mẫu excel

    const taiMau = async () => {
        try {
            const res = await axios.get(`http://localhost:33321/api/admin/shoesdetail/export/pattern`, {
                responseType: 'blob'
            });

            const blob = new Blob([res.data], { type: 'application/excel' });

            // Tạo một URL cho Blob và tạo một thẻ a để download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Template_addShoesDetail.xlsx';
            document.body.appendChild(a);
            a.click();

            // Giải phóng tài nguyên
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
        }
    };
    //Kết thúc tải mẫu excel

    const xuatPDF = async () => {
        try {
            const requestData = ListShoesDetail;
            const res = await axios.post(`http://localhost:33321/api/admin/shoesdetail/export/pdf`, requestData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });

            // Tạo một URL cho Blob và tạo một thẻ a để download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Export_ShoesDetail.pdf';
            document.body.appendChild(a);
            a.click();

            // Giải phóng tài nguyên
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
        }
    };
    //End exportexcel

    // Thêm mới 1 ctsp
    const [modalAdd, setModalAdd] = useState(false);
    const toggle = () => setModalAdd(!modalAdd);
    const [modalEdit, setModalEdit] = useState(false);
    const toggleEdit = () => setModalEdit(!modalEdit);
    useEffect(() => {
        if (modalAdd === false) {
            resetAddOne();
        }
    }, [modalAdd]);
    useEffect(() => {
        if (modalEdit === false) {
            resetAddOne();
        }
    }, [modalEdit]);
    const [addone, setAddOne] = useState({
        id: "",
        sizeId: "",
        colorId: "",
        quantity: "",
        price: "",
        status: "1"
    });
    const resetAddOne = () => {
        setAddOne({
            id: "",
            sizeId: "",
            colorId: "",
            quantity: "",
            price: "",
            status: "1"
        })
    }
    const saveAdd = async () => {
        try {
            await axios.post(`http://localhost:33321/api/admin/shoesdetail/${id}`, {
                'shoesDetailCreateRequests': [{
                    sizeId: addone.sizeId,
                    colorId: addone.colorId,
                    quantity: addone.quantity,
                    price: addone.price,
                    status: addone.status
                }]
            });
            toggle();
            getAll();
            toast.success("Thêm thành công!");
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }
    };
    const openEdit = async (id) => {
        try {
            const res = await axios.get(`http://localhost:33321/api/admin/shoesdetail/${id}`);
            console.log("res:", res);
            setAddOne({
                id: res.data.data.id,
                sizeId: res.data.data.sizeId,
                colorId: res.data.data.colorId,
                quantity: res.data.data.quantity,
                price: res.data.data.price,
                status: res.data.data.status
            })
            toggleEdit();
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }

    }
    const saveEdit = async () => {
        try {
            await axios.put(`http://localhost:33321/api/admin/shoesdetail/${addone.id}`, {
                sizeId: addone.sizeId,
                colorId: addone.colorId,
                quantity: addone.quantity,
                price: addone.price
            });
            toggleEdit();
            getAll();
            toast.success("Cập nhật thành công!");
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }
    };

    //Kết thúc thêm mới 1 ctsp
    //Start Delete
    const [deleteshoes, setDeleteShoes] = useState([]);
    const [iddeleteshoes, setIdDeleteShoes] = useState([]);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const toggleDelete = () => setModalConfirmDelete(!modalConfirmDelete);
    const handleConfirmDelete = (shoes) => {
        setDeleteShoes(shoes);
        setIdDeleteShoes([...iddeleteshoes, shoes.id])
        toggleDelete();
    }
    const handleDelete = async () => {
        try {
            console.log(iddeleteshoes);
            await axios.delete(`http://localhost:33321/api/admin/shoesdetail/delete`, { data: iddeleteshoes });
            getAll();
            setIdDeleteShoes([]);
            toggleDelete();
            toast.success("Xóa thành công ");
        } catch (error) {
            setIdDeleteShoes([]);
            toggleDelete();
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }
    }
    const [showActions, setShowActions] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const handleCheckboxChange = (idProduct) => {
        if (selectedItems.includes(idProduct)) {
            setSelectedItems(selectedItems.filter((id) => id !== idProduct));
            setShowActions(selectedItems.length - 1 > 0);
        } else {
            setSelectedItems([...selectedItems, idProduct]);
            setShowActions(true);
        }
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
            setShowActions(false);
        } else {
            setSelectedItems(ListShoesDetail.map(listShoes => listShoes.id));
            setShowActions(true);
        }
        setSelectAll(!selectAll);
    };
    const handleDeleteButtonClick = async () => {
        if (selectedItems.length > 0) {
            if (window.confirm("Bạn có chắc chắn muốn xóa các chi tiết  sản phẩm đã chọn không?")) {
                try {
                    await axios.delete(`http://localhost:33321/api/admin/shoesdetail/delete`, { data: selectedItems });
                    getAll();
                    setSelectedItems([]);
                    toast.success("Xóa thành công ");
                } catch (error) {
                    let errorMessage = "Lỗi từ máy chủ";
                    if (error.response && error.response.data && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                    toast.error(errorMessage);
                }

            }
        }
    };

    //End Delete
    const [tt, setTT] = useState(false);
    const [thirdModal, setThirdModal] = useState(false);
    const toggleThirdModal = () => setThirdModal(!thirdModal);
    return (
        <>
            {/* Page content */}
            <Container fluid>
                <Row className="mb-4">
                    <div className="col">
                        <Card className="shadow mt-7 mb-4">
                            <CardBody>
                                <Row>
                                    <h6 className="heading-small text-dark mb-4 col-10">
                                        Thông tin sản phẩm
                                    </h6>
                                    <div className="col-2 d-flex justify-content-end">
                                        {tt === false && <FaAngleDown onClick={() => { console.log('Button clicked!'); setTT(true); }} />}
                                        {tt === true && <FaAngleUp onClick={() => setTT(false)} />}

                                    </div>
                                </Row>
                                {tt === true &&
                                    <div className="pl-lg-4">
                                        <Row className="m-1">
                                            <Col lg="4" className="text-center">
                                                <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${dataShoesById.imgURI}`} alt="Ảnh mô tả" />
                                            </Col>
                                            <Col lg="8">
                                                <Row className="mb-4 text-center">
                                                    <Col lg="12">
                                                        <label className="text-uppercase mb-0"><b style={{ fontSize: "16" }}>Mã -   {dataShoesById.code}</b></label><br />
                                                        <label className="text-uppercase mb-0"><b style={{ fontSize: "16" }}>Tên -   {dataShoesById.name}</b></label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Hãng:  </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.brandName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Xuất xứ:   </label>
                                                    </Col>
                                                    <Col lg="4" className="text-left">
                                                        <label>{dataShoesById.originName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Thiết kế:  </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.designStyleName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Loại da:  </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.skinTypeName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Mũi giày:   </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.toeName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Đế giày:  </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.soleName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Lót giày:  </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.liningName}</label>
                                                    </Col>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Đệm giày:   </label>
                                                    </Col>
                                                    <Col lg="4">
                                                        <label>{dataShoesById.cushionName}</label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="2">
                                                        <label className="form-control-label">Mô tả:  </label>
                                                    </Col>
                                                    <Col lg="10">
                                                        <label>{dataShoesById.description}</label>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                        {ListShoesDetail.length > 0 &&
                            <>


                                <Card className="card-stats mb-xl-0">
                                    <CardHeader className="bg-transparent">

                                        <Row className="align-items-center">
                                            <div className="col d-flex">
                                                <h3 className="heading-small text-dark mb-0">
                                                    Danh sách chi tiết sản phẩm
                                                </h3>
                                                <div className="col text-right">
                                                    <Button
                                                        className="btn btn-outline-primary"
                                                        size="sm"
                                                        onClick={toggle}
                                                    >
                                                        Thêm mới
                                                    </Button>
                                                    <Button
                                                        className="btn btn-outline-primary"
                                                        onClick={(e) => e.preventDefault()}
                                                        size="sm"
                                                        onClick={taiMau}
                                                    >
                                                        Tải mẫu
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                    />

                                                    <Button
                                                        className="btn btn-outline-primary"
                                                        size="sm"
                                                        onClick={handleFileSelect}
                                                    >
                                                        Nhập Excel
                                                    </Button>
                                                    <Button
                                                        className="btn btn-outline-primary"
                                                        size="sm"
                                                        onClick={exportExcel}
                                                    >
                                                        Xuất Excel
                                                    </Button>
                                                    <Button
                                                        className="btn btn-outline-primary"
                                                        size="sm"
                                                        onClick={xuatPDF}
                                                    >
                                                        Xuất PDF
                                                    </Button>
                                                    <Button
                                                        className="btn btn-outline-primary"
                                                        size="sm"
                                                    >
                                                        Báo cáo
                                                    </Button>
                                                </div>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="col">

                                            <Row className="align-items-center my-3">
                                                <div className="col d-flex">
                                                    <Button color="warning" outline size="sm" onClick={toggleThirdModal}>
                                                        <FaFilter size="16px" className="mr-1" />Bộ lọc
                                                    </Button>

                                                    <Col>
                                                        <InputGroup size="sm">
                                                            <Input type="search"
                                                                placeholder="Tìm kiếm theo mã..."
                                                            />
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText>
                                                                    <FaSearch />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </Col>
                                                </div>
                                                <Col>
                                                    <Input type="select" name="status" style={{ width: "150px" }} size="sm" onChange={(e) => onInputChange(e)} >
                                                        <option value=" ">Tất cả</option>
                                                        <option value="1">Đang kinh doanh</option>
                                                        <option value="0">Ngừng kinh doanh</option>
                                                        <option value="2">Hết hàng</option>
                                                    </Input>
                                                </Col>
                                                <div className="col text-right">
                                                    {showActions && (
                                                        <Button
                                                            color="danger" outline
                                                            size="sm"
                                                            onClick={handleDeleteButtonClick}
                                                        >
                                                            Xóa tất cả
                                                        </Button>
                                                    )}
                                                </div>

                                            </Row>
                                            <Table responsive className="align-items-center table-flush">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>
                                                            <FormGroup check className="pb-4">
                                                                <Input
                                                                    type="checkbox"
                                                                    checked={selectAll}
                                                                    onChange={handleSelectAll}
                                                                />
                                                            </FormGroup>
                                                        </th>
                                                        <th>STT</th>
                                                        <th>Trạng thái</th>
                                                        <th>Mã</th>
                                                        <th>Màu</th>
                                                        <th>Size</th>
                                                        <th>Số lượng</th>
                                                        <th>Giá gốc</th>
                                                        <th>Giá KM</th>

                                                        <th colSpan={2} style={{ position: "sticky", zIndex: '1', right: '0' }}>Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ListShoesDetail.length <= 0 &&
                                                        <th className="text-center" colSpan={17}>
                                                            Không có dữ liệu
                                                        </th>
                                                    }

                                                    {ListShoesDetail && ListShoesDetail.length > 0 &&
                                                        ListShoesDetail.map((item, index) => {
                                                            return (
                                                                <tr key={item.id} >
                                                                    <td className="text-center">
                                                                        <FormGroup check className="pb-4">
                                                                            <Input
                                                                                type="checkbox"
                                                                                checked={selectedItems.includes(item.id)}
                                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                            />

                                                                        </FormGroup>
                                                                    </td>
                                                                    <th scope="row"> {index + 1}</th>
                                                                    <td>
                                                                        <Badge color={statusMapping[item.status]?.color || statusMapping.default.color}>
                                                                            {statusMapping[item.status]?.label || statusMapping.default.label}
                                                                        </Badge>
                                                                    </td>
                                                                    <td>{item.code}</td>
                                                                    <td>{item.color}</td>
                                                                    <td>{item.size}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.discountPrice}</td>
                                                                    <td style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff" }}>
                                                                        {/* <Button color="danger" to={`/admin/product/edit/${item.id}`} tag={Link} size="sm" disabled={item.status === 0 ? true : false}>
                                                                        <i class="fa-solid fa-pen" />
                                                                    </Button> */}
                                                                        <Button color="link" size="sm" disabled={item.status === 0 ? true : false} onClick={() => openEdit(item.id)}>
                                                                            <FaEdit color="primary" />
                                                                        </Button>
                                                                        {item.status === 0 &&
                                                                            <Button color="link" size="sm" onClick={() => openlock(item.id)}>
                                                                                <FaLockOpen color="primary" />
                                                                            </Button>
                                                                        }
                                                                        {(item.status === 1 || item.status === 2) &&
                                                                            <Button color="link" size="sm" onClick={() => lock(item.id)} >
                                                                                <FaLock color="primary" />
                                                                            </Button>
                                                                        }
                                                                        <Button color="link" size="sm" onClick={() => handleConfirmDelete(item)}>
                                                                            <FaTrash color="primary" />
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            )

                                                        })
                                                    }

                                                </tbody>
                                            </Table>
                                            <Row className="mt-4">
                                                <Col lg={6}>
                                                    <div style={{ fontSize: 14 }}>
                                                        Đang xem <b>1</b> đến <b>{totalElements < size ? totalElements : size}</b> trong tổng số <b>{totalElements}</b> mục
                                                    </div>
                                                </Col>
                                                <Col style={{ fontSize: 14 }} lg={2}>
                                                    <Row>
                                                        <span>Xem </span>&nbsp;
                                                        <span>
                                                            <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" onChange={(e) => onChangeSize(e)} className="mt--1">
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                                <option value="100">100</option>
                                                            </Input>
                                                        </span>&nbsp;
                                                        <span> mục</span>
                                                    </Row>

                                                </Col>
                                                <Col lg={4} style={{ fontSize: 11 }} className="mt--1">
                                                    <ReactPaginate
                                                        breakLabel="..."
                                                        nextLabel=">"
                                                        pageRangeDisplayed={1} // Number of pages to display on each side of the selected page
                                                        pageCount={totalPages} // Total number of pages
                                                        previousLabel="<"
                                                        onPageChange={handlePageClick}
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
                                        {/*  */}
                                    </CardBody>
                                </Card>
                            </>
                        }
                        {/* Bắt đầu combobox */}
                        {ListShoesDetail.length <= 0 &&
                            <Card className="card-stats mb-xl-0">
                                <Row className="align-items-center mb-2">
                                    <Col lg="6">
                                        <Card className="shadow m-4">
                                            <CardBody>
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    <h3>Màu</h3>
                                                </CardTitle>
                                                <FormGroup check>
                                                    <div className="mb-2">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectAllColor}
                                                                onChange={handleSelectAllColor}
                                                            />&nbsp;&nbsp;
                                                            Tất cả
                                                        </label>
                                                    </div>
                                                    <Row>
                                                        <Col lg={2}></Col>
                                                        <Col lg={10}>
                                                            <Row>
                                                                {checkboxesColor.map((checkbox) => (
                                                                    <Col lg={6}>
                                                                        <label key={checkbox.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={checkbox.checked}
                                                                                onChange={() => handleCheckboxColorChange(checkbox.id)}
                                                                            />&nbsp;&nbsp;
                                                                            {checkbox.label}
                                                                        </label>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                    <Col lg="6">
                                        <Card className="shadow m-4">

                                            <CardBody>
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    <h3>Size</h3>
                                                </CardTitle>
                                                <FormGroup check>
                                                    <div className="mb-2">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectAllSize}
                                                                onChange={handleSelectAllSize}
                                                            />&nbsp;&nbsp;
                                                            Tất cả
                                                        </label>
                                                    </div>
                                                    <Row>
                                                        <Col lg={2}></Col>
                                                        <Col lg={10}>
                                                            <Row>
                                                                {checkboxesSize.map((checkbox) => (
                                                                    <Col lg={6}>
                                                                        <label key={checkbox.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={checkbox.checked}
                                                                                onChange={() => handleCheckboxSizeChange(checkbox.id)}
                                                                            />&nbsp;&nbsp;
                                                                            {checkbox.label}
                                                                        </label>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                </Row>
                                {/*  */}
                                {selectedValuesColor.length > 0 && selectedValuesSize.length > 0 &&
                                    < Row >
                                        <Col lg="12">
                                            <Card className="shadow m-4">
                                                <CardBody>
                                                    {selectedValuesColor.map((itemColor, index) => (
                                                        <>
                                                            <Table className="align-items-center table-flush mb-4" responsive >
                                                                {/* className="" color='gray' style={{ fontFamily: "Arial" }}> */}

                                                                <th colSpan={4} className="text-center" style={{ fontFamily: "Open sans", fontSize: "16", background: "rgba(192, 192, 192, 0.2)", borderRadius: "3" }}>
                                                                    <b>
                                                                        Các sản phẩm màu {itemColor.name}
                                                                    </b>
                                                                </th>

                                                                <tr className="text-center">
                                                                    <th>Size</th>
                                                                    <th>Giá</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Trạng Thái</th>
                                                                </tr>

                                                                {selectedValuesSize.map((value, index) => (

                                                                    <tbody>
                                                                        <tr key={value.id} >
                                                                            <td className="col-1">{value.name}</td>
                                                                            <td className="col-3">
                                                                                <Input
                                                                                    id={`price_${value.id}`}
                                                                                    name="price"
                                                                                    placeholder="Nhập giá"
                                                                                    value={value.price}
                                                                                    onChange={(e) => onInputChangeAdd(e, value.id, itemColor.id)}

                                                                                />
                                                                            </td>
                                                                            <td className="col-3">
                                                                                <Input
                                                                                    id={`quantity_${value.id}`}
                                                                                    name="quantity"
                                                                                    placeholder="Nhập số lượng"
                                                                                    value={value.quantity}
                                                                                    onChange={(e) => onInputChangeAdd(e, value.id, itemColor.id)}
                                                                                />
                                                                            </td>
                                                                            <td >
                                                                                <Input id={`status_${value.id}`} type="select" name="status" value={value.status}
                                                                                    onChange={(e) => onInputChangeAdd(e, value.id, itemColor.id)}
                                                                                >
                                                                                    <option value='1'>
                                                                                        Hoạt động
                                                                                    </option>
                                                                                    <option value='0'>
                                                                                        Ngừng hoạt động
                                                                                    </option>
                                                                                </Input>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>

                                                                ))}
                                                            </Table >
                                                        </>
                                                    ))}

                                                    <Row className="text-center">
                                                        <Col>
                                                            <Button onClick={onClickAddMany} color="primary">Thêm</Button>
                                                        </Col>
                                                    </Row>
                                                </CardBody >
                                            </Card>
                                        </Col>
                                    </Row>
                                }
                                {/*  */}

                            </Card>
                        }
                        {/* Kết thúc combobox */}
                    </div >
                </Row >

            </Container >
            <Modal
                isOpen={modalAdd}
                toggle={toggle}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '500px' }}
            >
                <ModalHeader toggle={toggle}>
                    <h3 className="heading-small text-muted mb-0">Thêm mới</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                            Màu
                                        </label>
                                        <Input id="btn_select_tt" type="select" name="sizeId" value={addone.colorId}
                                            onChange={(e) => setAddOne({
                                                ...addone,
                                                colorId: e.target.value
                                            })}>
                                            <option value=" "> -- Chọn --  </option>
                                            {listColor && listColor.length > 0 &&
                                                listColor.map((item, index) => {
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
                                            htmlFor="input-email"
                                        >
                                            Size
                                        </label>
                                        <Input id="btn_select_tt" type="select" name="sizeId" value={addone.sizeId}
                                            onChange={(e) => setAddOne({
                                                ...addone,
                                                sizeId: e.target.value
                                            })}>
                                            <option value=" "> -- Chọn --  </option>
                                            {listSize && listSize.length > 0 &&
                                                listSize.map((item, index) => {
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
                                        <label className="form-control-label">
                                            Giá
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            value={addone.price}
                                            onChange={(e) =>
                                                setAddOne({
                                                    ...addone,
                                                    price: e.target.value
                                                })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Số lượng
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            value={addone.quantity}
                                            onChange={(e) =>
                                                setAddOne({
                                                    ...addone,
                                                    quantity: e.target.value
                                                })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Trạng thái
                                        </label>
                                        <Input type="select" name="status" value={addone.status}
                                            onChange={(e) =>
                                                setAddOne({
                                                    ...addone,
                                                    status: e.target.value
                                                })}
                                        >
                                            <option value='1'>
                                                Hoạt động
                                            </option>
                                            <option value='0'>
                                                Ngừng hoạt động
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center">
                        <Button color="primary" size="sm" onClick={(e) => saveAdd(e)}>
                            Thêm mới
                        </Button>{' '}
                        <Button color="primary" size="sm" onClick={resetAddOne}>
                            Reset
                        </Button>
                        <Button color="danger" size="sm" onClick={toggle} >
                            Close
                        </Button>
                    </div>
                </ModalFooter>
            </Modal >
            <Modal
                isOpen={modalEdit}
                toggle={toggleEdit}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '500px' }}
            >
                <ModalHeader toggle={toggleEdit}>
                    <h3 className="heading-small text-muted mb-0">Cập nhật</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                            Màu
                                        </label>
                                        <Input id="btn_select_tt" type="select" name="sizeId" value={addone.colorId}
                                            disabled
                                            onChange={(e) => setAddOne({
                                                ...addone,
                                                colorId: e.target.value

                                            })}>
                                            <option value=" "> -- Chọn --  </option>
                                            {listColor && listColor.length > 0 &&
                                                listColor.map((item, index) => {
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
                                            htmlFor="input-email"
                                        >
                                            Size
                                        </label>
                                        <Input id="btn_select_tt" type="select" name="sizeId" value={addone.sizeId} disabled
                                            onChange={(e) => setAddOne({
                                                ...addone,
                                                sizeId: e.target.value
                                            })}>
                                            <option value=" "> -- Chọn --  </option>
                                            {listSize && listSize.length > 0 &&
                                                listSize.map((item, index) => {
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
                                        <label className="form-control-label">
                                            Giá
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            value={addone.price}
                                            onChange={(e) =>
                                                setAddOne({
                                                    ...addone,
                                                    price: e.target.value
                                                })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Số lượng
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            value={addone.quantity}
                                            onChange={(e) =>
                                                setAddOne({
                                                    ...addone,
                                                    quantity: e.target.value
                                                })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Trạng thái
                                        </label>
                                        <Input type="select" name="status" value={addone.status}
                                            onChange={(e) =>
                                                setAddOne({
                                                    ...addone,
                                                    status: e.target.value
                                                })}
                                        >
                                            <option value='1'>
                                                Đang bán
                                            </option>
                                            <option value='0'>
                                                Ngừng bán
                                            </option>
                                            <option value='2'>
                                                Hết hàng
                                            </option>

                                        </Input>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center">
                        <Button color="primary" size="sm" onClick={(e) => saveEdit(e)}>
                            Cập nhật
                        </Button>{' '}
                        <Button color="danger" size="sm" onClick={toggleEdit} >
                            Close
                        </Button>
                    </div>
                </ModalFooter>
            </Modal >
            <Modal
                isOpen={modalConfirmDelete}
                toggle={toggleDelete}
                backdrop={'static'}
                keyboard={false}
            >
                <ModalHeader>
                    Thông báo
                </ModalHeader>
                <ModalBody>
                    <h3>Bạn có muốn xóa giày mã {deleteshoes.code} giày này không ?</h3>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center">
                        <Button color="danger" onClick={() => handleDelete()}>
                            Xóa
                        </Button>{' '}
                        <Button color="danger" onClick={toggleDelete}>
                            Hủy
                        </Button>{' '}
                    </div>
                </ModalFooter>
            </Modal>
            <Modal
                isOpen={thirdModal}
                toggle={toggleThirdModal}
                style={{ maxWidth: '355px', right: 'unset', left: 0, position: 'fixed', marginLeft: '252px', marginRight: 0, top: "-27px" }}
                backdrop={false}
            >
                <ModalHeader toggle={toggleThirdModal}>
                    <h3 className="heading-small text-muted mb-0">Bộ lọc tìm kiếm</h3>
                </ModalHeader>
                <ModalBody style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Form>
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                    >
                                        Size
                                    </label>
                                    <Input id="btn_select_tt" type="select" name="sizeId" value={search.sizeId} size="sm"
                                        onChange={(e) => onInputChange(e)}>
                                        <option value=" "> -- Chọn --  </option>
                                        {listSizeById && listSizeById.length > 0 &&
                                            listSizeById.map((item, index) => {
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
                                        htmlFor="input-email"
                                    >
                                        Color
                                    </label>
                                    <Input id="btn_select_tt" type="select" name="colorId" value={search.colorId} size="sm"
                                        onChange={(e) => onInputChange(e)}>
                                        <option value=" "> -- Chọn --  </option>
                                        {listColorById && listColorById.length > 0 &&
                                            listColorById.map((item, index) => {
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
                            <Col lg="12">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Người tạo
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="find_createdAt"
                                        name="createdBy"
                                        value={search.createdBy}
                                        onChange={(e) => onInputChange(e)}
                                        placeholder="Nhập người tạo"
                                        size="sm"

                                    />

                                </FormGroup>
                            </Col>
                            <Col lg="12" xl="12">
                                <FormGroup>
                                    <Label for="find_createdDate" className="form-control-label">
                                        Ngày tạo:
                                    </Label>
                                    <Row>
                                        <Col xl={6}>
                                            <Input
                                                type="date"
                                                className="form-control-alternative"
                                                id="find_createdDate"
                                                name="fromDateStr"
                                                value={search.fromDateStr}
                                                onChange={(e) => onInputChange(e)}
                                                size="sm"
                                            />
                                        </Col>
                                        <Col xl={6}>
                                            <Input
                                                type="date"
                                                className="form-control-alternative"
                                                id="find_createdDate"
                                                name="toDateStr"
                                                value={search.toDateStr}
                                                onChange={(e) => onInputChange(e)}
                                                size="sm"
                                            />

                                        </Col>
                                    </Row>

                                </FormGroup>
                            </Col>
                            <Col lg="12" xl="12">
                                <FormGroup>
                                    <Label for="find_code" className="form-control-label">
                                        Số lượng:
                                    </Label>
                                    <Row>
                                        <Col xl={5}>
                                            <Input

                                                id="find_code"
                                                name="fromQuantity"
                                                placeholder="Nhập số lượng"
                                                value={search.fromQuantity}
                                                onChange={(e) => onInputChange(e)}
                                                size="sm"
                                            />
                                        </Col>
                                        <Label for="find_code" xl={2} className="form-control-label text-center">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </Label>
                                        <Col xl={5}>
                                            <Input

                                                id="find_code"
                                                name="toQuantity"
                                                placeholder="Nhập số lượng"
                                                value={search.toQuantity}
                                                onChange={(e) => onInputChange(e)}
                                                size="sm"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col lg="12" xl="12">
                                <FormGroup>
                                    <Label for="find_code" className="form-control-label">
                                        Giá:
                                    </Label>
                                    <Row>
                                        <Col xl={5}>
                                            <Input
                                                id="find_code"
                                                name="fromPrice"
                                                placeholder="Nhập giá"
                                                value={search.fromPrice}
                                                onChange={(e) => onInputChange(e)}
                                                size="sm"
                                            />
                                        </Col>
                                        <Label for="find_code" xl={2} className="form-control-label text-center">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </Label>
                                        <Col xl={5}>
                                            <Input
                                                id="find_code"
                                                name="toPrice"
                                                placeholder="Nhập giá"
                                                value={search.toPrice}
                                                onChange={(e) => onInputChange(e)}
                                                size="sm"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="row w-100">
                        <div className="col-4">
                            <Button color="primary" outline size="sm" block>
                                Làm mới
                            </Button>
                        </div>
                        <div className="col-4">
                            <Button color="primary" outline size="sm" block >
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
        </>
    );
};

export default ListShoesDetail;

