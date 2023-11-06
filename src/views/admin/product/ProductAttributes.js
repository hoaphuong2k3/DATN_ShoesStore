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
  const [selecttt, setSelecttt] = useState('brand');
  const [code, setCode] = useState("");

  const [status, setStatus] = useState(1);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [search, setSearch] = useState({
    "codeOrName": ""
  });
  const [formData, setformData] = useState({
    name: ""
  });

  const [list, setList] = useState([]);
  const handleDeleteBrands = async (id) => {
    if (selecttt === 'brand') {
      getCategory();
    } else if (selecttt === 'color') {
      try {
        const response = await axios.delete(`http://localhost:33321/api/admin/color/delete`, {data:[id]});
        getColor();
        toast.success("Xóa thành công thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    }
  }

  const handleProductAttribites = async () => {
    if (selecttt === 'brand') {
      getCategory();
    } else if (selecttt === 'color') {
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
    }
  }
  const handleEditBrands = (brand) => {
    setDataEdit(brand);
    setformData({ ...setformData, name: dataEdit.name });
    console.log(dataEdit)
    setCode(dataEdit.code);
    toggleEdit();
  }
  const EditProductAttribites = async () => {
    if (selecttt === 'brand') {
      getCategory();
    } else if (selecttt === 'color') {
      try {
        const response = await axios.put(`http://localhost:33321/api/admin/color/${dataEdit.id}`, formData);
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
    }
    // try {

    //   let res = await updateBrand(dataEdit.id, code,);
    //   console.log(res)
    //   toggleEdit();
    //   getCategory();
    //   setformData({ ...formData, name: "" })
    //   setCode('');
    //   toast.success("User added successfully");
    //   setDataEdit({});
    // } catch {
    //   toast.error("error");
    // }

  }


  useEffect(() => {

    getCategory();
  }, []);
  useEffect(() => {
    if (selecttt === 'brand') {
      getCategory();
    } else if (selecttt === 'color') {
      getColor();
    }

  }, [selecttt]);
  const getColor = async () => {
    try {
      let res = await getAllColor1(page, size, search);
      console.log(res)
      if (res && res.data && res.data.content) {
        setList(res.data.content);
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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mb-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Thuộc tính sản phẩm</h3>
              </CardHeader>
              <CardBody>
                {/* Start row btn select productAttrinutes */}
                <Row>
                  <Col lg="6" xl="3">
                    <Label for="btn_select_tt">
                      Thông tin của:
                    </Label>

                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup>
                      <Input id="btn_select_tt" name="select" type="select"
                        onChange={(event) => setSelecttt(event.target.value)} value={selecttt} >
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
                        <option value="color">
                          Màu
                        </option>
                      </Input>
                    </FormGroup>
                    <p>Giá trị đã chọn: {selecttt}</p>
                  </Col>
                  <Col lg="6" xl="3" className="text-center">
                    <Button color="primary" onClick={toggle}>
                      Thêm
                    </Button>
                  </Col>
                </Row>
                {/*-- end row btn select productAttrinutes -*/}
              </CardBody>
            </Card>
          </div>
        </Row>

        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className=" shadow">
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
                {/* start row find  productAttrinutes*/}
                <Row>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_code" xl={3}>
                        Mã:
                      </Label>
                      <Col xl={9}>
                        <Input
                          id="find_code"
                          name="code"
                          placeholder=" "
                        />
                      </Col>

                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_name" xl={3}>
                        Tên:
                      </Label>
                      <Col xl={9}>
                        <Input
                          id="find_name"
                          name="name"
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_createdAt" xl={3}>
                        Người tạo:
                      </Label>
                      <Col xl={9}>
                        <Input
                          id="find_createdAt"
                          name="name"
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup row>
                      <Label for="find_createdDate" xl={3}>
                        Người tạo:
                      </Label>
                      <Col xl={4}>
                        <Input
                          id="find_createdDate"
                          name="date"
                          placeholder="date placeholder"
                          type="date"
                        />
                      </Col>
                      <Col xl={5}>
                        <Input
                          id="find_createdDate"
                          name="date"
                          placeholder="date placeholder"
                          type="date"
                        />
                      </Col>

                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="12" className="text-center">
                    <Button color="warning" onClick={toggle}>
                      <i class="fa-solid fa-magnifying-glass" /> &nbsp;
                      Tìm kiếm
                    </Button>
                    <Button color="primary" onClick={toggle}>
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
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      <h3> DANH SÁCH</h3>

                    </CardTitle>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
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
            <Button color="primary" size="sm" onClick={() => handleProductAttribites()}>
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