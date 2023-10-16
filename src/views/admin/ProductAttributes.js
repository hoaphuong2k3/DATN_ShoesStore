import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { postCreateBrands, getAllBrand, updateBrand, deleteBrand } from "services/ProductAttributeService";
// reactstrap components
import {
  Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Label, Input, Button, Table, CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";


const ProductAttributes = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [dataEdit, setDataEdit] = useState({});
  const [selecttt, setSelecttt] = useState('brand');
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value; // Lấy giá trị từ sự kiện onChange
    setSelecttt({ selectedValue }); // Cập nhật state
  }


  const [listCategory, setListCategory] = useState([]);

  const handleDeleteBrands = async (brand) => {
    try {
      console.log('Delete', brand.id);
      let res = await deleteBrand(brand.id);
      getCategory();
      toast.success("User added successfully");
    } catch {
      toast.error("User not deleted");
    }

  }

  const handleProductAttribites = async () => {
    let res = await postCreateBrands(code, name);
    // Object.keys(data)
    console.log("check res:", res.data);
    if (res && res.data.id) {
      toggle();
      console.log("check res:", res.data.id, name);
      setName('');
      setCode('');
      getCategory();
      toast.success("User added successfully");
    } else {
      toast.error("Error");
    }
  }
  const handleEditBrands = (brand) => {
    setDataEdit(brand);
    console.log(dataEdit)
    setCode(dataEdit.code);
    toggleEdit();

  }
  const EditProductAttribites = async () => {
    try {

      let res = await updateBrand(dataEdit.id, code, name);
      console.log(res)
      toggleEdit();
      getCategory();
      setName('');
      setCode('');
      toast.success("User added successfully");
      setDataEdit({});
    } catch {
      toast.error("error");
    }

  }


  useEffect(() => {

    getCategory();
  }, []);

  const getCategory = async () => {
    let res = await getAllBrand();
    if (res && res.data) {
      const data = res.data;
      const ordersList = Object.keys(data).map((key) => ({

        id: data[key].id,
        code: data[key].code,
        name: data[key].name,
      }));
      setListCategory(ordersList);
      console.log("checkk:", ordersList);
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

                <Table bordered dark hover responsive striped>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã</th>
                      <th>Tên</th>
                      {selecttt === 'brand' && <th>Ảnh</th>}
                      <th className="text-center pb-4" >
                        <FormGroup check>
                          <Input type="checkbox" />
                        </FormGroup>

                      </th>
                      <th colSpan={2}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCategory.length <= 0 &&
                      <th className="text-center" colSpan={6}>
                        Không có dữ liệu
                      </th>
                    }
                    {listCategory && listCategory.length > 0 &&
                      listCategory.map((item, index) => {
                        return (
                          <tr key={item.id} >
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
                            <td className="text-center">
                              <FormGroup check>
                                <Input type="checkbox" />
                              </FormGroup>
                            </td>
                            <td>
                              <Button color="danger" onClick={() => handleEditBrands(item)}>
                                <i class="fa-solid fa-pen" />
                              </Button>
                              <Button color="warning" onClick={() => handleDeleteBrands(item)}>
                                <i class="fa-solid fa-trash" />
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
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={1}
          pageRangeDisplayed={3}
          //số trang
          pageCount={49}
          previousLabel="< previous"

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

        /> */}

      </Container>
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
      >
        <ModalHeader toggle={toggle}><h2>Thêm thuộc tính</h2></ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="6" xl="12">
              <FormGroup row>
                <Label for="find_code" xl={3}>
                  Mã:
                </Label>
                <Col xl={9}>
                  <Input
                    id="find_code"
                    name="code"
                    placeholder=" "
                    onChange={(event) => setCode(event.target.value)}
                    value={code}
                  />
                </Col>

              </FormGroup>
            </Col>
            <Col lg="6" xl="12">
              <FormGroup row>
                <Label for="find_name" xl={3}>
                  Tên:
                </Label>
                <Col xl={9}>
                  <Input
                    id="find_name"
                    name="name"
                    placeholder=""
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Row>
                  <label xl={3}
                    className="ml-3"
                    htmlFor="input-address"
                  >
                    Trạng thái:
                  </label>
                  <FormGroup check >
                    <span className="col-md-3 ml-4">
                      <Input
                        name="btnstatus"
                        type="radio"
                        value="1"
                        checked

                      />
                      {' '}
                      <Label check className="form-control-label ">
                        Hoạt động
                      </Label>
                    </span>
                    &emsp;&emsp;&emsp;
                    <span xl={3} className="col-md-3">
                      <Input
                        name="btnstatus"
                        type="radio"
                        value="0"
                      />
                      {' '}
                      <Label check className="form-control-label">
                        Ngừng hoạt động
                      </Label>
                    </span>
                  </FormGroup>
                </Row>
              </FormGroup>
            </Col>
          </Row>

        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" onClick={() => handleProductAttribites()}>
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
          <Row>
            <Col lg="6" xl="12">
              <FormGroup row>
                <Label for="find_code" xl={2}>
                  Mã:
                </Label>
                <Col xl={10}>
                  <Input
                    id="find_code"
                    name="code"
                    placeholder=" "
                    onChange={(event) => setCode(event.target.value)}
                    value={code}
                  />
                </Col>

              </FormGroup>
            </Col>
            <Col lg="6" xl="12">
              <FormGroup row>
                <Label for="find_name" xl={2}>
                  Tên:
                </Label>
                <Col xl={10}>
                  <Input
                    id="find_name"
                    name="name"
                    placeholder=""
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
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