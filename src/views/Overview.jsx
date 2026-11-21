import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, Hammer, Github, Users, ArrowUpRight, FileText, Send, MapPin } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { projects } from '../data/projects'
import { contributionsByMonth, languageShare, projectCounts, github } from '../lib/stats'
import { href } from '../lib/route'
import { Card, Segmented, StatusBadge } from '../components/ui'
import { BarChart, Donut, DONUT_COLORS, Heatmap } from '../components/charts'

const EASE = [0.22, 1, 0.36, 1]

const building = projects.filter((p) => p.status !== 'Live').map((p) => p.title)

const STATS = [
  { icon: FolderKanban, value: projectCounts.total, label: 'Projects', note: `${projectCounts.live} live today`, to: ['projects'] },
  { icon: Hammer, value: projectCounts.building, label: 'In progress', note: building.join(', '), to: ['projects'] },
  {
    icon: Users,
    value: siteConfig.highlights.clientProjects,
    label: 'Client projects',
    note: `${siteConfig.highlights.clientRating} on Fiverr & Upwork`,
    to: ['experience'],
  },
  { icon: Github, value: github.publicRepos, label: 'Public repos', note: `${github.totalContributions} contributions this year`, to: ['activity'] },
]

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      transition={{ duration: 0.7, ease: EASE }}
      className="glass-card flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-7"
    >
      <img
        src={siteConfig.photo}
        alt={`Portrait of ${siteConfig.name}`}
        width="132"
        height="132"
        className="h-28 w-28 shrink-0 rounded-[1.75rem] border border-white/90 object-cover object-top shadow-[0_14px_30px_-14px_rgb(2_22_28/0.6)] sm:h-[132px] sm:w-[132px]"
      />
      <div className="min-w-0 flex-1">
        <h1 className="text-[34px] font-semibold leading-none text-ink sm:text-[44px]">{siteConfig.name}</h1>
        <p className="mt-2 text-[15px] font-medium text-ink">
          {siteConfig.role}
          <span className="text-ink-soft"> · {siteConfig.status}</span>
        </p>
        <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">{siteConfig.intro}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a href={href('contact')} data-sound="nav" className="btn-pill px-4 py-2.5 text-[13px]">
            <Send size={14} />
            Get in touch
          </a>
          <a href={siteConfig.resumeUrl} download="Hisham-Resume.pdf" className="btn-ghost px-4 py-2.5 text-[13px]">
            <FileText size={14} />
            Résumé
          </a>
          <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-ink-soft">
            <MapPin size={13} />
            {siteConfig.location.split(' · ')[0]}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-mint/40 bg-mint/15 px-3 py-1.5 text-xs font-semibold text-mint-deep sm:self-start">
        <span className="h-2 w-2 rounded-full bg-mint" />
        Open to internships
      </div>
    </motion.section>
  )
}

function StatCard({ stat }) {
  const Icon = stat.icon
  return (
    <a href={href(...stat.to)} data-sound="nav" className="glass-card glass-card-hover block p-5">
      <span className="icon-chip">
        <Icon size={15} />
      </span>
      <p className="mt-5 text-[28px] font-semibold leading-none tracking-tight text-ink tabular-nums">{stat.value}</p>
      <p className="mt-2 text-[13px] font-semibold text-ink">{stat.label}</p>
      <p className="mt-0.5 truncate text-xs text-ink-soft">{stat.note}</p>
    </a>
  )
}

const RANGES = [
  { value: 3, label: '3M' },
  { value: 6, label: '6M' },
  { value: 12, label: '12M' },
]

export default function Overview() {
  const [range, setRange] = useState(6)
  const months = useMemo(contributionsByMonth, [])
  const shown = months.slice(-range)
  const shownTotal = shown.reduce((n, m) => n + m.value, 0)
  const langs = useMemo(() => languageShare(4), [])
  const featured = projects.filter((p) => p.featured)

  return (
    <div className="space-y-4 sm:space-y-5">
      <Hero />

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <div className="grid gap-4 sm:gap-5 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="GitHub contributions"
          subtitle={`${shownTotal} public contributions in the last ${range} months`}
          action={<Segmented id="range" options={RANGES} value={range} onChange={setRange} />}
        >
          <BarChart key={range} data={shown} />
        </Card>

        <Card title="Languages" subtitle={`Across ${github.publicRepos} public repositories`}>
          <div className="flex flex-col items-center gap-6 sm:flex-row xl:flex-col">
            <Donut
              data={langs}
              center={
                <div>
                  <p className="text-xl font-semibold text-ink tabular-nums">{Math.round(langs[0].share * 100)}%</p>
                  <p className="text-2xs text-ink-soft">{langs[0].name}</p>
                </div>
              }
            />
            <ul className="w-full flex-1 space-y-2.5">
              {langs.map((l, i) => (
                <li key={l.name} className="flex items-center gap-2.5 text-[13px]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: DONUT_COLORS[i] }} />
                  <span className="flex-1 text-ink">{l.name}</span>
                  <span className="text-ink-soft tabular-nums">{(l.share * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-5 xl:grid-cols-5">
        <Card
          className="xl:col-span-3"
          title="Featured projects"
          subtitle="What I’m building and what’s shipped"
          action={
            <a href={href('projects')} data-sound="nav" className="btn-ghost">
              All {projectCounts.total}
            </a>
          }
        >
          <ul className="-mx-2.5 -mb-2 divide-y divide-ink/[0.07]">
            {featured.map((p) => (
              <li key={p.id}>
                <a
                  href={href('projects', p.id)}
                  data-sound="open"
                  className="group flex items-center gap-3.5 rounded-2xl px-2.5 py-3 transition-colors duration-200 hover:bg-white/55"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pill text-xs font-semibold text-aqua-bright">
                    {p.title.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold text-ink">{p.title}</p>
                    <p className="truncate text-xs text-ink-soft">{p.tagline}</p>
                  </div>
                  <span className="hidden sm:block">
                    <StatusBadge status={p.status} />
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-ink-faint transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="xl:col-span-2" title="Last 6 months" subtitle="Daily public commits, pull requests and issues">
          <Heatmap weeks={26} />
          <p className="mt-4 text-2xs text-ink-faint">
            Client work in private repositories doesn’t show here. Synced{' '}
            {new Date(github.syncedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.
          </p>
        </Card>
      </div>
    </div>
  )
}
