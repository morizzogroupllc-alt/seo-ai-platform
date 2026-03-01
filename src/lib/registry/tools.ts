import {
    FileText,
    Globe,
    MapPin,
    Search,
    Zap,
    LucideIcon,
    Type,
    AlignLeft,
    Link as LinkIcon
} from 'lucide-react'

export type InputType = 'text' | 'textarea' | 'select' | 'number'

export interface ToolInput {
    id: string
    label: string
    type: InputType
    placeholder?: string
    description?: string
    required?: boolean
    options?: { label: string; value: string }[]
}

export interface ToolConfig {
    id: string
    name: string
    description: string
    icon: LucideIcon
    category: 'Local SEO' | 'AI Builder' | 'Content' | 'Tech'
    promptTemplate: string
    inputs: ToolInput[]
    outputFormat: 'markdown' | 'html' | 'text'
}

export const toolRegistry: Record<string, ToolConfig> = {
    'meta-description-gen': {
        id: 'meta-description-gen',
        name: 'Meta Description Generator',
        description: 'Create high-converting meta descriptions using your NAP data.',
        icon: FileText,
        category: 'Local SEO',
        promptTemplate: `You are an SEO expert. Generate a 150-160 character meta description for a business. 
    Business Name: {{business_name}}
    Location: {{address}}
    Service focus: {{service_focus}}
    Tone: {{tone}}
    Include the phone number {{phone}} if it fits naturally.`,
        inputs: [
            {
                id: 'service_focus',
                label: 'Primary Service',
                type: 'text',
                placeholder: 'e.g. Emergency Plumbing',
                required: true
            },
            {
                id: 'tone',
                label: 'Tone of Voice',
                type: 'select',
                options: [
                    { label: 'Professional', value: 'professional' },
                    { label: 'Urgent', value: 'urgent' },
                    { label: 'Friendly', value: 'friendly' }
                ],
                required: true
            }
        ],
        outputFormat: 'markdown'
    },
    'ai-page-gen': {
        id: 'ai-page-gen',
        name: 'AI Page Generator',
        description: 'Generate full service-area pages optimized for local search.',
        icon: Globe,
        category: 'AI Builder',
        promptTemplate: `Generate a full SEO-optimized landing page for:
    Business: {{business_name}}
    Niche: {{niche}}
    Target City: {{city}}
    Address: {{address}}
    Phone: {{phone}}
    
    Structure the output with H1, H2s, and localized content that mentions specific landmarks in {{city}}.`,
        inputs: [
            { id: 'niche', label: 'Business Niche', type: 'text', placeholder: 'e.g. Roofing Contractor', required: true },
            { id: 'city', label: 'Target City', type: 'text', placeholder: 'e.g. Dallas, TX', required: true }
        ],
        outputFormat: 'html'
    }
}

export const getToolById = (id: string) => toolRegistry[id]
