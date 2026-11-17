import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { useCart } from '../context/CartContext'; // Added Cart Context

// FALLBACK DATA
const FALLBACK_MENU = [
  // APPETIZERS
  { id: '1', name: 'Vegetable Pakora', desc: 'Various vegetables with Indian spices', price: 6.50, category: 'APPETIZERS', isVeg: true },
  { id: '2', name: 'Pakora fish', desc: 'Redfish marinated with Indian herbs', price: 7.50, category: 'APPETIZERS', isVeg: false },
  { id: '3', name: 'Onion Bhaji', desc: 'Balls made from onion strips with bell peppers and ginger', price: 6.50, category: 'APPETIZERS', isVeg: true },
  { id: '4', name: 'Mumtaj Mix Pakora', desc: 'Vegetarian surprise appetizer plate', price: 10.50, category: 'APPETIZERS', isVeg: true },
  { id: '5', name: 'Paneer Pakora', desc: 'Homemade Indian cheese with spices', price: 7.00, category: 'APPETIZERS', isVeg: true },
  { id: '6', name: 'King Prawn Pakora', desc: 'Scampi marinated in exotic spices', price: 11.50, category: 'APPETIZERS', isVeg: false },

  // SOUPS AND SALADS
  { id: '10', name: 'Sabzi Soup', desc: 'Vegetable soup with Indian spices', price: 4.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '11', name: 'Mixed salad', desc: 'Fresh mixed salad', price: 4.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '12', name: 'Daal Soup', desc: 'Lentil soup', price: 5.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '13', name: 'Indian salad', desc: 'Spicy Indian salad', price: 5.90, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '14', name: 'Tomato Soup', desc: 'Tomato soup with exotic spices', price: 5.50, category: 'SOUPS AND SALADS', isVeg: true },
  
  // MAIN COURSES
  { id: '15', name: 'Matar-Paneer', desc: 'Indischer Frischkäse und grüne Erbsen in würziger Tomaten-Curry-Sauce', price: 14.90, category: 'MAIN COURSES', isVeg: true },
  { id: '16', name: 'Chicken Makhni', desc: 'Hähnchen in cremiger Butter-Tomaten-Sauce', price: 17.90, category: 'MAIN COURSES', isVeg: false },
  { id: '17', name: 'Taj Mahal Kabab', desc: 'Mariniertes Hähnchenfleisch, über Holzkohle gegrillt', price: 18.90, category: 'MAIN COURSES', isVeg: false },
];

export default function HomePage() {
  const { t } = useTranslation();
  const { addToCart } = useCart(); // Initialize addToCart function from context
  const [menu, setMenu] = useState([]);
  const [activeMenuTab, setActiveMenuTab] = useState('APPETIZERS');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    API.get('/menu')
      .then(res => {
        const all = res.data.flatMap(cat => cat.dishes.map(d => ({ ...d, category: cat.category.toUpperCase() })));
        setMenu(all.length > 0 ? all : FALLBACK_MENU);
      })
      .catch(() => {
        console.log("Error fetching menu, using fallback");
        setMenu(FALLBACK_MENU);
      });
  }, []);

  const testimonials = [
    { quote: "The most authentic Indian food I've had in Oldenburg. The tandoori chicken is simply unforgettable. We've been coming here for years and it never disappoints.", author: "Sarah M., Oldenburg" },
    { quote: "Incredible flavors, warm service, and a beautiful atmosphere. We celebrated our anniversary here and the staff went above and beyond. The lamb rogan josh is a must-try!", author: "Michael K., Bremen" },
    { quote: "Finally, a restaurant that doesn't shy away from real spices! The Butter Chicken is perfectly balanced. The delivery was fast and the food arrived piping hot.", author: "Priya R., Oldenburg" }
  ];

  const filteredMenu = menu.filter(item => item.category === activeMenuTab);

  return (
    <>
      {/* HERO */}
      <section className="hero-section" style={{ position: 'relative', paddingBottom: '120px' }}>
        <div className="hero-bg">
          <img src="/hero.webp" alt="Taj Mahal Restaurant" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2560&q=85"} />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>★</span> {t('hero.badge')}
          </div>
          <h1 className="hero-title">
            {t('hero.title1')} <span className="shimmer-text">{t('hero.title2')}</span><br />
            <em>{t('hero.title3')}</em>
          </h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          
          <div className="hero-actions custom-hero-actions">
            <a href="#reserve" className="btn btn-hero-primary">Reserve a Table</a>
            <Link to="/order" className="btn btn-hero-outline">Go to Menu</Link>
            <Link to="/order" className="btn btn-hero-wide">
              <span className="wide-btn-top">Order Online</span>
              <span className="wide-btn-bottom">10% off Pickup • 5% off Delivery</span>
            </Link>
          </div>
        </div>

        {/* FLOATING LOCATION CARD */}
        <div className="floating-location-card">
          <h2 className="floating-card-title">HOW TO FIND US</h2>
          <div className="floating-card-details">
            <p>Bioherfelder Str. 66</p>
            <p>26129 Oldenburg</p>
            <p>0441 18005527</p>
          </div>
          <div className="floating-card-actions">
            <a href="https://maps.google.com/?q=Bioherfelder+Str.+66+26129+Oldenburg" target="_blank" rel="noreferrer" className="floating-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ROUTE
            </a>
            <a href="tel:+4944118005527" className="floating-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              CALL
            </a>
          </div>
          <div className="floating-card-status">
            <span className="floating-status-dot"></span>
            <span>Open now - today until 11 pm</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              <span>✦ Authentic Indian Cuisine</span>
              <span>✦ Tandoori Specialties</span>
              <span>✦ Freshly Baked Naan</span>
              <span>✦ Vegan & Vegetarian Options</span>
              <span>✦ 10% Off Pickup</span>
              <span>✦ 5% Off Delivery</span>
              <span>✦ Open 7 Days a Week</span>
            </div>
          ))}
        </div>
      </div>

      <div className="main-wrapper">
        {/* OFFERS */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">{t('offers.kicker')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t('offers.title') }} />
              <p className="lead">{t('offers.desc')}</p>
              <div className="offers-inline">
                <div><strong>10%</strong><span>{t('offers.pickup')}</span></div>
                <div><strong>5%</strong><span>{t('offers.delivery')}</span></div>
              </div>
              <Link to="/order" className="btn btn-primary" style={{ marginTop: '2rem' }}>{t('offers.btn')}</Link>
            </div>
            <div className="card-image"><img src="/gastraum-800.webp" alt="Restaurant" /></div>
          </div>
        </div>

        {/* HOURS */}
        <div className="card">
          <div className="card-grid reverse">
            <div className="card-text">
              <span className="kicker">{t('hours.kicker')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t('hours.title') }} />
              <p className="lead">{t('hours.desc')}</p>
              
              <div className="modern-timetable">
                {[
                  { day: 'Monday', isActive: false },
                  { day: 'Tuesday', isActive: true },
                  { day: 'Wednesday', isActive: false },
                  { day: 'Thursday', isActive: false },
                  { day: 'Friday', isActive: false },
                  { day: 'Saturday', isActive: false },
                  { day: 'Sunday', isActive: false },
                ].map((item, index) => (
                  <div key={index} className={`timetable-row ${item.isActive ? 'active' : ''}`}>
                    {item.isActive && <span className="active-arrow">▶</span>}
                    <span className="timetable-day">{item.day}</span>
                    <span className="dotted-leader"></span>
                    <span className="timetable-time">12-15 and 17:30-23</span>
                  </div>
                ))}
                <div className="timetable-row contact-row">
                  <span className="timetable-day">PHONE</span>
                  <span className="dotted-leader"></span>
                  <span className="timetable-time">0441 18005527</span>
                </div>
                <div className="timetable-row contact-row">
                  <span className="timetable-day">EMAIL</span>
                  <span className="dotted-leader"></span>
                  <span className="timetable-time">info@tajmahal-oldenburg.de</span>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'gray', marginTop: '1.5rem', fontStyle: 'italic' }}>
                {t('hours.note')}
              </p>
            </div>
            <div className="card-image"><img src="/gericht-chicken-makhni-800.webp" alt="Hours" /></div>
          </div>
        </div>

        {/* SPECIALTIES */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">{t('specials.kicker')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t('specials.title') }} />
              <p className="lead">{t('specials.desc')}</p>
            </div>
            <div className="card-content-grid">
              {[
                { name: 'Taj Mahal Kabab', price: '18,90', img: '/gericht-grill-800.webp', tag: 'Bestseller', desc: 'Tender chicken, marinated in spices and grilled over charcoal.' },
                { name: 'Chicken Makhni', price: '17,90', img: '/gericht-chicken-makhni-800.webp', tag: 'Classic', desc: 'Chicken in creamy butter-tomato sauce with Indian spices.' },
                { name: 'Matar-Paneer', price: '14,90', img: '/gericht-matar-paneer-800.webp', tag: 'Vegetarian', desc: 'Indian cheese and green peas in a spicy tomato curry sauce.' },
              ].map((s, i) => (
                <div key={i} className="mini-specialty">
                  <img src={s.img} alt={s.name} />
                  <div>
                    <h4>{s.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'gray', marginBottom: '4px' }}>{s.desc}</p>
                    <span className="price-tag">€{s.price}</span>
                    <span className="tag-label">{s.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="card menu-card">
          <div className="card-grid reverse">
            
            {/* LEFT SIDE: Text Content */}
            <div className="card-text">
              <span className="kicker">{t('menu.kicker')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t('menu.title') }} />
              <p className="lead">{t('menu.desc')}</p>
              <Link to="/order" className="btn btn-primary" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
                {t('menu.btn')}
              </Link>
            </div>

            {/* RIGHT SIDE: Menu Tabs and Grid */}
            <div className="menu-content-wrapper">
              
              {/* TABS */}
              <div className="menu-tabs" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
                {['APPETIZERS', 'SOUPS AND SALADS', 'MAIN COURSES'].map((tab) => (
                  <button 
                    key={tab}
                    className={`menu-tab-btn ${activeMenuTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveMenuTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* CATEGORY HEADER */}
              <div className="menu-category-header">
                <div className="menu-icon-wrapper">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2b2438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                </div>
                <div>
                    <h3 className="menu-category-title">{activeMenuTab.charAt(0) + activeMenuTab.slice(1).toLowerCase()}</h3>
                    <p className="menu-dish-count">{filteredMenu.length} DISHES</p>
                </div>
              </div>

              {/* MENU GRID */}
              <div className="menu-grid">
                {filteredMenu.map(item => (
                  <div key={item.id} className="menu-grid-item">
                    <div className="menu-item-header">
                      <h4 className="menu-item-name">{item.name}</h4>
                      {item.isVeg && <span className="veg-badge">V</span>}
                      <span className="menu-dotted-leader"></span>
                      <span className="menu-item-price">{item.price.toFixed(2)} €</span>
                      
                      {/* ADD TO CART BUTTON */}
                      <button 
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        className="menu-add-btn"
                        aria-label={`Add ${item.name} to cart`}
                        title="Add to cart"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>

                    </div>
                    <p className="menu-item-desc">{item.desc || item.description}</p>
                  </div>
                ))}
              </div>

              {/* DISCLAIMER */}
              <div className="menu-disclaimer" style={{ textAlign: 'left', marginTop: '1.5rem' }}>
                <p>V = vegetarian · Status: tajmahal-oldenburg.de</p>
                <p>The menu in the restaurant applies.</p>
              </div>
            </div>

          </div>
        </div>

        {/* COZY */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">{t('cozy.kicker')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t('cozy.title') }} />
              <p className="lead">{t('cozy.desc1')}</p>
              <p className="lead" style={{ marginTop: '1rem' }}>{t('cozy.desc2')}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--burgundy)', textAlign: 'right', marginTop: '1rem' }}>{t('cozy.sign')}</p>
            </div>
            <div className="card-image"><img src="/gastraum-800.webp" alt="Interior" /></div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="card">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="kicker">{t('testimonials.kicker')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t('testimonials.title') }} />
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: 'var(--burgundy)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
              <p style={{ fontWeight: 'bold' }}>— {testimonials[activeTestimonial].author}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '2rem' }}>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESERVE */}
        <div className="card" id="reserve">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">{t('reserve.kicker')}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t('reserve.title') }} />
              <p className="lead">{t('reserve.desc')}</p>
              <form className="reserve-form" onSubmit={(e) => { e.preventDefault(); alert('Reservation sent!'); }}>
                <input type="text" placeholder={t('reserve.name')} required />
                <input type="tel" placeholder={t('reserve.phone')} required />
                <input type="email" placeholder={t('reserve.email')} required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="date" required />
                  <input type="time" required />
                </div>
                <input type="number" placeholder={t('reserve.guests')} min="1" max="20" required />
                <button type="submit" className="btn btn-primary btn-shimmer">{t('reserve.submit')}</button>
              </form>
            </div>
            <div className="card-image"><img src="/aussen-800.webp" alt="Restaurant outside" /></div>
          </div>
        </div>
      </div>
    </>
  );
}