import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  fetchGuias, 
  fetchTalleres, 
  fetchClasesLive, 
  deleteGuia, 
  deleteTaller, 
  deleteClaseLive, 
  updateGuia, 
  updateTaller, 
  updateClaseLive 
} from '../services/supabaseService';
import { 
  BookOpen, 
  Sliders, 
  Video, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  CheckCircle,
  FileText,
  Calendar,
  UserCheck
} from 'lucide-react';
import './MisPublicaciones.css';

export function MisPublicaciones() {
  const { user, isSupabaseConfigured } = useApp();
  const [activeTab, setActiveTab] = useState('guias');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado local para publicaciones docentes (simulado + sincronizado con Supabase)
  const [guias, setGuias] = useState([
    { id: 1, title: 'Guía de Cálculo Diferencial', category: 'Matemáticas', grade: '11° Grado', date: '2026-09-01', downloads: 34 },
    { id: 2, title: 'Fundamentos de Robótica y Algoritmos', category: 'Tecnología', grade: '10° Grado', date: '2026-08-28', downloads: 58 },
    { id: 3, title: 'Análisis Literario y Redacción', category: 'Lenguaje', grade: '11° Grado', date: '2026-08-20', downloads: 19 }
  ]);

  const [talleres, setTalleres] = useState([
    { id: 1, title: 'Simulación de Algoritmos en Python', category: 'Programación', difficulty: 'Intermedio', assignedTo: 'Todos los Estudiantes', dueDate: '2026-09-20' },
    { id: 2, title: 'Resolución de Problemas Vectoriales', category: 'Física', difficulty: 'Avanzado', assignedTo: 'María López', dueDate: '2026-09-15' }
  ]);

  const [clases, setClases] = useState([
    { id: 1, title: 'Resolución de Dudas: Cálculo Diferencial', date: 'Hoy, 16:00 PM', status: 'Programada', viewers: 42 },
    { id: 2, title: 'Taller de Programación en Vivo', date: 'Ayer', status: 'Finalizada', viewers: 65 }
  ]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    fetchGuias().then(data => {
      if (data && data.length > 0) {
        setGuias(data.map(g => ({
          id: g.id,
          title: g.title,
          category: g.category || 'General',
          grade: g.grade || '11° Grado',
          date: g.created_at ? g.created_at.slice(0, 10) : 'Reciente',
          downloads: 12
        })));
      }
    });

    fetchTalleres().then(data => {
      if (data && data.length > 0) {
        setTalleres(data.map(t => ({
          id: t.id,
          title: t.title,
          category: t.category || 'General',
          difficulty: t.difficulty || 'Intermedio',
          assignedTo: t.assigned_to || 'Todos',
          dueDate: t.due_date || 'Próximamente'
        })));
      }
    });

    fetchClasesLive().then(data => {
      if (data && data.length > 0) {
        setClases(data.map(c => ({
          id: c.id,
          title: c.title,
          date: `${c.date} ${c.time}`,
          status: c.status || 'Programada',
          viewers: c.viewers || 0
        })));
      }
    });
  }, [isSupabaseConfigured]);

  // Modal para edición
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState(null); // 'guia', 'taller', 'clase'

  const handleDeleteGuia = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta guía?')) {
      setGuias(guias.filter(g => g.id !== id));
      if (isSupabaseConfigured && typeof id === 'number') {
        await deleteGuia(id);
      }
    }
  };

  const handleDeleteTaller = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este taller?')) {
      setTalleres(talleres.filter(t => t.id !== id));
      if (isSupabaseConfigured && typeof id === 'number') {
        await deleteTaller(id);
      }
    }
  };

  const handleDeleteClase = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta clase programada?')) {
      setClases(clases.filter(c => c.id !== id));
      if (isSupabaseConfigured && typeof id === 'number') {
        await deleteClaseLive(id);
      }
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (editType === 'guia') {
      setGuias(guias.map(g => g.id === editingItem.id ? editingItem : g));
      if (isSupabaseConfigured && typeof editingItem.id === 'number') {
        await updateGuia(editingItem.id, {
          title: editingItem.title,
          category: editingItem.category,
          grade: editingItem.grade
        });
      }
    } else if (editType === 'taller') {
      setTalleres(talleres.map(t => t.id === editingItem.id ? editingItem : t));
      if (isSupabaseConfigured && typeof editingItem.id === 'number') {
        await updateTaller(editingItem.id, {
          title: editingItem.title,
          difficulty: editingItem.difficulty,
          assigned_to: editingItem.assignedTo,
          due_date: editingItem.dueDate
        });
      }
    } else if (editType === 'clase') {
      setClases(clases.map(c => c.id === editingItem.id ? editingItem : c));
      if (isSupabaseConfigured && typeof editingItem.id === 'number') {
        await updateClaseLive(editingItem.id, {
          title: editingItem.title,
          status: editingItem.status
        });
      }
    }
    setEditingItem(null);
    setEditType(null);
  };

  return (
    <div className="mis-publicaciones-container">
      <div className="publicaciones-header">
        <div>
          <span className="badge-teacher">Panel de Gestión Docente</span>
          <h1>Mis Publicaciones y Materiales</h1>
          <p>Administra, edita o elimina las guías, talleres y clases en vivo que has compartido con la comunidad estudiantil.</p>
        </div>
      </div>

      {/* Selector de pestañas */}
      <div className="tabs-header">
        <div className="tabs-buttons">
          <button 
            className={`tab-btn ${activeTab === 'guias' ? 'active' : ''}`}
            onClick={() => setActiveTab('guias')}
          >
            <BookOpen size={18} />
            <span>Guías de Estudio ({guias.length})</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'talleres' ? 'active' : ''}`}
            onClick={() => setActiveTab('talleres')}
          >
            <Sliders size={18} />
            <span>Talleres ({talleres.length})</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'clases' ? 'active' : ''}`}
            onClick={() => setActiveTab('clases')}
          >
            <Video size={18} />
            <span>Clases en Vivo ({clases.length})</span>
          </button>
        </div>

        <div className="search-bar-inline">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Buscar en mis publicaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Pestaña: Guías */}
      {activeTab === 'guias' && (
        <div className="pub-grid">
          {guias
            .filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(guia => (
              <div key={guia.id} className="pub-card">
                <div className="pub-card-top">
                  <span className="pub-badge">{guia.category}</span>
                  <span className="pub-date">{guia.date}</span>
                </div>
                <h3>{guia.title}</h3>
                <p className="pub-meta">Grado: <strong>{guia.grade}</strong> | Descargas: {guia.downloads}</p>
                <div className="pub-actions">
                  <button className="btn-pub-action edit" onClick={() => { setEditingItem({...guia}); setEditType('guia'); }}>
                    <Edit3 size={16} /> Editar
                  </button>
                  <button className="btn-pub-action delete" onClick={() => handleDeleteGuia(guia.id)}>
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pestaña: Talleres */}
      {activeTab === 'talleres' && (
        <div className="pub-grid">
          {talleres
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(taller => (
              <div key={taller.id} className="pub-card">
                <div className="pub-card-top">
                  <span className="pub-badge purple">{taller.category}</span>
                  <span className="pub-date">Entrega: {taller.dueDate}</span>
                </div>
                <h3>{taller.title}</h3>
                <p className="pub-meta">Dificultad: <strong>{taller.difficulty}</strong></p>
                <p className="pub-meta">Asignado a: <span className="assigned-tag">{taller.assignedTo}</span></p>
                <div className="pub-actions">
                  <button className="btn-pub-action edit" onClick={() => { setEditingItem({...taller}); setEditType('taller'); }}>
                    <Edit3 size={16} /> Editar
                  </button>
                  <button className="btn-pub-action delete" onClick={() => handleDeleteTaller(taller.id)}>
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pestaña: Clases en Vivo */}
      {activeTab === 'clases' && (
        <div className="pub-grid">
          {clases
            .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(clase => (
              <div key={clase.id} className="pub-card">
                <div className="pub-card-top">
                  <span className={`pub-badge ${clase.status === 'Programada' ? 'green' : 'gray'}`}>
                    {clase.status}
                  </span>
                  <span className="pub-date">{clase.date}</span>
                </div>
                <h3>{clase.title}</h3>
                <p className="pub-meta">Asistentes previstos / espectadores: <strong>{clase.viewers}</strong></p>
                <div className="pub-actions">
                  <button className="btn-pub-action edit" onClick={() => { setEditingItem({...clase}); setEditType('clase'); }}>
                    <Edit3 size={16} /> Editar
                  </button>
                  <button className="btn-pub-action delete" onClick={() => handleDeleteClase(clase.id)}>
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal de Edición */}
      {editingItem && (
        <div className="modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2>Editar {editType === 'guia' ? 'Guía de Estudio' : editType === 'taller' ? 'Taller' : 'Clase en Vivo'}</h2>
            <form onSubmit={handleSaveEdit} className="modal-form">
              <label>Título:</label>
              <input 
                type="text" 
                value={editingItem.title} 
                onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                required 
              />

              {editType === 'guia' && (
                <>
                  <label>Categoría / Área:</label>
                  <input 
                    type="text" 
                    value={editingItem.category} 
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                  />
                  <label>Grado:</label>
                  <input 
                    type="text" 
                    value={editingItem.grade} 
                    onChange={e => setEditingItem({...editingItem, grade: e.target.value})}
                  />
                </>
              )}

              {editType === 'taller' && (
                <>
                  <label>Dificultad:</label>
                  <select 
                    value={editingItem.difficulty}
                    onChange={e => setEditingItem({...editingItem, difficulty: e.target.value})}
                  >
                    <option>Principiante</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                  </select>
                  <label>Asignado a:</label>
                  <input 
                    type="text" 
                    value={editingItem.assignedTo} 
                    onChange={e => setEditingItem({...editingItem, assignedTo: e.target.value})}
                  />
                  <label>Fecha de Entrega:</label>
                  <input 
                    type="date" 
                    value={editingItem.dueDate} 
                    onChange={e => setEditingItem({...editingItem, dueDate: e.target.value})}
                  />
                </>
              )}

              {editType === 'clase' && (
                <>
                  <label>Fecha / Hora:</label>
                  <input 
                    type="text" 
                    value={editingItem.date} 
                    onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                  />
                  <label>Estado:</label>
                  <select 
                    value={editingItem.status}
                    onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                  >
                    <option>Programada</option>
                    <option>En Vivo</option>
                    <option>Finalizada</option>
                  </select>
                </>
              )}

              <div className="modal-form-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingItem(null)}>Cancelar</button>
                <button type="submit" className="btn-submit">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MisPublicaciones;
