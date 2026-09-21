import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CLASSES_DATA } from '../data/mockData';
import { 
  PlayCircle, User, Calendar, ArrowLeft, PlusCircle, Video, X, 
  Key, ShieldCheck, AlertCircle, CheckCircle, Lock 
} from 'lucide-react';
import './Clases.css';

export const Clases = () => {
  const { searchTerm, user, adminActiveRole, sendClassCodeNotification, requestRoomEntry } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const isTeacher = user.roleType === 'teacher' || (user.roleType === 'admin' && adminActiveRole === 'teacher');

  const [classList, setClassList] = useState(CLASSES_DATA);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [createdToast, setCreatedToast] = useState('');
  const [newClass, setNewClass] = useState({ 
    title: '', 
    tag: 'Matemáticas', 
    schedule: '',
    meetUrl: 'https://meet.google.com/edu-nexus-live',
    accessCode: 'MEET-2026',
    isGoogleMeet: true
  });

  // Estado para el modal de código de acceso
  const [selectedClassForCode, setSelectedClassForCode] = useState(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [codeError, setCodeError] = useState('');

  // Si proviene del Centro de Notificaciones con un código preseleccionado
  useEffect(() => {
    if (location.state?.autoCode) {
      const targetClass = classList.find(c => c.id === location.state?.autoClassId || c.accessCode === location.state?.autoCode) || classList[0];
      if (targetClass) {
        setSelectedClassForCode(targetClass);
        setEnteredCode(location.state.autoCode);
      }
    }
  }, [location.state, classList]);

  const filteredClasses = classList.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCodeModal = (item) => {
    setSelectedClassForCode(item);
    setEnteredCode('');
    setCodeError('');
  };

  const handleVerifyCodeAndJoin = (e) => {
    e.preventDefault();
    if (!selectedClassForCode) return;

    const expected = (selectedClassForCode.accessCode || 'MATH-8492').trim().toUpperCase();
    const input = enteredCode.trim().toUpperCase();

    if (input === expected || user.roleType === 'admin') {
      const targetId = selectedClassForCode.id;
      if (user.roleType === 'student' && requestRoomEntry) {
        requestRoomEntry(targetId, user);
      }
      setSelectedClassForCode(null);
      navigate(`/clases/${targetId}`);
    } else {
      setCodeError(`Código de acceso a la sala incorrecto. El código debe coincidir.`);
    }
  };


  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClass.title.trim()) return;

    const created = {
      id: `class-${Date.now()}`,
      title: newClass.title,
      teacher: user.name,
      schedule: newClass.schedule || 'Mañana 10:00 AM',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
      tag: newClass.tag,
      meetUrl: newClass.meetUrl || `https://meet.google.com/edu-${Math.random().toString(36).substring(2, 7)}`,
      accessCode: newClass.accessCode || `MEET-${Math.floor(1000 + Math.random() * 9000)}`,
      isGoogleMeet: true
    };

    setClassList([created, ...classList]);
    
    // Enviar notificación automática a todos los estudiantes asignados a la clase con el código de ingreso
    if (sendClassCodeNotification) {
      sendClassCodeNotification(created);
    }

    setCreatedToast(`¡Clase creada! Código de sala (${created.accessCode}) enviado al centro de notificaciones de los estudiantes.`);
    setTimeout(() => setCreatedToast(''), 5000);

    setShowScheduleModal(false);
    setNewClass({ 
      title: '', 
      tag: 'Matemáticas', 
      schedule: '', 
      meetUrl: 'https://meet.google.com/edu-nexus-live',
      accessCode: 'MEET-2026',
      isGoogleMeet: true 
    });
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <div className="header-title-bar">
          <div>
            <h1>Clases en Vivo y Transmisiones Protegidas</h1>
            <p>
              {isTeacher
                ? 'Administra tus clases virtuales con código de acceso privado e inicia videollamadas en directo.'
                : 'Ingresa el código de acceso a la clase para unirte a la videollamada en directo.'
              }
            </p>
          </div>

          {isTeacher && (
            <button className="btn-primary schedule-btn" onClick={() => setShowScheduleModal(true)}>
              <PlusCircle size={18} />
              <span>Programar Clase con Código</span>
            </button>
          )}
        </div>
      </div>

      {createdToast && (
        <div className="auth-alert success animate-bounce" style={{ margin: '0 0 1rem 0' }}>
          <CheckCircle size={20} />
          <span>{createdToast}</span>
        </div>
      )}

      <div className="classes-grid">

        {filteredClasses.map(item => (
          <article key={item.id} className="class-card glass-card">
            <div className="class-image-container">
              <img src={item.imageUrl} alt={item.title} className="class-image" />
              <span className="class-tag">{item.tag}</span>
              <span className="google-meet-badge">
                <Video size={13} /> Google Meet Integrado
              </span>
              <button 
                type="button" 
                onClick={() => handleOpenCodeModal(item)} 
                className="play-overlay"
                aria-label="Ingresar con código"
              >
                <PlayCircle size={48} className="play-icon" />
              </button>
            </div>

            <div className="class-content">
              <h3>{item.title}</h3>
              
              <div className="class-meta">
                <div className="meta-item">
                  <User size={16} />
                  <span>{item.teacher}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{item.schedule}</span>
                </div>
                <div className="meta-item code-pill-item">
                  <Key size={14} color="#facc15" />
                  <span>Código de Sala: <strong>{item.accessCode || 'MATH-8492'}</strong></span>
                </div>
              </div>

              <div className="class-actions-group">
                <button 
                  type="button" 
                  onClick={() => handleOpenCodeModal(item)} 
                  className="btn-primary join-class-btn"
                >
                  <Lock size={16} />
                  <span>{isTeacher ? 'Iniciar Sala con Código' : 'Ingresar con Código'}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal para Ingresar Código de Acceso a la Clase (Estilo Google Meet) */}
      {selectedClassForCode && (
        <div className="modal-backdrop" onClick={() => setSelectedClassForCode(null)}>
          <div className="join-code-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-with-icon">
                <Lock size={22} color="#facc15" />
                <h2>Ingresar Código de Acceso</h2>
              </div>
              <button className="close-btn" onClick={() => setSelectedClassForCode(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleVerifyCodeAndJoin} className="code-verify-form">
              <div className="class-code-info-box">
                <h4>{selectedClassForCode.title}</h4>
                <p>Docente: <strong>{selectedClassForCode.teacher}</strong></p>
                <div className="code-hint-badge">
                  <Key size={14} /> Código Requerido: <code>{selectedClassForCode.accessCode || 'MATH-8492'}</code>
                </div>
              </div>

              {codeError && (
                <div className="auth-alert error">
                  <AlertCircle size={18} />
                  <span>{codeError}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="accessCodeInput">Escribe el Código de Acceso de la Clase *</label>
                <div className="input-with-icon">
                  <Key size={18} className="input-icon" />
                  <input
                    id="accessCodeInput"
                    type="text"
                    placeholder="Ej. MATH-8492"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="quick-code-fill-row">
                <button 
                  type="button" 
                  className="btn-link-action"
                  onClick={() => setEnteredCode(selectedClassForCode.accessCode || 'MATH-8492')}
                >
                  ⚡ Autorrellenar código de prueba ({selectedClassForCode.accessCode || 'MATH-8492'})
                </button>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setSelectedClassForCode(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle size={16} />
                  <span>Verificar e Ingresar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Programar Clase con Código */}
      {showScheduleModal && (
        <div className="modal-backdrop" onClick={() => setShowScheduleModal(false)}>
          <div className="schedule-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-with-icon">
                <Video size={22} color="#4185f4" />
                <h2>Programar Nueva Clase con Código de Acceso</h2>
              </div>
              <button className="close-btn" onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="schedule-form">
              <div className="form-group">
                <label>Título de la Clase Virtual</label>
                <input
                  type="text"
                  placeholder="Ej. Clase Magistral de Robótica e Inteligencia Artificial"
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Asignatura / Área</label>
                <select
                  value={newClass.tag}
                  onChange={(e) => setNewClass({ ...newClass, tag: e.target.value })}
                >
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Física">Física y Ciencias</option>
                  <option value="Programación">Programación</option>
                  <option value="Historia">Historia</option>
                  <option value="Literatura">Literatura</option>
                  <option value="Inglés">Inglés</option>
                </select>
              </div>

              <div className="form-group">
                <label>Horario y Fecha</label>
                <input
                  type="text"
                  placeholder="Ej. Hoy 4:00 PM"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Código de Acceso de la Sala *</label>
                <input
                  type="text"
                  placeholder="Ej. MEET-2026"
                  value={newClass.accessCode}
                  onChange={(e) => setNewClass({ ...newClass, accessCode: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowScheduleModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Video size={16} />
                  <span>Publicar Clase con Código</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
