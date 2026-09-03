import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, Search, Bell, Moon, Sun, User, LogOut, BookOpen } from 'lucide-react';
import './Header.css';

export const Header = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    setIsSidebarOpen, 
    unreadNotificationsCount,
    theme,
    toggleTheme,
    user
  } = useApp();

  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <button 
          className="icon-btn menu-btn" 
          aria-label="Abrir Menú" 
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <Link to="/inicio" className="app-brand">
          <div className="brand-icon">
            <BookOpen size={20} color="#ffffff" />
          </div>
          <span className="app-title">EduNexus</span>
        </Link>
      </div>

      <div className="top-bar-right">
        <div className={`search-container ${showSearchInput ? 'active' : ''}`}>
          {showSearchInput && (
            <input
              type="text"
              className="search-input"
              placeholder="Buscar guías, clases, talleres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          )}
          <button 
            className="icon-btn" 
            aria-label="Buscar" 
            onClick={() => setShowSearchInput(!showSearchInput)}
            title="Buscar"
          >
            <Search size={20} />
          </button>
        </div>

        <button 
          className="icon-btn theme-btn" 
          onClick={toggleTheme} 
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link to="/notificaciones" className="icon-btn nav-badge-container" title="Notificaciones">
          <Bell size={20} />
          {unreadNotificationsCount > 0 && (
            <span className="notification-badge">{unreadNotificationsCount}</span>
          )}
        </Link>

        <Link to="/perfil" className="profile-chip" title="Mi Perfil">
          <img src={user.avatar} alt={user.name} className="profile-chip-avatar" />
          <div className="profile-chip-info">
            <span className="profile-chip-name">{user.name.split(' ')[0]}</span>
            <span className="profile-chip-role">{user.roleType === 'teacher' ? 'Docente' : 'Estudiante'}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
