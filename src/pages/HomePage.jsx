import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import API from '../api/axios';

export default function HomePage() {
  const { t } = useTranslation();
  const [menu, setMenu] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    API.get('/menu')
      .then(res => {
        const all = res.data.flatMap(cat => cat.dishes.map(d => ({ ...d, category: cat.category })));
        setMenu(all);
      })
      .catch(() => console.log("Error fetching menu"));
  }, []);

  const testimonials = [
    { quote: "The most authentic Indian food I've had in Oldenburg. The tandoori chicken is simply unforgettable. We've been coming here for years and it never disappoints.", author: "Sarah M., Oldenburg" },
    { quote: "Incredible flavors, warm service, and a beautiful atmosphere. We celebrated our anniversary here and the staff went above and beyond. The lamb rogan josh is a must-try!", author: "Michael K., Bremen" },
    { quote: "Finally, a restaurant that doesn't shy away from real spices! The Butter Chicken is perfectly balanced. The delivery was fast and the food arrived piping hot.", author: "Priya R., Oldenburg" }
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
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
          <div className="hero-actions">
            <Link to="/order" className="btn btn-primary btn-shimmer">{t('hero.orderBtn')}</Link>
            <a href="#reserve" className="btn btn-outline">{t('hero.reserveBtn')}</a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              <span>✦ Taj Mahal</span>
              <span>✦ Starters</span>
              <span>✦ Soups and Salads</span>
              <span>✦ Main Courses</span>
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
              <h2><Trans i18nKey="offers.title">Save on your <em>next feast</em></Trans></h2>
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
              <h2><Trans i18nKey="hours.title">Opening <em>hours</em></Trans></h2>
              <p className="lead">{t('hours.desc')}</p>
              <ul className="hours-list">
                <li><span>{t('hours.days')}</span><span>{t('hours.time')}</span></li>
                <li><span>{t('hours.phone')}</span><span>0441 18005527</span></li>
                <li><span>{t('hours.email')}</span><span>info@tajmahal-oldenburg.de</span></li>
              </ul>
              <p style={{ fontSize: '0.8rem', color: 'gray', marginTop: '1rem', fontStyle: 'italic' }}>{t('hours.note')}</p>
            </div>
            <div className="card-image"><img src="/gericht-chicken-makhni-800.webp" alt="Hours" /></div>
          </div>
        </div>

        {/* SPECIALTIES */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">{t('specials.kicker')}</span>
              <h2><Trans i18nKey="specials.title">From the Tandoori <em>and the Curry Pan</em></Trans></h2>
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
        <div className="card">
          <div className="card-grid reverse">
            <div className="card-text">
              <span className="kicker">{t('menu.kicker')}</span>
              <h2><Trans i18nKey="menu.title">Our <em>Menu</em></Trans></h2>
              <p className="lead">{t('menu.desc')}</p>
              <Link to="/order" className="btn btn-primary" style={{ marginTop: '1rem' }}>{t('menu.btn')}</Link>
            </div>
            <div className="card-content-list">
              {menu.slice(0, 4).map(item => (
                <div key={item.id} className="list-item">
                  {item.image_url && (
                    <img src={item.image_url.startsWith('http') ? item.image_url : `http://127.0.0.1:8000${item.image_url}`} alt={item.name} />
                  )}
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <span className="price-tag">€{item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COZY */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">{t('cozy.kicker')}</span>
              <h2><Trans i18nKey="cozy.title">Cozy and <em>Traditional</em></Trans></h2>
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
            <h2><Trans i18nKey="testimonials.title">What our <em>guests say</em></Trans></h2>
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
              <h2><Trans i18nKey="reserve.title">Book <em>your table</em></Trans></h2>
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