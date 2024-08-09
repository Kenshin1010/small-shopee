import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './components/GlobalStyles';
import { ProductsProvider } from './context/ProductsProvider.tsx';
import { CartProvider } from './context/CartProvider.tsx';
import { CssBaseline } from '@mui/material';
import MultiProvider from './context/MultiProvider.tsx';
import DataProvider from './context/DataProvider.tsx';
import { ThemeProviderComponent } from './context/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MultiProvider
      providers={[
        <ThemeProviderComponent children />,
        <DataProvider children />,
        <CartProvider />,
        <ProductsProvider />,
      ]}
    >
      <GlobalStyles>
        <CssBaseline />
        <App />
      </GlobalStyles>
    </MultiProvider>
  </React.StrictMode>
);
