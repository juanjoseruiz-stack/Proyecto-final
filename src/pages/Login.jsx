import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and navigate to dashboard
    navigate('/');
  };

  return (
    <div className="login-page-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="brand-logo">
            <BookOpen size={28} color="#ffffff" />
          </div>
          <h1>EduNexus</h1>
          <p>Inicia sesión para acceder a tu plataforma educativa</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="estudiante@edunexus.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Recordar sesión</span>
            </label>
            <a href="#forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-primary login-submit-btn">
            <span>Iniciar Sesión</span>
            <LogIn size={18} />
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes una cuenta aún? <a href="#register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};
