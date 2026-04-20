import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Store.css';

const STORE_PRODUCTS = {
  macbookPro: {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    price: 1599,
    image: '/images/macbook_pro_m3_1773640027248.png',
  },
  iphone15pro: {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 999,
    image: '/images/iphone_15_pro_hero_1773639940525.png',
  },
  appleWatch: {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9',
    price: 399,
    image: '/images/apple_watch_series_9_1773640008555.png',
  },
  ipadPro: {
    id: 'ipad-pro-m4',
    name: 'iPad Pro M4',
    price: 999,
    image: '/images/ipad_pro_1773640050245.png',
  },
};

export default function Store() {
  const { addItem } = useCart();

  const storeCategories = [
    { name: 'Mac', image: '/images/macbook_pro_m3_1773640027248.png', link: '/mac' },
    { name: 'iPhone', image: '/images/iphone_15_pro_hero_1773639940525.png', link: '/iphone' },
    { name: 'iPad', image: '/images/ipad_pro_1773640050245.png', link: '/ipad' },
    { name: 'Apple Watch', image: '/images/apple_watch_series_9_1773640008555.png', link: '/watch' },
  ];

  return (
    <div className="store-page animate-fade-in">
      <div className="store-header">
        <h1 className="store-headline">Store. <span className="store-subhead">The best way to buy the products you love.</span></h1>
      </div>
      
      <div className="store-nav-ribbon">
        <div className="store-nav-scroll">
          {storeCategories.map(cat => (
            <Link to={cat.link} key={cat.name} className="store-cat-card">
              <div className="store-cat-img-wrapper">
                <img src={cat.image} alt={cat.name} className="store-cat-img" />
              </div>
              <span className="store-cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="store-section">
        <h2 className="store-section-title">The latest. <span className="store-section-subtitle">Take a look at what's new, right now.</span></h2>
        
        <div className="store-horizontal-scroll">
          
          <div className="store-promo-card dark-card">
            <div className="promo-text">
              <span className="promo-eyebrow">MACBOOK PRO</span>
              <h3 className="promo-headline">Mind-blowing. Head-turning.</h3>
              <p className="promo-price">From $1,599</p>
              <button
                className="store-add-btn"
                onClick={() => addItem(STORE_PRODUCTS.macbookPro)}
              >
                Add to Bag
              </button>
            </div>
            <img src="/images/macbook_pro_m3_1773640027248.png" className="promo-bg-img" alt="Mac" />
          </div>

          <div className="store-promo-card light-card">
            <div className="promo-text">
              <span className="promo-eyebrow">IPHONE 15 PRO</span>
              <h3 className="promo-headline">Titanium.</h3>
              <p className="promo-price">From $999</p>
              <button
                className="store-add-btn store-add-btn--dark"
                onClick={() => addItem(STORE_PRODUCTS.iphone15pro)}
              >
                Add to Bag
              </button>
            </div>
            <img src="/images/iphone_15_pro_hero_1773639940525.png" className="promo-bg-img" alt="iPhone" />
          </div>

          <div className="store-promo-card light-card">
            <div className="promo-text">
              <span className="promo-eyebrow">APPLE WATCH SERIES 9</span>
              <h3 className="promo-headline">Smarter. Brighter. Mightier.</h3>
              <p className="promo-price">From $399</p>
              <button
                className="store-add-btn store-add-btn--dark"
                onClick={() => addItem(STORE_PRODUCTS.appleWatch)}
              >
                Add to Bag
              </button>
            </div>
            <img src="/images/apple_watch_series_9_1773640008555.png" className="promo-bg-img" alt="Watch" style={{objectFit: 'contain', transform: 'scale(1.5)', transformOrigin: 'bottom right'}} />
          </div>

        </div>
      </div>
    </div>
  );
}
