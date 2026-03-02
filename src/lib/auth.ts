import { supabase } from './supabase'

export async function signUp(email: string, password: string, fullName: string) {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    })
}

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
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single()

        if (error) {
            console.error('Error fetching role:', error)
            return null
        }

        console.log('Role found for user:', data?.role)
        return data?.role
    } catch (err) {
        console.error('Catch error fetching role:', err)
        return null
    }
}
