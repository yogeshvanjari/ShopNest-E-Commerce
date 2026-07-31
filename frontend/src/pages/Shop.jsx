import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const categoriesList = [
  { name: 'All Categories', value: '' },
  { name: 'Electronics', value: 'electronics' },
  { name: 'Fashion', value: 'fashion' },
  { name: 'Shoes', value: 'shoes' },
  { name: 'Accessories', value: 'accessories' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const [search, setSearch] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (catValue) => {
    setSelectedCategory(catValue);
    const newParams = new URLSearchParams(searchParams);
    if (catValue) {
      newParams.set('category', catValue);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>Explore Shop</h2>
        <p className="shop-subtitle">Discover our full catalog of premium products</p>
      </div>

      <div className="shop-controls">
        <div className="search-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        <div className="category-pills">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              className={`category-pill ${selectedCategory.toLowerCase() === cat.value.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.value)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="product-skeleton" key={item}>
              <div className="skeleton-image" />
              <div className="skeleton-line short" />
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search criteria or category filters.</p>
          <button
            className="btn"
            onClick={() => {
              setSearch('');
              setSelectedCategory('');
              setSearchParams({});
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;

