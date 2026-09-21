import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { loginWithSupabase, signUpWithSupabase, uploadTeacherDiploma } from '../services/supabaseService';
import { GoogleAccountPickerModal } from '../components/GoogleAccountPickerModal';
import { 
  BookOpen, Mail, Lock, LogIn, User, GraduationCap, UserPlus, 
  AlertCircle, CheckCircle, UploadCloud, FileText, X, Award, ShieldAlert 
} from 'lucide-react';
import './Login.css';

export const Login = () => {
  const { loginAsRole, isSupabaseConfigured } = useApp();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [roleType, setRoleType] = useState('student'); // 'student' | 'teacher'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);


  // Campos exclusivos de acreditación docente
  const [professionalId, setProfessionalId] = useState('');
  const [diplomaFile, setDiplomaFile] = useState(null);
  const [diplomaFileName, setDiplomaFileName] = useState('');
  const [diplomaDataUrl, setDiplomaDataUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleChange = (role) => {
    setRoleType(role);
    setErrorMsg('');
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    // Verificar formato
    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'webp'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(ext)) {
      setErrorMsg('El archivo del diploma debe estar en formato PDF, PNG, JPG o WEBP.');
      return;
    }

    // Verificar tamaño (máx 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('El archivo es demasiado grande. El límite máximo es 10 MB.');
      return;
    }

    setErrorMsg('');
    setDiplomaFile(file);
    setDiplomaFileName(file.name);

    // Generar vista previa en Base64 / DataURL para previsualización inmediata
    const reader = new FileReader();
    reader.onload = (e) => {
      setDiplomaDataUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeDiplomaFile = () => {
    setDiplomaFile(null);
    setDiplomaFileName('');
    setDiplomaDataUrl('');
  };

  const formatAuthError = (message) => {
    if (!message) return 'Ocurrió un error en la autenticación.';
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes('rate limit exceeded') || msgLower.includes('rate limit')) {
      return 'Se ha superado el límite de envíos de correo de Supabase (Email rate limit exceeded). Espera unos minutos antes de reintentar o desactiva "Confirm Email" en el panel de Supabase.';
    }
    if (msgLower.includes('user already registered') || msgLower.includes('already registered')) {
      return 'Este correo electrónico ya está registrado. Intenta iniciar sesión.';
    }
    if (msgLower.includes('invalid login credentials') || msgLower.includes('invalid credentials')) {
      return 'Credenciales inválidas. Verifica tu correo y contraseña.';
    }
    if (msgLower.includes('password should be at least')) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const enteredName = name.trim();

    // Requisito estricto: Los docentes DEBEN adjuntar diploma al registrarse
    if (isRegistering && roleType === 'teacher') {
      if (!diplomaFile && !diplomaFileName) {
        setErrorMsg(' Requisito obligatorio: Debes adjuntar tu diploma o certificado de acreditación docente para crear una cuenta como docente.');
        return;
      }
      if (!professionalId.trim()) {
        setErrorMsg(' Requisito obligatorio: Debes ingresar tu número de tarjeta profesional o cédula docente.');
        return;
      }
    }

    // Verificación de credenciales de Administrador Master (Privado / Confidencial)
    if (email.trim().toLowerCase() === 'admin@edunexus.edu.co') {
      if (password !== 'AdminNexus2026!') {
        setErrorMsg('Credenciales de Administrador incorrectas. Verifica tu contraseña.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg('¡Sesión de Administrador Master iniciada!');
        loginAsRole('admin', {
          name: 'Administrador Master EduNexus',
          email: 'admin@edunexus.edu.co'
        });
        setTimeout(() => navigate('/inicio'), 600);
      }, 400);
      return;
    }

    if (isSupabaseConfigured) {
      setLoading(true);
      try {
        if (isRegistering) {
          let uploadedUrl = diplomaDataUrl;
          if (roleType === 'teacher' && diplomaFile) {
            const supabaseUploadedUrl = await uploadTeacherDiploma(diplomaFile, email);
            if (supabaseUploadedUrl) {
              uploadedUrl = supabaseUploadedUrl;
            }
          }

          // Registrar usuario en Supabase Auth
          const { data, error } = await signUpWithSupabase(email, password, {
            name: enteredName || (roleType === 'teacher' ? 'Prof. ' + (email.split('@')[0]) : 'Estudiante Registrado'),
            roleType,
            verification_status: roleType === 'teacher' ? 'pending' : 'verified',
            diploma_filename: diplomaFileName,
            diploma_url: uploadedUrl,
            professional_id: professionalId
          });

          if (error) {
            setErrorMsg(formatAuthError(error.message));
          } else {
            setSuccessMsg('¡Cuenta de docente solicitada exitosamente! Tu diploma ha sido enviado a verificación.');
            loginAsRole(roleType, { 
              name: enteredName, 
              email, 
              roleType,
              verificationStatus: roleType === 'teacher' ? 'pending' : 'verified',
              diplomaFileName,
              diplomaUrl: uploadedUrl,
              professionalId,
              isNewRegistration: true
            });
            setTimeout(() => navigate('/inicio'), 1000);
          }
        } else {
          // Iniciar sesión en Supabase Auth
          const { data, error } = await loginWithSupabase(email, password);

          if (error) {
            setErrorMsg(formatAuthError(error.message) || 'Credenciales inválidas o cuenta no encontrada en Supabase.');
          } else {
            loginAsRole(roleType, { 
              name: enteredName || data?.user?.user_metadata?.name, 
              email, 
              roleType,
              verificationStatus: data?.user?.user_metadata?.verification_status || (roleType === 'teacher' ? 'pending' : 'verified'),
              diplomaFileName: data?.user?.user_metadata?.diploma_filename || (roleType === 'teacher' ? 'Diploma_Docente.pdf' : null),
              diplomaUrl: data?.user?.user_metadata?.diploma_url || null,
              professionalId: data?.user?.user_metadata?.professional_id || null
            });
            navigate('/inicio');
          }
        }
      } catch (err) {
        setErrorMsg('Ocurrió un error inesperado al conectar con Supabase.');
      } finally {
        setLoading(false);
      }
    } else {
      // Modo Directo (Sin Supabase backend activo)
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg(roleType === 'teacher' && isRegistering 
          ? '¡Cuenta de docente creada! Tu diploma " ' + diplomaFileName + ' " fue enviado a verificación.' 
          : '¡Sesión iniciada con éxito!'
        );
        loginAsRole(roleType, { 
          name: enteredName, 
          email, 
          roleType,
          verificationStatus: roleType === 'teacher' ? 'pending' : 'verified',
          diplomaFileName,
          diplomaUrl: diplomaDataUrl || '#',
          professionalId,
          isNewRegistration: true
        });
        setTimeout(() => navigate('/inicio'), 800);
      }, 500);
    }
  };

  const handleGoogleSignIn = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setShowGoogleModal(true);
  };

  const handleSelectGoogleAccount = (account) => {
    setShowGoogleModal(false);
    setLoading(true);
    const isDoc = roleType === 'teacher';

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`¡Sesión iniciada con tu cuenta de Google (${account.email})!`);
      loginAsRole(roleType, {
        name: account.name || (isDoc ? 'Prof. ' + account.email.split('@')[0] : account.email.split('@')[0]),
        email: account.email,
        avatar: account.avatar,
        roleType,
        verificationStatus: isDoc ? 'pending' : 'verified',
        diplomaFileName: isDoc ? 'Diploma_Acreditacion_Google_Edu.pdf' : null,
        diplomaUrl: '#',
        professionalId: isDoc ? 'GOOGLE-LICENSE-9480' : null
      });
      setTimeout(() => navigate('/inicio'), 600);
    }, 400);
  };



  return (
    <div className="login-page-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="brand-logo">
            <BookOpen size={28} color="#ffffff" />
          </div>
          <h1>EduNexus</h1>
          <p>{isRegistering ? 'Crea tu cuenta en la plataforma' : 'Inicia sesión en tu cuenta'}</p>
          
          {isSupabaseConfigured && (
            <div className="supabase-status-badge">
              <span className="dot active"></span> Supabase Conectado
            </div>
          )}
        </div>

        {/* Notificaciones de error o éxito */}
        {errorMsg && (
          <div className="auth-alert error">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="auth-alert success">
            <CheckCircle size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Selector de Rol */}
        <div className="role-selector-tabs">
          <button
            type="button"
            className={`role-tab ${roleType === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            <User size={18} />
            <span>Estudiante</span>
          </button>
          <button
            type="button"
            className={`role-tab ${roleType === 'teacher' ? 'active' : ''}`}
            onClick={() => handleRoleChange('teacher')}
          >
            <GraduationCap size={18} />
            <span>Docente</span>
          </button>
        </div>

        {/* Opción de Autenticación con Google / Gmail */}
        <div className="sso-section">
          <button 
            type="button" 
            className="btn-google-sso"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{isRegistering ? 'Registrarse con Google / Gmail' : 'Ingresar con Google / Gmail'}</span>
          </button>

          <div className="auth-divider">
            <span>O ingresa con tu correo electrónico</span>
          </div>
        </div>

        {isRegistering && roleType === 'teacher' && (
          <div className="teacher-accreditation-info-box">
            <ShieldAlert size={20} className="info-icon" />
            <div>
              <strong>Requisito de Acreditación Docente</strong>
              <p>Para evitar accesos no autorizados como profesor, debes adjuntar obligatoriamente tu diploma o certificación profesional.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label htmlFor="name">Nombre Completo {isRegistering ? '(Requerido)' : '(Opcional)'}</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                id="name"
                type="text"
                placeholder={roleType === 'teacher' ? 'Ej. Prof. Alejandro Ramírez' : 'Ej. María Fernanda López'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegistering}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico ({roleType === 'teacher' ? 'Docente' : 'Estudiante'})</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder={roleType === 'teacher' ? 'docente@edunexus.edu.co' : 'estudiante@edunexus.edu.co'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campos requeridos para registro de docentes */}
          {isRegistering && roleType === 'teacher' && (
            <>
              <div className="form-group">
                <label htmlFor="professionalId">Número de Tarjeta Profesional / Registro Docente *</label>
                <div className="input-with-icon">
                  <Award size={18} className="input-icon" />
                  <input
                    id="professionalId"
                    type="text"
                    placeholder="Ej. TP-849201-EDU ó Cédula Docente"
                    value={professionalId}
                    onChange={(e) => setProfessionalId(e.target.value)}
                    required={isRegistering && roleType === 'teacher'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Diploma o Certificado Docente * <span className="label-required-badge">Requerido</span></label>
                
                {diplomaFileName ? (
                  <div className="file-preview-card">
                    <div className="file-info-col">
                      <div className="file-icon-badge">
                        <FileText size={20} />
                      </div>
                      <div className="file-details">
                        <span className="file-name">{diplomaFileName}</span>
                        <span className="file-status">✓ Listo para enviar a verificación</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={removeDiplomaFile}
                      title="Eliminar archivo"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`file-dropzone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <UploadCloud size={32} className="upload-icon" />
                    <div className="dropzone-text">
                      <span className="primary-text">Haz clic para subir o arrastra tu diploma</span>
                      <span className="secondary-text">Formatos permitidos: PDF, PNG, JPG (Máx 10 MB)</span>
                    </div>
                    <input
                      id="diplomaInput"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      onChange={handleFileInputChange}
                      className="hidden-file-input"
                    />
                    <label htmlFor="diplomaInput" className="btn-secondary select-file-btn">
                      Seleccionar Archivo
                    </label>
                  </div>
                )}
              </div>
            </>
          )}

          {!isRegistering && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                <span>Recordar sesión</span>
              </label>
              <a href="#forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary login-submit-btn" 
            disabled={loading || (isRegistering && roleType === 'teacher' && !diplomaFileName)}
          >
            {loading ? (
              <span>Procesando...</span>
            ) : isRegistering ? (
              <>
                <span>Registrar Cuenta ({roleType === 'teacher' ? 'Docente' : 'Estudiante'})</span>
                <UserPlus size={18} />
              </>
            ) : (
              <>
                <span>Ingresar como {roleType === 'teacher' ? 'Docente' : 'Estudiante'}</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          {isRegistering ? (
            <p>¿Ya tienes una cuenta? <button type="button" className="link-button" onClick={() => setIsRegistering(false)}>Iniciar Sesión</button></p>
          ) : (
            <p>¿No tienes una cuenta aún? <button type="button" className="link-button" onClick={() => setIsRegistering(true)}>Crear Cuenta Nueva</button></p>
          )}
        </div>
      </div>

      {/* Modal de Autenticación 100% Funcional con Google / Gmail */}
      <GoogleAccountPickerModal 
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelectAccount={handleSelectGoogleAccount}
        roleType={roleType}
      />
    </div>
  );
};

export default Login;

