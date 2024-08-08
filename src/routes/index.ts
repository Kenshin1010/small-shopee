import config from '../config';
import Layout from '../layouts/Layout';

// Layouts
import NavOnly from '../layouts/NavOnly/NavOnly';

// Pages
import AddNewProduct from '../pages/AddNewProduct/AddNewProduct';
import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Profile from '../pages/Profile/Profile';
import Purchase from '../pages/Purchase/Purchase';
import Search from '../pages/Search/Search';
import Settings from '../pages/Settings/Settings';

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
  {
    path: config.routes.setting,
    component: Settings,
    layout: NavOnly,
  },
  {
    path: config.routes.profile,
    component: Profile,
    layout: NavOnly,
  },
  {
    path: config.routes.search,
    component: Search,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: Layout,
  },
  {
    path: config.routes.register,
    component: Login,
    layout: Layout,
  },
];

// const priveRoutes = [];

// export { publicRoutes, priveRoutes };
export { publicRoutes };
