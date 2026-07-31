import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* PAGE HEADER */}
        <div className="cart-header">
          <div>
            <span className="cart-eyebrow">YOUR CART</span>
            <h1>Shopping Cart</h1>

            {cartItems.length > 0 && (
              <p>
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>

          {cartItems.length > 0 && (
            <Link to="/shop" className="continue-shopping-top">
              ← Continue Shopping
            </Link>
          )}
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link to="/shop" className="btn empty-cart-btn">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* LEFT SIDE: ITEMS */}
            <section className="cart-items-section">
              <div className="cart-section-header">
                <h2>Your Items</h2>

                <span>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <article
                    key={item.productId}
                    className="cart-item"
                  >
                    {/* IMAGE */}
                    <div className="cart-image-wrapper">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="cart-item-details">
                      <div className="cart-product-top">
                        <div>
                          <h3>{item.name}</h3>
                        </div>

                        <strong className="cart-item-price">
                          ₹{(item.price * item.qty).toFixed(2)}
                        </strong>
                      </div>

                      <div className="cart-product-bottom">
                        {/* QUANTITY */}
                        <div className="quantity-area">
                          <span className="quantity-label">
                            Quantity
                          </span>

                          <div className="qty-controls">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQty(item, item.qty - 1)
                              }
                              disabled={item.qty <= 1}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span>{item.qty}</span>

                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQty(item, item.qty + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(item.productId)
                          }
                          className="btn-remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* RIGHT SIDE: SUMMARY */}
            <aside className="cart-summary">
              <span className="summary-eyebrow">
                ORDER SUMMARY
              </span>

              <h2>Summary</h2>

              <div className="summary-content">
                <div className="summary-row">
                  <span>
                    Subtotal ({totalItems}{' '}
                    {totalItems === 1 ? 'item' : 'items'})
                  </span>

                  <strong>
                    ₹{totalPrice.toFixed(2)}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="shipping-text">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="summary-total">
                <div>
                  <span>Total</span>
                  <small>Taxes included where applicable</small>
                </div>

                <strong>
                  ₹{totalPrice.toFixed(2)}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="btn btn-checkout"
              >
                Proceed to Checkout
                <span>→</span>
              </button>

              <div className="secure-checkout">
                <span>🔒</span>
                <p>Secure checkout</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
