import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles";
import { ProductsProvider } from "./context/ProductsProvider.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import { DataProvider } from "./context/DataProvider.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./themes/Theme.ts";
import MultiProvider from "./context/MultiProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MultiProvider providers={[<ThemeProvider theme={theme} />]}>
      <DataProvider>
        <CartProvider>
          <ProductsProvider>
            <GlobalStyles>
              <CssBaseline />
              <App />
            </GlobalStyles>
          </ProductsProvider>
        </CartProvider>
      </DataProvider>
    </MultiProvider>
  </React.StrictMode>
);
