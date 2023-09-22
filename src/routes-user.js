import Home from "views/user/Home.js";
import Product from "views/user/ListProduct.js";
import News from "views/user/News.js";
import Introduce from "views/user/Introduce.js";
import Contact from "views/user/Contact.js";
import Cart from "views/user/Cart.js";
import Account from "views/user/Account.js";
import ProductDetail from "views/user/ProductDetail.js";

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
  {
    path: "/news",
    name: "TIN TỨC",
    component: <News />,
    layout: "/shoes",
  },
  {
    path: "/cart",
    name: "GIỎ HÀNG",
    component: <Cart />,
    layout: "/shoes",
  },
  {
    path: "/account",
    name: "TÀI KHOẢN",
    component: <Account />,
    layout: "/shoes",
  },
  {
    path: "/productdetail",
    name: "CHI TIẾT SẢN PHẨM",
    component: <ProductDetail />,
    layout: "/shoes",
  },
];
export default routes;
