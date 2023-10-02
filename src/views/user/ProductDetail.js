import 'assets/scss/detailsp.scss';
import { Container, Row, Card, CardBody } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const DetailProduct = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [cartItems, setCartItems] = useState([]);
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

  const addToCart = () => {
    const newItem = {
      id: productDetail.id,
      name: productDetail.ten,
      price: parseInt(productDetail.gia),
      quantity: 1 
    };
    const existingItem = cartItems.find(item => item.id === newItem.id);
  
    if (existingItem) {
      const updatedCart = cartItems.map(item => {
        if (item.id === newItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, newItem]);
    }
    // navigate('/cart');
  };

  console.log(cartItems);





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
                          {/* end mã giảm giá */}

                          {/* start size */}
                            {/* ===================== */}
                          
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
                          <button onClick={addToCart} className='btn btn-primary'>Thêm vào giỏ hàng</button>
                            <button className='btn btn-warning'>Mua ngay</button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* ===========================cart box */}
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