import Index from "views/admin/Index.js";
import Bills from "views/admin/Bills.js";
import Products from "views/admin/Products.js";
import ProductAttributes from "views/admin/ProductAttributes.js";
import Promo from "views/admin/KM/Promotion.js";
import Staff from "views/admin/Staff.js";
import Partner from "views/admin/Partner.js";
import Profile from "views/admin/Profile.js";
import Statistical from "views/admin/Statistical.js";
import BillDetail from "views/admin/BillDetail.js";


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
    path: "/products",
    name: "Danh sách sản phẩm",
    icon: "ni ni-planet text-orange",
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
    name: "Khuyến mại",
    icon: "ni ni-tag text-red",
    component: <Promo />,
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
    path: "/partner",
    name: "Đối tác",
    icon: "ni ni-circle-08 text-pink",
    component: <Partner />,
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
    path: "/bill-details/:id",
    component: <BillDetail />,
    layout: "/admin",
  }
];
export default routes;
