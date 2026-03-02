SEO AI PLATFORM — PROJECT RULES

Read this file before writing ANY code.
This applies to ALL AI tools: Antigravity, Codex, Cursor, Copilot, Claude, etc.


1. PROJECT OVERVIEW
Name: SEO AI Platform
Purpose: Complete Local SEO SaaS platform with 136 tools
Target Users: Local SEO Newbies, Client SEO Pros, Rank & Rent builders, Agencies, Automation specialists
Status: Active Development — Phase 1 (Building UI + Shell)
Live URL: https://seo-ai-platform.vercel.app

2. TECH STACK
Frontend:     Next.js 14 (App Router)
Language:     TypeScript
Styling:      Tailwind CSS ONLY (no CSS modules, no styled-components)
Database:     Supabase (PostgreSQL)
Auth:         Supabase Auth
Hosting:      Vercel (auto-deploy from GitHub main branch)
Version Control: GitHub + GitHub Desktop
AI APIs:      Gemini (free), DataForSEO (Phase 2), SerpApi (Phase 2)
Package Manager: npm

3. FOLDER STRUCTURE RULES
seo-ai-platform/
├── src/
│   ├── app/                    ← Next.js App Router pages
│   │   ├── page.tsx            ← Landing page (PUBLIC — no sidebar)
│   │   ├── layout.tsx          ← Root layout
│   │   ├── globals.css         ← Global styles + custom animations
│   │   ├── onboarding/         ← User type selector (PUBLIC — no sidebar)
│   │   ├── login/              ← Login page (PUBLIC — no sidebar)
│   │   ├── dashboard/          ← Main user dashboard
│   │   ├── research/           ← Phase 1: Research tools
│   │   ├── build/              ← Phase 2: Build tools
│   │   ├── deploy/             ← Phase 3: Deploy tools
│   │   ├── optimize/           ← Phase 4: Optimize tools
│   │   ├── authority/          ← Phase 5: Local Authority tools
│   │   ├── convert/            ← Phase 6: Convert tools
│   │   ├── track/              ← Phase 7: Track tools
│   │   ├── reports/            ← Phase 8: Reports tools
│   │   ├── automation/         ← Automation tools
│   │   ├── system/             ← User settings & profile
│   │   └── admin/              ← Admin panel (PROTECTED — admin only)
│   │       ├── layout.tsx      ← Admin layout (auth check here)
│   │       ├── page.tsx        ← Admin overview
│   │       ├── users/          ← User management
│   │       ├── payments/       ← Revenue & subscriptions
│   │       ├── api-health/     ← API status & keys
│   │       ├── tools/          ← Tool management
│   │       ├── analytics/      ← Platform analytics
│   │       └── settings/       ← Platform settings
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx  ← User layout wrapper (sidebar + topbar)
│   │   │   └── TopBar.tsx      ← User topbar
│   │   └── sidebar/
│   │       └── Sidebar.tsx     ← User sidebar (8 phases)
│   └── lib/
│       ├── supabase.ts         ← Supabase client
│       └── auth.ts             ← Auth helper functions
├── supabase/
│   └── schema.sql              ← Database schema
├── public/                     ← Static assets
├── .env.local                  ← Environment variables (NEVER commit)
├── PROJECT_RULES.md            ← THIS FILE
└── package.json
STRICT RULES:

❌ NEVER create files outside this structure
❌ NEVER create duplicate layout files (e.g. dashboard/layout.tsx)
❌ NEVER create extra components unless asked
✅ ONE sidebar only: /src/components/sidebar/Sidebar.tsx
✅ ONE main layout only: /src/components/layout/MainLayout.tsx
✅ Admin has its OWN layout: /src/app/admin/layout.tsx


4. ROUTES & LAYOUT RULES
PUBLIC routes (NO sidebar, NO topbar):
  /                → Landing page
  /onboarding      → User type selector
  /login           → Login page

USER routes (WITH sidebar + topbar):
  /dashboard
  /research
  /build
  /deploy
  /optimize
  /authority
  /convert
  /track
  /reports
  /automation
  /system

ADMIN routes (WITH admin layout — red/dark theme):
  /admin
  /admin/users
  /admin/payments
  /admin/api-health
  /admin/tools
  /admin/analytics
  /admin/settings
MainLayout.tsx must check:
typescriptconst noLayoutRoutes = ['/', '/onboarding', '/login']
// Admin routes have their own layout — exclude from MainLayout
if (noLayoutRoutes.includes(pathname) || pathname.startsWith('/admin')) {
  return <>{children}</>
}

5. COLOR SCHEME
User Dashboard (Purple Theme):
Background:     #0F0C29
Sidebar bg:     #0F0C29
Cards bg:       #1A1740
Border:         #2D2B55
Primary accent: purple-600 (#7C3AED)
Hover:          purple-700
Active:         bg-purple-700
Text primary:   white
Text secondary: gray-400
Admin Dashboard (Same purple + red accents):
Same as user dashboard BUT:
- "ADMIN PANEL" badge: red
- "HIGH SECURITY" badge: red
- Sign Out button: red
- Admin indicator: red
Everything else: purple theme
Landing Page:
Background:   #0F0C29 / #0A0818
Cards:        #1A1740
Gradient:     purple-400 → blue-400

6. CODING STYLE RULES
typescript// ✅ ALWAYS use 'use client' for interactive components
'use client'

// ✅ TypeScript always — no plain .js files
// ✅ Tailwind CSS only — no inline style objects unless necessary
// ✅ Arrow functions for components
// ✅ Named exports for utilities, default exports for pages

// ✅ Loading states on ALL async operations
const [loading, setLoading] = useState(false)

// ✅ Error handling on ALL Supabase calls
try {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
} catch (err) {
  console.error('Error:', err)
}

// ❌ NEVER hardcode user data
// ❌ NEVER skip loading states
// ❌ NEVER use localStorage for sensitive data
// ❌ NEVER commit .env.local

7. SUPABASE RULES
Database Tables:
sqlprofiles (
  id UUID PRIMARY KEY,      -- matches auth.users.id
  email TEXT,
  role TEXT,                -- 'admin' | 'user'
  plan TEXT,                -- 'free' | 'starter' | 'pro' | 'agency' | 'enterprise'
  user_type TEXT,           -- '5 user types'
  api_key_dataforseo TEXT,  -- ENCRYPTED
  api_key_gemini TEXT,      -- ENCRYPTED
  usage_niche_finder INT,
  usage_keywords INT,
  usage_serp INT,
  usage_content INT,
  usage_reset_date TIMESTAMP,
  is_active BOOLEAN,
  created_at TIMESTAMP
)
RLS (Row Level Security):

✅ ALWAYS enabled on all tables
✅ Users can only read/write their OWN row
✅ Admin can read/write ALL rows

Supabase Client:
typescript// ALWAYS import from @/lib/supabase
import { supabase } from '@/lib/supabase'
// NEVER create new client inline

8. API LIMITS (Per Package)
Feature          | Free | Starter | Pro  | Agency | Enterprise | Own Key
Niche Finder     | 5/mo | 50/mo   | 200  | 500    | 2,000      | ∞
Keywords         | 10   | 100     | 500  | 2,000  | 10,000     | ∞
SERP Lookups     | 5    | 50      | 300  | 1,000  | 5,000      | ∞
Content Pages    | 5    | 50      | 300  | 1,000  | 5,000      | ∞
Websites         | 1    | 3       | 10   | 50     | Unlimited  | ∞
Rule: If user has own API key → skip all limit checks → unlimited.

9. TOOL STATUS SYSTEM
Each tool has one of these statuses:
✅ Active      → Fully working
🛠️ In Progress → Being built
⏳ Coming Soon → Planned, not built
🔒 Locked      → Requires paid plan
❌ Disabled    → Admin disabled it

10. PHASE SYSTEM (136 Tools)
Phase 1 — Research    (17 tools)  → /research
Phase 2 — Build       (26 tools)  → /build
Phase 3 — Deploy      (8 tools)   → /deploy
Phase 4 — Optimize    (19 tools)  → /optimize
Phase 5 — Authority   (34 tools)  → /authority
Phase 6 — Convert     (5 tools)   → /convert
Phase 7 — Track       (9 tools)   → /track
Phase 8 — Reports     (11 tools)  → /reports
Automation            (6 tools)   → /automation
System                (8 tools)   → /system
Total: 143 tools across all phases

11. API INTEGRATION PLAN
Phase 1 (NOW):
  → Mock/demo data only
  → No real API calls
  → Show "Demo Mode" badge

Phase 2 (When users arrive):
  → User adds own DataForSEO key
  → Stored in profiles table (encrypted)
  → Platform uses user's key
  → Unlimited for that user

Phase 3 (After revenue):
  → Platform's own DataForSEO key
  → Included in Pro/Agency subscription
  → Limited per package (see table above)

DataForSEO APIs to integrate:
  - SERP API           → Niche Finder, SERP Tracker
  - Keywords API       → Keyword Generator
  - Backlinks API      → Niche Finder, Backlink Checker
  - On-Page API        → Technical Audit
  - Local Pack API     → Geo-Grid Tracker

12. ENVIRONMENT VARIABLES
bash# .env.local (NEVER commit this file)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
ADMIN_EMAIL=your-admin@email.com

# Add when ready:
# DATAFORSEO_LOGIN=your_login
# DATAFORSEO_PASSWORD=your_password
# STRIPE_SECRET_KEY=sk_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx

13. DEPLOYMENT RULES
Branch: main → auto-deploys to Vercel
NEVER push broken code to main
Test locally first: npm run dev
Build check: npm run build (must pass)
Vercel environment vars must match .env.local

14. WHAT NOT TO DO
❌ Don't create duplicate sidebar components
❌ Don't add layout.tsx inside dashboard/ or other user pages
❌ Don't use red color in user dashboard (red = admin only)
❌ Don't create separate CSS files (use Tailwind)
❌ Don't use any UI library (no Shadcn, no MUI, no Chakra)
❌ Don't add animations that hurt performance
❌ Don't call APIs without checking rate limits first
❌ Don't store API keys in localStorage
❌ Don't skip TypeScript types
❌ Don't create files not mentioned in folder structure
❌ Don't make changes to working features without being asked

15. CURRENT BUILD STATUS
✅ DONE:
  - Landing page (public)
  - Onboarding (5 user types)
  - Login page
  - MainLayout (sidebar + topbar)
  - Dashboard page
  - Research page (Niche Finder UI)
  - Admin layout + overview
  - Supabase auth (email/password)
  - Admin: Users page (in progress)

⏳ IN PROGRESS:
  - Admin: Users full management
  - Research: Location selector with APIs
  - Sidebar: Research accordion sub-items

🔴 TODO (in order):
  1. Admin: Users page complete
  2. Admin: API Health page
  3. Admin: Settings page
  4. Research: Real location APIs
  5. Research: Opportunity modal
  6. Build phase tools
  7. Supabase: usage tracking
  8. Stripe: payments integration

16. ADMIN ACCESS
Admin user: Set role = 'admin' in Supabase profiles table
Admin URL:  /admin
Admin features:
  - View all users
  - Change user plans
  - Ban/unban users
  - View API health
  - Manage tools (enable/disable)
  - Platform settings
  - "View as User" toggle
