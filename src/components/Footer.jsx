import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-notes">
          <p>This is a demonstration project replicating the Apple website aesthetic.</p>
          <p>To view our featured products, explore the different pages using the top navigation.</p>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Shop and Learn</h3>
            <ul>
              <li><Link to="/store">Store</Link></li>
              <li><Link to="/mac">Mac</Link></li>
              <li><Link to="/iphone">iPhone</Link></li>
              <li><Link to="/watch">Watch</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Account</h3>
            <ul>
              <li><a href="#">Manage Your Apple ID</a></li>
              <li><a href="#">Apple Store Account</a></li>
              <li><a href="#">iCloud.com</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>About Apple</h3>
            <ul>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Apple Leadership</a></li>
              <li><a href="#">Career Opportunities</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <div className="footer-legal-copyright">
            Copyright © 2026 Apple Inc. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Terms of Use</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Sales and Refunds</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Legal</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Site Map</a>
          </div>
          <div className="footer-locale">United States</div>
        </div>
      </div>
    </footer>
  );
}
