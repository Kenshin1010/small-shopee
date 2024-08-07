import AddNewIcon from '../icons-tsx/AddNewIcon/AddNewIcon';
import PurchaseIcon from '../icons-tsx/PurchaseIcon/PurchaseIcon';

import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
import Logo from '../icons-tsx/Logo/Logo';

const cx = classNames.bind(styles);

const MENU_ITEMS = [];

function Nav() {
  return (
    <header className={cx('wrapper')}>
      <Logo />

      <AddNewIcon />
      <PurchaseIcon />
    </header>
  );
}

export default Nav;
