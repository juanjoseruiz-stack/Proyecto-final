import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, User, Mail, Shield, Save, Camera, FileText, 
  Award, CheckCircle2, Clock, ShieldAlert, Download, Eye 
} from 'lucide-react';
import './Opciones.css';

export const Perfil = () => {
  const { user, setUser } = useApp();
  const isTeacher = user.roleType === 'teacher';
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    level: user.level || '',
    professionalId: user.professionalId || ''
  });
  const [savedMessage, setSavedMessage] = useState(false);
  const [showDiplomaModal, setShowDiplomaModal] = useState(false);

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
            <div className="badges-group">
              <span className="badge badge-primary">{user.role}</span>
              {isTeacher && (
                <span className={`badge ${user.verificationStatus === 'verified' ? 'badge-success' : 'badge-warning'}`}>
                  {user.verificationStatus === 'verified' ? '✓ Docente Acreditado' : '⌛ Verificación Pendiente'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Acreditación y Diploma (Solo Docentes) */}
        {isTeacher && (
          <div className="profile-accreditation-section">
            <h3><Award size={18} /> Acreditación Docente y Diploma</h3>
            
            <div className="accreditation-card-box">
              <div className="accreditation-details">
                <div className="accred-row">
                  <span className="accred-label">Estado de Verificación:</span>
                  <span className={`accred-value ${user.verificationStatus || 'pending'}`}>
                    {user.verificationStatus === 'verified' && '✓ Aprobado por la Administración'}
                    {user.verificationStatus === 'rejected' && '✗ Rechazado'}
                    {(user.verificationStatus === 'pending' || !user.verificationStatus) && '⌛ Pendiente de Revisión Administrativa'}
                  </span>
                </div>
                
                <div className="accred-row">
                  <span className="accred-label">Cédula Docente / Registro:</span>
                  <span className="accred-value code-value">
                    {user.professionalId || 'TP-948201-COL'}
                  </span>
                </div>

                <div className="accred-row">
                  <span className="accred-label">Documento de Diploma Adjunto:</span>
                  <div className="diploma-file-preview">
                    <FileText size={18} className="file-icon" />
                    <span className="file-name">{user.diplomaFileName || 'Diploma_Licenciatura.pdf'}</span>
                    <button 
                      type="button" 
                      className="btn-link-action"
                      onClick={() => setShowDiplomaModal(true)}
                    >
                      <Eye size={14} /> Ver Documento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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

          {isTeacher ? (
            <div className="form-group">
              <label>Número de Tarjeta Profesional / Registro Docente</label>
              <input
                type="text"
                value={formData.professionalId}
                onChange={(e) => setFormData({ ...formData, professionalId: e.target.value })}
              />
            </div>
          ) : (
            <div className="form-group">
              <label>Nivel de Estudio</label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              />
            </div>
          )}

          <div className="form-actions">
            {savedMessage && <span className="saved-badge">✓ Cambios guardados con éxito</span>}
            <button type="submit" className="btn-primary">
              <Save size={16} />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>

      {/* Modal de visualización de diploma */}
      {showDiplomaModal && (
        <div className="diploma-preview-dialog-overlay" onClick={() => setShowDiplomaModal(false)}>
          <div className="diploma-preview-dialog glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="preview-dialog-header">
              <h3><FileText size={18} /> Diploma del Docente</h3>
              <button className="close-preview-btn" onClick={() => setShowDiplomaModal(false)}>✕</button>
            </div>
            <div className="preview-dialog-body">
              <div className="document-mock-frame">
                <div className="doc-header-stamp">
                  <Award size={48} color="#6366f1" />
                  <h2>DIPLOMA DE ACCESO DOCENTE</h2>
                  <span className="doc-subtitle">EduNexus - Documento Acreditativo</span>
                </div>
                <div className="doc-content-body">
                  <p>Documento oficial adjuntado por <strong>{user.name}</strong> para sustentar la acreditación de profesor en la plataforma EduNexus.</p>
                  <p className="doc-filename-info">Archivo registrado: <code>{user.diplomaFileName || 'Diploma_Docente.pdf'}</code></p>
                </div>
              </div>
            </div>
            <div className="preview-dialog-actions">
              <button className="btn-secondary" onClick={() => setShowDiplomaModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
