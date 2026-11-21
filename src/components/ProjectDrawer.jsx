import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight, Check } from 'lucide-react'
import { StatusBadge, Tag } from './ui'

export default function ProjectDrawer({ project, onClose }) {
  const closeRef = useRef(null)

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
          className="fixed inset-0 z-50 flex justify-end bg-black/35 p-0 sm:p-3"
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
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            className="glass-card h-full w-full max-w-xl overflow-y-auto rounded-none p-5 sm:rounded-card sm:p-7"
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
                  {project.status === 'Planning' ? 'No public code yet.' : 'Client or private code. Ask me for a walkthrough.'}
                </p>
              )}
            </div>

          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
