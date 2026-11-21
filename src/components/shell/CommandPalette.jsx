import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, CornerDownLeft, FolderKanban, LayoutGrid, Sparkles, Zap } from 'lucide-react'
import { projects } from '../../data/projects'
import { skillGroups } from '../../data/skills'
import { siteConfig } from '../../data/siteConfig'
import { go, VIEWS } from '../../lib/route'
import { isMuted, setMuted, play } from '../../lib/sound'

const cap = (s) => s[0].toUpperCase() + s.slice(1)

function buildItems() {
  return [
    ...VIEWS.map((v) => ({ group: 'Pages', icon: LayoutGrid, label: cap(v), run: () => go(v) })),
    ...projects.map((p) => ({
      group: 'Projects',
      icon: FolderKanban,
      label: p.title,
      hint: p.tagline,
      keywords: p.stack.join(' '),
      run: () => go('projects', p.id),
    })),
    ...skillGroups.flatMap((g) =>
      g.items.map((s) => ({ group: 'Skills', icon: Sparkles, label: s, hint: g.group, run: () => go('skills') })),
    ),
    {
      group: 'Actions',
      icon: Zap,
      label: 'Download résumé',
      run: () => {
        const a = document.createElement('a')
        a.href = siteConfig.resumeUrl
        a.download = 'Hisham-PP-Resume.pdf'
        a.click()
      },
    },
    { group: 'Actions', icon: Zap, label: 'Email Hisham', run: () => (window.location.href = `mailto:${siteConfig.email}`) },
    { group: 'Actions', icon: Zap, label: 'Toggle click sounds', run: () => setMuted(!isMuted()) },
  ]
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const all = useMemo(buildItems, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return all.filter((i) => i.group !== 'Skills')
    return all.filter((i) => `${i.label} ${i.hint ?? ''} ${i.keywords ?? ''}`.toLowerCase().includes(q))
  }, [all, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function run(item) {
    onClose()
    play('nav')
    item.run()
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      run(results[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="w-full max-w-lg overflow-hidden rounded-panel border border-white/10 bg-teal-950/95 shadow-window"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={16} className="text-side-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search projects, skills, pages…"
                className="h-12 flex-1 bg-transparent text-sm text-white placeholder:text-side-muted focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={`palette-${active}`}
              />
              <kbd className="rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-2xs text-side-muted">esc</kbd>
            </div>
            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-side-muted">Nothing matches “{query}”.</li>
              )}
              {results.map((item, i) => {
                const header = item.group !== lastGroup
                lastGroup = item.group
                const Icon = item.icon
                return (
                  <li key={`${item.group}-${item.label}`}>
                    {header && <p className="px-3 pb-1 pt-2 text-2xs font-medium text-side-muted">{item.group}</p>}
                    <div
                      id={`palette-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(item)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                        i === active ? 'bg-aqua text-ink' : 'text-side'
                      }`}
                    >
                      <Icon size={15} className="shrink-0" />
                      <span className="font-medium">{item.label}</span>
                      {item.hint && (
                        <span className={`truncate text-xs ${i === active ? 'text-ink/70' : 'text-side-muted'}`}>
                          {item.hint}
                        </span>
                      )}
                      {i === active && <CornerDownLeft size={14} className="ml-auto shrink-0" />}
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
