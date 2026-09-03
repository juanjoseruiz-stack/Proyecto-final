import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  BookOpen, 
  Video, 
  Award, 
  TrendingUp, 
  Sliders, 
  User, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  X,
  Layers
} from 'lucide-react';
import './Sidebar.css';

export const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, unreadNotificationsCount, user } = useApp();
  const navigate = useNavigate();

  const handleClose = () => setIsSidebarOpen(false);

  const mainNavItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, link: '/inicio' },
    { id: 'guias', label: 'Guías de Estudio', icon: BookOpen, link: '/guias' },
    { id: 'clases', label: 'Clases en Vivo', icon: Video, link: '/clases' },
    { id: 'talleres', label: 'Talleres Interactivos', icon: Sliders, link: '/talleres' },
    { id: 'materias', label: 'Materias Complementarias', icon: Layers, link: '/materias' },
    { id: 'progreso', label: 'Mi Progreso', icon: TrendingUp, link: '/progreso' },
    { id: 'diplomas', label: 'Mis Diplomas', icon: Award, link: '/diplomas' }
  ];

  const optionItems = [
    { id: 'perfil', label: 'Mi Perfil', icon: User, link: '/perfil' },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, link: '/notificaciones', badge: unreadNotificationsCount },
    { id: 'configuraciones', label: 'Configuraciones', icon: Settings, link: '/configuraciones' },
    { id: 'ayuda', label: 'Ayuda y Soporte', icon: HelpCircle, link: '/ayuda' }
  ];

  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={handleClose}></div>
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-user-preview">
            <img src={user.avatar} alt={user.name} className="sidebar-user-avatar" />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.name}</span>
              <span className="sidebar-user-role">{user.role}</span>
            </div>
          </div>
          <button className="close-btn" onClick={handleClose} aria-label="Cerrar menú">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav-section">
          <div className="nav-section-title">MENÚ PRINCIPAL</div>
          {mainNavItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.id} 
                to={item.link} 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={handleClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="nav-section-title" style={{ marginTop: '1.5rem' }}>OPCIONES & CUENTA</div>
          {optionItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.id} 
                to={item.link} 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={handleClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge > 0 && <span className="sidebar-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
