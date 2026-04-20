import { useCart } from '../context/CartContext';
import './IPhone.css'; // Reusing some product page styles

const MAC_PRODUCTS = [
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    price: 1599,
    image: '/images/macbook_pro_m3_1773640027248.png',
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air',
    price: 1099,
    image: '/images/macbook_air_m3_1773640846488.png',
  },
  {
    id: 'imac',
    name: 'iMac',
    price: 1299,
    image: '/images/imac_24_1773640887879.png',
  },
];

export default function Mac() {
  const { addItem } = useCart();

  return (
    <div className="product-page mac-page animate-fade-in">
      
      <nav className="local-nav">
        <div className="local-nav-content">
          <div className="local-nav-title">Mac</div>
          <div className="local-nav-menu">
            <a href="#macbook-pro" className="active">MacBook Pro</a>
            <a href="#macbook-air">MacBook Air</a>
            <a href="#imac">iMac</a>
          </div>
        </div>
      </nav>

      {/* MacBook Pro Section */}
      <section id="macbook-pro" className="product-hero dark-theme" style={{height: '90vh'}}>
        <div className="hero-content">
          <h1 className="product-headline">MacBook Pro</h1>
          <p className="product-subhead">Mind-blowing. Head-turning.</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontSize: '17px' }}>From $1,599</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(MAC_PRODUCTS[0])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/macbook_pro_m3_1773640027248.png" alt="MacBook Pro" className="product-hero-image" style={{objectFit: 'cover', transform: 'scale(1)', width: '80%', marginTop: '5vh'}} />
        </div>
      </section>

      {/* MacBook Air Section */}
      <section id="macbook-air" className="product-hero light-theme" style={{height: '90vh'}}>
        <div className="hero-content">
          <h1 className="product-headline">MacBook Air</h1>
          <p className="product-subhead">Lean. Mean. M3 machine.</p>
          <p style={{ color: '#6e6e73', marginBottom: '16px', fontSize: '17px' }}>From $1,099</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(MAC_PRODUCTS[1])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/macbook_air_m3_1773640846488.png" alt="MacBook Air" className="product-hero-image" style={{objectFit: 'contain', width: '70%', marginTop: '10vh'}} />
        </div>
      </section>

      {/* iMac Section */}
      <section id="imac" className="product-hero light-theme" style={{height: '90vh', background: '#f5f5f7'}}>
        <div className="hero-content">
          <h1 className="product-headline">iMac</h1>
          <p className="product-subhead">Packed with more juice.</p>
          <p style={{ color: '#6e6e73', marginBottom: '16px', fontSize: '17px' }}>From $1,299</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(MAC_PRODUCTS[2])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/imac_24_1773640887879.png" alt="iMac" className="product-hero-image" style={{objectFit: 'contain', width: '60%', marginTop: '5vh'}} />
        </div>
      </section>

    </div>
  );
}
