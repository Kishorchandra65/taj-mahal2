import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function HomePage() {
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
      {/* ═══════ HERO ═══════ */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src="/hero.webp" alt="Taj Mahal Restaurant" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2560&q=85"} />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>★</span> Indian Tandoori Restaurant · Oldenburg
          </div>
          <h1 className="hero-title">
            The Aromas of <span className="shimmer-text">India</span><br />
            <em>right in the heart of Oldenburg</em>
          </h1>
          <p className="hero-subtitle">
            Taj Mahal in Oldenburg: Indian cuisine with Tandoori, Curry and vegetarian dishes, open daily for lunch and dinner.
          </p>
          <div className="hero-actions">
            <Link to="/order" className="btn btn-primary btn-shimmer">Online Order (10% off Pickup, 5% off Delivery)</Link>
            <a href="#reserve" className="btn btn-outline">Reserve a Table</a>
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
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

      {/* ═══════ MAIN CONTENT WRAPPER ═══════ */}
      <div className="main-wrapper">
        
        {/* OFFERS (Text Left, Image Right) */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">Exclusive Offers</span>
              <h2>Save on your <em>next feast</em></h2>
              <p className="lead">
                We want you to enjoy our kitchen to the fullest. That's why we regularly offer special discounts. 
                Save on your next order and try our new specialties. Whether you pick up your food or have it delivered, 
                there's always a reason to celebrate with Taj Mahal.
              </p>
              <div className="offers-inline">
                <div><strong>10%</strong><span>Pickup</span></div>
                <div><strong>5%</strong><span>Delivery</span></div>
              </div>
              <Link to="/order" className="btn btn-primary" style={{ marginTop: '2rem' }}>Order Now</Link>
            </div>
            <div className="card-image">
              <img src="/gastraum-800.webp" alt="Restaurant" />
            </div>
          </div>
        </div>

        {/* HOURS (Image Left, Text Right) */}
        <div className="card">
          <div className="card-grid reverse">
            <div className="card-text">
              <span className="kicker">Open for You</span>
              <h2>Opening <em>hours</em></h2>
              <p className="lead">
                We are open 7 days a week for lunch and dinner. Our kitchen is always bustling with activity, 
                preparing fresh meals from 12:00 PM. Whether you're looking for a quick lunch break or a 
                leisurely dinner, we have the perfect table waiting for you.
              </p>
              <ul className="hours-list">
                <li><span>Monday - Sunday</span><span>12:00 – 15:00 & 17:30 – 23:00</span></li>
                <li><span>Phone</span><span>0441 18005527</span></li>
                <li><span>Email</span><span>info@tajmahal-oldenburg.de</span></li>
              </ul>
              <p style={{ fontSize: '0.8rem', color: 'gray', marginTop: '1rem', fontStyle: 'italic' }}>
                Online ordering lists different times (Pickup 12–15 & 17:30–22:30).
              </p>
            </div>
            <div className="card-image">
              <img src="/gericht-chicken-makhni-800.webp" alt="Hours" />
            </div>
          </div>
        </div>

        {/* SPECIALTIES (Text Left, Grid Right) */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">Our Specialties</span>
              <h2>From the Tandoori <em>and the Curry Pan</em></h2>
              <p className="lead">
                Our master chefs have dedicated their lives to perfecting the art of Indian cooking. 
                From the smoky depths of our traditional clay oven to the rich, slow-simmered gravies, 
                each dish is a masterpiece. Discover our most beloved creations.
              </p>
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

        {/* MENU PREVIEW (Image Left, List Right) */}
        <div className="card">
          <div className="card-grid reverse">
            <div className="card-text">
              <span className="kicker">The Menu</span>
              <h2>Our <em>Menu</em></h2>
              <p className="lead">
                Explore our full menu, featuring a wide variety of starters, traditional curries, 
                biryanis, and freshly baked breads. Order online for a quick pickup or let us deliver 
                the flavors of India directly to your home.
              </p>
              <Link to="/order" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Full Menu</Link>
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

        {/* COZY (Text Right, Image Left) - Added this section to match source content */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">Our Restaurant</span>
              <h2>Cozy and <em>Traditional</em></h2>
              <p className="lead">
                Inside, you sit comfortably in a traditional atmosphere, and the waiters are there for you. 
                Upon request, we also deliver or have your food ready for pickup.
              </p>
              <p className="lead" style={{ marginTop: '1rem' }}>
                At Tajmahal, we cook according to traditional Nepalese and Indian recipes. Whether mild, medium-hot, or spicy, 
                you decide how flavorful your dish will be. Enjoy Tandoori, Currys, and vegetarian dishes in a cozy atmosphere 
                with family and friends, or order online for delivery or pickup.
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--burgundy)', textAlign: 'right', marginTop: '1rem' }}>
                — Your Tajmahal Oldenburg
              </p>
            </div>
            <div className="card-image">
              <img src="/gastraum-800.webp" alt="Interior" />
            </div>
          </div>
        </div>

        {/* TESTIMONIALS (Centered) */}
        <div className="card">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="kicker">Guest Experiences</span>
            <h2>What our <em>guests say</em></h2>
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: 'var(--burgundy)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
              <p style={{ fontWeight: 'bold' }}>— {testimonials[activeTestimonial].author}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '2rem' }}>
                {testimonials.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTestimonial(i)}
                    className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESERVE (Text Left, Image Right) */}
        <div className="card" id="reserve">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">Reserve</span>
              <h2>Book <em>your table</em></h2>
              <p className="lead">
                Planning a visit? Fill in your details below and we will get back to you shortly 
                to confirm your table. We look forward to welcoming you to the Taj Mahal!
              </p>
              <form className="reserve-form" onSubmit={(e) => { e.preventDefault(); alert('Reservation sent!'); }}>
                <input type="text" placeholder="Your name" required />
                <input type="tel" placeholder="Phone number" required />
                <input type="email" placeholder="Email address" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="date" required />
                  <input type="time" required />
                </div>
                <input type="number" placeholder="Number of guests" min="1" max="20" required />
                <button type="submit" className="btn btn-primary btn-shimmer">Send Request</button>
              </form>
            </div>
            <div className="card-image">
              <img src="/aussen-800.webp" alt="Restaurant outside" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}