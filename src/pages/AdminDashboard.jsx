import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CLASSES_DATA, MATERIAS_COMPLEMENTARIAS, WORKSHOPS_DATA } from '../data/mockData';
import { 
  ShieldCheck, Users, GraduationCap, Video, Award, 
  CheckCircle, XCircle, FileText, Lock, RefreshCw, AlertTriangle, 
  Search, Eye, ShieldAlert, ArrowLeft, Key, Sparkles, Check, X,
  BookOpen, Sliders, Layers, PlusCircle, Trash2, Edit3, Download, UserPlus
} from 'lucide-react';
import './AdminDashboard.css';


export const AdminDashboard = () => {
  const { 
    user, 
    pendingVerifications, 
    approveTeacherVerification, 
    rejectTeacherVerification,
    joinRequests,
    approveRoomEntry,
    rejectRoomEntry
  } = useApp();

  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications' | 'rooms' | 'guias' | 'talleres' | 'materias' | 'diplomas' | 'users'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Mock List of Platform Users
  const [userList, setUserList] = useState([
    { id: 'u-1', name: 'Prof. Carlos Gómez', email: 'carlos.gomez@edunexus.edu.co', role: 'Docente', status: 'Activo', registered: '2026-01-15' },
    { id: 'u-2', name: 'Prof. Laura Patricia Benítez', email: 'laura.benitez@edunexus.edu.co', role: 'Docente', status: 'Pendiente Acreditación', registered: '2026-09-20' },
    { id: 'u-3', name: 'María López', email: 'maria.lopez@estudiante.edu.co', role: 'Estudiante', status: 'Activo', registered: '2026-02-10' },
    { id: 'u-4', name: 'Alejandro Martínez', email: 'alejandro.martinez@estudiante.edu.co', role: 'Estudiante', status: 'Activo', registered: '2026-03-05' },
    { id: 'u-5', name: 'Mateo Morales', email: 'mateo.morales@estudiante.edu.co', role: 'Estudiante', status: 'Activo', registered: '2026-04-12' }
  ]);

  // Mock list of Study Guides managed by Admin
  const [adminGuias, setAdminGuias] = useState([
    { id: 'g-1', title: 'Guía Avanzada de Cálculo Integral #4', teacher: 'Prof. Carlos Gómez', subject: 'Matemáticas', downloads: 340, featured: true },
    { id: 'g-2', title: 'Compendio de Historia de Colombia s. XIX', teacher: 'Prof. Ana Silva', subject: 'Historia', downloads: 215, featured: false },
    { id: 'g-3', title: 'Laboratorio Virtual de Física Cuántica #2', teacher: 'Prof. Carlos Gómez', subject: 'Física', downloads: 180, featured: true }
  ]);

  // Mock list of Diplomas issued by Admin
  const [issuedDiplomas, setIssuedDiplomas] = useState([
    { id: 'dip-101', studentName: 'María López', title: 'Diploma en Programación Web React', code: 'CERT-2026-9481', issueDate: '2026-08-15', status: 'Válido' },
    { id: 'dip-102', studentName: 'Alejandro Martínez', title: 'Certificado de Excelencia en Robótica', code: 'CERT-2026-8832', issueDate: '2026-09-01', status: 'Válido' }
  ]);

  const handleToggleUserStatus = (userId) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Suspendido' ? 'Activo' : 'Suspendido';
        triggerToast(`Estado del usuario actualizado a "${nextStatus}"`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handlePromoteRole = (userId) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextRole = u.role === 'Estudiante' ? 'Docente' : 'Estudiante';
        triggerToast(`Rol de ${u.name} cambiado a "${nextRole}"`);
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  const handleToggleFeaturedGuia = (guiaId) => {
    setAdminGuias(prev => prev.map(g => {
      if (g.id === guiaId) {
        const nextFeatured = !g.featured;
        triggerToast(nextFeatured ? `Guía "${g.title}" destacada en portada.` : `Guía removida de destacados.`);
        return { ...g, featured: nextFeatured };
      }
      return g;
    }));
  };

  const handleDeleteGuia = (guiaId) => {
    setAdminGuias(prev => prev.filter(g => g.id !== guiaId));
    triggerToast('Guía de estudio eliminada de la plataforma.');
  };

  const handleIssueNewDiploma = (e) => {
    e.preventDefault();
    const newDip = {
      id: `dip-${Date.now()}`,
      studentName: 'Mateo Morales',
      title: 'Certificado de Honor en Cálculo Matemático',
      code: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: 'Hoy',
      status: 'Válido'
    };
    setIssuedDiplomas([newDip, ...issuedDiplomas]);
    triggerToast(`🏅 Diploma oficial emitido exitosamente para Mateo Morales.`);
  };

  const filteredUsers = userList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container admin-dashboard-page">
      <div className="page-header">
        <Link to="/inicio" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <div className="admin-header-title-bar">
          <div>
            <div className="admin-title-badge">
              <ShieldCheck size={22} color="#818cf8" />
              <h1>Panel de Administración Master EduNexus</h1>
            </div>
            <p>
              Control total de la plataforma: Acreditaciones docentes, Clases en Vivo, Guías, Talleres, Materias, Certificados y Usuarios.
            </p>
          </div>
          <div className="admin-user-chip">
            <span className="admin-chip-label">Super Administrador: {user.name}</span>
            <span className="admin-chip-email">{user.email}</span>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="in-app-toast-alert animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tarjetas de Métricas Ejecutivas Globales */}
      <div className="admin-metrics-grid">
        <div className="metric-card glass-card">
          <div className="metric-icon-box blue">
            <Users size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">1,240</span>
            <span className="metric-label">Estudiantes Registrados</span>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon-box purple">
            <GraduationCap size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">84</span>
            <span className="metric-label">Docentes Verificados</span>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon-box green">
            <Video size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">142</span>
            <span className="metric-label">Clases Transmitidas</span>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon-box yellow">
            <Award size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">{issuedDiplomas.length + 480}</span>
            <span className="metric-label">Diplomas Emitidos</span>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación del Panel de Administración (7 Módulos Completos) */}
      <div className="admin-tabs-bar glass-card">
        <button 
          className={`admin-tab-btn ${activeTab === 'verifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('verifications')}
        >
          <GraduationCap size={16} />
          <span>1. Acreditación Docente ({pendingVerifications.filter(v => v.status === 'pending').length})</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          <Video size={16} />
          <span>2. Clases en Vivo</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'guias' ? 'active' : ''}`}
          onClick={() => setActiveTab('guias')}
        >
          <BookOpen size={16} />
          <span>3. Guías de Estudio</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'talleres' ? 'active' : ''}`}
          onClick={() => setActiveTab('talleres')}
        >
          <Sliders size={16} />
          <span>4. Talleres</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'materias' ? 'active' : ''}`}
          onClick={() => setActiveTab('materias')}
        >
          <Layers size={16} />
          <span>5. Materias</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'diplomas' ? 'active' : ''}`}
          onClick={() => setActiveTab('diplomas')}
        >
          <Award size={16} />
          <span>6. Diplomas</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} />
          <span>7. Usuarios</span>
        </button>
      </div>

      {/* PESTAÑA 1: ACREDITACIÓN DOCENTE */}
      {activeTab === 'verifications' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header">
            <div>
              <h2>🎓 Módulo de Acreditación Docente & Verificación de Diplomas</h2>
              <p>Inspecciona cédulas profesionales y diplomas adjuntos por los profesores antes de autorizar su cuenta.</p>
            </div>
          </div>

          <div className="verifications-list">
            {pendingVerifications.map(item => (
              <div key={item.id} className={`verification-card ${item.status}`}>
                <div className="verif-card-header">
                  <div className="teacher-ident-box">
                    <img src={item.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'} alt={item.name} className="verif-teacher-avatar" />
                    <div>
                      <h3>{item.name}</h3>
                      <span className="teacher-email">{item.email} • {item.date}</span>
                    </div>
                  </div>
                  <span className={`status-badge-pill ${item.status}`}>
                    {item.status === 'pending' ? '⏳ Pendiente de Aprobación' : item.status === 'verified' ? '✅ Acreditado' : '❌ Rechazado'}
                  </span>
                </div>

                <div className="verif-details-grid">
                  <div className="verif-detail-item">
                    <span className="detail-label">Cédula / Tarjeta Profesional:</span>
                    <span className="detail-value code">{item.professionalId}</span>
                  </div>

                  <div className="verif-detail-item">
                    <span className="detail-label">Diploma Adjunto:</span>
                    <button 
                      type="button" 
                      className="btn-link-action document-link"
                      onClick={() => setSelectedDiploma(item)}
                    >
                      <FileText size={16} />
                      <span>{item.diplomaFileName}</span>
                    </button>
                  </div>
                </div>

                <div className="verif-actions-bar">
                  <button 
                    type="button" 
                    className="btn-secondary btn-sm"
                    onClick={() => setSelectedDiploma(item)}
                  >
                    <Eye size={16} /> Previsualizar Diploma
                  </button>

                  {item.status === 'pending' ? (
                    <div className="action-buttons-group">
                      <button 
                        type="button" 
                        className="btn-primary btn-approve"
                        onClick={() => {
                          approveTeacherVerification(item.id);
                          triggerToast(`✅ Licencia aprobada para ${item.name}`);
                        }}
                      >
                        <CheckCircle size={16} /> Aprobar Licencia Docente
                      </button>

                      <button 
                        type="button" 
                        className="btn-secondary btn-reject"
                        onClick={() => {
                          rejectTeacherVerification(item.id);
                          triggerToast(`❌ Solicitud rechazada para ${item.name}`);
                        }}
                      >
                        <XCircle size={16} /> Rechazar Solicitud
                      </button>
                    </div>
                  ) : (
                    <span className="verified-confirm-tag">
                      <CheckCircle size={16} color="#4ade80" /> Licencia Verificada por la Dirección
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 2: CLASES EN VIVO & SEGURIDAD */}
      {activeTab === 'rooms' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header">
            <div>
              <h2>📹 Módulo de Seguridad de Clases en Vivo & Control de Transmisiones</h2>
              <p>Administra salas virtuales activas, regenera códigos de sala y gestiona la admisión en directo.</p>
            </div>
          </div>

          <div className="rooms-admin-grid">
            {CLASSES_DATA.map(item => (
              <div key={item.id} className="room-admin-card glass-card">
                <div className="room-card-header">
                  <span className="live-pulse-badge">🔴 En Transmisión</span>
                  <span className="room-tag-pill">{item.tag}</span>
                </div>

                <h3>{item.title}</h3>
                <p className="room-teacher">Docente: <strong>{item.teacher}</strong></p>

                <div className="room-code-box">
                  <Key size={16} color="#facc15" />
                  <span>Código de Acceso Activo: <code>{item.accessCode || 'MATH-8492'}</code></span>
                </div>

                <div className="room-actions-row">
                  <Link to={`/clases/${item.id}`} className="btn-primary btn-sm">
                    <Video size={14} /> Inspeccionar Transmisión
                  </Link>
                  <button 
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => triggerToast(`🔒 Código de sala ${item.accessCode} reencriptado por la administración.`)}
                  >
                    <RefreshCw size={14} /> Regenerar Código
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 3: GUÍAS DE ESTUDIO */}
      {activeTab === 'guias' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header">
            <div>
              <h2>📚 Módulo de Moderación de Guías de Estudio</h2>
              <p>Revisa, destaca en portada o elimina guías publicadas por el cuerpo docente.</p>
            </div>
            <button className="btn-primary btn-sm" onClick={() => triggerToast('Formulario de nueva guía oficial abierto.')}>
              <PlusCircle size={16} /> Crear Guía Oficial
            </button>
          </div>

          <div className="admin-items-list">
            {adminGuias.map(guia => (
              <div key={guia.id} className="admin-list-card glass-card">
                <div className="card-main-info">
                  <h3>{guia.title}</h3>
                  <span className="card-sub-info">Autor: <strong>{guia.teacher}</strong> • Materia: {guia.subject} • Descargas: {guia.downloads}</span>
                </div>

                <div className="card-actions">
                  <button 
                    type="button" 
                    className={`btn-sm-action ${guia.featured ? 'active' : ''}`}
                    onClick={() => handleToggleFeaturedGuia(guia.id)}
                  >
                    <Sparkles size={14} /> {guia.featured ? 'Destacada' : 'Destacar en Portada'}
                  </button>

                  <button 
                    type="button" 
                    className="btn-sm-action suspend"
                    onClick={() => handleDeleteGuia(guia.id)}
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 4: TALLERES INTERACTIVOS */}
      {activeTab === 'talleres' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header">
            <div>
              <h2>🛠️ Módulo de Gestión de Talleres y Calificaciones</h2>
              <p>Monitorea las actividades prácticas activas y las evaluaciones enviadas por los estudiantes.</p>
            </div>
          </div>

          <div className="admin-items-list">
            {WORKSHOPS_DATA.map(taller => (
              <div key={taller.id} className="admin-list-card glass-card">
                <div className="card-main-info">
                  <h3>{taller.title}</h3>
                  <span className="card-sub-info">Categoría: <strong>{taller.category}</strong> • Duración: {taller.duration} • Asignado a: {taller.assignedTo}</span>
                </div>

                <div className="card-actions">
                  <Link to={`/talleres/${taller.id}`} className="btn-primary btn-sm">
                    <Eye size={14} /> Revisar Taller
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 5: MATERIAS COMPLEMENTARIAS */}
      {activeTab === 'materias' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header">
            <div>
              <h2>📖 Módulo de Materias y Asignaturas Institucionales</h2>
              <p>Administra el catálogo de cursos y asigna los profesores titulares.</p>
            </div>
          </div>

          <div className="admin-items-list">
            {MATERIAS_COMPLEMENTARIAS.map(materia => (
              <div key={materia.id} className="admin-list-card glass-card">
                <div className="card-main-info">
                  <h3>{materia.name}</h3>
                  <span className="card-sub-info">Docente Titular: <strong>{materia.instructor}</strong> • Categoría: {materia.category} • Duración: {materia.duration}</span>
                </div>

                <div className="card-actions">
                  <Link to={`/materias/${materia.id}`} className="btn-secondary btn-sm">
                    <Edit3 size={14} /> Asignar Titular
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* PESTAÑA 6: DIPLOMAS Y CERTIFICADOS */}
      {activeTab === 'diplomas' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header">
            <div>
              <h2>🏅 Módulo de Certificaciones Oficiales EduNexus</h2>
              <p>Emite o revoca diplomas de grado y certificados de honor institucional.</p>
            </div>
            <button className="btn-primary btn-sm" onClick={handleIssueNewDiploma}>
              <PlusCircle size={16} /> Emitir Nuevo Diploma Oficial
            </button>
          </div>

          <div className="admin-items-list">
            {issuedDiplomas.map(dip => (
              <div key={dip.id} className="admin-list-card glass-card">
                <div className="card-main-info">
                  <h3>{dip.title}</h3>
                  <span className="card-sub-info">Estudiante: <strong>{dip.studentName}</strong> • Código: <code>{dip.code}</code> • Fecha: {dip.issueDate}</span>
                </div>

                <div className="card-actions">
                  <span className="verified-confirm-tag">
                    <CheckCircle size={16} color="#4ade80" /> Certificado Oficial Válido
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 7: USUARIOS Y SEGURIDAD */}
      {activeTab === 'users' && (
        <section className="admin-section glass-card animate-fadeIn">
          <div className="section-header search-header">
            <div>
              <h2>👥 Módulo de Directorio General de Usuarios y Seguridad</h2>
              <p>Promueve roles, suspende accesos o reactiva cuentas en la plataforma.</p>
            </div>

            <div className="input-with-icon admin-search">
              <Search size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, correo o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="users-table-container">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo Electrónico</th>
                  <th>Rol Activo</th>
                  <th>Fecha Registro</th>
                  <th>Estado</th>
                  <th>Acciones Administrativas</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="user-table-cell">
                        <span className="user-name-cell">{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role.toLowerCase()}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.registered}</td>
                    <td>
                      <span className={`status-pill ${u.status === 'Activo' ? 'active' : u.status === 'Suspendido' ? 'suspended' : 'pending'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <div className="user-actions-row">
                        <button 
                          type="button" 
                          className="btn-sm-action promote"
                          onClick={() => handlePromoteRole(u.id)}
                          title="Cambiar rol"
                        >
                          <UserPlus size={13} /> Cambiar Rol
                        </button>

                        <button 
                          type="button" 
                          className={`btn-sm-action ${u.status === 'Suspendido' ? 'activate' : 'suspend'}`}
                          onClick={() => handleToggleUserStatus(u.id)}
                        >
                          {u.status === 'Suspendido' ? 'Reactivar' : 'Suspender'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modal de Previsualización de Diploma Docente */}
      {selectedDiploma && (
        <div className="modal-backdrop" onClick={() => setSelectedDiploma(null)}>
          <div className="diploma-preview-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-with-icon">
                <FileText size={22} color="#818cf8" />
                <h2>Previsualización de Documento de Acreditación</h2>
              </div>
              <button className="close-btn" onClick={() => setSelectedDiploma(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="diploma-document-frame">
              <div className="document-header-stamp">
                <ShieldCheck size={36} color="#818cf8" />
                <h3>REPÚBLICA DE COLOMBIA • MINISTERIO DE EDUCACIÓN</h3>
                <span>ACREDITACIÓN DOCENTE EDUCATIVA</span>
              </div>
              <div className="document-body">
                <p>Se certifica que el titular <strong>{selectedDiploma.name}</strong> ha presentado el título profesional registrado con número de licencia:</p>
                <div className="diploma-code-stamp">
                  <code>{selectedDiploma.professionalId}</code>
                </div>
                <p>Archivo acreditador adjunto: <code>{selectedDiploma.diplomaFileName}</code></p>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setSelectedDiploma(null)}>
                Cerrar
              </button>
              {selectedDiploma.status === 'pending' && (
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={() => {
                    approveTeacherVerification(selectedDiploma.id);
                    setSelectedDiploma(null);
                    triggerToast(`✅ Licencia aprobada con éxito`);
                  }}
                >
                  <CheckCircle size={16} /> Aprobar Acreditación
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
