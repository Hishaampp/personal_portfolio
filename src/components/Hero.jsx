import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import BuildLog from './BuildLog'

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-paper [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="font-mono text-xs text-palm tracking-tight mb-5">
              {siteConfig.role} · {siteConfig.location.split(',')[0]}, Kerala
            </p>

            <h1 className="font-display text-[2.75rem] leading-[1.08] md:text-6xl md:leading-[1.05] font-semibold text-ink mb-6">
              Building products that <span className="text-palm">solve real problems</span>
            </h1>

            <p className="text-lg text-muted max-w-prose mb-10 leading-relaxed">
              {siteConfig.summary}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ink text-paper font-semibold hover:bg-palm-dark transition-colors"
              >
                View my work <ArrowRight size={17} />
              </button>
              <a
                href={siteConfig.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-ink/15 text-ink font-semibold hover:border-palm hover:text-palm transition-colors"
              >
                <Download size={17} /> Download resume
              </a>
            </div>

            <div className="flex gap-10 border-t border-ink/10 pt-8">
              {siteConfig.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-ink">{s.value}</div>
                  <div className="text-sm text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <BuildLog />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
