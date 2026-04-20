import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, cartTotal, isOpen, closeCart, removeItem, updateQty, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckoutNav = () => {
    if (items.length === 0) return;
    closeCart();
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--visible' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            <ShoppingBag size={20} />
            Your Bag
          </h2>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your bag is empty.</p>
              <span>Add something amazing.</span>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrap">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${(item.price * item.qty).toLocaleString()}</p>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span className="cart-total-value">${cartTotal.toLocaleString()}</span>
            </div>
            <p className="cart-tax-note">Tax and shipping calculated at checkout.</p>
            <button 
              className="cart-checkout-btn" 
              onClick={handleCheckoutNav}
            >
              Check Out
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
