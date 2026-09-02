import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CLASSES_DATA } from '../data/mockData';
import { ArrowLeft, Play, Send, Users, MessageSquare, Download, CheckCircle } from 'lucide-react';
import './ClaseLiveDetail.css';

export const ClaseLiveDetail = () => {
  const { id } = useParams();
  const classItem = CLASSES_DATA.find(c => c.id === id) || CLASSES_DATA[0];

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Prof. Carlos Gómez', text: '¡Bienvenidos a la clase! Dejen sus dudas aquí.', time: '10:01 AM' },
    { id: 2, user: 'María López', text: 'Hola profesor, ¿dónde descargamos la guía?', time: '10:03 AM' },
    { id: 3, user: 'Prof. Carlos Gómez', text: 'En la pestaña de Recursos a la derecha.', time: '10:04 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), user: 'Tú', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setNewMessage('');
  };

  return (
    <div className="page-container">
      <Link to="/clases" className="back-btn">
        <ArrowLeft size={18} />
        <span>Volver a Clases</span>
      </Link>

      <div className="live-detail-grid">
        <div className="video-section glass-card">
          <div className="player-container">
            <img src={classItem.imageUrl} alt={classItem.title} className="video-backdrop" />
            <div className="player-controls-overlay">
              <span className="live-badge">🔴 EN VIVO</span>
              <button className="play-center-btn" aria-label="Reproducir">
                <Play size={36} fill="#ffffff" />
              </button>
              <div className="player-bottom-bar">
                <span>Transmisión en Alta Definición</span>
                <div className="viewers-count">
                  <Users size={16} />
                  <span>142 Estudiantes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="class-info-body">
            <h2>{classItem.title}</h2>
            <div className="class-teacher-badge">
              <span className="badge badge-primary">{classItem.tag}</span>
              <span>Docente: <strong>{classItem.teacher}</strong></span>
            </div>
            <p className="class-description">
              En esta sesión interactiva exploraremos los conceptos fundamentales del tema, resolveremos ejercicios prácticos en tiempo real y responderemos preguntas de la audiencia.
            </p>
          </div>
        </div>

        <div className="chat-section glass-card">
          <div className="chat-header">
            <MessageSquare size={18} />
            <h3>Chat en Vivo</h3>
          </div>

          <div className="chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.user === 'Tú' ? 'my-message' : ''}`}>
                <div className="chat-msg-header">
                  <span className="msg-user">{msg.user}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
                <p className="msg-text">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              placeholder="Escribe una pregunta..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn-primary send-btn" aria-label="Enviar">
              <Send size={16} />
            </button>
          </form>

          <div className="resources-section">
            <h4>Recursos de la Clase</h4>
            <a href="#" className="resource-item">
              <Download size={16} />
              <span>Guía_de_Trabajo_{classItem.id}.pdf</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
