import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Clases } from './pages/Clases';
import { ClaseLiveDetail } from './pages/ClaseLiveDetail';
import { Guias } from './pages/Guias';
import { GuiaDetail } from './pages/GuiaDetail';
import { Talleres } from './pages/Talleres';
import { TallerDetail } from './pages/TallerDetail';
import { Materias } from './pages/Materias';
import { MateriaDetail } from './pages/MateriaDetail';
import { Progreso } from './pages/Progreso';
import { Diplomas } from './pages/Diplomas';
import { Perfil } from './pages/Opciones/Perfil';
import { Notificaciones } from './pages/Opciones/Notificaciones';
import { Configuraciones } from './pages/Opciones/Configuraciones';
import { Ayuda } from './pages/Opciones/Ayuda';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta principal inicial: Inicio de Sesión */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Aplicación tras iniciar sesión */}
          <Route path="/" element={<Layout />}>
            <Route path="inicio" element={<Home />} />
            <Route path="clases" element={<Clases />} />
            <Route path="clases/:id" element={<ClaseLiveDetail />} />
            <Route path="guias" element={<Guias />} />
            <Route path="guias/:id" element={<GuiaDetail />} />
            <Route path="talleres" element={<Talleres />} />
            <Route path="talleres/:id" element={<TallerDetail />} />
            <Route path="materias" element={<Materias />} />
            <Route path="materias/:id" element={<MateriaDetail />} />
            <Route path="progreso" element={<Progreso />} />
            <Route path="diplomas" element={<Diplomas />} />
            
            {/* Opciones */}
            <Route path="perfil" element={<Perfil />} />
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="configuraciones" element={<Configuraciones />} />
            <Route path="ayuda" element={<Ayuda />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
