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
  department: 'Matemáticas y Ciencias Aplicadas',
  verificationStatus: 'verified', // 'pending' | 'verified' | 'rejected'
  professionalId: 'TP-948201-COL',
  diplomaFileName: 'Diploma_Licenciatura_Matematicas_CarlosGomez.pdf',
  diplomaUrl: '#'
};

const ADMIN_USER = {
  roleType: 'admin',
  name: 'Administrador Master EduNexus',
  email: 'admin@edunexus.edu.co',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Super Administrador',
  department: 'Dirección Académica y Moderación',
  verificationStatus: 'verified',
  professionalId: 'MASTER-ADMIN-001'
};

const INITIAL_PENDING_VERIFICATIONS = [
  {
    id: 't-101',
    name: 'Prof. Laura Patricia Benítez',
    email: 'laura.benitez@edunexus.edu.co',
    date: 'Hace 1 hora',
    professionalId: 'DOC-88341-EDU',
    diplomaFileName: 'Titulo_Maestria_Educacion_LauraBenitez.pdf',
    diplomaUrl: '#',
    status: 'pending'
  }
];

const STUDENT_NOTIFICATIONS = [
  { 
    id: 1, 
    title: '🔑 Código de Acceso a Clase en Vivo', 
    text: 'Prof. Carlos Gómez te ha asignado la clase "Matemáticas Avanzadas y Cálculo". Código de Sala: MATH-8492', 
    accessCode: 'MATH-8492',
    classId: 'math-101',
    time: 'Hace 10 min', 
    unread: true 
  },
  { 
    id: 2, 
    title: '🔑 Código de Acceso: Historia Universal', 
    text: 'Prof. Ana María Silva te ha asignado la clase en vivo. Código de Sala: HIST-1029', 
    accessCode: 'HIST-1029',
    classId: 'hist-101',
    time: 'Hace 1 hora', 
    unread: true 
  },
  { id: 3, title: 'Diploma Disponible', text: 'Has completado el curso de Programación Web.', time: 'Hace 2 horas', unread: true },
  { id: 4, title: 'Taller Calificado', text: 'Tu entrega de Robótica recibió una calificación de 95/100.', time: 'Ayer', unread: true },
  { id: 5, title: 'Nueva Guía de Estudio', text: 'Revisa la guía de Ciencias Naturales #6.', time: 'Hace 2 días', unread: false }
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
  const [adminActiveRole, setAdminActiveRole] = useState('teacher'); // 'teacher' | 'student' cuando es admin
  const [notifications, setNotifications] = useState(STUDENT_NOTIFICATIONS);
  const [session, setSession] = useState(null);
  const [pendingVerifications, setPendingVerifications] = useState(INITIAL_PENDING_VERIFICATIONS);

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
    const roleType = sbUser.email === 'admin@edunexus.edu.co' ? 'admin' : (sbUser.user_metadata?.roleType || 'student');
    const isTeacher = roleType === 'teacher' || roleType === 'admin';
    
    setUser({
      id: sbUser.id,
      roleType,
      name: sbUser.user_metadata?.name || (roleType === 'admin' ? ADMIN_USER.name : isTeacher ? 'Prof. Registrado' : 'Estudiante Registrado'),
      email: sbUser.email,
      avatar: sbUser.user_metadata?.avatar || (roleType === 'admin' ? ADMIN_USER.avatar : isTeacher ? TEACHER_USER.avatar : STUDENT_USER.avatar),
      role: roleType === 'admin' ? 'Super Administrador' : isTeacher ? 'Docente Titular' : 'Estudiante Activo',
      department: isTeacher ? 'Ciencias General' : undefined,
      level: !isTeacher ? 'Grado Registrado' : undefined,
      verificationStatus: sbUser.user_metadata?.verification_status || 'verified',
      diplomaFileName: sbUser.user_metadata?.diploma_filename || (isTeacher ? 'Diploma_Adjunto_Docente.pdf' : null),
      diplomaUrl: sbUser.user_metadata?.diploma_url || null,
      professionalId: sbUser.user_metadata?.professional_id || null
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

  const switchAdminViewRole = (newRole) => {
    setAdminActiveRole(newRole);
  };

  const loginAsRole = (targetRole, customData = null) => {
    const isAdmin = targetRole === 'admin' || customData?.email === 'admin@edunexus.edu.co';
    const isTeacher = targetRole === 'teacher';
    
    if (isAdmin) {
      setUser({
        ...ADMIN_USER,
        name: customData?.name || ADMIN_USER.name,
        email: customData?.email || ADMIN_USER.email
      });
      setNotifications(TEACHER_NOTIFICATIONS);
      return;
    }

    const baseUser = isTeacher ? TEACHER_USER : STUDENT_USER;
    
    if (customData) {
      const newUser = {
        ...baseUser,
        roleType: targetRole,
        name: customData.name || (isTeacher ? 'Prof. ' + (customData.email?.split('@')[0] || 'Docente') : customData.email?.split('@')[0] || baseUser.name),
        email: customData.email || baseUser.email,
        verificationStatus: customData.verificationStatus || (isTeacher ? 'pending' : 'verified'),
        diplomaFileName: customData.diplomaFileName || (isTeacher ? 'Diploma_Docente_Registrado.pdf' : null),
        diplomaUrl: customData.diplomaUrl || null,
        professionalId: customData.professionalId || null
      };

      setUser(newUser);

      // Si se acaba de registrar un nuevo docente pendiente, agregarlo a la lista de revisión
      if (isTeacher && customData.isNewRegistration) {
        setPendingVerifications(prev => [
          {
            id: 't-' + Date.now(),
            name: newUser.name,
            email: newUser.email,
            date: 'Hace un momento',
            professionalId: newUser.professionalId || 'REG-' + Math.floor(100000 + Math.random() * 900000),
            diplomaFileName: newUser.diplomaFileName || 'Diploma_Acreditacion.pdf',
            diplomaUrl: newUser.diplomaUrl || '#',
            status: 'pending'
          },
          ...prev
        ]);
      }
    } else {
      setUser(baseUser);
    }

    setNotifications(isTeacher ? TEACHER_NOTIFICATIONS : STUDENT_NOTIFICATIONS);
  };

  const approveTeacherVerification = (idOrEmail) => {
    setPendingVerifications(prev =>
      prev.map(item => item.id === idOrEmail || item.email === idOrEmail ? { ...item, status: 'verified' } : item)
    );

    // Si el usuario actual es el docente afectado, actualizar su estado a 'verified'
    if (user.roleType === 'teacher') {
      setUser(prev => ({
        ...prev,
        verificationStatus: 'verified'
      }));
    }
  };

  const rejectTeacherVerification = (idOrEmail) => {
    setPendingVerifications(prev =>
      prev.map(item => item.id === idOrEmail || item.email === idOrEmail ? { ...item, status: 'rejected' } : item)
    );

    if (user.roleType === 'teacher') {
      setUser(prev => ({
        ...prev,
        verificationStatus: 'rejected'
      }));
    }
  };

  const sendClassCodeNotification = (classData) => {
    const newNotif = {
      id: Date.now(),
      title: `🔑 Código de Acceso: ${classData.title}`,
      text: `El docente ${classData.teacher || user.name} te ha asignado la clase en vivo "${classData.title}". Código de Sala: ${classData.accessCode}`,
      accessCode: classData.accessCode,
      classId: classData.classId || classData.id,
      time: 'Hace un momento',
      unread: true
    };

    setNotifications(prev => [newNotif, ...prev]);

    if (isSupabaseConfigured && supabase) {
      supabase.from('notificaciones').insert([{
        usuario_id: null,
        titulo: newNotif.title,
        mensaje: newNotif.text,
        leida: false,
        fecha_creacion: new Date().toISOString()
      }]).then(() => {}).catch(err => console.error(err));
    }

    return newNotif;
  };

  // Estado para solicitudes de ingreso a salas en vivo (Sala de Espera)
  const [joinRequests, setJoinRequests] = useState([
    {
      id: 'req-1',
      classId: 'math-101',
      studentName: 'María López',
      studentEmail: 'maria.lopez@estudiante.edu.co',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      time: 'Hace 1 min',
      status: 'pending' // 'pending' | 'approved' | 'rejected'
    },
    {
      id: 'req-2',
      classId: 'math-101',
      studentName: 'Alejandro Martínez',
      studentEmail: 'alejandro.martinez@estudiante.edu.co',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      time: 'Hace 3 min',
      status: 'pending'
    }
  ]);

  const requestRoomEntry = (classId, studentUser) => {
    const existing = joinRequests.find(r => r.classId === classId && (r.studentEmail === studentUser.email || r.studentName === studentUser.name));
    if (existing) return existing;

    const newReq = {
      id: `req-${Date.now()}`,
      classId,
      studentName: studentUser.name,
      studentEmail: studentUser.email || 'estudiante@edunexus.edu.co',
      avatar: studentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      time: 'Hace un momento',
      status: 'pending'
    };

    setJoinRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const approveRoomEntry = (reqId) => {
    setJoinRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
  };

  const rejectRoomEntry = (reqId) => {
    setJoinRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'rejected' } : r));
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
      adminActiveRole,
      switchAdminViewRole,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      sendClassCodeNotification,
      pendingVerifications,
      approveTeacherVerification,
      rejectTeacherVerification,
      joinRequests,
      requestRoomEntry,
      approveRoomEntry,
      rejectRoomEntry,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};



export const useApp = () => useContext(AppContext);
