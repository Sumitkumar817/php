import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, EyeOff, MapPin, Phone, Building, Briefcase } from 'lucide-react';
import { fetchEnquiries, deleteEnquiry, markEnquiryRead } from '../services/api';

export default function ContactMessages({ onShowToast }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    const res = await fetchEnquiries();
    if (res.success && res.data) {
      setMessages(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      const res = await deleteEnquiry(id);
      if (res.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
        if (onShowToast) onShowToast("Enquiry deleted.");
      } else {
        if (onShowToast) onShowToast("Failed to delete enquiry.");
      }
    }
  };

  const toggleExpand = async (message) => {
    if (expandedId === message._id) {
      setExpandedId(null);
    } else {
      setExpandedId(message._id);
      if (message.status === 'Unread') {
        const res = await markEnquiryRead(message._id);
        if (res.success) {
          setMessages(prev => prev.map(m => m._id === message._id ? { ...m, status: 'Read' } : m));
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="content-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading Enquiries...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div className="content-card">
        <div className="content-card-header" style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Form Enquiries</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-input)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
            {messages.length} Total
          </span>
        </div>

        <div className="content-card-body" style={{ padding: '1.5rem' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Mail size={32} style={{ margin: '0 auto 1rem auto', color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>No enquiries found.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg) => (
                <div key={msg._id} style={{ 
                  border: msg.status === 'Unread' ? '1px solid var(--primary)' : '1px solid var(--border-color)', 
                  backgroundColor: msg.status === 'Unread' ? 'rgba(0, 115, 183, 0.03)' : 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}>
                  
                  {/* Header Row (Always visible) */}
                  <div 
                    onClick={() => toggleExpand(msg)}
                    style={{ 
                      padding: '1rem 1.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', 
                        backgroundColor: msg.status === 'Unread' ? 'var(--primary)' : 'var(--bg-input)',
                        color: msg.status === 'Unread' ? 'white' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {msg.fullName}
                          {msg.status === 'Unread' && (
                            <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--danger)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>
                          )}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{msg.email} • {new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                        {msg.enquiryType}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); toggleExpand(msg); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        {expandedId === msg._id ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {expandedId === msg._id && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            <Building size={16} color="var(--text-muted)" />
                            <strong>Company:</strong> {msg.companyName}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            <Phone size={16} color="var(--text-muted)" />
                            <strong>Phone:</strong> <a href={`tel:${msg.phone}`} style={{ color: 'var(--primary)' }}>{msg.phone}</a>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            <MapPin size={16} color="var(--text-muted)" />
                            <strong>Location:</strong> {msg.location}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            <Briefcase size={16} color="var(--text-muted)" />
                            <strong>Service:</strong> {msg.service || 'N/A'}
                          </div>
                        </div>

                      </div>

                      <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Message</strong>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                          {msg.message}
                        </p>
                      </div>

                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleDelete(msg._id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', fontSize: '0.85rem', backgroundColor: 'var(--danger)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} /> Delete Enquiry
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
