import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, CATEGORIES } from '../data/projects'
import { href } from '../lib/route'
import { PageHeader, Segmented, StatusBadge, Tag } from '../components/ui'

const STATUSES = ['Any status', 'Live', 'In development', 'Planning']

export default function Projects() {
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('Any status')

  const list = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === 'All' || p.categories.includes(category)) &&
          (status === 'Any status' || p.status === status),
      ),
    [category, status],
  )

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Products I’ve built, client work I’ve shipped and what’s on the bench now. Open any row for the details."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="max-w-full overflow-x-auto">
          <Segmented id="cat" tone="dark" options={CATEGORIES} value={category} onChange={setCategory} />
        </div>
        <label className="sr-only" htmlFor="status-filter">
          Status
        </label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="glass-dark rounded-full px-3 py-1.5 text-2xs font-semibold text-side focus:outline-none [&>option]:text-ink"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="ml-auto text-2xs text-side-muted">
          {list.length} of {projects.length}
        </span>
      </div>

      <div className="glass-card overflow-hidden">
        {/* header row, desktop */}
        <div className="hidden grid-cols-[minmax(0,2.2fr)_8.5rem_minmax(0,2fr)_4rem_2rem] gap-4 border-b border-ink/10 px-5 py-3 text-2xs font-medium text-ink-soft md:grid">
          <span>Project</span>
          <span>Status</span>
          <span>Stack</span>
          <span>Year</span>
          <span />
        </div>
        <ul>
          <AnimatePresence initial={false}>
            {list.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-ink/[0.07] last:border-0"
              >
                <a
                  href={href('projects', p.id)}
                  data-sound="open"
                  className="group grid gap-3 px-4 py-3.5 transition-colors hover:bg-white/45 md:grid-cols-[minmax(0,2.2fr)_8.5rem_minmax(0,2fr)_4rem_2rem] md:items-center md:gap-4 md:px-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {p.image ? (
                      <img src={p.image} alt="" className="h-10 w-10 shrink-0 rounded-lg border border-white/70 object-cover" />
                    ) : (
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-pill text-xs font-bold text-aqua">
                        {p.title.slice(0, 2)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-ink">{p.title}</p>
                      <p className="truncate text-xs text-ink-soft">{p.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:block">
                    <StatusBadge status={p.status} />
                    <span className="text-2xs text-ink-soft md:hidden">· {p.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.stack.slice(0, 4).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                    {p.stack.length > 4 && <Tag>+{p.stack.length - 4}</Tag>}
                  </div>
                  <span className="hidden font-mono text-xs text-ink-soft md:block">{p.year}</span>
                  <ArrowUpRight
                    size={16}
                    className="hidden text-ink-faint transition-colors group-hover:text-ink md:block"
                  />
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <li className="px-5 py-12 text-center text-sm text-ink-soft">No projects match these filters.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
