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
  const { t } = useTranslation();

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

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/order', label: t('nav.order') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header className={`global-header ${scrolled ? 'is-scrolled' : ''}`} style={{ background: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
        <div className="header-inner">
          <Link to="/" className="header-logo">
            {/* Desktop Logo */}
            <img src="/tajlogo.png" alt="Taj Mahal Logo" className="desktop-logo" style={{ height: '85px' }} />
            
            {/* Mobile Logo (Added for mobile view) */}
            <img src="/tajlogo.png" alt="Taj Mahal Logo Mobile" className="mobile-logo" style={{ height: '50px' }} />
          </Link>

          <nav className="header-nav desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                style={{ 
                  color: '#333333',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              onClick={() => setIsCartOpen(true)}
              className="header-cart"
              aria-label="Open Cart"
              style={{ color: '#D4AF37', borderColor: '#D4AF37' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            
            <button 
              onClick={handleReserve} 
              className="btn-reserve desktop-reserve" 
              style={{ 
                fontSize: '0.95rem', 
                padding: '10px 18px', // Reduced padding slightly to fit longer text
                color: '#333333',
                backgroundColor: '#D4AF37',
                border: 'none',
                fontWeight: '700'
              }}
            >
              Reserve a Table
            </button>

            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              style={{ borderColor: '#333333' }}
            >
              <span style={{ background: '#333333' }}></span>
              <span style={{ background: '#333333' }}></span>
              <span style={{ background: '#333333' }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <img src="/tajlogo.png" alt="Taj Mahal" style={{ height: '60px' }} />
        </div>
        <nav className="mobile-drawer-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
              style={{ fontSize: '1.2rem' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-drawer-footer">
          <button onClick={handleReserve} className="btn-reserve" style={{ width: '100%', backgroundColor: '#D4AF37', color: '#333333' }}>
            Reserve a Table
          </button>
        </div>
      </aside>
    </>
  );
}