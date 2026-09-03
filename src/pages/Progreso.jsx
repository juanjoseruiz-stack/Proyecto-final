import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PROGRESO_DATA } from '../data/mockData';
import { ArrowLeft, TrendingUp, Award, Clock, BookOpen, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import './Progreso.css';

export const Progreso = () => {
  const { user } = useApp();
  const isTeacher = user.roleType === 'teacher';

  const teacherStudentsList = [
    { name: 'María Fernanda López', grade: '11°A', avg: 98, status: 'Sobresaliente' },
    { name: 'Alejandro Martínez', grade: '11°B', avg: 95, status: 'Sobresaliente' },
    { name: 'Sofia Ramírez', grade: '11°A', avg: 92, status: 'Excelente' },
    { name: 'Mateo Morales', grade: '11°C', avg: 68, status: 'Atención Requerida' },
    { name: 'Camila Torres', grade: '11°B', avg: 64, status: 'Atención Requerida' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>{isTeacher ? 'Monitoreo y Rendimiento del Grupo de Estudiantes' : 'Mi Progreso Académico'}</h1>
        <p>
          {isTeacher
            ? 'Supervisa las calificaciones promedio, tasa de entrega de talleres y desempeño estudiantil.'
            : 'Monitorea tu rendimiento cuantitativo, horas de dedicación y avances por materia.'
          }
        </p>
      </div>

      <div className="stats-cards-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon-bg primary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isTeacher ? 'Promedio del Grupo' : 'Promedio General'}</span>
            <span className="stat-value">{isTeacher ? '88.5%' : `${PROGRESO_DATA.generalProgress}%`}</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-bg success">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isTeacher ? 'Estudiantes Inscritos' : 'Cursos Completados'}</span>
            <span className="stat-value">{isTeacher ? '142 Alumnos' : `${PROGRESO_DATA.completedCourses} Cursos`}</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-bg warning">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isTeacher ? 'Tasa de Entregas' : 'Diplomas Obtenidos'}</span>
            <span className="stat-value">{isTeacher ? '94%' : `${PROGRESO_DATA.certificatesEarned} Certificados`}</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-bg info">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{isTeacher ? 'Horas Docentes' : 'Horas de Estudio'}</span>
            <span className="stat-value">{isTeacher ? '180 Horas' : `${PROGRESO_DATA.hoursSpent} Horas`}</span>
          </div>
        </div>
      </div>

      {isTeacher ? (
        <div className="subjects-performance-section glass-card">
          <h2>Listado de Estudiantes y Rendimiento</h2>

          <div className="teacher-students-table">
            <div className="table-header">
              <span>Estudiante</span>
              <span>Grado</span>
              <span>Promedio</span>
              <span>Estado</span>
            </div>

            {teacherStudentsList.map((st, idx) => (
              <div key={idx} className="table-row">
                <span className="st-name">{st.name}</span>
                <span className="st-grade">{st.grade}</span>
                <span className="st-avg">{st.avg}%</span>
                <span className={`st-status-badge ${st.avg < 70 ? 'alert' : 'good'}`}>
                  {st.avg < 70 ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};
