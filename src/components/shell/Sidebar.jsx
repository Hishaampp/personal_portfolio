import { motion } from 'framer-motion'
import {
  LayoutGrid,
  FolderKanban,
  Briefcase,
  Sparkles,
  Activity,
  Mail,
  FileText,
  Github,
  X,
} from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { projectCounts } from '../../lib/stats'
import { href } from '../../lib/route'

const SECTIONS = [
  {
    label: 'Portfolio',
    items: [
      { view: 'overview', label: 'Overview', icon: LayoutGrid },
      { view: 'projects', label: 'Projects', icon: FolderKanban, badge: projectCounts.total },
      { view: 'experience', label: 'Experience', icon: Briefcase },
      { view: 'skills', label: 'Skills', icon: Sparkles },
    ],
  },
  {
    label: 'Signals',
    items: [
      { view: 'activity', label: 'Activity', icon: Activity },
      { view: 'contact', label: 'Contact', icon: Mail },
    ],
  },
]

const LINKS = [
  { label: 'Résumé', icon: FileText, url: siteConfig.resumeUrl, download: true },
  { label: 'GitHub', icon: Github, url: siteConfig.github },
]

function NavItem({ item, active, onNavigate }) {
  const Icon = item.icon
  return (
    <a
      href={href(item.view)}
      data-sound="nav"
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors ${
        active ? 'text-ink' : 'text-side hover:bg-white/[0.06] hover:text-white'
      }`}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-xl bg-aqua shadow-lift"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      )}
      <Icon size={16} strokeWidth={2} className="relative" />
      <span className="relative flex-1">{item.label}</span>
      {item.badge != null && (
        <span
          className={`relative grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-2xs font-semibold ${
            active ? 'bg-ink/15 text-ink' : 'bg-white/10 text-side'
          }`}
        >
          {item.badge}
        </span>
      )}
    </a>
  )
}

export default function Sidebar({ view, open, onClose }) {
  const progress = siteConfig.degreeProgress
  return (
    <>
      {/* mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />
      <aside
        className={`glass-dark fixed inset-y-0 left-0 z-40 flex w-64 flex-col rounded-r-panel p-3 transition-transform duration-300 lg:sticky lg:top-3 lg:z-auto lg:h-[calc(100vh-1.5rem)] lg:w-60 lg:shrink-0 lg:translate-x-0 lg:rounded-panel ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3 px-2 pb-4 pt-1">
          <img
            src={siteConfig.photo}
            alt=""
            width="40"
            height="40"
            className="h-10 w-10 rounded-xl border border-white/20 object-cover object-top"
          />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold text-white">{siteConfig.name}</p>
            <p className="truncate text-2xs text-side-muted">{siteConfig.role}</p>
          </div>
          <button
            onClick={onClose}
            data-sound="close"
            className="grid h-8 w-8 place-items-center rounded-lg text-side hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 pb-1.5 text-2xs font-medium text-side-muted">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItem key={item.view} item={item} active={view === item.view} onNavigate={onClose} />
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className="px-3 pb-1.5 text-2xs font-medium text-side-muted">Links</p>
            <div className="space-y-0.5">
              {LINKS.map(({ label, icon: Icon, url, download }) => (
                <a
                  key={label}
                  href={url}
                  {...(download ? { download: 'Hisham-Resume.pdf' } : { target: '_blank', rel: 'noreferrer' })}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-side transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.05] p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            <p className="text-xs font-semibold text-white">Open to work</p>
          </div>
          <p className="mt-1 text-2xs text-side-muted">{siteConfig.openTo}</p>
          <div className="mt-3 flex items-center justify-between text-2xs text-side-muted">
            <span>{progress.label}</span>
            <span>{progress.detail}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-aqua"
              style={{ width: `${(progress.value / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  )
}
