import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findShoes } from "services/Product2Service";
import { getAllShoesDetail } from "services/ShoesDetailService.js";
import { Link } from "react-router-dom";
import { getAllColorId, getAllSizeId, getAllColor, getAllSize } from "services/ProductAttributeService";
// reactstrap components
import {
    Card, CardBody, Container, Row, Col, FormGroup, Input, Button, Form, CardTitle, Label, Table
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";
import Switch from 'react-input-switch';

const ListShoesDetail = () => {
    const [value, setValue] = useState('no');
    const { id } = useParams();

    let navigate = useNavigate();
    const [ListShoesDetail, setListShoesDetail] = useState([]);
    const [listSizeById, setListSizeById] = useState([]);
    const [listColorById, setListColorById] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [dataShoesById, setDataShoesById] = useState([])
    //getData
    const [search, setSearch] = useState({
        code: "",
        sizeId: null,
        colorId: null,
        fromQuantity: null,
        toQuantity: null,
        fromPrice: null,
        toPrice: null,
        status: null,
        fromDateStr: "",
        toDateStr: "",
        createdBy: "",
        fromDate: "",
        toDate: ""
    });
    const resetSearch = () => {
        setSearch({
            code: "",
            sizeId: "",
            colorId: "",
            fromQuantity: "",
            toQuantity: "",
            fromPrice: "",
            toPrice: "",
            status: "",
            fromDateStr: "",
            toDateStr: "",
            createdBy: "",
            fromDate: "",
            toDate: ""
        })
    };
    const getData = async () => {
        try {
            let res = await findShoes(id);
            if (res && res.data) {
                setDataShoesById(res.data);
            }
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
            navigate("/admin/product2");
        }
    }
    //getAll
    const getAll = async () => {
        try {
            let res = await getAllShoesDetail(id, search);
            if (res && res.data && res.data.content) {
                setListShoesDetail(res.data.content);
                // setListShoes
                // setTotalUsers(res.total);
                // setTotalPages(res.total_pages);
                // setlistUsers(res.data);
            }
        } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
            setListShoesDetail([]);
        }
    }
    useEffect(() => {
        console.log(search);
        getAll();
    }, [search]);

    useEffect(() => {
        getlistColorById();
        getlistSizeById();
        getlistColor();
        getlistSize();
        getData();
        getAll();
    }, []);


    const onInputChange = async (e) => {
        await setSearch({ ...search, [e.target.name]: e.target.value });
    };
    //Hiển thị combobox
    const getlistColorById = async () => {
        let res = await getAllColorId(id);
        if (res && res.data) {
            setListColorById(res.data);
        }
    }
    const getlistSizeById = async () => {
        let res = await getAllSizeId(id);
        if (res && res.data) {
            setListSizeById(res.data);
        }
    }
    const getlistColor = async () => {
        let res = await getAllColor();
        if (res && res.data) {
            setListColor(res.data);
        }
    }
    const getlistSize = async () => {
        let res = await getAllSize();
        if (res && res.data) {
            setListSize(res.data);
        }
    }

    //Cbb selected
    const [selectAllSize, setSelectAllSize] = useState(false);
    const [checkboxesSize, setCheckboxesSize] = useState([]);
    const [selectedValuesSize, setSelectedValuesSize] = useState([]);
    const initializeCheckboxesSize = () => {
        const initialCheckboxesSize = listSize.map((item) => ({
            id: item.id,
            label: item.name,
            checked: false,
        }));
        setCheckboxesSize(initialCheckboxesSize);
    };

    function handleSelectAllSize() {
        const updatedCheckboxesSize = checkboxesSize.map((checkbox) => ({
            ...checkbox,
            checked: !selectAllSize,
        }));
        setCheckboxesSize(updatedCheckboxesSize);
        setSelectAllSize(!selectAllSize);
        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesSize = updatedCheckboxesSize
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesSize(selectedValuesSize);
    }

    function handleCheckboxSizeChange(checkboxId) {
        const updatedCheckboxesSize = checkboxesSize.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setCheckboxesSize(updatedCheckboxesSize);

        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesSize = updatedCheckboxesSize
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesSize(selectedValuesSize);
    }
    useEffect(() => {
        initializeCheckboxesSize();
    }, [listSize]);
    //End Cbb selected

    //Cbb selected color
    const [selectAllColor, setSelectAllColor] = useState(false);
    const [checkboxesColor, setCheckboxesColor] = useState([]);
    const [selectedValuesColor, setSelectedValuesColor] = useState([]);
    const initializeCheckboxesColor = () => {
        const initialCheckboxesColor = listColor.map((item) => ({
            id: item.id,
            label: item.name,
            checked: false,
        }));
        setCheckboxesColor(initialCheckboxesColor);
    };

    function handleSelectAllColor() {
        const updatedCheckboxesColor = checkboxesColor.map((checkbox) => ({
            ...checkbox,
            checked: !selectAllColor,
        }));
        setCheckboxesColor(updatedCheckboxesColor);
        setSelectAllColor(!selectAllColor);

        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesColor = updatedCheckboxesColor
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesColor(selectedValuesColor);
    }

    function handleCheckboxColorChange(checkboxId) {
        const updatedCheckboxesColor = checkboxesColor.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setCheckboxesColor(updatedCheckboxesColor);

        // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
        const selectedValuesColor = updatedCheckboxesColor
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
        setSelectedValuesColor(selectedValuesColor);
    }
    useEffect(() => {
        initializeCheckboxesColor();
    }, [listColor]);

    //End Cbb selected color
    const [valueSelectedColor, setValueSelectedColor] = useState(+'');
    const [listvalueSelectedColor, setListValuesSelectedColor] = useState([]);
    const onInputChangeSelectedColor = (value) => {
        setValueSelectedColor(+value);
    }
    useEffect(() => {
    }, [listvalueSelectedColor]);
    useEffect(() => {
        let count = 0;
        if (listvalueSelectedColor.length > 0) {
            listvalueSelectedColor.map((item) => {
                if (item === valueSelectedColor) {
                    count++;
                }
            });
            if (count === 0) {
                setListValuesSelectedColor([...listvalueSelectedColor, valueSelectedColor]);
            }
        }
    }, [valueSelectedColor]);

    useEffect(() => {
        console.log(listvalueSelectedColor);
    }, [listvalueSelectedColor]);

    useEffect(() => {
        if (listvalueSelectedColor.length === 0) {
            if (selectedValuesColor.length > 0) {
                setValueSelectedColor(selectedValuesColor[0].id);
                setListValuesSelectedColor([...listvalueSelectedColor, selectedValuesColor[0].id]);
            }
        } else {
            const set1 = new Set(selectedValuesColor.map((item) => item.id));
            const commonValues = listvalueSelectedColor.filter(value => set1.has(value));
            setListValuesSelectedColor(commonValues);
        }
    }, [selectedValuesColor]);
    const [shoesdetail, setShoesDetail] = useState({
        sizeId: "",
        colorId: "",
        quantity: "",
        price: "",
        status: ""
    });
    const [listshoes, setListShoes] = useState([]);
    const onClickSize = (value) => {
        console.log("value:", value);
    }
    const onInputChangeAdd = async (e) => {
        await setShoesDetail({ ...shoesdetail, [e.target.name]: e.target.value });
    };

    //End Hiển Thi Combobox
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="mb-4">
                    <div className="col">
                        <Card className="shadow">
                            <Card className="shadow m-4" disabled>
                                <CardBody>
                                    <h6 className="heading-small text-muted mb-4">
                                        Thông tin sản phẩm
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row className="m-1">
                                            <Col lg="12" className="text-center">
                                                <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${dataShoesById.imgURI}`} alt="Ảnh mô tả" />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col lg="12" className="text-center">
                                                <label className="form-control-label">Mã -   </label>
                                                <label className="form-control-label">{dataShoesById.code}</label>
                                            </Col>
                                        </Row>
                                        <Row className="mb-4">
                                            <Col lg="12" className="text-center">
                                                <label className="form-control-label">Tên -  </label>
                                                <label className="form-control-label">{dataShoesById.name}</label>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="2">
                                                <label className="form-control-label">Hãng:  </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.brandId}</label>
                                            </Col>
                                            <Col lg="2">
                                                <label className="form-control-label">Xuất xứ:   </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.originId}</label>
                                            </Col>
                                            <Col lg="2">
                                                <label className="form-control-label">Thiết kế:  </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.designStyleId}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2">
                                                <label className="form-control-label">Loại da:  </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.skinTypeId}</label>
                                            </Col>
                                            <Col lg="2">
                                                <label className="form-control-label">Mũi giày:   </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.toeId}</label>
                                            </Col>
                                            <Col lg="2">
                                                <label className="form-control-label">Đế giày:  </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.soleId}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2">
                                                <label className="form-control-label">Lót giày:  </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.liningId}</label>
                                            </Col>
                                            <Col lg="2">
                                                <label className="form-control-label">Đệm giày:   </label>
                                            </Col>
                                            <Col lg="2">
                                                <label>{dataShoesById.cushionId}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2">
                                                <label className="form-control-label">Mô tả:  </label>
                                            </Col>
                                            <Col lg="10">
                                                <label>{dataShoesById.description}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="shadow m-4 mt--2">
                                <CardBody>

                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                <h3>Tìm kiếm</h3>
                                            </CardTitle>

                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                <i className="fas fa-chart-bar" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Mã
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-username"
                                                            placeholder="Nhập mã"
                                                            type="text"
                                                            name="code"
                                                            value={search.code}
                                                            onChange={(e) => onInputChange(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Size
                                                        </label>
                                                        <Input id="btn_select_tt" type="select" name="sizeId" value={search.sizeId}
                                                            onChange={(e) => onInputChange(e)}>
                                                            <option value=" "> -- Chọn --  </option>
                                                            {listSizeById && listSizeById.length > 0 &&
                                                                listSizeById.map((item, index) => {
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
                                                <Col lg="3">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Color
                                                        </label>
                                                        <Input id="btn_select_tt" type="select" name="colorId" value={search.colorId}
                                                            onChange={(e) => onInputChange(e)}>
                                                            <option value=" "> -- Chọn --  </option>
                                                            {listColorById && listColorById.length > 0 &&
                                                                listColorById.map((item, index) => {
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
                                            </Row>

                                            {value === 'yes' &&
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Người tạo
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="find_createdAt"
                                                                name="createdBy"
                                                                value={search.createdBy}
                                                                onChange={(e) => onInputChange(e)}
                                                                placeholder="Nhập người tạo"

                                                            />

                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6" xl="6">
                                                        <FormGroup>
                                                            <Label for="find_createdDate" className="form-control-label">
                                                                Ngày tạo:
                                                            </Label>
                                                            <Row>
                                                                <Col xl={6}>
                                                                    <Input
                                                                        type="date"
                                                                        className="form-control-alternative"
                                                                        id="find_createdDate"
                                                                        name="fromDateStr"
                                                                        value={search.fromDateStr}
                                                                        onChange={(e) => onInputChange(e)}
                                                                    />
                                                                </Col>
                                                                <Col xl={6}>
                                                                    <Input
                                                                        type="date"
                                                                        className="form-control-alternative"
                                                                        id="find_createdDate"
                                                                        name="toDateStr"
                                                                        value={search.toDateStr}
                                                                        onChange={(e) => onInputChange(e)}
                                                                    />

                                                                </Col>
                                                            </Row>

                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6" xl="6">
                                                        <FormGroup>
                                                            <Label for="find_code" className="form-control-label">
                                                                Số lượng:
                                                            </Label>
                                                            <Row>
                                                                <Col xl={5}>
                                                                    <Input

                                                                        id="find_code"
                                                                        name="fromQuantity"
                                                                        placeholder="Nhập số lượng"
                                                                        value={search.fromQuantity}
                                                                        onChange={(e) => onInputChange(e)}
                                                                    />
                                                                </Col>
                                                                <Label for="find_code" xl={1} className="form-control-label text-center">
                                                                    <i class="fa-solid fa-arrow-right"></i>
                                                                </Label>
                                                                <Col xl={5}>
                                                                    <Input

                                                                        id="find_code"
                                                                        name="toQuantity"
                                                                        placeholder="Nhập số lượng"
                                                                        value={search.toQuantity}
                                                                        onChange={(e) => onInputChange(e)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6" xl="6">
                                                        <FormGroup>
                                                            <Label for="find_code" className="form-control-label">
                                                                Giá:
                                                            </Label>
                                                            <Row>
                                                                <Col xl={5}>
                                                                    <Input
                                                                        id="find_code"
                                                                        name="fromPrice"
                                                                        placeholder="Nhập giá"
                                                                        value={search.fromPrice}
                                                                        onChange={(e) => onInputChange(e)}
                                                                    />
                                                                </Col>
                                                                <Label for="find_code" xl={2} className="form-control-label text-center">
                                                                    <i class="fa-solid fa-arrow-right"></i>
                                                                </Label>
                                                                <Col xl={5}>
                                                                    <Input
                                                                        id="find_code"
                                                                        name="toPrice"
                                                                        placeholder="Nhập giá"
                                                                        value={search.toPrice}
                                                                        onChange={(e) => onInputChange(e)}
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
                                        </Col>
                                        <Col lg="6" xl="8">
                                            <Button color="warning" >
                                                <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                                                Tìm kiếm
                                            </Button>
                                            <Button color="primary" onClick={resetSearch}>
                                                Làm mới bộ lọc
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card className="card-stats m-4 mb-xl-0">
                                <CardBody>
                                    <Row className="align-items-center mb-2">

                                        <CardTitle
                                            tag="h5"
                                            className=" col-2 text-uppercase text-muted mb-0">
                                            <h3> DANH SÁCH</h3>
                                        </CardTitle>

                                        <div className="col-10 text-right">
                                            <Button
                                                className="btn btn-outline-primary"
                                                size="sm"
                                                to="/admin/product2/add" tag={Link}>
                                                Thêm mới
                                            </Button>
                                            <Button
                                                className="btn btn-outline-primary"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Tải mẫu
                                            </Button>

                                            <Button
                                                className="btn btn-outline-primary"
                                                size="sm"
                                            >
                                                Nhập Excel
                                            </Button>
                                            <Button
                                                className="btn btn-outline-primary"
                                                size="sm"
                                            >
                                                Xuất Excel
                                            </Button>
                                            <Button
                                                className="btn btn-outline-primary"
                                                size="sm"
                                            >
                                                Xuất PDF
                                            </Button>
                                            <Input type="select" name="status" value={search.status} size="sm" onChange={(e) => onInputChange(e)} >
                                                <option value="0">Tất cả</option>
                                                <option value="1"></option>
                                                <option value="2">Tất cả</option>
                                            </Input>


                                        </div>
                                    </Row>
                                    {/*  */}
                                    <Row>
                                        <Table bordered dark hover responsive striped>
                                            <thead>
                                                <tr>
                                                    <th className="text-center pb-4" >
                                                        <FormGroup check>
                                                            <Input type="checkbox" />
                                                        </FormGroup>

                                                    </th>
                                                    <th>STT</th>
                                                    <th>Mã</th>
                                                    <th>Màu</th>
                                                    <th>Size</th>
                                                    <th>Số lượng</th>
                                                    <th>Giá</th>

                                                    <th colSpan={2}>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ListShoesDetail.length <= 0 &&
                                                    <th className="text-center" colSpan={17}>
                                                        Không có dữ liệu
                                                    </th>
                                                }

                                                {ListShoesDetail && ListShoesDetail.length > 0 &&
                                                    ListShoesDetail.map((item, index) => {
                                                        return (
                                                            <tr key={item.id} >
                                                                <td className="text-center">
                                                                    <FormGroup check>
                                                                        <Input type="checkbox" />
                                                                    </FormGroup>
                                                                </td>
                                                                <th scope="row"> {index + 1}</th>
                                                                <td>{item.code}</td>
                                                                <td>{item.color}</td>
                                                                <td>{item.size}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.price}</td>
                                                                <td>
                                                                    <Button color="danger" to={`/admin/product/detail/${item.id}`} tag={Link} size="sm">
                                                                        <i class="fa-solid fa-eye"></i>
                                                                    </Button>
                                                                    <Button color="danger" to={`/admin/product2/edit/${item.id}`} tag={Link} size="sm">
                                                                        <i class="fa-solid fa-pen" />
                                                                    </Button>
                                                                    <Button color="warning" size="sm" >
                                                                        <i class="fa-solid fa-trash" />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </Table>
                                    </Row>


                                    {/*  */}
                                </CardBody>
                            </Card>
                            <Card className="card-stats m-4 mb-xl-0">
                                <Row className="align-items-center mb-2">
                                    <Col lg="6">
                                        <Card className="shadow m-4">
                                            <CardBody>
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    <h3>Màu</h3>
                                                </CardTitle>
                                                <FormGroup check>
                                                    <div className="mb-2">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectAllColor}
                                                                onChange={handleSelectAllColor}
                                                            />&nbsp;&nbsp;
                                                            Tất cả
                                                        </label>
                                                    </div>
                                                    <Row>
                                                        <Col lg={2}></Col>
                                                        <Col lg={10}>
                                                            <Row>
                                                                {checkboxesColor.map((checkbox) => (
                                                                    <Col lg={6}>
                                                                        <label key={checkbox.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={checkbox.checked}
                                                                                onChange={() => handleCheckboxColorChange(checkbox.id)}
                                                                            />&nbsp;&nbsp;
                                                                            {checkbox.label}
                                                                        </label>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                    <Col lg="6">
                                        <Card className="shadow m-4">

                                            <CardBody>
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    <h3>Size</h3>
                                                </CardTitle>
                                                <FormGroup check>
                                                    <div className="mb-2">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectAllSize}
                                                                onChange={handleSelectAllSize}
                                                            />&nbsp;&nbsp;
                                                            Tất cả
                                                        </label>
                                                    </div>
                                                    <Row>
                                                        <Col lg={2}></Col>
                                                        <Col lg={10}>
                                                            <Row>
                                                                {checkboxesSize.map((checkbox) => (
                                                                    <Col lg={6}>
                                                                        <label key={checkbox.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={checkbox.checked}
                                                                                onChange={() => handleCheckboxSizeChange(checkbox.id)}
                                                                            />&nbsp;&nbsp;
                                                                            {checkbox.label}
                                                                        </label>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                </Row>
                                {/*  */}
                                <Row>
                                    <Col lg="12">
                                        <Card className="shadow m-4">
                                            <CardBody>
                                                <CardTitle>
                                                    <Input id="btn_select_tt" type="select" name="sizeId" className="col-2 mt-4"
                                                        onChange={(e) => onInputChangeSelectedColor(e.target.value)}
                                                    >
                                                        {selectedValuesColor.map((value, index) => (
                                                            <option value={value.id} key={value.id}>
                                                                {value.name}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </CardTitle>


                                                <Table bordered dark hover responsive striped className="m-4">
                                                    <thead>
                                                        <tr>
                                                            <th >Size</th>
                                                            <th>Giá</th>
                                                            <th>Số lượng</th>
                                                            <th>Trạng Thái</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedValuesSize.map((value, index) => (
                                                            <tr key={value.id} onClick={() => onClickSize(value.id)}>
                                                                <td className="col-1">{value.name}</td>
                                                                <td className="col-3">
                                                                    <Input
                                                                        id="find_code"
                                                                        name="price"
                                                                        placeholder="Nhập giá"
                                                                        value={shoesdetail.price}
                                                                        onChange={(e) => onInputChangeAdd(e)}

                                                                    />
                                                                </td>
                                                                <td className="col-3">
                                                                    <Input
                                                                        id="find_code"
                                                                        name="quantity"
                                                                        placeholder="Nhập số lượng"
                                                                        value={shoesdetail.quantity}
                                                                        onChange={(e) => onInputChangeAdd(e)}
                                                                    />
                                                                </td>
                                                                <td >
                                                                    <Input id="btn_select_tt" type="select" name="status" value={shoesdetail.status} onChange={(e) => onInputChangeAdd(e)}
                                                                    >
                                                                        <option value='1'>
                                                                            Đang bán
                                                                        </option>
                                                                        <option value='0'>
                                                                            Ngừng bán
                                                                        </option>
                                                                        <option value='2'>
                                                                            Hết hàng
                                                                        </option>

                                                                    </Input>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>


                                {/*  */}

                            </Card>
                        </Card >
                    </div >
                </Row >

            </Container >
        </>
    );
};

export default ListShoesDetail;

