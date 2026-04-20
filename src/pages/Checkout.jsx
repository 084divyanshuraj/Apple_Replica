import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder, addOrderItem } from '../services/api';
import './Checkout.css';

export default function Checkout() {
  const { user } = useAuth();
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('Apple Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // If no user, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { redirectTo: '/checkout' } });
    } else if (items.length === 0 && !orderSuccess) {
      navigate('/store'); // Can't checkout empty cart
    }
  }, [user, items.length, navigate, orderSuccess]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create order
      const orderRes = await createOrder({
        user_id: user.user_id,
        total_amount: cartTotal,
        status: 'Processing'
      });

      // 2. Add items
      for (const item of items) {
        const productId = parseInt(item.id) || 1;
        await addOrderItem({
          order_id: orderRes.order_id,
          product_id: productId,
          quantity: item.qty,
          price: item.price
        });
      }

      setOrderId(orderRes.order_id);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Order failed:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-page animate-fade-in">
        <div className="checkout-success-container">
          <div className="check-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="checkout-success-title">Thank you for your order!</h1>
          <p className="checkout-success-subtitle">Order #{orderId} is being processed.</p>
          <p className="checkout-success-message">
            We will send a confirmation to <strong>{user?.email}</strong> shortly.
          </p>
          <button className="btn-primary back-to-store-btn" onClick={() => navigate('/store')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Prevent flash before redirect
  if (!user || items.length === 0) return null;

  const tax = cartTotal * 0.08; // Fake 8% tax
  const finalTotal = cartTotal + tax;

  return (
    <div className="checkout-page animate-fade-in">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Show us the money.</p>
      </div>

      <div className="checkout-container">
        {/* Left Column: Form */}
        <div className="checkout-form-section">
          <h2>How would you like to pay?</h2>
          
          <div className="payment-options">
            <div 
              className={`payment-option ${paymentMethod === 'Apple Pay' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('Apple Pay')}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.32 15.65h-1v-2h-2v-1h2v-2h1v2h2v1h-2v2zM10.1 11.1c-.24.52-.77.8-1.32.8-.74 0-1.25-.43-1.63-.8.25-.97.87-1.6 1.63-1.6.45 0 .94.25 1.32.8.2.3-.2.8.3 1.2z" />
              </svg>
              <span>Apple Pay</span>
            </div>
            <div 
              className={`payment-option ${paymentMethod === 'Credit Card' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('Credit Card')}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <span>Credit Card</span>
            </div>
          </div>

          <form className="checkout-details-form" onSubmit={handlePlaceOrder}>
            <h3>Shipping Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={user.full_name} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" defaultValue={user.email} required disabled />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" defaultValue={user.address || ''} placeholder="123 Apple Park Way" required />
            </div>

            {paymentMethod === 'Credit Card' && (
              <div className="credit-card-details animate-fade-in">
                <h3>Card Details</h3>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" required />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <label>Expiration</label>
                    <input type="text" placeholder="MM/YY" required />
                  </div>
                  <div className="form-group half">
                    <label>CVV</label>
                    <input type="text" placeholder="123" required />
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary checkout-submit-btn" disabled={isProcessing}>
              {isProcessing ? 'Processing Payment...' : `Pay $${finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
            </button>
          </form>
        </div>

        {/* Right Column: Summary */}
        <div className="checkout-summary-section">
          <h3>Order Summary</h3>
          <div className="checkout-items-list">
            {items.map(item => (
              <div key={item.id} className="checkout-summary-item">
                <div className="item-img-placeholder">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.qty}</p>
                </div>
                <div className="item-price">${(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="checkout-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total-row">
              <span>Estimated Tax</span>
              <span>${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="total-row final-total">
              <span>Total</span>
              <span>${finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
