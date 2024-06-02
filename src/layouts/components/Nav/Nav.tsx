import AddNewIcon from "../AddNewIcon/AddNewIcon";
import PurchaseIcon from "../PurchaseIcon/PurchaseIcon";

import classNames from "classnames/bind";
import styles from "./Nav.module.scss";

const cx = classNames.bind(styles);

function Nav() {
  return (
    <header className={cx("wrapper")}>
      <AddNewIcon />
      <PurchaseIcon />
    </header>
  );
}

export default Nav;
