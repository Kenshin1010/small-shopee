import { useEffect, useState } from 'react';
import DarkPng from '../../../../assets/images/dark-mode-button.png';
import LightPng from '../../../../assets/images/light-mode-button.png';
import classNames from 'classnames/bind';
import styles from './DarkMode.module.scss';

const cx = classNames.bind(styles);

const DarkMode = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  return (
    <div className="relative">
      <button
        className={cx('light-theme')}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <img src={LightPng} alt="Light mode" />
      </button>
      <button
        className={cx('dark-theme')}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <img src={DarkPng} alt="Dark mode" />
      </button>
    </div>
  );
};

export default DarkMode;
