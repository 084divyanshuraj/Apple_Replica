import { Link } from 'react-router-dom';
import { Apple, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { cartCount, toggleCart } = useCart();

  return (
    <header className="global-header">
      <div className="header-container">
        <nav className="header-nav">
          <ul className="header-list">
            <li>
              <Link to="/" className="header-link apple-logo">
                <Apple size={18} fill="currentColor" strokeWidth={0} />
              </Link>
            </li>
            <li><Link to="/store" className="header-link">Store</Link></li>
            <li><Link to="/mac" className="header-link">Mac</Link></li>
            <li><Link to="/iphone" className="header-link">iPhone</Link></li>
            <li><Link to="/watch" className="header-link">Watch</Link></li>
            <li><Link to="/vision" className="header-link">Vision</Link></li>
            <li><Link to="/airpods" className="header-link">AirPods</Link></li>
            <li><Link to="/ipad" className="header-link">iPad</Link></li>
            <li><Link to="/tv-home" className="header-link">TV &amp; Home</Link></li>
            <li><Link to="/entertainment" className="header-link">Entertainment</Link></li>
            <li><Link to="/reviews" className="header-link">Reviews</Link></li>
            <li><Link to="/accessories" className="header-link">Accessories</Link></li>
            <li><Link to="/support" className="header-link">Support</Link></li>

            <li className="header-icon">
              <button className="header-link btn-icon" aria-label="Search">
                <Search size={16} />
              </button>
            </li>
            <li className="header-icon">
              <button
                className="header-link btn-icon cart-btn"
                aria-label="Shopping Bag"
                onClick={toggleCart}
              >
                <span className="cart-icon-wrapper">
                  <ShoppingBag size={16} />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                  )}
                </span>
              </button>
            </li>
            <li className="header-icon">
              <Link to="/login" className="header-link btn-icon" aria-label="Login">
                <User size={16} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
