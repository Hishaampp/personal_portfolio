import { motion } from 'framer-motion'
import { Code2, Lightbulb, Users, TrendingUp } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

const ICONS = [Code2, Lightbulb, Users, TrendingUp]

export default function About() {
  const { about } = siteConfig

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-palm mb-4">01 — who I am</p>
            <p className="font-display text-2xl md:text-3xl font-medium text-ink leading-snug mb-6 max-w-prose">
              {about.lead}
            </p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-muted leading-relaxed mb-5 max-w-prose">
                {p}
              </p>
            ))}

            <div className="flex gap-4 p-6 rounded-2xl bg-palm/5 border-l-4 border-palm mt-8">
              <div>
                <h4 className="font-display font-semibold text-ink mb-1.5">{about.highlight.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{about.highlight.body}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {about.cards.map((card, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-white/50 border border-ink/8 hover:border-palm/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={22} className="text-palm mb-3" strokeWidth={1.75} />
                  <h4 className="font-display font-semibold text-ink mb-1.5">{card.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{card.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
