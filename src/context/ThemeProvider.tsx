import { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../themes/Theme';
import { ThemeProvider } from '@mui/material';
import { Theme } from '@mui/system';

type ThemeContextType = {
  theme: Theme;
  setThemeMode: (mode: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    return storedTheme === 'light' ? lightTheme : darkTheme;
  });

  const setThemeMode = (mode: 'light' | 'dark') => {
    const newTheme = mode === 'light' ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', mode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const newTheme = storedTheme === 'light' ? lightTheme : darkTheme;
    setTheme(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
