import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaLock, FaLockOpen, FaCamera } from 'react-icons/fa';
import { FaSort } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";

import "assets/css/pagination.css";
// reactstrap components
import {
    Card, CardHeader, CardBody, Container, Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText,
    Input, Button, Table, Modal, ModalBody, ModalFooter, ModalHeader, Badge, Label
} from "reactstrap";


const Promotion = () => {

    const [secondModal, setSecondModal] = useState(false);
    const toggleSecondModal = () => setSecondModal(!secondModal);
    const handleModal2 = () => {
        resetGift();
        setSecondModal(true);
    }


    const [file, setFile] = useState(null);
    const [freeGift, setfreeGift] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 10,
    });

    //loads table
    const fetchData = async () => {
        try {

            const response = await axiosInstance.get("/free-gift", {
                params: queryParams
            });
            setfreeGift(response.content);

            setTotalElements(response.totalElements);
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

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setQueryParams({ ...queryParams, size: newSize, page: 0 });
    };

    const calculateIndex = (index) => {
        return index + 1 + queryParams.page * queryParams.size;
    };

    const statusMapping = {
        1: { color: 'danger', label: 'Kích hoạt' },
        0: { color: 'success', label: 'Chờ kích hoạt' },
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



    //checkbox
    const [showActions, setShowActions] = useState(false);
    const handleCheckboxChange = (idGift) => {
        if (selectedItems.includes(idGift)) {
            setSelectedItems(selectedItems.filter((id) => id !== idGift));
            setShowActions(selectedItems.length - 1 > 0);
        } else {
            setSelectedItems([...selectedItems, idGift]);
            setShowActions(true);
        }
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
            setShowActions(false);
        } else {
            setSelectedItems(freeGift.map(freeGift => freeGift.id));
            setShowActions(true);
        }
        setSelectAll(!selectAll);
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
            setSecondModal(true);
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
            setSecondModal(false);
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


    return (
        <>
            <Container className="pt-5 pt-md-7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">

                                <Row className="align-items-center">
                                    <div className="col d-flex">
                                        <h3 className="heading-small text-dark mb-0">
                                            Quà tặng
                                        </h3>
                                        <div className="col text-right">
                                            <Button
                                                color="primary"
                                                outline
                                                onClick={handleModal2}
                                                size="sm"
                                            >
                                                + Thêm mới
                                            </Button>
                                        </div>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div className="col">

                                    <Row className="align-items-center my-3">

                                        <Col lg={4}>
                                            <InputGroup size="sm">
                                                <Input type="search"
                                                    placeholder="Tìm kiếm mã, tên quà tặng..."
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
                                        <Col lg={2}>
                                            <Input type="select" size="sm" style={{width:150}}>
                                                <option value="">Tất cả</option>
                                                <option value="1">Kích hoạt</option>
                                                <option value="0">Ngừng kích hoạt</option>
                                            </Input>
                                        </Col>


                                        <div className="col text-right">
                                            {showActions && (
                                                <Button
                                                    color="danger" outline
                                                    size="sm"
                                                >
                                                    Xóa tất cả
                                                </Button>
                                            )}
                                        </div>
                                    </Row>

                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light text-center">
                                            <tr>
                                                <th >
                                                    <FormGroup check className="pb-4">
                                                        <Input
                                                            type="checkbox"
                                                            checked={selectAll}
                                                            onChange={handleSelectAll}
                                                        />
                                                    </FormGroup>
                                                </th>
                                                <th scope="col" style={{ color: "black" }}>STT</th>
                                                <th scope="col"
                                                    style={{ color: "black", position: "sticky", zIndex: '1', left: '0' }}>
                                                    Trạng thái
                                                </th>
                                                <th scope="col" style={{ color: "black" }}>
                                                    Mã
                                                    <FaSort
                                                        style={{ cursor: "pointer" }}
                                                        className="text-muted"
                                                        onClick={() => handleSort("code")} />
                                                </th>
                                                <th scope="col" style={{ color: "black" }}> Ảnh</th>
                                                <th scope="col" style={{ color: "black" }}>
                                                    Tên quà tặng
                                                    <FaSort
                                                        style={{ cursor: "pointer" }}
                                                        className="text-muted"
                                                        onClick={() => handleSort("name")} />
                                                </th>
                                                <th scope="col" style={{ color: "black" }}>
                                                    Số lượng
                                                    <FaSort
                                                        style={{ cursor: "pointer" }}
                                                        className="text-muted"
                                                        onClick={() => handleSort("quantity")} />
                                                </th>
                                                <th scope="col"
                                                    style={{ color: "black", position: "sticky", zIndex: '1', right: '0' }}>
                                                    Thao tác
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody style={{ color: "black" }}>
                                            {freeGift
                                                .filter(
                                                    (gift) =>
                                                        gift.code.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                        gift.name.toLowerCase().includes(searchValue.toLowerCase())
                                                )
                                                .map((gift, index) => (
                                                    <tr key={gift.id}>
                                                        <td>
                                                            <FormGroup check className="pb-4">
                                                                <Input
                                                                    type="checkbox"
                                                                    checked={selectedItems.includes(gift.id)}
                                                                    onChange={() => handleCheckboxChange(gift.id)}
                                                                />
                                                            </FormGroup>
                                                        </td>
                                                        <td>{calculateIndex(index)}</td>
                                                        <td style={{ position: "sticky", zIndex: '1', left: '0', background: "#fff", textAlign: "center" }}>
                                                            <Badge color={statusMapping[gift.status]?.color || statusMapping.default.color}>
                                                                {statusMapping[gift.status]?.label || statusMapping.default.label}
                                                            </Badge>
                                                        </td>
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
                                    {/* Hiển thị thanh phân trang */}
                                    <Row className="mt-4">
                                        <Col lg={6}>
                                            <div style={{ fontSize: 14 }}>
                                                Đang xem <b>{queryParams.page * queryParams.size + 1}</b>  đến <b>{queryParams.page * queryParams.size + freeGift.length}</b> trong tổng số <b></b> mục
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
                                <ToastContainer />

                                {/* FreeGift */}
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

                </Row>
                <ToastContainer />
            </Container >
        </>
    );
}

export default Promotion;
