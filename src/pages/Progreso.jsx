import React from 'react';
import { Link } from 'react-router-dom';
import { PROGRESO_DATA } from '../data/mockData';
import { ArrowLeft, TrendingUp, Award, Clock, BookOpen, CheckCircle } from 'lucide-react';
import './Progreso.css';

export const Progreso = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Mi Progreso Académico</h1>
        <p>Monitorea tu rendimiento cuantitativo, horas de dedicación y avances por materia.</p>
      </div>

      <div className="stats-cards-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon-bg primary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Promedio General</span>
            <span className="stat-value">{PROGRESO_DATA.generalProgress}%</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-bg success">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Cursos Completados</span>
            <span className="stat-value">{PROGRESO_DATA.completedCourses} Cursos</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-bg warning">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Diplomas Obtenidos</span>
            <span className="stat-value">{PROGRESO_DATA.certificatesEarned} Certificados</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-bg info">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Horas de Estudio</span>
            <span className="stat-value">{PROGRESO_DATA.hoursSpent} Horas</span>
          </div>
        </div>
      </div>

      <div className="subjects-performance-section glass-card">
        <h2>Rendimiento por Asignatura</h2>

        <div className="subjects-list">
          {PROGRESO_DATA.subjects.map((subj, idx) => (
            <div key={idx} className="subject-row">
              <div className="subject-info">
                <span className="subject-name">{subj.name}</span>
                <span className="subject-status-badge">{subj.status}</span>
              </div>

              <div className="subject-progress-wrapper">
                <div className="subject-progress-bar">
                  <div className="subject-progress-fill" style={{ width: `${subj.score}%` }}></div>
                </div>
                <span className="subject-score">{subj.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
