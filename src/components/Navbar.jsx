import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { siteConfig } from '../data/siteConfig'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'case-studies', label: 'Case studies' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNav('home')
            }}
            className="font-display font-semibold text-lg tracking-tight text-ink"
          >
            {siteConfig.name}<span className="text-turmeric">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative text-sm font-medium transition-colors ${
                  active === link.id ? 'text-palm' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-palm"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-ink/80 hover:text-palm transition-colors"
            >
              <Download size={16} /> Resume
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="text-sm font-semibold px-4 py-2 rounded-full bg-palm text-paper hover:bg-palm-dark transition-colors"
            >
              Let's talk
            </button>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-paper border-b border-ink/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left py-3 text-base font-medium border-b border-ink/5 ${
                    active === link.id ? 'text-palm' : 'text-ink/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={siteConfig.resumeUrl}
                download
                className="flex items-center gap-2 py-3 text-base font-medium text-ink/80"
              >
                <Download size={16} /> Download resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
