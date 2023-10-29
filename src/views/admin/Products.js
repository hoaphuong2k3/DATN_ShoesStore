import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllShoes, deleteShoes } from "services/Product2Service";
import ReactPaginate from 'react-paginate';
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from 'react-icons/fa';
import { getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType, getAllToe, getAllSole, getAllLining, getAllCushion } from "services/ProductAttributeService";
// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row,
  Col, FormGroup, Label, Input, Button, Table, CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Form
} from "reactstrap";
import { toast } from 'react-toastify';
import Switch from 'react-input-switch';
import Header from "components/Headers/Header.js";


const Products = () => {
  const [value, setValue] = useState('no');
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
  const [size, setSize] = useState(10);
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
  useEffect(() => {
    if (value === 'no') {
      setSearch({
        ...search,
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
      })
    }
  }, [value]);
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
  const handlePageClick = (event) => {
    setPage(+event.selected);
    getAll(+event.selected + 1);
  }
  const onChangeSize = (e) => {
    setSize(+e.target.value);
  }
  const onInputChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getAll(page, size);
  }, [search]);
  const searchShoes = () => {
    getAll(page, size);
  };
  useEffect(() => {
    getAll(page, size);
  }, [size, page]);

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

  //getAll
  const getAll = async (page, size) => {
    try {
      let res = await getAllShoes(page, size, search);
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
  //Start Delete
  const [deleteshoes, setDeleteShoes] = useState([]);
  const [iddeleteshoes, setIdDeleteShoes] = useState([]);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const toggle = () => setModalConfirmDelete(!modalConfirmDelete);
  const handleConfirmDelete = (shoes) => {
    setDeleteShoes(shoes);
    setIdDeleteShoes([...iddeleteshoes, shoes.id])
    toggle();
  }
  const handleDelete = async () => {
    try {
      console.log(iddeleteshoes);
      await deleteShoes({ data: iddeleteshoes });
      getAll();
      setIdDeleteShoes([]);
      toggle();
      toast.success("Xóa thành công ");
    } catch (error) {
      setIdDeleteShoes([]);
      toggle();
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
  }
  //End Delete


  return (
    <>
      {/* Page content */}
      <Container fluid>
        <Row className="mb-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col-2">
                    <h3 className="mb-0">Sản phẩm</h3>
                  </div>
                  <div className="col-10 text-right">
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                      to="/admin/product/add" tag={Link}
                    >
                      Thêm mới
                    </Button>
                  </div>
                </Row>
              </CardHeader>
            </Card>
          </div>
        </Row>

        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card>
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Nhập tên"
                            type="text"
                            name="name"
                            value={search.name}
                            onChange={(e) => onInputChange(e)}
                          />
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
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Hãng
                            </label>
                            <Input id="btn_select_tt" type="select" name="brandId" value={search.brandId}
                              className="form-control-alternative"
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
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Xuất xứ
                            </label>
                            <Input id="btn_select_tt" name="originId" type="select" value={search.originId}
                              className="form-control-alternative"
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
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Thiết kế
                            </label>
                            <Input id="btn_select_tt" name="designStyleId" type="select" value={search.designStyleId}
                              onChange={(e) => onInputChange(e)} className="form-control-alternative">
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

                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Loại da
                            </label>
                            <Input id="btn_select_tt" name="skinTypeId" type="select" value={search.skinTypeId}
                              onChange={(e) => onInputChange(e)} className="form-control-alternative">
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
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Mũi giày
                            </label>
                            <Input id="btn_select_tt" name="toeId" type="select" value={search.toeId}
                              onChange={(e) => onInputChange(e)} className="form-control-alternative">
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
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Đế giày
                            </label>
                            <Input id="btn_select_tt" name="soleId" type="select" value={search.soleId}
                              onChange={(e) => onInputChange(e)} className="form-control-alternative">
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
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Lót giày
                            </label>
                            <Input id="btn_select_tt" name="liningId" type="select" value={search.liningId}
                              onChange={(e) => onInputChange(e)} className="form-control-alternative">
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

                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Đệm giày
                            </label>
                            <Input id="btn_select_tt" name="cushionId" type="select" value={search.cushionId}
                              onChange={(e) => onInputChange(e)} className="form-control-alternative" >
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

                        <Col lg="6" xl="6">
                          <FormGroup>
                            <Label for="find_code" className="form-control-label">
                              Số lượng:
                            </Label>
                            <Row>
                              <Col xl={5}>
                                <Input
                                  className="form-control-alternative"
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
                                  className="form-control-alternative"
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
                                  className="form-control-alternative"
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
                                  className="form-control-alternative"
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
                    <Button color="warning" onClick={searchShoes}>
                      <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                      Tìm kiếm
                    </Button>
                    <Button color="primary" onClick={resetSearch}>
                      Làm mới bộ lọc
                    </Button>
                  </Col>
                </Row>

                {/* end row find  productAttrinutes*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col lg="6" xl="12">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row className="align-items-center mb-2">

                  <CardTitle
                    tag="h5"
                    className=" col-2 text-uppercase text-muted mb-0"
                  >
                    <h3> DANH SÁCH</h3>

                  </CardTitle>

                  <div className="col text-right" style={{ display: "flex" }}>
                    <Col>
                      <Input type="select" name="status" style={{ width: "150px" }} size="sm" onChange={(e) => onInputChange(e)} >
                        <option value=" ">Tất cả</option>
                        <option value=" ">Tất cả</option>
                      </Input>
                    </Col>
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                      to="/admin/product/add" tag={Link}
                    >
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
                    <Button
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Báo cáo
                    </Button>
                  </div>
                </Row>
                {/*  */}
                {/* <div class="row">
                  <div class="col-sm-6 text-left">
                  </div>
                  <div class="col-sm-6 text-right">
                    <div class="dt-buttons btn-group" style={{ fontSize: 11 }}>
                      <button class="btn btn-primary buttons-print" tabindex="0" aria-controls="DataTables_Table_0" type="button" size="sm">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                      <button class="btn btn-primary buttons-copy buttons-html5" tabindex="0" aria-controls="DataTables_Table_0" type="button" size="sm">
                        <span>Tải mẫu</span>
                      </button>
                      <button class="btn btn-primary buttons-excel buttons-html5" tabindex="0" aria-controls="DataTables_Table_0" type="button" size="sm">
                        <span>Nhập<i class="fa-solid fa-file-excel" style={{color:"green"}}></i></span>
                      </button>
                      <button class="btn btn-primary buttons-csv buttons-html5" tabindex="0" aria-controls="DataTables_Table_0" type="button" size="sm">
                        <span>Xuất<i class="fa-solid fa-file-excel" style={{color:"green"}}></i></span>
                      </button>
                      <button class="btn btn-primary buttons-pdf buttons-html5" tabindex="0" aria-controls="DataTables_Table_0" type="button" size="sm">
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div> */}
                <Row>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center pb-4" >
                          <FormGroup check>
                            <Input type="checkbox" />
                          </FormGroup>

                        </th>
                        <th>STT</th>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Hãng</th>
                        <th>Xuất xứ</th>
                        <th>Thiết kế</th>
                        <th>Loại da</th>
                        <th>Mũi giày</th>
                        <th>Đế giày</th>
                        <th>Lót giày</th>
                        <th>Đệm giày</th>
                        <th>Số lượng</th>
                        <th>Số CTSP</th>
                        <th>Giá Min</th>
                        <th>Giá Max</th>

                        <th colSpan={2}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listShoes.length <= 0 &&
                        <th className="text-center" colSpan={17}>
                          Không có dữ liệu
                        </th>
                      }

                      {listShoes && listShoes.length > 0 &&
                        listShoes.map((item, index) => {
                          return (
                            <tr key={item.id} >
                              <td className="text-center">
                                <FormGroup check>
                                  <Input type="checkbox" />
                                </FormGroup>
                              </td>
                              <th scope="row"> {index + 1}</th>
                              <td>{item.code}</td>
                              <td>{item.name}</td>
                              <td>{item.brand}</td>
                              <td>{item.origin}</td>
                              <td>{item.designStyle}</td>
                              <td>{item.skinType}</td>
                              <td>{item.toe}</td>
                              <td>{item.sole}</td>
                              <td>{item.lining}</td>
                              <td>{item.cushion}</td>
                              <td>{item.totalQuantity}</td>
                              <td>{item.totalRecord}</td>
                              <td>{item.priceMin}</td>
                              <td>{item.priceMax}</td>
                              <td>
                                <Button color="danger" to={`/admin/shoesdetail/${item.id}`} tag={Link} size="sm">
                                  <i class="fa-solid fa-eye" />&nbsp;CTSP
                                </Button>
                                <Button color="gray" to={`/admin/product/detail/${item.id}`} tag={Link} size="sm">
                                  <i class="fa-solid fa-eye"></i>
                                </Button>
                                <Button color="info" to={`/admin/product/edit/${item.id}`} tag={Link} size="sm">
                                  <FaEdit />
                                </Button>
                                <Button color="danger" size="sm" onClick={() => handleConfirmDelete(item)}>
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
                <Row className="mt-4">
                  <Col lg={6}>
                    <div style={{ fontSize: 14 }}>
                      Đang xem <b>1</b> đến <b>{totalElements < size ? totalElements : size}</b> trong tổng số <b>{totalElements}</b> mục
                    </div>
                  </Col>
                  <Col style={{ fontSize: 14 }} lg={2}>
                    <Row>
                      <span>Xem </span>&nbsp;
                      <span>
                        <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" onChange={(e) => onChangeSize(e)} className="mt--1">
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </Input>
                      </span>&nbsp;
                      <span> mục</span>
                    </Row>

                  </Col>
                  <Col lg={4} style={{ fontSize: 11 }} className="mt--1">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      pageRangeDisplayed={1} // Number of pages to display on each side of the selected page
                      pageCount={totalPages} // Total number of pages
                      previousLabel="<"
                      onPageChange={handlePageClick}
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
                {/*  */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container >
      <Modal
        isOpen={modalConfirmDelete}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
      >
        <ModalHeader>
          Thông báo
        </ModalHeader>
        <ModalBody>
          <h3>Bạn có muốn xóa giày mã {deleteshoes.code} giày này không ?</h3>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" onClick={() => handleDelete()}>
              Xóa
            </Button>{' '}
            <Button color="danger" onClick={toggle}>
              Không
            </Button>{' '}
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Products;