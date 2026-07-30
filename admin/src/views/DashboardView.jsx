import React from 'react';
import { Users, Eye, Image, HardDrive, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function DashboardView({ onSelectSection }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Overview Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
            <Eye size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">128,420</span>
            <span className="stat-label">Total Visits</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">3,450</span>
            <span className="stat-label">Active Users</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Image size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">482</span>
            <span className="stat-label">Media Assets</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <HardDrive size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">1.2 GB</span>
            <span className="stat-label">Storage Used</span>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="card-title">Website Quick Management</h3>
        </div>
        <div className="content-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button
            onClick={() => onSelectSection('website-home')}
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              color: 'var(--text-main)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>Edit Hero Section</span>
              <ArrowUpRight size={16} color="var(--primary)" />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Update title, subtitle and hero video preview</p>
          </button>

          <button
            onClick={() => onSelectSection('website-about')}
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              color: 'var(--text-main)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>Update About Page</span>
              <ArrowUpRight size={16} color="var(--primary)" />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manage company story & team highlights</p>
          </button>

          <button
            onClick={() => onSelectSection('media')}
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              color: 'var(--text-main)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>Media Library</span>
              <ArrowUpRight size={16} color="var(--primary)" />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upload and manage website images & videos</p>
          </button>
        </div>
      </div>
    </div>
  );
}
