import React, { useState } from 'react';
import {
  LayoutDashboard,
  Folder,
  Home,
  Info,
  Lightbulb,
  Building,
  Users,
  LayoutGrid,
  Image,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection, onLogout }) {
  const [websiteExpanded, setWebsiteExpanded] = useState(true);

  const isWebsiteSubActive = (sub) => activeSection === `website-${sub}`;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-group">
        {/* Dashboard */}
        <button
          className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveSection('dashboard')}
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
              <button
                className={`sidebar-sub-item ${isWebsiteSubActive('home') ? 'active' : ''}`}
                onClick={() => setActiveSection('website-home')}
              >
                <Home size={14} />
                <span>Home</span>
              </button>
              <button
                className={`sidebar-sub-item ${isWebsiteSubActive('about') ? 'active' : ''}`}
                onClick={() => setActiveSection('website-about')}
              >
                <Info size={14} />
                <span>About</span>
              </button>
              <button
                className={`sidebar-sub-item ${isWebsiteSubActive('solution') ? 'active' : ''}`}
                onClick={() => setActiveSection('website-solution')}
              >
                <Lightbulb size={14} />
                <span>Solution</span>
              </button>
              <button
                className={`sidebar-sub-item ${isWebsiteSubActive('industry') ? 'active' : ''}`}
                onClick={() => setActiveSection('website-industry')}
              >
                <Building size={14} />
                <span>Industry</span>
              </button>
              <button
                className={`sidebar-sub-item ${isWebsiteSubActive('users') ? 'active' : ''}`}
                onClick={() => setActiveSection('website-users')}
              >
                <Users size={14} />
                <span>Users</span>
              </button>
              <button
                className={`sidebar-sub-item ${isWebsiteSubActive('footer') ? 'active' : ''}`}
                onClick={() => setActiveSection('website-footer')}
              >
                <LayoutGrid size={14} />
                <span>Footer</span>
              </button>
            </div>
          )}
        </div>

        {/* Media */}
        <button
          className={`sidebar-item ${activeSection === 'media' ? 'active' : ''}`}
          onClick={() => setActiveSection('media')}
        >
          <div className="sidebar-item-content">
            <Image size={18} />
            <span>Media</span>
          </div>
        </button>

        {/* Analytics */}
        <button
          className={`sidebar-item ${activeSection === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveSection('analytics')}
        >
          <div className="sidebar-item-content">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </div>
        </button>

        {/* Settings */}
        <button
          className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveSection('settings')}
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
          onClick={onLogout}
        >
          <div className="sidebar-item-content">
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
