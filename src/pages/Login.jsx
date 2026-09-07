import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { loginWithSupabase, signUpWithSupabase } from '../services/supabaseService';
import { BookOpen, Mail, Lock, LogIn, User, GraduationCap, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import './Login.css';

export const Login = () => {
  const { loginAsRole, isSupabaseConfigured } = useApp();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [roleType, setRoleType] = useState('student'); // 'student' | 'teacher'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleChange = (role) => {
    setRoleType(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const enteredName = name.trim();

    if (isSupabaseConfigured) {
      setLoading(true);
      try {
        if (isRegistering) {
          // Registrar usuario en Supabase Auth
          const { data, error } = await signUpWithSupabase(email, password, {
            name: enteredName || (roleType === 'teacher' ? 'Docente Registrado' : 'Estudiante Registrado'),
            roleType
          });

          if (error) {
            setErrorMsg(error.message || 'Error al crear la cuenta en Supabase.');
          } else {
            setSuccessMsg('¡Cuenta registrada exitosamente! Iniciando sesión...');
            loginAsRole(roleType, { name: enteredName, email, roleType });
            setTimeout(() => navigate('/inicio'), 800);
          }
        } else {
          // Iniciar sesión en Supabase Auth
          const { data, error } = await loginWithSupabase(email, password);

          if (error) {
            setErrorMsg('Credenciales inválidas o cuenta no encontrada en Supabase.');
          } else {
            loginAsRole(roleType, { name: enteredName || data?.user?.user_metadata?.name, email, roleType });
            navigate('/inicio');
          }
        }
      } catch (err) {
        setErrorMsg('Ocurrió un error inesperado al conectar con Supabase.');
      } finally {
        setLoading(false);
      }
    } else {
      // Modo Directo
      loginAsRole(roleType, { name: enteredName, email, roleType });
      navigate('/inicio');
    }
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

          {!isRegistering && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                <span>Recordar sesión</span>
              </label>
              <a href="#forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button type="submit" className="btn-primary login-submit-btn" disabled={loading}>
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
    </div>
  );
};

export default Login;
