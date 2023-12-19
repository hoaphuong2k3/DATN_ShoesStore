import 'assets/scss/detailsp.scss';
import { Container, Row, Card, CardBody, Col, ButtonGroup, Button } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";
import React, { useState, useEffect } from "react";
import axiosInstance from "services/custommize-axios";
import { getOneShoesDetailUsers, getOneShoesUser } from "services/ShoesDetailService.js";
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
    if (quantity === 30) {
      toast.error("Số lượng tối đa là 30");
    } else {
      setQuantity(quantity + 1);
    }
  };
  //End Xử lý btn tắng giảm

  const [sl, setSL] = useState(false);
  const [list, setList] = useState([]);
  const [averageVote, setAverageVote] = useState(null);
  useEffect(() => {
    const getAll = async () => {
      console.log("colorId:sizeId:", idColor, idSize)
      try {
        let res = await getOneShoesDetailUsers({ "shoesId": id, "sizeId": idSize, "colorId": idColor });
        if (res && res.data) {
          setshoesdetail(res.data);
          if (res.data.detailResponse.quantity > 0) {
            setSL(false);
          } else {
            setSL(true);
          }
          try {
            const response = await axiosInstance.get(`/users/comment/getAll/${res.data.detailResponse.id}`);
            console.log(response)
            if (response && response.data) {
              setList(response.data);
              if (Array.isArray(response.data)) {
                // Tính tổng các phần tử trong mảng vote
                const totalVotes = response.data.reduce((accumulator, item) => accumulator + item.vote, 0);

                // Tính giá trị trung bình với 1 chữ số sau thập phân
                const averageVote = totalVotes / response.data.length;
                const roundedAverageVote = averageVote.toFixed(1);

                setAverageVote(roundedAverageVote);
              } else {
                console.error('response.data is not an array:', response.data);
              }
            }
          } catch (error) {
            console.error("Error:", error);
            console.error("Response data:", error.response.data);
          }
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
      let res = await getOneShoesUser(id);
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
            "id": shoesdetail.detailResponse.id,
            "quantity": quantity
          }),
        });      
        const responseData = await response.json();
        console.log(responseData);
        // Chuyển hướng
        // window.location.href = "/shoes/cart";
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
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
            "id": shoesdetail.detailResponse.id,
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
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
  }
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === '' || !/^\d+$/.test(inputValue)) {
      setQuantity(1);
    } else {
      setQuantity(Math.min(inputValue, 15));
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
                            shoesdetail && shoesdetail.images && shoesdetail.images.length > 0
                              ?
                              <img alt="" src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${shoesdetail.images[0].imgURI}`} height={450} width={450} />
                              :
                              <img alt="" src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${productDetail.imgURI}`} height={450} width={450} />
                          }

                          <p className='mt-3 text-center'>
                            {
                              shoesdetail && shoesdetail.images && shoesdetail.images.length > 0 && shoesdetail.images.map(item => (
                                <img alt="" src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${item.imgURI}`} height={88} width={88} />
                              ))
                            }
                          </p>
                        </div>
                        <div className='col-7'>
                          <div className='tensp'>
                            {/* Tên sản phẩm */}
                            <span>{productDetail.name}, Hãng {productDetail.brand}, Xuất xứ {productDetail.origin}</span>
                          </div>
                          <br />
                          {/* start Giá sản phảm */}
                          <div className='giasp'>
                            {
                              (shoesdetail.detailResponse && shoesdetail.detailResponse.discountPrice < shoesdetail.detailResponse.price) ?
                                <>
                                  <div className='giachuagiam' >
                                    {/* Giá chuwq giảm */}
                                    {formatter.format(shoesdetail.detailResponse.price)}
                                  </div>
                                  <div className='flex items-center'>
                                    {/* Giá  giảm */}
                                    <span className='giagiam'>{shoesdetail.detailResponse.discountPrice === null ? "0 đ" : formatter.format(shoesdetail.detailResponse.discountPrice)}</span>
                                    {
                                      shoesdetail.detailResponse.type === 1 && <span className='sokhuyenmai'> Giảm {shoesdetail.detailResponse.discountPrice === null ? 100 : (shoesdetail.detailResponse.discountPrice / shoesdetail.detailResponse.price) * 100}%</span>
                                    }
                                    {
                                      shoesdetail.detailResponse.type === 2 && <span className='sokhuyenmai'> Giảm {shoesdetail.detailResponse.discountPrice === null ? shoesdetail.detailResponse.price : (shoesdetail.detailResponse.price - shoesdetail.detailResponse.discountPrice)}đ</span>
                                    }
                                    <span className='sokhuyenmai'> Giảm {shoesdetail.detailResponse.discountPrice === null ? 100 : (shoesdetail.detailResponse.discountPrice / shoesdetail.detailResponse.price) * 100}%</span>
                                  </div>
                                </>
                                :
                                <>
                                  <div className='flex items-center'>
                                    {/* Giá  giảm */}
                                    <span className='giagiam'>{shoesdetail.detailResponse && shoesdetail.detailResponse.price > 0 ? formatter.format(shoesdetail.detailResponse.price) : "0 đ"}</span>
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
                                <span className='giatrithuoctinh'>{productDetail.brand}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Xuất xứ :  </span>
                                <span className='giatrithuoctinh'>{productDetail.origin}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Thiết kế :   </span>
                                <span className='giatrithuoctinh'>{productDetail.designStyle}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Loại da : </span>
                                <span className='giatrithuoctinh'>{productDetail.skinType}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Mũi giày : </span>
                                <span className='giatrithuoctinh'>{productDetail.toe}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Đế giày : </span>
                                <span className='giatrithuoctinh'>{productDetail.sole}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Lót giày :  </span>
                                <span className='giatrithuoctinh'>{productDetail.lining}</span>
                              </div>
                            </Col>
                            <Col lg='6'>
                              <div className='tong'>
                                <span className='tenthuoctinh'>Đệm giày : </span>
                                <span className='giatrithuoctinh'>{productDetail.cushion}</span>
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

                          <div>
                            <div className='tong'>
                              <span className='tenthuoctinh'>Số lượng :  </span>
                              {shoesdetail.detailResponse && sl === false &&
                                <span className='giatrithuoctinh' >
                                  <button className='btntanggiam' onClick={handleDecrease}>-</button>
                                  <input
                                    className="soluong"
                                    type="number"
                                    role="spinbutton"
                                    aria-live="assertive"
                                    aria-valuenow={quantity}
                                    value={quantity}
                                    min={1}
                                    max={15}
                                    onChange={handleInputChange}
                                  />
                                  <button className='btntanggiam' onClick={handleIncrease} disabled={quantity === shoesdetail.detailResponse.quantity ? true : false}>+</button>
                                  &nbsp;&nbsp;
                                  {sl === false &&
                                    <span> {shoesdetail.detailResponse.quantity} &nbsp;sản phẩm có sẵn</span>
                                  }
                                </span>
                              }
                              {sl === true && <span style={{ color: "red" }}> &nbsp; &nbsp; Sản phẩm này đã hết hàng</span>}
                            </div>
                          </div>

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
                        <div className='col-12'>
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
                          {list && list.length > 0 &&
                            <Row>
                              <div className='mt-5'>
                                <h3 className=' mb-2'>
                                  ĐÁNH GIÁ SẢN PHẨM
                                </h3>

                                <Card body>
                                  <Row className='col'>
                                    <Col lg={4} className='text-center'>
                                      <Row className='text-center ml-6'>
                                        <h2 style={{ color: '#ee4d2d' }}>{averageVote} trên 5 </h2>
                                      </Row>
                                      <Rate allowHalf defaultValue={averageVote} style={{ color: '#ee4d2d', fontSize: '24px' }} />
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
                                  {
                                    list.map((item, index) => {
                                      return (
                                        <>
                                          <Row className="mt-3">
                                            <Col lg="1">
                                              <Row>
                                                {item.avatar === null ?
                                                  <img src="https://thumbs.dreamstime.com/b/default-businessman-avatar-icon-vector-business-people-profile-concept-279597784.jpg" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
                                                  :
                                                  <img src="https://thumbs.dreamstime.com/b/default-businessman-avatar-icon-vector-business-people-profile-concept-279597784.jpg" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
                                                }
                                              </Row>
                                            </Col>
                                            <Col lg="10">
                                              <Row className="m-3" style={{ color: 'black', fontSize: '14px' }}>
                                                {item.userName}
                                              </Row>
                                              <Row className="m-3 mt--2">
                                                <Rate
                                                  value={item.vote}
                                                  style={{ color: '#ee4d2d', fontSize: '14px' }}
                                                />
                                              </Row>
                                              <Row style={{ color: 'gray', fontSize: '14px' }} className="m-3 mt--2">
                                                {formatDate(item.createdDate)}
                                              </Row>
                                              <Row style={{ color: 'black' }} className="m-3">
                                                {item.comment}
                                              </Row>
                                            </Col>
                                          </Row>
                                          {(index + 1) < list.length && <hr />}
                                        </>
                                      )
                                    })
                                  }
                                </Card>
                              </div>
                            </Row>
                          }
                        </div>
                        {/* <div className='col-3'>
                          <div>
                            <div className='text-muted'>
                              Top sản phẩm nổi bật
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container >
    </>
  );
};

export default DetailProduct;