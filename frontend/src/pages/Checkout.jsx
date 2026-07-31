import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import { API_URL } from '../config/api';
import '../styles/checkout.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
      const orderRes = await fetch(`${API_URL}/api/payment/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        return alert(orderData.message || "Payment failed to initialize");
      }

      const options = {
        key: orderData.key || 'rzp_test_TK8JaLzhHMUxhX',
        amount: Math.round(orderData.amount),
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch(`${API_URL}/api/orders`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response.error);
        const fallback = window.confirm(`Payment Failed: ${response.error.description || 'Razorpay auth or session error'}.\n\nWould you like to complete this order using Student Bypass Mode?`);
        if (fallback) {
          bypassPayment(orderData.id);
        }
      });
      rzp1.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('An unexpected error occurred during payment.');
    }
  };

  const bypassPayment = async (orderId = null) => {
    const paymentId = orderId || 'bypass_txn_' + Date.now();
    const saveOrderRes = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: paymentId
      })
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    } else {
      alert('Order saving failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate('/cart');
      return;
    }

    if (totalPrice <= 0) {
      alert("Invalid order total");
      return;
    }

    handlePayment();
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* HEADER */}
        <header className="checkout-header">
          <span className="checkout-eyebrow">SECURE CHECKOUT</span>
          <h1>Checkout</h1>
          <p>Enter your shipping details and review your order.</p>
        </header>

        <div className="checkout-layout">
          {/* =========================
              SHIPPING FORM
          ========================== */}
          <section className="shipping-section">
            <div className="section-heading">
              <div className="section-number">1</div>
              <div>
                <h2>Shipping Address</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="shipping-form"
            >
              {/* FULL NAME */}
              <div className="checkout-field checkout-field-full">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      fullName: e.target.value
                    })
                  }
                />
              </div>

              {/* STREET */}
              <div className="checkout-field checkout-field-full">
                <label htmlFor="street">Street Address</label>
                <input
                  id="street"
                  type="text"
                  placeholder="House no., street, area"
                  autoComplete="street-address"
                  required
                  value={address.street}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      street: e.target.value
                    })
                  }
                />
              </div>

              {/* CITY + POSTAL */}
              <div className="checkout-field-row">
                <div className="checkout-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Your city"
                    autoComplete="address-level2"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        city: e.target.value
                      })
                    }
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="Postal code"
                    autoComplete="postal-code"
                    required
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        postalCode: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              {/* COUNTRY */}
              <div className="checkout-field checkout-field-full">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  placeholder="Your country"
                  autoComplete="country-name"
                  required
                  value={address.country}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      country: e.target.value
                    })
                  }
                />
              </div>
            </form>
          </section>

          {/* =========================
              ORDER SUMMARY
          ========================== */}
          <aside className="checkout-summary">
            {/* SUMMARY HEADER */}
            <div className="checkout-summary-header">
              <span className="summary-eyebrow">ORDER SUMMARY</span>
              <h2>Your Order</h2>
            </div>

            {/* PRODUCTS */}
            <div className="checkout-products">
              {cartItems.map((item) => (
                <div key={item.productId} className="checkout-product">
                  <div className="checkout-product-image">
                    <img src={item.imageUrl} alt={item.name} />
                    <span className="product-qty">{item.qty}</span>
                  </div>

                  <div className="checkout-product-info">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.qty}</p>
                  </div>

                  <strong className="checkout-product-price">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            {/* SHIPPING */}
            <div className="checkout-shipping-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            {/* TOTAL */}
            <div className="checkout-total">
              <div>
                <span>Total</span>
                <small>Amount payable</small>
              </div>
              <strong>₹{totalPrice.toFixed(2)}</strong>
            </div>

            {/* PAYMENT */}
            <button
              type="submit"
              form="checkout-form"
              className="btn checkout-pay-btn"
            >
              <span>Pay Securely</span>
              <span className="pay-arrow">→</span>
            </button>

            {/* SECURITY */}
            <div className="checkout-security">
              <span className="security-icon">🔒</span>
              <div>
                <strong>Secure payment</strong>
                <p>Processed securely via Razorpay</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
