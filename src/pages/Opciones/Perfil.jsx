import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, User, Mail, Shield, Save, Camera } from 'lucide-react';
import './Opciones.css';

export const Perfil = () => {
  const { user, setUser } = useApp();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    level: user.level
  });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, ...formData }));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Mi Perfil de Usuario</h1>
        <p>Gestiona tu información personal y credenciales de acceso.</p>
      </div>

      <div className="opciones-card glass-card">
        <div className="profile-header-area">
          <div className="avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-avatar-large" />
            <button className="change-avatar-btn" title="Cambiar foto">
              <Camera size={16} />
            </button>
          </div>

          <div className="profile-titles">
            <h2>{user.name}</h2>
            <span className="badge badge-primary">{user.role}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="opciones-form">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Nivel de Estudio</label>
            <input
              type="text"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            />
          </div>

          <div className="form-actions">
            {savedMessage && <span className="saved-badge">✓ Cambios guardados con éxito</span>}
            <button type="submit" className="btn-primary">
              <Save size={16} />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
