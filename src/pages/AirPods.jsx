import { useCart } from '../context/CartContext';
import './IPhone.css'; // Reusing base product page styles

const AIRPODS_PRODUCT = {
  id: 'airpods-pro',
  name: 'AirPods Pro',
  price: 249,
  image: '/images/airpods_pro_1773640820247.png',
};

export default function AirPods() {
  const { addItem } = useCart();

  return (
    <div className="product-page airpods-page animate-fade-in">
      
      <nav className="local-nav">
        <div className="local-nav-content">
          <div className="local-nav-title">AirPods Pro</div>
          <div className="local-nav-menu">
            <a href="#overview" className="active">Overview</a>
            <a href="#specs">Tech Specs</a>
            <button className="btn-primary" style={{marginLeft: '15px'}} onClick={() => addItem(AIRPODS_PRODUCT)}>
              Add to Bag
            </button>
          </div>
        </div>
      </nav>

      <section className="product-hero dark-theme" style={{height: '100vh', backgroundColor: '#000'}}>
        <div className="hero-content">
          <h1 className="product-headline">AirPods Pro</h1>
          <p className="product-subhead">Magic like you've never heard.</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontSize: '17px' }}>From $249</p>
          <div className="cta-links" style={{marginTop: '20px'}}>
            <button className="btn-primary" onClick={() => addItem(AIRPODS_PRODUCT)}>Add to Bag</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>
        <div className="product-hero-image-container">
          <img src="/images/airpods_pro_1773640820247.png" alt="AirPods Pro" className="product-hero-image" style={{objectFit: 'contain', width: '60%', marginTop: '10vh'}} />
        </div>
      </section>

      <section className="product-feature light-theme" style={{background: '#f5f5f7'}}>
        <div className="feature-text text-center" style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
          <h2 className="feature-headline">Active Noise Cancellation.</h2>
          <p className="feature-desc" style={{margin: '0 auto'}}>Up to 2x more Active Noise Cancellation than the previous generation. Plus, Adaptive Audio dynamically blends Transparency mode and Active Noise Cancellation to tailor the noise control for you.</p>
        </div>
      </section>
    </div>
  );
}
