import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ==========================================
// SERVICIOS DE AUTENTICACIÓN
// ==========================================

export async function loginWithSupabase(email, password) {
  if (!isSupabaseConfigured) {
    console.warn('Supabase no está configurado. Usando modo de prueba local.');
    return { data: null, error: new Error('Supabase no configurado') };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signUpWithSupabase(email, password, metadata = {}) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase no configurado') };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });

  if (!error && data?.user) {
    // Si es docente, insertar o actualizar su perfil con los datos de acreditación
    await supabase.from('profiles').upsert({
      id: data.user.id,
      name: metadata.name,
      email: email,
      role_type: metadata.roleType || 'student',
      verification_status: metadata.verification_status || (metadata.roleType === 'teacher' ? 'pending' : 'verified'),
      diploma_url: metadata.diploma_url || null,
      diploma_filename: metadata.diploma_filename || null,
      professional_id: metadata.professional_id || null
    });
  }

  return { data, error };
}

export async function uploadTeacherDiploma(file, userId) {
  if (!isSupabaseConfigured || !file) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `diplomas/${userId || Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('teacher-diplomas')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.warn('No se pudo subir a Supabase Storage (se usará respaldo local/dataURL):', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('teacher-diplomas')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('Error al subir archivo de diploma:', err);
    return null;
  }
}

export async function logoutSupabase() {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}

export async function getCurrentUserProfile() {
  if (!isSupabaseConfigured) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile || user;
}

// ==========================================
// SERVICIOS DE GUÍAS DE ESTUDIO
// ==========================================

export async function fetchGuias() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('guias')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) console.error('Error fetching guias:', error);
  return data;
}

export async function createGuia(guia) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('guias')
    .insert([guia])
    .select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function updateGuia(id, guia) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('guias')
    .update(guia)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function deleteGuia(id) {
  if (!isSupabaseConfigured) return false;
  const { error } = await supabase
    .from('guias')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// SERVICIOS DE TALLERES INTERACTIVOS
// ==========================================

export async function fetchTalleres() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('talleres')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) console.error('Error fetching talleres:', error);
  return data;
}

export async function createTaller(taller) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('talleres')
    .insert([taller])
    .select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function updateTaller(id, taller) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('talleres')
    .update(taller)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function deleteTaller(id) {
  if (!isSupabaseConfigured) return false;
  const { error } = await supabase
    .from('talleres')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// SERVICIOS DE CLASES EN VIVO
// ==========================================

export async function fetchClasesLive() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('clases_live')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) console.error('Error fetching clases_live:', error);
  return data;
}

export async function createClaseLive(clase) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('clases_live')
    .insert([clase])
    .select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function updateClaseLive(id, clase) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('clases_live')
    .update(clase)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function deleteClaseLive(id) {
  if (!isSupabaseConfigured) return false;
  const { error } = await supabase
    .from('clases_live')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// SERVICIOS DE NOTIFICACIONES
// ==========================================

export async function fetchNotificaciones(roleType = 'student') {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('notificaciones')
    .select('*')
    .eq('for_role', roleType)
    .order('created_at', { ascending: false });
  if (error) console.error('Error fetching notificaciones:', error);
  return data;
}

export async function markNotificacionAsRead(id) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase
    .from('notificaciones')
    .update({ unread: false })
    .eq('id', id);
  if (error) console.error('Error marking notification as read:', error);
}
