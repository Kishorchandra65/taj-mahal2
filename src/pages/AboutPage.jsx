export default function AboutPage() {
  return (
    <>
      <div className="main-wrapper">

        {/* INTRO (Text Left, Image Right) */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">About Us</span>
              <h2>Welcome to <em>Tajmahal</em> Oldenburg</h2>
              <p className="lead">
                Our restaurant "Tajmahal" offers Indian cuisine. We welcome our guests warmly! 
                Located in the heart of Oldenburg, we have been serving authentic Indian food 
                for generations, bringing the true flavors of India to your table.
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--burgundy)', marginTop: '1rem' }}>
                — Your Tajmahal Oldenburg
              </p>
            </div>
            <div className="card-image">
              <img src="/gastraum-800.webp" alt="Taj Mahal Restaurant Interior" />
            </div>
          </div>
        </div>

        {/* CERTIFICATE (Image Left, Text Right) */}
        <div className="card">
          <div className="card-grid reverse">
            <div className="card-text">
              <span className="kicker">Recommended</span>
              <h2>Restaurant <em>Guru 2022</em></h2>
              <p className="lead">
                We use traditional Nepalese and Indian spices and recipes for cooking our food. 
                You will experience originality in our food.
              </p>
              <p className="lead">
                Our team will ensure that you receive your food on time, whether you dine in 
                with us, pick up your order, or have it delivered to your home.
              </p>
            </div>
            <div className="card-image" style={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/RestaurantGuru_Certificate.png" 
                alt="Restaurant Guru Certificate 2022" 
                style={{ width: '100%', maxWidth: '350px', height: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>

        {/* PHILOSOPHY (Text Left, Grid Right) */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">Our Philosophy</span>
              <h2>The Four <em>Pillars</em></h2>
              <p className="lead">
                Our approach to cooking is based on four core principles that guide everything 
                we do. From the quality of our ingredients to the speed of our service, 
                we never compromise.
              </p>
            </div>
            <div className="card-content-grid">
              {[
                { icon: '😋', title: 'Super Taste', desc: 'Fresh, vibrant, invigorating flavors.' },
                { icon: '🏃', title: 'Fast Waiters', desc: 'Our waiters are always there for you.' },
                { icon: '📊', title: 'Quality Guarantee', desc: 'The best quality at the lowest prices.' },
                { icon: '📍', title: "We're In", desc: 'A small piece of India in Oldenburg.' },
              ].map((p, i) => (
                <div key={i} className="mini-specialty">
                  <span style={{ fontSize: '2.5rem' }}>{p.icon}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'gray', marginTop: '4px' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}