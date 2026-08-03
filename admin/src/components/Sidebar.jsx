import React, { useState } from 'react';
import {
  LayoutDashboard,
  Folder,
  Home,
  Layout,
  Info,
  Lightbulb,
  Building,
  Users,
  LayoutGrid,
  Image,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection, onLogout, isMobileOpen, onCloseMobile }) {
  const [websiteExpanded, setWebsiteExpanded] = useState(true);

  const isWebsiteSubActive = (sub) => activeSection === `website-${sub}`;

  const handleSelectSection = (sec) => {
    setActiveSection(sec);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${isMobileOpen ? 'mobile-open' : ''}`}
        onClick={onCloseMobile}
      />

      <aside className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-group">
          {/* Dashboard */}
          <button
            className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleSelectSection('dashboard')}
          >
            <div className="sidebar-item-content">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </button>

          {/* Website Folder */}
          <div>
            <button
              className={`sidebar-item ${activeSection.startsWith('website') ? 'active' : ''}`}
              onClick={() => setWebsiteExpanded(!websiteExpanded)}
            >
              <div className="sidebar-item-content">
                <Folder size={18} />
                <span>Website</span>
              </div>
              {websiteExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {websiteExpanded && (
              <div className="sidebar-sub-menu">
                {/* Home */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('home') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-home')}
                >
                  <Home size={14} />
                  <span>Home</span>
                </button>

                {/* Header */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('header') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-header')}
                >
                  <Layout size={14} />
                  <span>Header</span>
                </button>

                {/* About */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('about') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-about')}
                >
                  <Info size={14} />
                  <span>About</span>
                </button>

                {/* Solutions */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('solution') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-solution')}
                >
                  <Lightbulb size={14} />
                  <span>Solutions</span>
                </button>

                {/* Industries */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('industry') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-industry')}
                >
                  <Building size={14} />
                  <span>Industries</span>
                </button>

                {/* Users */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('users') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-users')}
                >
                  <Users size={14} />
                  <span>Users</span>
                </button>

                {/* Contact */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('contact') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-contact')}
                >
                  <Phone size={14} />
                  <span>Contact</span>
                </button>

                {/* Footer */}
                <button
                  className={`sidebar-sub-item ${isWebsiteSubActive('footer') ? 'active' : ''}`}
                  onClick={() => handleSelectSection('website-footer')}
                >
                  <LayoutGrid size={14} />
                  <span>Footer</span>
                </button>
              </div>
            )}
          </div>

          {/* Enquiries / Form Submissions */}
          <button
            className={`sidebar-item ${activeSection === 'enquiries' ? 'active' : ''}`}
            onClick={() => handleSelectSection('enquiries')}
          >
            <div className="sidebar-item-content">
              <MessageSquare size={18} />
              <span>Enquiries</span>
            </div>
          </button>

          {/* Media Library */}
          <button
            className={`sidebar-item ${activeSection === 'media' ? 'active' : ''}`}
            onClick={() => handleSelectSection('media')}
          >
            <div className="sidebar-item-content">
              <Image size={18} />
              <span>Media Library</span>
            </div>
          </button>

          {/* Settings */}
          <button
            className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => handleSelectSection('settings')}
          >
            <div className="sidebar-item-content">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </button>

          {/* Logout */}
          <button
            className="sidebar-item"
            style={{ marginTop: '1.5rem', color: 'var(--danger)' }}
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onLogout();
            }}
          >
            <div className="sidebar-item-content">
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
