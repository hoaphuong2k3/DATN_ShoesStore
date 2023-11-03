import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

// reactstrap components
import { Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FaRegEdit, FaSearch } from 'react-icons/fa';

const Confirm = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleModal = () => {
        setModal(true);
    }

    const [confirm, setComfirm] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 10,
        status: 0,
        date: "",
    });

    //loads table
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/order/admin", {
                params: queryParams
            });
            setComfirm(response.content);
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


    return (
        <>
            <Row >
                <Col>
                    <Row className="align-items-center my-4">
                        <Col lg={4} style={{ display: "flex" }}>
                            <InputGroup size="sm">
                                <Input type="text" placeholder="Tìm kiếm hóa đơn" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FaSearch color="black" />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>

                    </Row>

                    <Table className="align-items-center" hover bordered responsive >
                        <thead className="thead-light text-center">
                            <tr>
                                <th scope="col" className="pt-0">
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                    </FormGroup>
                                </th>
                                <th scope="col">Mã hóa đơn</th>
                                <th scope="col">Khách hàng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Phương thức</th>
                                <th scope="col">Ngày mua</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody style={{color: "black"}}>
                            {Array.isArray(confirm) &&
                                confirm.map((confirm, index) => (
                                    <tr key={confirm.id}>
                                        <td className="text-center pt-0">
                                            <FormGroup check>
                                                <Input type="checkbox" />
                                            </FormGroup>
                                        </td>
                                        <td>{confirm.code}</td>
                                        <td>{confirm.nameUser}</td>
                                        <td></td>
                                        <td>{confirm.paymentMethods===0? "Tiền mặt": "Chuyển khoản"}</td>
                                        <td>{format(new Date(confirm.createdTime), 'dd-MM-yyyy HH:mm', { locale: vi })}</td>
                                        <td className="text-center">
                                            <Button color="link" size="sm" onClick={handleModal}><FaRegEdit /></Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                    <Row className="mt-3 mr-2 justify-content-end">
                        <Button color="danger" outline size="sm">
                            Hủy
                        </Button>
                        <Button color="primary" outline size="sm">
                            Xác nhận
                        </Button>
                    </Row>
                </Col>


            </Row>
        </>
    );
};

export default Confirm;
