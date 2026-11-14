export default function RevocationPage() {
  return (
    <div className="main-wrapper">
      <div className="card">
        <span className="kicker">Legal</span>
        <h2>Revocation <em>Policy</em></h2>
        <p className="lead">Contract between the restaurant and customer</p>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>1. Contract Conclusion</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            The contract between the restaurant and the customer is effectively concluded as soon as the customer places the order on the platform. After receipt of the order, Tajmahal will electronically confirm the order to the customer.
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>2. Delivery & Pickup</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            If Tajmahal delivers the order on behalf of the restaurant, Tajmahal may charge the customer for delivery costs. If the customer has the order delivered, the customer must be present at the specified delivery address.
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--burgundy)' }}>3. Right of Revocation (Widerrufsrecht)</h3>
          <p className="lead" style={{ marginTop: '1rem' }}>
            The customer cannot revoke the order to the restaurant, insofar as it is the delivery of goods that are not pre-made and for the production of which an individual selection by the consumer is decisive.
          </p>
          <p className="lead" style={{ marginTop: '1rem' }}>
            You have the right to withdraw from the contract with the restaurant within fourteen days without giving reasons. To exercise your right of withdrawal, you must contact Tajmahal, Bloherfelder Str. 66, 26129 Oldenburg, Owner: Mr. Baljinder Singh, E-Mail: bagaoldenburg@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}