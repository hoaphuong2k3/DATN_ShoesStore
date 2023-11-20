import React, { useState, useEffect } from "react";
import { getAllShoes } from "services/Product2Service";
import { getAllShoesDetail2 } from "services/ShoesDetailService.js";
// reactstrap components
import {
    Row, Col, Button, Table, Input, FormGroup, InputGroup, InputGroupAddon,
    Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import { FaSearch, FaHandHoldingMedical } from 'react-icons/fa';
import { FaSort } from "react-icons/fa6";
const Products = ({ onSelectProducts }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const [listShoes, setListShoes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElenments] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
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

    //Sort
    const [sort, setSort] = useState('');
    const [sortStyle, setSortStyle] = useState('');
    const onClickSort = (a, b) => {
        setSort(a);
        setSortStyle(b);
    }

    //getListShoes
    const getAll = async () => {
        try {
            let res = await getAllShoes(page, size, search, sort, sortStyle);
            if (res && res.data && res.data.content) {
                setListShoes(res.data.content);
                console.log(res.data);
                setTotalElenments(res.data.totalElements);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            setListShoes([]);
        }
    }
    useEffect(() => {
        getAll(page, size);
    }, [search, sort, sortStyle]);

    const handlePageChange = ({ selected }) => {
        setSearch(prevSearch => ({ ...prevSearch, page: selected }));
    };

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setSearch({ ...search, size: newSize, page: 0 });
    };

    const calculateIndex = (index) => {
        return index + 1 + search.page * search.size;
    };

    //getShoesDetail
    const [shoesDetailMapping, setShoesDetailMapping] = useState({});
    const [selectedShoesDetails, setSelectedShoesDetails] = useState([]);
    const [search2, setSearch2] = useState({
        code: "",
        sizeId: null,
        colorId: null,
        fromQuantity: null,
        toQuantity: null,
        fromPrice: null,
        toPrice: null,
        status: null,
    });
    const handleEditButtonClick = async (shoesId) => {
        try {
            const response = await getAllShoesDetail2(shoesId, page, size, search2);
            if (response && response.data && response.data.content) {

                setSelectedShoesDetails(response.data.content);

                const mapping = { ...shoesDetailMapping };
                mapping[shoesId] = response.data.content.map(detail => detail.id);
                setShoesDetailMapping(mapping);
            }
            toggle();

        } catch (error) {
            setSelectedShoesDetails([]);

        }
    };
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductClick = (detail) => {
        const isProductSelected = selectedProducts.some((item) => item.id === detail.id);

        if (!isProductSelected) {
            const updatedDetail = { ...detail, quantity: 1 };
            setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, updatedDetail]);
        } else {
            const updatedProducts = selectedProducts.map((item) =>
                item.id === detail.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setSelectedProducts(updatedProducts);
        }

        if (onSelectProducts) {
            onSelectProducts(selectedProducts);
        }
    };

    const [selectedId, setSelectedId] = useState(null);

    const handleMouseEnter = (id) => {
        setSelectedId(id);
    };

    const handleMouseLeave = () => {
        setSelectedId(null);
    };

    // Tính toán số hàng dựa trên số cột mong muốn
    const calculateRows = (items, columnsPerRow) => {
        return items.reduce((rows, item, index) => {
            const rowIndex = Math.floor(index / columnsPerRow);
            if (!rows[rowIndex]) {
                rows[rowIndex] = [];
            }
            rows[rowIndex].push(item);
            return rows;
        }, []);
    };

    return (
        <>
            {listShoes &&
                listShoes.length > 0 &&
                calculateRows(listShoes, 4).map((row, rowIndex) => (
                    <Row className="col mb-4" key={rowIndex}>
                        {row.map((item) => (
                            <Col
                                lg={3}
                                key={item.id}
                                style={{
                                    cursor: "pointer",
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: "100%",
                                }}
                                onClick={() => handleEditButtonClick(item.id)}
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <h4 className="mb-3 text-center">{item.code}- {item.name}</h4>
                                <img
                                    src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.imgURI}`}
                                    alt="Ảnh mô tả"
                                    style={{
                                        maxWidth: "100%",
                                        height: "200px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                {selectedId === item.id && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            width: "100%",
                                            height: "100%",
                                            background: "rgba(255, 255, 255, 0.9)",
                                            zIndex: "1",
                                        }}
                                    >
                                        <Table striped bordered size="sm">
                                            <tr>
                                                <th>Thương hiệu</th>
                                                <td>{item.brand}</td>
                                            </tr>
                                            <tr>
                                                <th>Xuất xứ</th>
                                                <td>{item.origin}</td>
                                            </tr>
                                            <tr>
                                                <th>Thiết kế</th>
                                                <td>{item.designStyle}</td>

                                            </tr>
                                            <tr>
                                                <th>Loại da</th>
                                                <td>{item.skinType}</td>
                                            </tr>
                                            <tr>
                                                <th>Mũi giày</th>
                                                <td>{item.toe}</td>
                                            </tr>
                                            <tr>
                                                <th>Đế giày</th>
                                                <td>{item.sole}</td>
                                            </tr>
                                            <tr>
                                                <th>Lót giày</th>
                                                <td>{item.lining}</td>
                                            </tr>
                                            <tr>
                                                <th>Đệm giày</th>
                                                <td>{item.cushion}</td>
                                            </tr>
                                        </Table>
                                    </div>

                                )}
                            </Col>
                        ))}
                    </Row>
                ))}


            <Modal
                isOpen={modal}
                toggle={toggle}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '700px' }}
            >
                <ModalHeader toggle={toggle}>
                    <h3 className="heading-small text-dark mb-0">Chi tiết sản phẩm</h3>
                </ModalHeader>
                <ModalBody>
                    <Table bordered hover responsive>
                        <thead className="thead-light text-center">
                            <tr >
                                <th scope="col" className="text-dark">STT</th>
                                <th scope="col" className="text-dark">Mã</th>
                                <th scope="col" className="text-dark">Màu</th>
                                <th scope="col" className="text-dark">Size</th>
                                <th scope="col" className="text-dark">Giá gốc</th>
                                <th scope="col" className="text-dark">Giá khuyến mại</th>
                                <th scope="col" className="text-dark">Số lượng</th>
                                <th scope="col" style={{ position: "sticky", zIndex: '1', right: '0', color: "#000" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedShoesDetails.map((detail, index) => (
                                <tr key={detail.id}>
                                    <td>{index + 1}</td>
                                    <td>{detail.code}</td>
                                    <td>{detail.color}</td>
                                    <td className="text-center">{detail.size}</td>
                                    <td className="text-right">{detail.price} VND</td>
                                    <td className="text-right">{detail.discountPrice} VND</td>
                                    <td className="text-right">{detail.quantity}</td>
                                    <td style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff", textAlign: "center" }}>
                                        <Button color="link" size="sm" onClick={() => handleProductClick(detail)}>
                                            <FaHandHoldingMedical />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody >
                <ModalFooter>
                    <div className="text-center">
                        <Button color="danger" outline onClick={toggle} size="sm">
                            Đóng
                        </Button>
                    </div>
                </ModalFooter>
            </Modal >
        </>
    );
};

export default Products;
