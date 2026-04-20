import { useCart } from '../context/CartContext';
import './IPhone.css';
import './IPad.css';

const IPAD_PRODUCTS = [
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro M4',
    price: 999,
    image: '/images/ipad_pro_1773640050245.png',
  },
  {
    id: 'ipad-air-m2',
    name: 'iPad Air M2',
    price: 599,
    image: '/images/ipad_air_m2.png',
  },
  {
    id: 'ipad-mini',
    name: 'iPad mini',
    price: 499,
    image: '/images/ipad_mini.png',
  },
];

export default function IPad() {
  const { addItem } = useCart();

  return (
    <div className="product-page ipad-page animate-fade-in">

      <nav className="local-nav">
        <div className="local-nav-content">
          <div className="local-nav-title">iPad</div>
          <div className="local-nav-menu">
            <a href="#ipad-pro" className="active">iPad Pro</a>
            <a href="#ipad-air">iPad Air</a>
            <a href="#ipad-mini">iPad mini</a>
          </div>
        </div>
      </nav>

      {/* iPad Pro */}
      <section id="ipad-pro" className="product-hero dark-theme ipad-hero ipad-pro-bg">
        <div className="hero-content">
          <div className="ipad-eyebrow">iPad Pro</div>
          <h1 className="product-headline ipad-headline">Outrageously powerful.</h1>
          <p className="product-subhead">The ultimate iPad experience with the M4 chip.</p>
          <p className="ipad-price">From $999</p>
          <div className="cta-links" style={{ marginTop: '24px' }}>
            <button className="btn-primary" onClick={() => addItem(IPAD_PRODUCTS[0])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container ipad-img-container">
          <img
            src="/images/ipad_pro_1773640050245.png"
            alt="iPad Pro M4"
            className="product-hero-image ipad-img"
          />
        </div>
      </section>

      {/* iPad Air */}
      <section id="ipad-air" className="product-hero light-theme ipad-hero ipad-air-bg">
        <div className="hero-content">
          <div className="ipad-eyebrow ipad-eyebrow--dark">iPad Air</div>
          <h1 className="product-headline ipad-headline ipad-headline--dark">Supercharged by M2.</h1>
          <p className="product-subhead ipad-subhead--dark">Power. Portability. Perfection.</p>
          <p className="ipad-price ipad-price--dark">From $599</p>
          <div className="cta-links" style={{ marginTop: '24px' }}>
            <button className="btn-primary" onClick={() => addItem(IPAD_PRODUCTS[1])}>Add to Bag</button>
            <button className="btn-secondary btn-secondary--dark">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container ipad-img-container">
          <img
            src="/images/ipad_air_m2.png"
            alt="iPad Air M2"
            className="product-hero-image ipad-img"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </section>

      {/* iPad mini */}
      <section id="ipad-mini" className="product-hero dark-theme ipad-hero ipad-mini-bg">
        <div className="hero-content">
          <div className="ipad-eyebrow">iPad mini</div>
          <h1 className="product-headline ipad-headline">Big power. Mini size.</h1>
          <p className="product-subhead">The perfect iPad to take everywhere.</p>
          <p className="ipad-price">From $499</p>
          <div className="cta-links" style={{ marginTop: '24px' }}>
            <button className="btn-primary" onClick={() => addItem(IPAD_PRODUCTS[2])}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container ipad-img-container">
          <img
            src="/images/ipad_mini.png"
            alt="iPad mini"
            className="product-hero-image ipad-img"
            style={{ objectFit: 'contain', width: '45%' }}
          />
        </div>
      </section>

      {/* Compare Strip */}
      <section className="ipad-compare">
        <h2 className="ipad-compare-title">Which iPad is right for you?</h2>
        <div className="ipad-compare-grid">
          {IPAD_PRODUCTS.map((p, i) => (
            <div key={p.id} className="ipad-compare-card">
              <img src={p.image} alt={p.name} className="ipad-compare-img" />
              <h3 className="ipad-compare-name">{p.name}</h3>
              <p className="ipad-compare-price">From ${p.price.toLocaleString()}</p>
              <p className="ipad-compare-desc">
                {i === 0 && 'Thinnest Apple product ever. Supercharged by M4.'}
                {i === 1 && 'Serious performance. Thin, light, and versatile.'}
                {i === 2 && 'Surprisingly capable. Amazingly compact.'}
              </p>
              <button
                className="ipad-compare-btn"
                onClick={() => addItem(p)}
              >
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
