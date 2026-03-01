import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('--- SUPABASE CONFIG CHECK ---')
console.log('URL defined:', !!supabaseUrl)
console.log('Key defined:', !!supabaseAnonKey)
console.log('-----------------------------')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
