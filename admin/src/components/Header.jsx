import React, { useState } from 'react';
import { Search, Bell, User, CheckCircle, Moon, Sun, LogIn } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onShowToast, currentUser, onOpenAuthModal }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const getInitials = (name) => {
    if (!name) return 'SK';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="brand-logo">
          <div className="logo-badge">U</div>
          <span>UNISE Admin</span>
        </div>

        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search website sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        {/* Theme Toggle */}
        <button className="header-icon-btn" title="Toggle Theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-icon-btn"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            <span className="notification-badge"></span>
          </button>

          {showNotifications && (
            <div className="content-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '300px',
              zIndex: 100,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div className="content-card-header" style={{ padding: '0.75rem 1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Mark all as read</span>
              </div>
              <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  <div>
                    <p style={{ fontWeight: 500 }}>MongoDB Atlas Connected</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Just now</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle size={16} color="var(--info)" />
                  <div>
                    <p style={{ fontWeight: 500 }}>Auth API Routes Enabled</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 minute ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile / Auth Button */}
        <div style={{ position: 'relative' }}>
          {currentUser ? (
            <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="avatar">{getInitials(currentUser.name)}</div>
              <span className="user-name">{currentUser.name || 'Sumit Kumar'}</span>
            </div>
          ) : (
            <button
              className="btn-primary"
              style={{ margin: 0, padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={onOpenAuthModal}
            >
              <LogIn size={15} />
              <span>Login / Register</span>
            </button>
          )}

          {showProfileMenu && currentUser && (
            <div className="content-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '220px',
              zIndex: 100,
              padding: '0.5rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{currentUser.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.email}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>{currentUser.role || 'Super Admin'}</span>
              </div>
              <button
                className="sidebar-sub-item"
                style={{ width: '100%', marginTop: '0.25rem' }}
                onClick={() => {
                  setShowProfileMenu(false);
                  onShowToast(`Role: ${currentUser.role || 'Super Admin'}`);
                }}
              >
                <User size={14} /> My Profile
              </button>
              <button
                className="sidebar-sub-item"
                style={{ width: '100%', color: 'var(--primary)' }}
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenAuthModal();
                }}
              >
                <LogIn size={14} /> Switch Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
