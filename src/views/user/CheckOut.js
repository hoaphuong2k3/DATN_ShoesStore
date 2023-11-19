import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import Header from "components/Headers/ProductHeader";
import Select from "react-select";
import axiosInstance from "services/custommize-axios";

const Checkout = () => {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [products, setProducts] = useState(null);
  const storedUserId = localStorage.getItem("userId");

  const handleOpenVoucherModal = () => {
    setShowVoucherModal(true);
  };
  const handleCloseVoucherModal = () => {
    setShowVoucherModal(false);
  };
  const fetchCheckout = async () => {
    try {
      const response = await axiosInstance.get(
        `/cart/find-checkout/${storedUserId}`
      );

      setProducts(response.data.shoesCart);
      console.log(storedUserId);
      console.log(response.data.shoesCart);
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody className="row">
                <div className="col-12 text-center">
                  <h2 className="text-uppercase mb-2 mt-2 gioHang">
                    Thanh Toán
                  </h2>
                  <hr color="orange" width="280px" className="mb-5" />
                </div>
                <div className="col-md-8">
                  <div>
                    {Array.isArray(products) ? (
                      products.map((product) => (
                        <div className="item d-flex mb-5" key={product.id}>
                          <img
                            src={
                              "https://laforce.vn/wp-content/uploads/2022/12/giay-tay-nam-GNLAAZ01-1-D-108x136.jpg"
                            }
                            alt={product.name}
                            className="mr-3"
                          />
                          <div>
                            <div className="text-dark mt-3 name">
                              {product.name}
                            </div>
                            <div className="text-uppercase text-muted small mt-2">
                              {product.color}, size {product.size}
                            </div>
                            <div className="text-danger small mt-2">
                              {product.price}đ
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                  <div className="mt-5">
                    <div className="inner">
                      <h3 className="text-dark">
                        <i
                          class="fa fa-map-marker"
                          style={{ marginRight: "5px;" }}
                          aria-hidden="true"
                        ></i>
                        Thông tin giao hàng
                      </h3>
                      <Form
                        action="/checkout"
                        method="post"
                        noValidate
                        className="checkout table-wrap medium--hide small--hide"
                      >
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <Input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              required
                              placeholder="Họ và tên"
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <Input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              required
                              placeholder="Email"
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <Input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phone"
                              required
                              placeholder="Điện thoại"
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <Input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              required
                              placeholder="Địa chỉ"
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <Select placeholder="Tỉnh thành" />
                          </div>
                          <div className="form-group col-md-4">
                            <Select placeholder="Quận huyện" />
                          </div>
                          <div className="form-group col-md-4">
                            <Select placeholder="Phường" />
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <Card
                    style={{ backgroundColor: "#f7f7f7", marginBottom: "26px" }}
                  >
                    <CardBody>
                      <div className=" d-flex">
                        <p className="text-dark font-weight-bold mt-1">
                          <i
                            class="fa fa-ticket"
                            aria-hidden="true"
                            style={{ color: "gray", marginRight: "11px" }}
                          ></i>
                          ShoesVouchers
                        </p>
                        <a
                          onClick={handleOpenVoucherModal}
                          className=" mt-1 ml-5 pointer medium"
                        >
                          Chọn vouchers
                        </a>
                      </div>
                      <style>
                        {`
                            .pointer {
                                cursor: pointer;
                            }
                            `}
                      </style>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <h3 className="mr-3 text-dark font-weight-bold mt-1">
                            TẠM TÍNH
                          </h3>
                          {/* <span className="badge badge-info">2</span> */}
                        </div>
                        <div className="">
                          <div className="mb-2">
                            <span className="mr-2 ">Số lượng</span>
                            <span
                              className="text-dark font-weight-bold"
                              style={{ float: "right" }}
                            >
                              1
                            </span>
                            <br />
                          </div>
                          <div className="mb-2">
                            <span className="mr-2 ">Tạm tính</span>
                            <span
                              className="text-dark font-weight-bold"
                              style={{ float: "right" }}
                            >
                              441.000 đ
                            </span>
                            <br />
                          </div>
                          <div>
                            <span className="mr-2 ">Phí vận chuyển</span>
                            <span
                              className="text-dark font-weight-bold"
                              style={{ float: "right" }}
                            >
                              0 đ
                            </span>
                            <br />
                          </div>
                          <hr />
                          <span className="mr-2">Tổng cộng</span>
                          <h3
                            className="text-dark font-weight-bold"
                            style={{ float: "right" }}
                          >
                            441.000 đ
                          </h3>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="ml-2">
                    <p className="text-dark font-weight-bold mt-3">
                      <i
                        class="fa fa-credit-card"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      ></i>
                      PHƯƠNG THỨC THANH TOÁN
                    </p>
                    <Input type="radio" name="paymentMethod" className="ml-1" />
                    <Label className="ml-4">Thanh toán khi nhận hàng</Label>
                    <br />
                    <Input type="radio" name="paymentMethod" className="ml-1" />
                    <Label className="ml-4">Thẻ Master/Ví điện tử</Label>
                  </div>
                  <Button
                    name="checkout"
                    // onClick={() => handleCheckout()}
                    className="evo-button mobile-viewmore mt-4"
                    style={{ width: "100%" }}
                  >
                    <strong>Đặt Hàng</strong>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>

      <Modal isOpen={showVoucherModal} toggle={handleCloseVoucherModal}>
        <ModalHeader toggle={handleCloseVoucherModal}>
          Danh sách vouchers
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <div>
                <div>
                  <span className="mr-5">Mã giảm giá 1</span>
                  <Input
                    name="voucher_1"
                    style={{ float: "right" }}
                    type="radio"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <a
            color="secondary"
            onClick={handleCloseVoucherModal}
            style={{ cursor: "pointer" }}
          >
            Đóng
          </a>
          <Button className=" d-flex evo-button mobile-viewmore">
            Áp dụng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Checkout;
