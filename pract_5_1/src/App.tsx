import { ThemeProvider } from './features/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/Checkout';

import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import { Layout } from '@/components/common/Layout';
import ProductDetailPage from './pages/ProductDetail';
import OrdersPage from './pages/Order';


function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/ships/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;







