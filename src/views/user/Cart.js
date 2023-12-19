import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Input,
  Button,
  Form,
  ButtonDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "components/Headers/Header";
import { ImSad } from "react-icons/im";
// import { CartContext } from "contexts/Cart.js";
import "assets/css/cart.css";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const storedUserId = localStorage.getItem("userId");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:33321/api/cart/${storedUserId}?page=${page}&size=${size}`
      );
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
  }, [storedUserId, page, size]);

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
    if (quantity < 1) {
      toast.error("Vui lòng chọn số lượng tối thiểu là 1");
      return;
    }
    if (quantity > 15) {
      toast.error("Số lượng tối đa là 15");
      return;
    }
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
    } catch (error) { }
  };

  // select list product
  const handleCheckboxChange = (id) => {
    if (selectedId.includes(id)) {
      setSelectedId(selectedId.filter((x) => x !== id));
      setShowActions(selectedId.length - 1 > 0);
    } else {
      setSelectedId([...selectedId, id]);
      setShowActions(true);
    }

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        // Nếu đã chọn, loại bỏ khỏi danh sách
        const updatedItems = prevSelectedItems.filter((item) => item !== id);
        setSelectAll(true);
        return updatedItems;
      } else {
        // Nếu chưa chọn, thêm vào danh sách
        const updatedItems = [...prevSelectedItems, id];
        return updatedItems;
      }
    });
  };

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [selectedId, setSelectedId] = useState([]);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedId([]);
      setShowActions(false);
      setSelectedItems([]);
    } else {
      setSelectedId(cartData.map(x => x.id));
      setShowActions(true);

      // Nếu chưa chọn, chọn tất cả
      const allItemIds = cartData.map((item) => item.id);
      setSelectedItems(allItemIds);
    }
    setIsCheckedAll(!selectAll);
  };
  
  const handleDeleteButtonClick = async () => {
    if (selectedId.length > 0) {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm đã chọn không?")) {
        try {
          console.log(selectedId);
          await axios.delete(`http://localhost:33321/api/cart/delete/${storedUserId}`, {data: { id: selectedId }});
          setSelectedId([]);
          fetchData();
          toast.success("Xóa thành công ");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }

      }
    }
  };

  useEffect(() => {
    if (cartData) {
      const selectedIds = cartData.map((item) => item.id);
      const allItemsSelected =
        selectedIds.length > 0 && selectedIds.length === selectedItems.length;

      setSelectAll(allItemsSelected);
    }
  }, [cartData, selectedItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    selectedItems.forEach((id) => {
      const selectedItem = cartData.find((item) => item.id === id);
      if (selectedItem) {
        total += selectedItem.price * selectedItem.quantity;
      }
    });
    return total;
  };

  const [isCheckoutError, setIsCheckoutError] = useState(true);

  // checkout
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm trước khi thanh toán!");
      return;
    }
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

      if (!response.ok) {
        throw new Error(
          "Có lỗi xảy ra khi thực hiện thanh toán. Vui lòng thử lại sau."
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      // Chuyển hướng
      window.location.href = "/shoes/checkout";
      setIsCheckoutError(true);
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
      setIsCheckoutError(true);
    }
  };

  return (
    <>
      <Header cartItemCount={cartData ? cartData.length : 0} />
      <Container fluid>
        <div className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <div className="row">
                  <div className="col-12 text-center">
                    <h2 className="text-uppercase mb-2 mt-2 gioHang">
                      Giỏ hàng ({cartData ? cartData.length : 0})
                    </h2>
                    <hr color="orange" width="280px" className="mb-5" />
                  </div>
                  <div className="col-9 cart-col-1">
                    <div className="inner cart-tbody">
                      {cartData &&
                        Array.isArray(cartData) &&
                        cartData.length === 0 ? (
                        <div id="zero-product-container">
                          <h4>Bạn không có sản phẩm nào trong giỏ hàng!</h4>
                          <ImSad id="sad-icon" />
                        </div>
                      ) : (
                        <Table className="cart-table full table--responsive">
                          <tbody>
                            <div className="cart-item">
                              <div className="row">
                                <div className="col-3">
                                  <Input
                                    type="checkbox"
                                    className="checkbox_input_1"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                  />
                                  {/* ... */}
                                </div>
                                <div className="col-3">
                                  {showActions && (
                                    <Button
                                      color="danger"
                                      outline
                                      size="sm"
                                      onClick={handleDeleteButtonClick}
                                    >
                                      Xóa tất cả
                                    </Button>
                                  )}
                                </div>
                                {/* ... */}
                              </div>
                              {(cartData || []).map((item, index) => (
                                <div key={index} className="row">
                                  <div className="col-3 img">
                                    <Input
                                      type="checkbox"
                                      className="checkbox_input mt-6"
                                      checked={selectedItems.includes(item.id)}
                                      onChange={() =>
                                        handleCheckboxChange(item.id)
                                      }
                                    />
                                    <p className="">
                                      <Link
                                        to={`/ shoes / productdetail / ${item.id} `}
                                      >
                                        <img
                                          src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.image}`}
                                          alt={item.name}
                                          style={{
                                            float: "right",
                                            marginRight: "6px",
                                            marginTop: "20px",
                                            borderRadius: "20%",
                                          }
                                          }
                                          width={"60%"}
                                        // height={"90px"}
                                        />
                                      </Link >
                                    </p >
                                  </div >
                                  <div className="col-right col-9">
                                    <div className="box-product">
                                      <p className="name">
                                        <Link
                                          to={`/shoes/productdetail/${item.id}`}
                                        >
                                          {item.name} - {item.code}
                                        </Link>
                                        <div className="product-details text-muted d-flex mt-1">
                                          <p className="product-size small mr-1">
                                            Size: {item.size},
                                          </p>
                                          <p className="product-color small">
                                            Màu: {item.color}
                                          </p>
                                        </div>
                                      </p>
                                      <p
                                        className="action"
                                        style={{ fontSize: "15px" }}
                                      >
                                        <p
                                          onClick={() =>
                                            handleRemoveItem(
                                              storedUserId,
                                              item.id
                                            )
                                          }
                                          class="btn btn-link btn-item-delete remove-item-cart"
                                          data-id="88189738"
                                          title="Xóa"
                                        >
                                          Xóa
                                        </p>
                                      </p>
                                    </div>
                                    <div className="box-price mr-3">
                                      <p className="price">
                                        {formatter.format(item.price)}
                                      </p>
                                    </div>
                                    <div className="quantity-block quantity-input">
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
                                    </div>
                                    <div
                                      className="box-price ml-4"
                                      style={{ paddingLeft: "7px" }}
                                    >
                                      <p className="price">
                                        {formatter.format(item.totalPrice)}
                                      </p>
                                    </div>
                                  </div>
                                </div >
                              ))}
                            </div >
                          </tbody >
                        </Table >
                      )}
                    </div >
                  </div >
                  <div className="col-3 mt-4 cart-col-1">
                    <div className="each-row">
                      <div className="box-style fee mb-4">
                        <p className="list-info-price">
                          <span>Tạm tính: </span>
                          <strong className="totals_price price _text-right">
                            {formatter.format(calculateTotalPrice())}
                          </strong>
                        </p>
                      </div>

                      <div class="total2 clearfix mb-4">
                        <span class="text-label">Thành tiền: </span>
                        <div class="amount">
                          <p>
                            <strong class="totals_price">
                              {formatter.format(calculateTotalPrice())}
                            </strong>
                          </p>
                        </div>
                      </div>

                      <div>
                        <Button
                          name="checkout"
                          onClick={() => handleCheckout()}
                          className="evo-button mobile-viewmore"
                          style={{ width: "100%" }}
                        >
                          <strong>THANH TOÁN NGAY</strong>
                        </Button>

                        <a
                          href="/shoes/home"
                          title="Tiếp tục mua hàng"
                          className="evo-button mobile-viewmore mt-2"
                          style={{ width: "100%" }}
                        >
                          <strong>TIẾP TỤC MUA HÀNG</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div >
              </CardBody >
            </Card >
          </div >
        </div >
      </Container >
    </>
  );
};

export default Cart;
