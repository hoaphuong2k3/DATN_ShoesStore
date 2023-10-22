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


const Delivery = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleModal = () => {
        resetForm();
        setModal(true);
    }

    const [value, setValue] = useState('no');
    const [delivery, setDelivery] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 5,
        status: "",
    });


    //loads table
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/delivery", {
                params: queryParams
            });
            setDelivery(response.content);
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
        '0': { color: 'warning', label: 'Chờ vận chuyển' },
        '1': { color: 'success', label: 'Đang vận chuyển' },
        '2': { color: 'primary', label: 'Giao thành công' },
        '-1': { color: 'danger', label: 'Đã hủy' }
    };
    //lọc
    const resetFilters = () => {
        setQueryParams({
            page: 0,
            size: 5,
            status: "",
            code:"",
        });
    };

    //click on selected
    const [formData, setFormData] = useState({
        id: null,
        recipientName: "",
        recipientPhone: "",
        deliveryAddress: "",
        deliveryCost: "",
        status: "",
        codeDelivery: "",
    });


    const handleRowClick = async (id) => {
        try {
            const response = await axiosInstance.get(`/delivery/detail/${id}`);
            setFormData(response.data);
            setModal(true);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };


    //reset
    const resetForm = () => {
        setFormData({
            recipientName: "",
            recipientPhone: "",
            deliveryCost: "",
            deliveryAddress: "",
            status: "",
        });
    };

    //save
    const saveDiscount = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await axiosInstance.put(`/delivery/update/${formData.id}`, formData);
                toast.success("Cập nhật thành công!");
            } else {
                await axiosInstance.post("/delivery/create", formData);
                toast.success("Thêm mới thành công!");
            }
            fetchData();
            setModal(false);
            resetForm();
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
  

    //delete
    const deletel = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
            axiosInstance.patch(`/delivery/delete/${id}`)
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
                                            <h3 className="mb-0">Phiếu giao hàng</h3>
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
                                                                Mã phiếu giao:
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

                                                        <Col lg="4">
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
                                                                    <option value="-1">Đã hủy</option>
                                                                    <option value="0">Chờ vận chuyển</option>
                                                                    <option value="1">Đang vận chuyển</option>
                                                                    <option value="2">Giao thành công</option>
                                                                </Input>
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
                                                    <th scope="col">Mã phiếu giao</th>
                                                    <th scope="col">Tên người nhận</th>
                                                    <th scope="col">Số điện thoại</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col">Giá vận chuyển</th>
                                                    <th scope="col">Ngày vận chuyển</th>
                                                    <th scope="col">Ngày tạo</th>
                                                    <th scope="col">Ngày cập nhật</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Thao tác</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(delivery) &&
                                                    delivery.map((delivery, index) => (
                                                        <tr key={delivery.id}>
                                                            <td>{calculateIndex(index)}</td>
                                                            <td>{delivery.codeDelivery}</td>
                                                            <td>{delivery.recipientName}</td>
                                                            <td>{delivery.recipientPhone}</td>
                                                            <td>{delivery.deliveryAddress}</td>
                                                            <td>{delivery.deliveryCost}</td>
                                                            <td>{delivery.shipDate}</td>
                                                            <td>{delivery.createdTime}</td>
                                                            <td>{delivery.updatedTime}</td>

                                                            <td>
                                                                <Badge color={statusMapping[delivery.status]?.color || statusMapping.default.color}>
                                                                    {statusMapping[delivery.status]?.label || statusMapping.default.label}
                                                                </Badge>
                                                            </td>
                                                            <td>
                                                                <Button color="info" size="sm" onClick={() => handleRowClick(delivery.id)} disabled={delivery.status === -1}><FaEdit /></Button>
                                                                <Button color="danger" size="sm" onClick={() => deletel(delivery.id)}><FaTrash /></Button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                        {/* Hiển thị thanh phân trang */}
                                        <Row className="mt-4">
                                            <Col lg={6}>
                                                <div style={{ fontSize: 14 }}>
                                                    Đang xem <b>{queryParams.page * queryParams.size + 1}</b>  đến <b>{queryParams.page * queryParams.size + delivery.length}</b> trong tổng số <b></b> mục
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
                                            <h3 className="heading-small text-muted mb-0">{formData.id ? 'Cập Nhật Phiếu giao' : 'Thêm Mới Phiếu giao'}</h3>

                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <div className="pl-lg-4">
                                                    <Row>

                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="name"
                                                                >
                                                                    Tên người nhận
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    id="name"
                                                                    type="text"
                                                                    value={formData.recipientName}
                                                                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                                                                />
                                                            </FormGroup>
                                                        </Col>

                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                >
                                                                    Số điện thoại:
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    value={formData.recipientPhone}
                                                                    onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                                                                />
                                                            </FormGroup>
                                                        </Col>

                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="startDate"
                                                                >
                                                                    Địa chỉ nhận:
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    value={formData.deliveryAddress}
                                                                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="endDate"
                                                                >
                                                                    Giá vận chuyển:
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    type="number"
                                                                    value={formData.deliveryCost}
                                                                    onChange={(e) => setFormData({ ...formData, deliveryCost: e.target.value })}
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

export default Delivery;
