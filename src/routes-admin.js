import Index from "views/admin/Index.js";
import Bills from "views/admin/Bills.js";
import Products from "views/admin/Products.js";
import ProductAttributes from "views/admin/ProductAttributes.js";
import Promo from "views/admin/Promotion.js";
import Staff from "views/admin/Staff.js";
import Client from "views/admin/Client.js";
import Profile from "views/admin/Profile.js";
import Statistical from "views/admin/Statistical.js";
import AddProduct from "views/admin/AddProduct";
import EditProduct from "views/admin/EditProduct";
import DetailProducts from "views/admin/DetailProduct.js";
import BillDetail from "views/admin/BillDetail.js";
import ListShoesDetail from "views/admin/ListShoesDetail.js";
import Discount from "views/admin/discount/Discount.js";
import Delivery from "views/admin/Delivery.js";
import Partner from "views/admin/Partner.js";
var routes = [
  {
    path: "/index",
    name: "Trang chủ",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/bills",
    name: "Hóa đơn",
    icon: "ni ni-cart text-blue",
    component: <Bills />,
    layout: "/admin",
  },
  {
    path: "/delivery",
    name: "Phiếu giao",
    icon: "ni ni-cart text-blue",
    component: <Delivery />,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Danh sách sản phẩm",
    icon: "ni ni-money-coins text-green",
    component: <Products />,
    layout: "/admin",
  },
  {
    path: "/product-attributes",
    name: "Thuộc tính sản phẩm",
    icon: "ni ni-bullet-list-67 text-green",
    component: <ProductAttributes />,
    layout: "/admin",
  },
  {
    path: "/promotion",
    name: "Đợt giảm giá",
    icon: "ni ni-tag text-red",
    component: <Promo />,
    layout: "/admin",
  },
  {
    path: "/discount",
    name: "Khuyến mại",
    icon: "ni ni-tag text-red",
    component: <Discount />,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Nhân viên",
    icon: "ni ni-books text-info",
    component: <Staff />,
    layout: "/admin",
  },
  {
    path: "/client",
    name: "Khách hàng",
    icon: "ni ni-books text-info",
    component: <Client />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Cá nhân",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/statistics",
    name: "Thống kê",
    icon: "ni ni-money-coins text-green",
    component: <Statistical />,
    layout: "/admin",
  },
  {
    path: "/product/add",
    component: <AddProduct />,
    layout: "/admin",
  },
  {
    path: "/product/edit/:id",
    component: <EditProduct />,
    layout: "/admin",
  },
  {
    path: "/product/detail/:id",
    component: <DetailProducts />,
    layout: "/admin",
  },
  {
    path: "/bill-details/:id",
    component: <BillDetail />,
    layout: "/admin",
  },
  {
    path: "/shoesdetail/:id",
    component: <ListShoesDetail />,
    layout: "/admin",
  },
  {
    path: "/partner",
    name: "Thống kê",
    icon: "ni ni-money-coins text-green",
    component: <Partner />,
    layout: "/admin",
  }
];
export default routes;
