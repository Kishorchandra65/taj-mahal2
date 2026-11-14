import { useState } from 'react';
import API from '../api/axios';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Could not send. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="main-wrapper">

        {/* INTRO (Centered) */}
        <div className="card" style={{ textAlign: 'center', minHeight: 'auto', padding: '4rem 2rem' }}>
          <span className="kicker">Contact</span>
          <h2>Get in <em>Touch</em></h2>
          <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
            We'd love to hear from you. Whether for a reservation, an order or a special event — our team is here for you.
          </p>
        </div>

        {/* INFO + MAP (Text Left, Map Right) */}
        <div className="card">
          <div className="card-grid">
            <div className="card-text">
              <span className="kicker">Visit Us</span>
              <h2>Find <em>us here</em></h2>
              <ul className="hours-list">
                <li><span>Address</span><span>Bloherfelder Str. 66, 26129 Oldenburg</span></li>
                <li><span>Phone</span><span><a href="tel:+4944118005527">0441 18005527</a></span></li>
                <li><span>Email</span><span>info@tajmahal-oldenburg.de</span></li>
                <li><span>Lunch</span><span>12:00 – 15:00</span></li>
                <li><span>Dinner</span><span>17:30 – 23:00</span></li>
              </ul>
            </div>
            <div className="card-image" style={{ minHeight: '350px' }}>
              <iframe
                src="https://www.google.com/maps?q=Bloherfelder+Str.+66,+26129+Oldenburg&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '16px' }}
                loading="lazy"
                title="Map"
              />
            </div>
          </div>
        </div>

        {/* FORM (Text Left, Form Right) */}
        <div className="card">
          <div className="card-grid reverse">
            <div className="card-text">
              <span className="kicker">Message</span>
              <h2>Send us a <em>message</em></h2>
              <p className="lead">
                Fill out the form and our team will get back to you as soon as possible.
              </p>
            </div>
            <div className="card-text">
              {submitted ? (
                <p className="lead" style={{ color: 'green', fontWeight: 'bold' }}>✓ Thank you! We will reply soon.</p>
              ) : (
                <form className="reserve-form" onSubmit={handleSubmit}>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" required />
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows="5" required style={{ padding: '16px 20px', borderRadius: '8px', border: '1px solid rgba(10,10,10,0.15)', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', fontSize: '1rem' }} />
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}