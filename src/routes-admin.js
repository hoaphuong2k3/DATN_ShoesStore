import Index from "views/admin/Index.js";
import Bills from "views/admin/transaction/Bills.js";
import Products from "views/admin/product/Products.js";
import ProductAttributes from "views/admin/product/ProductAttributes.js";
import Promo from "views/admin/discount/Promotion.js";
import FreeGift from "views/admin/discount/FreeGift.js";
import Staff from "views/admin/Staff.js";
import Client from "views/admin/Client.js";
import Profile from "views/admin/Profile.js";
import Statistical from "views/admin/Statistical.js";
import AddProduct from "views/admin/product/AddProduct";
import EditProduct from "views/admin/product/EditProduct";
import ListShoesDetail from "views/admin/product/ListShoesDetail.js";
import Discount from "views/admin/discount/Discount.js";
import Sell from "views/admin/sells/DirectSales.js";

var routes = [
  {
    path: "/chart",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/index",
    component: <Sell />,
    layout: "/admin",
  },
  {
    path: "/bills",
    component: <Bills />,
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
    path: "/free-gift",
    component: <FreeGift />,
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
    path: "/shoesdetail/:id",
    component: <ListShoesDetail />,
    layout: "/admin",
  }
];
export default routes;
