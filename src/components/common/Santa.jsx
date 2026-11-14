import { useState } from 'react';

export default function Santa() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="santa-container">
      {/* The Santa Character */}
      <div className="santa-character">
        <svg viewBox="0 0 100 120" className="santa-svg">
          <ellipse cx="50" cy="30" rx="25" ry="15" fill="#c41e3a" />
          <path d="M25 30 Q50 -10 75 30" fill="#c41e3a" />
          <circle cx="75" cy="30" r="8" fill="#fff" />
          <circle cx="50" cy="55" r="22" fill="#fddcb5" />
          <circle cx="42" cy="52" r="3" fill="#000" />
          <circle cx="58" cy="52" r="3" fill="#000" />
          <circle cx="50" cy="60" r="4" fill="#e8a090" />
          <path d="M30 60 Q50 90 70 60 Q60 75 50 75 Q40 75 30 60" fill="#fff" />
          <path d="M40 68 Q50 75 60 68" stroke="#000" strokeWidth="1.5" fill="none" />
          <rect x="30" y="80" width="40" height="30" rx="8" fill="#c41e3a" />
          <rect x="30" y="95" width="40" height="6" fill="#000" />
          <rect x="46" y="93" width="8" height="10" fill="#d9ac51" rx="2" />
        </svg>
      </div>

      {/* The Offer Card */}
      <div className="santa-offer-card">
        {/* Red Header */}
        <div className="santa-red-header">
          <button className="santa-close" onClick={() => setOpen(false)}>✕</button>
          <div className="santa-holly">🎄</div>
          <h4>Nikolaus Deal · Booking until 6.12.</h4>
          <div className="santa-stripes"></div>
        </div>

        <div className="santa-body">
          <p className="santa-badge">YOUR ST. NICHOLAS PRIZE</p>
          
          <div className="santa-price-row">
            <span className="santa-price-big">69 €</span>
            <span className="santa-price-per">/month</span>
          </div>
          
          <p className="santa-old-price">Normal price <span className="strikethrough">199 €</span> per month</p>

          <div className="santa-package-badge">ALL-AROUND CAREFREE PACKAGE</div>

          <ul className="santa-features">
            <li><span className="zero">0 €</span> Advance payment</li>
            <li><span className="zero">0 €</span> Starting costs</li>
            <li><span className="check">✔</span> Any number of changes</li>
            <li><span className="check">✔</span> Cancelable monthly</li>
            <li><span className="check">✔</span> Permanently 69 €</li>
          </ul>

          <button className="santa-cta-btn" onClick={() => setOpen(false)}>
            Secure your offer now →
          </button>

          <p className="santa-note">Only for bookings made up to 6. Dec.</p>
        </div>
      </div>
    </div>
  );
}