import React, { useState, useEffect, Switch } from 'react';
import { Card, Button, CardHeader, CardBody, Container, Row, Form, Col, Input, Table } from "reactstrap";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';

// core components
import Header from "components/Headers/BillHeader.js";
import BillDetail from "views/admin/BillDetail.js";


const Bills = () => {
  const [orders, setorders] = useState([]);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://datnshoes-default-rtdb.firebaseio.com/order.json');
      const data = await response.json();
      const ordersArray = Object.values(data);
      setorders(ordersArray);
      console.log(ordersArray);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleDateOptions = () => {
    setShowDateOptions(!showDateOptions);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      {selectedOrder && (
        <Route path={`/bill-details/${selectedOrder.id}`}>
          <BillDetail order={selectedOrder} />
        </Route>
      )}
      <Container fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Danh sách đơn hàng</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col xl="4" xs="6">
                      <Input className='mb-3' type="text" placeholder="Nhập từ khóa tìm kiếm..." />
                    </Col>
                    <Col xl="2" xs="3" >
                      <DropdownButton title="Ngày tạo" >
                        <div className="d-flex align-items-center m-2">
                          <Dropdown.Item className='card m-2'>Hôm nay</Dropdown.Item>
                          <Dropdown.Item className='card m-2'>Hôm qua</Dropdown.Item>
                        </div>
                        <div className="d-flex align-items-center m-2">
                          <Dropdown.Item className='card m-2'>Tuần trước</Dropdown.Item>
                          <Dropdown.Item className='card m-2'>Tuần này</Dropdown.Item>
                        </div>
                        <div className="d-flex align-items-center m-2">
                          <Dropdown.Item className='card m-2'>Tháng trước</Dropdown.Item>
                          <Dropdown.Item className='card m-2'>Tháng này</Dropdown.Item>
                        </div>
                        <div className="m-2 card">
                          <Button size="sm" onClick={toggleDateOptions}>
                            Tùy chọn
                          </Button>
                          {showDateOptions && (
                            <div className="d-flex align-items-center mt-2">
                              <input type="date" className="form-control form-control-sm me-2" />
                              <input type="date" className="form-control form-control-sm" />
                            </div>
                          )}
                        </div>
                        <div className="m-2 card">
                          <Button size="sm">Lọc</Button>
                        </div>
                      </DropdownButton>
                    </Col>
                    <Col xl="2" xs="3" >
                      <DropdownButton title="Trạng thái">
                        <div className="d-flex align-items-center m-2">
                          <Dropdown.Item className='card m-2'>Đặt hàng</Dropdown.Item>
                          <Dropdown.Item className='card m-2'>Đã hủy</Dropdown.Item>
                        </div>
                        <div className="d-flex align-items-center m-2">
                          <Dropdown.Item className='card m-2 text-center'>Hoàn thành</Dropdown.Item>
                        </div>
                        <div className="m-2 card">
                          <Button size="sm">Lọc</Button>
                        </div>
                      </DropdownButton>
                    </Col>
                  </Row>

                  <Table className="align-items-center table-flush" responsive>
                    <thead>
                      <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày tạo đơn</th>
                        <th>Tên khách hàng</th>
                        <th>Phương thức thanh toán</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <Link to={`/bill-details/${order.id}`} onClick={() => handleOrderClick(order)}>
                              {order.code}
                            </Link>
                          </td>
                          <td>{order.date_payment}</td>
                          <td>{order.ten_khach_hang}</td>
                          <td>{order.payment_methods == 0 ? 'Chuyển khoản' : 'Tiền mặt'}</td>
                          <td>{order.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                          <td>{order.total_money}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
        {/* <Switch>
          <Route path={`/bill-details/:id`}>
            <BillDetail />
          </Route>
        </Switch> */}
      </Container>
    </>
  );
};

export default Bills;
