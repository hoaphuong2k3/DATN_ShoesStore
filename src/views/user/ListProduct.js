import React, { useState, useEffect } from "react";
import { Container,Row,Card,CardHeader,CardBody } from "reactstrap";
import { FormTextProps } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";


const Product = () => {
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
    <>
      <Header/>
      <Container fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Sản phẩm</h3>
              </CardHeader>
              <CardBody>
                <div style={{ display: "table", margin: "auto" }}>
                  {/* <img src="https://laforce.vn/wp-content/uploads/2023/07/banner-danh-muc-giay-da-laforce.jpg" alt="" width="100%" height="100%" /> */}
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
                    <div key={product.code} className="col-md-3 m-2">
                      <a href="">
                        <img src={product.anh} alt="" className="zoom" />
                      </a>
                      <br />
                      <br />
                      <div style={{ fontSize: "large"}} className="p-2">
                        <a href="" className=" text-dark text-decoration-none">{product.ten}</a>
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


// function Shop() {
// const [products, setProducts] = useState([]);

// useEffect(() => {
//   fetch("https://datnshoes-default-rtdb.firebaseio.com/shoesdetails.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const productsArray = Object.values(data);
//       setProducts(productsArray);
//       console.log(productsArray);
//     })
//     .catch((error) => console.log(error));
// }, []);

// return (
//   <div className="container-fluid">
//     {/* <!-- SẢN PHẨM HOT --> */}
//     <div style={{ display: "table", margin: "auto" }}>
//       <img src="https://laforce.vn/wp-content/uploads/2023/07/banner-danh-muc-giay-da-laforce.jpg" alt="" width="100%" height="100%" />
//       <hr color="orange" width="300px" />
//       <br />
//     </div>
//     <div className="row">
//       <style>
//         {`
//           .zoom {
//             padding: 0px;
//             transition: transform .3s;
//             width: 300px;
//             height: 300px;
//             margin: auto;
//           }
//           .zoom:hover {
//             -ms-transform: scale(1.0);
//             -webkit-transform: scale(1.0);
//             transform: scale(1.1);
//           }
//         `}
//       </style>
//       {products.map((product) => (
//         <div key={product.code} className="col-md-3">
//           <a href="">
//             <img src={product.anh} alt="" className="zoom" />
//           </a>
//           <br />
//           <br />
//           <div style={{ fontSize: "large", backgroundColor: "rgb(207, 193, 193)" }} className="p-2">
//             <a href="" className=" text-dark text-decoration-none">{product.ten}</a>
//             <p className=" font-weight-bold" style={{ color: "rgba(0, 0, 0, 0.705)" }}>
//               {product.gia}đ&nbsp;
//               {/* <a href="#" className="btnLoop view_product" data-toggle="tooltip" data-placement="left" title="Thêm giỏ hàng">
//                 <i className="fab fa-opencart ml-4" aria-hidden="true"></i>
//               </a>
//               <a href="javascript:void(0)" data-id={product.code} data-variantid={product.code} title="Mua Ngay">
//                 <i className="fa fa-shopping-bag mr-5" aria-hidden="true"></i>
//               </a> */}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );


export default Product;