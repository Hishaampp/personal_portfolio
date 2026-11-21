import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Sidebar from './components/shell/Sidebar'
import Topbar from './components/shell/Topbar'
import CommandPalette from './components/shell/CommandPalette'
import ProjectDrawer from './components/ProjectDrawer'
import Overview from './views/Overview'
import Projects from './views/Projects'
import Experience from './views/Experience'
import Skills from './views/Skills'
import Activity from './views/Activity'
import Contact from './views/Contact'
import { projects } from './data/projects'
import { useRoute, go } from './lib/route'
import { installClickSounds, play } from './lib/sound'

const VIEW_COMPONENTS = { overview: Overview, projects: Projects, experience: Experience, skills: Skills, activity: Activity, contact: Contact }

export default function App() {
  const { view, item } = useRoute()
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const project = item ? projects.find((p) => p.id === item) : null

  useEffect(() => installClickSounds(), [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => {
          play(o ? 'close' : 'open')
          return !o
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setMenuOpen(false)
  }, [view])

  useEffect(() => {
    document.title = `${view === 'overview' ? 'Hisham P P' : view[0].toUpperCase() + view.slice(1) + ' · Hisham P P'} · Full-stack & Flutter developer`
  }, [view])

  const closeProject = useCallback(() => go(view), [view])
  const View = VIEW_COMPONENTS[view]

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-void lg:p-3">
        <div className="app-window relative mx-auto flex min-h-screen max-w-app gap-3 shadow-window lg:min-h-[calc(100vh-1.5rem)] lg:rounded-window lg:p-3">
          <Sidebar view={view} open={menuOpen} onClose={() => setMenuOpen(false)} />

          <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 lg:p-0">
            <Topbar onMenu={() => setMenuOpen(true)} onSearch={() => setPaletteOpen(true)} />
            <main className="glass-panel flex-1 rounded-panel p-3 sm:p-5 lg:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <View />
                </motion.div>
              </AnimatePresence>
            </main>
            <footer className="px-2 pb-1 text-center text-2xs text-side-muted">
              © {new Date().getFullYear()} Hisham P P · Built with React, Tailwind and Framer Motion
            </footer>
          </div>
        </div>
      </div>

      <ProjectDrawer project={project} onClose={closeProject} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </MotionConfig>
  )
}
