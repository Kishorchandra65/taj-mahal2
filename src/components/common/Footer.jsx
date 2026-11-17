import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="global-footer">
      <div className="footer-inner">
        
        {/* Column 1: Brand */}
        <div className="footer-brand">
          <img src="/tajlogo121.png" alt="Taj Mahal" />
          <p>Authentic Indian cuisine in the heart of Oldenburg since 1978.</p>
        </div>

        {/* Column 2 & 3 Wrapper */}
        <div className="footer-links-wrapper">
          
          {/* Column 2: Explore */}
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/order">Menu</Link>
            <Link to="/privacy">Privacy Policy</Link> 
            <Link to="/revocation">Revocation (Widerruf)</Link>
          </div>

          {/* Column 3: Visit Us */}
          <div className="footer-col">
            <h4>Visit Us</h4>
            <p>Bloherfelder Str. 66<br/>26129 Oldenburg</p>
            <p><a href="tel:+4944118005527">0441 18005527</a></p>
            <div className="footer-hours">
              <p><strong>Lunch:</strong> 12:00 – 15:00</p>
              <p><strong>Dinner:</strong> 17:30 – 23:00</p>
            </div>
          </div>

        </div>

        {/* Column 4: Social Icons */}
        <div className="footer-col footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://tripadvisor.com" target="_blank" rel="noreferrer" aria-label="TripAdvisor">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </a>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Taj Mahal. All rights reserved.</p>
      </div>
    </footer>
  );
}