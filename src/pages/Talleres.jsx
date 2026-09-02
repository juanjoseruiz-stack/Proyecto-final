import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WORKSHOPS_DATA } from '../data/mockData';
import { ArrowLeft, Clock, Sliders, Play, Sparkles } from 'lucide-react';
import './Talleres.css';

export const Talleres = () => {
  const { searchTerm } = useApp();

  const filteredWorkshops = WORKSHOPS_DATA.filter(w =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Talleres y Laboratorios Interactivos</h1>
        <p>Aplica tus conocimientos con ejercicios guiados, simulaciones virtuales y retos de práctica.</p>
      </div>

      <div className="workshops-grid">
        {filteredWorkshops.map(workshop => (
          <article key={workshop.id} className="workshop-card glass-card">
            <div className="workshop-img-wrapper">
              <img src={workshop.image} alt={workshop.title} className="workshop-img" />
              <span className="badge badge-primary workshop-badge">{workshop.status}</span>
            </div>

            <div className="workshop-content">
              <span className="workshop-category">{workshop.category}</span>
              <h3>{workshop.title}</h3>
              
              <div className="workshop-meta">
                <Clock size={16} />
                <span>Duración estimada: {workshop.duration}</span>
              </div>

              <Link to={`/talleres/${workshop.id}`} className="btn-primary start-workshop-btn">
                <span>Iniciar Actividad</span>
                <Play size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
