import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Bell, Check, Key, Copy, Video } from 'lucide-react';
import './Opciones.css';

export const Notificaciones = () => {
  const { notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleJoinWithCode = (notif) => {
    markNotificationAsRead(notif.id);
    navigate('/clases', { 
      state: { 
        autoCode: notif.accessCode, 
        autoClassId: notif.classId 
      } 
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Centro de Notificaciones</h1>
        <p>Entérate de los códigos de clases en vivo, avisos de docentes y novedades.</p>
      </div>

      <div className="notifications-list">
        {notifications.map(n => (
          <div key={n.id} className={`notification-item glass-card ${n.unread ? 'unread' : ''}`}>
            <div className={`notif-icon-wrapper ${n.accessCode ? 'code-notif' : ''}`}>
              {n.accessCode ? <Key size={20} color="#facc15" /> : <Bell size={20} />}
            </div>

            <div className="notif-body">
              <div className="notif-header">
                <h3>{n.title}</h3>
                <span className="notif-time">{n.time}</span>
              </div>
              <p>{n.text}</p>

              {n.accessCode && (
                <div className="notif-code-action-box">
                  <span className="notif-code-badge">
                    <Key size={13} /> Código de Sala: <code>{n.accessCode}</code>
                  </span>
                  
                  <div className="notif-action-buttons">
                    <button 
                      type="button"
                      className="btn-secondary notif-copy-btn"
                      onClick={() => handleCopyCode(n.accessCode, n.id)}
                    >
                      <Copy size={13} />
                      <span>{copiedId === n.id ? '¡Copiado!' : 'Copiar Código'}</span>
                    </button>

                    <button 
                      type="button"
                      className="btn-primary notif-join-btn"
                      onClick={() => handleJoinWithCode(n)}
                    >
                      <Video size={13} />
                      <span>Ir a la Clase con Código</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {n.unread && (
              <button 
                className="mark-read-btn" 
                title="Marcar como leída"
                onClick={() => markNotificationAsRead(n.id)}
              >
                <Check size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

