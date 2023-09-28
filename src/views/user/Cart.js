import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Table,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import Header from "components/Headers/ProductHeader";

const Cart = () => {
  return (
    <>
      <Header />
      <Container fluid className="mt-3">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <div className="inner">
                  <h1>Giỏ hàng</h1>
                  <form action="/cart" method="post" noValidate className="cart table-wrap medium--hide small--hide">
                    <Table className="cart-table full table--responsive">
                      <thead className="cart__row cart__header-labels">
                        <tr>
                          <th colSpan="2" className="text-center">Thông tin chi tiết sản phẩm</th>
                          <th className="text-center">Đơn giá</th>
                          <th className="text-center">Số lượng</th>
                          <th className="text-right">Tổng giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="cart__row table__section">
                          <td data-label="Sản phẩm">
                            <a href="#" className="cart__image">
                              <img src="https://laforce.vn/wp-content/uploads/2022/12/giay-tay-nam-GNLAAZ01-1-D-108x136.jpg" alt="Giày da nam kiểu dáng Oxford GNLAAZ01-1-D" />
                            </a>
                          </td>
                          <td className="cart-product-title" data-label="Sản phẩm">
                            <a href="#" className="h4">
                            Giày da nam kiểu dáng Oxford GNLAAZ01-1-D
                            </a>
                            <p>Phiên bản: Đen / 38</p>
                            <p>Thương hiệu: Khác</p>
                            <p>Khuyến mãi: 1042052951 - 1499</p>
                            <a href="/cart/change?line=1&amp;quantity=0" className="cart__remove">
                              <small>Xóa</small>
                            </a>
                          </td>
                          <td className="cart-product-price" data-label="Đơn giá">
                            <span className="h3">1,800,000₫</span>
                          </td>
                          <td data-label="Số lượng" className="cart-quantity">
                            <div className="input-group">
                              <Button
                                className="input-group-text"
                                color="primary"
                                onClick={() => {}}
                              >
                                -
                              </Button>
                              <Input
                                type="number"
                                className="form-control"
                                value="2"
                                min="1"
                                data-id=""
                                aria-label="quantity"
                                pattern="[0-9]*"
                                name="updates[]"
                                id="updates_"
                              />
                              <Button
                                className="input-group-text"
                                color="primary"
                                onClick={() => {}}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="cart-product-price text-right" data-label="Tổng giá">
                            <span className="h3">3,600,000₫</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="text-dark small">Chú thích cho cửa hàng</label>
                        <textarea name="note" className="w-100 h-75 border border-light"></textarea>
                      </div>
                      <div className="text-right one-third small--one-whole col-md-6">
                        <p>
                          <span className="cart__subtotal-title">Tổng tiền</span>
                          <span className="h3 cart__subtotal">3,600,000₫</span>
                        </p>
                        <Button to="/shoes/checkout" tag={Link} type="submit" name="checkout" className="btnCart">Tiến hành đặt hàng</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Cart;