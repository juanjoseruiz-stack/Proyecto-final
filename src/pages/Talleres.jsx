import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WORKSHOPS_DATA } from '../data/mockData';
import { ArrowLeft, Clock, Sliders, Play, PlusCircle, Edit3, User, X, Save } from 'lucide-react';
import './Talleres.css';

export const Talleres = () => {
  const { searchTerm, user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const [workshops, setWorkshops] = useState(WORKSHOPS_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);

  const [workshopForm, setWorkshopForm] = useState({
    title: '',
    category: 'Tecnología',
    duration: '45 min',
    assignedTo: 'Todos los Estudiantes',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80'
  });

  const studentsOptions = [
    'Todos los Estudiantes',
    'María Fernanda López (11°A)',
    'Alejandro Martínez (11°B)',
    'Sofia Ramírez (11°A)',
    'Mateo Morales (11°C)',
    'Camila Torres (11°B)'
  ];

  const filteredWorkshops = workshops.filter(w =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.assignedTo && w.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenCreateModal = () => {
    setEditingWorkshop(null);
    setWorkshopForm({
      title: '',
      category: 'Tecnología',
      duration: '45 min',
      assignedTo: 'Todos los Estudiantes',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (ws) => {
    setEditingWorkshop(ws);
    setWorkshopForm({
      title: ws.title,
      category: ws.category,
      duration: ws.duration,
      assignedTo: ws.assignedTo || 'Todos los Estudiantes',
      image: ws.image
    });
    setShowModal(true);
  };

  const handleSaveWorkshop = (e) => {
    e.preventDefault();
    if (!workshopForm.title.trim()) return;

    if (editingWorkshop) {
      // Edit existing workshop
      setWorkshops(prev => prev.map(w => w.id === editingWorkshop.id ? {
        ...w,
        title: workshopForm.title,
        category: workshopForm.category,
        duration: workshopForm.duration,
        assignedTo: workshopForm.assignedTo,
        image: workshopForm.image
      } : w));
    } else {
      // Create new workshop
      const created = {
        id: `taller-${Date.now()}`,
        title: workshopForm.title,
        category: workshopForm.category,
        status: 'Interactivo',
        duration: workshopForm.duration,
        assignedTo: workshopForm.assignedTo,
        image: workshopForm.image
      };
      setWorkshops([created, ...workshops]);
    }

    setShowModal(false);
    setEditingWorkshop(null);
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
            <h1>Talleres y Laboratorios Interactivos</h1>
            <p>
              {isTeacher
                ? 'Crea, edita y asigna talleres o laboratorios virtuales a estudiantes específicos.'
                : 'Aplica tus conocimientos con ejercicios guiados, simulaciones virtuales y retos de práctica.'
              }
            </p>
          </div>

          {isTeacher && (
            <button className="btn-primary" onClick={handleOpenCreateModal}>
              <PlusCircle size={18} />
              <span>Crear y Asignar Taller</span>
            </button>
          )}
        </div>
      </div>

      <div className="workshops-grid">
        {filteredWorkshops.map(workshop => (
          <article key={workshop.id} className="workshop-card glass-card">
            <div className="workshop-img-wrapper">
              <img src={workshop.image} alt={workshop.title} className="workshop-img" />
              <span className="badge badge-primary workshop-badge">{workshop.status}</span>
            </div>

            <div className="workshop-content">
              <div className="workshop-tags-row">
                <span className="workshop-category">{workshop.category}</span>
                {workshop.assignedTo && (
                  <span className="workshop-assigned-chip">
                    <User size={12} />
                    <span>{workshop.assignedTo}</span>
                  </span>
                )}
              </div>

              <h3>{workshop.title}</h3>
              
              <div className="workshop-meta">
                <Clock size={16} />
                <span>Duración estimada: {workshop.duration}</span>
              </div>

              <div className="workshop-actions-row">
                <Link to={`/talleres/${workshop.id}`} className="btn-primary start-workshop-btn">
                  <span>{isTeacher ? 'Revisar Taller' : 'Iniciar Actividad'}</span>
                  <Play size={16} />
                </Link>

                {isTeacher && (
                  <button
                    className="btn-secondary edit-workshop-btn"
                    onClick={() => handleOpenEditModal(workshop)}
                    title="Editar Taller"
                  >
                    <Edit3 size={16} />
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal for Creating or Editing Workshop */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="schedule-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingWorkshop ? 'Editar Taller Práctico' : 'Crear y Asignar Nuevo Taller'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveWorkshop} className="schedule-form">
              <div className="form-group">
                <label>Título del Taller</label>
                <input
                  type="text"
                  placeholder="Ej. Taller de Simulación de Circuitos Lógicos"
                  value={workshopForm.title}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={workshopForm.category}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, category: e.target.value })}
                >
                  <option value="Tecnología">Tecnología & Robótica</option>
                  <option value="Matemáticas">Matemáticas & Cálculo</option>
                  <option value="Idiomas">Idiomas & Conversación</option>
                  <option value="Ciencias">Ciencias & Química</option>
                </select>
              </div>

              <div className="form-group">
                <label>Asignar a Estudiante / Grupo</label>
                <select
                  value={workshopForm.assignedTo}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, assignedTo: e.target.value })}
                >
                  {studentsOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Duración Estimada</label>
                <input
                  type="text"
                  placeholder="Ej. 45 min"
                  value={workshopForm.duration}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, duration: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingWorkshop ? <Save size={16} /> : <PlusCircle size={16} />}
                  <span>{editingWorkshop ? 'Guardar Cambios' : 'Publicar Taller'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
