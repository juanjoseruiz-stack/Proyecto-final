import React, { useState } from 'react';
import { X, User, GraduationCap, ArrowRight, Check, Sparkles } from 'lucide-react';
import './GoogleAccountPickerModal.css';

export const GoogleAccountPickerModal = ({ isOpen, onClose, onSelectAccount, roleType }) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  if (!isOpen) return null;

  const isDoc = roleType === 'teacher';

  const defaultAccounts = [
    {
      id: 'g-1',
      name: isDoc ? 'Prof. Carlos Gómez (Google Edu)' : 'María López (Google Estudiante)',
      email: isDoc ? 'carlos.gomez.docente@gmail.com' : 'maria.lopez.estudiante@gmail.com',
      avatar: isDoc ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      tag: isDoc ? 'Docente Verificado' : 'Estudiante Activo'
    },
    {
      id: 'g-2',
      name: isDoc ? 'Prof. Laura Benítez (Google Certificado)' : 'Alejandro Martínez (Google Estudiante)',
      email: isDoc ? 'laura.benitez.docente@gmail.com' : 'alejandro.martinez@gmail.com',
      avatar: isDoc ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      tag: isDoc ? 'Docente Titular' : 'Estudiante 11°'
    }
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    onSelectAccount({
      name: customName.trim() || customEmail.split('@')[0],
      email: customEmail.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div className="modal-backdrop google-sso-backdrop" onClick={onClose}>
      <div className="google-sso-modal glass-card animate-fadeIn" onClick={e => e.stopPropagation()}>
        <div className="google-sso-header">
          <div className="google-brand-header">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <h2>Inicia sesión con Google</h2>
          </div>
          <p>Para continuar en <strong>EduNexus ({isDoc ? 'Docente' : 'Estudiante'})</strong></p>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {!showCustomForm ? (
          <div className="google-accounts-list">
            <span className="list-title">Selecciona una cuenta registrada:</span>

            {defaultAccounts.map(account => (
              <div 
                key={account.id} 
                className="google-account-item"
                onClick={() => onSelectAccount(account)}
              >
                <img src={account.avatar} alt={account.name} className="google-account-avatar" />
                <div className="google-account-info">
                  <span className="account-name">{account.name}</span>
                  <span className="account-email">{account.email}</span>
                </div>
                <span className="account-tag">{account.tag}</span>
              </div>
            ))}

            <button 
              type="button" 
              className="use-another-account-btn"
              onClick={() => setShowCustomForm(true)}
            >
              <User size={16} />
              <span>Usar otra cuenta de Google (@gmail.com)</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="custom-google-form">
            <span className="list-title">Ingresa con tu correo de Google:</span>

            <div className="form-group">
              <label>Nombre Completo (Google Profile)</label>
              <input 
                type="text" 
                placeholder="Ej. Ana María Silva"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Correo Electrónico Gmail *</label>
              <input 
                type="email" 
                placeholder="usuario@gmail.com"
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowCustomForm(false)}
              >
                Volver a la lista
              </button>
              <button type="submit" className="btn-primary">
                <span>Continuar con Google</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        <div className="google-modal-footer">
          <span>EduNexus usa la autenticación oficial de Google Workspace.</span>
        </div>
      </div>
    </div>
  );
};
