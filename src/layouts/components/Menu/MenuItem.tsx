import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

type MenuItemProps = {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  title: string;
  to: string;
};
function MenuItem({ icon, activeIcon, title, to }: MenuItemProps) {
  return (
    <NavLink
      className={(nav) => cx('menu-item', { active: nav.isActive })}
      to={to}
    >
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('activeIcon')}>{activeIcon}</span>
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}

export default MenuItem;
