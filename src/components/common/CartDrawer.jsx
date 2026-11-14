import { useCart } from "../../context/CartContext";


export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* The dark background overlay */}
      <div 
        className={`cart-backdrop ${isCartOpen ? 'open' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* The sliding drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Order</h3>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>Your cart is currently empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image_url?.startsWith('http') ? item.image_url : `http://127.0.0.1:8000${item.image_url}`} 
                  alt={item.name} 
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '0.2rem' }}>{item.name}</h4>
                  <p style={{ fontWeight: 'bold' }}>€{item.price.toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px 10px', cursor: 'pointer' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px 10px', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}