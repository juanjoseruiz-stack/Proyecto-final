import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, Mail, Lock, LogIn, User, GraduationCap } from 'lucide-react';
import './Login.css';

export const Login = () => {
  const { loginAsRole } = useApp();
  const [roleType, setRoleType] = useState('student'); // 'student' | 'teacher'
  const [email, setEmail] = useState('estudiante@edunexus.edu.co');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setRoleType(role);
    if (role === 'teacher') {
      setEmail('carlos.gomez@edunexus.edu.co');
    } else {
      setEmail('estudiante@edunexus.edu.co');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAsRole(roleType);
    navigate('/inicio');
  };

  return (
    <div className="login-page-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="brand-logo">
            <BookOpen size={28} color="#ffffff" />
          </div>
          <h1>EduNexus</h1>
          <p>Selecciona tu rol e inicia sesión en la plataforma</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="role-selector-tabs">
          <button
            type="button"
            className={`role-tab ${roleType === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            <User size={18} />
            <span>Estudiante</span>
          </button>
          <button
            type="button"
            className={`role-tab ${roleType === 'teacher' ? 'active' : ''}`}
            onClick={() => handleRoleChange('teacher')}
          >
            <GraduationCap size={18} />
            <span>Docente</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico ({roleType === 'teacher' ? 'Docente' : 'Estudiante'})</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder={roleType === 'teacher' ? 'docente@edunexus.edu.co' : 'estudiante@edunexus.edu.co'}
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
            <span>Ingresar como {roleType === 'teacher' ? 'Docente' : 'Estudiante'}</span>
            <LogIn size={18} />
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes una cuenta aún? <a href="#register">Solicitar Registro Acceso</a></p>
        </div>
      </div>
    </div>
  );
};
