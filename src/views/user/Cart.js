import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Table,
  Input,
  Button,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import Header from "components/Headers/ProductHeader";
// import { CartContext } from "contexts/Cart.js";
import "assets/css/cart.css";

const Cart = () => {
  // const { fetchData } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const storedUserId = localStorage.getItem("userId");

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:33321/api/cart/${storedUserId}`);
      const data = await response.json();
      setCartData(data.content);

      console.log(storedUserId);
      console.log(data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storedUserId]);

  const handleRemoveItem = async (idAccount, idShoes) => {
    try {
      const response = await fetch(
        `http://localhost:33321/api/cart/delete/` + idAccount + `/` + idShoes,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item.id !== idShoes)
        );
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa:", error);
    }
  };

  // update quantity
  const handleQuantityChange = async (idAccount, idShoes, quantity) => {
    try {
      const response = await fetch(`http://localhost:33321/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: idAccount,
          id: idShoes,
          quantity: quantity,
        }),
      });
      console.log(response);
      if (response.ok) {
        setCartData((prevCartData) => {
          // Tạo mảng mới với số lượng được cập nhật cho mục có idShoes
          return prevCartData.map((item) => {
            if (item.id === idShoes) {
              return {
                ...item,
                quantity: quantity,
                totalPrice: item.price * quantity,
              };
            }
            return item;
          });
        });
      }
    } catch (error) {}
  };

  // select list product
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        // Nếu đã chọn, loại bỏ khỏi danh sách
        const updatedItems = prevSelectedItems.filter((item) => item !== id);
        return updatedItems;
      } else {
        // Nếu chưa chọn, thêm vào danh sách
        const updatedItems = [...prevSelectedItems, id];
        console.log(id);
        return updatedItems;
      }
    });
  };

  // checkout
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:33321/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: storedUserId,
          listShoesCart: selectedItems,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
    }
  };

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
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/711/711897.png"
                      width={"30px"}
                      height={"35px"}
                      className="mr-3"
                    />
                    Giỏ hàng
                  </h1>
                  <hr color="orange" width="300px" className="mb-5" />

                  {cartData &&
                  Array.isArray(cartData) &&
                  cartData.length === 0 ? (
                    <p>
                      Bạn không có sản phẩm nào trong giỏ hàng của bạn.
                      <br />
                      Bấm vào <a href="/shoes/product">đây</a> để tiếp tục mua
                      sắm{" "}
                    </p>
                  ) : (
                    <Form
                      action=""
                      method=""
                      noValidate
                      className="cart table-wrap medium--hide small--hide"
                    >
                      <Table className="cart-table full table--responsive">
                        <thead className="cart__row cart__header-labels">
                          <tr>
                            <th colSpan="3" className="text-center">
                              Thông tin chi tiết sản phẩm
                            </th>
                            <th className="text-center">Đơn giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Tổng giá</th>
                            <th>Thao tác</th>{" "}
                            {/* Thêm một thẻ th trống để giữa các cột */}
                          </tr>
                        </thead>
                        <tbody>
                          {(cartData || []).map((item, index) => (
                            <tr
                              className="cart__row table__section"
                              key={index}
                            >
                              <td data-label="Checkbox" className="text-center">
                                <Input
                                  type="checkbox"
                                  className="checkbox_input"
                                  checked={selectedItems.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                />

                              </td>
                              <td data-label="Ảnh Sản phẩm">
                                <a
                                  href="/shoes/product"
                                  className="cart__image small col-md-3"
                                >
                                  <img
                                    src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.image}`}
                                    alt={item.name}
                                    width={"70px"}
                                    height={"70px"}
                                  />
                                </a>
                              </td>

                              <td
                                data-label="Tên Sản phẩm"
                                className="cart-product-title"
                              >
                                <div className="product-info">
                                  <a
                                    href="/shoes/product"
                                    className="product-name"
                                  >
                                    {item.name}
                                  </a>
                                  <div className="product-details">
                                    <p className="product-size">
                                      Size: {item.size}
                                    </p>
                                    <p className="product-color">
                                      Màu: {item.color}
                                    </p>
                                  </div>
                                </div>

                              </td>

                              <td
                                data-label="Đơn giá"
                                className="text-center cart-product-price"
                              >
                                <span className="h3">
                                  {formatter.format(item.price)}
                                </span>
                              </td>

                              <td
                                data-label="Số lượng"
                                className="text-center quantity-input"
                              >
                                <div className="input-group">
                                  <Button
                                    className="quantity-input__modifier quantity-input__modifier--left"
                                    onClick={() =>
                                      handleQuantityChange(
                                        storedUserId,
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    &mdash;
                                    {/* <i className="fa fa-minus" /> */}
                                  </Button>
                                  <Input
                                    size={1}
                                    className="quantity-input__screen"
                                    type="text"
                                    aria-valuenow={item.quantity}
                                    value={item.quantity}
                                    
                                  />
                                  <Button
                                    className="quantity-input__modifier quantity-input__modifier--right"
                                    onClick={() =>
                                      handleQuantityChange(
                                        storedUserId,
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    &#xff0b;
                                  </Button>
                                </div>
                              </td>

                              <td
                                data-label="Tổng giá"
                                className="text-center cart-product-price"
                              >
                                <span className="h3 tongGia">
                                  {formatter.format(item.totalPrice)}
                                </span>
                              </td>
                              <td data-label="Xóa" className="text-center">
                                <Button
                                  className="input-group-text"
                                  color="primary"
                                  onClick={() => handleRemoveItem(storedUserId, item.id)}
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
                            name="checkout"
                            type="submit"
                            className="ml-auto btnCart"
                            onClick={() => handleCheckout()}
                          >
                            Mua Hàng
                          </Button>
                        </div>
                      </div>
                    </Form>
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
