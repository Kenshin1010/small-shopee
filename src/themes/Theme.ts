import { createTheme } from "@mui/material";
import { color } from "./Colors";

const theme = createTheme({
  palette: {
    primary: {
      main: color.primary,
    },
    secondary: {
      main: color.secondary,
    },
    // warning: {
    //   main: color.warning,
    // },
    // success: {
    //   main: color.success,
    // },
    // error: {
    //   main: color.danger,
    // },
  },
  //   typography: {
  //     htmlFontSize: 14,
  //     fontSize: 14,
  //     fontFamily: "TT Firs Neue",
  //     body1: {
  //       fontSize: "0.875rem",
  //       color: color.textPrimary,
  //       fontWeight: 400,
  //     },
  //     body2: {
  //       fontSize: "0.75rem",
  //       color: color.textPrimary,
  //     },
  //     h6: {
  //       fontSize: "0.875rem",
  //       color: color.textPrimary,
  //       fontWeight: 500,
  //     },
  //     h5: {
  //       fontSize: "1rem",
  //       fontWeight: 500,
  //       color: color.textPrimary,
  //     },
  //     h4: {
  //       fontSize: "1.25rem",
  //       fontWeight: 500,
  //       color: color.textPrimary,
  //     },
  //     h3: {
  //       fontSize: "1.5rem",
  //       fontWeight: 500,
  //       color: color.textPrimary,
  //     },
  //     h2: {
  //       fontSize: "2rem",
  //       fontWeight: 500,
  //       color: color.textPrimary,
  //     },
  //     h1: {
  //       fontSize: "2.5rem",
  //       fontWeight: 500,
  //       color: color.textPrimary,
  //     },
  //   },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: "16px",
    //       bgcolor: color.buttonBgcolor,
    //       color: color.white,
    //       "&:hover": {
    //         bgcolor: color.bgcolorHover,
    //         color: color.buttonBgcolor,
    //       },
    //       "&:disabled": {
    //         opacity: 0.7,
    //         color: color.white,
    //       },
    //       lineHeight: "2.2rem",
    //     },
    //     contained: {
    //       fontSize: "16px",
    //       bgcolor: color.buttonBgcolor,
    //       color: color.white,
    //       "&:hover": {
    //         bgcolor: color.bgcolorHover,
    //         color: color.buttonBgcolor,
    //       },
    //       "&:disabled": {
    //         opacity: 0.7,
    //         color: color.white,
    //       },
    //       lineHeight: "2.2rem",
    //     },
    //     outlined: {
    //       fontSize: "16px",
    //       bgcolor: color.buttonBgcolor,
    //       color: color.white,
    //       "&:hover": {
    //         bgcolor: color.bgcolorHover,
    //         color: color.buttonBgcolor,
    //       },
    //       "&:disabled": {
    //         opacity: 0.7,
    //         color: color.white,
    //       },
    //       lineHeight: "2.2rem",
    //     },
    //     text: {
    //       fontSize: "16px",
    //       bgcolor: color.buttonBgcolor,
    //       color: color.white,
    //       "&:hover": {
    //         bgcolor: color.bgcolorHover,
    //         color: color.buttonBgcolor,
    //       },
    //       "&:disabled": {
    //         opacity: 0.7,
    //         color: color.white,
    //       },
    //       lineHeight: "2.2rem",
    //     },
    //     sizeSmall: {
    //       fontSize: "0.75rem",
    //       lineHeight: "1.25rem",
    //       fontWeight: 400,
    //       padding: "0.25rem 1rem",
    //     },
    //   },
    //   variants: [],
    // },
  },
});

export default theme;
