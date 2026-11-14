import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/tajlogo.png" alt="Taj Mahal" />
          <p>Authentic Indian cuisine in the heart of Oldenburg since 1978.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/order">Menu</Link>
          <Link to="/privacy">Privacy Policy</Link> 
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p>Bloherfelder Str. 66<br/>26129 Oldenburg</p>
          <p><a href="tel:+4944118005527">0441 18005527</a></p>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p>Lunch: 12:00 – 15:00</p>
          <p>Dinner: 17:30 – 23:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Taj Mahal. All rights reserved.</p>
        <p>Favicon · <Link to="/order">Order Online</Link></p>
      </div>
    </footer>
  );
}