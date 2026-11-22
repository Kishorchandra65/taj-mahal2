import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useTranslation } from 'react-i18next';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { t } = useTranslation();
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

  // --- PAYPAL LOGIC ---
  const createPayPalOrder = async () => {
    try {
      // Tell backend to create an order for the cart total
      const res = await API.post('/create-paypal-order', { amount: cartTotal });
      return res.data.id; // Return the PayPal order ID
    } catch (error) {
      console.error("Error creating PayPal order", error);
      alert("Could not initiate PayPal payment. Please try again.");
      throw error;
    }
  };

  const onPayPalApprove = async (data, actions) => {
    try {
      // 1. Capture the payment (Optional, but recommended for production)
      // await actions.order.capture(); 
      
      // 2. Save the order to our database
      const orderItems = cart.map(item => ({
        dish_name: item.name,
        price: item.price,
        quantity: item.quantity,
        note: item.note || ""
      }));

      const finalOrderData = {
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        total_amount: cartTotal,
        payment_method: "paypal",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert(t('checkout.emptyCart'));

    // Only process COD here. PayPal is handled by the PayPalButtons component.
    if (formData.paymentMethod === 'cod') {
      setLoading(true);
      try {
        const orderItems = cart.map(item => ({
          dish_name: item.name,
          price: item.price,
          quantity: item.quantity,
          note: item.note || ""
        }));

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
        setLoading(false);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="main-wrapper" style={{ textAlign: 'center', marginTop: '5rem', minHeight: '60vh' }}>
        <h2>{t('checkout.emptyCart')}</h2>
        <button onClick={() => navigate('/order')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {t('checkout.goToMenu')}
        </button>
      </div>
    );
  }

  return (
    <div className="main-wrapper" style={{ marginTop: '4rem', maxWidth: '800px' }}>
      <div className="card" style={{ minHeight: 'auto', padding: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
          {t('checkout.title')}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Customer Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                {t('checkout.fullName')}
              </label>
              <input 
                type="text" name="name" required 
                value={formData.name} onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                {t('checkout.phoneNumber')}
              </label>
              <input 
                type="tel" name="phone" required 
                value={formData.phone} onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              {t('checkout.deliveryAddress')}
            </label>
            <textarea 
              name="address" required rows="3"
              value={formData.address} onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} 
            />
          </div>

          {/* Payment Method */}
          <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem' }}>{t('checkout.paymentMethod')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="radio" name="paymentMethod" value="cod" 
                  checked={formData.paymentMethod === 'cod'} onChange={handleChange} 
                />
                <span>{t('checkout.cod')}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="radio" name="paymentMethod" value="paypal" 
                  checked={formData.paymentMethod === 'paypal'} onChange={handleChange} 
                />
                <span>PayPal</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>{t('checkout.orderSummary')}</h4>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <span>{t('checkout.total')}</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* CONDITIONAL RENDER: COD Button vs PayPal Buttons */}
          {formData.paymentMethod === 'cod' ? (
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
              {loading ? t('checkout.processing') : `${t('checkout.placeOrder')} (€${cartTotal.toFixed(2)})`}
            </button>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {/* IMPORTANT: Replace YOUR_PAYPAL_CLIENT_ID with your actual Sandbox Client ID */}
              <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID", currency: "EUR" }}>
                <PayPalButtons 
                  style={{ layout: "vertical", shape: "rect", label: "pay" }}
                  createOrder={createPayPalOrder}
                  onApprove={onPayPalApprove}
                  onError={(err) => {
                    console.error("PayPal Checkout Error", err);
                    alert("An error occurred with PayPal. Please try again.");
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}