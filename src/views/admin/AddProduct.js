import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { postNewShoes } from "services/Product2Service";
import { getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType, getAllToe, getAllSole, getAllLining, getAllCushion } from "services/ProductAttributeService";
// reactstrap components
import {
    Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Input, Button, Form
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";

const AddProduct = () => {

    const formData = new FormData();

    let navigate = useNavigate();
    const [listBrand, setListBrand] = useState([]);
    const [listorigin, setListOrigin] = useState([]);
    const [listDesignStyle, setListDesignStyle] = useState([]);
    const [listSkinStype, setListSkinType] = useState([]);
    const [listToe, setListToe] = useState([]);
    const [listSole, setListSole] = useState([]);
    const [listLining, setListLining] = useState([]);
    const [listCushion, setListCushion] = useState([]);

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

    };

    //Img
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        formData.append('file', file);
    };

    const onSubmit = async (e) => {

        e.preventDefault();

        const shoesDataJson = JSON.stringify(shoes);

        formData.append('file', selectedImage);
        formData.append('data', shoesDataJson);

        try {
            const response = await postNewShoes(formData);
            navigate("/admin/product");
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
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
                                <Form onSubmit={onSubmit}>
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
                                                    <Input id="btn_select_tt" type="select" name="brandId"
                                                        onChange={(e) => onInputChange(e)}>
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
                                                    <Input id="btn_select_tt" name="originId" type="select"
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
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Thiết kế
                                                    </label>
                                                    <Input id="btn_select_tt" name="designStyleId" type="select"
                                                        onChange={(e) => onInputChange(e)} >
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
                                                    <Input id="btn_select_tt" name="skinTypeId" type="select"
                                                        onChange={(e) => onInputChange(e)} >
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
                                                    <Input id="btn_select_tt" name="toeId" type="select"
                                                        onChange={(e) => onInputChange(e)} >
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
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Đế giày
                                                    </label>
                                                    <Input id="btn_select_tt" name="soleId" type="select"
                                                        onChange={(e) => onInputChange(e)} >
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
                                                            <Input id="btn_select_tt" name="liningId" type="select"
                                                                onChange={(e) => onInputChange(e)} >
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
                                                            <Input id="btn_select_tt" name="cushionId" type="select"
                                                                onChange={(e) => onInputChange(e)} >
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
                                                                placeholder="Mô tả sản phẩm ...."
                                                                rows="5"
                                                                type="textarea"
                                                                name="description"
                                                                onChange={(e) => onInputChange(e)}
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

export default AddProduct;

