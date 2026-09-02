import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Home.css';

export const Home = () => {
  const { searchTerm, user } = useApp();

  const filteredItems = MENU_ITEMS.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <section className="welcome-banner glass-card">
        <div className="banner-content">
          <div className="welcome-tag">
            <Sparkles size={16} />
            <span>Panel Educativo</span>
          </div>
          <h1>¡Hola de nuevo, <span className="highlight-text">{user.name}</span>!</h1>
          <p>Explora tus módulos de aprendizaje, revisa tus clases en vivo y sigue potenciando tus habilidades.</p>
        </div>
      </section>

      <section className="dashboard-grid-section">
        <div className="section-header">
          <h2>Menú Principal</h2>
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
                    <span className="action-text">Ingresar al módulo</span>
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
