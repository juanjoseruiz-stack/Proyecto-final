export const MENU_ITEMS = [
  { id: 'guias', title: "GUÍAS", description: "Material de estudio y guías descargables", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80", link: "/guias", badge: "6 Guías" },
  { id: 'clases', title: "CLASES", description: "Clases grabadas y sesiones en vivo con docentes", imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&auto=format&fit=crop&q=80", link: "/clases", badge: "En Vivo" },
  { id: 'talleres', title: "TALLERES", description: "Prácticas interactivas y actividades de laboratorio", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=80", link: "/talleres", badge: "Interactivos" },
  { id: 'materias', title: "MATERIAS COMPLEMENTARIAS", description: "Cursos de programación, diseño y habilidades blandas", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&auto=format&fit=crop&q=80", link: "/materias", badge: "6 Cursos" },
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
  {
    id: 'programacion',
    name: 'Desarrollo Web Fullstack',
    category: 'Tecnología',
    lessons: 9,
    progress: 67,
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80',
    description: 'Aprende las tecnologías fundamentales del desarrollo web moderno: HTML5 semántico, CSS3 moderno con Flexbox/Grid y JavaScript ES6+ con React.',
    instructor: 'Ing. Ana Silva',
    duration: '40 Horas de estudio',
    modules: [
      {
        id: 1,
        title: 'Unidad 1: HTML5 y Estructura Semántica',
        lessons: [
          { id: '1.1', name: '1.1 Etiquetas Semánticas y Accesibilidad', done: true },
          { id: '1.2', name: '1.2 Formularios y Validaciones Nativas', done: true },
          { id: '1.3', name: '1.3 Multimedia, Canvas e Incrustaciones', done: true }
        ]
      },
      {
        id: 2,
        title: 'Unidad 2: CSS3 Moderno y Design Systems',
        lessons: [
          { id: '2.1', name: '2.1 Flexbox y Diseños Adaptativos', done: true },
          { id: '2.2', name: '2.2 CSS Grid Layout y Subgrid', done: true },
          { id: '2.3', name: '2.3 Variables CSS, Transiciones y Animaciones', done: false }
        ]
      },
      {
        id: 3,
        title: 'Unidad 3: JavaScript ES6+ y React SPA',
        lessons: [
          { id: '3.1', name: '3.1 Promesas, Async/Await y Fetch API', done: true },
          { id: '3.2', name: '3.2 Componentes React, JSX y Props', done: false },
          { id: '3.3', name: '3.3 Manejo de Estado con useState y useEffect', done: false }
        ]
      }
    ]
  },
  {
    id: 'diseno',
    name: 'Diseño UX/UI & Figma',
    category: 'Diseño',
    lessons: 8,
    progress: 50,
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=80',
    description: 'Crea experiencias digitales centradas en el usuario. Domina la investigación de usuarios, arquitectura de información, alambres (wireframes) y prototipado de alta fidelidad en Figma.',
    instructor: 'Lic. Sofía Morales',
    duration: '30 Horas de estudio',
    modules: [
      {
        id: 1,
        title: 'Unidad 1: Investigación de Usuarios y Arquitectura',
        lessons: [
          { id: '1.1', name: '1.1 Personas, User Journeys y Mapas de Empatía', done: true },
          { id: '1.2', name: '1.2 Entrevistas y Pruebas de Usabilidad', done: true },
          { id: '1.3', name: '1.3 Arquitectura de Información y Card Sorting', done: false }
        ]
      },
      {
        id: 2,
        title: 'Unidad 2: Prototipado Interactivo en Figma',
        lessons: [
          { id: '2.1', name: '2.1 Wireframing de Baja Fidelidad', done: true },
          { id: '2.2', name: '2.2 Design Systems, Variables y Componentes', done: false },
          { id: '2.3', name: '2.3 Microinteracciones y Prototipos Animados', done: false }
        ]
      }
    ]
  },
  {
    id: 'bd',
    name: 'Bases de Datos & SQL',
    category: 'Tecnología',
    lessons: 8,
    progress: 38,
    icon: '🗄️',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=80',
    description: 'Aprende diseño de modelos relacionales, consultas complejas en SQL (PostgreSQL / MySQL), optimización de índices, transacciones y fundamentos de bases de datos NoSQL con MongoDB.',
    instructor: 'Ing. Carlos Gómez',
    duration: '25 Horas de estudio',
    modules: [
      {
        id: 1,
        title: 'Unidad 1: Modelado Relacional y Lenguaje SQL',
        lessons: [
          { id: '1.1', name: '1.1 Diagramas Entidad-Relación y Normalización', done: true },
          { id: '1.2', name: '1.2 Consultas Básicas DDL y DML en SQL', done: true },
          { id: '1.3', name: '1.3 Joins (INNER, LEFT, RIGHT) y Subconsultas', done: true }
        ]
      },
      {
        id: 2,
        title: 'Unidad 2: Optimización y Bases de Datos NoSQL',
        lessons: [
          { id: '2.1', name: '2.1 Índices, Transacciones y ACID', done: false },
          { id: '2.2', name: '2.2 Vistas, Stored Procedures y Triggers', done: false },
          { id: '2.3', name: '2.3 Documentos JSON y MongoDB Basics', done: false }
        ]
      }
    ]
  },
  {
    id: 'data',
    name: 'Ciencia de Datos & Python',
    category: 'Tecnología',
    lessons: 8,
    progress: 25,
    icon: '📊',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80',
    description: 'Introducción al análisis exploratorio de datos con Python, manipulación con Pandas y NumPy, visualización interactiva con Matplotlib/Seaborn e introducción al Aprendizaje Automático.',
    instructor: 'Dra. Elena Rostova',
    duration: '35 Horas de estudio',
    modules: [
      {
        id: 1,
        title: 'Unidad 1: Programación con Python para Datos',
        lessons: [
          { id: '1.1', name: '1.1 Sintaxis de Python y Estructuras de Datos', done: true },
          { id: '1.2', name: '1.2 Manipulación de DataFrames con Pandas', done: true },
          { id: '1.3', name: '1.3 Limpieza e Imputación de Datos Faltantes', done: false }
        ]
      },
      {
        id: 2,
        title: 'Unidad 2: Visualización y Machine Learning',
        lessons: [
          { id: '2.1', name: '2.1 Gráficos Estadísticos con Seaborn y Plotly', done: false },
          { id: '2.2', name: '2.2 Regresión Lineal y Clasificación con Scikit-Learn', done: false },
          { id: '2.3', name: '2.3 Evaluación de Modelos y Matriz de Confusión', done: false }
        ]
      }
    ]
  },
  {
    id: 'ingles',
    name: 'Inglés Profesional IT',
    category: 'Idiomas',
    lessons: 8,
    progress: 88,
    icon: '🗣️',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
    description: 'Domina el vocabulario especializado en tecnología de la información, lectura fluida de documentación técnica, redacción de correos corporativos y entrevistas en equipos internacionales de software.',
    instructor: 'Prof. John Doe',
    duration: '30 Horas de estudio',
    modules: [
      {
        id: 1,
        title: 'Unidad 1: Technical Documentation & Email Etiquette',
        lessons: [
          { id: '1.1', name: '1.1 Reading API Specs & Technical Docs', done: true },
          { id: '1.2', name: '1.2 Writing Pull Requests and Bug Reports', done: true },
          { id: '1.3', name: '1.3 Professional Emailing & Slack Messaging', done: true }
        ]
      },
      {
        id: 2,
        title: 'Unidad 2: Agile Ceremonies & Tech Interviews',
        lessons: [
          { id: '2.1', name: '2.1 Daily Stand-up & Sprint Planning Meetings', done: true },
          { id: '2.2', name: '2.2 Presenting Demos and Technical Architecture', done: true },
          { id: '2.3', name: '2.3 Answering Behavioral & Technical Interview Questions', done: false }
        ]
      }
    ]
  },
  {
    id: 'liderazgo',
    name: 'Liderazgo & Gestión de Equipos',
    category: 'Habilidades Blandas',
    lessons: 8,
    progress: 100,
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=80',
    description: 'Desarrolla habilidades clave para liderar equipos multidisciplinarios: comunicación asertiva, metodologías ágiles (Scrum / Kanban), resolución constructiva de conflictos y gestión del tiempo.',
    instructor: 'Ing. Roberto Martínez',
    duration: '20 Horas de estudio',
    modules: [
      {
        id: 1,
        title: 'Unidad 1: Fundamentos de Liderazgo Consciente',
        lessons: [
          { id: '1.1', name: '1.1 Inteligencia Emocional y Estilos de Liderazgo', done: true },
          { id: '1.2', name: '1.2 Delegación Efectiva y Feedback Constructivo', done: true },
          { id: '1.3', name: '1.3 Gestión del Cambio y Resiliencia en Equipos', done: true }
        ]
      },
      {
        id: 2,
        title: 'Unidad 2: Metodologías Ágiles y Colaboración',
        lessons: [
          { id: '2.1', name: '2.1 Principios del Manifiesto Ágil y Scrum', done: true },
          { id: '2.2', name: '2.2 Gestión de Proyectos con Tableros Kanban', done: true },
          { id: '2.3', name: '2.3 Negociación y Resolución de Conflictos', done: true }
        ]
      }
    ]
  }
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
