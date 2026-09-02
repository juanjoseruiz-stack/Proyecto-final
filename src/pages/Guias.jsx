import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GUIDES_DATA } from '../data/mockData';
import { ArrowLeft, BookOpen, Download, FileText, Eye } from 'lucide-react';
import './Guias.css';

export const Guias = () => {
  const { searchTerm } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('Todos');

  const subjects = ['Todos', 'Matemáticas', 'Ciencias', 'Filosofía', 'Inglés', 'Lenguaje', 'Sociales'];

  const filteredGuides = GUIDES_DATA.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'Todos' || g.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Guías de Estudio Digitales</h1>
        <p>Accede a material conceptual, resúmenes y ejercicios preparados por tus docentes.</p>
      </div>

      <div className="category-tabs">
        {subjects.map(subj => (
          <button
            key={subj}
            className={`tab-btn ${selectedSubject === subj ? 'active' : ''}`}
            onClick={() => setSelectedSubject(subj)}
          >
            {subj}
          </button>
        ))}
      </div>

      <div className="guides-grid">
        {filteredGuides.map(guide => (
          <article key={guide.id} className="guide-card glass-card">
            <div className="guide-header">
              <span className="guide-icon">{guide.icon}</span>
              <span className="badge badge-primary">{guide.grade}</span>
            </div>

            <div className="guide-body">
              <span className="guide-subject-label">{guide.subject}</span>
              <h3>{guide.title}</h3>
              <div className="guide-details">
                <FileText size={16} />
                <span>{guide.pages} Páginas ilustradas</span>
              </div>
            </div>

            <div className="guide-actions">
              <Link to={`/guias/${guide.id}`} className="btn-secondary guide-view-btn">
                <Eye size={16} />
                <span>Ver Guía</span>
              </Link>
              <button className="btn-primary guide-download-btn" title="Descargar PDF">
                <Download size={16} />
                <span>Descargar</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="empty-state glass-card">
          <p>No se encontraron guías para la búsqueda actual.</p>
        </div>
      )}
    </div>
  );
};
