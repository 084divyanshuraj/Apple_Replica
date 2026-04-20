import { useCart } from '../context/CartContext';
import './IPhone.css';

const IPHONE_PRODUCTS = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 999,
    image: '/images/iphone_15_pro_hero_1773639940525.png',
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15 & 15 Plus',
    price: 799,
    image: '/images/iphone_15_plus_1773640946264.png',
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    price: 429,
    image: '/images/iphone_se_1773640913824.png',
  },
];

export default function IPhone() {
  const { addItem } = useCart();

  return (
    <div className="product-page iphone-page animate-fade-in">
      
      <nav className="local-nav">
        <div className="local-nav-content">
          <div className="local-nav-title">iPhone</div>
          <div className="local-nav-menu">
            <a href="#iphone-15-pro" className="active">iPhone 15 Pro</a>
            <a href="#iphone-15">iPhone 15</a>
            <a href="#iphone-se">iPhone SE</a>
          </div>
        </div>
      </nav>

      {/* iPhone 15 Pro */}
      <section id="iphone-15-pro" className="product-hero dark-theme">
        <div className="hero-content">
          <h1 className="product-headline">iPhone 15 Pro</h1>
          <p className="product-subhead">Titanium. So strong. So light. So Pro.</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontSize: '17px' }}>From $999</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(IPHONE_PRODUCTS[0])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/iphone_15_pro_hero_1773639940525.png" alt="iPhone 15 Pro" className="product-hero-image" />
        </div>
      </section>

      {/* iPhone 15 Plus & Normal */}
      <section id="iphone-15" className="product-hero light-theme" style={{height: '90vh', background: '#f5f5f7'}}>
        <div className="hero-content">
          <h1 className="product-headline">iPhone 15 &amp; 15 Plus</h1>
          <p className="product-subhead">Newphoria.</p>
          <p style={{ color: '#6e6e73', marginBottom: '16px', fontSize: '17px' }}>From $799</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(IPHONE_PRODUCTS[1])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/iphone_15_plus_1773640946264.png" alt="iPhone 15 Plus" className="product-hero-image" style={{objectFit: 'contain', width: '60%', marginTop: '5vh'}}/>
        </div>
      </section>

      {/* iPhone SE */}
      <section id="iphone-se" className="product-hero dark-theme" style={{height: '90vh'}}>
        <div className="hero-content">
          <h1 className="product-headline">iPhone SE</h1>
          <p className="product-subhead">Serious power. Serious value.</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontSize: '17px' }}>From $429</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(IPHONE_PRODUCTS[2])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/iphone_se_1773640913824.png" alt="iPhone SE" className="product-hero-image" style={{objectFit: 'contain', width: '50%', marginTop: '5vh'}} />
        </div>
      </section>
      
    </div>
  );
}
