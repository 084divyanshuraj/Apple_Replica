import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import './ProductGrid.css';

export default function ProductGrid() {
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setDbProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const products = [
    {
      id: 'watch',
      title: 'Apple Watch',
      subtitle: 'Series 9',
      desc: 'Smarter. Brighter. Mightier.',
      image: '/images/apple_watch_series_9_1773640008555.png',
      link: '/watch',
      dark: true
    },
    {
      id: 'mac',
      title: 'MacBook Pro',
      subtitle: 'Mind-blowing. Head-turning.',
      desc: '',
      image: '/images/macbook_pro_m3_1773640027248.png',
      link: '/mac',
      dark: true
    },
    {
      id: 'ipad',
      title: 'iPad Pro',
      subtitle: 'Supercharged by M2.',
      desc: '',
      image: '/images/ipad_pro_1773640050245.png',
      link: '/store',
      dark: true
    }
  ];

  return (
    <>
      <section className="product-grid">
        {products.map(product => (
          <div key={product.id} className={`grid-item ${product.dark ? 'dark-theme' : 'light-theme'}`}>
            <div className="grid-content">
              <h3 className="grid-title">{product.title}</h3>
              {product.subtitle && <h4 className="grid-subtitle">{product.subtitle}</h4>}
              {product.desc && <p className="grid-desc">{product.desc}</p>}
              <div className="cta-links">
                <Link to={product.link} className="btn-primary">Learn more</Link>
                <Link to="/store" className="btn-secondary">Buy <ChevronRight size={14} /></Link>
              </div>
            </div>
            <div className="grid-image-container">
              <img src={product.image} alt={product.title} className="grid-image animate-fade-in" />
            </div>
          </div>
        ))}
      </section>

      {/* Database Products Section */}
      {!loading && dbProducts.length > 0 && (
        <section className="product-grid" style={{ marginTop: '40px', padding: '20px' }}>
          <h2 style={{ width: '100%', fontSize: '24px', marginBottom: '20px' }}>All Products from Store</h2>
          {dbProducts.map(product => (
            <div key={product.product_id} className="grid-item light-theme" style={{ padding: '20px' }}>
              <div className="grid-content">
                <h3 className="grid-title">{product.product_name}</h3>
                <p style={{ color: '#999', marginBottom: '10px' }}>Category: {product.category}</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#f5f5f7' }}>${product.price}</p>
                <p style={{ color: '#999', marginBottom: '10px' }}>Stock: {product.stock}</p>
                {product.description && <p style={{ color: '#999', marginBottom: '10px' }}>{product.description}</p>}
                <Link to="/store" className="btn-secondary">View <ChevronRight size={14} /></Link>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
