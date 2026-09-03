import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Bell, Check, Clock } from 'lucide-react';
import './Opciones.css';

export const Notificaciones = () => {
  const { notifications, markNotificationAsRead } = useApp();

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Centro de Notificaciones</h1>
        <p>Entérate de las últimas novedades, inicio de clases y entrega de certificados.</p>
      </div>

      <div className="notifications-list">
        {notifications.map(n => (
          <div key={n.id} className={`notification-item glass-card ${n.unread ? 'unread' : ''}`}>
            <div className="notif-icon-wrapper">
              <Bell size={20} />
            </div>

            <div className="notif-body">
              <div className="notif-header">
                <h3>{n.title}</h3>
                <span className="notif-time">{n.time}</span>
              </div>
              <p>{n.text}</p>
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
