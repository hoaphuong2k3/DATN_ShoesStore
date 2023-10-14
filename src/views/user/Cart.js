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
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Header from "components/Headers/ProductHeader";
import { CartContext } from "contexts/Cart.js";

const Cart = () => {
  const { fetchData } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);


  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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
                
                  <h1 className="text-dark mb-3 text-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/711/711897.png" width={"30px"} height={'35px'} className="mr-3"/>
                      Giỏ hàng
                  </h1>
                  <hr color="orange" width="300px" className="mb-5"/>
                  
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
                            {/* <th>
                              <Input type="checkbox" className="checkbox_input" />
                            </th> */}
                            <th colSpan="3" className="text-center">
                              Thông tin chi tiết sản phẩm
                            </th>
                            <th className="text-center">Đơn giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Tổng giá</th>
                            <th>Thao tác</th> {/* Thêm một thẻ th trống để giữa các cột */}
                          </tr>
                        </thead>
                        <tbody>
                          {(cartData || []).map((item, index) => (
                            <tr className="cart__row table__section" key={index}>

                              <td data-label="Checkbox" className="text-center">
                                <Input type="checkbox" className="checkbox_input" />
                                <style>
                                  {
                                    `
                              .checkbox_input {
                                transform: scale(1.4); 
                                margin-top: 10px;
                              }
                              
                              .tongGia{
                                color: red;
                              }
                              `
                                  }
                                </style>
                              </td>
                              <td data-label="Ảnh Sản phẩm">
                                <a href="/shoes/product" className="cart__image small col-md-3">
                                  <img
                                    src={item.anh}
                                    alt={item.name}
                                    width={'200px'}
                                    height={'200px'}
                                  />
                                </a>
                              </td>

                              <td data-label="Tên Sản phẩm" className="cart-product-title">
                                <div className="product-info">
                                  <a href="/shoes/product" className="product-name">{item.name}</a>
                                  <div className="product-details">
                                    <p className="product-size">Size: {item.size}</p>
                                    <p className="product-color">Màu: {item.color}</p>
                                  </div>
                                </div>
                                <style>
                                  {
                                    `
                                    .product-info {
                                      display: flex;
                                      align-items: center;
                                    }
                                    
                                    .product-name {
                                      font-size: 18px;

                                      margin-right: 15px;
                                    }
                                    
                                    .product-details {
                                      display: flex;
                                      flex-direction: column;
                                    }
                                    
                                    .product-size,
                                    .product-color {
                                      font-size: 14px;
                                      margin: 2px 0;
                                    }
                                    .input-group {
                                      display: flex;
                                      align-items: center;
                                    }
                                    
                                    .quantity-input {
                                      border: none;
                                      outline: none;
                                      width: 40px;
                                      height: 30px;
                                      padding: 0;
                                      text-align: center;
                                      font-size: 16px;
                                      background-color: white;
                                    }
                                    
                                    .input-group-button {
                                      border: none;
                                      background-color: #e9ecef;
                                      color: black;
                                      width: 30px;
                                      height: 30px;
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                      font-size: 15px;
                                    }   
                                    .fa {
                                      pointer-events: none;
                                    }
                              `
                                  }
                                </style>
                              </td>

                              <td data-label="Đơn giá" className="text-center cart-product-price">
                                <span className="h3">{formatter.format(item.price)}</span>
                              </td>
                              <td data-label="Số lượng" className="text-center cart-quantity">
                                <div className="input-group">
                                  <Button
                                    className="input-group-button"
                                    color="primary"
                                    onClick={() => handleQuantityChange(-1, item.id, item.quantity - 1)}
                                  >
                                    <i className="fa fa-minus" />
                                  </Button>
                                  <Input
                                    size={1}
                                    className="quantity-input"
                                    type="text"
                                    aria-valuenow={item.quantity}
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <Button
                                    className="input-group-button"
                                    color="primary"
                                    onClick={() => handleQuantityChange(1, item.id, item.quantity + 1)}
                                  >
                                    <i className="fa fa-plus" />
                                  </Button>
                                </div>
                              </td>
                              
                              <td data-label="Tổng giá" className="text-center cart-product-price">
                                <span className="h3 tongGia">{formatter.format(item.totalPrice)}</span>
                              </td>
                              <td data-label="Xóa" className="text-center">
                                <Button
                                  className="input-group-text"
                                  color="primary"
                                  onClick={() => handleRemoveItem(1, item.id)}
                                >
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
                            Mua Hàng
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