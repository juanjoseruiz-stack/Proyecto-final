import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CLASSES_DATA } from '../data/mockData';
import { PlayCircle, User, Calendar, ArrowLeft } from 'lucide-react';
import './Clases.css';

export const Clases = () => {
  const { searchTerm } = useApp();

  const filteredClasses = CLASSES_DATA.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Clases en Vivo y Grabaciones</h1>
        <p>Participa en transmisiones en directo con tus profesores y accede al archivo de clases.</p>
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
                <span>Ingresar a la Clase</span>
                <PlayCircle size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
