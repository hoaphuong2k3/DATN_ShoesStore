import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, Container, Row, Table } from 'reactstrap';

const BillDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      const response = await fetch('https://datnshoes-default-rtdb.firebaseio.com/orderdetail.json');
      const data = await response.json();
      const ordersArray = Object.values(data);
      setOrderDetail(ordersArray);
      console.log(ordersArray);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <>
      <Container className="mt-7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Chi tiết đơn hàng</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tên sản phẩm</th>
                      <th>Hãng</th>
                      <th>Size</th>
                      <th>Màu sắc</th>
                      <th>Loại giày</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.brands}</td>
                        <td>{item.sizes}</td>
                        <td>{item.colors}</td>
                        <td>{item.shoes_type}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total_money}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Link to="/admin/hoa-don">Quay lại danh sách đơn hàng</Link>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BillDetail;