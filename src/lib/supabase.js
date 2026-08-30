import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseClient = null

// Si faltan las credenciales, supabaseClient queda en null y la app usa el fallback local.
if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
}

export function getSupabase() {
  return supabaseClient
}

export function isSupabaseConfigured() {
  return supabaseClient !== null
}
