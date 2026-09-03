import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DIPLOMAS_DATA } from '../data/mockData';
import { ArrowLeft, Award, Download, Share2, CheckCircle2, FileCheck, PlusCircle } from 'lucide-react';
import './Diplomas.css';

export const Diplomas = () => {
  const { searchTerm, user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const [diplomasList, setDiplomasList] = useState(DIPLOMAS_DATA);
  const [selectedDiplomaModal, setSelectedDiplomaModal] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 101, student: 'María Fernanda López', course: 'Desarrollo Web React', date: 'Hoy' },
    { id: 102, student: 'Alejandro Martínez', course: 'Diseño UX/UI & Figma', date: 'Ayer' }
  ]);

  const filteredDiplomas = diplomasList.filter(d =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveCertificate = (appId, student, course) => {
    const newCert = {
      id: Date.now(),
      title: `Diploma en ${course}`,
      category: 'Certificado Emitido',
      date: 'Hoy (Emitido por ' + user.name + ')',
      code: `NEXUS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80',
      status: 'Aprobado y Emitido'
    };

    setDiplomasList([newCert, ...diplomasList]);
    setPendingApprovals(prev => prev.filter(p => p.id !== appId));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>{isTeacher ? 'Gestión y Emisión de Diplomas' : 'Mis Diplomas y Certificaciones'}</h1>
        <p>
          {isTeacher
            ? 'Aprueba y emite los certificados oficiales para los estudiantes que han completado el 100% de sus actividades.'
            : 'Consulta y descarga tus reconocimientos académicos verificados oficialmente.'
          }
        </p>
      </div>

      {isTeacher && pendingApprovals.length > 0 && (
        <div className="teacher-approval-panel glass-card">
          <h2><FileCheck size={20} /> Solicitudes Pendientes de Aprobación ({pendingApprovals.length})</h2>

          <div className="approval-items-list">
            {pendingApprovals.map(req => (
              <div key={req.id} className="approval-item">
                <div className="approval-info">
                  <strong>{req.student}</strong>
                  <span>Solicita diploma para: <em>{req.course}</em></span>
                </div>
                <button
                  className="btn-primary approve-btn"
                  onClick={() => handleApproveCertificate(req.id, req.student, req.course)}
                >
                  <CheckCircle2 size={16} />
                  <span>Aprobar y Emitir</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="diplomas-grid">
        {filteredDiplomas.map(diploma => (
          <article key={diploma.id} className="diploma-card glass-card">
            <div className="diploma-img-wrapper">
              <img src={diploma.image} alt={diploma.title} className="diploma-img" />
              <div className="diploma-badge-overlay">
                <Award size={24} className="award-badge-icon" />
              </div>
            </div>

            <div className="diploma-body">
              <span className="badge badge-success">{diploma.status}</span>
              <h3>{diploma.title}</h3>
              <p className="diploma-date">Expedido: {diploma.date}</p>
              <p className="diploma-code">Código de Verificación: <code>{diploma.code}</code></p>

              <div className="diploma-actions">
                <button className="btn-secondary" onClick={() => setSelectedDiplomaModal(diploma)}>
                  <span>Ver Diploma</span>
                </button>
                <button className="btn-primary">
                  <Download size={16} />
                  <span>Descargar PDF</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Diploma Modal Preview */}
      {selectedDiplomaModal && (
        <div className="modal-backdrop" onClick={() => setSelectedDiplomaModal(null)}>
          <div className="diploma-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="diploma-certificate-frame">
              <Award size={48} className="modal-award-icon" />
              <h2>EduNexus - CERTIFICADO DE EXCELENCIA</h2>
              <p className="cert-sub">Otorgado a:</p>
              <h3 className="cert-student-name">{user.roleType === 'teacher' ? 'Estudiante Aprobado' : user.name}</h3>
              <p className="cert-desc">Por haber culminado satisfactoriamente el plan de estudios de:</p>
              <h4 className="cert-title">{selectedDiplomaModal.title}</h4>
              <p className="cert-meta-info">Fecha de Emisión: {selectedDiplomaModal.date} | Código: {selectedDiplomaModal.code}</p>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelectedDiplomaModal(null)}>
                Cerrar
              </button>
              <button className="btn-primary">
                <Download size={16} />
                Descargar Certificado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
