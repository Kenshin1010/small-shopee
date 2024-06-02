import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Logo.module.scss";

import config from "../../../config";
import images from "../../../assets/images";
import { Tooltip } from "@mui/material";

const cx = classNames.bind(styles);

function Logo() {
  return (
    <Tooltip arrow title="Home Page">
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <Link to={config.routes.home} className={cx("logo-link")}>
            <img width="118" height="42" alt="Shopee Logo" src={images.logo} />
          </Link>
        </div>
      </div>
    </Tooltip>
  );
}

export default Logo;
