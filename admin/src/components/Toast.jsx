import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle2 size={18} color="var(--success)" />
        <span>{message}</span>
        <button onClick={onClose} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
