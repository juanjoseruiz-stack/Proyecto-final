import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GUIDES_DATA } from '../data/mockData';
import { ArrowLeft, Download, Bookmark, Share2, CheckCircle2 } from 'lucide-react';
import './GuiaDetail.css';

export const GuiaDetail = () => {
  const { id } = useParams();
  const guide = GUIDES_DATA.find(g => g.id === id) || GUIDES_DATA[0];

  return (
    <div className="page-container">
      <Link to="/guias" className="back-btn">
        <ArrowLeft size={18} />
        <span>Volver a Guías</span>
      </Link>

      <div className="guide-reader-container glass-card">
        <div className="reader-header">
          <div className="reader-title-area">
            <span className="badge badge-primary">{guide.subject}</span>
            <h1>{guide.title}</h1>
            <p className="reader-meta">Dirigido a: {guide.grade} | Extensión: {guide.pages} Páginas | Formato PDF Interactivo</p>
          </div>
          <div className="reader-header-actions">
            <button className="btn-secondary">
              <Bookmark size={18} />
              <span>Guardar</span>
            </button>
            <button className="btn-primary">
              <Download size={18} />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>

        <div className="reader-document-preview">
          <div className="preview-page">
            <h2>Módulo 1: Introducción y Fundamentos</h2>
            <hr className="divider" />
            <p>
              El propósito de esta guía es proporcionar los conceptos clave, teoremas y casos prácticos necesarios para dominar la materia de <strong>{guide.subject}</strong>.
            </p>

            <h3>Objetivos de Aprendizaje:</h3>
            <ul className="learning-objectives">
              <li><CheckCircle2 size={18} className="check-icon" /> Comprender la base teórica y su aplicación contextual.</li>
              <li><CheckCircle2 size={18} className="check-icon" /> Resolver problemas complejos paso a paso con la metodología EduNexus.</li>
              <li><CheckCircle2 size={18} className="check-icon" /> Desarrollar pensamiento crítico y capacidad analítica.</li>
            </ul>

            <div className="preview-callout glass-card">
              <h4>💡 Nota Importante del Docente</h4>
              <p>Revisa especialmente los ejercicios de autoevaluación al final de la sección 2 antes del próximo taller interactivo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
