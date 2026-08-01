import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Edit, Trash2, Plus, X } from 'lucide-react';
import { fetchAboutConfig, updateAboutConfig } from '../services/api';

export default function About({ onShowToast }) {
  // State
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Banner
  const [bannerBadge, setBannerBadge] = useState('ABOUT UNISPARK SECURITY');
  const [bannerTitle, setBannerTitle] = useState('About UniSpark Security Systems');
  const [bannerDesc, setBannerDesc] = useState('');

  // Main (Who We Are)
  const [mainHeading, setMainHeading] = useState('WHO WE ARE');
  const [mainDesc, setMainDesc] = useState('');
  const [missionTitle, setMissionTitle] = useState('OUR MISSION');
  const [missionDesc, setMissionDesc] = useState('');
  const [missionIcon, setMissionIcon] = useState('Target');
  const [visionTitle, setVisionTitle] = useState('OUR VISION');
  const [visionDesc, setVisionDesc] = useState('');
  const [visionIcon, setVisionIcon] = useState('Eye');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [mainImageBase64, setMainImageBase64] = useState('');

  // Glance
  const [glanceBadge, setGlanceBadge] = useState('QUICK OVERVIEW');
  const [glanceTitle, setGlanceTitle] = useState('COMPANY AT A GLANCE');
  const [glanceCards, setGlanceCards] = useState([]);

  // Glance Modal
  const [showGlanceModal, setShowGlanceModal] = useState(false);
  const [editingGlanceId, setEditingGlanceId] = useState(null);
  const [glanceModalTitle, setGlanceModalTitle] = useState('');
  const [glanceModalDesc, setGlanceModalDesc] = useState('');
  const [glanceModalIcon, setGlanceModalIcon] = useState('');

  const loadData = async () => {
    setLoading(true);
    const res = await fetchAboutConfig();
    if (res.success && res.data) {
      setBannerBadge(res.data.bannerBadge || 'ABOUT UNISPARK SECURITY');
      setBannerTitle(res.data.bannerTitle || 'About UniSpark Security Systems');
      setBannerDesc(res.data.bannerDesc || '');

      setMainHeading(res.data.mainHeading || 'WHO WE ARE');
      setMainDesc(res.data.mainDesc || '');
      setMissionTitle(res.data.mission?.title || 'OUR MISSION');
      setMissionDesc(res.data.mission?.description || '');
      setMissionIcon(res.data.mission?.icon || 'Target');
      setVisionTitle(res.data.vision?.title || 'OUR VISION');
      setVisionDesc(res.data.vision?.description || '');
      setVisionIcon(res.data.vision?.icon || 'Eye');
      setMainImagePreview(res.data.mainImage || '');

      setGlanceBadge(res.data.glanceBadge || 'QUICK OVERVIEW');
      setGlanceTitle(res.data.glanceTitle || 'COMPANY AT A GLANCE');
      if (Array.isArray(res.data.glanceCards)) {
        setGlanceCards(res.data.glanceCards);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMainImageSelect = (file) => {
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    const payload = {
      bannerBadge,
      bannerTitle,
      bannerDesc,
      mainHeading,
      mainDesc,
      mission: { title: missionTitle, description: missionDesc, icon: missionIcon },
      vision: { title: visionTitle, description: visionDesc, icon: visionIcon },
      mainImage: mainImageBase64 || mainImagePreview,
      glanceBadge,
      glanceTitle,
      glanceCards
    };

    const res = await updateAboutConfig(payload);
    setIsSaving(false);

    if (res.success) {
      if (onShowToast) onShowToast('About Page config saved successfully!');
    } else {
      if (onShowToast) onShowToast(`Error saving: ${res.message}`);
    }
  };

  // Glance Card Actions
  const handleOpenAddGlance = () => {
    setEditingGlanceId(null);
    setGlanceModalTitle('');
    setGlanceModalDesc('');
    setGlanceModalIcon('');
    setShowGlanceModal(true);
  };

  const handleOpenEditGlance = (card) => {
    setEditingGlanceId(card._id || card.id);
    setGlanceModalTitle(card.title);
    setGlanceModalDesc(card.desc);
    setGlanceModalIcon(card.icon);
    setShowGlanceModal(true);
  };

  const handleDeleteGlance = (id) => {
    setGlanceCards(prev => prev.filter(c => c._id !== id && c.id !== id));
  };

  const handleSaveGlanceModal = () => {
    if (!glanceModalTitle) return onShowToast && onShowToast('Title is required');
    const newObj = {
      id: editingGlanceId || `glc-${Date.now()}`,
      _id: editingGlanceId || undefined,
      title: glanceModalTitle,
      desc: glanceModalDesc,
      icon: glanceModalIcon || 'CheckCircle2'
    };
    if (editingGlanceId) {
      setGlanceCards(prev => prev.map(c => (c._id === editingGlanceId || c.id === editingGlanceId) ? newObj : c));
    } else {
      setGlanceCards(prev => [...prev, newObj]);
    }
    setShowGlanceModal(false);
  };

  if (loading) {
    return (
      <div className="content-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading About Page configurations...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* ======================= BANNER ======================= */}
        <div className="content-card" style={{ width: '100%' }}>
          <div className="content-card-header" style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 600 }}>1. Banner Section</h2>
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }} disabled={isSaving}>
              <Save size={16} /> <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
          <div className="content-card-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Banner Badge Text</label>
              <input type="text" className="form-control" value={bannerBadge} onChange={e => setBannerBadge(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Banner Title</label>
              <input type="text" className="form-control" value={bannerTitle} onChange={e => setBannerTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Banner Description</label>
              <textarea className="form-control" rows={3} value={bannerDesc} onChange={e => setBannerDesc(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ======================= WHO WE ARE ======================= */}
        <div className="content-card" style={{ width: '100%' }}>
          <div className="content-card-header" style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 600 }}>2. Who We Are (Mission & Vision)</h2>
          </div>
          <div className="content-card-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="form-group">
              <label className="form-label">Main Heading</label>
              <input type="text" className="form-control" value={mainHeading} onChange={e => setMainHeading(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Main Description</label>
              <textarea className="form-control" rows={4} value={mainDesc} onChange={e => setMainDesc(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Mission</h4>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" value={missionTitle} onChange={e => setMissionTitle(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} value={missionDesc} onChange={e => setMissionDesc(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon Name (Lucide)</label>
                  <input type="text" className="form-control" value={missionIcon} onChange={e => setMissionIcon(e.target.value)} />
                </div>
              </div>

              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Vision</h4>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" value={visionTitle} onChange={e => setVisionTitle(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} value={visionDesc} onChange={e => setVisionDesc(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon Name (Lucide)</label>
                  <input type="text" className="form-control" value={visionIcon} onChange={e => setVisionIcon(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Main About Image</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="file" accept="image/*" onChange={(e) => handleMainImageSelect(e.target.files[0])} className="form-control" style={{ flex: 1 }} />
                {mainImagePreview && (
                  <img src={mainImagePreview} alt="Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ======================= AT A GLANCE ======================= */}
        <div className="content-card" style={{ width: '100%' }}>
          <div className="content-card-header" style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 600 }}>3. Company At A Glance</h2>
            <button type="button" onClick={handleOpenAddGlance} className="btn-primary" style={{ padding: '0.4rem 1rem' }}>
              <Plus size={14} /> <span>Add Card</span>
            </button>
          </div>
          <div className="content-card-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Section Badge</label>
                <input type="text" className="form-control" value={glanceBadge} onChange={e => setGlanceBadge(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Section Title</label>
                <input type="text" className="form-control" value={glanceTitle} onChange={e => setGlanceTitle(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {glanceCards.map((card) => (
                <div key={card.id || card._id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-input)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontWeight: 700 }}>{card.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Icon: {card.icon}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{card.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button type="button" onClick={() => handleOpenEditGlance(card)} className="file-upload-btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Edit</button>
                    <button type="button" onClick={() => handleDeleteGlance(card.id || card._id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--danger)' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </form>

      {/* Glance Card Modal */}
      {showGlanceModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', width: '400px', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3>{editingGlanceId ? 'Edit Card' : 'Add Card'}</h3>
              <button type="button" onClick={() => setShowGlanceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={glanceModalTitle} onChange={e => setGlanceModalTitle(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} value={glanceModalDesc} onChange={e => setGlanceModalDesc(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Lucide Icon Name</label>
              <input type="text" className="form-control" value={glanceModalIcon} onChange={e => setGlanceModalIcon(e.target.value)} placeholder="e.g. Building2, Target, Wrench" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className="file-upload-btn" onClick={() => setShowGlanceModal(false)}>Cancel</button>
              <button type="button" className="btn-primary" onClick={handleSaveGlanceModal}>Save Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
