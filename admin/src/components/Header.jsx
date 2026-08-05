import React, { useState, useEffect } from 'react';
import { User, Moon, Sun, LogIn, Upload, Camera, Menu, X } from 'lucide-react';
import { fetchHeaderConfig, updateHeaderConfig } from '../services/api';

export default function Header({ onShowToast, currentUser, onOpenAuthModal, onToggleMobileSidebar, isMobileOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [headerLogoUrl, setHeaderLogoUrl] = useState('');

  // Load active header logo from Backend API or localStorage
  useEffect(() => {
    const loadHeaderLogo = async () => {
      const savedLogo = localStorage.getItem('header_logo_url');
      if (savedLogo) {
        x
        setHeaderLogoUrl(savedLogo);
      }
      const res = await fetchHeaderConfig();
      if (res.success && res.data && res.data.logoUrl) {
        setHeaderLogoUrl(res.data.logoUrl);
        localStorage.setItem('header_logo_url', res.data.logoUrl);
      }
    };
    loadHeaderLogo();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const getInitials = (name) => {
    if (!name) return 'SK';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Direct Logo Upload from Header Bar (converts to Base64 & saves to MongoDB Atlas)
  const handleHeaderLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        setHeaderLogoUrl(base64Data);
        localStorage.setItem('header_logo_url', base64Data);
        onShowToast(`Header logo updated: ${file.name}`);
        await updateHeaderConfig({ logoUrl: base64Data });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        {/* Mobile Hamburger Drawer Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={onToggleMobileSidebar}
          title="Toggle Navigation Menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Brand Logo with Direct Upload Feature */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label
            htmlFor="header-logo-upload-input"
            className="brand-logo"
            style={{ cursor: 'pointer', position: 'relative' }}
            title="Click to Upload Header Logo"
          >
            {headerLogoUrl ? (
              <img
                src={headerLogoUrl}
                alt="Header Logo"
                style={{ height: '34px', maxWidth: '110px', objectFit: 'contain', borderRadius: '4px' }}
              />
            ) : (
              <div className="logo-badge" style={{ position: 'relative' }}>
                U
                <Camera size={12} style={{ position: 'absolute', bottom: '-2px', right: '-2px', color: 'white', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '1px' }} />
              </div>
            )}
            <span>UNISE Admin</span>
          </label>
          <input
            id="header-logo-upload-input"
            type="file"
            accept="image/*"
            onChange={handleHeaderLogoUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="header-right">
        {/* Direct Header Upload Logo Button */}
        <label
          htmlFor="header-logo-upload-input"
          className="header-icon-btn"
          title="Upload Header Logo"
          style={{ cursor: 'pointer' }}
        >
          <Upload size={16} />
        </label>

        {/* Theme Toggle */}
        <button className="header-icon-btn" title="Toggle Theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

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
              style={{ margin: 0, padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              onClick={onOpenAuthModal}
            >
              <LogIn size={15} />
              <span>Login</span>
            </button>
          )}

          {showProfileMenu && currentUser && (
            <div className="content-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '210px',
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
