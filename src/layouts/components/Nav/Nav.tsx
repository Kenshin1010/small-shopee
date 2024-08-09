import Logo from '../icons-tsx/Logo/Logo';
import AccountMenu from '../Menu/AccountMenu';
import { Box } from '@mui/material';
import DarkMode from './DarkMode/DarkMode';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

function Nav() {
  return (
    <header className={cx('wrapper')}>
      <Logo />
      <DarkMode />
      <Box sx={{ marginRight: '24px' }}>
        <AccountMenu />
      </Box>
    </header>
  );
}

export default Nav;
