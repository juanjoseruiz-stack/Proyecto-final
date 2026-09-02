export const MENU_ITEMS = [
  { id: 'guias', title: "GUÍAS", description: "Material de estudio y guías descargables", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80", link: "/guias", badge: "6 Guías" },
  { id: 'clases', title: "CLASES", description: "Clases grabadas y sesiones en vivo con docentes", imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&auto=format&fit=crop&q=80", link: "/clases", badge: "En Vivo" },
  { id: 'talleres', title: "TALLERES", description: "Prácticas interactivas y actividades de laboratorio", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=80", link: "/talleres", badge: "Interactivos" },
  { id: 'materias', title: "MATERIAS COMPLEMENTARIAS", description: "Cursos de programación, diseño y habilidades blandas", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&auto=format&fit=crop&q=80", link: "/materias", badge: "7 Cursos" },
  { id: 'progreso', title: "PROGRESO", description: "Estadísticas y rendimiento de aprendizaje", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80", link: "/progreso", badge: "85% Completo" },
  { id: 'diplomas', title: "DIPLOMAS", description: "Certificados oficiales obtenidos", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80", link: "/diplomas", badge: "3 Diplomas" }
];

export const CLASSES_DATA = [
  { id: 'matematicas', title: "MATEMÁTICAS", teacher: "Prof. Carlos Gómez", schedule: "Lunes y Miércoles 10:00 AM", imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80", tag: "Cálculo y Álgebra" },
  { id: 'historia', title: "HISTORIA", teacher: "Dra. Elena Rostova", schedule: "Martes 11:30 AM", imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&auto=format&fit=crop&q=80", tag: "Historia Universal" },
  { id: 'ciencias', title: "CIENCIAS Y FÍSICA", teacher: "Ing. Roberto Martínez", schedule: "Jueves 09:00 AM", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=80", tag: "Física Cuántica" },
  { id: 'literatura', title: "LITERATURA", teacher: "Lic. Sofía Morales", schedule: "Viernes 02:00 PM", imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=80", tag: "Literatura Hispana" },
  { id: 'programacion', title: "PROGRAMACIÓN", teacher: "Ing. Ana Silva", schedule: "Lunes 04:00 PM", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80", tag: "React & JS" },
  { id: 'ingles', title: "INGLÉS", teacher: "Prof. John Doe", schedule: "Sábados 10:00 AM", imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=80", tag: "B2 Upper-Intermediate" }
];

export const GUIDES_DATA = [
  { id: 'guia-matematicas-1', subject: 'Matemáticas', title: 'Guía #1: Álgebra Avanzada y Funciones', grade: '10° Grado', pages: 18, downloadUrl: '#', icon: '📐' },
  { id: 'guia-ciencias-6', subject: 'Ciencias', title: 'Guía #6: Física Mecánica y Dinámica', grade: '11° Grado', pages: 24, downloadUrl: '#', icon: '🔬' },
  { id: 'guia-filosofia-3', subject: 'Filosofía', title: 'Guía #3: Pensamiento Griego Clásico', grade: '10° Grado', pages: 15, downloadUrl: '#', icon: '🏛️' },
  { id: 'guia-ingles-1', subject: 'Inglés', title: 'Guía #1: Grammar & Advanced Writing', grade: '9° - 11°', pages: 20, downloadUrl: '#', icon: '🌐' },
  { id: 'guia-lenguaje-1', subject: 'Lenguaje', title: 'Guía #1: Análisis Crítico de Textos', grade: '11° Grado', pages: 16, downloadUrl: '#', icon: '📚' },
  { id: 'guia-sociales-1', subject: 'Sociales', title: 'Guía #1: Geopolítica del Siglo XXI', grade: '11° Grado', pages: 22, downloadUrl: '#', icon: '🌍' }
];

export const WORKSHOPS_DATA = [
  { id: 'taller-robotica-actividad', title: 'Taller de Robótica & Arduino', category: 'Tecnología', status: 'Interactivo', duration: '45 min', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80' },
  { id: 'taller-ingles-interactivo', title: 'Laboratorio de Conversación en Inglés', category: 'Idiomas', status: 'En Vivo', duration: '60 min', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80' },
  { id: 'taller-matematicas-interactivo', title: 'Taller de Problemas de Cálculo', category: 'Matemáticas', status: 'Interactivo', duration: '30 min', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=80' },
  { id: 'taller-ciencias', title: 'Simulación de Reacciones Químicas', category: 'Ciencias', status: 'Laboratorio', duration: '50 min', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=80' }
];

export const MATERIAS_COMPLEMENTARIAS = [
  { id: 'programacion', name: 'Desarrollo Web Fullstack', category: 'Tecnología', lessons: 32, progress: 75, icon: '💻', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80' },
  { id: 'diseno', name: 'Diseño UX/UI & Figma', category: 'Diseño', lessons: 24, progress: 60, icon: '🎨', image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=80' },
  { id: 'bd', name: 'Bases de Datos & SQL', category: 'Tecnología', lessons: 20, progress: 40, icon: '🗄️', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=80' },
  { id: 'data', name: 'Ciencia de Datos & Python', category: 'Tecnología', lessons: 28, progress: 30, icon: '📊', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80' },
  { id: 'ingles', name: 'Inglés Profesional IT', category: 'Idiomas', lessons: 40, progress: 90, icon: '🗣️', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80' },
  { id: 'liderazgo', name: 'Liderazgo & Gestión de Equipos', category: 'Habilidades Blandas', lessons: 16, progress: 100, icon: '🚀', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=80' }
];

export const DIPLOMAS_DATA = [
  { id: 1, title: 'Diploma en Desarrollo Web React', category: 'Tecnología', date: '15 de Agosto, 2026', code: 'NEXUS-2026-8891', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80', status: 'Completado' },
  { id: 2, title: 'Certificado de Liderazgo Educativo', category: 'Habilidades', date: '02 de Julio, 2026', code: 'NEXUS-2026-4412', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', status: 'Completado' },
  { id: 3, title: 'Especialista en Ciencias Naturales', category: 'Ciencias', date: '20 de Mayo, 2026', code: 'NEXUS-2026-1102', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=80', status: 'Completado' }
];

export const PROGRESO_DATA = {
  generalProgress: 84,
  completedCourses: 12,
  certificatesEarned: 3,
  hoursSpent: 145,
  subjects: [
    { name: 'Matemáticas', score: 92, status: 'Excelente' },
    { name: 'Ciencias y Física', score: 88, status: 'Sobresaliente' },
    { name: 'Lenguaje y Literatura', score: 85, status: 'Bueno' },
    { name: 'Programación', score: 96, status: 'Excelente' },
    { name: 'Inglés', score: 79, status: 'En Progreso' }
  ]
};
