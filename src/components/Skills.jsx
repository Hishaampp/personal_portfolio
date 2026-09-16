import { motion } from 'framer-motion'
import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-paperDim/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-prose mb-14"
        >
          <p className="font-mono text-xs text-palm mb-4">04 — technical arsenal</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Skills & technologies</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (ci % 3) * 0.08 }}
              className="p-7 rounded-2xl bg-white/60 border border-ink/8"
            >
              <h3 className="font-display font-semibold text-ink mb-6 pb-4 border-b border-ink/10">
                {cat.category}
              </h3>
              <div className="space-y-5">
                {cat.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-ink">{skill.name}</span>
                      <span className="font-mono text-xs text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-palm to-palm-light"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
