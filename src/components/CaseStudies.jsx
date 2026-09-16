import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Lightbulb, Layers, Mountain, TrendingUp, GraduationCap } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
}

function CaseStudy({ study, registerRef }) {
  return (
    <div
      ref={(el) => registerRef(study.slug, el)}
      className="rounded-3xl bg-white/60 border border-ink/8 p-8 md:p-14 scroll-mt-28"
    >
      <div className="border-b border-ink/10 pb-8 mb-12">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2">{study.title}</h3>
        <p className="text-muted mb-5">{study.subtitle}</p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
          <span>{study.period}</span>
          <span>{study.role}</span>
          <span>{study.duration}</span>
        </div>
      </div>

      <div className="space-y-14">
        <motion.div {...fadeUp}>
          <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink mb-4">
            <AlertCircle size={20} className="text-palm" /> The problem
          </h4>
          <p className="text-muted leading-relaxed mb-6 max-w-prose">{study.problem.body}</p>
          <div className="grid grid-cols-3 gap-4">
            {study.problem.stats.map((s) => (
              <div key={s.label} className="text-center p-5 rounded-xl bg-palm/5">
                <div className="font-display text-2xl font-semibold text-palm-dark">{s.value}</div>
                <div className="text-xs text-muted mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp}>
          <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink mb-4">
            <Lightbulb size={20} className="text-palm" /> The solution
          </h4>
          <p className="text-muted mb-4">{study.solution.body}</p>
          <ul className="space-y-3">
            {study.solution.points.map((p) => (
              <li key={p.label} className="p-4 rounded-lg bg-paperDim/60 border-l-4 border-palm">
                <span className="font-semibold text-ink">{p.label}:</span>{' '}
                <span className="text-muted">{p.detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp}>
          <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink mb-4">
            <Layers size={20} className="text-palm" /> Technical architecture
          </h4>
          <div className="space-y-3">
            {study.stack.map((layer) => (
              <div key={layer.layer} className="p-4 rounded-lg bg-paperDim/60 border-l-4 border-turmeric">
                <div className="font-mono text-xs font-semibold text-ink mb-1">{layer.layer}</div>
                <div className="text-sm text-muted">{layer.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp}>
          <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink mb-4">
            <Mountain size={20} className="text-palm" /> Key challenges
          </h4>
          <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-ink/10">
            {study.challenges.map((c, i) => (
              <div key={c.title} className="relative">
                <span className="absolute -left-8 top-0 w-[19px] h-[19px] rounded-full bg-palm text-paper text-[10px] font-mono font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <h5 className="font-display font-semibold text-ink mb-2">{c.title}</h5>
                <p className="text-sm text-muted mb-1.5">
                  <span className="font-medium text-ink/70">Challenge:</span> {c.challenge}
                </p>
                <p className="text-sm text-muted">
                  <span className="font-medium text-ink/70">Solution:</span> {c.solution}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp}>
          <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink mb-4">
            <TrendingUp size={20} className="text-palm" /> Results & impact
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {study.results.map((r) => (
              <div key={r.label} className="text-center p-5 rounded-xl bg-gradient-to-br from-palm/5 to-turmeric/5">
                <div className="font-display text-2xl font-semibold text-ink">{r.value}</div>
                <div className="text-xs text-muted mt-1.5">{r.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="p-8 rounded-2xl bg-ink text-paper">
          <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold mb-6">
            <GraduationCap size={20} className="text-turmeric" /> Key learnings
          </h4>
          <div className="grid md:grid-cols-2 gap-5">
            {study.learnings.map((l) => (
              <div key={l.title} className="p-5 rounded-xl bg-paper/5 border-l-4 border-turmeric">
                <h5 className="font-semibold mb-1.5">{l.title}</h5>
                <p className="text-sm text-paper/60 leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CaseStudies({ scrollToSlug }) {
  const refs = useRef({})

  const registerRef = (slug, el) => {
    refs.current[slug] = el
  }

  useEffect(() => {
    if (scrollToSlug && refs.current[scrollToSlug]) {
      refs.current[scrollToSlug].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [scrollToSlug])

  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-prose mb-14"
        >
          <p className="font-mono text-xs text-palm mb-4">03 — deep dives</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">Case studies</h2>
          <p className="text-muted leading-relaxed">Behind the scenes of building a real product, end to end.</p>
        </motion.div>

        <div className="space-y-16">
          {caseStudies.map((study) => (
            <CaseStudy key={study.slug} study={study} registerRef={registerRef} />
          ))}
        </div>
      </div>
    </section>
  )
}
