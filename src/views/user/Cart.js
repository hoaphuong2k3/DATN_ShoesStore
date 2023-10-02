import React, { useState } from "react";
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
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);


  // Các hàm xử lý sự kiện
  

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
    setCartItems(updatedItems);
  };
  const totalPrice = cartItems.reduce((total, item) => total + item.sl * item.gia, 0);
  return (
    <>
      <Header cartItemCount={cartItemCount} />
      <Container fluid className="mt-3">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <div className="inner">
                  <h1>Giỏ hàng</h1>
                  <form
                    action="/cart"
                    method="post"
                    noValidate
                    className="cart table-wrap medium--hide small--hide"
                  >
                    <Table className="cart-table full table--responsive">
                      <thead className="cart__row cart__header-labels">
                        <tr>
                          <th colSpan="2" className="text-center">
                            Thông tin chi tiết sản phẩm
                          </th>
                          <th className="text-center">Đơn giá</th>
                          <th className="text-center">Số lượng</th>
                          <th className="text-right">Tổng giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr className="cart__row table__section" key={index}>
                            <td data-label="Sản phẩm">
                              <a href="#" className="cart__image">
                                <img src={item.anh} alt={item.ten} />
                              </a>
                            </td>
                            <td className="cart-product-title" data-label="Sản phẩm">
                              <a href="#" className="h4">
                                {item.ten}
                              </a>
                              {/* <p>Phiên bản: {item.hang}</p> */}
                              <p>Thương hiệu: {item.hang}</p>
                              {/* <p>Khuyến mãi: {item.promotion}</p> */}
                              <a
                                href={`/cart/change?line=${index + 1}&quantity=0`}
                                className="cart__remove"
                              >
                                <small>Xóa</small>
                              </a>
                            </td>
                            <td className="cart-product-price" data-label="Đơn giá">
                              <span className="h3">{item.gia}</span>
                            </td>
                            <td data-label="Số lượng" className="cart-quantity">
                              <div className="input-group">
                                <Button
                                  className="input-group-text"
                                  color="primary"
                                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <Input
                                  type="number"
                                  className="form-control"
                                  value={item.quantity}
                                  min="1"
                                  data-id=""
                                  aria-label="quantity"
                                  pattern="[0-9]*"
                                  name="updates[]"
                                  id={`updates_${index}`}
                                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                />
                                <Button
                                  className="input-group-text"
                                  color="primary"
                                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </td>
                            <td className="cart-product-price text-right" data-label="Tổng giá">
                              <span className="h3">{item.sl * item.gia}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="text-dark small">Chú thích cho cửa hàng</label>
                        <textarea
                          name="note"
                          className="w-100 h-75 border border-light"
                        ></textarea>
                      </div>
                      <div className="text-right one-third small--one-whole col-md-6">
                        <p>
                          <span className="cart__subtotal-title">Tổng tiền</span>
                          <span className="h3 cart__subtotal">{totalPrice}</span>
                        </p>
                        <Button
                          to="/shoes/checkout"
                          tag={Link}
                          type="submit"
                          name="checkout"
                          className="btnCart"
                        >
                          Tiến hành đặt hàng
                        </Button>
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