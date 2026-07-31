import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          // Token obsolete or 401: clear and bounce
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const avatarInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px', color: '#fafafa' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: '700', marginBottom: '6px', background: 'none', WebkitTextFillColor: 'initial' }}>
          My Profile
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '1rem', margin: 0 }}>
          Manage your account and view your order history
        </p>
      </div>

      {/* Profile Summary Card */}
      <div
        style={{
          background: '#18181b',
          border: '1px solid #27272a',
          borderRadius: '16px',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#ffffff',
              fontSize: '1.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.35)',
              flexShrink: 0,
            }}
          >
            {avatarInitial}
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
              {user.name}
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '8px' }}>
              {user.email}
            </p>
            <span
              style={{
                background: 'rgba(249, 115, 22, 0.12)',
                color: '#f97316',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.5px',
                display: 'inline-block',
              }}
            >
              {user.role ? user.role.toUpperCase() : 'USER'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid #3f3f46',
            color: '#ef4444',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = '#ef4444';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#3f3f46';
          }}
        >
          Logout
        </button>
      </div>

      {/* Order History Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #27272a',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '22px', background: '#f97316', borderRadius: '2px' }} />
          <h3 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>
            Order History
          </h3>
        </div>
        {!loading && (
          <span style={{ color: '#a1a1aa', fontSize: '0.9rem', fontWeight: '500' }}>
            Showing {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </span>
        )}
      </div>

      {/* Order Cards / Loading / Empty */}
      {loading ? (
        <div
          style={{
            background: '#18181b',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #27272a',
            textAlign: 'center',
            color: '#a1a1aa',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid #27272a',
              borderTopColor: '#f97316',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ margin: 0 }}>Fetching your order history...</p>
        </div>
      ) : orders.length === 0 ? (
        <div
          style={{
            background: '#18181b',
            padding: '50px 30px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid #27272a',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛍️</div>
          <h4 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '8px' }}>No orders yet</h4>
          <p style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '0.95rem' }}>
            When you place an order, it will appear here.
          </p>
          <Link to="/shop" className="btn" style={{ padding: '12px 24px' }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {orders.map((order) => {
            const shortId = order._id ? order._id.substring(0, 8).toUpperCase() : '';
            const isDelivered = order.status === 'Delivered';
            const isShipped = order.status === 'Shipped';
            const statusBg = isDelivered
              ? 'rgba(16, 185, 129, 0.12)'
              : isShipped
              ? 'rgba(59, 130, 246, 0.12)'
              : 'rgba(245, 158, 11, 0.12)';
            const statusColor = isDelivered ? '#10b981' : isShipped ? '#3b82f6' : '#f59e0b';
            const statusBorder = isDelivered
              ? 'rgba(16, 185, 129, 0.3)'
              : isShipped
              ? 'rgba(59, 130, 246, 0.3)'
              : 'rgba(245, 158, 11, 0.3)';

            return (
              <div
                key={order._id}
                style={{
                  background: '#0c0c0f',
                  padding: '20px 24px',
                  borderRadius: '14px',
                  border: '1px solid #27272a',
                  transition: 'all 0.25s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#27272a';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    paddingBottom: '12px',
                    marginBottom: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#a1a1aa', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                      ORDER #{shortId}
                    </span>
                    <span style={{ color: '#52525b', fontSize: '0.8rem' }}>• {order._id}</span>
                  </div>

                  <span
                    style={{
                      background: statusBg,
                      color: statusColor,
                      border: `1px solid ${statusBorder}`,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {order.status ? order.status.toUpperCase() : 'PENDING'}
                  </span>
                </div>

                {/* Order Details Grid */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div>
                    <span style={{ color: '#71717a', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>
                      Placed on
                    </span>
                    <span style={{ color: '#e4e4e7', fontSize: '0.95rem', fontWeight: '500' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: '#71717a', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>
                      Order Total
                    </span>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: '700' }}>
                      ₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
