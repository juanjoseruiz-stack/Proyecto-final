import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { fetchNotificaciones, markNotificacionAsRead } from '../services/supabaseService';

const AppContext = createContext();

const STUDENT_USER = {
  roleType: 'student',
  name: 'Estudiante EduNexus',
  email: 'estudiante@edunexus.edu.co',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Estudiante Activo',
  level: '11° Grado - Avanzado'
};

const TEACHER_USER = {
  roleType: 'teacher',
  name: 'Prof. Carlos Gómez',
  email: 'carlos.gomez@edunexus.edu.co',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  role: 'Docente Titular',
  department: 'Matemáticas y Ciencias Aplicadas'
};

const STUDENT_NOTIFICATIONS = [
  { id: 1, title: 'Nueva clase en vivo', text: 'Matemáticas Avanzadas inicia en 15 minutos.', time: 'Hace 10 min', unread: true },
  { id: 2, title: 'Diploma Disponible', text: 'Has completado el curso de Programación Web.', time: 'Hace 2 horas', unread: true },
  { id: 3, title: 'Taller Calificado', text: 'Tu entrega de Robótica recibió una calificación de 95/100.', time: 'Ayer', unread: true },
  { id: 4, title: 'Nueva Guía de Estudio', text: 'Revisa la guía de Ciencias Naturales #6.', time: 'Hace 2 días', unread: false }
];

const TEACHER_NOTIFICATIONS = [
  { id: 101, title: 'Entrega de Taller', text: 'La estudiante María López entregó el Taller de Robótica.', time: 'Hace 5 min', unread: true },
  { id: 102, title: 'Solicitud de Certificado', text: 'Alejandro Martínez solicitó la emisión del Diploma en Diseño UX/UI.', time: 'Hace 30 min', unread: true },
  { id: 103, title: 'Pregunta en Guía de Estudio', text: 'Mateo Morales publicó una duda en la Guía #6 de Cálculo.', time: 'Hace 1 hora', unread: true },
  { id: 104, title: 'Recordatorio de Clase', text: 'Tu transmisión "Matemáticas en Vivo" iniciará en 15 minutos.', time: 'Hace 2 horas', unread: false }
];

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('edunexus_theme') || 'dark');
  
  const [user, setUser] = useState(STUDENT_USER);
  const [notifications, setNotifications] = useState(STUDENT_NOTIFICATIONS);
  const [session, setSession] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('edunexus_theme', theme);
  }, [theme]);

  // Escuchar sesión de Supabase Auth si está configurado
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        syncSupabaseUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        syncSupabaseUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const syncSupabaseUser = async (sbUser) => {
    const roleType = sbUser.user_metadata?.roleType || 'student';
    const isTeacher = roleType === 'teacher';
    
    setUser({
      id: sbUser.id,
      roleType,
      name: sbUser.user_metadata?.name || (isTeacher ? 'Prof. Registrado' : 'Estudiante Registrado'),
      email: sbUser.email,
      avatar: sbUser.user_metadata?.avatar || (isTeacher ? TEACHER_USER.avatar : STUDENT_USER.avatar),
      role: isTeacher ? 'Docente Titular' : 'Estudiante Activo',
      department: isTeacher ? 'Ciencias General' : undefined,
      level: !isTeacher ? 'Grado Registrado' : undefined
    });

    // Intentar cargar notificaciones desde Supabase
    const remoteNotifs = await fetchNotificaciones(roleType);
    if (remoteNotifs && remoteNotifs.length > 0) {
      setNotifications(remoteNotifs);
    } else {
      setNotifications(isTeacher ? TEACHER_NOTIFICATIONS : STUDENT_NOTIFICATIONS);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loginAsRole = (roleType) => {
    if (roleType === 'teacher') {
      setUser(TEACHER_USER);
      setNotifications(TEACHER_NOTIFICATIONS);
    } else {
      setUser(STUDENT_USER);
      setNotifications(STUDENT_NOTIFICATIONS);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    if (isSupabaseConfigured) {
      markNotificacionAsRead(id);
    }
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
      session,
      isSupabaseConfigured,
      loginAsRole,
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
