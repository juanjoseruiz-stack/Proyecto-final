import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MATERIAS_COMPLEMENTARIAS } from '../data/mockData';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  User, 
  Award, 
  CheckSquare, 
  Square, 
  Download, 
  PlusCircle, 
  Upload, 
  Video, 
  Sliders, 
  Edit3, 
  X, 
  Save 
} from 'lucide-react';
import './MateriaDetail.css';

export const MateriaDetail = () => {
  const { id } = useParams();
  const { user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const initialMateria = MATERIAS_COMPLEMENTARIAS.find(m => m.id === id) || MATERIAS_COMPLEMENTARIAS[0];

  const [modules, setModules] = useState(initialMateria.modules || []);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonName, setNewLessonName] = useState('');

  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const toggleLesson = (mId, lId) => {
    setModules(prev => prev.map(m => m.id !== mId ? m : {
      ...m,
      lessons: m.lessons.map(l => l.id === lId ? { ...l, done: !l.done } : l)
    }));
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim() || !newLessonName.trim()) return;

    const newMod = {
      id: Date.now(),
      title: newModuleTitle,
      lessons: [
        { id: `${Date.now()}.1`, name: newLessonName, done: false }
      ]
    };

    setModules([...modules, newMod]);
    setShowAddModuleModal(false);
    setNewModuleTitle('');
    setNewLessonName('');
    showSuccess('¡Nuevo módulo y lección agregados a la asignatura!');
  };

  const showSuccess = (msg) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = modules.reduce((sum, m) => sum + m.lessons.filter(l => l.done).length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="page-container">
      <Link to="/materias" className="back-btn">
        <ArrowLeft size={18} />
        <span>Volver a Materias Complementarias</span>
      </Link>

      {/* Course Hero Banner */}
      <div className="materia-hero glass-card">
        <div className="materia-hero-content">
          <div className="materia-hero-badge">
            <span className="badge badge-primary">{initialMateria.category}</span>
            <span className="materia-icon-inline">{initialMateria.icon}</span>
          </div>
          <h1>{initialMateria.name}</h1>
          <p className="materia-hero-desc">{initialMateria.description}</p>

          <div className="materia-hero-meta">
            <div className="meta-item">
              <User size={16} />
              <span>Docente: <strong>{initialMateria.instructor}</strong></span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>{initialMateria.duration}</span>
            </div>
            <div className="meta-item">
              <BookOpen size={16} />
              <span>{totalLessons} Lecciones organizadas</span>
            </div>
          </div>
        </div>

        <div className="materia-hero-progress glass-card">
          <div className="progress-radial-label">
            <span className="percent-number">{progressPercent}%</span>
            <span className="percent-text">Completado</span>
          </div>

          <div className="progress-track-hero">
            <div className="progress-fill-hero" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <p className="completed-counter">{completedLessons} de {totalLessons} lecciones marcadas</p>

          {progressPercent === 100 && (
            <div className="completed-badge-callout">
              <Award size={18} />
              <span>¡Curso Finalizado! Certificado disponible.</span>
            </div>
          )}
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="action-success-banner glass-card">
          <CheckCircle size={18} />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Teacher Content Manager Panel */}
      {isTeacher && (
        <div className="materia-teacher-toolbar glass-card">
          <h3>👨‍🏫 Panel de Gestión Académica de la Materia</h3>
          <p>Sube recursos específicos, asigna talleres o programa sesiones en vivo para esta asignatura.</p>

          <div className="teacher-toolbar-buttons">
            <button className="btn-primary" onClick={() => showSuccess(`Se ha creado un borrador de Guía PDF para ${initialMateria.name}`)}>
              <Upload size={16} />
              <span>Subir Guía PDF</span>
            </button>
            <button className="btn-secondary" onClick={() => showSuccess(`Se ha creado un Taller Práctico para ${initialMateria.name}`)}>
              <Sliders size={16} />
              <span>Crear Taller Práctico</span>
            </button>
            <button className="btn-secondary" onClick={() => showSuccess(`Se ha programado una Clase en Vivo para ${initialMateria.name}`)}>
              <Video size={16} />
              <span>Programar Clase en Vivo</span>
            </button>
            <button className="btn-secondary" onClick={() => setShowAddModuleModal(true)}>
              <PlusCircle size={16} />
              <span>Agregar Nuevo Módulo</span>
            </button>
          </div>
        </div>
      )}

      {/* Course Syllabus & Modules Section */}
      <div className="materia-syllabus-section">
        <div className="syllabus-header">
          <h2>Plan de Estudios & Lecciones</h2>
          <button className="btn-secondary download-syllabus-btn">
            <Download size={16} />
            <span>Descargar Silabo (PDF)</span>
          </button>
        </div>

        <div className="modules-list">
          {modules.map(module => (
            <div key={module.id} className="module-card glass-card">
              <div className="module-card-header">
                <h3>{module.title}</h3>
                <span className="module-counter">
                  {module.lessons.filter(l => l.done).length} / {module.lessons.length} completadas
                </span>
              </div>

              <div className="lessons-group">
                {module.lessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className={`lesson-checkbox-item ${lesson.done ? 'done' : ''}`}
                    onClick={() => toggleLesson(module.id, lesson.id)}
                  >
                    <div className="checkbox-icon">
                      {lesson.done ? <CheckSquare size={20} className="checked" /> : <Square size={20} className="unchecked" />}
                    </div>
                    <span className="lesson-name-text">{lesson.name}</span>
                    <span className="status-label">{lesson.done ? 'Completada' : 'Pendiente'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Module Modal for Teacher */}
      {showAddModuleModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModuleModal(false)}>
          <div className="schedule-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Agregar Nuevo Módulo Académico</h2>
              <button className="close-btn" onClick={() => setShowAddModuleModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddModule} className="schedule-form">
              <div className="form-group">
                <label>Título del Módulo / Unidad</label>
                <input
                  type="text"
                  placeholder="Ej. Unidad 4: Arquitectura Avanzada y Despliegue"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre de la Primera Lección</label>
                <input
                  type="text"
                  placeholder="Ej. 4.1 Configuración de Entornos de Producción"
                  value={newLessonName}
                  onChange={(e) => setNewLessonName(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModuleModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <PlusCircle size={16} />
                  <span>Crear Módulo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
