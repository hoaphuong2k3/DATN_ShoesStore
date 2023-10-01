import React, { useState, useEffect } from "react";
import { Container, Row, Card, CardBody } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";
import { Link } from 'react-router-dom';


const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://63c1265d376b9b2e64743c4f.mockapi.io/shoes")
      .then((response) => response.json())
      .then((data) => {
        const productsArray = Object.values(data);
        setProducts(productsArray);
        console.log(productsArray);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
      <Header />
      <Container fluid>
        {/* Table */}
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
                  {products.map((product) => (
                    <div key={product.id} className="col-md-3">
                      <Link to={`/productdetail/${product.id}`}>
                        <img src={product.anh} alt="" className="zoom" />
                      </Link>
                      <br />
                      <br />
                      <div style={{ fontSize: "large" }} className="p-2">
                        <Link to={`/productdetail/${product.id}`} className="text-dark text-decoration-none">
                          {product.ten}
                        </Link>
                        <p className=" font-weight-bold" style={{ color: "rgba(0, 0, 0, 0.705)" }}>
                          {product.gia}đ&nbsp;
                        </p>
                      </div>
                    </div>
                  ))}
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