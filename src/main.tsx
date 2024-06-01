import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles";
import { ProductsProvider } from "./context/ProductsProvider.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import { DataProvider } from "./context/DataProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <CartProvider>
        <ProductsProvider>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </ProductsProvider>
      </CartProvider>
    </DataProvider>
  </React.StrictMode>
);
