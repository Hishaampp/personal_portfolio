# Hisham — Portfolio (React + Vite + Tailwind + Framer Motion)

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL. For a production build:

```bash
npm run build
npm run preview
```

Deploys as-is to Vercel, Netlify, or GitHub Pages (it's a static Vite build).

## Structure

```
src/
  data/
    siteConfig.js   ← your name, bio, stats, socials, resume link — edit this first
    projects.js     ← every project card. Add a new project = add one object here.
    caseStudies.js  ← deep-dive write-ups, linked from projects.js via caseStudySlug
    skills.js       ← skill categories + proficiency bars
  components/       ← one component per section (Navbar, Hero, About, Projects, ...)
  hooks/
    useActiveSection.js  ← powers the nav's active-link highlight
public/
  resume.pdf        ← put your resume here (see ASSETS_README.md)
  projects/         ← put project screenshots here
```

## Adding a new project

Open `src/data/projects.js` and push a new object onto the array:

```js
{
  id: 'my-new-app',
  title: 'My New App',
  image: '/projects/my-new-app.jpg',
  description: 'One or two sentences on what it does and why it matters.',
  tags: ['React Native', 'Supabase'],
  metrics: [{ label: '500+ users' }],       // optional
  learnings: ['One thing you learned'],      // optional
  links: [{ label: 'View on GitHub', url: 'https://github.com/...' }],
  caseStudySlug: undefined,                  // set this if you write a full case study
}
```

That's it — the grid, tags, and links all render automatically.

## Adding a case study

Add an object to `src/data/caseStudies.js` with a matching `slug`, then set that same
string as `caseStudySlug` on the project in `projects.js`. The "Read case study" link
will appear on the card automatically and scroll to the right section.

## Wiring the contact form to a real backend

Right now the form opens the visitor's email client with the message pre-filled
(see `src/components/Contact.jsx`). To make it submit silently instead, swap that
handler for a POST to a service like Formspree, Resend, or your own API route.

## Design notes

Palette and type choices are documented as CSS variables in `tailwind.config.js`
(`palm`, `turmeric`, `rust`, `ink`, `paper`) — a Kerala backwater palette rather than
a generic SaaS indigo/purple, paired with Space Grotesk (display) + Inter (body) +
JetBrains Mono (used specifically for build metadata: dates, tags, terminal card).
