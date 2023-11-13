import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "reactstrap";
import Header from "components/Headers/UserHeader";
import "assets/css/home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getAllShoes } from "services/Product2Service";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
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
      let res = await getAllShoes(page, size, search, "", "");
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

  return (
    <>
      <Header />
      <Card>
        <Container fluid>
          <Row>
            <Container>
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
                        <Card className="product-card col-6 col-sm-4 col-md-3 mx-3 my-2">
                          <span className="sale-box">- 22% </span>
                          <div key={product.id} className="product-card__inner ">
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
                              <h4 className="product-single__series">OXFORD</h4>
                              <h3 className="product-card__title">
                                SAVILLE CAPTOE OXFORD - OF32
                                {product.name}
                              </h3>
                              <div className="product-price">
                                <strong className="text-danger">
                                  1.365.000₫
                                </strong>
                                <span>1.750.000₫</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <p>Không có dữ liệu.</p>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <a
                  href="san-pham-noi-bat"
                  title="Xem tất cả NEW ARRIVALS"
                  className="evo-button mobile-viewmore mt-6 "
                >
                  Xem tất cả . <strong>NEW ARRIVALS</strong>
                </a>
              </Col>
            </Container>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default Home;
