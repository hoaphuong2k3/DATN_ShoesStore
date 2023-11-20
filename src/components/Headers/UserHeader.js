import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bannerShoes1 from "../../assets/img/theme/bannerShoes2.jpg";
import bannerShoes2 from "../../assets/img/theme/bannerShoes1.jpg";
import bannerShoes3 from "../../assets/img/theme/giay-cao_slideShow.jpg";

const UserHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: handleSlideChange,
  };

  useEffect(() => {
    setShowText(currentSlide === 0);
  }, [currentSlide]);

  const handleSlideChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "670px",
          backgroundImage: `url(${
            currentSlide === 0
              ? bannerShoes1
              : currentSlide === 1
              ? bannerShoes2
              : bannerShoes3
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <Slider {...settings}>
          <div
            className="slide"
            style={{
              minHeight: "670px",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundImage: `url(${bannerShoes2})`,
            }}
          ></div>
          <div
            className="slide"
            style={{
              minHeight: "670px",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundImage: `url(${bannerShoes1})`,
            }}
          ></div>
          <div
            className="slide"
            style={{
              minHeight: "670px",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundImage: `url(${bannerShoes3})`,
            }}
          ></div>
        </Slider>
        
        <Container fluid>
          <Row className="justify-content-end float-left">
            <Col lg="10" md="10">
              {showText && (
                <>
                  <p className="text-white">XU HƯỚNG MỚI</p>
                  <h1 className="display-1 text-white">Leather Gent 2023</h1>
                  <h4 className="text-white">
                    Làm thế nào để trở thành một quý ông?
                  </h4>
                  <p className="text-white mt-0 mb-5">
                    Ấn tượng, lịch lãm đầy nam tính cùng với những đôi giày da
                    2023 của Leather Gent.
                  </p>
                  <Button className="evo-button mobile-viewmore" to="/shoes/product" tag={Link}>
                    Xem ngay
                  </Button>
                  <style>
                    {
                      `
                      .evo-button {
                        position: relative;
                        display: inline-block;
                        padding: 14px 28px;
                        line-height: normal;
                        border: 1px solid #1c1c1c;
                        text-transform: uppercase;
                        font-size: 11px;
                        text-align: center;
                        letter-spacing: 1.5px;
                        font-weight: 400;
                        font-style: normal;
                        background-color: #000; /* Màu nền đen */
                        -webkit-transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
                          border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                        transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
                          border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                        z-index: 1;
                        -webkit-tap-highlight-color: initial;
                        color: #fff; /* Màu chữ trắng */
                      }
                      
                      .evo-button:hover {
                        background-color: #fff; /* Màu nền trắng khi hover */
                        color: #000; /* Màu chữ đen khi hover */
                        border: 1px solid #000;
                      }
                      `
                    }
                  </style>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;