import { useMemo } from 'react'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import { contributionsByMonth, github, timeAgo } from '../lib/stats'
import { Card, PageHeader } from '../components/ui'
import { BarChart, Heatmap } from '../components/charts'

export default function Activity() {
  const months = useMemo(contributionsByMonth, [])
  const repos = github.recentRepos.filter((r) => r.name !== github.login)
  const best = months.reduce((a, b) => (b.value > a.value ? b : a), months[0])
  const activeDays = github.days.filter(([, n]) => n > 0).length

  return (
    <div>
      <PageHeader
        title="Activity"
        subtitle="Public GitHub activity, synced at every deploy. Private client repositories don’t appear here."
      />
      <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            [github.totalContributions, 'Contributions', 'Last 12 months'],
            [activeDays, 'Active days', 'Days with a contribution'],
            [`${best.label} ${best.year}`, 'Busiest month', `${best.value} contributions`],
          ].map(([v, l, n]) => (
            <div key={l} className="glass-card p-4">
              <p className="text-xl font-semibold tracking-tight text-ink tabular-nums sm:text-2xl">{v}</p>
              <p className="mt-0.5 text-xs font-semibold text-ink">{l}</p>
              <p className="text-2xs text-ink-soft">{n}</p>
            </div>
          ))}
        </div>

        <Card title="Contribution calendar" subtitle="One square per day, past year">
          <Heatmap weeks={53} />
        </Card>

        <div className="grid gap-4 xl:grid-cols-5">
          <Card className="xl:col-span-3" title="Per month" subtitle="Public contributions">
            <BarChart data={months.slice(-12)} height={200} />
          </Card>
          <Card className="xl:col-span-2" title="Recently pushed" subtitle="Public repositories">
            <ul className="-mx-2">
              {repos.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/55"
                  >
                    <GitBranch size={15} className="shrink-0 text-ink-soft" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-mono text-xs font-medium text-ink">{r.name}</span>
                      <span className="text-2xs text-ink-soft">
                        {r.language ?? 'Docs'} · {timeAgo(r.pushedAt)}
                      </span>
                    </span>
                    <ArrowUpRight size={14} className="shrink-0 text-ink-faint group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
