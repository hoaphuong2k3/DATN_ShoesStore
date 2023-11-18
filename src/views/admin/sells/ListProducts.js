import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";

// reactstrap components
import {
    Badge, Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon,
    InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form
} from "reactstrap";
import { FaSearch } from 'react-icons/fa';
import { FaSort } from "react-icons/fa6";
const Products = ({ updateData }) => {

    return (
        <>
            <Form >
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light text-center">
                        <tr>
                            <th scope="col" className="text-dark">STT</th>
                            <th scope="col" className="text-dark">Mã <FaSort /></th>
                            <th scope="col" className="text-dark">Tên <FaSort /></th>
                            <th scope="col" className="text-dark">Hãng <FaSort /></th>
                            <th scope="col" className="text-dark">Xuất xứ <FaSort /></th>
                            <th scope="col" className="text-dark">Thiết kế <FaSort /></th>
                            <th scope="col" className="text-dark">Loại da <FaSort /></th>
                            <th scope="col" className="text-dark">Mũi giày <FaSort /></th>
                            <th scope="col" className="text-dark">Đế giày <FaSort /></th>
                            <th scope="col" className="text-dark">Lót giày <FaSort /></th>
                            <th scope="col" className="text-dark">Đệm giày <FaSort /></th>
                            <th scope="col" className="text-dark">Số lượng <FaSort /></th>
                            <th scope="col" className="text-dark">Số CTSP <FaSort /></th>
                            <th scope="col" className="text-dark">Khoảng giá <FaSort /></th>
                            <th scope="col" className="text-dark" style={{position: "sticky", zIndex: '1', right: '0' }}>Thao tác <FaSort /></th>
                        </tr>
                    </thead>
                </Table>
            </Form>
        </>
    );
};

export default Products;
