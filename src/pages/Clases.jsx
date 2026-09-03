import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CLASSES_DATA } from '../data/mockData';
import { PlayCircle, User, Calendar, ArrowLeft, PlusCircle, Video, X } from 'lucide-react';
import './Clases.css';

export const Clases = () => {
  const { searchTerm, user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const [classList, setClassList] = useState(CLASSES_DATA);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newClass, setNewClass] = useState({ title: '', tag: 'Matemáticas', schedule: '' });

  const filteredClasses = classList.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClass.title.trim()) return;

    const created = {
      id: `class-${Date.now()}`,
      title: newClass.title,
      teacher: user.name,
      schedule: newClass.schedule || 'Mañana 10:00 AM',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
      tag: newClass.tag
    };

    setClassList([created, ...classList]);
    setShowScheduleModal(false);
    setNewClass({ title: '', tag: 'Matemáticas', schedule: '' });
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
            <h1>Clases en Vivo y Transmisiones</h1>
            <p>
              {isTeacher
                ? 'Administra tus clases programadas, inicia transmisiones en directo y comparte material.'
                : 'Participa en transmisiones en directo con tus profesores y accede al archivo de clases.'
              }
            </p>
          </div>

          {isTeacher && (
            <button className="btn-primary schedule-btn" onClick={() => setShowScheduleModal(true)}>
              <PlusCircle size={18} />
              <span>Programar Nueva Clase</span>
            </button>
          )}
        </div>
      </div>

      <div className="classes-grid">
        {filteredClasses.map(item => (
          <article key={item.id} className="class-card glass-card">
            <div className="class-image-container">
              <img src={item.imageUrl} alt={item.title} className="class-image" />
              <span className="class-tag">{item.tag}</span>
              <Link to={`/clases/${item.id}`} className="play-overlay">
                <PlayCircle size={48} className="play-icon" />
              </Link>
            </div>

            <div className="class-content">
              <h3>{item.title}</h3>
              
              <div className="class-meta">
                <div className="meta-item">
                  <User size={16} />
                  <span>{item.teacher}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{item.schedule}</span>
                </div>
              </div>

              <Link to={`/clases/${item.id}`} className="btn-primary join-class-btn">
                <span>{isTeacher ? 'Iniciar Transmisión' : 'Ingresar a la Clase'}</span>
                <PlayCircle size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Schedule Class Modal for Teacher */}
      {showScheduleModal && (
        <div className="modal-backdrop" onClick={() => setShowScheduleModal(false)}>
          <div className="schedule-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Programar Nueva Clase en Vivo</h2>
              <button className="close-btn" onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="schedule-form">
              <div className="form-group">
                <label>Título de la Clase</label>
                <input
                  type="text"
                  placeholder="Ej. Taller de Resolución de Problemas de Cálculo"
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Asignatura / Tema</label>
                <select
                  value={newClass.tag}
                  onChange={(e) => setNewClass({ ...newClass, tag: e.target.value })}
                >
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Física">Física y Ciencias</option>
                  <option value="Programación">Programación</option>
                  <option value="Historia">Historia</option>
                  <option value="Literatura">Literatura</option>
                </select>
              </div>

              <div className="form-group">
                <label>Horario y Fecha</label>
                <input
                  type="text"
                  placeholder="Ej. Mañana 10:30 AM"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowScheduleModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Video size={16} />
                  <span>Publicar Clase</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
