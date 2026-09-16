// Deep-dive case studies. Link one to a project via `caseStudySlug` in projects.js.
export const caseStudies = [
  {
    slug: 'liwi-ai',
    title: 'Liwi AI: building an AI-powered English learning app',
    subtitle: 'From zero to 10K+ downloads in 6 months',
    period: '2024 — Present',
    role: 'Lead Developer',
    duration: '6 months',
    problem: {
      body: 'Malayalam speakers in tier 2–4 cities struggle to build English fluency because they lack conversation practice and personalised feedback. Existing options were either expensive coaching (₹10,000+) or generic apps built for nobody in particular.',
      stats: [
        { value: '50M+', label: 'Malayalam speakers in India' },
        { value: '₹10K+', label: 'Average coaching cost' },
        { value: '80%', label: 'Need conversation practice' },
      ],
    },
    solution: {
      body: 'An AI-powered mobile app that provides:',
      points: [
        { label: 'Real-time speech evaluation', detail: 'Google Cloud Speech-to-Text analyses pronunciation and fluency as the user speaks' },
        { label: 'Personalised learning', detail: "OpenAI GPT generates lessons tailored to the user's proficiency" },
        { label: 'Gamification', detail: 'Streaks, achievements, and daily challenges keep people coming back' },
        { label: 'Affordable pricing', detail: '₹99/month — roughly a tenth of the cost of coaching' },
      ],
    },
    stack: [
      { layer: 'Frontend (mobile)', detail: 'Flutter · Dart · Provider state management · Cached network image' },
      { layer: 'Backend (API)', detail: 'Python · FastAPI · MongoDB · Redis · JWT auth' },
      { layer: 'AI services', detail: 'OpenAI GPT-4 · Google Cloud Speech-to-Text · LiveKit WebRTC' },
      { layer: 'Infrastructure', detail: 'AWS Elastic Beanstalk · S3 · CloudFront · MongoDB Atlas' },
      { layer: 'Payments & analytics', detail: 'Razorpay subscriptions · Firebase Analytics · Crashlytics' },
    ],
    challenges: [
      {
        title: 'Speech recognition accuracy',
        challenge: 'Google Speech API struggled with Indian English accents.',
        solution: 'Adapted for accent using targeted phonetic training data, taking accuracy from 65% to 92%.',
      },
      {
        title: 'Deep link validation',
        challenge: 'Apple rejected the app over failing deep links.',
        solution: 'Moved the backend to HTTPS, fixed the AASA config, and validated every deep-link flow — passed review on the 3rd attempt.',
      },
      {
        title: 'Payment integration',
        challenge: 'Razorpay subscription webhooks were failing intermittently.',
        solution: 'Added exponential-backoff retries, webhook signature validation, and idempotency keys — failure rate dropped below 0.1%.',
      },
      {
        title: 'Scaling costs',
        challenge: 'OpenAI API spend grew faster than the user base.',
        solution: 'Cached responses, trimmed prompt tokens, and routed simple tasks to GPT-3.5 — cost per user fell 60%.',
      },
    ],
    results: [
      { value: '10,000+', label: 'Total downloads' },
      { value: '1,500+', label: 'Active daily users' },
      { value: '4.5★', label: 'Average rating' },
      { value: '15 min', label: 'Avg. session time' },
      { value: '65%', label: '7-day retention' },
      { value: '12%', label: 'Conversion rate' },
    ],
    learnings: [
      { title: 'Ship early, iterate fast', body: 'Launched an MVP in 3 months and improved it against real usage data instead of assumptions.' },
      { title: 'ASO is not optional', body: 'App Store Optimization drove 60% of organic downloads — screenshots and keywords earned their time.' },
      { title: 'Monitoring buys peace of mind', body: 'Logging and monitoring from day one caught 90% of bugs before users ever saw them.' },
      { title: 'Cache aggressively', body: 'Redis caching cut API costs 70% and made responses 5x faster.' },
    ],
  },
]
