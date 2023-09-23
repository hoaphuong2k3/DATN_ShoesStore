import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Form, Col, Input, Table } from "reactstrap";
import {  InputGroupAddon, Button } from 'reactstrap';

// core components
import Header from "components/Headers/BillHeader.js";



const Bills = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    // fetch("https://datnshoes-default-rtdb.firebaseio.com/order.json")
    // .then((response) => response.json())
    // .then((data) => {
    //   const ordersArray = Object.values(data);
    //   setorders(ordersArray);
    //   console.log(ordersArray);
    // })
    // .catch((err) => console.error(err));
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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Hóa đơn</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* <h6 className="heading-small text-muted mb-4">
                    Danh sách hóa đơn
                  </h6> */}

                  <Col className='col-md-6'>
                    <Input
                      type="text"
                      placeholder="Nhập từ khóa tìm kiếm..."
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" type="submit">Tìm kiếm</Button>
                    </InputGroupAddon>
                  </Col>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID Hóa đơn</th>
                        <th>Ngày thanh toán</th>
                        <th>Tên khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Phương thức thanh toán</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.code}</td>
                          <td>{order.date_payment}</td>
                          <td>{order.ten_khach_hang}</td>
                          <td>{order.total_money}</td>
                          <td>{order.payment_methods == 0 ? 'Chuyển khoản' : 'Tiền mặt'}</td>
                          <td>{order.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Bills;
