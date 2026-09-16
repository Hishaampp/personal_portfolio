import { siteConfig } from '../data/siteConfig'

export default function Footer() {
  return (
    <footer className="py-10 bg-ink text-paper/70 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} {siteConfig.name}. Built with passion from Kerala.</p>
        <p className="text-xs mt-1.5 text-paper/40">Turning ideas into impact, one line of code at a time.</p>
      </div>
    </footer>
  )
}
