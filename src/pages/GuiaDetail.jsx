import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GUIDES_DATA } from '../data/mockData';
import { ArrowLeft, Download, Bookmark, Share2, CheckCircle2, Edit3, Save, X } from 'lucide-react';
import './GuiaDetail.css';

export const GuiaDetail = () => {
  const { id } = useParams();
  const { user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const initialGuide = GUIDES_DATA.find(g => g.id === id) || GUIDES_DATA[0];

  const [guideData, setGuideData] = useState({
    title: initialGuide.title,
    subject: initialGuide.subject,
    grade: initialGuide.grade,
    pages: initialGuide.pages,
    note: 'Revisa especialmente los ejercicios de autoevaluación al final de la sección 2 antes del próximo taller interactivo.',
    objectives: [
      'Comprender la base teórica y su aplicación contextual.',
      'Resolver problemas complejos paso a paso con la metodología EduNexus.',
      'Desarrollar pensamiento crítico y capacidad analítica.'
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="page-container">
      <Link to="/guias" className="back-btn">
        <ArrowLeft size={18} />
        <span>Volver a Guías</span>
      </Link>

      <div className="guide-reader-container glass-card">
        <div className="reader-header">
          <div className="reader-title-area">
            <span className="badge badge-primary">{guideData.subject}</span>
            <h1>{guideData.title}</h1>
            <p className="reader-meta">Dirigido a: {guideData.grade} | Extensión: {guideData.pages} Páginas | Formato PDF Interactivo</p>
          </div>
          <div className="reader-header-actions">
            {isTeacher && (
              <button 
                className={`btn-primary ${isEditing ? 'btn-secondary' : ''}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X size={18} /> : <Edit3 size={18} />}
                <span>{isEditing ? 'Cancelar Edición' : 'Editar Contenido'}</span>
              </button>
            )}

            <button className="btn-secondary">
              <Bookmark size={18} />
              <span>Guardar</span>
            </button>
            <button className="btn-primary">
              <Download size={18} />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="saved-alert-banner">
            <CheckCircle2 size={18} />
            <span>Los cambios en el contenido de la guía han sido guardados exitosamente.</span>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} className="guide-edit-form glass-card">
            <h3>Editar Contenido de la Guía (Docente)</h3>

            <div className="form-group">
              <label>Título de la Guía</label>
              <input
                type="text"
                value={guideData.title}
                onChange={(e) => setGuideData({ ...guideData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Asignatura y Grado</label>
              <div className="form-row-2">
                <input
                  type="text"
                  value={guideData.subject}
                  onChange={(e) => setGuideData({ ...guideData, subject: e.target.value })}
                />
                <input
                  type="text"
                  value={guideData.grade}
                  onChange={(e) => setGuideData({ ...guideData, grade: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nota Importante del Docente</label>
              <textarea
                rows={3}
                value={guideData.note}
                onChange={(e) => setGuideData({ ...guideData, note: e.target.value })}
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <Save size={16} />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="reader-document-preview">
            <div className="preview-page">
              <h2>Módulo 1: Introducción y Fundamentos</h2>
              <hr className="divider" />
              <p>
                El propósito de esta guía es proporcionar los conceptos clave, teoremas y casos prácticos necesarios para dominar la materia de <strong>{guideData.subject}</strong>.
              </p>

              <h3>Objetivos de Aprendizaje:</h3>
              <ul className="learning-objectives">
                {guideData.objectives.map((obj, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={18} className="check-icon" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              <div className="preview-callout glass-card">
                <h4>💡 Nota Importante del Docente</h4>
                <p>{guideData.note}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
