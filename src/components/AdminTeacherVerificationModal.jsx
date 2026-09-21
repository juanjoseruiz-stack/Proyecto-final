import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, Check, X, Clock, Eye, AlertCircle, Award } from 'lucide-react';
import './AdminTeacherVerificationModal.css';

export const AdminTeacherVerificationModal = ({ isOpen, onClose }) => {
  const { pendingVerifications, approveTeacherVerification, rejectTeacherVerification } = useApp();
  const [selectedDiploma, setSelectedDiploma] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="admin-verification-overlay">
      <div className="admin-verification-modal glass-card">
        <div className="admin-modal-header">
          <div className="header-title-group">
            <ShieldCheck size={24} className="header-icon" />
            <div>
              <h2>Panel de Verificación de Docentes</h2>
              <p>Revisión y validación de diplomas para nuevos docentes registrados</p>
            </div>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body">
          {pendingVerifications.length === 0 ? (
            <div className="empty-verifications">
              <Check size={40} className="check-icon" />
              <h3>No hay solicitudes pendientes</h3>
              <p>Todos los diplomas de docentes registrados han sido verificados.</p>
            </div>
          ) : (
            <div className="verifications-list">
              {pendingVerifications.map((item) => (
                <div key={item.id} className={`verification-item-card ${item.status}`}>
                  <div className="item-main-info">
                    <div className="teacher-avatar-badge">
                      {item.name.charAt(0)}
                    </div>
                    <div className="teacher-text-details">
                      <div className="name-and-status">
                        <h4>{item.name}</h4>
                        <span className={`status-badge ${item.status}`}>
                          {item.status === 'pending' && <><Clock size={12} /> Pendiente</>}
                          {item.status === 'verified' && <><Check size={12} /> Aprobado</>}
                          {item.status === 'rejected' && <><X size={12} /> Rechazado</>}
                        </span>
                      </div>
                      <p className="teacher-email">{item.email}</p>
                      
                      <div className="accreditation-meta">
                        <span className="meta-tag">
                          <Award size={13} /> Reg: <strong>{item.professionalId || 'No provisto'}</strong>
                        </span>
                        <span className="meta-tag">
                          <FileText size={13} /> {item.diplomaFileName || 'Diploma.pdf'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="item-actions">
                    <button 
                      className="btn-secondary btn-sm"
                      onClick={() => setSelectedDiploma(item)}
                      title="Ver Diploma Adjunto"
                    >
                      <Eye size={15} />
                      <span>Ver Diploma</span>
                    </button>

                    {item.status === 'pending' && (
                      <>
                        <button 
                          className="btn-success btn-sm"
                          onClick={() => approveTeacherVerification(item.id)}
                        >
                          <Check size={15} />
                          <span>Aprobar</span>
                        </button>
                        <button 
                          className="btn-danger btn-sm"
                          onClick={() => rejectTeacherVerification(item.id)}
                        >
                          <X size={15} />
                          <span>Rechazar</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal interno para previsualizar diploma */}
        {selectedDiploma && (
          <div className="diploma-preview-dialog-overlay" onClick={() => setSelectedDiploma(null)}>
            <div className="diploma-preview-dialog glass-card" onClick={(e) => e.stopPropagation()}>
              <div className="preview-dialog-header">
                <h3><FileText size={18} /> Previsualización de Diploma</h3>
                <button className="close-preview-btn" onClick={() => setSelectedDiploma(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="preview-dialog-body">
                <div className="document-mock-frame">
                  <div className="doc-header-stamp">
                    <Award size={48} color="#6366f1" />
                    <h2>CERTIFICADO DE ACREDITACIÓN DOCENTE</h2>
                    <span className="doc-subtitle">República de Colombia - Ministerio de Educación</span>
                  </div>
                  
                  <div className="doc-content-body">
                    <p>Se certifica que el profesional <strong>{selectedDiploma.name}</strong> ha acreditado su título y registro docente número <code>{selectedDiploma.professionalId}</code>.</p>
                    <p className="doc-filename-info">Archivo adjunto entregado: <code>{selectedDiploma.diplomaFileName}</code></p>
                  </div>

                  <div className="doc-footer-signatures">
                    <div className="sig-line">
                      <span>Firma del Inspector Académico</span>
                    </div>
                    <div className="sig-line">
                      <span>Sello de Validación EduNexus</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-dialog-actions">
                {selectedDiploma.status === 'pending' && (
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      approveTeacherVerification(selectedDiploma.id);
                      setSelectedDiploma(null);
                    }}
                  >
                    <Check size={16} /> Aprobar Acreditación de {selectedDiploma.name.split(' ')[0]}
                  </button>
                )}
                <button className="btn-secondary" onClick={() => setSelectedDiploma(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeacherVerificationModal;
