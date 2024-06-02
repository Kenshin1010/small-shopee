import AddNewIcon from "../AddNewIcon/AddNewIcon";
import PurchaseIcon from "../PurchaseIcon/PurchaseIcon";

import classNames from "classnames/bind";
import styles from "./Nav.module.scss";
import Logo from "../Logo/Logo";

const cx = classNames.bind(styles);

function Nav() {
  return (
    <header className={cx("wrapper")}>
      <Logo />

      <AddNewIcon />
      <PurchaseIcon />
    </header>
  );
}

export default Nav;
