import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MATERIAS_COMPLEMENTARIAS } from '../data/mockData';
import { ArrowLeft, BookOpen, Layers, CheckCircle } from 'lucide-react';
import './Materias.css';

export const Materias = () => {
  const { searchTerm } = useApp();

  const filteredMaterias = MATERIAS_COMPLEMENTARIAS.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Materias Complementarias</h1>
        <p>Amplía tus competencias profesionales con cursos de programación, diseño, bases de datos y habilidades directivas.</p>
      </div>

      <div className="materias-grid">
        {filteredMaterias.map(materia => (
          <article key={materia.id} className="materia-card glass-card">
            <div className="materia-img-wrapper">
              <img src={materia.image} alt={materia.name} className="materia-img" />
              <span className="materia-icon-badge">{materia.icon}</span>
            </div>

            <div className="materia-body">
              <span className="badge badge-primary">{materia.category}</span>
              <h3>{materia.name}</h3>
              <p className="materia-lessons">{materia.lessons} Lecciones académicas</p>

              <div className="progress-bar-container">
                <div className="progress-label">
                  <span>Progreso del Curso</span>
                  <span>{materia.progress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${materia.progress}%` }}></div>
                </div>
              </div>

              <Link to={`/materias/${materia.id}`} className="btn-primary start-materia-btn">
                <span>{materia.progress === 100 ? 'Repasar Contenido' : 'Continuar Curso'}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
