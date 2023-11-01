import 'assets/scss/detailsp.scss';
import { Container, Row, Card, CardBody} from "reactstrap";
import Header from "components/Headers/ProductHeader.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { CartContext } from "contexts/Cart.js";

const DetailProduct = () => {
  const [productDetail, setProductDetail] = useState([]);
  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const res = await axios.get(`https://63c1265d376b9b2e64743c4f.mockapi.io/shoesdetails/${id}`);
      console.log(res.data);
      if (res && res.data) {
        setProductDetail(res.data);
      }
    } catch (error) {
      console.error(error);
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
                  <div className='container khung'>
                    <div className='card-box'>
                      <div className='row'>
                        <div className='col-5'>
                          <img alt="" src={productDetail.anh} height={450} width={450} />

                          <p>
                            <img alt="" src="https://down-vn.img.susercontent.com/file/sg-11134201-22110-49wxoj5hr7jva4" height={88} width={88} />
                            <img alt="" src="https://down-vn.img.susercontent.com/file/sg-11134201-22110-49wxoj5hr7jva4" height={88} width={88} />
                            <img alt="" src="https://down-vn.img.susercontent.com/file/sg-11134201-22110-49wxoj5hr7jva4" height={88} width={88} />
                            <img alt="" src="https://down-vn.img.susercontent.com/file/sg-11134201-22110-49wxoj5hr7jva4" height={88} width={88} />
                            <img alt="" src="https://down-vn.img.susercontent.com/file/sg-11134201-22110-49wxoj5hr7jva4" height={88} width={88} />

                          </p>
                        </div>
                        <div className='col-7'>
                          <div className='tensp'>
                            {/* Tên sản phẩm */}
                            <span>{productDetail.ten}</span>
                          </div>
                          <br />
                          {/* start Giá sản phảm */}
                          <div className='giasp'>

                            <div className='giachuagiam' >
                              {/* Giá chuwq giảm */}
                              2.600.000 đ
                            </div>
                            <div className='flex items-center'>
                              {/* Giá  giảm */}
                              <span className='giagiam'>2.392.000 đ</span>
                              <span className='sokhuyenmai'> Giảm 8%</span>
                            </div>


                          </div>
                          {/* end Giá sản phảm */}
                          <br />

                          {/* Start thuộc tính */}
                          <div >
                            <div className='tong' >
                              <span className='tenthuoctinh'>Thương hiệu </span>
                              <span className='giatrithuoctinh'>{productDetail.hang}</span>
                            </div>
                            <div className='tong'>
                              <span className='tenthuoctinh'>Loại SP </span>
                              <span className='giatrithuoctinh'>{productDetail.loaisp}</span>
                            </div>
                            <div className='tong'>
                              <span className='tenthuoctinh'>Chất liệu </span>
                              <span className='giatrithuoctinh'>{productDetail.chatLieu}</span>
                            </div>
                            <div className='tong'>
                              <span className='tenthuoctinh'>Màu Sắc </span>
                              <span className='giatrithuoctinh'>{productDetail.mau}</span>
                            </div>
                          </div>
                          {/* End thuộc tính */}

                          {/* Start mã giảm giá */}
                          {/* ======================= */}
                          <div>
                            <div className='tong' >
                              <span className='tenthuoctinh'>Mã giảm giá </span>
                              <span className='giatrithuoctinh'>
                                <span className='voucher'> Giảm 10%</span>
                                <span className='voucher'> Giảm 20%</span>
                                <spam> Xem tất cả</spam>
                              </span>
                            </div>
                          </div>
                          {/* end mã giảm giá */}

                          {/* start size */}
                          {/* ===================== */}
                          <div className='tong row'><span className='tenthuoctinh col-2 ml--3'>Size </span>
                            <span className='giatrithuoctinh col-9 ml-3'><button class="product-variation" aria-label="35" aria-disabled="false">35
                            </button><button class="product-variation" aria-label="35" aria-disabled="false">36</button><button class="product-variation" aria-label="35" aria-disabled="false">37</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">38</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">39</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">40</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">41</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">42</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">43</button>
                              <button class="product-variation" aria-label="35" aria-disabled="false">42.5</button></span></div> */

                          {/* end size */}

                          <div>
                            <div className='tong'>
                              <span className='tenthuoctinh'>Số lượng </span>
                              <span className='giatrithuoctinh'>
                                <button className='btntanggiam'>-</button>
                                <input class="soluong " type="text" role="spinbutton" aria-live="assertive" aria-valuenow="1" value="1"></input>
                                <button className='btntanggiam'>+</button>
                                <span> {productDetail.soluong} sản phẩm có sẵn</span>
                              </span>
                            </div>
                          </div>
                          <div className='text-center btnInDetailSP'>
                            {/* <button onClick={addToCart} className='btn btn-primary'>Thêm vào giỏ hàng</button> */}
                            <CartContext.Consumer>
                              {({ addToCart }) => (
                                <button className='btn btn-primary' onClick={() => addToCart(productDetail)}>
                                  Thêm vào giỏ hàng
                                </button>
                              )}
                            </CartContext.Consumer>
                            <button className='btn btn-warning'>Mua ngay</button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* ===========================cart box */}
                    <div className='card-box'>
                      <div className='row'>
                        <div className='col-10'>
                          <div>
                            <div>
                              MÔ TẢ SẢN PHẨM
                            </div>
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
                    <div>
                      <div>
                        CÁC SẢN PHẨM LIÊN QUAN
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