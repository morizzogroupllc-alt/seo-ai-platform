import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
    return await supabase.auth.signOut()
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function getUserRole(userId: string) {
    const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()
    return data?.role
}
