import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

import routes from "../../config/routes";
import CartIcon from "../components/icons-tsx/CartIcon/CartIcon";
import GoToTop from "../components/icons-tsx/GoToTop/GoToTop";
import Nav from "../components/Nav/Nav";
import SearchBar from "../components/SearchBar/SearchBar";

export type DefaultLayoutProps = {
  children: React.ReactElement;
};

const cx = classNames.bind(styles);

function DefaultLayout({ children }: DefaultLayoutProps) {
  const isCartOrAddNew =
    window.location.pathname.includes(routes.cart) ||
    window.location.pathname.includes(routes.addnew);
  return (
    <div className={cx("wrapper")}>
      <Nav />
      <div className={cx("container")}>
        <div className={cx("search-cart")}>
          <SearchBar />
          {!isCartOrAddNew && <CartIcon />}
        </div>
        <div className={cx("content")}>{children}</div>
      </div>
      <GoToTop />
    </div>
  );
}

export default DefaultLayout;
