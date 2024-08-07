import classNames from 'classnames/bind';
import Logo from '../icons-tsx/Logo/Logo';
import AccountMenu from '../Menu/AccountMenu';
import styles from './Nav.module.scss';
import { Box } from '@mui/material';

const cx = classNames.bind(styles);

function Nav() {
  return (
    <header className={cx('wrapper')}>
      <Logo />
      <Box sx={{ marginRight: '12px' }}>
        <AccountMenu />
      </Box>
    </header>
  );
}

export default Nav;
