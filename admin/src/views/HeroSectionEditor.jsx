import React, { useState } from 'react';
import { Video, Upload, Save, Play, Check } from 'lucide-react';

export default function HeroSectionEditor({ onShowToast }) {
  const [title, setTitle] = useState('Build Next-Gen Web & Digital Experience');
  const [subtitle, setSubtitle] = useState('Transforming ideas into high-performance enterprise digital platforms');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [isSaving, setIsSaving] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      onShowToast(`Selected video: ${file.name}`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('Hero Section updated successfully!');
    }, 800);
  };

  return (
    <div className="content-card">
      <div className="content-card-header">
        <h2 className="card-title">
          <Video size={20} color="var(--primary)" />
          Hero Section
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last edited today at 19:42</span>
      </div>

      <div className="content-card-body">
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Title Row */}
          <div className="form-row">
            <label className="form-label" htmlFor="hero-title">Title</label>
            <input
              id="hero-title"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Hero Section Title..."
            />
          </div>

          {/* Subtitle Row */}
          <div className="form-row">
            <label className="form-label" htmlFor="hero-subtitle">Subtitle</label>
            <input
              id="hero-subtitle"
              type="text"
              className="form-control"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter Hero Section Subtitle..."
            />
          </div>

          {/* Upload Background Video Row */}
          <div className="form-row">
            <label className="form-label">Upload Background Video</label>
            <div className="file-upload-wrapper">
              <label htmlFor="video-upload-input" className="file-upload-btn">
                <Upload size={16} />
                <span>Choose File</span>
              </label>
              <input
                id="video-upload-input"
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
              />
              <span className="file-name">
                {videoFile ? videoFile.name : 'No file chosen (Using default sample)'}
              </span>
            </div>
          </div>

          {/* Preview Row */}
          <div className="form-row" style={{ alignItems: 'flex-start' }}>
            <label className="form-label" style={{ paddingTop: '0.5rem' }}>Preview</label>
            <div className="preview-container">
              <div className="video-preview-box">
                {videoPreviewUrl ? (
                  <video
                    key={videoPreviewUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={videoPreviewUrl}
                  />
                ) : (
                  <div className="video-preview-placeholder">
                    <Play size={36} color="var(--text-muted)" />
                    <span>🎥 Video Preview</span>
                  </div>
                )}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Recommended resolution: 1920x1080 (MP4, WebM format). Max size 50MB.
              </span>
            </div>
          </div>

          {/* Save Button Row */}
          <div className="form-row">
            <div></div>
            <div>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
