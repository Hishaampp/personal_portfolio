import { useEffect, useState } from 'react'
import { Menu, Search, Volume2, VolumeX, Github } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { isMuted, setMuted, onMutedChange } from '../../lib/sound'

export function useMuted() {
  const [muted, set] = useState(isMuted)
  useEffect(() => onMutedChange(set), [])
  return muted
}

export default function Topbar({ onMenu, onSearch }) {
  const muted = useMuted()
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <header className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={onMenu}
        data-sound="open"
        className="glass-dark grid h-10 w-10 shrink-0 place-items-center rounded-xl text-side lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <button
        onClick={onSearch}
        data-sound="open"
        className="glass-dark flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 text-left text-[13px] text-side-muted transition-colors hover:text-side md:max-w-md"
      >
        <Search size={15} className="shrink-0" />
        <span className="flex-1 truncate">Search projects, skills, pages…</span>
        <kbd className="hidden rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-2xs text-side-muted sm:inline">
          {isMac ? '⌘' : 'Ctrl'} K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setMuted(!muted)}
          data-sound="none"
          className="glass-dark grid h-10 w-10 place-items-center rounded-xl text-side transition-colors hover:text-white"
          aria-label={muted ? 'Turn click sounds on' : 'Turn click sounds off'}
          aria-pressed={!muted}
          title={muted ? 'Sounds off' : 'Sounds on'}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="glass-dark hidden h-10 w-10 place-items-center rounded-xl text-side transition-colors hover:text-white sm:grid"
          aria-label="GitHub profile"
        >
          <Github size={17} />
        </a>
        <div className="glass-dark hidden h-10 items-center gap-2.5 rounded-xl pl-1.5 pr-3 md:flex">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-aqua text-2xs font-bold text-ink">
            {siteConfig.initials}
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-white">{siteConfig.name}</p>
            <p className="text-2xs text-side-muted">MCA · LPU</p>
          </div>
        </div>
      </div>
    </header>
  )
}
