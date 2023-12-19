import Home from "views/user/Home.js";
import Product from "views/user/ListProduct.js";
// import News from "views/user/News.js";
import Introduce from "views/user/Introduce.js";
import Contact from "views/user/Contacts";
import Cart from "views/user/Cart";
import Account from "views/user/Account.js";
import ProductDetail from "views/user/ProductDetail.js";
import CheckOut from "views/user/CheckOut.js";
import Bill from "views/user/hoadon/Bills.js";
var routes = [

  {
    path: "/home",
    name: "TRANG CHỦ",
    component: <Home />,
    layout: "/shoes",
  },
  {
    path: "/product",
    name: "SẢN PHẨM",
    component: <Product />,
    layout: "/shoes",
  },
  {
    path: "/introduce",
    name: "GIỚI THIỆU",
    component: <Introduce />,
    layout: "/shoes",
  },
  {
    path: "/contact",
    name: "LIÊN HỆ",
    component: <Contact />,
    layout: "/shoes",
  },
  // {
  //   path: "/news",
  //   name: "TIN TỨC",
  //   component: <News />,
  //   layout: "/shoes",
  // },
  {
    path: "/cart",
    name: "GIỎ HÀNG",
    component: <Cart />,
    layout: "/shoes",
  },
  {
    path: "/account",
    name: "TÀI KHOẢN",
    layout: "/shoes",
    component: <Account tab="profile" />,
  },
  {
    path: "/bill",
    name: "TÀI KHOẢN",
    layout: "/shoes",

    component: <Account tab="bill" />,
  },
  {
    path: "/rate",
    name: "TÀI KHOẢN",
    layout: "/shoes",

    component: <Account tab="rate" />,
  },
  {
    path: "/productdetail/:idShoesDetail",
    component: <ProductDetail />,
    layout: "/shoes",
  },
  {
    path: "/checkout",
    name: "THANH TOÁN",
    component: <CheckOut />,
    layout: "/shoes",
  },
];
export default routes;
