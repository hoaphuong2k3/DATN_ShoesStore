import React, { useContext, useState, useEffect } from "react";
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
import { CartContext } from "contexts/Cart.js";

const Cart = () => {
  const { fetchData } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:33321/api/cart/1');
        const data = await response.json();
        setCartData(data.content);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchData]);


  const handleRemoveItem = async (idAccount, idShoes) => {
    try {
      const response = await fetch(`http://localhost:33321/api/cart/delete/` + idAccount + `/` + idShoes, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCartData(prevCartData => prevCartData.filter(item => item.id !== idShoes));

      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa:', error);
    }
  };
  const handleQuantityChange = async (idAccount, idShoes, quantity) => {
    try {
      const response = await fetch(`http://localhost:33321/api/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: idAccount,
          id: idShoes,
          quantity: quantity,
        }),
      });
      console.log(response);
      if (response.ok) {
        setCartData(prevCartData => {
          // Tạo mảng mới với số lượng được cập nhật cho mục có idShoes
          return prevCartData.map(item => {
            if (item.id === idShoes) {
              return { ...item, quantity: quantity, totalPrice: item.price * quantity };
            }
            return item;
          });
        });
      }
    } catch (error) {

    }
  }

  return (
    <>
      <Header cartItemCount={cartData ? cartData.length : 0} />
      <Container fluid className="mt-3">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <div className="inner">
                  <h1>Giỏ hàng</h1>
                  {cartData && Array.isArray(cartData) && cartData.length === 0 ? (
                    <p>Giỏ hàng trống</p>
                  ) : (
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
                          {(cartData || []).map((item, index) => (
                            <tr
                              className="cart__row table__section"
                              key={index}
                            >
                              <td data-label="Sản phẩm">
                                <a href="/shoes/product" className="cart__image small col-md-3">
                                  <img src={item.anh} alt={item.name} width={'200px'} height={'200px'} />
                                </a>
                              </td>
                              <td
                                className="cart-product-title"
                                data-label="Sản phẩm"
                              >
                                <a href="/shoes/product" className="h4">
                                  {item.name}
                                </a>
                                <p>Size: {item.size}</p>
                                <p>Màu: {item.color}</p>
                              </td>
                              <td
                                className="cart-product-price"
                                data-label="Đơn giá"
                              >
                                <span className="h3">{item.price}</span>
                              </td>
                              <td
                                data-label="Số lượng"
                                className="cart-quantity"
                              >
                                <div className="input-group">
                                  <Button
                                    className="input-group-text"
                                    color="primary"
                                    onClick={() =>
                                      handleQuantityChange(1, item.id, item.quantity - 1)}
                                  >
                                    -
                                  </Button>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    value={item.quantity} />
                                  <Button
                                    className="input-group-text"
                                    color="primary"
                                    onClick={() =>
                                      handleQuantityChange(1, item.id, item.quantity + 1)}
                                  >
                                    +
                                  </Button>
                                </div>
                              </td>
                              <td
                                className="cart-product-price text-right"
                                data-label="Tổng giá"
                              >
                                <span className="h3">
                                  {item.totalPrice}
                                </span>
                              </td>
                              <td>
                                <Button className="input-group-text" color="primary" onClick={() => handleRemoveItem(1, item.id)}>
                                  Xóa
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="row">

                        <div className="text-right one-third small--one-whole col-md-12">
                          <Button
                            to="/shoes/checkout"
                            tag={Link}
                            type="submit"
                            name="checkout"
                            className="ml-auto btnCart"
                          >
                            Tiến hành đặt hàng
                          </Button>
                        </div>
                      </div>
                    </form>
                  )}
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