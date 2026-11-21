import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FolderKanban,
  Hammer,
  Download,
  Star,
  Github,
  GitCommit,
  Users,
  GraduationCap,
  ArrowUpRight,
  FileText,
  Send,
} from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { projects } from '../data/projects'
import { contributionsByMonth, languageShare, projectCounts, github } from '../lib/stats'
import { href } from '../lib/route'
import { Card, Segmented, StatusBadge } from '../components/ui'
import { BarChart, Donut, DONUT_COLORS, Heatmap } from '../components/charts'

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Up late'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

const h = siteConfig.highlights
const STATS = [
  { icon: FolderKanban, value: projectCounts.total, label: 'Projects', note: `${projectCounts.live} live`, to: 'projects' },
  { icon: Hammer, value: projectCounts.building, label: 'In progress', note: 'Sandbox, Ample and more', to: 'projects' },
  { icon: Download, value: h.liwiDownloads, label: 'Liwi AI downloads', note: 'Play Store & App Store', to: 'projects/liwi-ai' },
  { icon: Star, value: h.liwiRating, label: 'Liwi AI rating', note: 'Average store rating', to: 'projects/liwi-ai' },
  { icon: Github, value: github.publicRepos, label: 'Public repos', note: 'Synced from GitHub', to: 'activity' },
  { icon: GitCommit, value: github.totalContributions, label: 'Contributions', note: 'Public, last 12 months', to: 'activity' },
  { icon: Users, value: h.clientProjects, label: 'Client projects', note: `${h.clientRating} on Fiverr & Upwork`, to: 'experience', trend: h.clientRating },
  { icon: GraduationCap, value: 'MCA', label: 'Lovely Professional University', note: '2026 – 2028', to: 'experience' },
]

function StatCard({ stat, index }) {
  const Icon = stat.icon
  return (
    <motion.a
      href={href(...stat.to.split('/'))}
      data-sound="nav"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.04 }}
      whileHover={{ y: -3 }}
      className="glass-card group block p-4"
    >
      <div className="flex items-start justify-between">
        <span className="icon-chip">
          <Icon size={15} />
        </span>
        {stat.trend && (
          <span className="rounded-full bg-mint/25 px-1.5 py-0.5 text-2xs font-semibold text-mint-deep">{stat.trend}</span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-ink tabular-nums">{stat.value}</p>
      <p className="mt-0.5 text-xs font-semibold text-ink">{stat.label}</p>
      <p className="mt-0.5 truncate text-2xs text-ink-soft">{stat.note}</p>
    </motion.a>
  )
}

const RANGES = [
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 12, label: '12 months' },
]

export default function Overview() {
  const [range, setRange] = useState(6)
  const months = useMemo(contributionsByMonth, [])
  const shown = months.slice(-range)
  const shownTotal = shown.reduce((n, m) => n + m.value, 0)
  const langs = useMemo(() => languageShare(4), [])
  const featured = projects.filter((p) => p.featured)

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-1">
        <div className="min-w-0 max-w-2xl">
          <p className="text-2xs font-medium text-ink-soft">{today}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
            {greeting()}, I’m {siteConfig.shortName}.
          </h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">{siteConfig.role}</span> · {siteConfig.status}. {siteConfig.intro}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={siteConfig.resumeUrl} download="Hisham-PP-Resume.pdf" className="btn-ghost">
            <FileText size={13} />
            Résumé
          </a>
          <a href={href('contact')} data-sound="nav" className="btn-pill">
            <Send size={13} />
            Hire me
          </a>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="GitHub contributions"
          subtitle={`${shownTotal} public contributions in the last ${range} months`}
          action={
            <div className="flex items-center gap-2">
              <Segmented id="range" options={RANGES} value={range} onChange={setRange} />
              <a href={href('activity')} data-sound="nav" className="btn-pill hidden sm:inline-flex">
                Activity
              </a>
            </div>
          }
        >
          <BarChart key={range} data={shown} />
        </Card>

        <Card title="Languages" subtitle={`Share of code across ${github.publicRepos} public repos`}>
          <div className="flex flex-col items-center gap-5 sm:flex-row xl:flex-col 2xl:flex-row">
            <Donut
              data={langs}
              center={
                <div>
                  <p className="text-lg font-semibold text-ink">{Math.round(langs[0].share * 100)}%</p>
                  <p className="text-2xs text-ink-soft">{langs[0].name}</p>
                </div>
              }
            />
            <ul className="w-full flex-1 space-y-2">
              {langs.map((l, i) => (
                <li key={l.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: DONUT_COLORS[i] }} />
                  <span className="flex-1 font-medium text-ink">{l.name}</span>
                  <span className="font-mono text-ink-soft">{(l.share * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>

      {/* Featured projects + heatmap */}
      <div className="grid gap-4 xl:grid-cols-5">
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
          <ul className="-mx-2 divide-y divide-ink/[0.07]">
            {featured.map((p) => (
              <li key={p.id}>
                <a
                  href={href('projects', p.id)}
                  data-sound="open"
                  className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/50"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pill text-xs font-bold text-aqua">
                    {p.title.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{p.title}</p>
                    <p className="truncate text-xs text-ink-soft">{p.tagline}</p>
                  </div>
                  <span className="hidden sm:block">
                    <StatusBadge status={p.status} />
                  </span>
                  <ArrowUpRight size={15} className="shrink-0 text-ink-faint transition-colors group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="xl:col-span-2" title="Last 6 months" subtitle="Daily public commits, PRs and issues">
          <Heatmap weeks={26} />
          <p className="mt-3 text-2xs text-ink-faint">
            Private client work doesn’t show here. Synced {new Date(github.syncedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.
          </p>
        </Card>
      </div>
    </div>
  )
}
