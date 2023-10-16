import Index from "views/admin/Index.js";
import Bills from "views/admin/Bills.js";
import Products from "views/admin/Products.js";
import ProductAttributes from "views/admin/ProductAttributes.js";
import Promo from "views/admin/Promotion.js";
import Staff from "views/admin/Staff.js";
import Partner from "views/admin/Partner.js";
import Profile from "views/admin/Profile.js";
import Statistical from "views/admin/Statistical.js";
import AddProduct from "views/admin/AddProduct.js";
import EditProduct from "views/admin/EditProduct";
import Products2 from "views/admin/Products2.js";
import AddProduct2 from "views/admin/AddProduct2.js";
import EditProduct2 from "views/admin/EditProduct2.js";
import DetailProduct from "views/admin/DetailProduct.js";
import BillDetail from "views/admin/BillDetail.js";
import DeliveryOrders from "views/admin/DeliveryOrders";
import Discount from "views/admin/discount/Discount.js";

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
    path: "/delivery-orders",
    name: "Phiếu giao hàng",
    icon: "ni ni-cart text-blue",
    component: <DeliveryOrders />,
    layout: "/admin",
  },
  
  {
    path: "/product",
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
    path: "/product2",
    name: "Sản phẩm 2",
    icon: "ni ni-money-coins text-green",
    component: <Products2 />,
    layout: "/admin",
  },
  {
    path: "/product2/add",
    component: <AddProduct2 />,
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
    path: "/product2/edit/:id",
    component: <EditProduct2 />,
    layout: "/admin",
  },
  {
    path: "/product/detail/:id",
    component: <DetailProduct />,
    layout: "/admin",
  },
  {
    path: "/bill-details/:id",
    component: <BillDetail />,
    layout: "/admin",
  }
];
export default routes;
