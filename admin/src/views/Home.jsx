import React, { useState, useEffect } from 'react';
import { Save, UploadCloud, Film, CheckCircle2, Link2, Type, FileText, Plus, X, Image as ImageIcon, Layers } from 'lucide-react';
import { fetchHeroConfig, updateHeroConfig, fetchSection2Config, updateSection2Config } from '../services/api';

export default function Home({ onShowToast }) {
  // ==========================================
  // SECTION 1: HERO SECTION STATE
  // ==========================================
  const [title, setTitle] = useState('Welcome to Unise');
  const [heading, setHeading] = useState("UAE's Trusted Security Systems Partner");
  const [description, setDescription] = useState(
    'Protecting businesses, assets, and people across Dubai, Abu Dhabi, Sharjah, and the UAE — with world-class physical security infrastructure, expert engineers, and zero-compromise service.'
  );

  const [words, setWords] = useState(["Design.", "Supply.", "Installation.", "Maintenance."]);
  const [newWord, setNewWord] = useState('');
  
  const [button1Text, setButton1Text] = useState('Request a Free Site Survey');
  const [button1Link, setButton1Link] = useState('/contact-us');
  const [button2Text, setButton2Text] = useState('Call Us Now: +971 50 288 5874');
  const [button2Link, setButton2Link] = useState('tel:+971502885874');

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [videoBase64, setVideoBase64] = useState('');
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [loadingHero, setLoadingHero] = useState(true);
  const [isSavingHero, setIsSavingHero] = useState(false);

  // ==========================================
  // SECTION 2: ABOUT / ECOSYSTEM SECTION STATE
  // ==========================================
  const [sec2Title, setSec2Title] = useState('Pioneering the Future of Secured Intelligence');
  const [sec2Heading, setSec2Heading] = useState('Next-Gen Architecture');
  const [sec2Description, setSec2Description] = useState(
    'UniSpark Innovation architectures orchestrate friction-free continuous analysis across critical enterprise vectors, neutralizing vulnerabilities before they cross your network perimeter.'
  );

  const [card1Title, setCard1Title] = useState('Cognitive Shielding');
  const [card1Desc, setCard1Desc] = useState('Self-learning neural vectors adapt instantly to network threats.');

  const [card2Title, setCard2Title] = useState('Microsecond Latency');
  const [card2Desc, setCard2Desc] = useState('Sub-atomic detection layers processing continuous data streams.');

  const [ecoBtnText, setEcoBtnText] = useState('Our Ecosystem');
  const [ecoBtnLink, setEcoBtnLink] = useState('/about-us');

  const [sec2ImageFile, setSec2ImageFile] = useState(null);
  const [sec2ImagePreviewUrl, setSec2ImagePreviewUrl] = useState('');
  const [sec2ImageBase64, setSec2ImageBase64] = useState('');
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  const [imgBtnText, setImgBtnText] = useState('99.99% Threat Isolation');
  const [imgBtnLink, setImgBtnLink] = useState('/solutions');

  const [loadingSec2, setLoadingSec2] = useState(true);
  const [isSavingSec2, setIsSavingSec2] = useState(false);

  // Load Hero Section 1 data
  const loadHeroData = async () => {
    setLoadingHero(true);
    const res = await fetchHeroConfig();
    if (res.success && res.data) {
      setTitle(res.data.title || 'Welcome to Unise');
      setHeading(res.data.heading || "UAE's Trusted Security Systems Partner");
      if (Array.isArray(res.data.words) && res.data.words.length > 0) {
        setWords(res.data.words);
      }
      setDescription(res.data.description || '');
      if (res.data.button1) {
        setButton1Text(res.data.button1.text || 'Request a Free Site Survey');
        setButton1Link(res.data.button1.link || '/contact-us');
      }
      if (res.data.button2) {
        setButton2Text(res.data.button2.text || 'Call Us Now: +971 50 288 5874');
        setButton2Link(res.data.button2.link || 'tel:+971502885874');
      }
      if (res.data.videoUrl) {
        setVideoPreviewUrl(res.data.videoUrl);
      }
    }
    setLoadingHero(false);
  };

  // Load Section 2 data
  const loadSection2Data = async () => {
    setLoadingSec2(true);
    const res = await fetchSection2Config();
    if (res.success && res.data) {
      setSec2Title(res.data.title || 'Pioneering the Future of Secured Intelligence');
      setSec2Heading(res.data.heading || 'Next-Gen Architecture');
      setSec2Description(res.data.description || '');
      if (res.data.card1) {
        setCard1Title(res.data.card1.title || 'Cognitive Shielding');
        setCard1Desc(res.data.card1.description || 'Self-learning neural vectors...');
      }
      if (res.data.card2) {
        setCard2Title(res.data.card2.title || 'Microsecond Latency');
        setCard2Desc(res.data.card2.description || 'Sub-atomic detection layers...');
      }
      if (res.data.ecosystemButton) {
        setEcoBtnText(res.data.ecosystemButton.text || 'Our Ecosystem');
        setEcoBtnLink(res.data.ecosystemButton.link || '/about-us');
      }
      if (res.data.imageUrl) {
        setSec2ImagePreviewUrl(res.data.imageUrl);
      }
      if (res.data.imageButton) {
        setImgBtnText(res.data.imageButton.text || '99.99% Threat Isolation');
        setImgBtnLink(res.data.imageButton.link || '/solutions');
      }
    }
    setLoadingSec2(false);
  };

  useEffect(() => {
    loadHeroData();
    loadSection2Data();
  }, []);

  // Section 1: Handle adding/removing word
  const handleAddWord = () => {
    if (newWord.trim()) {
      let wordToAdd = newWord.trim();
      if (!wordToAdd.endsWith('.')) {
        wordToAdd += '.';
      }
      setWords(prev => [...prev, wordToAdd]);
      setNewWord('');
      if (onShowToast) onShowToast(`Added word: ${wordToAdd}`);
    }
  };

  const handleRemoveWord = (indexToRemove) => {
    setWords(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Section 1: Handle Video selection
  const handleVideoFileSelect = (file) => {
    if (file) {
      if (!file.type.startsWith('video/')) {
        if (onShowToast) onShowToast('Please select a valid video file (MP4, WebM).');
        return;
      }
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoBase64(reader.result);
      };
      reader.readAsDataURL(file);

      if (onShowToast) onShowToast(`Selected video: ${file.name}`);
    }
  };

  // Section 2: Handle Image selection
  const handleSec2ImageSelect = (file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        if (onShowToast) onShowToast('Please select a valid image file (PNG, JPG, SVG, WebP).');
        return;
      }
      setSec2ImageFile(file);
      setSec2ImagePreviewUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setSec2ImageBase64(reader.result);
      };
      reader.readAsDataURL(file);

      if (onShowToast) onShowToast(`Selected image: ${file.name}`);
    }
  };

  // Section 1: Save Changes
  const handleSaveHero = async (e) => {
    if (e) e.preventDefault();
    setIsSavingHero(true);

    const payload = {
      title,
      heading,
      words,
      description,
      button1: { text: button1Text, link: button1Link },
      button2: { text: button2Text, link: button2Link },
      videoUrl: videoBase64 || videoPreviewUrl
    };

    const res = await updateHeroConfig(payload);
    setIsSavingHero(false);

    if (res.success && res.data) {
      if (res.data.videoUrl) {
        setVideoPreviewUrl(res.data.videoUrl);
        setVideoBase64('');
      }
      setVideoFile(null);
      if (onShowToast) {
        onShowToast('Hero Section saved successfully to MongoDB Atlas & Cloudinary!');
      }
    } else {
      if (onShowToast) {
        onShowToast(`Error saving Hero section: ${res.message || 'Failed to save to backend'}`);
      }
    }
  };

  // Section 2: Save Changes
  const handleSaveSection2 = async (e) => {
    if (e) e.preventDefault();
    setIsSavingSec2(true);

    const payload = {
      title: sec2Title,
      heading: sec2Heading,
      description: sec2Description,
      card1: { title: card1Title, description: card1Desc },
      card2: { title: card2Title, description: card2Desc },
      ecosystemButton: { text: ecoBtnText, link: ecoBtnLink },
      imageUrl: sec2ImageBase64 || sec2ImagePreviewUrl,
      imageButton: { text: imgBtnText, link: imgBtnLink }
    };

    const res = await updateSection2Config(payload);
    setIsSavingSec2(false);

    if (res.success && res.data) {
      if (res.data.imageUrl) {
        setSec2ImagePreviewUrl(res.data.imageUrl);
        setSec2ImageBase64('');
      }
      setSec2ImageFile(null);
      if (onShowToast) {
        onShowToast('Section 2 saved successfully to MongoDB Atlas & Cloudinary!');
      }
    } else {
      if (onShowToast) {
        onShowToast(`Error saving Section 2: ${res.message || 'Failed to save to backend'}`);
      }
    }
  };

  if (loadingHero && loadingSec2) {
    return (
      <div className="content-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading Home configurations from database...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION CARD                                              */}
      {/* ========================================================================= */}
      <div className="content-card" style={{ width: '100%' }}>
        
        {/* Header Bar */}
        <div 
          className="content-card-header" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Home &gt; Hero Section
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSaveHero}
            className="btn-primary"
            style={{ margin: 0, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            disabled={isSavingHero}
          >
            <Save size={16} />
            <span>{isSavingHero ? 'Saving...' : 'Save Changes'} 💾</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="content-card-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <form onSubmit={handleSaveHero} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Hero Section
            </h3>

            {/* Title * */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" htmlFor="hero-title" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Title <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                id="hero-title"
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Welcome to Unise"
                required
              />
            </div>

            {/* Heading * */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" htmlFor="hero-heading" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Heading <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <textarea
                id="hero-heading"
                className="form-control"
                rows={2}
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="UAE's Trusted Security Systems Partner"
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Animated / Rotating Words Section */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Type size={16} color="var(--primary)" />
                Animated / Rotating Words
              </label>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                These words rotate dynamically in the hero tagline header (e.g. UAE's Trusted Security Systems Partner - <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Design.</span>)
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                {words.map((word, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      padding: '0.45rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    <span>{word}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveWord(index)}
                      style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '0 0.2rem', border: 'none', background: 'none' }}
                      title="Remove word"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '480px', marginTop: '0.25rem' }}>
                <input
                  type="text"
                  className="form-control"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddWord();
                    }
                  }}
                  placeholder="Add new word (e.g. Maintenance.)"
                />
                <button
                  type="button"
                  onClick={handleAddWord}
                  className="file-upload-btn"
                  style={{ padding: '0.55rem 1.25rem', whiteSpace: 'nowrap', borderColor: 'var(--primary)', color: 'var(--primary)', fontWeight: 600 }}
                >
                  <Plus size={16} />
                  <span>Add Word</span>
                </button>
              </div>
            </div>

            {/* Description * */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" htmlFor="hero-description" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Description <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <textarea
                id="hero-description"
                className="form-control"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Lorem ipsum dolor sit amet..."
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Buttons Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>Button 1 Text</label>
                  <input type="text" className="form-control" value={button1Text} onChange={(e) => setButton1Text(e.target.value)} placeholder="Button 1 Text" />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>Button 1 Link</label>
                  <input type="text" className="form-control" value={button1Link} onChange={(e) => setButton1Link(e.target.value)} placeholder="/solutions" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>Button 2 Text</label>
                  <input type="text" className="form-control" value={button2Text} onChange={(e) => setButton2Text(e.target.value)} placeholder="Button 2 Text" />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>Button 2 Link</label>
                  <input type="text" className="form-control" value={button2Link} onChange={(e) => setButton2Link(e.target.value)} placeholder="/contact-us" />
                </div>
              </div>
            </div>

            {/* Background Video Section */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>Background Video</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingVideo(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDraggingVideo(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingVideo(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) handleVideoFileSelect(e.dataTransfer.files[0]);
                }}
                onClick={() => document.getElementById('hero-video-drop-input').click()}
                style={{
                  width: '100%',
                  minHeight: '200px',
                  border: `2px dashed ${isDraggingVideo ? 'var(--primary)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isDraggingVideo ? 'var(--primary-light)' : 'var(--bg-input)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <input id="hero-video-drop-input" type="file" accept="video/*" onChange={(e) => handleVideoFileSelect(e.target.files[0])} style={{ display: 'none' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎥</div>
                <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Drag &amp; Drop Video Here</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, marginBottom: '0.75rem' }}>or Click to Upload</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                  MP4 • Max 100MB
                </span>
                {videoFile && (
                  <div style={{ marginTop: '1rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
                    Selected: {videoFile.name}
                  </div>
                )}
              </div>

              {videoPreviewUrl && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Active Video Preview:</p>
                  <div className="video-preview-box" style={{ maxWidth: '640px', height: '260px' }}>
                    <video key={videoPreviewUrl} src={videoPreviewUrl} controls autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem' }} disabled={isSavingHero}>
                <Save size={18} />
                <span>{isSavingHero ? 'Uploading Video & Saving...' : 'Save Changes'}</span>
              </button>
            </div>

          </form>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* SECTION 2: SECTION 2 SETTINGS CARD (WITHOUT SECTION TITLE FIELD)          */}
      {/* ========================================================================= */}
      <div className="content-card" style={{ width: '100%' }}>
        
        {/* Section 2 Header Bar */}
        <div 
          className="content-card-header" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Home &gt; Website &gt; Home &gt; Section 2
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSaveSection2}
            className="btn-primary"
            style={{ margin: 0, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            disabled={isSavingSec2}
          >
            <Save size={16} />
            <span>{isSavingSec2 ? 'Saving...' : 'Save Changes'} 💾</span>
          </button>
        </div>

        {/* Section 2 Card Body */}
        <div className="content-card-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <form onSubmit={handleSaveSection2} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Section 2 Settings
            </h3>

            {/* Title */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" htmlFor="sec2-title" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Title
              </label>
              <input
                id="sec2-title"
                type="text"
                className="form-control"
                value={sec2Title}
                onChange={(e) => setSec2Title(e.target.value)}
                placeholder="Pioneering the Future of Secured Intelligence"
              />
            </div>

            {/* Heading / Badge Tag */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" htmlFor="sec2-heading" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Heading / Badge Tag
              </label>
              <input
                id="sec2-heading"
                type="text"
                className="form-control"
                value={sec2Heading}
                onChange={(e) => setSec2Heading(e.target.value)}
                placeholder="Next-Gen Architecture"
              />
            </div>

            {/* Description */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" htmlFor="sec2-description" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Description
              </label>
              <textarea
                id="sec2-description"
                className="form-control"
                rows={4}
                value={sec2Description}
                onChange={(e) => setSec2Description(e.target.value)}
                placeholder="UniSpark Innovation architectures orchestrate friction-free continuous analysis..."
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Feature Cards Grid (2 Boxes) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              {/* Card 1 */}
              <div style={{ backgroundColor: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    Button Title / Card 1 Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={card1Title}
                    onChange={(e) => setCard1Title(e.target.value)}
                    placeholder="Cognitive Shielding"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={card1Desc}
                    onChange={(e) => setCard1Desc(e.target.value)}
                    placeholder="Self-learning neural vectors adapt..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div style={{ backgroundColor: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    Button Title / Card 2 Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={card2Title}
                    onChange={(e) => setCard2Title(e.target.value)}
                    placeholder="Microsecond Latency"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={card2Desc}
                    onChange={(e) => setCard2Desc(e.target.value)}
                    placeholder="Sub-atomic detection layers..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

            </div>

            {/* Our Ecosystem Button */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="eco-btn-text" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  Our Ecosystem Button Text
                </label>
                <input
                  id="eco-btn-text"
                  type="text"
                  className="form-control"
                  value={ecoBtnText}
                  onChange={(e) => setEcoBtnText(e.target.value)}
                  placeholder="Our Ecosystem"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="eco-btn-link" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  Our Ecosystem Button Link
                </label>
                <input
                  id="eco-btn-link"
                  type="text"
                  className="form-control"
                  value={ecoBtnLink}
                  onChange={(e) => setEcoBtnLink(e.target.value)}
                  placeholder="/about-us"
                />
              </div>
            </div>

            {/* Upload Image Section */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Upload Image
              </label>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDraggingImage(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingImage(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleSec2ImageSelect(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => document.getElementById('sec2-image-drop-input').click()}
                style={{
                  width: '100%',
                  minHeight: '200px',
                  border: `2px dashed ${isDraggingImage ? 'var(--primary)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isDraggingImage ? 'var(--primary-light)' : 'var(--bg-input)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  id="sec2-image-drop-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSec2ImageSelect(e.target.files[0])}
                  style={{ display: 'none' }}
                />

                <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>
                  📤
                </div>

                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Upload Image
                </p>
                
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Drag &amp; Drop or Click to Upload
                </p>

                {sec2ImageFile && (
                  <div style={{ marginTop: '1rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
                    Selected: {sec2ImageFile.name}
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {sec2ImagePreviewUrl && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Active Section 2 Image Preview:
                  </p>
                  <div style={{ maxWidth: '440px', height: '240px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <img src={sec2ImagePreviewUrl} alt="Section 2 Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Image Button */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="img-btn-text" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  Image Button Text / Floating Badge Title
                </label>
                <input
                  id="img-btn-text"
                  type="text"
                  className="form-control"
                  value={imgBtnText}
                  onChange={(e) => setImgBtnText(e.target.value)}
                  placeholder="99.99% Threat Isolation"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="img-btn-link" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  Image Button Link
                </label>
                <input
                  id="img-btn-link"
                  type="text"
                  className="form-control"
                  value={imgBtnLink}
                  onChange={(e) => setImgBtnLink(e.target.value)}
                  placeholder="/solutions"
                />
              </div>
            </div>

            {/* Section 2 Save Changes Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.8rem 2.5rem', fontSize: '1rem' }}
                disabled={isSavingSec2}
              >
                <Save size={18} />
                <span>{isSavingSec2 ? 'Uploading Image & Saving...' : 'Save Changes'}</span>
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}
