import Nav from "../components/Nav/Nav";

import classNames from "classnames/bind";
import styles from "./NavOnly.module.scss";

const cx = classNames.bind(styles);

type NavOnlyProps = {
  children: React.ReactElement;
};

function NavOnly({ children }: NavOnlyProps) {
  return (
    <div className={cx("NavOnly")}>
      <Nav />
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
export default NavOnly;
