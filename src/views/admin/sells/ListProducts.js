import React, { useState, useEffect } from "react";
import { getAllShoes } from "services/Product2Service";
import { getAllShoesDetail2 } from "services/ShoesDetailService.js";
import { getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType, getAllToe, getAllSole, getAllLining, getAllCushion } from "services/ProductAttributeService";
// reactstrap components
import {
    Row, Col, Button, Table, Input, InputGroup, InputGroupAddon, InputGroupText,
    Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Card
} from "reactstrap";
import { FaSearch, FaHandHoldingMedical, FaFilter } from 'react-icons/fa';
import { FaSort } from "react-icons/fa6";
const Products = ({ onSelectProducts }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [thirdModal, setThirdModal] = useState(false);
    const toggleThirdModal = () => setThirdModal(!thirdModal);

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const [listShoes, setListShoes] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listorigin, setListOrigin] = useState([]);
    const [listDesignStyle, setListDesignStyle] = useState([]);
    const [listSkinStype, setListSkinType] = useState([]);
    const [listToe, setListToe] = useState([]);
    const [listSole, setListSole] = useState([]);
    const [listLining, setListLining] = useState([]);
    const [listCushion, setListCushion] = useState([]);
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

    useEffect(() => {
        getAll(page, size);
        getlistBrand();
        getListOrigin();
        getListDesignStyle();
        getListSkinType();
        getListToe();
        getListSole();
        getListLining();
        getListCushion();
    }, []);

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
    const onInputChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
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

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

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

            <Row className="col align-items-center mb-4">
                <Col className="d-flex">
                    <Button color="warning" outline size="sm" onClick={toggleThirdModal}>
                        <FaFilter size="16px" className="mr-1" />Bộ lọc
                    </Button>

                    <Col>
                        <InputGroup size="sm">
                            <Input type="search"
                                placeholder="Tìm kiếm mã, tên sản phẩm..."
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <FaSearch />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Col>
            </Row>
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
                                <Card></Card>

                                <img
                                    src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.imgURI}`}
                                    alt="Ảnh mô tả"
                                    style={{
                                        maxWidth: "100%",
                                        height: "200px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <h4 className="mb-3 text-center">{item.code}- {item.name}</h4>
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

            {/* Lọc */}
            <Modal
                isOpen={thirdModal}
                toggle={toggleThirdModal}
                style={{ maxWidth: '400px', right: 'unset', left: 0, position: 'fixed', marginLeft: '252px', marginRight: 0}}
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
};

export default Products;
