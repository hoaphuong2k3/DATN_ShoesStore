import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Button,
  Input,
  CardTitle,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Header from "components/Headers/ProductHeader";
import Select from "react-select";
import axiosInstance from "services/custommize-axios";
import axios from "axios";
import { toast } from "react-toastify";
import "assets/css/checkout.css";

const Checkout = () => {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [products, setProducts] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  const [totalMoney, setTotalMoney] = useState(null);


  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

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
      setTotalMoney(response.data.totalMoney);
      console.log(storedUserId);
      console.log(response.data.totalMoney);
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleOrder = async () => {
    if (selectedPaymentMethod === null) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }
  
    let deliveryAddress = {};
  
    // Kiểm tra xem có địa chỉ được chọn từ danh sách không
    if (selectedAddress) {
      const selectedAddressData = listAddress.find(
        (address) => address.addressDetail === selectedAddress
      );
  
      if (selectedAddressData) {
        // Nếu có, sử dụng địa chỉ từ danh sách
        deliveryAddress = {
          address: `${selectedAddressData.addressDetail}, ${selectedAddressData.proviceCode}, ${selectedAddressData.districtCode}, ${selectedAddressData.communeCode}`,
        };
      }
    } else {
      // Nếu không có địa chỉ, hiển thị modal để thêm địa chỉ mới
      const newAddress = await toggleAddAdress();
      if (newAddress) {
        // Nếu có địa chỉ mới, sử dụng địa chỉ mới
        deliveryAddress = {
          address: `${newAddress.addressDetail}, ${newAddress.proviceCode}, ${newAddress.districtCode}, ${newAddress.communeCode}`,
        };
      } else {
        // Người dùng đã hủy thêm địa chỉ, không thể tiếp tục đặt hàng
        return;
      }
    }
  
    try {
      const recipientName =
        document.getElementById("recipientName")?.value || "";
      const recipientPhone =
        document.getElementById("recipientPhone")?.value || "";
      const data = {
        idAccount: storedUserId,
        idDisCount: null,
        idShoesDetail: products.map((product) => product.id),
        paymentMethod: selectedPaymentMethod,
        totalMoney: totalMoney,
        deliveryOrderDTO: {
          address: deliveryAddress.address, // Sử dụng chuỗi địa chỉ
          recipientName: recipientName,
          recipientPhone: recipientPhone,
          deliveryCost: shippingTotal,
        },
      };
      const response = await axiosInstance.post("/order/create", data);
      alert("Đặt hàng thành công");
      window.location.href = "/shoes/home";
    } catch (error) {
      console.error("Lỗi trong quá trình tạo hóa đơn:", error);
    }
  };
  
  
  

  // ADDRESS

  const [listAddress, setListAddress] = useState([]);
  const getAllAddress = async () => {
    const res = await axiosInstance.get(`/address/${storedUserId}`);
    console.log(res);
    if (res && res.content) {
      setListAddress(res.content);
      console.log(res.content);
    }

    console.log(listAddress);
  };
  useEffect(() => {
    if (storedUserId) {
      getAllAddress();
    }
  }, []);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const fetchDataFromAPI = async (url, stateSetter) => {
    try {
      const response = await axios.get(url, {
        headers: {
          token: "44022259-5cfb-11ee-96dc-de6f804954c9",
        },
      });
      stateSetter(response.data.data);
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu từ ${url}:`, error);
    }
  };
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        fetchDataFromAPI(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          setProvinces
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tỉnh/thành phố:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleProvinceChange = async (value) => {
    console.log(value);
    const selectedProvinceCode = value;
    setFormData({
      ...formData,
      proviceCode: selectedProvinceCode,
      districtCode: "",
      communeCode: "",
    });

    try {
      const districtURL = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvinceCode}`;
      fetchDataFromAPI(districtURL, setDistricts);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quận/huyện:", error);
    }
  };

  const handleDistrictChange = async (value) => {
    const selectedDistrictCode = value;
    setFormData({
      ...formData,
      districtCode: selectedDistrictCode,
      communeCode: "",
    });
    try {
      const wardURL = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrictCode}`;
      fetchDataFromAPI(wardURL, setCommunes);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phường/xã:", error);
    }
  };

  const [modalAddAdress, setModalAddAdress] = useState(false);
  const toggleAddAdress = () => setModalAddAdress(!modalAddAdress);

  useEffect(() => {
    if (modalAddAdress === false) {
      resetFormData();
    }
    console.log("modalAddAdress:", modalAddAdress);
  }, [modalAddAdress]);

  const [formData, setFormData] = useState({
    proviceCode: null,
    districtCode: null,
    communeCode: null,
    addressDetail: null,
  });

  useEffect(() => {
    console.log("check", formData);
  }, [formData]);

  const saveAddress = async () => {
    try {
      await axiosInstance.post("http://localhost:33321/api/address/create", {
        proviceCode: formData.proviceCode,
        districtCode: formData.districtCode,
        communeCode: formData.communeCode,
        addressDetail: formData.addressDetail,
        idClient: storedUserId,
      });
      getAllAddress();
      toast.success("Thêm mới địa chỉ thành công!");

      // Đóng modal và reset form
      toggleAddAdress();
      resetFormData();
    } catch (error) {
      // Xử lý lỗi
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    }
  };
  // END ADDRESS

  const resetFormData = () => {
    setFormData({
      ...formData,
      proviceCode: "",
      districtCode: "",
      communeCode: "",
      addressDetail: "",
    });
  };
  const [shippingTotal, setShippingTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleApiCall = async (selectedAddress) => {
    // Nếu không có địa chỉ được chọn, set phí vận chuyển về 0 và kết thúc hàm
    if (!selectedAddress) {
      setShippingTotal(0);
      return;
    }

    const selectedAddressData = listAddress.find(
      (address) => address.addressDetail === selectedAddress
    );

    // Nếu không tìm thấy địa chỉ trong danh sách, kết thúc hàm
    if (!selectedAddressData) {
      return;
    }

    const servicesUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";
    const servicesPayload = {
      shop_id: "4580194",
      from_district: 3440,
      to_district: selectedAddressData.districtCode,
    };

    try {
      const servicesResponse = await axios.get(servicesUrl, {
        headers: {
          "Content-Type": "application/json",
          token: "44022259-5cfb-11ee-96dc-de6f804954c9",
        },
        params: servicesPayload,
      });

      const servicesData = servicesResponse.data;
      console.log(servicesData);
      const servicesData = servicesResponse.data;
      console.log(servicesData);

      const selectedService = servicesData.data.find(
        (service) => service.service_type_id === 2
      );

      if (selectedService) {
        const serviceId = selectedService.service_id;
        console.log(serviceId);
        const response = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          {
            headers: {
              token: "44022259-5cfb-11ee-96dc-de6f804954c9",
              shop_id: "4580194",
              "Content-Type": "application/json",
            },
            params: {
              service_id: serviceId,
              insurance_value: 500000,
              coupon: null,
              from_district_id: 3440,
              to_district_id: selectedAddressData.districtCode,
              to_ward_code: selectedAddressData.communeCode,
              height: 15,
              length: 15,
              weight: 2000,
              width: 15,
            },
          }
        );

        setShippingTotal(response.data.data.total);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình gọi API:", error);
    }
  };

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
                  <div
                    style={{
                      overflow: "auto",
                      maxHeight: "300px",
                      paddingTop: "15px",
                    }}
                  >
                    {Array.isArray(products) ? (
                      products.map((product) => (
                        <div className="item d-flex mb-5" key={product.id}>
                          <div className="product-container mr-5">
                            <img
                              src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.image}`}
                              alt={product.name}
                              className="product-image"
                            />
                            <div className="quantity-badge">
                              <span className="quantity">
                                {product.quantity}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-dark mt-3 name">
                              {product.name} - {product.code}
                            </div>
                            <div className="text-uppercase text-muted small mt-1">
                              {product.color}, size {product.size}
                            </div>
                            <div className="text-danger small mt-2">
                              {formatter.format(product.price)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>

                  <Card className="mt-5">
                    <CardBody>
                      <h3 className="text-dark mb-3">
                        <i
                          class="fa fa-map-marker"
                          style={{ marginRight: "5px;" }}
                          aria-hidden="true"
                        ></i>
                        Thông tin giao hàng
                      </h3>
                      <div className="inner px-4">
                        <Form
                          noValidate
                          className="checkout table-wrap medium--hide small--hide"
                        >
                          <div className="form-row">
                            {/* List address */}
                            <Col lg="12">
                              <FormGroup>
                                <div className="d-flex align-items-center">
                                  <Input
                                    className="form-control-alternative"
                                    type="select"
                                    value={selectedAddress}
                                    onChange={(e) => {
                                      setSelectedAddress(e.target.value);
                                      handleApiCall(e.target.value);
                                    }}
                                  >
                                    <option value="">Chọn địa chỉ</option>
                                    {listAddress &&
                                      listAddress.length > 0 &&
                                      listAddress.map((address, index) => (
                                        <option
                                          key={index}
                                          value={address.address && address.addressDetail}
                                        >
                                          {`${address.addressDetail}, ${address.address}`}
                                        </option>
                                      ))}
                                  </Input>
                                  <Button
                                    color="primary"
                                    onClick={toggleAddAdress}
                                    outline
                                    size="sm"
                                  >
                                    Thêm địa chỉ
                                  </Button>
                                </div>
                              </FormGroup>
                            </Col>

                           

                            <div className="form-group col-md-6">
                              <Input
                                type="text"
                                className="form-control"
                                id="recipientName"
                                name="name"
                                required
                                placeholder="Họ và tên"
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <Input
                                type="tel"
                                className="form-control"
                                id="recipientPhone"
                                name="phone"
                                required
                                placeholder="Điện thoại"
                              />
                            </div>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
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
                            <span className="mr-2 small">Số lượng</span>
                            <span
                              className="text-dark font-weight-bold"
                              style={{ float: "right" }}
                            >
                              {products ? products.length : 0}
                            </span>
                            <br />
                          </div>
                          <div className="mb-2">
                            <span className="mr-2 small">Tạm tính</span>
                            <span
                              className="text-dark font-weight-bold"
                              style={{ float: "right" }}
                            >
                              {formatter.format(totalMoney)}
                            </span>
                            <br />
                          </div>
                          <div>
                            <span className="mr-2 small">Phí vận chuyển</span>
                            <span
                              className="text-dark font-weight-bold"
                              style={{ float: "right" }}
                            >
                              {formatter.format(shippingTotal)}
                            </span>

                            <br />
                          </div>
                          <hr />
                          <span className="mr-2">Tổng cộng</span>
                          <h3
                            className="text-dark font-weight-bold"
                            style={{ float: "right" }}
                          >
                            {formatter.format(totalMoney + shippingTotal)}
                            {formatter.format(totalMoney + shippingTotal)}
                          </h3>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="ml-2">
                    <p className="text-dark font-weight-bold mt-3">
                      <i
                        className="fa fa-credit-card"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      ></i>
                      PHƯƠNG THỨC THANH TOÁN
                    </p>
                    <Input
                      type="radio"
                      name="paymentMethod"
                      className="ml-1"
                      value={1}
                      checked={selectedPaymentMethod === 1}
                      onChange={(e) =>
                        setSelectedPaymentMethod(parseInt(e.target.value))
                      }
                    />
                    <Label className="ml-4">Thanh toán khi nhận hàng</Label>
                    <br />
                    <Input
                      type="radio"
                      name="paymentMethod"
                      className="ml-1"
                      value={2}
                      checked={selectedPaymentMethod === 2}
                      onChange={(e) =>
                        setSelectedPaymentMethod(parseInt(e.target.value))
                      }
                    />
                    <Label className="ml-4">Thẻ Master/Ví điện tử</Label>
                  </div>
                  <Button
                    name="checkout"
                    onClick={() => handleOrder()}
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

      {/* Modal Thêm Địa chỉ */}
      <Modal
        isOpen={modalAddAdress}
        toggle={toggleAddAdress}
        backdrop={"static"}
        keyboard={false}
        style={{ maxWidth: "500px" }}
      >
        <ModalHeader toggle={toggleAddAdress}>
          <h3 className="heading-small text-muted mb-0">Thêm Mới Địa chỉ</h3>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      Chi tiết địa chỉ
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="textarea"
                      value={formData.addressDetail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressDetail: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      Tỉnh / Thành
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      value={formData.proviceCode}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                      <option value="">Chọn Tỉnh / Thành</option>
                      {provinces.map((province) => (
                        <option
                          key={province.ProvinceID}
                          value={province.ProvinceID}
                        >
                          {province.ProvinceName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-country"
                    >
                      Quận / Huyện
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      value={formData.districtCode}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={!formData.proviceCode}
                    >
                      <option value="">Chọn Quận / Huyện</option>
                      {districts.map((district) => (
                        <option
                          key={district.DistrictID}
                          value={district.DistrictID}
                        >
                          {district.DistrictName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">Phường / Xã</label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      value={formData.communeCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          communeCode: e.target.value,
                        })
                      }
                      disabled={!formData.districtCode}
                    >
                      <option value="">Chọn Phường / Xã</option>
                      {communes.map((commune) => (
                        <option key={commune.WardCode} value={commune.WardCode}>
                          {commune.WardName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" onClick={(e) => saveAddress(e)}>
              Thêm mới
            </Button>{" "}
            {formData.id ? (
              ""
            ) : (
              <Button color="primary" onClick={resetFormData}>
                Reset
              </Button>
            )}
            <Button color="danger" onClick={toggleAddAdress}>
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      {/* Kết thúc thêm modal địa chỉ */}
    </>
  );
};

export default Checkout;
