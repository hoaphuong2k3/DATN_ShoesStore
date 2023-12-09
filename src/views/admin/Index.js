
import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
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
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { format, parseISO, getMonth, startOfMonth, endOfMonth, eachDayOfInterval, isBefore } from 'date-fns';
import Header from "components/Headers/AdminHeader.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState({
    labels: [],
    datasets: [
      {
        label: "Performance",
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
        const response = await axiosInstance.get(
          "/statistics/data-product"
        );
        const dataFromApi = response.data;

        const today = new Date();
        const firstDayOfMonth = startOfMonth(today);
        const lastDayOfMonth = isBefore(today, endOfMonth(today))
          ? today
          : endOfMonth(today);
        const allDaysOfMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
        const labels = allDaysOfMonth.map((day) => format(day, 'dd-MM'));
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
  }, []);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const currentDate = new Date();
  const getMonthDes = () => {
    const monthNumber = getMonth(currentDate) + 1;
    const year = currentDate.getFullYear();
    return `${monthNumber}/${year}`;
  };

  const [productTop, setProductTop] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/statistics/top-5-product");
      setProductTop(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    fetchData();
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
                      Doanh thu T{getMonthDes()}
                    </h6>
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
        <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                <div className="col">
                    <h6 className="text-uppercase text-white ls-1 mb-1">
                      Doanh thu Năm
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Top 5 sản phẩm bán chạy nhất tháng {getMonthDes()}</h3>
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
          <Col xl="4">
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
          <Button color="primary" onClick={toggleModal}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;
