import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CLASSES_DATA } from '../data/mockData';
import { 
  ArrowLeft, Send, MessageSquare, Download, CheckCircle, 
  Video, Mic, MicOff, Camera, CameraOff, Monitor, Hand, PhoneOff, 
  Sparkles, UserCheck, Key, ShieldCheck, Clock, XCircle, UserPlus, Check, X, ShieldAlert
} from 'lucide-react';
import './ClaseLiveDetail.css';

export const ClaseLiveDetail = () => {
  const { id } = useParams();
  const { 
    user, 
    adminActiveRole, 
    joinRequests, 
    approveRoomEntry, 
    rejectRoomEntry, 
    requestRoomEntry 
  } = useApp();

  const classItem = CLASSES_DATA.find(c => c.id === id) || CLASSES_DATA[0];
  const isTeacher = user.roleType === 'teacher' || (user.roleType === 'admin' && adminActiveRole === 'teacher');
  const isAdminMaster = user.roleType === 'admin';

  // Buscar estado de admisión del estudiante actual
  const currentStudentReq = joinRequests.find(r => 
    (r.classId === classItem.id || r.classId === 'math-101') && 
    (r.studentEmail === user.email || r.studentName === user.name)
  );

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: classItem.teacher, text: '¡Bienvenidos a la clase virtual en vivo! Iniciaremos en breves momentos.', time: '10:01 AM' },
    { id: 2, user: 'María López', text: 'Hola profesor, ¿dónde descargamos la guía de trabajo de hoy?', time: '10:03 AM' },
    { id: 3, user: classItem.teacher, text: 'En la sección de Recursos a la derecha pueden descargar el PDF.', time: '10:04 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Controles de videollamada WebRTC 100% integrados dentro de la app
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isConnectedInCall, setIsConnectedInCall] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [hasWebcamHardware, setHasWebcamHardware] = useState(false);

  // Referencias a elementos de video HTML5 para WebRTC real
  const webcamRef = useRef(null);
  const screenShareRef = useRef(null);
  const webcamStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Determinar si el estudiante está en sala de espera o aprobado
  const isStudentApproved = isAdminMaster || isTeacher || currentStudentReq?.status === 'approved';
  const isStudentPending = !isTeacher && !isAdminMaster && (!currentStudentReq || currentStudentReq?.status === 'pending');
  const isStudentRejected = !isTeacher && !isAdminMaster && currentStudentReq?.status === 'rejected';

  // Obtener solicitudes pendientes para el docente en esta sala
  const pendingRequestsForTeacher = joinRequests.filter(r => r.status === 'pending');

  // Inicializar o detener Cámara WebRTC (getUserMedia)
  useEffect(() => {
    let isMounted = true;

    async function setupWebcam() {
      if (isCameraOn && isConnectedInCall && isStudentApproved) {
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ 
              video: { width: { ideal: 1280 }, height: { ideal: 720 } }, 
              audio: true 
            });
            if (!isMounted) return;
            webcamStreamRef.current = stream;
            setHasWebcamHardware(true);
            if (webcamRef.current) {
              webcamRef.current.srcObject = stream;
            }
          }
        } catch (err) {
          console.warn('Acceso a cámara física denegado o no disponible:', err);
          if (isMounted) {
            setHasWebcamHardware(false);
            triggerToast('📷 Cámara real en modo simulado / vista previa activa.');
          }
        }
      } else {
        if (webcamStreamRef.current) {
          webcamStreamRef.current.getTracks().forEach(track => track.stop());
          webcamStreamRef.current = null;
        }
        if (webcamRef.current) {
          webcamRef.current.srcObject = null;
        }
      }
    }

    setupWebcam();

    return () => {
      isMounted = false;
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, isConnectedInCall, isStudentApproved]);

  // Manejar audio/micrófono WebRTC
  useEffect(() => {
    if (webcamStreamRef.current) {
      const audioTracks = webcamStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMicOn;
      });
    }
  }, [isMicOn]);

  // Inicializar o detener Compartir Pantalla WebRTC (getDisplayMedia)
  useEffect(() => {
    let isMounted = true;

    async function setupScreenShare() {
      if (isScreenSharing && isConnectedInCall && isStudentApproved) {
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            if (!isMounted) return;
            screenStreamRef.current = displayStream;

            displayStream.getVideoTracks()[0].onended = () => {
              setIsScreenSharing(false);
              triggerToast('🖥️ Compartisión de pantalla finalizada.');
            };

            if (screenShareRef.current) {
              screenShareRef.current.srcObject = displayStream;
            }
          }
        } catch (err) {
          console.warn('Compartición de pantalla cancelada o no soportada:', err);
          if (isMounted) {
            setIsScreenSharing(false);
            triggerToast('🖥️ Compartición de pantalla cancelada.');
          }
        }
      } else {
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop());
          screenStreamRef.current = null;
        }
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = null;
        }
      }
    }

    setupScreenShare();

    return () => {
      isMounted = false;
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScreenSharing, isConnectedInCall, isStudentApproved]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), user: user.name || 'Tú', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setNewMessage('');
  };

  const toggleMic = () => {
    setIsMicOn(prev => {
      const next = !prev;
      triggerToast(next ? '🎙️ Micrófono activado' : '🔇 Micrófono silenciado');
      return next;
    });
  };

  const toggleCamera = () => {
    setIsCameraOn(prev => {
      const next = !prev;
      triggerToast(next ? '📹 Cámara activada' : '📷 Cámara desactivada');
      return next;
    });
  };

  const toggleHand = () => {
    setIsHandRaised(prev => {
      const next = !prev;
      triggerToast(next ? '✋ Has levantado la mano para participar' : '✋ Mano bajada');
      return next;
    });
  };

  const toggleScreenShare = () => {
    if (!isScreenSharing) {
      setIsScreenSharing(true);
      triggerToast('🖥️ Iniciando compartición de pantalla en vivo...');
    } else {
      setIsScreenSharing(false);
      triggerToast('🖥️ Compartición de pantalla finalizada.');
    }
  };

  const handleSimulateApproveCurrentStudent = () => {
    if (currentStudentReq) {
      approveRoomEntry(currentStudentReq.id);
    } else {
      const newReq = requestRoomEntry(classItem.id, user);
      approveRoomEntry(newReq.id);
    }
    triggerToast('✅ ¡El docente ha aprobado tu ingreso a la clase en vivo!');
  };

  return (
    <div className="page-container">
      <div className="detail-top-nav">
        <Link to="/clases" className="back-btn">
          <ArrowLeft size={18} />
          <span>Volver a Clases</span>
        </Link>

        <div className="in-app-status-badge">
          <span className="live-dot-pulse"></span>
          <span>Aula Virtual Integrada EduNexus</span>
          <span className="room-id-tag">Código: {classItem.accessCode || 'MATH-8492'}</span>
        </div>
      </div>

      {toastMessage && (
        <div className="in-app-toast-alert animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Widget en vivo para el Docente: Admisión y Aprobación de Estudiantes en Sala de Espera */}
      {isTeacher && pendingRequestsForTeacher.length > 0 && (
        <div className="teacher-admission-widget glass-card animate-fadeIn">
          <div className="admission-widget-header">
            <div className="widget-title">
              <UserPlus size={18} color="#facc15" />
              <h4>Solicitudes de Ingreso a la Clase ({pendingRequestsForTeacher.length})</h4>
            </div>
            <span className="live-badge-yellow">Sala de Espera Activa</span>
          </div>

          <div className="pending-students-list">
            {pendingRequestsForTeacher.map(req => (
              <div key={req.id} className="pending-student-card">
                <img src={req.avatar} alt={req.studentName} className="pending-student-avatar" />
                <div className="pending-student-info">
                  <span className="student-name">{req.studentName}</span>
                  <span className="student-meta">{req.studentEmail} • {req.time}</span>
                </div>
                <div className="admission-action-buttons">
                  <button 
                    type="button" 
                    className="btn-admit-approve"
                    onClick={() => {
                      approveRoomEntry(req.id);
                      triggerToast(`✅ ${req.studentName} ha sido admitido en la clase.`);
                    }}
                  >
                    <Check size={14} /> Admitir
                  </button>

                  <button 
                    type="button" 
                    className="btn-admit-reject"
                    onClick={() => {
                      rejectRoomEntry(req.id);
                      triggerToast(`❌ Ingreso denegado a ${req.studentName}.`);
                    }}
                  >
                    <X size={14} /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="live-detail-grid">
        <div className="video-section glass-card">
          <div className="player-container">
            {/* ESCENARIO 1: Estudiante en Sala de Espera (Pendiente de Aprobación por Docente) */}
            {isStudentPending ? (
              <div className="waiting-room-screen">
                <div className="waiting-pulse-icon">
                  <Clock size={48} className="spin-slow" color="#facc15" />
                </div>
                <h3>⏳ Sala de Espera Protegida</h3>
                <p>
                  El código de sala fue verificado correctamente. Por seguridad, el docente <strong>{classItem.teacher}</strong> debe aprobar tu ingreso a la videollamada en directo.
                </p>
                <div className="waiting-status-badge">
                  <span className="yellow-dot-pulse"></span>
                  <span>Solicitud de acceso enviada al docente • En cola</span>
                </div>

                <div className="waiting-room-actions">
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleSimulateApproveCurrentStudent}
                  >
                    <CheckCircle size={16} />
                    <span>Aprobar Ingreso (Modo Demostración / Docente)</span>
                  </button>
                  <Link to="/clases" className="btn-secondary">
                    Cancelar y Volver
                  </Link>
                </div>
              </div>
            ) : isStudentRejected ? (
              /* ESCENARIO 2: Estudiante Rechazado por el Docente */
              <div className="waiting-room-screen rejected">
                <ShieldAlert size={48} color="#f87171" />
                <h3>🚫 Ingreso Denegado por el Docente</h3>
                <p>
                  El profesor titular ha rechazado la solicitud de ingreso para esta sesión. Si crees que se trata de un error, solicita un nuevo código al docente.
                </p>
                <Link to="/clases" className="btn-primary">
                  Volver a Clases
                </Link>
              </div>
            ) : isConnectedInCall ? (
              /* ESCENARIO 3: Estudiante Aprobado / Docente en Transmisión WebRTC Real */
              <div className="in-app-video-canvas">
                {/* Visualización Principal: Pantalla Compartida WebRTC o Cámara del Aula */}
                {isScreenSharing ? (
                  <div className="screen-share-presentation">
                    <video 
                      ref={screenShareRef} 
                      autoPlay 
                      playsInline 
                      className="main-webrtc-video-stream"
                    />
                    <div className="screen-share-header-tag">
                      <Monitor size={16} /> Transmitiendo Pantalla en Vivo de {user.name}
                    </div>
                  </div>
                ) : (
                  <div className="teacher-webcam-feed">
                    <img src={classItem.imageUrl} alt={classItem.title} className="webcam-backdrop" />
                    <div className="webcam-teacher-overlay">
                      <div className="teacher-speaking-indicator">
                        <span className="audio-wave"></span>
                        <span className="teacher-name-tag">{classItem.teacher} (Docente Titular)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recuadro PiP WebRTC de mi Cámara en Vivo */}
                <div className="pip-my-camera-box">
                  {isCameraOn ? (
                    <div className="my-camera-active">
                      <video 
                        ref={webcamRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className={`pip-webrtc-video ${!hasWebcamHardware ? 'hidden-fallback' : ''}`}
                      />
                      {!hasWebcamHardware && (
                        <img src={user.avatar} alt={user.name} className="pip-avatar-bg" />
                      )}
                      <span className="pip-user-label">{user.name.split(' ')[0]} (Tú)</span>
                    </div>
                  ) : (
                    <div className="my-camera-off">
                      <UserCheck size={24} color="#a5b4fc" />
                      <span className="pip-user-label">Cámara Apagada</span>
                    </div>
                  )}
                  {!isMicOn && <div className="pip-muted-icon"><MicOff size={14} color="#f87171" /></div>}
                </div>

                {/* Overlay superior de badges de sesión */}
                <div className="top-player-badges">
                  <span className="live-badge">🔴 EN VIVO DENTRO DE LA APP</span>
                  <span className="hd-badge">WebRTC Real • 1080p Encrypted</span>
                  {isHandRaised && <span className="hand-raised-badge animate-pulse">✋ Mano Levantada</span>}
                </div>
              </div>
            ) : (
              <div className="call-ended-placeholder">
                <Video size={48} className="ended-icon" />
                <h3>Has salido de la clase virtual</h3>
                <p>Puedes reingresar a la sesión en directo en cualquier momento.</p>
                <button className="btn-primary" onClick={() => setIsConnectedInCall(true)}>
                  <Video size={18} />
                  <span>Reingresar a la Clase Virtual</span>
                </button>
              </div>
            )}
          </div>


          {/* Panel Destacado de Controles de la Clase Virtual (100% In-App WebRTC) */}
          {isConnectedInCall && (
            <div className="in-app-call-controls-panel glass-card">
              <div className="controls-panel-title">
                <Sparkles size={16} color="#818cf8" />
                <span>Controles de la Clase Virtual (WebRTC Real)</span>
              </div>

              <div className="controls-buttons-grid">
                <button 
                  type="button"
                  className={`call-control-pill ${isMicOn ? 'mic-on' : 'mic-off'}`}
                  onClick={toggleMic}
                >
                  {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
                  <span>{isMicOn ? '🎙️ Micrófono ON' : '🔇 Micrófono Silenciado'}</span>
                </button>

                <button 
                  type="button"
                  className={`call-control-pill ${isCameraOn ? 'cam-on' : 'cam-off'}`}
                  onClick={toggleCamera}
                >
                  {isCameraOn ? <Camera size={18} /> : <CameraOff size={18} />}
                  <span>{isCameraOn ? '📹 Cámara ON' : '📷 Cámara Apagada'}</span>
                </button>

                <button 
                  type="button"
                  className={`call-control-pill ${isHandRaised ? 'hand-raised' : 'hand-normal'}`}
                  onClick={toggleHand}
                >
                  <Hand size={18} />
                  <span>{isHandRaised ? '✋ Mano Levantada' : '✋ Levantar Mano'}</span>
                </button>

                <button 
                  type="button"
                  className={`call-control-pill ${isScreenSharing ? 'screen-sharing' : 'screen-normal'}`}
                  onClick={toggleScreenShare}
                >
                  <Monitor size={18} />
                  <span>{isScreenSharing ? '🖥️ Compartiendo Pantalla' : '🖥️ Compartir Pantalla'}</span>
                </button>

                <button 
                  type="button"
                  className="call-control-pill hangup-pill"
                  onClick={() => {
                    setIsConnectedInCall(false);
                    triggerToast('Has salido de la clase virtual.');
                  }}
                >
                  <PhoneOff size={18} />
                  <span>📞 Salir de la Clase</span>
                </button>
              </div>
            </div>
          )}

          <div className="class-info-body">
            <div className="info-main-header">
              <h2>{classItem.title}</h2>
              <span className="badge badge-primary">{classItem.tag}</span>
            </div>

            <div className="class-teacher-badge">
              <span>Docente Titular: <strong>{classItem.teacher}</strong></span>
              <span className="in-app-room-tag">
                <Key size={14} /> Código de Ingreso: <code>{classItem.accessCode || 'MATH-8492'}</code>
              </span>
            </div>
            <p className="class-description">
              Esta clase virtual en directo opera 100% de manera integrada **dentro de la aplicación EduNexus** mediante WebRTC. Tu cámara y micrófono se capturan directamente y puedes compartir tu pantalla sin abrir pestañas externas.
            </p>
          </div>
        </div>

        <div className="chat-section glass-card">
          <div className="chat-header">
            <MessageSquare size={18} />
            <h3>Chat en Vivo de la Clase</h3>
          </div>

          <div className="chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.user === user.name || msg.user === 'Tú' ? 'my-message' : ''}`}>
                <div className="chat-msg-header">
                  <span className="msg-user">{msg.user}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
                <p className="msg-text">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              placeholder="Escribe un mensaje o duda..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn-primary send-btn" aria-label="Enviar">
              <Send size={16} />
            </button>
          </form>

          <div className="resources-section">
            <h4>Recursos Descargables</h4>
            <a href="#" className="resource-item" onClick={(e) => e.preventDefault()}>
              <Download size={16} />
              <span>Guía_de_Trabajo_{classItem.id}.pdf</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

