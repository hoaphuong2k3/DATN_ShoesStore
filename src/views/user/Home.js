import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Container, Row, Col, Card } from "reactstrap";
import Header from "components/Headers/UserHeader";
import "assets/css/home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import anh1 from "assets/img/theme/anh1.jpg";
import anh2 from "assets/img/theme/anh2.jpg";
import anh3 from "assets/img/theme/anh3.jpg";
import anh4 from "assets/img/theme/anh4.jpg";
import oxford from "assets/img/theme/oxford.jpg";
import slideshow1 from "assets/img/theme/bannerShoes.jpg";
import giay from "assets/img/theme/gia-da-nam-ca-tinh.jpg";
import giay1 from "assets/img/theme/giay-da-nam-hai-phong-2-1.jpg";
import slideshow2 from "assets/img/theme/slideshow3.jpg";

import { getAllShoesUser } from "services/Product2Service";

const Home = () => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const settings = {
    dots: true, // Hiển thị các chấm chỉ số
    infinite: true, // Lặp lại slideshow
    speed: 500, // Tốc độ chuyển đổi slide (ms)
    slidesToShow: 1, // Số lượng slide hiển thị trên mỗi lần trượt
    slidesToScroll: 1, // Số lượng slide được trượt khi di chuyển
    autoplay: true, // Tự động trượt
    autoplaySpeed: 2000, // Tốc độ trượt (ms)
  };
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [search, setSearch] = useState({
    name: "",
    brandId: null,
    originId: null,
    designStyleId: null,
    skinTypeId: null,
    soleId: null,
    liningId: null,
    toeId: null,
    cushionId: null,
    fromPrice: null,
    toPrice: null,
  });

  useEffect(() => {
    getListShoes(page, size);
  }, [search]);

  useEffect(() => {
    getListShoes(page, size, search);
  }, [page, size, search]);

  const getListShoes = async (page, size) => {
    try {
      let res = await getAllShoesUser(page, size, search);
      if (res && res.data && res.data.content) {
        setProducts(res.data.content);
        console.log(res.data);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      // toast.error(errorMessage);
      setProducts([]);
    }
  };

  const images = [
    "https://bizweb.dktcdn.net/100/292/624/themes/758446/assets/index-evo-icon-5.jpg?1700140225697",
    "https://bizweb.dktcdn.net/100/292/624/themes/758446/assets/index-evo-icon-3.jpg?1700140225697",
    "https://bizweb.dktcdn.net/100/292/624/themes/758446/assets/index-evo-icon-4.jpg?1700140225697",
    "https://bizweb.dktcdn.net/100/292/624/themes/758446/assets/index-evo-icon-2.jpg?1700140225697",
  ];

  return (
    <>
      <Header />
      <Card>
        <Row>
          <div className="col-5 image-container">
            <Card className="">
              <a href="/shoes/product" className="image-with-text ">
                <img
                  src={oxford}
                  alt="Oxford"
                  title="Giày da nam Oxford"
                  className="image"
                />
                <span className="overlay-text">Giày da nam Oxford</span>
                <span className="overlay-text1">Sang Trọng - Lịch Lãm</span>
              </a>
            </Card>
          </div>
          <div className="col-7">
            <Card>
              <a href="/shoes/product" className="">
                <Slider {...settings}>
                  <div className="">
                    <img
                      src={slideshow1}
                      alt="Giay da"
                      title="Giay da nam"
                      width={"100%"}
                      className="slideshow-image"
                    />
                  </div>
                  <div className="">
                    <img
                      src={slideshow2}
                      alt="Giay da"
                      title="Giay da nam"
                      width={"140%"}
                      className="slideshow-image"
                    />
                  </div>
                </Slider>

                <div className="d-flex">
                  <img
                    src={giay}
                    alt="Giay da"
                    title="Giay da nam ca tinh"
                    width={"49%"}
                    style={{ marginRight: "8px" }}
                  />

                  <img
                    src={giay1}
                    alt="Giay da"
                    title="Giay da nam hp"
                    width={"49%"}
                  />
                </div>
              </a>
            </Card>
          </div>
        </Row>

        <Container fluid>
          <Row>
            <Container>
              <div className="Arrivals">
                <Col md={12}>
                  <div className="section_product section_product_best_sell">
                    <div className="section-head clearfix text-center">
                      <h2 className="title_blog m-4">
                        <a href="san-pham-noi-bat" title="NEW ARRIVALS">
                          <strong>NEW ARRIVALS</strong>
                        </a>
                      </h2>
                      <div className="viewallcat hidden-xs"></div>
                    </div>
                    <div className="product-blocks clearfix row">
                      {Array.isArray(products) ? (
                        products.map((product) => (
                          <div className="col-3">
                            <Card
                              className="product-card"
                              style={{ height: "369px" }}
                            >
                              <span className="sale-box">- 22% </span>
                              <div
                                key={product.id}
                                className="product-card__inner "
                              >
                                <Link to={`/shoes/productdetail/${product.id}`}>
                                  <div className="product-card__image zoom">
                                    <img
                                      src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.imgURI}`}
                                      alt=""
                                      className="product-card-image-front img-responsive center-block mt-2 "
                                    />
                                  </div>
                                </Link>
                                <div className="mt-4 p-3 text-center ">
                                  <h4 className="product-single__series text-uppercase">
                                    {product.cushion}
                                  </h4>
                                  <Link
                                    to={`/shoes/productdetail/${product.id}`}
                                  >
                                    <h3 className="product-card__title">
                                      {/* SAVILLE CAPTOE OXFORD - OF32 */}
                                      {`${product.name} ${product.cushion} ${product.designStyle} ${product.brand}`}
                                    </h3>
                                  </Link>
                                  <div className="product-price d-inline">
                                    {product.discountPriceMin ===
                                      product.priceMin &&
                                    product.discountPriceMax ===
                                      product.priceMax ? (
                                      <div className="discount-price">
                                        <strong className="text-danger">
                                          {formatter.format(
                                            product.discountPriceMin
                                          )}{" "}
                                          -{" "}
                                          {formatter.format(
                                            product.discountPriceMax
                                          )}
                                        </strong>
                                      </div>
                                    ) : (
                                      <div className="discount-and-original-price">
                                        <div className="discount-price">
                                          <strong className="text-danger">
                                            {formatter.format(
                                              product.discountPriceMin
                                            )}{" "}
                                            -{" "}
                                            {formatter.format(
                                              product.discountPriceMax
                                            )}
                                          </strong>
                                        </div>
                                        <div className="original-price">
                                          <span>
                                            {formatter.format(product.priceMin)}
                                          </span>{" "}
                                          -{" "}
                                          <span>
                                            {formatter.format(product.priceMax)}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <p>Không có dữ liệu.</p>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <a
                    href="/shoes/product"
                    title="Xem tất cả NEW ARRIVALS"
                    className="evo-button mobile-viewmore mt-6 "
                  >
                    Xem tất cả . <strong>NEW ARRIVALS</strong>
                  </a>
                </Col>
              </div>

              <div className="LeatherGent">
                <Col md={12}>
                  <div className="section_product section_product_best_sell">
                    <div className="section-head clearfix text-center">
                      <h2 className="title_blog m-4 mt-5 mb-3">
                        <a href="san-pham-noi-bat" title="NEW ARRIVALS">
                          <strong className="text-uppercase">
                            Leather Gent
                          </strong>
                        </a>
                      </h2>
                      <div className="viewallcat hidden-xs"></div>
                    </div>
                    <div className="product-blocks clearfix row">
                      {/* 1 */}
                      <div className="col-3">
                        <div className="product-card ">
                          <a href="/shoes/product">
                            <div className="product-card__image ">
                              <img
                                src={anh1}
                                alt=""
                                className="product-card-image-front img-responsive center-block zoom"
                                style={{ width: "350px", height: "170px" }}
                              />
                            </div>
                            <div className="text-center">
                              <h4
                                className="product-single__series text-dark mt-3 mb-4"
                                style={{ letterSpacing: "2.5px" }}
                              >
                                SẢN XUẤT TẠI VIỆT NAM
                              </h4>
                              <div
                                className="text-gray"
                                style={{
                                  letterSpacing: "2.2px",
                                  fontSize: "12px",
                                }}
                              >
                                <span>
                                  Từ những nghệ nhân đóng giày dày dạn kinh
                                  nghiệm với mong muốn mang đến cho Quý Ông đôi
                                  giày mang Thương Hiệu Việt chất lượng tốt
                                  nhất.
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      {/* 2 */}
                      <div className="col-3">
                        <div className="product-card ">
                          <a href="/shoes/product">
                            <div className="product-card__image ">
                              <img
                                src={anh2}
                                alt=""
                                className="product-card-image-front img-responsive center-block zoom"
                                style={{ width: "350px", height: "170px" }}
                              />
                            </div>
                            <div className="text-center">
                              <h4
                                className="product-single__series text-dark mt-3 mb-4"
                                style={{ letterSpacing: "2.5px" }}
                              >
                                VẬT TƯ NHẬP KHẨU
                              </h4>
                              <div
                                className="text-gray"
                                style={{
                                  letterSpacing: "2.2px",
                                  fontSize: "12px",
                                }}
                              >
                                <span>
                                  Giày được làm từ những mảng da bò Ý, chọn lọc
                                  kỹ càng để đảm bảo thành phẩm là một đôi giày
                                  chất lượng và lên màu giày chuẩn nhất.
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      {/* 3 */}
                      <div className="col-3">
                        <div className="product-card ">
                          <a href="/shoes/product">
                            <div className="product-card__image ">
                              <img
                                src={anh3}
                                alt=""
                                className="product-card-image-front img-responsive center-block zoom"
                                style={{ width: "350px", height: "170px" }}
                              />
                            </div>
                            <div className="text-center">
                              <h4
                                className="product-single__series text-dark mt-3 mb-2"
                                style={{ letterSpacing: "2.5px" }}
                              >
                                LAST GIÀY DÀNH RIÊNG CHO QUÝ ÔNG VIỆT
                              </h4>
                              <div
                                className="text-gray"
                                style={{
                                  letterSpacing: "2.2px",
                                  fontSize: "12px",
                                }}
                              >
                                <span>
                                  Với châm ngôn “Giày Tây dành cho Ta” - Leather
                                  Gent thiết kế Phom (Last) giày phù hợp với
                                  phom chân chuẩn của Quý Ông Việt..
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      {/* 4 */}
                      <div className="col-3">
                        <div className="product-card ">
                          <a href="/shoes/product">
                            <div className="product-card__image ">
                              <img
                                src={anh4}
                                alt=""
                                className="product-card-image-front img-responsive center-block zoom"
                                style={{ width: "350px", height: "170px" }}
                              />
                            </div>
                            <div className="text-center">
                              <h4
                                className="product-single__series text-dark mt-3 mb-4"
                                style={{ letterSpacing: "2.5px" }}
                              >
                                BẢO HÀNH 3 NĂM
                              </h4>
                              <div
                                className="text-gray"
                                style={{
                                  letterSpacing: "2.2px",
                                  fontSize: "12px",
                                }}
                              >
                                <span>
                                  Chính sách Bảo Hành - Bảo Dưỡng miễn phí trong
                                  3 Năm, nhằm hỗ trợ quý khách hàng tốt nhất
                                  trong quá trình sử dụng giày.
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>

              <div className="Espadrilles">
                <Col md={12}>
                  <div className="section_product section_product_best_sell">
                    <div className="section-head clearfix text-center mt-5">
                      <h2 className="title_blog m-4 mt-5">
                        <a href="/shoes/product" title="Espadrilles">
                          <strong>ESPADRILLES</strong>
                        </a>
                      </h2>
                      <div className="viewallcat hidden-xs"></div>
                    </div>
                    <div className="product-blocks clearfix row">
                      {Array.isArray(products) ? (
                        products.map((product) => (
                          <div className="col-3">
                            <Card
                              className="product-card"
                              style={{ height: "369px" }}
                            >
                              <span className="sale-box">- 22% </span>
                              <div
                                key={product.id}
                                className="product-card__inner "
                              >
                                <Link to={`/shoes/productdetail/${product.id}`}>
                                  <div className="product-card__image zoom">
                                    <img
                                      src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.imgURI}`}
                                      alt=""
                                      className="product-card-image-front img-responsive center-block mt-2 "
                                    />
                                  </div>
                                </Link>
                                <div className="mt-4 p-3 text-center ">
                                  <h4 className="product-single__series text-uppercase">
                                    {product.cushion}
                                  </h4>
                                  <Link
                                    to={`/shoes/productdetail/${product.id}`}
                                  >
                                    <h3 className="product-card__title">
                                      {/* SAVILLE CAPTOE OXFORD - OF32 */}
                                      {`${product.name} ${product.cushion} ${product.designStyle} ${product.brand}`}
                                    </h3>
                                  </Link>
                                  <div className="product-price d-inline">
                                    {product.discountPriceMin ===
                                      product.priceMin &&
                                    product.discountPriceMax ===
                                      product.priceMax ? (
                                      <div className="discount-price">
                                        <strong className="text-danger">
                                          {formatter.format(
                                            product.discountPriceMin
                                          )}{" "}
                                          -{" "}
                                          {formatter.format(
                                            product.discountPriceMax
                                          )}
                                        </strong>
                                      </div>
                                    ) : (
                                      <div className="discount-and-original-price">
                                        <div className="discount-price">
                                          <strong className="text-danger">
                                            {formatter.format(
                                              product.discountPriceMin
                                            )}{" "}
                                            -{" "}
                                            {formatter.format(
                                              product.discountPriceMax
                                            )}
                                          </strong>
                                        </div>
                                        <div className="original-price">
                                          <span>
                                            {formatter.format(product.priceMin)}
                                          </span>{" "}
                                          -{" "}
                                          <span>
                                            {formatter.format(product.priceMax)}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <p>Không có dữ liệu.</p>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <a
                    href="/shoes/product"
                    title="Xem tất cả ESPADRILLES"
                    className="evo-button mobile-viewmore mt-6 "
                  >
                    Xem tất cả . <strong>ESPADRILLES</strong>
                  </a>
                </Col>
              </div>

              <div className="Outfit">
                <Col md={12}>
                  <div className="section_product section_product_best_sell ml-3">
                    <div className="section-head clearfix text-center mt-5">
                      <h2 className="title_blog m-4 mt-5">
                        <a href="/shoes/product" title="Espadrilles">
                          <strong>OUTFIT</strong>
                        </a>
                      </h2>
                    </div>
                    <div className="outfit-content ml-5">
                      <div className="body-outfit">
                        <div className="outfit-image ">
                          <a href="/shoes/product" title="CLASSY CHELSEA BOOTS">
                            <img
                              src="https://bizweb.dktcdn.net/100/292/624/themes/758446/assets/index-evo-icon-5.jpg?1700140225697"
                              alt="CLASSY CHELSEA BOOTS"
                            />
                          </a>
                        </div>
                        <div className="outfit-product">
                          {Array.isArray(products) && products.length > 0 ? (
                            <Slider
                              autoplay={true}
                              autoplaySpeed={3000}
                              dots={true} // Hiển thị chấm chỉ mục
                              infinite={true} // Vô hạn lặp lại slideshow
                              speed={500} // Tốc độ chuyển đổi slide (ms)
                              slidesToShow={1} // Số slide hiển thị cùng một lúc
                              slidesToScroll={1} // Số slide chuyển đổi khi di chuyển
                            >
                              {products.map((product) => (
                                <Card className="product-card mr-3">
                                  <span className="sale-box">- 22% </span>
                                  <div
                                    key={product.id}
                                    className="product-card__inner "
                                  >
                                    <Link
                                      to={`/shoes/productdetail/${product.id}`}
                                    >
                                      <div className="product-card__image zoom">
                                        <img
                                          src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.imgURI}`}
                                          alt=""
                                          className="product-card-image-front img-responsive center-block mt-2 "
                                        />
                                      </div>
                                    </Link>
                                    <div className="mt-4 p-3 text-center ">
                                      <h4 className="product-single__series text-uppercase">
                                        {product.cushion}
                                      </h4>
                                      <Link
                                        to={`/shoes/productdetail/${product.id}`}
                                      >
                                        <h3 className="product-card__title">
                                          {`${product.name} ${product.cushion} ${product.designStyle} ${product.brand}`}
                                        </h3>
                                      </Link>
                                      <div className="product-price d-inline">
                                        {product.discountPriceMin ===
                                          product.priceMin &&
                                        product.discountPriceMax ===
                                          product.priceMax ? (
                                          <div className="discount-price">
                                            <strong className="text-danger">
                                              {formatter.format(
                                                product.discountPriceMin
                                              )}{" "}
                                              -{" "}
                                              {formatter.format(
                                                product.discountPriceMax
                                              )}
                                            </strong>
                                          </div>
                                        ) : (
                                          <div className="discount-and-original-price">
                                            <div className="discount-price">
                                              <strong className="text-danger">
                                                {formatter.format(
                                                  product.discountPriceMin
                                                )}{" "}
                                                -{" "}
                                                {formatter.format(
                                                  product.discountPriceMax
                                                )}
                                              </strong>
                                            </div>
                                            <div className="original-price">
                                              <span>
                                                {formatter.format(
                                                  product.priceMin
                                                )}
                                              </span>{" "}
                                              -{" "}
                                              <span>
                                                {formatter.format(
                                                  product.priceMax
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </Slider>
                          ) : (
                            <p>Không có dữ liệu.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            </Container>
          </Row>
        </Container>
        <div className="sidebar_single_post">
          <div className="container_">
            <div
              id="black-studio-tinymce-22"
              class="visible-all-devices widget"
            >
              <div class="textwidget">
                <ul>
                  <li className="">Chất liệu 100% da thật</li>
                  <li>Bảo trì trọn đời</li>
                  <li>
                    Miễn phí
                    <br />
                    giao hàng toàn quốc
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Home;
