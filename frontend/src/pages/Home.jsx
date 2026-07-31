import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../config/api';
import '../styles/product.css';

const categories = [
  {
    name: 'Electronics',
    value: 'electronics',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'Fashion',
    value: 'fashion',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    name: 'Shoes',
    value: 'shoes',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Accessories',
    value: 'accessories',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" />
        <polyline points="12 9 12 12 13.5 13.5" />
        <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83" />
        <path d="M7.49 6.65l.35-3.83A2 2 0 0 1 9.83 1h4.34a2 2 0 0 1 2 1.82l.35 3.83" />
      </svg>
    ),
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) {
        throw new Error('Failed to fetch products from server');
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.length > 4 ? products.slice(4, 8) : products.slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-label">NEW COLLECTION 2026</span>

          <h1>
            Find something
            <span> you'll love.</span>
          </h1>

          <p>
            Discover top quality products, unbeatable prices, and everything you need in one seamless shop.
          </p>

          <form className="hero-search" onSubmit={handleSearchSubmit}>
            <svg className="hero-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="hero-actions">
            <button className="btn hero-cta-btn" onClick={() => navigate('/shop')}>
              Shop Now →
            </button>
            <button className="secondary-btn" onClick={() => navigate('/shop')}>
              New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="benefits">
        <div className="benefit-card">
          <div className="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div>
            <strong>Free Shipping</strong>
            <span>On all orders over ₹500</span>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </div>
          <div>
            <strong>Easy Returns</strong>
            <span>30-day hassle free policy</span>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <strong>Secure Payment</strong>
            <span>100% protected checkout</span>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div>
            <strong>24/7 Support</strong>
            <span>Dedicated customer assistance</span>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="category-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">EXPLORE CATALOG</span>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className="category-card"
              onClick={() => navigate(`/shop?category=${cat.value}`)}
            >
              <div className="cat-card-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <span className="category-link-text">Explore products →</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">HANDPICKED FOR YOU</span>
            <h2>Featured Products</h2>
          </div>

          <button className="view-all-btn" onClick={() => navigate('/shop')}>
            View All →
          </button>
        </div>

        {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="product-skeleton" key={item}>
                <div className="skeleton-image" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="error-box">
            <p>Failed to load products: {error}</p>
            <button onClick={fetchProducts} className="btn retry-btn">
              Retry
            </button>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="empty-box">
            <p>No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} badge="FEATURED" />
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-label">LIMITED TIME SPECIAL</span>
          <h2>Upgrade your setup.</h2>
          <p>Save up to 40% on selected premium electronics and accessories this week.</p>
          <button className="promo-btn" onClick={() => navigate('/shop')}>
            Explore Deals →
          </button>
        </div>
      </section>

      {/* Trending / Best Sellers */}
      <section className="trending-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">MOST POPULAR</span>
            <h2>Trending Now</h2>
          </div>

          <button className="view-all-btn" onClick={() => navigate('/shop')}>
            View All →
          </button>
        </div>

        {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="product-skeleton" key={item}>
                <div className="skeleton-image" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {trendingProducts.map((product) => (
              <ProductCard key={`trending-${product._id}`} product={product} badge="HOT" />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-card">
          <h2>Join the ShopNest Community</h2>
          <p>Subscribe to receive exclusive deals, new collection alerts, and special offers.</p>

          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </form>

          {subscribed && (
            <div className="subscribed-badge">
              ✓ Thank you for subscribing to ShopNest updates!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

