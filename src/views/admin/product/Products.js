import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllShoes, deleteShoes } from "services/Product2Service";
import ReactPaginate from 'react-paginate';
import { FaEdit, FaTrash, FaSearch, FaFileAlt, FaFilter } from 'react-icons/fa';
import { getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType, getAllToe, getAllSole, getAllLining, getAllCushion } from "services/ProductAttributeService";
// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row,
  Col, FormGroup, Label, Input, Button, Table, CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Form, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import { toast } from 'react-toastify';
import axios from "axios";


const Products = () => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
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
  const [thirdModal, setThirdModal] = useState(false);
  const toggleThirdModal = () => setThirdModal(!thirdModal);
  const handlePageClick = (event) => {
    setPage(+event.selected);
  }
  const onChangeSize = (e) => {
    setSize(+e.target.value);
  }
  const onInputChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getAll();
  }, [search]);
  const searchShoes = () => {
    getAll();
  };
  useEffect(() => {
    getAll();
  }, [size]);
  useEffect(() => {
    getAll();
  }, [page]);
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
  //Sort
  const [sort, setSort] = useState('');
  const [sortStyle, setSortStyle] = useState('');
  const onClickSort = (a, b) => {
    setSort(a);
    setSortStyle(b);
  }
  useEffect(() => {
    getAll();
  }, [sort, sortStyle]);
  //End Sort
  //getAll
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

  const [showActions, setShowActions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (idProduct) => {
    if (selectedItems.includes(idProduct)) {
      setSelectedItems(selectedItems.filter((id) => id !== idProduct));
      setShowActions(selectedItems.length - 1 > 0);
    } else {
      setSelectedItems([...selectedItems, idProduct]);
      setShowActions(true);
    }
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setShowActions(false);
    } else {
      setSelectedItems(listShoes.map(listShoes => listShoes.id));
      setShowActions(true);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteButtonClick = async () => {
    if (selectedItems.length > 0) {
      if (window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?")) {
        try {
          await deleteShoes({ data: selectedItems });
          getAll();
          setSelectedItems([]);
          toast.success("Xóa thành công ");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }

      }
    }
  };
  //End Delete

  //Import Excel
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };
  const formData = new FormData();
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      formData.append('file', selectedFile);
      try {
        console.log(formData)
        const response = await axios.post(`http://localhost:33321/api/admin/shoes/import-excel`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
        getAll();
        toast.success("Nhập excel thành công");
        // navigate("/admin/product");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    }
  };
  //Kết thúc import excel

  //Tải mẫu excel

  const taiMau = async () => {
    try {
      const res = await axios.get(`http://localhost:33321/api/admin/shoes/export/pattern`, {
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'application/excel' });

      // Tạo một URL cho Blob và tạo một thẻ a để download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Template_addShoes.xlsx';
      document.body.appendChild(a);
      a.click();

      // Giải phóng tài nguyên
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
    }
  };
  //Kết thúc tải mẫu excel

  const xuatExcel = async () => {
    try {
      const requestData = listShoes;
      const res = await axios.post(`http://localhost:33321/api/admin/shoes/export/excel`, requestData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const blob = new Blob([res.data], { type: 'application/excel' });

      // Tạo một URL cho Blob và tạo một thẻ a để download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Export_Shoes.xlsx';
      document.body.appendChild(a);
      a.click();

      // Giải phóng tài nguyên
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
    }
  };
  //Báo cáo 
  const token = localStorage.token;
  const baoCaoExcel = async () => {
    try {
      await axios.post(`http://localhost:33321/api/staff/shoesdetail/report`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  //End Báo cáo
  return (
    <>
      {/* Page content */}
      <Container className="pt-5 pt-md-7" fluid>

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">

                <Row className="align-items-center">
                  <div className="col d-flex">
                    <h3 className="heading-small text-dark mb-0">
                      Sản phẩm
                    </h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        outline
                        to="/admin/product/add" tag={Link}
                        size="sm"
                      >
                        + Thêm mới
                      </Button>
                      <Button
                        className="btn btn-outline-primary"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                        onClick={taiMau}
                      >
                        Tải mẫu
                      </Button>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />

                      <Button
                        className="btn btn-outline-primary"
                        size="sm"
                        onClick={handleFileSelect}
                      >
                        Nhập Excel
                      </Button>
                      <Button
                        className="btn btn-outline-primary"
                        size="sm"
                        onClick={xuatExcel}
                      >
                        Xuất Excel
                      </Button>
                      <Button
                        className="btn btn-outline-primary"
                        size="sm"
                        onClick={baoCaoExcel}
                      >
                        Báo cáo
                      </Button>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="col">
                  <Row className="align-items-center my-3">
                    <div className="col d-flex">
                      <Button color="warning" outline size="sm" onClick={toggleThirdModal}>
                        <FaFilter size="16px" className="mr-1" />Bộ lọc
                      </Button>

                      <Col>
                        <InputGroup size="sm">
                          <Input type="search"
                            placeholder="Tìm kiếm mã, tên sản phẩm..."
                          // value={searchValue}
                          // onChange={(e) => setSearchValue(e.target.value)}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <FaSearch />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </div>

                    <div className="col text-right">
                      {showActions && (
                        <Button
                          color="danger" outline
                          size="sm"
                          onClick={handleDeleteButtonClick}
                        >
                          Xóa tất cả
                        </Button>
                      )}
                    </div>
                  </Row>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th>
                          <FormGroup check className="pb-4">
                            <Input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                            />
                          </FormGroup>

                        </th>
                        <th>STT</th>
                        <th>Mã <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('code', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('code', 'desc')} />
                        </th>
                        <th>Tên
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('name', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('name', 'desc')} />
                        </th>
                        <th>Hãng
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('brand', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('brand', 'desc')} />
                        </th>
                        <th>Xuất xứ
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('origin', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('origin', 'desc')} />
                        </th>
                        <th>Thiết kế
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('designStyle', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('designStyle', 'desc')} />
                        </th>
                        <th>Loại da
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('skinType', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('skinType', 'desc')} />
                        </th>
                        <th>Mũi giày
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('toe', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('toe', 'desc')} />
                        </th>
                        <th>Đế giày
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('sole', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('sole', 'desc')} />
                        </th>
                        <th>Lót giày
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('lining', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('lining', 'desc')} />
                        </th>
                        <th>Đệm giày
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('cushion', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('cushion', 'desc')} />
                        </th>
                        <th>Số lượng
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('totalQuantity', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('totalQuantity', 'desc')} />
                        </th>
                        <th>Số CTSP
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('totalRecord', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('totalRecord', 'desc')} />
                        </th>
                        <th>Giá Min
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('priceMin', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('priceMin', 'desc')} />
                        </th>
                        <th>Giá Max
                          <i class="fa-solid fa-arrow-up" onClick={() => onClickSort('priceMax', 'asc')} />
                          <i class="fa-solid fa-arrow-down" onClick={() => onClickSort('priceMax', 'desc')} />
                        </th>

                        <th colSpan={3} style={{ position: "sticky", zIndex: '1', right: '0' }} className="text-center">Thao tác</th>
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
                                <FormGroup check className="pb-4">
                                  <Input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleCheckboxChange(item.id)}
                                  />

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
                              <td>{item.totalRecord > 0 ? formatter.format(item.priceMin) : ""}</td>
                              <td>{item.totalRecord > 0 ? formatter.format(item.priceMax) : ""}</td>
                              <td style={{ position: "sticky", zIndex: '1', right: '0', background: "#fff" }}>
                                <Button color="link" to={`/admin/shoesdetail/${item.id}`} tag={Link} size="sm">
                                  <i class="fa-solid fa-eye" color="primary" />
                                </Button>
                                {/* <Button color="link" to={`/admin/product/detail/${item.id}`} tag={Link} size="sm">
                                  <i class="fa-solid fa-eye"></i>
                                </Button> */}
                                <Button color="link" to={`/admin/product/edit/${item.id}`} tag={Link} size="sm">
                                  <FaEdit color="primary" />
                                </Button>
                                <Button color="link" size="sm" onClick={() => handleConfirmDelete(item)}>
                                  <FaTrash color="primary" />
                                </Button>
                              </td>
                            </tr>
                          )

                        })
                      }

                    </tbody>
                  </Table>

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
                </div>
              </CardBody>
            </Card>
          </div>
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
      <Modal
        isOpen={thirdModal}
        toggle={toggleThirdModal}
        style={{ maxWidth: '600px', right: 'unset', left: 0, position: 'fixed', marginLeft: '252px', marginRight: 0, top: "-27px" }}
      >
        <ModalHeader toggle={toggleThirdModal}>
          <h3 className="heading-small text-muted mb-0">Bộ lọc tìm kiếm</h3>
        </ModalHeader>
        <ModalBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Form>
            <div className="pl-lg-4">
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
                      size="sm"
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
                          size="sm"
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
                          size="sm"
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
                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-country"
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

                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
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
                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
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
                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
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
                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
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

                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
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

                <Col lg="6" xl="6">
                  <FormGroup>
                    <Label for="find_code" className="form-control-label">
                      Số lượng:
                    </Label>
                    <Row>
                      <Col xl={5}>
                        <Input size="sm"
                          className="form-control-alternative"
                          id="find_code"
                          name="fromQuantity"
                          value={search.fromQuantity}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Col>
                      <Label for="find_code" xl={1} className="form-control-label text-center">
                        <i class="fa-solid fa-arrow-right"></i>
                      </Label>
                      <Col xl={5}>
                        <Input size="sm"
                          className="form-control-alternative"
                          id="find_code"
                          name="toQuantity"
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
                        <Input size="sm"
                          className="form-control-alternative"
                          id="find_code"
                          name="fromPrice"
                          value={search.fromPrice}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Col>
                      <Label for="find_code" xl={2} className="form-control-label text-center">
                        <i class="fa-solid fa-arrow-right"></i>
                      </Label>
                      <Col xl={5}>
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
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="row w-100">
            <div className="col-4">
              <Button color="primary" outline size="sm" block onClick={resetSearch}>
                Làm mới
              </Button>
            </div>
            <div className="col-4">
              <Button color="primary" outline size="sm" block >
                Lọc
              </Button>
            </div>
            <div className="col-4">
              <Button color="danger" outline size="sm" block onClick={toggleThirdModal}>
                Đóng
              </Button>
            </div>
          </div>
        </ModalFooter>

      </Modal>
    </>
  );
};

export default Products;