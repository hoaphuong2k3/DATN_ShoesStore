import 'assets/scss/detailsp.scss';
import { Container, Row, Card, CardBody, Col, ButtonGroup, Button } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";
import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import { getAllShoesDetail } from "services/ShoesDetailService.js";
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from "contexts/Cart.js";
import { getAllColorId, getAllSizeId } from "services/ProductAttributeService";
import { findShoes } from "services/Product2Service";
import { toast } from 'react-toastify';
import { Rate } from 'antd';

const DetailProduct = () => {
  const storedUserId = localStorage.getItem("userId");
  const [productDetail, setProductDetail] = useState([]);
  const { id } = useParams();
  const [listSizeById, setListSizeById] = useState([]);
  const [listColorById, setListColorById] = useState([]);
  const [idColor, setIdColor] = useState("");
  const [idSize, setIdSize] = useState("");
  const navigate = useNavigate();
  const [shoesdetail, setshoesdetail] = useState({});
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    getDetail();
    getlistColorById();
    getlistSizeById();
  }, []);
  //Xử lý btn tắng giảm
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  //End Xử lý btn tắng giảm

  const [sl, setSL] = useState(false);
  useEffect(() => {
    const getAll = async () => {
      console.log("colorId:sizeId:", idColor, idSize)
      try {
        let res = await getAllShoesDetail(id, 0, 5, { colorId: idColor, sizeId: idSize });
        if (res && res.data && res.data.content) {
          setshoesdetail(res.data.content[0]);
          console.log(res.data.content)
          setSL(false);
        }
      } catch (error) {
        console.error(error);
        setshoesdetail({});
        setSL(true);
      }
    }
    getAll();
  }, [idColor, idSize]);
  const getlistColorById = async () => {
    let res = await getAllColorId(id);
    if (res && res.data) {
      setListColorById(res.data);
      setIdColor(res.data[0].id);
    }
  }
  const getlistSizeById = async () => {
    let res = await getAllSizeId(id);
    if (res && res.data) {
      setListSizeById(res.data);
      setIdSize(res.data[0].id);
    }
  }
  const getDetail = async () => {
    try {
      let res = await findShoes(id);
      if (res && res.data) {
        setProductDetail(res.data);
      }
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
        console.error(errorMessage);
      }
    }
  }

  // const addToCart = () => {
  //   const newItem = {
  //     id: productDetail.id,
  //     name: productDetail.ten,
  //     price: parseInt(productDetail.gia),
  //     quantity: 1
  //   };
  //   const existingItem = cartItems.find(item => item.id === newItem.id);

  //   if (existingItem) {
  //     const updatedCart = cartItems.map(item => {
  //       if (item.id === newItem.id) {
  //         return { ...item, quantity: item.quantity + 1 };
  //       }
  //       return item;
  //     });
  //     setCartItems(updatedCart);
  //   } else {
  //     setCartItems([...cartItems, newItem]);
  //   }
  //   // navigate('/cart');
  // };

  // console.log(cartItems);


  const handleAddCart = async () => {
    if (storedUserId) {
      try {
        const response = await fetch("http://localhost:33321/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "key": storedUserId,
            "id": shoesdetail.shoesDetailSearchResponse.id,
            "quantity": quantity
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
        // window.location.href = "/shoes/cart";
      } catch (error) {
        console.error("Lỗi trong quá trình thanh toán:", error);
      }
    } else {
      toast.success("Bạn cần đăng nhập để có thể tiếp tục !!!!")
      window.location.href = "/login";
    }
  }

  const handleCheckout = async () => {
    if (storedUserId) {
      try {
        const response = await fetch("http://localhost:33321/api/cart/byNow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "key": storedUserId,
            "id": shoesdetail.shoesDetailSearchResponse.id,
            "quantity": quantity
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
      } catch (error) {
        console.error("Lỗi trong quá trình thanh toán:", error);
      }
    } else {
      toast.success("Bạn cần đăng nhập để có thể tiếp tục !!!!")
      window.location.href = "/login";
    }
  }
  const [voucher, setVoucher] = useState([]);
  const fetchPromo = async () => {
    try {
      const res = await axiosInstance.get(`/vouchers/getAllIsActive?id=${storedUserId}`);
      setVoucher(res.data);
      console.log("Promo:", res.data);
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu khách hàng:', error);
    }
  };

  return (
    <>
      <Header />
      <Container fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <>
                  <div className='container khung mt-5'>
                    <div className='card-box'>
                      <div className='row'>
                        <div className='col-5'>
                          {
                            shoesdetail && shoesdetail.imageDTOS && shoesdetail.imageDTOS.length > 0
                              ?
                              <img alt="" src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${shoesdetail.imageDTOS[0].imgURI}`} height={450} width={450} />
                              :
                              <img alt="" src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${productDetail.imgURI}`} height={450} width={450} />
                          }

                          <p className='mt-3 text-center'>
                            {
                              shoesdetail && shoesdetail.imageDTOS && shoesdetail.imageDTOS.length > 0 && shoesdetail.imageDTOS.map(item => (
                                <img alt="" src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.imgURI}`} height={88} width={88} />
                              ))
                            }
                          </p>
                        </div>
                        <div className='col-7'>
                          <div className='tensp'>
                            {/* Tên sản phẩm */}
                            <span>{productDetail.name}, Hãng {productDetail.brandName}, Xuất xứ {productDetail.originName}</span>
                          </div>
                          <br />
                          {/* start Giá sản phảm */}
                          <div className='giasp'>
                            {
                              (shoesdetail.shoesDetailSearchResponse && shoesdetail.shoesDetailSearchResponse.discountPrice < shoesdetail.shoesDetailSearchResponse.price) ?
                                <>
                                  <div className='giachuagiam' >
                                    {/* Giá chuwq giảm */}
                                    {formatter.format(shoesdetail.shoesDetailSearchResponse.price)}
                                  </div>
                                  <div className='flex items-center'>
                                    {/* Giá  giảm */}
                                    <span className='giagiam'>{shoesdetail.shoesDetailSearchResponse.discountPrice === null ? "0 đ" : formatter.format(shoesdetail.shoesDetailSearchResponse.discountPrice)}</span>
                                    {
                                      shoesdetail.shoesDetailSearchResponse.type === 1 && <span className='sokhuyenmai'> Giảm {shoesdetail.shoesDetailSearchResponse.discountPrice === null ? 100 : (shoesdetail.shoesDetailSearchResponse.discountPrice / shoesdetail.shoesDetailSearchResponse.price) * 100}%</span>
                                    }
                                    {
                                      shoesdetail.shoesDetailSearchResponse.type === 2 && <span className='sokhuyenmai'> Giảm {shoesdetail.shoesDetailSearchResponse.discountPrice === null ? shoesdetail.shoesDetailSearchResponse.price : (shoesdetail.shoesDetailSearchResponse.price - shoesdetail.shoesDetailSearchResponse.discountPrice)}đ</span>
                                    }
                                    <span className='sokhuyenmai'> Giảm {shoesdetail.shoesDetailSearchResponse.discountPrice === null ? 100 : (shoesdetail.shoesDetailSearchResponse.discountPrice / shoesdetail.shoesDetailSearchResponse.price) * 100}%</span>
                                  </div>
                                </>
                                :
                                <>
                                  <div className='flex items-center'>
                                    {/* Giá  giảm */}
                                    <span className='giagiam'>{shoesdetail.shoesDetailSearchResponse && shoesdetail.shoesDetailSearchResponse.price > 0 ? formatter.format(shoesdetail.shoesDetailSearchResponse.price) : "0 đ"}</span>
                                  </div>
                                </>
                            }

                          </div>
                          {/* end Giá sản phảm */}
                          <br />

                          {/* Start thuộc tính */}

                          <Row>
                            <Col lg="6">
                              <div className='tong' >
                                <span className='tenthuoctinh'>Thương hiệu :  </span>
                                <span className='giatrithuoctinh'>{productDetail.brandName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Xuất xứ :  </span>
                                <span className='giatrithuoctinh'>{productDetail.originName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Thiết kế :   </span>
                                <span className='giatrithuoctinh'>{productDetail.designStyleName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Loại da : </span>
                                <span className='giatrithuoctinh'>{productDetail.skinTypeName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Mũi giày : </span>
                                <span className='giatrithuoctinh'>{productDetail.toeName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Đế giày : </span>
                                <span className='giatrithuoctinh'>{productDetail.soleName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Lót giày :  </span>
                                <span className='giatrithuoctinh'>{productDetail.liningName}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Đệm giày : </span>
                                <span className='giatrithuoctinh'>{productDetail.cushionName}</span>
                              </div>
                            </Col>
                          </Row>
                          {/* End thuộc tính */}

                          {/* start size */}
                          {/* ===================== */}
                          <div>
                            <div className=' row'><span className='tenthuoctinh col-2'>Size :  </span>
                              <span className='giatrithuoctinh col-9 ml-4'>
                                {listSizeById && listSizeById.length > 0 &&
                                  listSizeById.map((item, index) => {
                                    return (
                                      <button class="product-variation" aria-label="35" aria-disabled="false"
                                        style={{ backgroundColor: idSize === item.id ? '#cccccc' : '' }}
                                        onClick={() => setIdSize(item.id)}
                                      >
                                        {item.name}
                                      </button>
                                    )
                                  })}
                              </span>
                            </div>
                          </div>
                          {/* start size */}
                          {/* ===================== */}
                          <div>
                            <div className=' row'>
                              <span className='tenthuoctinh col-2'>Màu sắc :  </span>
                              <span className='giatrithuoctinh col-9 ml-4'>
                                {listColorById && listColorById.length > 0 &&
                                  listColorById.map((item, index) => {
                                    return (
                                      <button class="product-variation" aria-label="35" aria-disabled="false"
                                        style={{ backgroundColor: idColor === item.id ? '#cccccc' : '' }}
                                        onClick={() => setIdColor(item.id)}
                                      >
                                        {item.name}
                                      </button>
                                    )
                                  })}
                              </span>
                            </div>
                          </div>
                          {/* end size */}
                          {shoesdetail.shoesDetailSearchResponse &&
                            <div>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Số lượng :  </span>
                                <span className='giatrithuoctinh' >
                                  <button className='btntanggiam' onClick={handleDecrease}>-</button>
                                  <input
                                    className="soluong"
                                    type="text"
                                    role="spinbutton"
                                    aria-live="assertive"
                                    aria-valuenow={quantity}
                                    value={quantity}
                                    readOnly
                                  />
                                  <button className='btntanggiam' onClick={handleIncrease} disabled={quantity === shoesdetail.shoesDetailSearchResponse.quantity ? true : false}>+</button>
                                  &nbsp;&nbsp;
                                  {sl === false
                                    ? <span> {shoesdetail.shoesDetailSearchResponse.quantity} &nbsp;sản phẩm có sẵn</span>
                                    : <span style={{ color: "red" }}>Sản phẩm này đã hết hàng</span>
                                  }

                                </span>
                              </div>
                            </div>
                          }
                          <div className='text-center btnInDetailSP'>
                            <CartContext.Consumer>
                              {({ addToCart }) => (
                                <button className='btn btn-primary' onClick={() => handleAddCart()} disabled={sl === false ? false : true}>
                                  Thêm vào giỏ hàng
                                </button>
                              )}
                            </CartContext.Consumer>
                            <button className='btn btn-warning' onClick={() => handleCheckout()} disabled={sl === false ? false : true}>Mua ngay</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ===========================cart box */}
                    <div className='card-box'>
                      <div className='row'>
                        <div className='col-10'>
                          <div>
                            <h3 className='mt-3 mb-2'>
                              MÔ TẢ SẢN PHẨM
                            </h3>
                            <div>
                              <div class="f7AU53">
                                <p class="irIKAp">Chuck Taylor Run Star Motion Create Next Comfort với Thiết kế đôi phá mới,Phản ánh năng lượng của đường phố thành phố, các đường nét vui tươi và méo mó của Run Star Motion được xây dựng cho chuyển động trong tương lai.&nbsp;Được tái tạo từ trong ra ngoài, thế đứng nâng cao và đế giữa bằng bọt CX giúp mang lại cảm giác thoải mái cấp độ tiếp theo cho mỗi sải chân.&nbsp;Phần trên vẫn đúng với bản gốc, được đặt cạnh nhau bởi các chi tiết thiết kế tương lai để thể hiện bản thân một cách táo bạo.&nbsp;Một bệ phóng đại, gợn sóng và các vấu kéo điêu khắc nâng bạn lên và giữ cho bạn vững vàng với lực kéo vượt trội,</p>
                                <p class="irIKAp">+ Đế Xốp CX và đế giữa phylon nhẹ giúp hỗ trợ va đạp bảo vệ hiệu qua bàn chân suốt ngày dài</p>
                                <p class="irIKAp">+ Bàn chân trước và gót chân có vấu biểu cảm để tạo lực kéo vượt trội</p>
                                <p class="irIKAp">Chế độ bảo hành: Bảo hành chính hãng Converse 1 tháng&nbsp;(trừ hàng giảm giá từ 30% trở lên)</p>
                                <p class="irIKAp">. Phụ kiện đi kèm:&nbsp;</p>
                                <p class="irIKAp">&nbsp; + Giày</p>
                                <p class="irIKAp">&nbsp; + Túi Converse</p><p class="irIKAp">
                                  &nbsp; + Phiếu bảo hành chính hãng&nbsp;(trừ hàng giảm giá từ 30% trở lên)</p>
                              </div>
                            </div>

                          </div>

                          <div className='mt-5'>
                            <h3 className=' mb-2'>
                              ĐÁNH GIÁ SẢN PHẨM
                            </h3>

                            <Card body>
                              <Row className='col'>
                                <Col lg={4} className='text-center mt-3'>
                                  <Rate allowHalf defaultValue={4.5} style={{ color: '#ee4d2d', fontSize: '24px' }} />
                                </Col>
                                <Col lg={8}>

                                  <Row>
                                    <Col lg={12}>
                                      <ButtonGroup className='d-flex'>
                                        <Button className='flex-fill mr-2' color='warning' size='sm' outline style={{ borderRadius: 0 }}>
                                          Tất cả
                                        </Button>
                                        <Button className='flex-fill mr-2' color='warning' size='sm' outline>
                                          5 sao
                                        </Button>
                                        <Button className='flex-fill mr-2' color='warning' size='sm' outline>
                                          4 sao
                                        </Button>
                                        <Button className='flex-fill mr-2' color='warning' size='sm' outline>
                                          3 sao
                                        </Button>
                                        <Button className='flex-fill mr-2' color='warning' size='sm' outline>
                                          2 sao
                                        </Button>
                                        <Button className='flex-fill mr-2' color='warning' size='sm' outline style={{ borderRadius: 0 }}>
                                          1 sao
                                        </Button>
                                      </ButtonGroup>
                                    </Col>

                                    <Col lg={12} className='mt-2'>
                                      <ButtonGroup>

                                        <Button className='mr-2' color='warning' size='sm' outline style={{ borderRadius: 0 }}>
                                          Có bình luận
                                        </Button>
                                        <Button color='warning' outline size='sm' style={{ borderRadius: 0 }}>
                                          Có hình ảnh/video
                                        </Button>
                                      </ButtonGroup>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>




                            </Card>
                          </div>


                        </div>
                        <div className='col-2'>
                          <div>
                            <div>
                              Danh sách vouchers
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DetailProduct;