import { useEffect, useState } from 'react';
import DarkPng from '../../../../assets/images/dark-mode-button.png';
import LightPng from '../../../../assets/images/light-mode-button.png';
import classNames from 'classnames/bind';
import styles from './DarkMode.module.scss';
import { useTheme } from '../../../../context/ThemeProvider';

const cx = classNames.bind(styles);

const DarkMode: React.FC = () => {
  const { theme, setThemeMode } = useTheme();
  const currentMode = theme.palette.mode;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentMode === 'dark');
  }, [currentMode]);

  const toggleTheme = () => {
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  return (
    <div className="relative">
      <button className={cx(`light-theme `)} onClick={toggleTheme}>
        <img
          className={cx('light-theme-img', {
            'opacity-0': currentMode === 'dark',
            'opacity-100': currentMode !== 'dark',
          })}
          src={LightPng}
          alt="Light mode"
        />
      </button>
      <button className={cx(`dark-theme `)} onClick={toggleTheme}>
        <img
          className={cx('dark-theme-img', {
            'opacity-100': currentMode === 'dark',
            'opacity-0': currentMode !== 'dark',
          })}
          src={DarkPng}
          alt="Dark mode"
        />
      </button>
    </div>
  );
};

export default DarkMode;
