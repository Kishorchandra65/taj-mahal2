import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Loader from './components/common/Loader';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import Santa from './components/common/Santa';
import ScrollToTop from './components/common/ScrollToTop';
import FX from './components/common/FX';


import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import RevocationPage from './pages/RevocationPage';

import './styles/globals.css';

function Layout() {
  return (
    <>
      <Header />
      <FX />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Santa />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <CartProvider>
      {loading && <Loader />}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="revocation" element={<RevocationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}