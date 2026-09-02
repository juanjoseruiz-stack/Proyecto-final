import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DIPLOMAS_DATA } from '../data/mockData';
import { ArrowLeft, Award, Download, Share2, CheckCircle } from 'lucide-react';
import './Diplomas.css';

export const Diplomas = () => {
  const { searchTerm } = useApp();
  const [selectedDiplomaModal, setSelectedDiplomaModal] = useState(null);

  const filteredDiplomas = DIPLOMAS_DATA.filter(d =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Mis Diplomas y Certificaciones</h1>
        <p>Consulta y descarga tus reconocimientos académicos verificados oficialmente.</p>
      </div>

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
              <p className="diploma-date">Expedido el: {diploma.date}</p>
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
              <h3 className="cert-student-name">Estudiante EduNexus</h3>
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
