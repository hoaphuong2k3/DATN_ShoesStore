import React, { useState, useEffect } from "react";
import { Container, Row, Card, CardBody, Button, Col, Input } from "reactstrap";
import Header from "components/Headers/UserHeader2.js";
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from "axios";
import { toast } from 'react-toastify';
// list
import { getAllBrand, getAllOrigin, getAllDesignStyle, getAllSkinType, getAllToe, getAllSole, getAllLining, getAllCushion } from "services/ProductAttributeService";
import { getAllShoes} from "services/Product2Service";

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

  const [listBrand, setListBrand] = useState([]);
  const [listorigin, setListOrigin] = useState([]);
  const [listDesignStyle, setListDesignStyle] = useState([]);
  const [listSkinStype, setListSkinType] = useState([]);
  const [listToe, setListToe] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [listLining, setListLining] = useState([]);
  const [listCushion, setListCushion] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {

    getListShoes(page, size);
  }, []);


  const getListShoes = async (page, size) => {
    try {
      let res = await getAllShoes(page, size, search);
      if (res && res.data && res.data.content) {
        setProducts(res.data.content);
        console.log(res.data);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      let errorMessage = "Lỗi từ máy chủ";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      setProducts([]);
    }
  }
const getlistBrand = async () => {
    let res = await getAllBrand();
    console.log(res);
    if (res && res.data) {
      setListBrand(res.data);
    }
  }
  const getListOrigin = async () => {
    let res = await getAllOrigin();
    if (res && res.data) {
      setListOrigin(res.data);
    }
  }
  const getListDesignStyle = async () => {
    let res = await getAllDesignStyle();
    if (res && res.data) {
      setListDesignStyle(res.data);
    }
  }
  const getListSkinType = async () => {
    let res = await getAllSkinType();
    if (res && res.data) {
      setListSkinType(res.data);
    }
  }
  const getListToe = async () => {
    let res = await getAllToe();
    if (res && res.data) {
      setListToe(res.data);
    }
  }
  const getListSole = async () => {
    let res = await getAllSole();
    if (res && res.data) {
      setListSole(res.data);
    }
  }
  const getListLining = async () => {
    let res = await getAllLining();
    if (res && res.data) {
      setListLining(res.data);
    }
  }
  const getListCushion = async () => {
    let res = await getAllCushion();
    if (res && res.data) {
      setListCushion(res.data);
    }
  }
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <div className="col">
            <Card className="">
              <CardBody>
                <div style={{ display: "table" }}>
                  <h3 className="font-weight-bolder ml-4 mt-3">LEATHER GENTS</h3>
                  <hr color="orange" width="200px" className="m-0 mb-3" />
                </div>
                
                <Row className="mt-4">
                  <div className="col-md-3 search">
                    <Card>
                      
                    </Card>
                  </div>
                  <style>
                    {`
                        .zoom {
                          padding: 0px;
                          transition: transform .3s;
                          width: 200px;
                          height: 200px;
                          margin: auto;
                        }
                        .zoom:hover {
                          -ms-transform: scale(1.0);
                          -webkit-transform: scale(1.0);
                          transform: scale(1.1);
                        }
                    `}
                  </style>
                  <div className="col-md-9 row">
                  {Array.isArray(products) ? (
                    products.map((product) => (
                      <div key={product.id} className="col-md-3">
                        <Link to={`/shoes/productdetail/${product.id}`}>
                          <img src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.imgURI}`} alt="" className="zoom"/>
                        </Link>
                        <br />
                        <br />
                        <div style={{ fontSize: "medium" }} className="p-2">
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
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Product;