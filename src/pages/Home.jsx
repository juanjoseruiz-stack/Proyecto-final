import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/mockData';
import { ArrowRight, Sparkles, PlusCircle, Video, FilePlus, UserCheck } from 'lucide-react';
import './Home.css';

export const Home = () => {
  const { searchTerm, user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const filteredItems = MENU_ITEMS.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <section className={`welcome-banner glass-card ${isTeacher ? 'teacher-banner' : ''}`}>
        <div className="banner-content">
          <div className="welcome-tag">
            <Sparkles size={16} />
            <span>{isTeacher ? 'Panel del Docente' : 'Panel del Estudiante'}</span>
          </div>
          <h1>
            ¡Hola de nuevo, <span className="highlight-text">{user.name}</span>!
          </h1>
          <p>
            {isTeacher 
              ? 'Gestiona tus grupos académicos, programa transmisiones en vivo, sube guías de estudio y evalúa el progreso de tus estudiantes.'
              : 'Explora tus módulos de aprendizaje, revisa tus clases en vivo y sigue potenciando tus habilidades.'
            }
          </p>

          {isTeacher && (
            <div className="teacher-quick-actions">
              <Link to="/clases" className="btn-primary teacher-action-btn">
                <Video size={16} />
                <span>Programar Clase</span>
              </Link>
              <Link to="/guias" className="btn-secondary teacher-action-btn">
                <FilePlus size={16} />
                <span>Publicar Guía</span>
              </Link>
              <Link to="/progreso" className="btn-secondary teacher-action-btn">
                <UserCheck size={16} />
                <span>Evaluar Grupos</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-grid-section">
        <div className="section-header">
          <h2>{isTeacher ? 'Gestión de Módulos Académicos' : 'Menú Principal'}</h2>
          <span className="items-count">{filteredItems.length} Módulos Disponibles</span>
        </div>

        <div className="dashboard-grid">
          {filteredItems.map(item => (
            <Link key={item.id} to={item.link} className="card-link">
              <article className="menu-card glass-card">
                <div className="card-image-wrapper">
                  <img src={item.imageUrl} alt={item.title} className="card-image" />
                  <div className="card-overlay"></div>
                  <span className="card-badge">{item.badge}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                  <div className="card-footer">
                    <span className="action-text">
                      {isTeacher ? 'Gestionar módulo' : 'Ingresar al módulo'}
                    </span>
                    <ArrowRight size={18} className="arrow-icon" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-state glass-card">
            <p>No se encontraron módulos que coincidan con "<strong>{searchTerm}</strong>".</p>
          </div>
        )}
      </section>
    </div>
  );
};
