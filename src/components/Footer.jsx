import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© 2026 EduNexus Plataforma Educativa - Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#privacy">Privacidad</a>
          <span>•</span>
          <a href="#terms">Términos</a>
          <span>•</span>
          <a href="#soporte">Soporte</a>
        </div>
      </div>
    </footer>
  );
};
