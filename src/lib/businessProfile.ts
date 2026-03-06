export interface BusinessProfile {
    id: string
    user_id: string
    profile_name: string
    is_active: boolean
    business_name: string
    phone: string
    email: string
    website: string
    address_line1: string
    address_line2: string
    city: string
    state: string
    zip_code: string
    country: string
    service_type: string
    service_areas: string[]
    business_hours: any
    description: string
    primary_keyword: string
    secondary_keywords: string[]
    gbp_url: string
    google_cid: string
    facebook_url: string
    instagram_url: string
    twitter_url: string
    linkedin_url: string
    whatsapp_number: string
    youtube_url: string
    client_name: string
    monthly_budget: string
    contract_start: string
    notes: string
    target_rent_price: string
    site_status: string
    automation_status: string
    created_at: string
    updated_at: string
}

import { supabase } from '@/lib/supabase'

export async function getProfiles(
    userId: string
): Promise<BusinessProfile[]> {
    const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', {
            ascending: false
        })
    if (error) throw error
    return data || []
}

export async function createProfile(
    userId: string,
    data: Partial<BusinessProfile>
): Promise<BusinessProfile> {
    const { data: created, error } =
        await supabase
            .from('business_profiles')
            .insert({ ...data, user_id: userId })
            .select()
            .single()
    if (error) throw error
    return created
}

export async function updateProfile(
    id: string,
    data: Partial<BusinessProfile>
): Promise<BusinessProfile> {
    const { data: updated, error } =
        await supabase
            .from('business_profiles')
            .update({
                ...data,
                updated_at: new Date()
                    .toISOString()
            })
            .eq('id', id)
            .select()
            .single()
    if (error) throw error
    return updated
}

export async function deleteProfile(
    id: string
): Promise<void> {
    const { error } = await supabase
        .from('business_profiles')
        .delete()
        .eq('id', id)
    if (error) throw error
}

export async function setActiveProfile(
    id: string,
    userId: string
): Promise<void> {
    // First set all inactive
    await supabase
        .from('business_profiles')
        .update({ is_active: false })
        .eq('user_id', userId)
    // Then set selected active
    const { error } = await supabase
        .from('business_profiles')
        .update({ is_active: true })
        .eq('id', id)
    if (error) throw error
    // Save to localStorage for 
    // other tools to use
    localStorage.setItem(
        'active_profile_id', id
    )
}

export async function getActiveProfile(
    userId: string
): Promise<BusinessProfile | null> {
    const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()
    if (error) return null
    return data
}
