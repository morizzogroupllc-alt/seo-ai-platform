import { supabase } from '@/lib/supabase'

export async function generateAIPrompt(toolId: string, userInputs: Record<string, any>, profileId?: string) {
    // 1. Fetch Tools Config
    const { getToolById } = await import('@/lib/registry/tools')
    const tool = getToolById(toolId)
    if (!tool) throw new Error('Tool not found')

    let prompt = tool.promptTemplate

    // 2. Fetch NAP Data if profileId exists
    if (profileId) {
        const { data: profile } = await supabase
            .from('business_profiles')
            .select('*')
            .eq('id', profileId)
            .single()

        if (profile) {
            // Injected Profile Data
            prompt = prompt.replace(/{{business_name}}/g, profile.business_name || '')
            prompt = prompt.replace(/{{address}}/g, profile.address || '')
            prompt = prompt.replace(/{{phone}}/g, profile.phone || '')
            prompt = prompt.replace(/{{website}}/g, profile.website || '')
        }
    }

    // 3. Inject User Inputs
    Object.keys(userInputs).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        prompt = prompt.replace(regex, userInputs[key] || '')
    })

    // 4. Return Final Prompt (In a real app, this would then call OpenAI/Claude)
    return prompt
}
