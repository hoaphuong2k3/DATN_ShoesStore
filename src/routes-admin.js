import Index from "views/admin/Index.js";
import Bills from "views/admin/transaction/Bills.js";
import Products from "views/admin/Products.js";
import ProductAttributes from "views/admin/ProductAttributes.js";
import Promo from "views/admin/discount/Promotion.js";
import Staff from "views/admin/Staff.js";
import Client from "views/admin/Client.js";
import Profile from "views/admin/Profile.js";
import Statistical from "views/admin/Statistical.js";
import AddProduct from "views/admin/AddProduct";
import EditProduct from "views/admin/EditProduct";
import DetailProducts from "views/admin/DetailProduct.js";
import ListShoesDetail from "views/admin/ListShoesDetail.js";
import Discount from "views/admin/discount/Discount.js";
import Delivery from "views/admin/transaction/Delivery.js";
import Sell from "views/admin/sells/DirectSales.js";
import Partner from "views/admin/Partner.js";
var routes = [
  {
    path: "/index",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/direct-sales",
    component: <Sell />,
    layout: "/admin",
  },
  {
    path: "/bills",
    component: <Bills />,
    layout: "/admin",
  },
  {
    path: "/delivery",
    component: <Delivery />,
    layout: "/admin",
  },
  {
    path: "/product",
    component: <Products />,
    layout: "/admin",
  },
  {
    path: "/product-attributes",
    component: <ProductAttributes />,
    layout: "/admin",
  },
  {
    path: "/promotion",
    component: <Promo />,
    layout: "/admin",
  },
  {
    path: "/discount",
    component: <Discount />,
    layout: "/admin",
  },
  {
    path: "/staff",
    component: <Staff />,
    layout: "/admin",
  },
  {
    path: "/client",
    component: <Client />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/statistics",
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
    path: "/shoesdetail/:id",
    component: <ListShoesDetail />,
    layout: "/admin",
  },
  {
    path: "/partner",
    component: <Partner />,
    layout: "/admin",
  }
];
export default routes;
