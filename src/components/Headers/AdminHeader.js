import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { getMonth, getWeek } from 'date-fns';
import axiosInstance from "services/custommize-axios";

const Header = () => {

  const currentDate = new Date();

  const getWeekDescription = () => {
    const weekNumber = getWeek(currentDate, { weekStartsOn: 1 });
    return `Tuần ${weekNumber}`;
  };


  const getMonthDescription = () => {
    const monthNumber = getMonth(currentDate) + 1;
    return `Tháng ${monthNumber}`;
  };

  const getYearDescription = () => {
    const year = currentDate.getFullYear();
    return `Năm ${year}`;
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [saleWeek, setSaleWeek] = useState([]);
  const [saleMonth, setSaleMonth] = useState([]);
  const [saleYear, setSaleYear] = useState([]);
  const [saleWeekBefore, setSaleWeekBefore] = useState([]);
  const [saleMonthBefore, setSaleMonthBefore] = useState([]);
  const [saleYearBefore, setSaleYearBefore] = useState([]);
  const [client, setClient] = useState([]);
  const fetchData = async () => {
    try {

      const week = await axiosInstance.get("/statistics/week");
      setSaleWeek(week.data);
      const month = await axiosInstance.get("/statistics/month");
      setSaleMonth(month.data);
      const year = await axiosInstance.get("/statistics/year");
      setSaleYear(year.data);
      const client = await axiosInstance.get("/statistics/client");
      setClient(client.data);

      //before
      const weekBefore = await axiosInstance.get("/statistics/week-before");
      setSaleWeekBefore(weekBefore.data);
      const monthBefore = await axiosInstance.get("/statistics/month-before");
      setSaleMonthBefore(monthBefore.data);
      const yearBefore = await axiosInstance.get("/statistics/year-before");
      setSaleYearBefore(yearBefore.data);

    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          Khách hàng mới
                        </CardTitle>
                        <h1 className="font-weight-bold mb-0">{client}</h1>
                      </div>
                      <Col className="col-auto position-absolute right-0 bottom-6">
                        <div className="p-3 bg-gradient-info text-white rounded">
                          <i className="fa-solid fa-user-group" style={{ fontSize: 24 }} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        {/* <i className="fa fa-arrow-up" /> 0% */}
                      </span>{" "}
                      {/* <span className="text-nowrap">Hôm qua</span> */}
                    </p>
                  </CardBody>
                </Card>

              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {getWeekDescription()}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {saleWeek.totalPayment !== null && saleWeek.totalPayment !== 0
                            ? formatter.format(saleWeek.totalPayment)
                            : 0}
                        </span>

                      </div>
                      <Col className="col-auto position-absolute right-0 bottom-6">
                        <div className="p-3 bg-gradient-info text-white rounded">
                          <i className="fa-solid fa-chart-column" style={{ fontSize: 24 }} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {saleWeek.totalPayment != null ? (
                        <span className={`text-${saleWeekBefore.totalPayment != null && saleWeek.totalPayment >= saleWeekBefore.totalPayment ? 'success' : 'danger'} mr-2`}>
                          <i className={`fas fa-arrow-${saleWeek.totalPayment >= saleWeekBefore.totalPayment ? 'up' : 'down'}`} />{' '}
                          {saleWeekBefore.totalPayment != null && saleWeekBefore.totalPayment !== 0 ? (
                            <>
                              {Math.abs(saleWeek.totalPayment - saleWeekBefore.totalPayment) <= 100 ? (
                                <>{Math.round((saleWeek.totalPayment - saleWeekBefore.totalPayment) / saleWeekBefore.totalPayment * 100)}%</>
                              ) : (
                                <>{Math.abs(saleWeek.totalPayment / saleWeekBefore.totalPayment).toFixed(1)} lần</>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </span>
                      ) : (
                        <span className="text-danger">
                          <i className='fas fa-arrow-down' />
                        </span>
                      )}
                      <span className="text-nowrap"> Tuần trước</span>
                    </p>

                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {getMonthDescription()}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {saleMonth.totalPayment !== null && saleMonth.totalPayment !== 0
                            ? formatter.format(saleMonth.totalPayment)
                            : 0}
                        </span>
                      </div>
                      <Col className="col-auto position-absolute right-0 bottom-6">
                        <div className="p-3 bg-gradient-info text-white rounded">
                          <i className="fas fa-chart-bar" style={{ fontSize: 24 }} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {saleMonth.totalPayment != null ? (
                        <span className={`text-${saleMonth.totalPayment >= saleMonthBefore.totalPayment ? 'success' : 'danger'} mr-2`}>
                          <i className={`fas fa-arrow-${saleMonth.totalPayment >= saleMonthBefore.totalPayment ? 'up' : 'down'}`} />{' '}
                          {saleMonthBefore.totalPayment != null && saleMonthBefore.totalPayment !== 0 ? (
                            <>{Math.round((saleMonth.totalPayment - saleMonthBefore.totalPayment) / saleMonthBefore.totalPayment * 100)}%</>
                          ) : (
                            <></>
                          )}
                        </span>
                      ) : (
                        <span className="text-danger">
                          <i className='fas fa-arrow-down' />
                        </span>
                      )}
                      <span className="text-nowrap">Tháng trước</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {getYearDescription()}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {saleYear.totalPayment !== null && saleYear.totalPayment !== 0
                            ? formatter.format(saleYear.totalPayment)
                            : 0}
                        </span>
                      </div>
                      <Col className="col-auto position-absolute right-0 bottom-6">
                        <div className="p-3 bg-gradient-info text-white rounded">
                          <i className="fas fa-chart-pie" style={{ fontSize: 24 }} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {saleYear.totalPayment != null ? (
                        <span className={`text-${saleYear.totalPayment >= saleYearBefore.totalPayment ? 'success' : 'danger'} mr-2`}>
                          <i className={`fas fa-arrow-${saleYear.totalPayment >= saleYearBefore.totalPayment ? 'up' : 'down'}`} />{' '}
                          {saleYearBefore.totalPayment != null && saleYearBefore.totalPayment !== 0 ? (
                            <>{Math.round((saleYear.totalPayment - saleYearBefore.totalPayment) / saleYearBefore.totalPayment * 100)}%</>
                          ) : (
                            <></>
                          )}
                        </span>
                      ) : (
                        <span className="text-danger">
                          <i className='fas fa-arrow-down' />
                        </span>
                      )}
                      <span className="text-nowrap">Năm trước</span>
                    </p>


                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
