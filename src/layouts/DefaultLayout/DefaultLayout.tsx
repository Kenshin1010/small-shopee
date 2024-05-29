import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

import Nav from "../components/Nav/Nav";
import Search from "../components/Search/Search";

export type DefaultLayoutProps = {
  children: React.ReactElement;
};

const cx = classNames.bind(styles);

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={cx("wrapper")}>
      <Nav />
      <div className={cx("container")}>
        <Search />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
