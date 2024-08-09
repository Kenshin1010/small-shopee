import { createTheme } from '@mui/material';
import { color } from './Colors';

const createCustomTheme = (
  mode: 'light' | 'dark',
  primaryColor: string,
  secondaryColor: string,
  backgroundColor: string
) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundColor,
      },
    },
  });

const lightTheme = createCustomTheme(
  'light',
  color.light,
  color.white,
  color.lightBg
);
const darkTheme = createCustomTheme(
  'dark',
  color.dark,
  color.secondary,
  color.darkBg
);

export { lightTheme, darkTheme };
