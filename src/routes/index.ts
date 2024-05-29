import config from "../config";

// Layouts
import NavOnly from "../layouts/NavOnly/NavOnly";

// Pages
import AddNewProduct from "../pages/AddNewProduct/AddNewProduct";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Purchase from "../pages/Purchase/Purchase";

// Public routes
const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.detail,
    component: ProductDetail,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.purchase,
    component: Purchase,
  },
  {
    path: config.routes.addnew,
    component: AddNewProduct,
    layout: NavOnly,
  },
];

// const priveRoutes = [];

// export { publicRoutes, priveRoutes };
export { publicRoutes };
