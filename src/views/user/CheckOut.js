import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup
} from "reactstrap";
import Header from "components/Headers/ProductHeader";
import axiosInstance from "services/custommize-axios";
import axios from "axios";
import { toast } from "react-toastify";
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { FaTimes, FaCommentMedical } from "react-icons/fa";
import "assets/css/checkout.css";

const Checkout = () => {

  const [modal, setModal] = useState(false);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState("");
  const [usedVoucherCode, setUsedVoucherCode] = useState(null);
  const [selectedVoucherDetails, setSelectedVoucherDetails] = useState(null);
  const [voucherValue, setVoucherValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  const [voucher, setVoucher] = useState([]);
  const [checkout, setCheckout] = useState([]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const formatTimeRemaining = (endDate, startDate) => {
    const endDateTime = new Date(endDate).getTime();
    const now = new Date().getTime();
    const timeRemaining = endDateTime - now;

    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (daysRemaining === 0) {
      return `${hoursRemaining} giờ`;
    }

    return `${daysRemaining} ngày ${hoursRemaining} giờ`;
  };

  const [displayedPoints, setDisplayedPoints] = useState(checkout.totalPoints);
  const [usingPoints, setUsingPoints] = useState(false);
  const handleToggleChange = () => {
    setUsingPoints(!usingPoints);
  };


  //Voucher
  const toggle = () => {
    setModal(!modal);
    setSelectedVoucherCode("");
  };
  const handleCardClick = (code) => {
    setSelectedVoucherCode(code);
    setSearchValue(code);
  };

  const handleUseVoucherClick = () => {
    if (!selectedVoucherCode) {
      toast.error('Vui lòng chọn mã giảm giá.');
      return;
    }

    const selectedVoucher = voucher.find((v) => v.code === selectedVoucherCode);
    const { minPrice } = selectedVoucher;

    if (minPrice && minPrice > checkout.totalMoney) {
      toast.error('Bạn không đủ điều kiện áp dụng voucher.');
      return;
    }

    setUsedVoucherCode(selectedVoucherCode);
    setSelectedVoucherDetails(selectedVoucher);

    const { salePercent, salePrice } = selectedVoucher;
    const calculatedValue =
      (salePercent !== null ? (salePercent / 100) * checkout.totalMoney : salePrice) || 0;

    setVoucherValue(calculatedValue);
    setModal(false);
  };

  const handleClearVoucher = () => {
    setUsedVoucherCode("");
    setVoucherValue(0);
  };
  useEffect(() => {
    if (searchValue === "") {
      setSelectedVoucherCode("");
      return;
    }
    const foundVoucher = voucher.find((v) => v.code.toLowerCase() === searchValue.toLowerCase());
    if (foundVoucher) {
      setSelectedVoucherCode(foundVoucher.code);
      setModal(true);
    }
  }, [searchValue, voucher]);


  //Voucher
  const fetchPromo = async () => {
    try {
      const res = await axiosInstance.get(`/vouchers/getAllIsActive?id=${storedUserId}`);
      setVoucher(res.data);
      console.log("Promo:", res.data);
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu khách hàng:', error);
    }
  };
  useEffect(() => {
    fetchPromo();
  }, []);

  const getSelectedVoucherId = () => {
    return selectedVoucherDetails ? selectedVoucherDetails.id : null;
  };

  //Checkout
  const fetchCheckout = async () => {
    try {
      const response = await axiosInstance.get(
        `/cart/find-checkout/${storedUserId}`
      );

      setProducts(response.data.shoesCart);
      setCheckout(response.data);
      console.log("checkout", response.data);

    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  const calculatePayment = () => {
    return checkout.totalMoney +
      (checkout.periodType === 0
        ? -(checkout.totalMoney - checkout.totalPayment)
        : 0) +
      (usedVoucherCode ? -voucherValue : 0) +
      shippingTotal +
      (checkout.periodType === 1 ? -shippingTotal : 0);
  };

  const totalPaymentFinal = () => {
    if (usingPoints === true) {
      return calculatePayment() >= checkout.totalPoints
        ? calculatePayment() - checkout.totalPoints
        : 0;
    } else {
      return calculatePayment();
    }
  };

  useEffect(() => {
    const calculateAndFormatPoints = () => {
      if (usingPoints === true) {
        const updatedPoints =
          calculatePayment() >= checkout.totalPoints
            ? 0
            : checkout.totalPoints - calculatePayment();
        return (updatedPoints);
      } else {
        return (checkout.totalPoints);
      }
    };

    setDisplayedPoints(calculateAndFormatPoints());
  }, [usingPoints, calculatePayment(), checkout.totalPoints, formatter]);



  let idDisCountPeriod = checkout.idDiscountPeriod;
  if (checkout.totalMoney <= checkout.totalPayment || checkout.totalPayment === null) {
    idDisCountPeriod = null;
  }


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
          address: `${selectedAddressData.addressDetail}, ${selectedAddressData.communeCode}, ${selectedAddressData.districtCode}, ${selectedAddressData.proviceCode}`,
        };
      }
    } else {
      // Nếu không có địa chỉ, hiển thị modal để thêm địa chỉ mới
      const newAddress = await toggleAddAdress();
      if (newAddress) {
        // Nếu có địa chỉ mới, sử dụng địa chỉ mới
        deliveryAddress = {
          address: `${newAddress.addressDetail}, ${newAddress.communeCode}, ${newAddress.districtCode}, ,${newAddress.proviceCode}`,
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
        idClient: storedUserId,
        idStaff: null,
        idDisCountPeriod: idDisCountPeriod,
        idVoucher: getSelectedVoucherId(),
        idShoesDetail: products.map((product) => product.id),
        paymentMethod: selectedPaymentMethod,
        totalMoney: checkout.totalMoney,
        totalPayment: totalPaymentFinal(),
        points: checkout.points,
        usingPoints: usingPoints,
        deliveryOrderDTO: {
          address: deliveryAddress.address,
          recipientName: recipientName,
          recipientPhone: recipientPhone,
          deliveryCost: shippingTotal,
        },
      };
      await axiosInstance.post("/order/create", data);
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
    }
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
  }, [modalAddAdress]);

  const [formData, setFormData] = useState({
    proviceCode: null,
    districtCode: null,
    communeCode: null,
    addressDetail: null,
  });

  useEffect(() => {
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

                  {checkout && checkout.freeGiftImage && checkout.freeGiftName && checkout.totalMoney > checkout.totalPayment && (
                    <div style={{ padding: "15px 0 5px 0", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                      <div className="item d-flex">
                        <div className="product-container mr-5 ml-5">
                          <img
                            src={`data:image/jpeg;base64,${checkout.freeGiftImage}`}
                            alt={checkout.freeGiftName}
                            style={{ width: "70px" }}
                          />
                          <div className="quantity-badge">
                            <span className="quantity">1</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-warning text-center" style={{ border: "1px solid", fontSize: 11 }}>Quà tặng</div>
                          <div className="mt-1">{checkout.freeGiftName}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Card className="mt-5">
                    <CardHeader className="h5 text-uppercase border-0">Địa chỉ nhận hàng</CardHeader>
                    <CardBody>

                      <Form>

                        <Row className="col">
                          <Col md={12}>
                            <FormGroup>
                              <div className="d-flex align-items-center">
                                <Input
                                  className="form-control-alternative mr-2"
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
                                        value={
                                          address.address &&
                                          address.addressDetail
                                        }
                                      >
                                        {`${address.addressDetail}, ${address.address}`}
                                      </option>
                                    ))}
                                </Input>
                                <Button
                                  color="secondary"
                                  onClick={toggleAddAdress}
                                  outline
                                  size="sm" style={{ border: '1px solid' }}
                                >
                                  <FaCommentMedical />
                                </Button>
                              </div>
                            </FormGroup>
                          </Col>

                        </Row>

                        <Row className="col">
                          <Col md={6}>
                            <FormGroup>
                              <Input
                                type="text"
                                className="form-control"
                                id="recipientName"
                                name="name"
                                required
                                placeholder="Họ và tên"
                              />
                            </FormGroup>
                          </Col>

                          <Col md={6}>
                            <FormGroup>
                              <Input
                                type="tel"
                                className="form-control"
                                id="recipientPhone"
                                name="phone"
                                required
                                placeholder="Điện thoại"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                      </Form>

                    </CardBody>
                  </Card>

                </div>


                <div className="col-md-4">

                  {/* Voucher */}
                  <Card className="mb-4">
                    <CardHeader className="h5 text-center text-warning border-0">
                      <i class="fa fa-ticket" style={{ marginRight: "11px" }}></i>
                      Leather Gent Vouchers
                    </CardHeader>
                    <CardBody className="pt-0">

                      <Button block color="link" style={{ border: "1px dashed #ccc", fontSize: 12 }} onClick={toggle}>
                        {usedVoucherCode ? (
                          <>
                            <span>
                              Đã chọn mã: {usedVoucherCode} (
                              {selectedVoucherDetails?.salePercent !== null
                                ? `${selectedVoucherDetails?.salePercent}%`
                                : `${formatter.format(selectedVoucherDetails?.salePrice)}`}
                              )
                            </span>
                            <FaTimes
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={handleClearVoucher}
                            />
                          </>
                        ) : (
                          "Chọn/Nhập mã"
                        )}
                      </Button>

                      <div className="mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {checkout.totalPoints !== 0 && (
                          <>
                            <small className="mr-1">Xu tích lũy: {displayedPoints}</small>
                            <Toggle size="sm" defaultChecked={false} onChange={handleToggleChange} />
                          </>

                        )}
                      </div>

                      <div className="text-right">
                        <small className="text-danger">Nhận hàng hoàn xu: {checkout.points}</small>
                      </div>

                    </CardBody>
                  </Card>

                  {/* Thanh toán */}
                  <Card>
                    <CardHeader className="h5 border-0">THANH TOÁN</CardHeader>

                    <CardBody>
                      <Form>
                        <div className="mb-2">
                          <span className="mr-2 small">Tạm tính</span>
                          <h5 style={{ float: "right" }}>
                            {formatter.format(checkout.totalMoney)}
                          </h5>
                        </div>

                        {checkout.periodType === 0 && checkout.totalMoney > checkout.totalPayment && (
                          <div className="mb-2">
                            <span className="mr-2 small">Đợt giảm giá</span>
                            <h5 style={{ float: "right" }}>
                              {formatter.format(-(checkout.totalMoney - checkout.totalPayment))}
                            </h5>
                          </div>
                        )}

                        {usedVoucherCode && (
                          <div className="mb-2">
                            <span className="mr-2 small">Voucher của shop</span>
                            <h5 style={{ float: "right" }}>
                              {formatter.format(-voucherValue)}
                            </h5>
                          </div>
                        )}

                        <div className="mb-2">
                          <span className="mr-2 small">Phí vận chuyển</span>
                          <h5 style={{ float: "right" }}>
                            {formatter.format(shippingTotal)}
                          </h5>
                        </div>

                        {checkout.periodType === 1 && (
                          <div className="mb-2">
                            <span className="mr-2 small">Giảm phí vận chuyển</span>
                            <h5 style={{ float: "right" }}>
                              {formatter.format(-shippingTotal)}
                            </h5>
                          </div>
                        )}

                        <div className="mb-2">
                          {usingPoints === true && (
                            <>
                              <span className="mr-2 small">Xu tích lũy</span>
                              <h5 style={{ float: "right" }}>
                                {calculatePayment() >= checkout.totalPoints
                                  ? formatter.format(-checkout.totalPoints)
                                  : formatter.format(-calculatePayment())}
                              </h5>
                            </>
                          )}
                        </div>

                      </Form>

                      <hr />
                      <span className="mr-2">Thành tiền</span>
                      <h3 style={{ float: "right" }}>
                        {formatter.format(totalPaymentFinal())}
                      </h3>
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

      <Modal isOpen={modal} toggle={toggle} style={{ maxWidth: '400px' }}>
        <ModalHeader toggle={toggle}>
          <h3 className="heading-small text-muted mb-0">Danh sách Vouchers</h3>
        </ModalHeader>
        <ModalBody className="pt-0">

          <Row>
            <Col className="d-flex" style={{ justifyContent: "space-between" }}>
              <InputGroup style={{ width: 245 }}>
                <Input
                  type="text"
                  placeholder="Nhập mã khuyến mại"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </InputGroup>
              <Button color="primary" outline onClick={handleUseVoucherClick}>
                Dùng mã
              </Button>
            </Col>
          </Row>

          {Array.isArray(voucher) && voucher.map((voucher, index) => (
            <Card body
              key={voucher.id}
              className="mt-3 pb-2 pt-2"
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
                backgroundColor: selectedVoucherCode === voucher.code ? "#F5F5F5" : "transparent",
              }}
              onClick={() => handleCardClick(voucher.code)}
            >
              <CardTitle className="mb-1 text-warning">
                {voucher.salePercent !== null
                  ? `Giảm giá ${voucher.salePercent}% cho đơn từ ${formatter.format(voucher.minPrice)}`
                  : `Giảm giá ${formatter.format(voucher.salePrice)} cho đơn từ ${formatter.format(voucher.minPrice)}`}
              </CardTitle>
              <CardText style={{ fontSize: 12 }}>
                HSD:{" "}
                <span style={{ color: "red" }}>
                  Chỉ còn {formatTimeRemaining(voucher.endDate, voucher.startDate)}
                </span>
              </CardText>
            </Card>
          ))}


        </ModalBody>
        <ModalFooter>
          <Button color="danger" size="sm" outline onClick={toggle}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal >

      {/* Modal Thêm Địa chỉ */}
      <Modal
        isOpen={modalAddAdress}
        toggle={toggleAddAdress}
        backdrop={"static"}
        keyboard={false}
        style={{ maxWidth: "500px" }
        }
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
            <Button
              name="checkout"
              onClick={(e) => saveAddress(e)}
              className="evo-button mobile-viewmore"
            >
              <strong>Thêm mới</strong>
            </Button>{" "}
            {formData.id ? (
              ""
            ) : (
              <Button className="evo-button mobile-viewmore" name="checkout" onClick={resetFormData}>
                Reset
              </Button>
            )}
            <Button className="evo-button mobile-viewmore" name="checkout" onClick={toggleAddAdress}>
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Checkout;
