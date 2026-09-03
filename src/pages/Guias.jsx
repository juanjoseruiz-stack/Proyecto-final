import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GUIDES_DATA } from '../data/mockData';
import { ArrowLeft, BookOpen, Download, FileText, Eye, PlusCircle, Upload, Edit3, X, Save } from 'lucide-react';
import './Guias.css';

export const Guias = () => {
  const { searchTerm, user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const [guides, setGuides] = useState(GUIDES_DATA);
  const [selectedSubject, setSelectedSubject] = useState('Todos');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null); // guide object being edited

  const [guideForm, setGuideForm] = useState({
    title: '',
    subject: 'Matemáticas',
    grade: '11° Grado',
    pages: 15,
    icon: '📄'
  });

  const subjects = ['Todos', 'Matemáticas', 'Ciencias', 'Filosofía', 'Inglés', 'Lenguaje', 'Sociales'];

  const filteredGuides = guides.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'Todos' || g.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleOpenUploadModal = () => {
    setEditingGuide(null);
    setGuideForm({ title: '', subject: 'Matemáticas', grade: '11° Grado', pages: 15, icon: '📄' });
    setShowUploadModal(true);
  };

  const handleOpenEditModal = (guide) => {
    setEditingGuide(guide);
    setGuideForm({
      title: guide.title,
      subject: guide.subject,
      grade: guide.grade,
      pages: guide.pages,
      icon: guide.icon || '📄'
    });
    setShowUploadModal(true);
  };

  const handleSaveGuide = (e) => {
    e.preventDefault();
    if (!guideForm.title.trim()) return;

    if (editingGuide) {
      // Edit existing guide
      setGuides(prev => prev.map(g => g.id === editingGuide.id ? {
        ...g,
        title: guideForm.title,
        subject: guideForm.subject,
        grade: guideForm.grade,
        pages: parseInt(guideForm.pages) || 15,
        icon: guideForm.icon
      } : g));
    } else {
      // Upload new guide
      const created = {
        id: `guide-${Date.now()}`,
        subject: guideForm.subject,
        title: guideForm.title,
        grade: guideForm.grade,
        pages: parseInt(guideForm.pages) || 15,
        downloadUrl: '#',
        icon: guideForm.icon || '📄'
      };
      setGuides([created, ...guides]);
    }

    setShowUploadModal(false);
    setEditingGuide(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>

        <div className="header-title-bar">
          <div>
            <h1>Guías de Estudio Digitales</h1>
            <p>
              {isTeacher
                ? 'Publica, edita y administra el material de estudio en PDF para tus estudiantes.'
                : 'Accede a material conceptual, resúmenes y ejercicios preparados por tus docentes.'
              }
            </p>
          </div>

          {isTeacher && (
            <button className="btn-primary" onClick={handleOpenUploadModal}>
              <Upload size={18} />
              <span>Publicar Nueva Guía</span>
            </button>
          )}
        </div>
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

              {isTeacher ? (
                <button
                  className="btn-primary guide-edit-btn"
                  onClick={() => handleOpenEditModal(guide)}
                  title="Editar datos de la guía"
                >
                  <Edit3 size={16} />
                  <span>Editar</span>
                </button>
              ) : (
                <button className="btn-primary guide-download-btn" title="Descargar PDF">
                  <Download size={16} />
                  <span>Descargar</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal for Creating or Editing a Guide */}
      {showUploadModal && (
        <div className="modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="schedule-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingGuide ? 'Editar Guía de Estudio' : 'Publicar Nueva Guía de Estudio'}</h2>
              <button className="close-btn" onClick={() => setShowUploadModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveGuide} className="schedule-form">
              <div className="form-group">
                <label>Título de la Guía</label>
                <input
                  type="text"
                  placeholder="Ej. Guía #7: Geometría Analítica y Cónicas"
                  value={guideForm.title}
                  onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Asignatura</label>
                <select
                  value={guideForm.subject}
                  onChange={(e) => setGuideForm({ ...guideForm, subject: e.target.value })}
                >
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Ciencias">Ciencias</option>
                  <option value="Filosofía">Filosofía</option>
                  <option value="Inglés">Inglés</option>
                  <option value="Lenguaje">Lenguaje</option>
                  <option value="Sociales">Sociales</option>
                </select>
              </div>

              <div className="form-group">
                <label>Grado / Nivel</label>
                <input
                  type="text"
                  placeholder="Ej. 11° Grado"
                  value={guideForm.grade}
                  onChange={(e) => setGuideForm({ ...guideForm, grade: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Número de Páginas</label>
                <input
                  type="number"
                  placeholder="15"
                  value={guideForm.pages}
                  onChange={(e) => setGuideForm({ ...guideForm, pages: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingGuide ? <Save size={16} /> : <Upload size={16} />}
                  <span>{editingGuide ? 'Guardar Cambios' : 'Publicar Documento'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
