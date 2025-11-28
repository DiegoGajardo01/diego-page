import { createClient } from '@supabase/supabase-js'

// Usar variables de entorno para las credenciales
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('Supabase credentials not configured. Contact form will not work.')
}

// Cliente con permisos de administrador para operaciones del servidor
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

