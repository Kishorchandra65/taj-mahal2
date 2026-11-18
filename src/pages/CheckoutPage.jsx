import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' // Default to Cash on Delivery
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty");

    setLoading(true);

    try {
        // 1. Prepare Order Data
        const orderItems = cart.map(item => ({
        dish_name: item.name,
        price: item.price,
        quantity: item.quantity,
        note: item.note || ""
        }));

        // 2. If Razorpay, Create Order ID on Backend & Open Modal
        if (formData.paymentMethod === 'razorpay') {
        const razorpayRes = await API.post('/create-razorpay-order', { amount: cartTotal });
        const { order_id, key_id } = razorpayRes.data;

        const options = {
            key: key_id, // Test Key ID from backend
            amount: cartTotal * 100,
            currency: "INR",
            name: "Taj Mahal Oldenburg",
            description: "Food Order",
            order_id: order_id,
            handler: async function (response) {
            // This runs AFTER payment is successful
            try {
                const finalOrderData = {
                customer_name: formData.name,
                phone: formData.phone,
                address: formData.address,
                total_amount: cartTotal,
                payment_method: "razorpay",
                items: orderItems
                };
                await API.post('/orders', finalOrderData);
                alert('Payment Successful! Order placed.');
                clearCart();
                navigate('/');
            } catch (err) {
                console.error("Order save failed", err);
                alert("Payment succeeded but order failed to save. Please contact us.");
            }
            },
            prefill: {
            name: formData.name,
            contact: formData.phone,
            },
            theme: {
            color: "#d9ac51" // Your gold brand color
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        
        // Note: We don't setLoading(false) here because the handler function takes over
        // If the user closes the modal, we need to reset loading
        rzp.on('payment.failed', function (response){
            alert("Payment failed. Please try again.");
            setLoading(false);
        });
        
        return; // Stop execution here, the handler will finish the process
        }

        // 3. COD Flow (Runs immediately)
        const orderData = {
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        total_amount: cartTotal,
        payment_method: "cod",
        items: orderItems
        };

        const res = await API.post('/orders', orderData);
        if (res.status === 200) {
        alert('Order placed successfully (COD)!');
        clearCart();
        navigate('/');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to place order. Please try again.');
    } finally {
        // Only reset loading if we didn't open the Razorpay modal
        if (formData.paymentMethod !== 'razorpay') {
        setLoading(false);
        }
    }
    };



  if (cart.length === 0) {
    return (
      <div className="main-wrapper" style={{ textAlign: 'center', marginTop: '5rem', minHeight: '60vh' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/order')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="main-wrapper" style={{ marginTop: '4rem', maxWidth: '800px' }}>
      <div className="card" style={{ minHeight: 'auto', padding: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>Checkout</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Customer Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
              <input 
                type="text" name="name" required 
                value={formData.name} onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Phone Number</label>
              <input 
                type="tel" name="phone" required 
                value={formData.phone} onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Delivery Address</label>
            <textarea 
              name="address" required rows="3"
              value={formData.address} onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} 
            />
          </div>

          {/* Payment Method */}
          <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Payment Method</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="radio" name="paymentMethod" value="cod" 
                  checked={formData.paymentMethod === 'cod'} onChange={handleChange} 
                />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="radio" name="paymentMethod" value="razorpay" 
                  checked={formData.paymentMethod === 'razorpay'} onChange={handleChange} 
                />
                <span>Pay Online (Razorpay / Card)</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Order Summary</h4>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <span>Total</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
            {loading ? 'Processing...' : `Place Order (€${cartTotal.toFixed(2)})`}
          </button>
        </form>
      </div>
    </div>
  );
}