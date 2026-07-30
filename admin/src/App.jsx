import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import LoginPage from './views/LoginPage';
import HeroSectionEditor from './views/HeroSectionEditor';
import DashboardView from './views/DashboardView';
import UserManagementView from './views/UserManagementView';
import GenericSectionEditor from './views/GenericSectionEditor';
import { ChevronRight } from 'lucide-react';
import { logoutUser } from './services/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('website-home');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Check initial authentication session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('admin_user');
    const savedToken = localStorage.getItem('admin_token');

    if (savedUser && savedToken) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    await logoutUser();
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    showToast('Logged out successfully');
  };

  const getBreadcrumbs = () => {
    switch (activeSection) {
      case 'dashboard':
        return ['Dashboard', 'Overview'];
      case 'website-home':
        return ['Home', 'Hero Section'];
      case 'website-about':
        return ['Website', 'About Section'];
      case 'website-solution':
        return ['Website', 'Solution Section'];
      case 'website-industry':
        return ['Website', 'Industry Section'];
      case 'website-users':
        return ['Website', 'Users Management'];
      case 'website-footer':
        return ['Website', 'Footer Config'];
      case 'media':
        return ['Media', 'Library'];
      case 'analytics':
        return ['Analytics', 'Performance'];
      case 'settings':
        return ['Settings', 'Global Settings'];
      default:
        return ['Dashboard', 'Overview'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  // Show Login Page first if user is not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onShowToast={showToast}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      </>
    );
  }

  // Show Main Dashboard UI after successful login
  return (
    <div className="admin-layout">
      {/* Top Header Bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onShowToast={showToast}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthenticated(false)}
      />

      {/* Main Body: Sidebar + Content */}
      <div className="admin-body">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={() => setShowLogoutModal(true)}
        />

        <main className="admin-main">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumbs">
            <span className="breadcrumb-item">{breadcrumbs[0]}</span>
            <ChevronRight size={14} />
            <span className="breadcrumb-item active">{breadcrumbs[1]}</span>
          </div>

          {/* View Content */}
          {activeSection === 'website-home' && (
            <HeroSectionEditor onShowToast={showToast} />
          )}

          {activeSection === 'website-users' && (
            <UserManagementView onShowToast={showToast} />
          )}

          {activeSection === 'dashboard' && (
            <DashboardView onSelectSection={(sec) => setActiveSection(sec)} />
          )}

          {activeSection !== 'website-home' && activeSection !== 'website-users' && activeSection !== 'dashboard' && (
            <GenericSectionEditor
              sectionKey={activeSection}
              title={breadcrumbs[1]}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="content-card" style={{ width: '360px', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Confirm Logout</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Are you sure you want to end your current session?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                className="file-upload-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                style={{ backgroundColor: 'var(--danger)', margin: 0, padding: '0.5rem 1rem' }}
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
