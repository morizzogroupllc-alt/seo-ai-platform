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
    icon: string
    category: string
    promptTemplate: string
    inputs: ToolInput[]
    outputFormat: 'markdown' | 'html' | 'text'
}

export const toolRegistry: Record<string, ToolConfig> = {
    'meta-description-gen': {
        id: 'meta-description-gen',
        name: 'Meta Description Generator',
        description: 'Create high-converting meta descriptions using your NAP data.',
        icon: 'FileText',
        category: 'Local SEO',
        promptTemplate: `Generate meta description...`,
        inputs: [{ id: 'service_focus', label: 'Primary Service', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 1: WEBSITE BUILDER ---
    'ai-elementor-gen': {
        id: 'ai-elementor-gen',
        name: 'AI Elementor Auto Page Generator',
        description: 'Generates full Elementor page JSON structure.',
        icon: 'Cpu',
        category: 'Website Builder',
        promptTemplate: `Generate Elementor JSON...`,
        inputs: [{ id: 'niche', label: 'Niche', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'ai-website-gen-wp': {
        id: 'ai-website-gen-wp',
        name: 'AI Website Generator WP + Elementor',
        description: 'Wordpress + Elementor based full website generator.',
        icon: 'Globe',
        category: 'Website Builder',
        promptTemplate: `Generate WP site structure...`,
        inputs: [{ id: 'business_type', label: 'Business Type', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'seo-structure-enforcer': {
        id: 'seo-structure-enforcer',
        name: 'Local SEO Structure Enforcer',
        description: 'Enforces course-based locked structure on site.',
        icon: 'Hammer',
        category: 'Website Builder',
        promptTemplate: `Enforce SEO structure...`,
        inputs: [{ id: 'site_url', label: 'Site URL', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'homepage-layout-builder': {
        id: 'homepage-layout-builder',
        name: 'Homepage SEO Layout Builder',
        description: 'AI generates SEO-friendly homepage layout.',
        icon: 'Layout',
        category: 'Website Builder',
        promptTemplate: `Build homepage layout...`,
        inputs: [{ id: 'focus', label: 'Main Focus', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'service-page-gen': {
        id: 'service-page-gen',
        name: 'Service Page Generator',
        description: 'Auto-creates multiple service-specific pages.',
        icon: 'Layers',
        category: 'Website Builder',
        promptTemplate: `Generate service pages...`,
        inputs: [{ id: 'services', label: 'List Services', type: 'textarea', required: true }],
        outputFormat: 'text'
    },
    'location-page-gen': {
        id: 'location-page-gen',
        name: 'Location Page Generator',
        description: 'City/area-specific location pages with NAP.',
        icon: 'MapPin',
        category: 'Website Builder',
        promptTemplate: `Generate location pages...`,
        inputs: [{ id: 'cities', label: 'Target Cities', type: 'textarea', required: true }],
        outputFormat: 'text'
    },
    'near-me-page-gen': {
        id: 'near-me-page-gen',
        name: 'Near-Me Page Generator',
        description: 'Near-me intent search targeted pages.',
        icon: 'Search',
        category: 'Website Builder',
        promptTemplate: `Build near-me pages...`,
        inputs: [{ id: 'radius', label: 'Radius (miles)', type: 'number', required: true }],
        outputFormat: 'text'
    },
    'elementor-section-builder': {
        id: 'elementor-section-builder',
        name: 'Elementor Section Auto-Builder',
        description: 'AI generates Elementor widgets automatically.',
        icon: 'Code',
        category: 'Website Builder',
        promptTemplate: `Build Elementor section...`,
        inputs: [{ id: 'section_type', label: 'Section Type', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'static-site-gen': {
        id: 'static-site-gen',
        name: 'Static Website Generator HTML',
        description: 'Generates 20+ page static niche site in minutes.',
        icon: 'Globe',
        category: 'Website Builder',
        promptTemplate: `Generate static HTML site...`,
        inputs: [{ id: 'niche', label: 'Niche', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'auto-hosting': {
        id: 'auto-hosting',
        name: 'Netlify / Vercel Auto Hosting',
        description: 'One-click deploy to free cloud hosting.',
        icon: 'Cloud',
        category: 'Website Builder',
        promptTemplate: `Deploy to hosting...`,
        inputs: [{ id: 'provider', label: 'Provider', type: 'select', options: [{ label: 'Vercel', value: 'vercel' }, { label: 'Netlify', value: 'netlify' }], required: true }],
        outputFormat: 'text'
    },
    'hosting-presets': {
        id: 'hosting-presets',
        name: 'Ultra-Fast Hosting Presets',
        description: 'Pre-configured cloud hosting settings.',
        icon: 'Server',
        category: 'Website Builder',
        promptTemplate: `Apply hosting presets...`,
        inputs: [{ id: 'platform', label: 'Platform', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'wp-migration': {
        id: 'wp-migration',
        name: 'Static → WordPress Migration Tool',
        description: 'Converts static site to WP when it ranks.',
        icon: 'Rocket',
        category: 'Website Builder',
        promptTemplate: `Migrate to WP...`,
        inputs: [{ id: 'static_url', label: 'Static URL', type: 'text', required: true }],
        outputFormat: 'text'
    }
}

export const getToolById = (id: string) => toolRegistry[id]
