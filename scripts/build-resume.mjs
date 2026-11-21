// Builds an ATS-friendly one-page résumé from the same data files as the site,
// then prints it to public/resume.pdf with headless Chrome.
//
//   npm run resume
//
// ATS rules followed: one column, real text (no images or icons), standard
// section headings, plain bullets, links written out, a common system font.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { siteConfig } from '../src/data/siteConfig.js'
import { projects } from '../src/data/projects.js'
import { education, experience } from '../src/data/timeline.js'

// Contact details printed on the PDF only (not shown on the website).
const PHONE = '+91 6282327676'

// Projects on the résumé, in this order. Planning-stage work stays off it.
const RESUME_PROJECTS = ['sandbox', 'vault', 'ample', 'smart-compatibility', 'kmcc-admin']

const SKILLS = [
  ['Languages', 'TypeScript, JavaScript, Dart, Python, SQL, C++, Java'],
  ['Frontend', 'React, Next.js, Tailwind CSS, HTML, CSS, Framer Motion'],
  ['Mobile', 'Flutter, Riverpod, Drift (SQLite), Google Play and App Store release'],
  ['Backend & Data', 'Node.js, Express, FastAPI, REST APIs, WebSocket, Supabase, PostgreSQL (RLS), Firebase, MongoDB'],
  ['Cloud & Tools', 'AWS, Vercel, Git, GitHub Actions (CI/CD), Vitest, Figma'],
  ['AI & Payments', 'OpenAI API, Google Cloud Speech-to-Text, Razorpay'],
]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const projectBlocks = RESUME_PROJECTS.map((id) => projects.find((p) => p.id === id))
  .map((p) => {
    const link = p.links.find((l) => /live/i.test(l.label)) ?? p.links[0]
    const status = p.status === 'Live' ? '' : ` (${p.status})`
    return `
    <div class="entry">
      <div class="row"><span><b>${esc(p.title)}</b>${esc(status)} | ${esc(p.stack.slice(0, 6).join(', '))}</span><span>${p.year}</span></div>
      ${link ? `<div class="sub">${esc(bare(link.url))}</div>` : ''}
      <ul>${[p.description.split('. ')[0].replace(/\.$/, '') + '.', ...p.highlights.slice(0, 1)]
        .map((h) => `<li>${esc(h)}</li>`)
        .join('')}</ul>
    </div>`
  })
  .join('')

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(siteConfig.fullName)} - Resume</title>
<style>
  @page { size: A4; margin: 10mm 13mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.3pt; line-height: 1.28; color: #111; margin: 0; }
  h1 { font-size: 18pt; margin: 0; letter-spacing: 0.2pt; }
  .headline { font-size: 10.5pt; font-weight: bold; margin: 2px 0 3px; }
  .contact { font-size: 9pt; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.4pt; border-bottom: 1px solid #333; margin: 7px 0 3px; padding-bottom: 1px; }
  p { margin: 0; }
  .entry { margin-bottom: 5px; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .row span:last-child { white-space: nowrap; font-weight: bold; }
  .sub { font-size: 8.8pt; color: #333; }
  ul { margin: 1px 0 0 0; padding-left: 15px; }
  li { margin: 0.5px 0; }
  .skills div { margin: 1px 0; }
  a { color: inherit; text-decoration: none; }
</style></head>
<body>
  <h1>${esc(siteConfig.fullName.toUpperCase())}</h1>
  <p class="headline">Software Developer | MCA Student</p>
  <p class="contact">${esc(siteConfig.location.split(' · ')[0])} | ${PHONE} | ${esc(siteConfig.email)} | ${bare(siteConfig.site)} | ${bare(siteConfig.github)} | ${bare(siteConfig.socials.find((s) => s.label === 'LinkedIn').url)}</p>

  <h2>Summary</h2>
  <p>Software developer and MCA student at Lovely Professional University who has founded a startup and shipped production apps. Builds web apps with React, Next.js, TypeScript and Supabase/PostgreSQL, and cross-platform mobile apps with Flutter. Published an AI English-learning app on Google Play and the App Store and delivered 10+ client projects rated 5.0. Seeking software development internships.</p>

  <h2>Education</h2>
  ${education
    .map(
      (e) => `<div class="entry"><div class="row"><span><b>${esc(e.title)}</b>, ${esc(e.org)}</span><span>${esc(e.period.replace('–', '-'))}</span></div></div>`,
    )
    .join('')}

  <h2>Technical Skills</h2>
  <div class="skills">${SKILLS.map(([k, v]) => `<div><b>${esc(k)}:</b> ${esc(v)}</div>`).join('')}</div>

  <h2>Experience</h2>
  ${experience
    .map(
      (x) => `
    <div class="entry">
      <div class="row"><span><b>${esc(x.title)}</b>, ${esc(x.org)}</span><span>${esc(x.period.replace('–', '-'))}</span></div>
      <ul>${x.points.map((pt) => `<li>${esc(pt.replace('★', ''))}</li>`).join('')}</ul>
    </div>`,
    )
    .join('')}

  <h2>Projects</h2>
  ${projectBlocks}

</body></html>
`

const dir = fileURLToPath(new URL('../resume/', import.meta.url))
mkdirSync(dir, { recursive: true })
const htmlPath = `${dir}resume.html`
writeFileSync(htmlPath, html)

const pdfPath = fileURLToPath(new URL('../public/resume.pdf', import.meta.url))
const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p))
if (!chrome) {
  console.error('[resume] Chrome not found; set CHROME_PATH. HTML written to', htmlPath)
  process.exit(1)
}
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`], {
  stdio: 'ignore',
})
console.log('[resume] wrote', pdfPath)
