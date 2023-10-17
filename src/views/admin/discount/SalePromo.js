import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "services/custommize-axios";
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import "assets/css/pagination.css";
// reactstrap components
import { Row, Col, Form, FormGroup, Input, Button, Table, Badge } from "reactstrap";

const Promotion = () => {

    const [discounts, setDiscounts] = useState([]);

    //loads table
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 3,
        type: 0,
        fromDate: "",
        toDate: "",
        status: "",
        isdelete: 0,
    });

    const [totalPages, setTotalPages] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    //loads table
    useEffect(() => {
        const fetchData = async () => {
            try {
                const discountsData = await axiosInstance.get("/vouchers/getAll", {
                    params: queryParams
                });
                setDiscounts(discountsData.content);
                setTotalPages(discountsData.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [queryParams]);

    const handlePageChange = ({ selected }) => {
        setQueryParams(prevParams => ({ ...prevParams, page: selected }));
    };

    const calculateIndex = (index) => {
        return index + 1 + queryParams.page * queryParams.size;
    };

    const statusMapping = {
        0: { color: 'danger', label: 'Kích hoạt' },
        1: { color: 'success', label: 'Chờ kích hoạt' },
        2: { color: 'warning', label: 'Ngừng kích hoạt' },
        default: { color: 'secondary', label: 'Không xác định' },
    };
    //lọc


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
                            <Col lg="4">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="endDate"
                                    >
                                        Trạng thái:
                                    </label>
                                    <input

                                        type="checkbox"

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
                            <th scope="col">Giá trị</th>
                            {/* <th scope="col">Tiền</th> */}
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>

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
                                    <td>{discount.minPrice}</td>
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
                                        <Button color="info" size="sm" onClick={() => handleRowClick(discount)}><FaEdit /></Button>
                                        <Button color="danger" size="sm" onClick={() => deleteDiscount(discount.id)}><FaTrash /></Button>
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </Table>
                {/* Hiển thị thanh phân trang */}
                <div className="pagination-container">
                    {/* <ReactPaginate
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
                    /> */}

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        pageRangeDisplayed={2} // Number of pages to display on each side of the selected page
                        pageCount={totalPages} // Total number of pages
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
            </div>

            <ToastContainer />

        </>
    );
}

export default Promotion;
