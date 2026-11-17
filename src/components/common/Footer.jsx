import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="global-footer">
      <div className="footer-inner">
        
        {/* Column 1: Brand */}
        <div className="footer-brand">
          <img src="/tajlogo12.png" alt="Taj Mahal" />
          <p>Authentic Indian cuisine in the heart of Oldenburg since 1978.</p>
        </div>

        {/* Column 2: Explore */}
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/order">Menu</Link>
          <Link to="/privacy">Privacy Policy</Link> 
           <Link to="/revocation">Revocation (Widerruf)</Link>
        </div>

        {/* Column 3: Combined Visit & Hours */}
        <div className="footer-col">
          <h4>Visit Us</h4>
          <p>Bloherfelder Str. 66<br/>26129 Oldenburg</p>
          <p><a href="tel:+4944118005527">0441 18005527</a></p>
          <div className="footer-hours-list">
            <p><strong>Lunch:</strong> 12:00 – 15:00</p>
            <p><strong>Dinner:</strong> 17:30 – 23:00</p>
          </div>
        </div>

        {/* Column 4: Socials / Extra (New) */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://tripadvisor.com" target="_blank" rel="noreferrer">TripAdvisor</a>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Taj Mahal. All rights reserved.</p>
      </div>
    </footer>
  );
}