import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType, getAllToe, getAllSole, getAllLining, getAllCushion } from "services/ProductAttributeService";
// reactstrap components
import {
    Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Label, Input, Button, Table, CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Form
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";

const AddProduct2 = () => {
    const [listBrand, setListBrand] = useState([]);
    const [listorigin, setListOrigin] = useState([]);
    const [listDesignStyle, setListDesignStyle] = useState([]);
    const [listSkinStype, setListSkinType] = useState([]);
    const [listToe, setListToe] = useState([]);
    const [listSole, setListSole] = useState([]);
    const [listLining, setListLining] = useState([]);
    const [listCushion, setListCushion] = useState([]);
    //Biến
    const [name, setName] = useState("");
    const [brandId, setBrandId] = useState(null);
    const [originId, setOriginId] = useState(null);
    const [designStyleId, setDesignStyleId] = useState(null);
    const [skinTypeId, setSkinTypeId] = useState(null);
    const [soleId, setsoleId] = useState(null);
    const [liningId, setliningId] = useState(null);
    const [toeId, settoeId] = useState(null);
    const [cushionId, setcushionId] = useState(null);
    const [description, setdescription] = useState("");
    //Biến
    const [shoes, setShoes] = useState({
        name: "",
        brandId: null,
        originId: null,
        designStyleId: null,
        skinTypeId: null,
        soleId: null,
        liningId: null,
        toeId: null,
        cushionId: null,
        description: ""
    });

    const onInputChange = (e) => {
        setShoes({ ...shoes, [e.target.name]: e.target.value });
        console.log(shoes);
    };
    //Img
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };
    const fileInputRef = useRef(null);
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log(`Selected File: ${selectedFile.name}`);
            // You can perform further actions with the selected file here.
        }
    };

    useEffect(() => {
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
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListBrand(list);
        }
    }
    const getListOrigin = async () => {
        let res = await getAllOrigin();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListOrigin(list);
        }
    }
    const getListDesignStyle = async () => {
        let res = await getAllDesignStyle();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListDesignStyle(list);
        }
    }
    const getListSkinType = async () => {
        let res = await getAllSkinType();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListSkinType(list);
        }
    }
    const getListToe = async () => {
        let res = await getAllToe();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListToe(list);
        }
    }
    const getListSole = async () => {
        let res = await getAllSole();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListSole(list);
        }
    }
    const getListLining = async () => {
        let res = await getAllLining();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListLining(list);
        }
    }
    const getListCushion = async () => {
        let res = await getAllCushion();
        if (res && res.data) {
            const data = res.data;
            const list = Object.keys(data).map((key) => ({

                id: data[key].id,
                code: data[key].code,
                name: data[key].name,
            }));
            setListCushion(list);
        }
    }
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="mb-4">
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Sản phẩm </h3>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Thêm sản phẩm
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-name"
                                                    >
                                                        Tên
                                                    </label>
                                                    <Input
                                                        type={"text"}
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        placeholder="Nhập tên sản phẩm "
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) => onInputChange(e)}

                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        Hãng
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
                                                        <option value="" > -- Chọn --  </option>
                                                        {listBrand && listBrand.length > 0 &&
                                                            listBrand.map((item, index) => {
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
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Xuất xứ
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
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
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Thiết kế
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
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
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        Loại da
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
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
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Mũi giày
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
                                                        <option value="" > -- Chọn --  </option>
                                                        <option value="loaisp">
                                                            {listToe && listToe.length > 0 &&
                                                                listToe.map((item, index) => {
                                                                    return (
                                                                        <option value={item.id} key={item.id}>
                                                                            {item.name}
                                                                        </option>
                                                                    )

                                                                })
                                                            }
                                                        </option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Đế giày
                                                    </label>
                                                    <Input id="btn_select_tt" name="select" type="select" >
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
                                        </Row>
                                    </div>

                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="8">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-last-name"
                                                            >
                                                                Lót giày
                                                            </label>
                                                            <Input id="btn_select_tt" name="select" type="select" >
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
                                                                htmlFor="input-last-name"
                                                            >
                                                                Đệm giày
                                                            </label>
                                                            <Input id="btn_select_tt" name="select" type="select" >
                                                                <option value="" > -- Chọn --  </option>
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
                                                </Row>
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label className="form-control-label">Mô tả</label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="A few words about you ..."
                                                                rows="4"
                                                                defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                                                                type="textarea"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg="4">
                                                <label className="form-control-label">Thêm ảnh</label>
                                                <div className="box-image">
                                                    <img src={''} />
                                                </div>
                                                <div >
                                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                                    {selectedImage && (
                                                        <div>
                                                            <p>Selected Image:</p>
                                                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        readOnly
                                                        onClick={handleFileSelect}
                                                        placeholder="Select a file..."
                                                    />
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={handleFileSelect}
                                                        >
                                                            Browse
                                                        </button>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="text-center">
                                        <Button color="warning" >
                                            Thêm
                                        </Button>
                                    </div>
                                    <hr className="my-4" />

                                </Form>
                            </CardBody>
                        </Card >
                    </div >
                </Row >


            </Container >
        </>
    );
};


export default AddProduct2;