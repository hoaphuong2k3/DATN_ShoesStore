import React, { useState, useEffect } from "react";
// import Table from 'react-bootstrap/Table';
import { Container } from "reactstrap";
import { FormTextProps } from "reactstrap";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://datnshoes-default-rtdb.firebaseio.com/shoesdetails.json")
      .then((response) => response.json())
      .then((data) => {
        const productsArray = Object.values(data);
        setProducts(productsArray);
        console.log(productsArray);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {/* <!-- SẢN PHẨM HOT --> */}
      <div style={{ display: "table", margin: "auto" }}>
        <img src="images/heading-hot.png" alt="" width="260" height="40" />
        <hr color="orange" width="100px" />
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
          <div key={product.code} className="col-md-3">
            <a href="">
              <img src={product.anh} alt="" className="zoom" />
            </a>
            <br />
            <br />
            <div style={{ fontSize: "large" }}>
              <a href="" className="ml-5 text-dark text-decoration-none">{product.ten}</a>
              <p className="ml-5 font-weight-bold" style={{ color: "rgba(0, 0, 0, 0.705)" }}>
                {product.gia}đ&nbsp;
                <a href="#" className="btnLoop view_product" data-toggle="tooltip" data-placement="left" title="Thêm giỏ hàng">
                  <i className="fab fa-opencart ml-4" aria-hidden="true"></i>
                </a>
                <a href="javascript:void(0)" data-id={product.code} data-variantid={product.code} title="Mua Ngay">
                  <i className="fa fa-shopping-bag mr-5" aria-hidden="true"></i>
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className="container mt-5">
    //   <h1 className="text-danger">Shop</h1>
    //   {products.map((product) => (
    //     <div key={product.code}>
    //       <img src={product.anh} alt={product.ten} />
    //       <h3>{product.ten}</h3>
    //       <p>Code: {product.code}</p>
    //       <p>Price: {product.gia}</p>
    //     </div>
    //   ))}
    // </div>
  );
}

export default Shop;