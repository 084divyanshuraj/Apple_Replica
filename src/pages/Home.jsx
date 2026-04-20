import './Home.css';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="home-page animate-fade-in">
      <section className="hero-module dark-theme iphone-15-pro-hero">
        <div className="hero-content">
          <h2 className="hero-headline">iPhone 15 Pro</h2>
          <p className="hero-subhead">Titanium. So strong. So light. So Pro.</p>
          <div className="cta-links">
            <Link to="/iphone" className="btn-primary">Learn more</Link>
            <Link to="/store" className="btn-secondary">Buy <ChevronRight size={14} /></Link>
          </div>
        </div>
        <div className="hero-image-container">
           <img src="/images/iphone_15_pro_hero_1773639940525.png" alt="iPhone 15 Pro" className="hero-image" />
        </div>
      </section>

      <section className="hero-module light-theme iphone-15-hero">
        <div className="hero-content">
          <h2 className="hero-headline">iPhone 15</h2>
          <p className="hero-subhead">New camera. New design. Newphoria.</p>
          <div className="cta-links">
            <Link to="/iphone" className="btn-primary">Learn more</Link>
            <Link to="/store" className="btn-secondary">Buy <ChevronRight size={14} /></Link>
          </div>
        </div>
        <div className="hero-image-container">
           <img src="/images/iphone_15_hero_1773639967666.png" alt="iPhone 15" className="hero-image" />
        </div>
      </section>

      <ProductGrid />
    </div>
  );
}
