# FindPAT Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI
```bash
cd /home/diego/clawd/projects/findpat/app
npx vercel login
npx vercel --prod
```

### Option 2: GitHub + Vercel
1. Push to GitHub
2. Connect repo at vercel.com/new
3. Deploy automatically

## Environment Variables (Optional for MVP)
None required for static demo. For production:
- `DATABASE_URL` - Supabase connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side auth

## Project Structure
```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── search/page.tsx    # Search with filters
│   │   ├── join/page.tsx      # Practitioner signup
│   │   ├── practitioner/[slug]/page.tsx  # Profile pages
│   │   └── api/waitlist/route.ts  # Email capture API
│   ├── components/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── practitioner-card.tsx
│   │   ├── verification-badge.tsx
│   │   └── waitlist-form.tsx
│   ├── data/
│   │   └── practitioners.ts   # Sample data
│   └── types/
│       └── index.ts           # TypeScript types
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

## Features Implemented
- ✅ Landing page with two-path CTA (Client / Practitioner)
- ✅ Search page with filters (modality, specialty, role, tier)
- ✅ Practitioner cards with verification badges
- ✅ Profile pages with credentials display
- ✅ Join/pricing page for practitioners
- ✅ Waitlist email capture API
- ✅ Mobile-responsive design
- ✅ FindPAT design system (neumorphic, cyan/green/gold)
