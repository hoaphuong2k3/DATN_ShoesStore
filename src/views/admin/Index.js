
import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { DatePicker } from 'antd';
import {
  Button,
  Card, CardTitle,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isBefore, startOfYear, endOfYear, eachMonthOfInterval
} from 'date-fns';
import Header from "components/Headers/AdminHeader.js";

const Index = (props) => {

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());

  const [chartExample1Data, setChartExample1Data] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
      },
    ],
  });

  const [chartExample2, setChartExample2] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
      },
    ],
  });

  if (window.Chart) {
    parseOptions(window.Chart, chartOptions());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultMonth = selectedMonth !== null ? selectedMonth : new Date().getMonth() + 1;
        const defaultYear = selectedYear !== null ? selectedYear : new Date().getFullYear();

        const firstDayOfMonth = startOfMonth(new Date(defaultYear, defaultMonth - 1, 1));
        const lastDayOfMonth = isBefore(new Date(), endOfMonth(new Date(defaultYear, defaultMonth - 1, 1)))
          ? new Date()
          : endOfMonth(new Date(defaultYear, defaultMonth - 1, 1));

        const allDaysOfMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
        const labels = allDaysOfMonth.map((day) => format(day, 'dd-MM'));

        const response = await axiosInstance.get(
          "/statistics/data-product",
          {
            params: {
              month: defaultMonth,
              year: defaultYear,
            },
          }
        );
        const dataFromApi = response.data;
        const datasets = [
          {
            label: "Doanh thu",
            data: allDaysOfMonth.map((day) => {
              const isoDate = format(day, 'yyyy-MM-dd');
              const matchingData = dataFromApi.find((item) => item.createdTime === isoDate);
              return matchingData ? matchingData.totalPayment : 0;
            }),
          },
        ];

        setChartExample1Data({
          labels: labels,
          datasets: datasets,
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultYear = selectedYear2 !== null ? selectedYear2 : new Date().getFullYear();
        const firstMonthofYear = startOfYear(new Date(defaultYear, 0));
        const lastMonthofYear = endOfYear(new Date(defaultYear, 11));

        const allMonthsOfYear = eachMonthOfInterval({
          start: firstMonthofYear,
          end: lastMonthofYear,
        });
        const labels = allMonthsOfYear.map((month) => format(month, 'MM'));

        const response = await axiosInstance.get(`/statistics/data-product-year?year=${selectedYear2}`);
        const apiData = response.data;
        console.log(apiData);
        const datasets = [
          {
            label: "Doanh thu",
            data: allMonthsOfYear.map((month) => {
              const isoDate = format(month, 'MM-yyyy');
              const matchingData = apiData.find((item) => item.data.length > 0 && item.data[0].createdTime === isoDate);
              return matchingData ? matchingData.data[0].totalPayment : 0;
            }),
          },
        ];

        setChartExample2({
          labels: labels,
          datasets: datasets,
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [selectedYear2]);



  const currentDate = new Date();

  const getYearDes = () => {
    const year = currentDate.getFullYear();
    return `${year}`;
  };

  const [productTop, setProductTop] = useState([]);
  const [productBottom, setProductBottom] = useState([]);
  const [saleOff, setSaleOff] = useState([]);
  const [saleOn, setSaleOn] = useState([]);
  const [saleCancle, setSaleCancle] = useState([]);
  const [saleCancle2, setSaleCancle2] = useState([]);

  const fetchDataCombined = async () => {
    try {
      const [topProducts, bottomProducts, saleOff, saleOn, saleCancel, saleCancel2] = await Promise.all([
        axiosInstance.get("/statistics/top-5-product"),
        axiosInstance.get("/statistics/bottom-5-product"),
        axiosInstance.get("/statistics/data-payment?saleStatus=1&sale=6"),
        axiosInstance.get("/statistics/data-payment?saleStatus=0&sale=6"),
        axiosInstance.get("/statistics/data-payment?saleStatus=1&sale=7"),
        axiosInstance.get("/statistics/data-payment?saleStatus=0&sale=7"),
      ]);
  
      setProductTop(topProducts.data);
      setProductBottom(bottomProducts.data);
      setSaleOff(saleOff.data);
      setSaleOn(saleOn.data);
      setSaleCancle(saleCancel.data);
      setSaleCancle2(saleCancel2.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  
  // Gọi hàm mới thay vì fetchData
  useEffect(() => {
    fetchDataCombined();
  }, []);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [modalData, setModalData] = useState(null);
  const openModal = async (productId) => {
    try {
      // Thực hiện yêu cầu API
      const response = await axiosInstance.get(`/statistics/detail-product/${productId}`);
      setModalData(response.data);
      console.log(response.data);
      toggleModal();
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu API:", error);
    }
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-white ls-1 mb-1">
                      <h6 className="text-uppercase text-white ls-1 mb-1">
                        {`Doanh thu ${`Tháng ${selectedMonth}/${selectedYear}`}`}
                      </h6>

                    </h6>
                  </div>
                  <div className="col text-right">
                    <DatePicker className="bg-primary"
                      picker="month"
                      onChange={(date, dateString) => {
                        if (date) {
                          const [year, month] = dateString.split("-");
                          setSelectedMonth(parseInt(month, 10));
                          setSelectedYear(parseInt(year, 10));
                        } else {
                          const currentDate = new Date();
                          setSelectedMonth(currentDate.getMonth() + 1);
                          setSelectedYear(currentDate.getFullYear());
                        }
                      }}
                    />

                  </div>

                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1Data}
                    options={chartOptions().defaults}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="9">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase ls-1 mb-1">
                      {`DOANH THU NĂM ${`${selectedYear2}`}`}
                    </h6>
                  </div>
                  <div className="col text-right">
                    <DatePicker
                      picker="year"
                      onChange={(date, dateString) => {
                        if (date) {
                          const year = dateString;
                          setSelectedYear2(parseInt(year, 10));
                        } else {
                          const currentDate = new Date();
                          setSelectedYear2(currentDate.getFullYear());
                        }
                      }}
                    />
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2}
                    options={chartOptions().defaults}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="3">

            <div className="mb-4">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Doanh thu tại quầy
                      </CardTitle>
                      <div className="font-weight-bold pt-2 pl-1" style={{ fontSize: 20 }}>
                        {saleOff && saleOff.length > 0 ? formatter.format(saleOff[0].totalPayment) : "0"}
                      </div>
                    </div>
                    <Col className="col-auto">
                      <div className="p-2 bg-gradient-danger text-white rounded">
                        <i className="fa-solid fa-house-circle-check" style={{ fontSize: 20 }} />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="mr-2">
                      <i className="fa-solid fa-check" /> {""}
                      {saleOff && saleOff.length > 0 ? saleOff[0].totalQuantity : "0"}
                      {" "}đơn hàng hôm nay
                    </span>
                  </p>
                </CardBody>
              </Card>
            </div>

            <div className="mb-4">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Doanh thu online
                      </CardTitle>
                      <div className="font-weight-bold pt-2 pl-1" style={{ fontSize: 20 }}>
                        {saleOn && saleOn.length > 0 ? formatter.format(saleOn[0].totalPayment) : "0"}
                      </div>
                    </div>
                    <Col className="col-auto">
                      <div className="p-2 bg-gradient-danger text-white rounded">
                        <i className="fa-solid fa-globe" style={{ fontSize: 20 }} />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="mr-2">
                      <i className="fa-solid fa-check" /> {""}                
                      {saleOn && saleOn.length > 0 ? saleOn[0].totalQuantity : "0"}
                      {" "}đơn hàng hôm nay
                    </span>
                  </p>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Đơn hủy hôm nay
                      </CardTitle>
                      <div className="mt-3">
                        <span>Offline: </span>
                        <span className="h2 font-weight-bold ml-2">
                        {saleCancle && saleCancle.length > 0 ? `${saleCancle[0].totalQuantity} đơn` : "0"} 
                        </span>
                      </div>

                      <div className="mt-1">
                        <span>Online: </span>
                        <span className="h2 font-weight-bold ml-2">
                        {saleCancle2 && saleCancle2.length > 0 ? `${saleCancle2[0].totalQuantity} đơn` : "0"} 
                        </span>
                      </div>

                    </div>
                    <Col className="col-auto">
                      <div className="p-2 bg-gradient-danger text-white rounded">
                        <i className="fa-solid fa-ban" style={{ fontSize: 20 }} />
                      </div>
                    </Col>
                  </Row>
                 
                </CardBody>
              </Card>
            </div>

          </Col>
        </Row>

        <Row className="mt-5">
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h5 className="mb-0">Top 5 sản phẩm bán chạy nhất {getYearDes()}</h5>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light text-center">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng bán ra</th>
                    <th scope="col">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(productTop) && productTop.map((product, index) => (
                    <tr key={product.id}>
                      <th scope="row" className="text-center">{index + 1}</th>
                      <td>{product.name}</td>
                      <td className="text-right pr-6">{product.totalQuantity || 0}</td>
                      <td className="text-center">
                        <Button color="link" onClick={() => openModal(product.id)}>
                          <i class="fa-solid fa-lines-leaning" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h5 className="mb-0">Top 5 sản phẩm bán chậm nhất {getYearDes()}</h5>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light text-center">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng bán ra</th>
                    <th scope="col">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(productBottom) && productBottom.map((product, index) => (
                    <tr key={product.id}>
                      <th scope="row" className="text-center">{index + 1}</th>
                      <td>{product.name}</td>
                      <td className="text-right pr-6">{product.totalQuantity || 0}</td>
                      <td className="text-center">
                        <Button color="link" onClick={() => openModal(product.id)}>
                          <i class="fa-solid fa-lines-leaning" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Chi tiết</ModalHeader>
        <ModalBody>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col" className="text-center">STT</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Size</th>
                <th scope="col">Màu</th>
                <th scope="col">Số lượng bán ra</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(modalData) && modalData.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row" className="text-center">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.size}</td>
                  <td>{product.color}</td>
                  <td className="text-right pr-6">{product.quantity || 0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal} size="sm">
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;
