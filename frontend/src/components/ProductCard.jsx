import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductCard = ({ product, badge }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (product?._id && savedWishlist.includes(product._id)) {
        setIsWishlisted(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [product?._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      let updated;
      if (savedWishlist.includes(product._id)) {
        updated = savedWishlist.filter((id) => id !== product._id);
        setIsWishlisted(false);
      } else {
        updated = [...savedWishlist, product._id];
        setIsWishlisted(true);
      }
      localStorage.setItem('wishlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  // Generate consistent pseudo-rating if backend doesn't provide rating
  const rating = product?.rating || (3.8 + (Math.abs(product?._id?.charCodeAt(0) || 4) % 12) / 10).toFixed(1);
  const reviewsCount = product?.numReviews || (24 + (Math.abs(product?._id?.charCodeAt(1) || 7) * 5) % 150);

  return (
    <div className="product-card">
      {badge && <span className="product-badge">{badge}</span>}

      <button
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={toggleWishlist}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? '#f97316' : 'none'} stroke={isWishlisted ? '#f97316' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <Link to={`/product/${product._id}`} className="product-image-wrapper">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </Link>

      <div className="product-info">
        <div className="product-category-tag">{product.category || 'General'}</div>

        <Link to={`/product/${product._id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <span className="star">★</span>
          <span className="rating-num">{rating}</span>
          <span className="reviews-count">({reviewsCount})</span>
        </div>

        <div className="product-footer">
          <div className="price-container">
            <span className="price">₹{Number(product.price).toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`add-cart-btn ${added ? 'added' : ''}`}
            disabled={added}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

