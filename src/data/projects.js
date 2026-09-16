// Add a new project by pushing another object into this array.
// image: put files in /public/assets/ and reference them as '/assets/filename.jpg'
// caseStudySlug: optional — must match a `slug` in src/data/caseStudies.js to link a deep-dive

export const projects = [
  {
    id: 'liwi-ai',
    title: 'Liwi AI',
    featured: true,
    image: '/assets/Liwi app banner.jpg',
    description:
      'AI-powered English learning app built for Malayalam speakers. Real-time speech evaluation via Google Cloud Speech, personalised lessons from GPT, and gamified daily practice. Live on Play Store and App Store.',
    tags: ['Flutter', 'Python', 'FastAPI', 'OpenAI GPT', 'Google Cloud Speech', 'AWS', 'MongoDB', 'Razorpay'],
    metrics: [
      { label: '10K+ downloads' },
      { label: 'Active daily users' },
      { label: '4.5★ rating' },
      { label: 'iOS & Android' },
    ],
    links: [
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=YOUR_APP_ID' },
      { label: 'App Store', url: 'https://apps.apple.com/app/YOUR_APP_ID' },
    ],
    caseStudySlug: 'liwi-ai',
  },
  {
    id: 'booking-agent',
    title: 'AI Appointment Booking Agent',
    image: '/assets/Booking.png',
    description:
      'Conversational AI agent for automated appointment scheduling, built for salons and spas. Understands requests in natural language, checks availability, and books instantly — cutting booking time by 80%.',
    tags: ['Python', 'OpenAI API', 'FastAPI', 'NLP', 'WebSocket', 'MongoDB'],
    metrics: [{ label: 'AI-powered' }, { label: '24/7 availability' }, { label: '80% time saved' }],
    learnings: [
      'Function calling turns free-form conversation into structured data reliably',
      'Multi-turn context needed active token-budget management, not just a growing history',
      'Built retry and fallback handling for rate limits and edge cases',
      'WebSockets gave instant booking confirmations instead of polling',
    ],
    links: [{ label: 'View on GitHub', url: 'https://github.com/Hishaampp/AI-Agent' }],
  },
  {
    id: 'financial-dashboard',
    title: 'Financial Admin Dashboard',
    image: '/assets/KMCC.jpeg',
    description:
      'Financial management system for enterprise operations: real-time transaction tracking, automated reporting, expense categorisation, and role-based access, syncing thousands of transactions a day.',
    tags: ['React', 'Firebase', 'Firestore', 'Firebase Auth', 'Material UI', 'Recharts', 'Cloud Functions'],
    metrics: [{ label: 'Real-time sync' }, { label: '1,000+ daily transactions' }, { label: 'Role-based access' }],
    learnings: [
      "Firestore's real-time listeners removed polling entirely — a big performance win",
      'Security rules enforced row-level access by role, not just UI-level checks',
      'Cloud Functions automated scheduled reports, cutting manual work by 90%',
      'Composite indexes were the difference between fast and unusable financial queries',
    ],
    links: [{ label: 'View on GitHub', url: 'https://github.com/Hishaampp/financial-dashboard' }],
  },
  {
    id: 'focuspilot',
    title: 'FocusPilot',
    image: '/assets/focusPilot logo.png',
    description:
      'AI-powered task manager that helps people prioritise and finish their goals through intelligent scheduling and productivity insights.',
    tags: ['Flutter', 'Firebase', 'AI Integration', 'Local Storage'],
    learnings: [
      'Onboarding quality is the retention lever for habit-forming apps — a better first run lifted retention 40%',
      'A simplified MVP beat a feature-bloated v1',
      'Local-first architecture felt faster than a cloud-dependent sync ever could',
    ],
    links: [{ label: 'View on GitHub', url: 'https://github.com/Hishaampp/focuspilot' }],
  },
  {
    id: 'nearby',
    title: 'NearBy',
    image: '/assets/Nearby.jpeg',
    description:
      'Location-based marketplace connecting users with local service providers — full booking flow, live location tracking, and integrated payments.',
    tags: ['Flutter', 'MongoDB', 'Google Maps API', 'WebSocket', 'Payment Gateway'],
    learnings: [
      'Marketplaces need supply-side focus first — providers before consumers',
      'Payment integration debugging across 50+ edge cases made the checkout genuinely reliable',
      'Real-time location features demand careful battery-usage tradeoffs',
    ],
    links: [{ label: 'View on GitHub', url: 'https://github.com/Hishaampp/nearby' }],
  },
  {
  id: 'smart-compatibility',
  title: 'SmartCompatibility',
  image: '/assets/sce.jpeg',
  description:
    'Built a full bilingual (English/Arabic, RTL-supported) website for a Saudi Arabia-based FMCG import/export company. The site includes a public product catalogue, category-based browsing, an admin dashboard for managing products and enquiries, and a business-account system where B2B customers sign up with company details (CR number, VAT) to submit product enquiries. Integrated Supabase for auth/database, custom SMTP email delivery via Resend, and deployed on Vercel with a custom domain. Ongoing collaboration with the client through iterative feedback and revisions.',
  tags: ['Web Development', 'Client Project'],
  links: [
    { label: 'Live site', url: 'https://www.smartcompatibility.com/' },
    { label: 'View on Upwork', url: 'https://www.upwork.com/freelancers/~01a1377b02d3a6b92e?p=2091054582373744640' },
  ],
},
  {
    id: 'freelance',
    title: 'Client Projects & Freelance',
    image: '/assets/Fiverr-Logo.png',
    description:
      'Custom Flutter apps and Python backends delivered for international clients — from MVPs to production deployments with real users.',
    tags: ['Flutter', 'Python', 'API Development', 'AWS Deployment', 'Client Management'],
    metrics: [{ label: '10+ projects' }, { label: '5.0★ rating' }, { label: 'International clients' }],
    links: [{ label: 'Fiverr profile', url: 'https://www.fiverr.com/hishaaam_/' }],
  },
]