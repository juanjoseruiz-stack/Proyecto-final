import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Settings, Sun, Moon, Volume2, Shield, Eye } from 'lucide-react';
import './Opciones.css';

export const Configuraciones = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <h1>Configuraciones del Sistema</h1>
        <p>Ajusta las preferencias de la plataforma, privacidad y tema visual.</p>
      </div>

      <div className="opciones-card glass-card">
        <div className="config-section">
          <h3>Apariencia y Tema</h3>
          <div className="config-row">
            <div className="config-info">
              <span>Tema Visual de la Plataforma</span>
              <p>Cambia entre el modo oscuro y modo claro según tu preferencia.</p>
            </div>
            <button className="btn-secondary" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>Modo {theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
            </button>
          </div>
        </div>

        <hr className="divider" />

        <div className="config-section">
          <h3>Notificaciones de Correo</h3>
          <div className="config-row">
            <div className="config-info">
              <span>Alertas de Clases en Vivo</span>
              <p>Recibir un correo 15 minutos antes de iniciar una sesión.</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle-switch" />
          </div>

          <div className="config-row">
            <div className="config-info">
              <span>Resumen Semanal de Progreso</span>
              <p>Enviar reporte de horas y talleres completados.</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle-switch" />
          </div>
        </div>
      </div>
    </div>
  );
};
