export default function PrivacyPage() {
  return (
    <div className="main-wrapper">
      <div className="card">
        <span className="kicker">Legal</span>
        <h2>Privacy <em>Policy</em></h2>
        <p className="lead">Privacy Policy according to the GDPR – EU General Data Protection Regulation</p>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>1. Name and address of the controller</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            The company <strong>Tajmahal</strong><br />
            Bloherfelder Str. 66, 26129 Oldenburg<br />
            represented by the Managing Director Mr. Baljinder Singh<br />
            Tel: +4944118039042<br />
            E-Mail: bagaoldenburg@gmail.com
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>2. Cookies</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            The website uses cookies. These are small files that your browser automatically creates and which are stored on your device. Cookies do not cause any damage to your device.
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>3. Use of Google Analytics</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            We use Google Analytics, a web analysis service of Google Ireland Ltd. The information obtained via cookies about the use of our online services is usually transmitted to Google servers in Ireland and stored there.
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>4. Your Rights</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            You have the right to information (Art. 15 GDPR), correction (Art. 16 GDPR), deletion (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR) and objection (Art. 21 GDPR).
          </p>
        </div>
      </div>
    </div>
  );
}