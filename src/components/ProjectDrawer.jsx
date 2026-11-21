import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight, Check } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import { StatusBadge, Tag } from './ui'

function CaseStudy({ study }) {
  return (
    <div className="mt-6 space-y-5 border-t border-ink/10 pt-6">
      <div>
        <p className="label">Case study</p>
        <h3 className="mt-1 text-base font-semibold text-ink">{study.subtitle}</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {study.results.slice(0, 6).map((r) => (
          <div key={r.label} className="rounded-xl border border-white/80 bg-white/60 p-2.5">
            <p className="text-base font-semibold text-ink">{r.value}</p>
            <p className="text-2xs text-ink-soft">{r.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-ink">The problem</p>
        <p className="text-[13px] leading-relaxed text-ink-soft">{study.problem.body}</p>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-ink">Hard problems solved</p>
        <ul className="space-y-2.5">
          {study.challenges.map((c) => (
            <li key={c.title} className="rounded-xl border border-white/80 bg-white/50 p-3">
              <p className="text-xs font-semibold text-ink">{c.title}</p>
              <p className="mt-1 text-xs text-ink-soft">{c.challenge}</p>
              <p className="mt-1 text-xs text-ink">{c.solution}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-ink">What I learned</p>
        <ul className="space-y-2">
          {study.learnings.map((l) => (
            <li key={l.title} className="text-xs text-ink-soft">
              <span className="font-semibold text-ink">{l.title}. </span>
              {l.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ProjectDrawer({ project, onClose }) {
  const closeRef = useRef(null)
  const study = project?.caseStudySlug && caseStudies.find((c) => c.slug === project.caseStudySlug)

  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="h-full w-full max-w-xl overflow-y-auto border-l border-white/40 bg-[#d3e6ea]/95 p-5 backdrop-blur-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <StatusBadge status={project.status} />
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{project.title}</h2>
                <p className="mt-1 text-[13px] text-ink-soft">{project.tagline}</p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                data-sound="close"
                className="icon-chip shrink-0"
                aria-label="Close project"
              >
                <X size={16} />
              </button>
            </div>

            {project.image && (
              <img
                src={project.image}
                alt=""
                className="mt-5 aspect-[16/9] w-full rounded-card border border-white/70 object-cover"
              />
            )}

            <p className="mt-5 text-sm leading-relaxed text-ink">{project.description}</p>

            <ul className="mt-5 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
                  <Check size={15} className="mt-0.5 shrink-0 text-aqua-deep" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.map((l, i) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={i === 0 ? 'btn-pill' : 'btn-ghost'}
                >
                  {l.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
              {project.links.length === 0 && (
                <p className="text-xs text-ink-soft">
                  {project.status === 'Planning' ? 'No public code yet.' : 'Private or client code: links on request.'}
                </p>
              )}
            </div>

            {study && <CaseStudy study={study} />}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
