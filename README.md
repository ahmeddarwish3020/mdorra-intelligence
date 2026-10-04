# MDORRA // INTELLIGENCE

**Marketing Analytics & Intelligence Platform**

**Tagline:** DATA → INSIGHT → ACTION

## Overview

MDORRA Intelligence is a standalone marketing intelligence platform designed to transform marketing data into actionable insights. Built as a sophisticated command center for marketing teams, it provides comprehensive analytics, anomaly detection, experimentation framework, and institutional memory.

## Architecture

```
mdorra-intelligence/
├── app/                    # Next.js App Router pages
│   ├── overview/           # Executive command center
│   ├── channels/           # Channel intelligence
│   ├── content/            # Content analytics
│   ├── campaigns/          # Campaign performance
│   ├── website/            # Website analytics
│   ├── experiments/        # Experiment center
│   ├── data-quality/       # Data quality monitoring
│   ├── integrations/       # Integration control center
│   ├── settings/           # Application settings
│   ├── login/              # Authentication
│   └── api/health/         # Health check endpoint
├── components/
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components (Navigation, Header, AppLayout)
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── supabase.ts         # Supabase client
│   └── demo-data.ts        # Demo data generators
├── services/
│   └── data.ts             # Data fetching services
├── types/
│   ├── index.ts            # TypeScript types
│   └── database.ts         # Supabase database types
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
├── supabase/               # Supabase migrations and config
└── scripts/                # Build and utility scripts
```

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Forms:** Native HTML with custom components
- **Date Handling:** date-fns
- **Package Manager:** npm

## Design System

### Colors
- **Background:** `#0a0a09`
- **Background Secondary:** `#121110`
- **Surface:** `#1a1917`
- **Surface Elevated:** `#1f1e1c`
- **Border:** `#2a2825`
- **Border Strong:** `#3a3632`
- **Text Primary:** `#f5f3f0`
- **Text Muted:** `#b8b3ad`
- **Text Subtle:** `#8a8681`
- **Gold:** `#c8a96a`
- **Gold Deep:** `#b8955a`

### Typography
- **Editorial:** Newsreader (headings)
- **UI:** Inter (body text)
- **Mono:** JetBrains Mono (metrics, code)
- **Arabic:** Noto Sans Arabic (RTL ready)

## Features Implemented

### Core Pages
- ✅ **Overview** - Executive command center with KPIs, trends, intelligence sections
- ✅ **Channels** - Channel health, performance, and sync status
- ✅ **Content** - Content performance analysis with classifications
- ✅ **Campaigns** - Campaign tracking with attribution signals
- ✅ **Website** - Traffic, engagement, and conversion analytics
- ✅ **Experiments** - Experiment framework with hypothesis tracking
- ✅ **Data Quality** - Source health, freshness, completeness checks
- ✅ **Integrations** - Connection management for all providers
- ✅ **Settings** - Profile, security, notifications, API keys
- ✅ **Login** - Authentication page with demo credentials

### Intelligence Features
- ✅ **What Changed / Why It Matters / What to Watch** - Structured intelligence
- ✅ **Evidence Levels** - FACT, CORRELATION, HYPOTHESIS, RECOMMENDATION
- ✅ **Anomaly Detection** - Threshold-based with severity levels
- ✅ **Forecasting** - Linear regression with confidence intervals
- ✅ **Recommendations** - Actionable with evidence and expected impact
- ✅ **Marketing Memory** - Institutional knowledge base
- ✅ **Attribution Ready** - Journey tracking architecture

### Data States
- ✅ Loading, Empty, Demo, Connected, Partial, Error, Disabled, Unauthorized

### Technical
- ✅ Server Components by default
- ✅ Client Components only where needed
- ✅ Responsive design (1440px, 1280px, 1024px, 768px, 390px)
- ✅ RTL-ready architecture (logical properties)
- ✅ Accessibility (semantic HTML, ARIA, keyboard nav)
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier configured

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Required:
```env
NEXT_PUBLIC_SUPABASE_URL=https://jkfwayfzoxaztzlioxeq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Optional:
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Format code
npm run format

# Full check (lint + typecheck + build)
npm run check
```

## Supabase Configuration

**Project:** mdorra-intelligence
**Ref:** jkfwayfzoxaztzlioxeq

### Existing Tables
- `data_sources` - Integration sources
- `metric_definitions` - Metric catalog
- `metric_observations` - Raw metric values
- `metric_daily_snapshots` - Aggregated daily metrics
- `content_items` - Content library
- `insights` - Generated insights
- `recommendations` - Actionable recommendations
- `experiments` - Experiment definitions
- `experiment_results` - Experiment data points
- `anomalies` - Detected anomalies
- `alerts` - Active alerts
- `forecasts` - Forecast models
- `forecast_points` - Forecast data points
- `sync_runs` - Sync history
- `data_quality_checks` - Quality scores
- `integration_connections` - OAuth/API connections
- `attribution_touchpoints` - Touchpoint data
- `attribution_journeys` - User journeys
- `marketing_memory` - Institutional knowledge
- `team_members` - Team management
- `ingestion_batches` - Ingestion pipeline
- `raw_events` / `normalized_events` - Event pipeline
- `forecast_runs` - Forecast execution

## Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
# Build verification
npm run build
npm run start
```

### Manual Deployment

```bash
npm run build
npm run start
```

## Security

- ✅ No secrets in frontend code
- ✅ Service role key only on server
- ✅ Supabase RLS policies (to be configured)
- ✅ Server-side authorization (roles: owner, admin, analyst, content, media_buyer, viewer)
- ✅ OAuth tokens never in localStorage
- ✅ CSP headers configured
- ✅ Security headers in middleware

## Demo Mode

The application runs in **demo mode** by default when Supabase is not configured:
- All pages show realistic demo data
- Demo data clearly labeled with "DEMO DATA" badges
- Full UI functionality without backend connection
- Graceful degradation for missing integrations

## Integration Roadmap

### Phase 1 (Current)
- [x] MDORRA Website (connected)
- [x] Demo data for all sources

### Phase 2
- [ ] Google Analytics 4 (OAuth)
- [ ] Google Search Console (OAuth)
- [ ] Meta Ads (OAuth)

### Phase 3
- [ ] Instagram Business (OAuth)
- [ ] TikTok for Business (OAuth)
- [ ] YouTube Analytics (OAuth)

### Phase 4
- [ ] Scheduled sync automation
- [ ] Real-time webhook ingestion
- [ ] Data quality alerts
- [ ] AI-powered insights

## Project Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Format with Prettier |
| `npm run check` | Full validation pipeline |

## License

Proprietary - MDORRA Intelligence Platform