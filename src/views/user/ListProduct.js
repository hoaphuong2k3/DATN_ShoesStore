import React, { useState, useEffect } from "react";
import { Container, Row, Card, CardBody } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";
import { Link } from 'react-router-dom';
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({
    code: "",
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
    fromQuantity: null,
    toQuantity: null,
    fromDateStr: "",
    toDateStr: "",
    createdBy: ""
  });

  useEffect(() => {
    
    getListShoes(0,10);
  }, []);


  const getListShoes = async (page, size) => {
    try {
      const res = await axios.post(`http://localhost:33321/api/user/shoes/search?page=${page}&size=${size}`, search);
      
      if (res && res.data && res.data.content) {
        setProducts(res.data.content);
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                <div style={{ display: "table", margin: "auto" }}>
                  <hr color="orange" width="300px" />
                  <br />
                </div>
                <div className="row">
                  <style>
                    {`
                        .zoom {
                          padding: 0px;
                          transition: transform .3s;
                          width: 300px;
                          height: 300px;
                          margin: auto;
                        }
                        .zoom:hover {
                          -ms-transform: scale(1.0);
                          -webkit-transform: scale(1.0);
                          transform: scale(1.1);
                        }
                    `}
                  </style>
                  {Array.isArray(products) ? (
                    products.map((product) => (
                      <div key={product.id} className="col-md-3">
                        <Link to={`/shoes/productdetail/${product.id}`}>
                          <img src={product.anh} alt="" className="zoom" />
                        </Link>
                        <br />
                        <br />
                        <div style={{ fontSize: "large" }} className="p-2">
                          <Link to={`/shoes/productdetail/${product.id}`} className="text-dark text-decoration-none">
                            {product.name}
                          </Link>
                          <p className="font-weight-bold" style={{ color: "rgba(0, 0, 0, 0.705)" }}>
                            {product.priceMin}đ&nbsp;
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Không có dữ liệu.</p>
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

export default Product;