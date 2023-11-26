import React, { useState, useEffect } from "react";
import { getAllShoes } from "services/Product2Service";
import { getAllShoesDetail } from "services/ShoesDetailService.js";
import { getAllColorId, getAllSizeId } from "services/ProductAttributeService";
import {
    getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType,
    getAllToe, getAllSole, getAllLining, getAllCushion
} from "services/ProductAttributeService";
// reactstrap components
import SlideShow from '../product/SlideShow.js';
import ReactPaginate from 'react-paginate';
import { FaSearch, FaFilter } from 'react-icons/fa';
import {
    Row, Col, Button, Table, Input, InputGroup, InputGroupAddon, InputGroupText,
    Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Card
} from "reactstrap";


const Products = ({ onSelectProducts }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [thirdModal, setThirdModal] = useState(false);
    const toggleThirdModal = () => setThirdModal(!thirdModal);

    const [searchTerm, setSearchTerm] = useState('');
    const [listShoes, setListShoes] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listorigin, setListOrigin] = useState([]);
    const [listDesignStyle, setListDesignStyle] = useState([]);
    const [listSkinStype, setListSkinType] = useState([]);
    const [listToe, setListToe] = useState([]);
    const [listSole, setListSole] = useState([]);
    const [listLining, setListLining] = useState([]);
    const [listCushion, setListCushion] = useState([]);

    const [shoesdetail, setshoesdetail] = useState({});
    const [listSizeById, setListSizeById] = useState([]);
    const [listColorById, setListColorById] = useState([]);
    const [idColor, setIdColor] = useState("");
    const [idSize, setIdSize] = useState("");

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElenments] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);

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
    const onInputChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
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


    //Sort
    const [sort, setSort] = useState('');
    const [sortStyle, setSortStyle] = useState('');

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

    //getShoesDetail
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [sl, setSL] = useState(false);
    useEffect(() => {
        const getShoesbyId = async (id) => {

            try {
                let res = await getAllShoesDetail(id, 0, 5, { colorId: idColor, sizeId: idSize });
                if (res && res.data && res.data.content) {
                    setshoesdetail(res.data.content[0]);
                    setSelectedShoesDetailId(res.data.content[0].shoesDetailSearchResponse.id);
                    setSL(false);
                    console.log(res.data.content[0].shoesDetailSearchResponse.id);
                }
            } catch (error) {
                console.error(error);
                setshoesdetail({});
                setSL(true);
            }
        };

        if (selectedProductId !== null) {
            getShoesbyId(selectedProductId);
        }
    }, [selectedProductId, idColor, idSize]);

    const getlistColorById = async (id) => {
        let res = await getAllColorId(id);
        if (res && res.data) {
            setListColorById(res.data);
            setIdColor(res.data[0].id);
        }
    }
    const getlistSizeById = async (id) => {
        let res = await getAllSizeId(id);
        if (res && res.data) {
            setListSizeById(res.data);
            setIdSize(res.data[0].id);
        }
    }
    useEffect(() => {
        if (selectedProductId !== null) {
            getlistColorById(selectedProductId);
            getlistSizeById(selectedProductId);
        }
    }, [selectedProductId]);

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
        toggle();
    };

    //getShoesDetail
    const [selectedShoesDetailId, setSelectedShoesDetailId] = useState(null);
    const [inputQuantity, setInputQuantity] = useState(1);
    const handleConfirmation = () => {
        console.log(selectedShoesDetailId);
        if (selectedShoesDetailId !== null) {
            if (selectedShoesDetailId) {
                const selectedSize = listSizeById.find((size) => size.id === idSize);
                const selectedColor = listColorById.find((color) => color.id === idColor);

                if (selectedSize && selectedColor) {
                    const confirmationData = {
                        shoesDetailId: selectedShoesDetailId,
                        sizeName: selectedSize.name,
                        colorName: selectedColor.name,
                        quantity: inputQuantity,
                        discountPrice: shoesdetail.shoesDetailSearchResponse.discountPrice,
                        price: shoesdetail.shoesDetailSearchResponse.price,
                        code: shoesdetail.shoesDetailSearchResponse.code
                    };
                    console.log(confirmationData.price);

                    onSelectProducts(confirmationData);
                }
            }
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

    // Tính toán cột
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
                </Col>
            </Row>
            {listShoes &&
                listShoes.length > 0 &&
                calculateRows(listShoes, 4).map((row, rowIndex) => (
                    <Row className="col mb-4" key={rowIndex}>
                        {row
                            .filter((item) =>
                                item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((item) => (
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
                                    onClick={() => handleProductClick(item.id)}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Card className="p-3" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                                        <img
                                            src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.imgURI}`}
                                            alt="Ảnh mô tả"
                                            style={{
                                                maxWidth: "100%",
                                                height: "160px",
                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                        />
                                        <h4 className="mt-1 text-center">{item.code}_{item.name}</h4>
                                        <h5 className="text-center text-danger">
                                            {formatter.format(item.discountPriceMin)}{" "}
                                            -{" "}{formatter.format(item.discountPriceMax)}
                                        </h5>

                                    </Card>
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
            {/* Phân trang */}
            <Row className="col" style={{ justifyContent: "center" }}>
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </Row>


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

                    <Row>
                        <Col lg={4}>
                            {shoesdetail.imageDTOS && (
                                <>
                                    <SlideShow 
                                        images={shoesdetail.imageDTOS}
                                        imageSize={"100%"}
                                    />
                                </>
                            )}
                        </Col>
                        <Col lg={8}>

                            <div className="mb-2 p-2" style={{ borderRadius: 5, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                                {shoesdetail.shoesDetailSearchResponse && (
                                    <>
                                        {shoesdetail.shoesDetailSearchResponse.discountPrice !== null && shoesdetail.shoesDetailSearchResponse.discountPrice !== 0 && (
                                            <div style={{ fontWeight: 'bold', color: 'red' }}>
                                                Giá sale: {formatter.format(shoesdetail.shoesDetailSearchResponse.discountPrice)}
                                            </div>
                                        )}
                                        <div >
                                            Giá gốc:
                                            <span style={{ textDecoration: shoesdetail.shoesDetailSearchResponse.discountPrice ? 'line-through' : 'none', fontWeight: "bold", marginLeft: 12 }}>
                                                {formatter.format(shoesdetail.shoesDetailSearchResponse.price)}
                                            </span>

                                        </div>
                                        {shoesdetail.shoesDetailSearchResponse.discountPrice !== null && shoesdetail.shoesDetailSearchResponse.discountPrice !== 0 && (
                                            <div>Tiết kiệm: {formatter.format(shoesdetail.shoesDetailSearchResponse.price - shoesdetail.shoesDetailSearchResponse.discountPrice)}</div>
                                        )}
                                    </>
                                )}

                            </div>

                            <div className='row p-2'>
                                <span className='col-3'>Màu sắc :  </span>
                                <span className='col-9'>
                                    {listColorById && listColorById.length > 0 &&
                                        listColorById.map((item, index) => {
                                            return (
                                                <button className="ml-2"
                                                    style={{ backgroundColor: idColor === item.id ? '#ccc' : '', border: "1px solid #ccc" }}
                                                    onClick={() => setIdColor(item.id)}
                                                >
                                                    {item.name}
                                                </button>
                                            )
                                        })}
                                </span>
                            </div>

                            <div className="row p-2">
                                <span className='col-3'>Size :  </span>
                                <span className='col-9'>
                                    {listSizeById && listSizeById.length > 0 &&
                                        listSizeById.map((item, index) => {
                                            return (
                                                <button className="ml-2"
                                                    style={{ backgroundColor: idSize === item.id ? '#ccc' : '', border: "1px solid #ccc" }}
                                                    onClick={() => setIdSize(item.id)}
                                                >
                                                    {item.name}
                                                </button>
                                            )
                                        })}
                                </span>

                            </div>


                            <div className='row p-2'>
                                <span className='col-3'>Số lượng :  </span>
                                <span className='col-9 d-flex'>
                                    <Input
                                        className="text-center mr-2 ml-2"
                                        type="number"
                                        size="sm"
                                        min={1}
                                        style={{ width: "50px" }}
                                        value={inputQuantity}
                                        onChange={(e) => setInputQuantity(parseInt(e.target.value, 10) || 1)}
                                    />

                                    {sl === false
                                        ? <span> {shoesdetail.quantity} &nbsp;sản phẩm</span>
                                        : <span style={{ color: "red" }}>Hết hàng</span>
                                    }
                                </span>
                            </div>
                        </Col>
                    </Row>

                </ModalBody >
                <ModalFooter>
                    <div className="text-center">
                        <Button color="primary" outline size="sm" onClick={handleConfirmation}>
                            Xác nhận
                        </Button>
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
                style={{ maxWidth: '400px', right: 'unset', left: 0, position: 'fixed', marginLeft: '252px', marginRight: 0 }}
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
