import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleReserve = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/order', label: t('nav.order') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header className={`global-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <img src="/tajlogo.png" alt="Taj Mahal Logo" />
          </Link>

          <nav className="header-nav desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {/* Language Switcher */}
            <div className="language-switcher">
              <button onClick={() => changeLanguage('en')} className={i18n.language.startsWith('en') ? 'active' : ''}>EN</button>
              <span>|</span>
              <button onClick={() => changeLanguage('nl')} className={i18n.language.startsWith('nl') ? 'active' : ''}>NL</button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="header-cart"
              aria-label="Open Cart"
            >
              🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            
            <button onClick={handleReserve} className="btn-reserve desktop-reserve">
              {t('nav.reserve')}
            </button>

            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <img src="/tajlogo.png" alt="Taj Mahal" />
        </div>
        <nav className="mobile-drawer-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-drawer-footer">
          <button onClick={handleReserve} className="btn-reserve" style={{ width: '100%' }}>
            {t('nav.reserve')}
          </button>
        </div>
      </aside>
    </>
  );
}