import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitPreRegistration(email) {
  const { data, error } = await supabase
    .from('pre_register')
    .insert([{ email: email.toLowerCase().trim() }])
    .select()

  console.log("RESULT:", { data, error })

  return { data, error }
}

export async function getPreRegisterCount() {
  const { data, error } = await supabase
    .rpc('get_pre_register_count')

  if (error) {
    console.error('Count fetch error:', error)
    return { count: 0 }
  }

  return { count: data }
}
