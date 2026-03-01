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
    },
    // --- CATEGORY 2: DESIGN & UX ---
    'ai-design-gen': {
        id: 'ai-design-gen',
        name: 'AI Design Generator',
        description: 'AI generates design tokens: colors, fonts, spacing.',
        icon: 'ImageIcon',
        category: 'Design & UX',
        promptTemplate: `Generate design tokens...`,
        inputs: [{ id: 'brand_feel', label: 'Brand Feel', type: 'text', placeholder: 'e.g. Modern, Minimalist', required: true }],
        outputFormat: 'text'
    },
    'local-seo-theme-selector': {
        id: 'local-seo-theme-selector',
        name: 'Local SEO Theme Selector',
        description: 'Local Basic / Local Premium / Rank & Rent presets.',
        icon: 'Palette',
        category: 'Design & UX',
        promptTemplate: `Select theme preset...`,
        inputs: [{ id: 'preset', label: 'Theme Preset', type: 'select', options: [{ label: 'Local Basic', value: 'basic' }, { label: 'Local Premium', value: 'premium' }, { label: 'Rank & Rent', value: 'rank_rent' }], required: true }],
        outputFormat: 'text'
    },
    'cta-optimizer': {
        id: 'cta-optimizer',
        name: 'CTA Placement Optimizer',
        description: 'AI places CTAs in conversion-optimal positions.',
        icon: 'MousePointer2',
        category: 'Design & UX',
        promptTemplate: `Optimize CTA placement...`,
        inputs: [{ id: 'page_type', label: 'Page Type', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'conversion-layout-engine': {
        id: 'conversion-layout-engine',
        name: 'Conversion-Focused Layout Engine',
        description: 'CRO-optimized layouts for local lead gen.',
        icon: 'LayoutDashboard',
        category: 'Design & UX',
        promptTemplate: `Generate conversion layout...`,
        inputs: [{ id: 'target_goal', label: 'Target Goal', type: 'text', placeholder: 'e.g. Lead Form Submission', required: true }],
        outputFormat: 'text'
    },
    // --- CATEGORY 3: CONTENT TOOLS ---
    'ai-local-content-writer': {
        id: 'ai-local-content-writer',
        name: 'AI Local Content Writer',
        description: 'Writes all page content using Gemini free API.',
        icon: 'PenTool',
        category: 'Content Tools',
        promptTemplate: `Write local content for {{business_name}}...`,
        inputs: [{ id: 'topic', label: 'Topic/Keywords', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'city-content-gen': {
        id: 'city-content-gen',
        name: 'City Content Generator',
        description: 'City-level content variations auto-generated.',
        icon: 'Globe',
        category: 'Content Tools',
        promptTemplate: `Generate content for city: {{city}}...`,
        inputs: [{ id: 'city', label: 'Target City', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'service-city-combiner': {
        id: 'service-city-combiner',
        name: 'Service + City Content Combiner',
        description: 'Combines service and city for unique pages.',
        icon: 'Zap',
        category: 'Content Tools',
        promptTemplate: `Combine service {{service}} with city {{city}}...`,
        inputs: [
            { id: 'service', label: 'Service', type: 'text', required: true },
            { id: 'city', label: 'City', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'faq-schema-gen': {
        id: 'faq-schema-gen',
        name: 'FAQ Schema Generator',
        description: 'Conversational FAQ targeting local queries.',
        icon: 'MessageSquare',
        category: 'Content Tools',
        promptTemplate: `Generate FAQ schema for {{topic}}...`,
        inputs: [{ id: 'topic', label: 'FAQ Topic', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'eeat-booster': {
        id: 'eeat-booster',
        name: 'E-E-A-T Content Booster',
        description: 'Adds expertise, authority, trust signals to content.',
        icon: 'ShieldCheck',
        category: 'Content Tools',
        promptTemplate: `Boost EEAT for this content: {{content}}...`,
        inputs: [{ id: 'content', label: 'Existing Content', type: 'textarea', required: true }],
        outputFormat: 'markdown'
    },
    'content-rewriter': {
        id: 'content-rewriter',
        name: 'AI Content Rewriter',
        description: 'Rewrites content for different cities/areas.',
        icon: 'RefreshCw',
        category: 'Content Tools',
        promptTemplate: `Rewrite content for {{area}}: {{content}}...`,
        inputs: [
            { id: 'content', label: 'Content to Rewrite', type: 'textarea', required: true },
            { id: 'area', label: 'Target Area/City', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 4: ON-PAGE SEO ---
    'title-meta-gen': {
        id: 'title-meta-gen',
        name: 'Title & Meta Generator',
        description: 'SEO-optimized title tags and meta descriptions.',
        icon: 'FileText',
        category: 'On-Page SEO',
        promptTemplate: `Generate Title & Meta for {{topic}}...`,
        inputs: [{ id: 'topic', label: 'Page Topic', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'header-optimizer': {
        id: 'header-optimizer',
        name: 'Header Structure Optimizer',
        description: 'Proper H1-H6 hierarchy enforced automatically.',
        icon: 'Type',
        category: 'On-Page SEO',
        promptTemplate: `Optimize header structure for {{content}}...`,
        inputs: [{ id: 'content', label: 'Page Content', type: 'textarea', required: true }],
        outputFormat: 'markdown'
    },
    'image-alt-gen': {
        id: 'image-alt-gen',
        name: 'Image ALT Text Generator',
        description: 'Local keyword-rich ALT text for all images.',
        icon: 'ImageIcon',
        category: 'On-Page SEO',
        promptTemplate: `Generate Alt text for image...`,
        inputs: [{ id: 'context', label: 'Image Context/Subject', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'keyword-mapping': {
        id: 'keyword-mapping',
        name: 'Internal Keyword Mapping Tool',
        description: 'Maps keywords to correct pages for targeting.',
        icon: 'LinkIcon',
        category: 'On-Page SEO',
        promptTemplate: `Map these keywords: {{keywords}}...`,
        inputs: [{ id: 'keywords', label: 'Keywords List', type: 'textarea', required: true }],
        outputFormat: 'markdown'
    },
    'schema-gen': {
        id: 'schema-gen',
        name: 'Schema Markup Generator',
        description: 'JSON-LD LocalBusiness schema auto-injected.',
        icon: 'Database',
        category: 'On-Page SEO',
        promptTemplate: `Generate JSON-LD Schema for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'text'
    },
    // --- CATEGORY 5: TECHNICAL SEO ---
    'vitals-checker': {
        id: 'vitals-checker',
        name: 'Core Web Vitals Checker',
        description: 'AI-based speed and performance analysis.',
        icon: 'Activity',
        category: 'Technical SEO',
        promptTemplate: `Analyze Core Web Vitals for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'mobile-checker': {
        id: 'mobile-checker',
        name: 'Mobile Checker',
        description: 'Mobile-friendly audit with auto-fix suggestions.',
        icon: 'Smartphone',
        category: 'Technical SEO',
        promptTemplate: `Check mobile responsiveness for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'crawl-audit': {
        id: 'crawl-audit',
        name: 'Indexation & Crawl Audit',
        description: 'Crawl issues, index bloat, and crawl budget check.',
        icon: 'Bug',
        category: 'Technical SEO',
        promptTemplate: `Audit indexation and crawl for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'sitemap-gen': {
        id: 'sitemap-gen',
        name: 'XML Sitemap Generator',
        description: 'Auto-generates SEO-friendly XML sitemaps.',
        icon: 'Network',
        category: 'Technical SEO',
        promptTemplate: `Generate XML sitemap for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'robots-gen': {
        id: 'robots-gen',
        name: 'Robots.txt Generator',
        description: 'Correct robots.txt with local SEO rules.',
        icon: 'Bot',
        category: 'Technical SEO',
        promptTemplate: `Generate robots.txt for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'tech-audit': {
        id: 'tech-audit',
        name: 'Technical SEO Audit Tool',
        description: 'Full technical SEO audit with improvement report.',
        icon: 'ClipboardCheck',
        category: 'Technical SEO',
        promptTemplate: `Perform full technical SEO audit for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'full-site-audit': {
        id: 'full-site-audit',
        name: 'Local SEO Full Website Audit Tool',
        description: 'Complete Local SEO website audit + PDF suggestions report.',
        icon: 'MonitorCheck',
        category: 'Technical SEO',
        promptTemplate: `Complete Local SEO audit for {{url}}...`,
        inputs: [{ id: 'url', label: 'Website URL', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 6: GBP MANAGEMENT (PHASE 2) ---
    'gbp-audit': {
        id: 'gbp-audit',
        name: 'GBP Audit Tool',
        description: 'Full Google Business Profile audit + suggestions.',
        icon: 'FileCheck',
        category: 'GBP Management',
        promptTemplate: `Audit GBP for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'gbp-insights': {
        id: 'gbp-insights',
        name: 'GBP Insights Analyzer',
        description: 'Views, calls, clicks trends from GBP data.',
        icon: 'BarChart3',
        category: 'GBP Management',
        promptTemplate: `Analyze GBP insights for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'gbp-spam-fighter': {
        id: 'gbp-spam-fighter',
        name: 'GBP Spam Fighter/Detector',
        description: 'Detects spam GBP tactics & suspension risks.',
        icon: 'ShieldAlert',
        category: 'GBP Management',
        promptTemplate: `Detect GBP spam for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'gbp-qa-responder': {
        id: 'gbp-qa-responder',
        name: 'GBP Q&A Auto-Responder',
        description: 'AI generates GBP Q&A with approval workflow.',
        icon: 'MessageSquareQuote',
        category: 'GBP Management',
        promptTemplate: `Respond to GBP Q&A for {{question}}...`,
        inputs: [{ id: 'question', label: 'Question', type: 'textarea', required: true }],
        outputFormat: 'text'
    },
    'gbp-post-gen': {
        id: 'gbp-post-gen',
        name: 'GBP Post Generator',
        description: 'AI post templates + scheduling for GBP.',
        icon: 'Send',
        category: 'GBP Management',
        promptTemplate: `Generate GBP post for {{topic}}...`,
        inputs: [{ id: 'topic', label: 'Post Topic', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'gbp-ai-agent': {
        id: 'gbp-ai-agent',
        name: 'GBP AI Agent (Auto Management)',
        description: 'Unified AI bot managing posts/reviews/Q&A.',
        icon: 'Bot',
        category: 'GBP Management',
        promptTemplate: `AI Agent task for {{business_name}}: {{task}}...`,
        inputs: [
            { id: 'task', label: 'Task Description', type: 'textarea', required: true }
        ],
        outputFormat: 'text'
    },
    'gmb-category-finder': {
        id: 'gmb-category-finder',
        name: 'GMB Category Finder',
        description: 'Correct GMB category suggestions.',
        icon: 'Tags',
        category: 'GBP Management',
        promptTemplate: `Find GMB categories for {{business_type}}...`,
        inputs: [{ id: 'business_type', label: 'Business Type', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'competitor-gbp-spy': {
        id: 'competitor-gbp-spy',
        name: 'Competitor GBP Spy',
        description: 'Spy competitor reviews, services, keywords.',
        icon: 'Eye',
        category: 'GBP Management',
        promptTemplate: `Spy on competitor {{competitor_name}}...`,
        inputs: [{ id: 'competitor_name', label: 'Competitor Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'duplicate-gbp-detector': {
        id: 'duplicate-gbp-detector',
        name: 'Duplicate GBP Detector',
        description: 'Finds & helps merge duplicate GBP listings.',
        icon: 'Copy',
        category: 'GBP Management',
        promptTemplate: `Find duplicates for {{business_name}} at {{address}}...`,
        inputs: [
            { id: 'business_name', label: 'Business Name', type: 'text', required: true },
            { id: 'address', label: 'Address', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'gbp-website-builder': {
        id: 'gbp-website-builder',
        name: 'GBP Website Builder',
        description: 'AI-generated SEO-optimized GBP built-in website.',
        icon: 'Globe',
        category: 'GBP Management',
        promptTemplate: `Build GBP website for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'html'
    },
    'gmb-full-audit': {
        id: 'gmb-full-audit',
        name: 'GMB Full Audit Tool',
        description: 'Complete GMB audit with report & improvement plan.',
        icon: 'ClipboardList',
        category: 'GBP Management',
        promptTemplate: `Full GMB Audit for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'review-aggregator': {
        id: 'review-aggregator',
        name: 'Multi-Platform Review Aggregator',
        description: 'Google + Yelp + Facebook reviews in one dashboard.',
        icon: 'MessageSquare',
        category: 'GBP Management',
        promptTemplate: `Aggregate reviews for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 7: REVIEWS & REPUTATION (PHASE 2) ---
    'review-campaign-builder': {
        id: 'review-campaign-builder',
        name: 'Review Request Campaign Builder',
        description: 'Design & schedule multi-channel review request campaigns.',
        icon: 'Mail',
        category: 'Reviews & Reputation',
        promptTemplate: `Build review campaign for {{business_name}} targeting {{channel}}...`,
        inputs: [
            { id: 'business_name', label: 'Business Name', type: 'text', required: true },
            { id: 'channel', label: 'Channel (SMS/Email/WhatsApp)', type: 'select', options: [{ label: 'Email', value: 'email' }, { label: 'SMS', value: 'sms' }, { label: 'WhatsApp', value: 'whatsapp' }], required: true }
        ],
        outputFormat: 'markdown'
    },
    'review-response-gen': {
        id: 'review-response-gen',
        name: 'Review Response Generator',
        description: 'AI-generated personalized responses to customer reviews.',
        icon: 'MessageCircle',
        category: 'Reviews & Reputation',
        promptTemplate: `Respond to this review: {{review_text}}...`,
        inputs: [{ id: 'review_text', label: 'Review Content', type: 'textarea', required: true }],
        outputFormat: 'text'
    },
    'review-sentiment-gap': {
        id: 'review-sentiment-gap',
        name: 'Review Sentiment & Competitor Gap',
        description: 'Analyze sentiment patterns and gaps vs competitors.',
        icon: 'TrendingUp',
        category: 'Reviews & Reputation',
        promptTemplate: `Analyze sentiment gap for {{business_name}} vs {{competitor}}...`,
        inputs: [
            { id: 'business_name', label: 'Business Name', type: 'text', required: true },
            { id: 'competitor', label: 'Competitor Name', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'reputation-score-calc': {
        id: 'reputation-score-calc',
        name: 'Reputation Score Calculator',
        description: 'Calculates proprietary local reputation score.',
        icon: 'Star',
        category: 'Reviews & Reputation',
        promptTemplate: `Calculate reputation score for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'reputation-manager': {
        id: 'reputation-manager',
        name: 'Reputation Builder / Manager',
        description: 'Centralized reputation management and building dashboard.',
        icon: 'Shield',
        category: 'Reviews & Reputation',
        promptTemplate: `Reputation management tasks for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 8: RANK TRACKING (PHASE 2) ---
    'geo-grid-rank-tracker': {
        id: 'geo-grid-rank-tracker',
        name: 'Geo-Grid Rank Tracker',
        description: 'Visual map of rankings across multiple coordinate points.',
        icon: 'Grid3X3',
        category: 'Rank Tracking',
        promptTemplate: `Generate Geo-Grid rank report for {{business_name}} at {{location}}...`,
        inputs: [
            { id: 'business_name', label: 'Business Name', type: 'text', required: true },
            { id: 'location', label: 'Central Point/Location', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'local-serp-tracker': {
        id: 'local-serp-tracker',
        name: 'Local SERP Tracker',
        description: 'Track keyword rankings in specific local search results.',
        icon: 'List',
        category: 'Rank Tracking',
        promptTemplate: `Track local SERP for {{keywords}} in {{city}}...`,
        inputs: [
            { id: 'keywords', label: 'Keywords (comma separated)', type: 'textarea', required: true },
            { id: 'city', label: 'Target City', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'competitor-rank-comparator': {
        id: 'competitor-rank-comparator',
        name: 'Competitor Rank Comparator',
        description: 'Compare your rankings side-by-side with top competitors.',
        icon: 'Users',
        category: 'Rank Tracking',
        promptTemplate: `Compare rankings for {{your_business}} vs {{competitors}}...`,
        inputs: [
            { id: 'your_business', label: 'Your Business', type: 'text', required: true },
            { id: 'competitors', label: 'Competitor Names', type: 'textarea', required: true }
        ],
        outputFormat: 'markdown'
    },
    'visibility-score-calc': {
        id: 'visibility-score-calc',
        name: 'Visibility Score Calculator',
        description: 'Aggregated visibility percentage across all tracked keywords.',
        icon: 'Eye',
        category: 'Rank Tracking',
        promptTemplate: `Calculate visibility score for {{business_name}} across {{keywords}}...`,
        inputs: [
            { id: 'business_name', label: 'Business Name', type: 'text', required: true },
            { id: 'keywords', label: 'Keywords List', type: 'textarea', required: true }
        ],
        outputFormat: 'markdown'
    },
    'service-area-mapper': {
        id: 'service-area-mapper',
        name: 'Service Area Coverage Mapper',
        description: 'Maps your actual ranking coverage vs your defined service area.',
        icon: 'Map',
        category: 'Rank Tracking',
        promptTemplate: `Map service area coverage for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'ai-share-of-voice': {
        id: 'ai-share-of-voice',
        name: 'AI Share of Voice Tracker',
        description: 'Calculates your dominance in local search volume.',
        icon: 'PieChart',
        category: 'Rank Tracking',
        promptTemplate: `Analyze share of voice for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 9: NICHE & KEYWORD RESEARCH (PHASE 2) ---
    'ai-niche-finder': {
        id: 'ai-niche-finder',
        name: 'AI Niche Finder Tool',
        description: 'Analyzes markets to find low-competition, high-profit local niches.',
        icon: 'Telescope',
        category: 'Niche & Keywords',
        promptTemplate: `Find profitable niches in {{city}}...`,
        inputs: [{ id: 'city', label: 'Target City/Area', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'local-keyword-gen': {
        id: 'local-keyword-gen',
        name: 'AI Local Keyword Generator',
        description: 'Generates high-intent local keywords for any niche.',
        icon: 'Key',
        category: 'Niche & Keywords',
        promptTemplate: `Generate local keywords for {{niche}} in {{city}}...`,
        inputs: [
            { id: 'niche', label: 'Niche/Service', type: 'text', required: true },
            { id: 'city', label: 'City', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'service-city-kw-combiner': {
        id: 'service-city-kw-combiner',
        name: 'Service + City Keyword Combiner',
        description: 'Mass combines services and cities for bulk keyword lists.',
        icon: 'Combine',
        category: 'Niche & Keywords',
        promptTemplate: `Combine services: {{services}} with cities: {{cities}}...`,
        inputs: [
            { id: 'services', label: 'Services (one per line)', type: 'textarea', required: true },
            { id: 'cities', label: 'Cities (one per line)', type: 'textarea', required: true }
        ],
        outputFormat: 'text'
    },
    'keyword-difficulty-estimator': {
        id: 'keyword-difficulty-estimator',
        name: 'Keyword Difficulty Estimator',
        description: 'Estimates how hard it is to rank for local keywords.',
        icon: 'BarChart',
        category: 'Niche & Keywords',
        promptTemplate: `Estimate difficulty for keywords: {{keywords}}...`,
        inputs: [{ id: 'keywords', label: 'Keywords', type: 'textarea', required: true }],
        outputFormat: 'markdown'
    },
    // --- CATEGORY 10: CITATIONS & OFF-PAGE (PHASE 2) ---
    'nap-consistency': {
        id: 'nap-consistency',
        name: 'NAP Consistency Checker',
        description: 'Checks Name, Address, Phone consistency across major directories.',
        icon: 'CheckCircle2',
        category: 'Citations & Off-Page',
        promptTemplate: `Check NAP consistency for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'citation-finder': {
        id: 'citation-finder',
        name: 'Citation Finder',
        description: 'Finds niche-specific and local directory citation opportunities.',
        icon: 'Locate',
        category: 'Citations & Off-Page',
        promptTemplate: `Find citations for {{niche}} in {{city}}...`,
        inputs: [
            { id: 'niche', label: 'Niche', type: 'text', required: true },
            { id: 'city', label: 'City', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'citation-tracker': {
        id: 'citation-tracker',
        name: 'Citation Tracker',
        description: 'Track your live citations and their indexation status.',
        icon: 'Activity',
        category: 'Citations & Off-Page',
        promptTemplate: `Track citations for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'auto-citation-builder': {
        id: 'auto-citation-builder',
        name: 'Auto Citation Builder/Submitter',
        description: 'Automated submission tool for local citations.',
        icon: 'Upload',
        category: 'Citations & Off-Page',
        promptTemplate: `Submit citations for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'duplicate-resolver': {
        id: 'duplicate-resolver',
        name: 'Duplicate Listings Resolver',
        description: 'Find and fix duplicate citation listings automatically.',
        icon: 'Copy',
        category: 'Citations & Off-Page',
        promptTemplate: `Resolve duplicates for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'knowledge-graph-opt': {
        id: 'knowledge-graph-opt',
        name: 'Knowledge Graph Optimizer',
        description: 'Optimize your business for Google Knowledge Graph.',
        icon: 'Share2',
        category: 'Citations & Off-Page',
        promptTemplate: `Optimize Knowledge Graph for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'business-info-sync': {
        id: 'business-info-sync',
        name: 'Business Info Sync Tool',
        description: 'Sync NAP updates across all platforms simultaneously.',
        icon: 'RefreshCw',
        category: 'Citations & Off-Page',
        promptTemplate: `Sync business info for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'local-backlink-finder': {
        id: 'local-backlink-finder',
        name: 'Hyper-Local Backlink Finder',
        description: 'Find local sponsorship and backlink opportunities.',
        icon: 'ExternalLink',
        category: 'Citations & Off-Page',
        promptTemplate: `Find local backlinks in {{city}} for {{niche}}...`,
        inputs: [
            { id: 'city', label: 'City', type: 'text', required: true },
            { id: 'niche', label: 'Niche', type: 'text', required: true }
        ],
        outputFormat: 'markdown'
    },
    'citation-auto-builder': {
        id: 'citation-auto-builder',
        name: 'Local Citation Auto Builder',
        description: 'AI-assisted automatic citation generation.',
        icon: 'Zap',
        category: 'Citations & Off-Page',
        promptTemplate: `Build citations for {{business_name}}...`,
        inputs: [{ id: 'business_name', label: 'Business Name', type: 'text', required: true }],
        outputFormat: 'text'
    },
    'ai-link-building': {
        id: 'ai-link-building',
        name: 'Link Building Auto AI-assisted',
        description: 'AI generates outreach templates and finds targets.',
        icon: 'Bot',
        category: 'Citations & Off-Page',
        promptTemplate: `Start link building for {{topic}}...`,
        inputs: [{ id: 'topic', label: 'Topic', type: 'text', required: true }],
        outputFormat: 'markdown'
    },
    'link-manual-tracker': {
        id: 'link-manual-tracker',
        name: 'Link Building Manual Tracker',
        description: 'Manual tracking dashboard for link building outreach.',
        icon: 'ClipboardList',
        category: 'Citations & Off-Page',
        promptTemplate: `Log link building for {{target_url}}...`,
        inputs: [{ id: 'target_url', label: 'Target URL', type: 'text', required: true }],
        outputFormat: 'text'
    }
}

export const getToolById = (id: string) => toolRegistry[id]
