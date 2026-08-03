import React from 'react';
import {
  Home, Layout, Info, Lightbulb, Building, Phone, LayoutGrid,
  ArrowUpRight, Shield, Globe, MessageSquare, Users, Layers, BookOpen
} from 'lucide-react';

const PAGES = [
  {
    key: 'website-home',
    label: 'Home Page',
    subtitle: 'Hero Section',
    desc: 'Edit main hero banner, headline, subtext, and CTA buttons shown on the homepage.',
    Icon: Home,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.12)',
    route: 'http://localhost:3001/',
  },
  {
    key: 'website-header',
    label: 'Header',
    subtitle: 'Navigation Bar',
    desc: 'Manage the top navigation bar — logo, menu links, and sticky header settings.',
    Icon: Layout,
    color: '#0073b7',
    bg: 'rgba(0,115,183,0.12)',
    route: 'http://localhost:3001/',
  },
  {
    key: 'website-about',
    label: 'About Page',
    subtitle: 'Company Story & Team',
    desc: 'Edit the About Us page — company overview, milestones, certifications, and team section.',
    Icon: Info,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    route: 'http://localhost:3001/about-us',
  },
  {
    key: 'website-solution',
    label: 'Solutions Page',
    subtitle: 'Service Cards + Inside Pages',
    desc: 'Manage all 9 solution cards and their full inside-page CMS (banner, scope, brands, CTA).',
    Icon: Lightbulb,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    route: 'http://localhost:3001/solutions',
  },
  {
    key: 'website-industry',
    label: 'Industries Page',
    subtitle: 'Sector Cards + Inside Pages',
    desc: 'Manage all industry sector cards and their full inside-page CMS with challenges, solutions, brands.',
    Icon: Building,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    route: 'http://localhost:3001/industries',
  },
  {
    key: 'website-contact',
    label: 'Contact Page',
    subtitle: 'Contact Form & Details',
    desc: 'Update contact information, office address, phone, email, and form settings.',
    Icon: Phone,
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    route: 'http://localhost:3001/contact-us',
  },
  {
    key: 'website-footer',
    label: 'Footer',
    subtitle: 'Footer CMS',
    desc: 'Edit company info, social links, quick links, contact strip, group companies, and copyright.',
    Icon: LayoutGrid,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.12)',
    route: 'http://localhost:3001/',
  },
  {
    key: 'website-users',
    label: 'Users',
    subtitle: 'Admin User Management',
    desc: 'Manage admin accounts — add, edit, or remove user access to this admin panel.',
    Icon: Users,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.12)',
    route: null,
  },
  {
    key: 'enquiries',
    label: 'Enquiries',
    subtitle: 'Form Submissions',
    desc: 'View all contact form submissions and enquiries sent from the website.',
    Icon: MessageSquare,
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.12)',
    route: null,
  },
];

// Live website page quick-preview links
const LIVE_ROUTES = [
  { label: 'Homepage', url: 'http://localhost:3001/', icon: 'fa-house' },
  { label: 'About Us', url: 'http://localhost:3001/about-us', icon: 'fa-circle-info' },
  { label: 'Solutions', url: 'http://localhost:3001/solutions', icon: 'fa-lightbulb' },
  { label: 'Industries', url: 'http://localhost:3001/industries', icon: 'fa-building' },
  { label: 'Contact Us', url: 'http://localhost:3001/contact-us', icon: 'fa-phone' },
  { label: 'Privacy Policy', url: 'http://localhost:3001/privacy-policy', icon: 'fa-file-shield' },
  { label: 'Terms & Conditions', url: 'http://localhost:3001/terms-and-conditions', icon: 'fa-file-contract' },
];

export default function DashboardView({ onSelectSection }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #004b78 0%, #0073b7 60%, #0ea5e9 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem 2.25rem',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 8px 32px rgba(0,115,183,0.25)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Shield size={28} style={{ opacity: 0.9 }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>UniSpark Innovation</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
            Website CMS Dashboard
          </h1>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.88rem', opacity: 0.85 }}>
            Manage all website pages, content, and sections from one place.
          </p>
        </div>
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.65rem 1.35rem', borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', fontWeight: 700, fontSize: '0.85rem',
            textDecoration: 'none', backdropFilter: 'blur(4px)',
            transition: 'background 0.2s',
          }}
        >
          <Globe size={16} />
          <span>Open Live Website</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* All CMS Page Cards */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} className="text-primary" />
            All Pages & Sections
          </h3>
          <p className="card-subtitle">Click any card to jump directly into that page's CMS editor.</p>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {PAGES.map(({ key, label, subtitle, desc, Icon, color, bg, route }) => (
              <button
                key={key}
                onClick={() => onSelectSection(key)}
                style={{
                  padding: '1.35rem',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${color}22`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Icon + Arrow Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <ArrowUpRight size={16} color={color} />
                </div>

                {/* Text Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: color, backgroundColor: bg, padding: '0.1rem 0.5rem', borderRadius: '6px' }}>{subtitle}</span>
                  </div>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
                </div>

                {/* Live Route Preview */}
                {route && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <a
                      href={route}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontSize: '0.72rem', fontWeight: 600, color: color, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: 0.85 }}
                    >
                      <Globe size={11} />
                      {route.replace('http://localhost:3001', '') || '/'}
                    </a>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Website Quick Links */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} className="text-primary" />
            Live Website Pages
          </h3>
          <p className="card-subtitle">Preview live pages on the frontend website in a new tab.</p>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {LIVE_ROUTES.map(({ label, url, icon }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.55rem 1.1rem', borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-main)', fontSize: '0.82rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#0073b7';
                  e.currentTarget.style.color = '#0073b7';
                  e.currentTarget.style.backgroundColor = 'rgba(0,115,183,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-input)';
                }}
              >
                <i className={`fa-solid ${icon} text-xs`} style={{ color: '#0073b7' }} />
                <span>{label}</span>
                <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
