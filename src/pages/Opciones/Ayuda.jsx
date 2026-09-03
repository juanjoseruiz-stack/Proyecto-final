import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Send, MessageCircle, FileText } from 'lucide-react';
import './Opciones.css';

export const Ayuda = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Ayuda y Soporte Técnico</h1>
        <p>¿Tienes dudas o inconvenientes? Nuestro equipo pedagógico y de soporte está disponible.</p>
      </div>

      <div className="opciones-grid">
        <div className="opciones-card glass-card">
          <h2>Enviar un Mensaje a Soporte</h2>

          <form onSubmit={handleSubmit} className="opciones-form">
            <div className="form-group">
              <label>Asunto de la Consulta</label>
              <input
                type="text"
                placeholder="Ej. Problema para acceder a la clase de Matemáticas"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Detalle de tu Solicitud</label>
              <textarea
                rows={5}
                placeholder="Describe el inconveniente o tu pregunta detalladamente..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              {sentSuccess && <span className="saved-badge">✓ Mensaje enviado a soporte técnico</span>}
              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Enviar Solicitud</span>
              </button>
            </div>
          </form>
        </div>

        <div className="faq-section glass-card">
          <h2>Preguntas Frecuentes</h2>

          <div className="faq-item">
            <h4>¿Cómo descargo mi diploma al terminar un curso?</h4>
            <p>Ve a la sección "Diplomas" en el menú principal y haz clic en "Descargar PDF" en la tarjeta correspondiente.</p>
          </div>

          <div className="faq-item">
            <h4>¿Las clases grabadas tienen costo adicional?</h4>
            <p>No, todas las clases grabadas y materiales digitales están incluidos dentro de tu suscripción de EduNexus.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
