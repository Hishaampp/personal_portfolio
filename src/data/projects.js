// Every project on the site and in the résumé comes from this list.
//
// status:     'Live' | 'In development' | 'Planning'  (never call something live before it is)
// categories: any of 'Web' | 'Mobile' | 'AI' | 'Systems' | 'Client'
// image:      put files in /public/assets/ and reference them as '/assets/filename.jpg'
// caseStudySlug: optional, must match a `slug` in caseStudies.js

export const projects = [
  {
    id: 'sandbox',
    title: 'Sandbox',
    tagline: 'Campus-only teammate finder, skills proven by real GitHub work',
    status: 'In development',
    year: 2026,
    featured: true,
    categories: ['Web'],
    description:
      'A students-only platform where verified students post project ideas and find teammates whose skills come from their own GitHub repositories, not typed claims. Launching at LPU and built so more colleges can join.',
    highlights: [
      'Google sign-in with GitHub linked as a second identity; skills are read server-side from each student’s own repositories',
      'Row Level Security on every Postgres table; reviews, requests and matching run through Postgres functions, not client updates',
      'ID-card verification queue for coordinators, with the photo deleted after each decision',
      'Ranked matching, invites, join requests and team formation',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hishaampp/sandbox' }],
  },
  {
    id: 'vault',
    title: 'Vault',
    tagline: 'Fault-tolerant distributed object storage with a live Mission Control',
    status: 'Live',
    year: 2026,
    featured: true,
    categories: ['Systems', 'Web'],
    description:
      'Stores, replicates, verifies and repairs objects across independently failing storage nodes. Runs as a real multi-process cluster on Node.js, with a dashboard for injecting faults and watching the cluster heal itself.',
    highlights: [
      '9 storage-node processes across 3 racks plus 3 metadata replicas that commit on 2-of-3 acknowledgement',
      'Atomic writes with SHA-256 sidecars, an integrity scrubber, a repair queue and a rebalancer',
      'React Mission Control streams cluster snapshots over WebSocket 4 times a second',
      'Helmet CSP, rate limiting and constant-time token checks; engine, UI and accessibility tests in Vitest',
    ],
    stack: ['TypeScript', 'Node.js', 'Express', 'WebSocket', 'React', 'Vitest'],
    links: [
      { label: 'Live demo', url: 'https://vault-ashen-iota.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Hishaampp/vault' },
    ],
  },
  {
    id: 'ample',
    title: 'Ample',
    tagline: 'Automatic expense tracker for India that never leaves your phone',
    status: 'In development',
    year: 2026,
    featured: true,
    categories: ['Mobile'],
    description:
      'Records UPI, card and bank payments without typing and groups trip and wedding spending into Rooms. All data stays on the device: no server, no login.',
    highlights: [
      'Pure-Dart parser package reads bank, card and UPI messages, tested in isolation',
      'Rooms group shared spending for trips and weddings',
      'On-device SQLite with Drift; Riverpod state and go_router navigation',
      'CI blocks any Play build that asks for SMS or internet permissions',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite', 'GitHub Actions'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hishaampp/expense-tracker' }],
  },
  {
    id: 'waste-pickup',
    title: 'Smart Waste Pickup',
    tagline: 'On-demand waste pickup for Punjab, piloting in Ludhiana',
    status: 'Planning',
    year: 2026,
    categories: ['Mobile'],
    description:
      'Customers book a pickup slot, verified local collectors weigh the waste and upload photo proof, and an ops team assigns jobs and sets prices. Currently in architecture and planning; no public code yet.',
    highlights: [
      'One Flutter codebase for customers, partners (Android) and admins (web), routed by server-assigned role',
      'Bookings created through a server function that locks the slot, checks capacity and computes the price',
      'Punjabi, Hindi and English, designed for low-end Android phones on slow 4G',
    ],
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Riverpod'],
    links: [],
  },
  {
    id: 'liwi-ai',
    title: 'Liwi AI',
    tagline: 'AI English-learning app for Malayalam speakers',
    status: 'Live',
    year: 2025,
    featured: true,
    categories: ['Mobile', 'AI'],
    image: '/assets/Liwi app banner.jpg',
    description:
      'Founded and built Liwi: real-time speech evaluation, GPT-personalised lessons and gamified daily practice, published on Google Play and the App Store.',
    highlights: [
      'Flutter app with a FastAPI + MongoDB backend on AWS',
      'Speech evaluation with Google Cloud Speech-to-Text; lessons generated with OpenAI GPT',
      'Razorpay subscriptions with signed, idempotent webhooks',
      '10K+ downloads with a 4.5★ average rating',
    ],
    stack: ['Flutter', 'Dart', 'Python', 'FastAPI', 'MongoDB', 'OpenAI API', 'Google Cloud Speech', 'AWS', 'Razorpay', 'Play & App Store release'],
    links: [],
    caseStudySlug: 'liwi-ai',
  },
  {
    id: 'kmcc-admin',
    title: 'KMCC Admin Dashboard',
    tagline: 'Role-based financial admin dashboard',
    status: 'Live',
    year: 2025,
    categories: ['Web', 'Client'],
    image: '/assets/KMCC.jpeg',
    description:
      'Financial management system: real-time transaction tracking, automated reporting, expense categorisation and role-based access.',
    highlights: [
      'Role-based access enforced in security rules, not only in the UI',
      'Real-time listeners replaced polling for live transaction data',
      'Scheduled reports automated with Cloud Functions',
    ],
    stack: ['React', 'TypeScript', 'Firebase', 'Vercel'],
    links: [
      { label: 'Live site', url: 'https://kmcc-admin.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Hishaampp/kmcc-admin' },
    ],
  },
  {
    id: 'smart-compatibility',
    title: 'Smart Compatibility',
    tagline: 'Bilingual B2B trading website for a Saudi FMCG company',
    status: 'Live',
    year: 2026,
    categories: ['Web', 'Client'],
    image: '/assets/sce.jpeg',
    description:
      'English/Arabic (RTL) website with a public product catalogue, an admin dashboard for products and enquiries, and business accounts that sign up with CR and VAT numbers to send enquiries.',
    highlights: [
      'Full RTL support for Arabic',
      'Supabase auth and database; transactional email through Resend over custom SMTP',
      'Deployed on Vercel with a custom domain; ongoing client iterations',
    ],
    stack: ['React', 'JavaScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    links: [{ label: 'Live site', url: 'https://www.smartcompatibility.com/' }],
  },
  {
    id: 'booking-agent',
    title: 'AI Appointment Booking Agent',
    tagline: 'Conversational scheduling for salons and spas',
    status: 'Live',
    year: 2025,
    categories: ['AI'],
    image: '/assets/Booking.png',
    description:
      'Understands booking requests in natural language, checks availability and books instantly over WebSocket.',
    highlights: [
      'OpenAI function calling turns free-form conversation into structured bookings',
      'Token-budget management for long multi-turn conversations',
      'Retries and fallbacks for rate limits',
    ],
    stack: ['Python', 'FastAPI', 'OpenAI API', 'WebSocket', 'MongoDB'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hishaampp/AI-Agent' }],
  },
  {
    id: 'sokoon',
    title: 'Sokoon',
    tagline: 'Arabic sign-language learning app (Qatar)',
    status: 'Live',
    year: 2025,
    categories: ['Mobile', 'Client'],
    description:
      'Contributed to the code structure and architecture of an Arabic sign-language learning app for a client in Qatar.',
    highlights: ['Reorganised the Flutter project structure for maintainability and scale'],
    stack: ['Flutter', 'Dart'],
    links: [],
  },
  {
    id: 'focuspilot',
    title: 'FocusPilot',
    tagline: 'AI task manager that prioritises for you',
    status: 'Live',
    year: 2025,
    categories: ['Mobile', 'AI'],
    image: '/assets/focusPilot logo.png',
    description: 'Flutter task manager that uses OpenAI to auto-categorise and prioritise tasks.',
    highlights: [
      'Local-first storage so the app works offline and feels instant',
      'Reworked onboarding after testing showed it drove retention',
    ],
    stack: ['Flutter', 'Dart', 'Firebase', 'OpenAI API'],
    links: [{ label: 'GitHub', url: 'https://github.com/Hishaampp/FocusPilot' }],
  },
  {
    id: 'nearby',
    title: 'NearBy',
    tagline: 'Marketplace for local service providers',
    status: 'Live',
    year: 2024,
    categories: ['Mobile'],
    image: '/assets/Nearby.jpeg',
    description:
      'Location-based marketplace with a full booking flow, live location tracking and integrated payments.',
    highlights: [
      'Google Maps live tracking, tuned for battery use',
      'Checkout hardened against 50+ payment edge cases',
    ],
    stack: ['Flutter', 'Dart', 'MongoDB', 'WebSocket'],
    links: [],
  },
]

export const CATEGORIES = ['All', 'Web', 'Mobile', 'AI', 'Systems', 'Client']
