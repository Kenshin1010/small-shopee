import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Nav.module.scss";

import config from "../../../config";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function Nav() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={config.routes.home} className={cx("logo-link")}>
          <img width="118" height="42" alt="Shopee Logo" src={images.logo} />
        </Link>
      </div>
    </header>
  );
}

export default Nav;
