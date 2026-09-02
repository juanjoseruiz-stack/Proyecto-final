import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('edunexus_theme') || 'dark');
  
  const [user, setUser] = useState({
    name: 'Estudiante EduNexus',
    email: 'estudiante@edunexus.edu.co',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Estudiante Activo',
    level: 'Nivel Avanzado'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nueva clase en vivo', text: 'Matemáticas Avanzadas inicia en 15 minutos.', time: 'Hace 10 min', unread: true },
    { id: 2, title: 'Diploma Disponible', text: 'Has completado el curso de Programación Web.', time: 'Hace 2 horas', unread: true },
    { id: 3, title: 'Taller Calificado', text: 'Tu entrega de Robótica recibió una calificación de 95/100.', time: 'Ayer', unread: true },
    { id: 4, title: 'Nueva Guía de Estudio', text: 'Revisa la guía de Ciencias Naturales #6.', time: 'Hace 2 días', unread: false }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('edunexus_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  return (
    <AppContext.Provider value={{
      searchTerm,
      setSearchTerm,
      isSidebarOpen,
      setIsSidebarOpen,
      user,
      setUser,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
