import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Button,
  Col,
  Input,
  Label,
} from "reactstrap";
import Header from "components/Headers/UserHeader2.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "assets/css/listProduct.css";
// list
import {
  getAllBrand,
  getAllOrigin,
  getAllDesignStyle,
  getAllSkinType,
  getAllToe,
  getAllSole,
  getAllLining,
  getAllCushion,
} from "services/ProductAttributeService";
import { getAllShoesUser } from "services/Product2Service";

const Product = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
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

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const getListShoes = async (page, size) => {
    try {
      let res = await getAllShoesUser(page, size, search);
      if (res && res.data && res.data.content) {
        setProducts(res.data.content);
        console.log(res.data);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);

        // Nếu có kết quả tìm kiếm, xóa thông báo lỗi
        setErrorMessage("");
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
      setErrorMessage("Không tìm thấy kết quả tìm kiếm.");
      setProducts([]);
    }
  };
  const getlistBrand = async () => {
    let res = await getAllBrand();
    console.log(res);
    if (res && res.data) {
      setListBrand(res.data);
    }
  };
  const getListOrigin = async () => {
    let res = await getAllOrigin();
    if (res && res.data) {
      setListOrigin(res.data);
    }
  };
  const getListDesignStyle = async () => {
    let res = await getAllDesignStyle();
    if (res && res.data) {
      setListDesignStyle(res.data);
    }
  };
  const getListSkinType = async () => {
    let res = await getAllSkinType();
    if (res && res.data) {
      setListSkinType(res.data);
    }
  };
  const getListToe = async () => {
    let res = await getAllToe();
    if (res && res.data) {
      setListToe(res.data);
    }
  };
  const getListSole = async () => {
    let res = await getAllSole();
    if (res && res.data) {
      setListSole(res.data);
    }
  };
  const getListLining = async () => {
    let res = await getAllLining();
    if (res && res.data) {
      setListLining(res.data);
    }
  };
  const getListCushion = async () => {
    let res = await getAllCushion();
    if (res && res.data) {
      setListCushion(res.data);
    }
  };

  useEffect(() => {
    getListShoes(page, size);
    getlistBrand();
    getListOrigin();
    getListDesignStyle();
    getListSkinType();
    getListToe();
    getListSole();
    getListLining();
    getListCushion();
  }, [search]);

  useEffect(() => {
    getListShoes(page, size, search);
  }, [page, size, search]);

  const handleCheckboxChange = (propertyName, value) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [propertyName]: prevSearch[propertyName] === value ? null : value,
    }));
  };
  const onPriceChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // Lọc
  const [contentState, setContentState] = useState({
    brand: false,
    origin: false,
    design: false,
    skin: false,
    sole: false,
    lining: false,
    toe: false,
    cushion: false,
  });

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <div className="col">
            <Card className="">
              <CardBody>
                <Row className="mt-5">
                  {/* Bộ lọc */}
                  <div className="col-md-3">
                    <div style={{ display: "table" }}>
                      <h3 className="titleFilter ml-4 mt-3">
                        <img
                          className="icon"
                          src="https://cdn-icons-png.flaticon.com/128/7855/7855877.png"
                        ></img>
                        Bộ Lọc Tìm Kiếm
                      </h3>
                      <hr color="orange" width="250px" className="m-0 mb-3" />
                    </div>
                    <div className=" search">
                      {/* brand */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Thương Hiệu</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    brand: !prevState.brand,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.brand ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.brand ? "show" : "hide"
                            }`}
                        >
                          {listBrand.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("brandId", x.id)
                                }
                                checked={search.brandId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Origin */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Xuất Xứ</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    origin: !prevState.origin,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.origin ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.origin ? "show" : "hide"
                            }`}
                        >
                          {listOrigin.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("originId", x.id)
                                }
                                checked={search.originId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* design style */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Kiểu Thiết Kế</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    design: !prevState.design,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.design ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.design ? "show" : "hide"
                            }`}
                        >
                          {listDesignStyle.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("designStyleId", x.id)
                                }
                                checked={search.designStyleId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* skin type */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Loại Da</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    skin: !prevState.skin,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.skin ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.skin ? "show" : "hide"
                            }`}
                        >
                          {listSkinStype.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("skinTypeId", x.id)
                                }
                                checked={search.skinTypeId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sole */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Đế Giày</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    sole: !prevState.sole,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.sole ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.sole ? "show" : "hide"
                            }`}
                        >
                          {listSole.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("soleId", x.id)
                                }
                                checked={search.soleId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* lining */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Lót Giày</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    lining: !prevState.lining,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.lining ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.lining ? "show" : "hide"
                            }`}
                        >
                          {listLining.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("liningId", x.id)
                                }
                                checked={search.liningId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Toe */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Mũi Giày</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    toe: !prevState.toe,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.toe ? "fa-minus" : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.toe ? "show" : "hide"
                            }`}
                        >
                          {listToe.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("toeId", x.id)
                                }
                                checked={search.toeId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cushion */}
                      <div className="category">
                        <div className="title">
                          <ul className="nav justify-content-between mt-1">
                            <li className="nac-item">
                              <p className="font-weight-bold">Đệm</p>
                            </li>
                            <li className="more">
                              <button
                                className="button"
                                onClick={() =>
                                  setContentState((prevState) => ({
                                    ...prevState,
                                    cushion: !prevState.cushion,
                                  }))
                                }
                              >
                                <i
                                  className={`fa-solid ${contentState.cushion
                                    ? "fa-minus"
                                    : "fa-plus"
                                    }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`content ${contentState.cushion ? "show" : "hide"
                            }`}
                        >
                          {listCushion.map((x) => (
                            <div key={x.id}>
                              <input
                                type="checkbox"
                                className="mr-4 ml-2"
                                onChange={() =>
                                  handleCheckboxChange("cushionId", x.id)
                                }
                                checked={search.cushionId === x.id}
                              />
                              <label className="content-name">{x.name}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="category">
                        <Label
                          for="find_code"
                          className="font-weight-bold text-dark ml-2"
                        >
                          Giá:
                        </Label>
                        <Row>
                          <Col xl={5}>
                            <Input
                              className="form-control-alternative"
                              name="fromPrice"
                              placeholder="Từ"
                              value={search.fromPrice}
                              onChange={(e) => onPriceChange(e)}
                            />
                          </Col>
                          <Label
                            for="find_code"
                            xl={1}
                            className="form-control-label text-center"
                          >
                            <i class="fa-solid fa-arrow-right"></i>
                          </Label>
                          <Col xl={5}>
                            <Input
                              className="form-control-alternative"
                              name="toPrice"
                              placeholder="Đến"
                              value={search.toPrice}
                              onChange={(e) => onPriceChange(e)}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9 mt-5">
                    <div className="selectItem">
                      {errorMessage && <p>{errorMessage}</p>}
                      <ul></ul>
                    </div>
                    <div className="row item mt-3">
                      {Array.isArray(products) ? (
                        products.map((product) => (
                          <div key={product.id} className="col-md-3">
                            <Link to={`/shoes/productdetail/${product.id}`}>
                              <img
                                src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${product.imgURI}`}
                                alt=""
                                className="zoom"
                              />
                            </Link>
                            <br />
                            <br />
                            <div style={{ fontSize: "medium" }} className="p-2">
                              <Link to={`/shoes/productdetail/${product.id}`}>
                                <h3 className="product-card__title">
                                  {/* SAVILLE CAPTOE OXFORD - OF32 */}
                                  {`${product.name} ${product.brand} ${product.origin}`}
                                </h3>
                              </Link>
                              <div className="product-price">
                                <strong className="text-danger">
                                  {product.discountPriceMin < product.discountPriceMax && <>{formatter.format(product.discountPriceMin)} -{" "}</>}
                                  {formatter.format(product.discountPriceMax)}
                                </strong>
                                <span>
                                  {product.priceMax < product.priceMin && <>{formatter.format(product.priceMax)} -{" "}</>}
                                  {formatter.format(product.priceMin)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Không có dữ liệu.</p>
                      )}
                    </div>
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
