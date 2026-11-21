import { useEffect, useState } from 'react'
import { Menu, Search, Volume2, VolumeX, Github } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { isMuted, setMuted, onMutedChange } from '../../lib/sound'

export function useMuted() {
  const [muted, set] = useState(isMuted)
  useEffect(() => onMutedChange(set), [])
  return muted
}

const iconBtn =
  'glass-dark grid h-10 w-10 shrink-0 place-items-center rounded-xl text-side transition-colors duration-200 hover:text-white'

export default function Topbar({ onMenu, onSearch }) {
  const muted = useMuted()
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <header className="flex items-center gap-2 sm:gap-3">
      <button onClick={onMenu} data-sound="open" className={`${iconBtn} lg:hidden`} aria-label="Open menu">
        <Menu size={18} />
      </button>

      <button
        onClick={onSearch}
        data-sound="open"
        className="glass-dark flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3.5 text-left text-[13px] text-side-muted transition-colors duration-200 hover:text-side md:max-w-sm"
      >
        <Search size={15} className="shrink-0" />
        <span className="flex-1 truncate">Search projects, skills, pages</span>
        <kbd className="hidden rounded-md border border-white/15 px-1.5 py-0.5 font-sans text-2xs text-side-muted sm:inline">
          {isMac ? '⌘' : 'Ctrl'} K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setMuted(!muted)}
          data-sound="none"
          className={iconBtn}
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
          className={`${iconBtn} hidden sm:grid`}
          aria-label="GitHub profile"
        >
          <Github size={17} />
        </a>
      </div>
    </header>
  )
}
