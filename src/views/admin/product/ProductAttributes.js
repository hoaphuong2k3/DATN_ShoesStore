import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { postCreateBrands, getAllBrand, updateBrand, deleteBrand, getAllColor1, getAllSize } from "services/ProductAttributeService";
// reactstrap components
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Label, Input, Button, Table, CardTitle, Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";
import axios from "axios";


const ProductAttributes = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [dataEdit, setDataEdit] = useState({});
  const [selecttt, setSelecttt] = useState('color');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const handlePageClick = (event) => {
    setPage(+event.selected);
  }
  const onChangeSize = (e) => {
    setSize(+e.target.value);
  }
  const [search, setSearch] = useState({
    "codeOrName": ""
  });
  const [formData, setformData] = useState({
    name: ""
  });

  const [list, setList] = useState([]);
  const handleDeleteBrands = async (id) => {
    if (selecttt === 'color') {
      try {
        const response = await axios.delete(`http://localhost:33321/api/admin/color/delete`, { data: [id] });
        getColor();
        toast.success("Xóa thành công thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'brand') {
      getCategory();
    }
  }

  const handleProductAttribites = async () => {
    if (selecttt === 'color') {
      try {
        const response = await axios.post(`http://localhost:33321/api/admin/color`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getColor();
        toast.success("Thêm mới màu sắc thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'brand') {
      getCategory();
    }
  }
  const handleEditBrands = (brand) => {
    setDataEdit(brand);
    setformData({ ...setformData, name: brand.name });
    toggleEdit();
  }
  const EditProductAttribites = async () => {
    if (selecttt === 'color') {
      try {
        await axios.put(`http://localhost:33321/api/admin/color/${dataEdit.id}`, formData);
        toggleEdit();
        getColor();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa màu sắc thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'brand') {
      getCategory();
    }

  }


  useEffect(() => {

    getCategory();
  }, []);
  const getAll = () => {
    if (selecttt === 'color') {
      getColor();
    } else if (selecttt === 'brand') {
      getCategory();
    }
  }
  useEffect(() => {
    getAll();
  }, [search]);
  useEffect(() => {
    getAll();
  }, [selecttt]);
  const getColor = async () => {
    try {
      let res = await getAllColor1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getCategory = async () => {
    try {
      let res = await getAllBrand();
      if (res && res.data) {
        setList(res.data);
      }
    } catch (error) {
      setList([]);
    }
  };

  useEffect(() => {
    getAll();
  }, [size]);
  useEffect(() => {
    getAll();
  }, [page]);
  return (
    <>
      <Container fluid>
        <Row className="mb-4">
          <div className="col">
            <Card className="shadow  mt-7">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <h3 className="mb-0">Thuộc tính sản phẩm</h3>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Start row btn select productAttrinutes */}
                <Row>
                  <Col lg="6" xl="2">
                    <Label for="btn_select_tt" className="mt-1">
                      Thông tin của:
                    </Label>
                  </Col>
                  <Col lg="6" xl="4">
                    <FormGroup>
                      <Input id="btn_select_tt" name="select" type="select"
                        onChange={(event) => setSelecttt(event.target.value)} value={selecttt} >
                        <option value="color">
                          Màu
                        </option>
                        <option value="brand">
                          Hãng
                        </option>
                        <option value="design_style">
                          Thiết kế
                        </option>
                        <option value="skin_type">
                          Loại da
                        </option>
                        <option value="sole">
                          Đế giày
                        </option>
                        <option value="lining">
                          Lót giày
                        </option>
                        <option value="size">
                          Size
                        </option>

                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="4" className="text-center">
                    <Input
                      type="text"
                      name="code"
                      value={search.codeOrName}
                      onChange={(e) => setSearch({ ...search, codeOrName: e.target.value })}
                      placeholder="Mã hoặc tên thuộc tính" />
                  </Col>
                  <Col lg="6" xl="2" className="text-center">
                    <Button color="primary" onClick={toggle} className="btn btn-outline-primary">
                      + Thêm mới
                    </Button>
                  </Col>
                </Row>
                {/*-- end row btn select productAttrinutes -*/}
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row className="mb-4">
          <Col lg="6" xl="12">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      <h3> DANH SÁCH</h3>

                    </CardTitle>
                  </div>


                </Row>
                {/*  */}

                <Table responsive className="align-items-center table-flush">
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
                      {selecttt === 'brand' && <th>Ảnh</th>}
                      <th colSpan={2}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length <= 0 &&
                      <th className="text-center" colSpan={6}>
                        Không có dữ liệu
                      </th>
                    }
                    {list && list.length > 0 &&
                      list.map((item, index) => {
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
                            {selecttt === 'brand' &&
                              <td>
                                <img
                                  src="/path/to/your/image.jpg" // Đặt đường dẫn tới hình ảnh của bạn ở đây
                                  alt="Mô tả hình ảnh"
                                  width="300" // Tuỳ chỉnh kích thước nếu cần
                                  height="200"
                                />
                              </td>
                            }
                            <td>
                              <Button color="link" onClick={() => handleEditBrands(item)} size="sm">
                                <FaEdit color="primary" />
                              </Button>
                              <Button color="link" size="sm" onClick={() => handleDeleteBrands(item.id)}>
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

                {/*  */}
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
      >
        <ModalHeader toggle={toggle} >
          <h3 className="heading-small text-muted mb-0">Thêm thuộc tính</h3></ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="username"
                    >
                      Tên thuộc tính:
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="username"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setformData({ ...formData, name: event.target.value })}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="primary" onClick={() => handleProductAttribites()}>
              Thêm
            </Button>{' '}
          </div>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalEdit}
        toggleEdit={toggleEdit}
        backdrop={'static'}
        keyboard={false}
      >
        <ModalHeader toggle={toggleEdit}><h2>Sửa thuộc tính</h2></ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="username"
                    >
                      Tên thuộc tính:
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="username"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setformData({ ...formData, name: event.target.value })}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" onClick={() => EditProductAttribites()}>
              Sửa
            </Button>{' '}
          </div>
        </ModalFooter>
      </Modal>

    </>
  );
};


export default ProductAttributes;