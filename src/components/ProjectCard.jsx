import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project, index, onOpenCaseStudy }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className={`group rounded-2xl bg-white/60 border border-ink/8 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative bg-gradient-to-br from-palm/10 to-turmeric/10 overflow-hidden ${
          project.featured ? 'h-64' : 'h-44'
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {project.featured && (
          <span className="absolute top-4 right-4 text-[11px] font-mono font-medium tracking-tight px-3 py-1.5 rounded-full bg-ink text-paper">
            featured
          </span>
        )}
      </div>

      <div className="p-7">
        <h3 className="font-display text-xl font-semibold text-ink mb-2.5">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-palm/8 text-palm-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.metrics && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 border-t border-ink/8 mb-5 text-sm text-muted">
            {project.metrics.map((m) => (
              <span key={m.label}>{m.label}</span>
            ))}
          </div>
        )}

        {project.learnings && (
          <ul className="mb-5 space-y-2">
            {project.learnings.slice(0, 2).map((l) => (
              <li key={l} className="text-sm text-muted pl-4 relative leading-relaxed">
                <span className="absolute left-0 text-palm">→</span>
                {l}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-5 pt-1">
          {project.caseStudySlug && (
            <button
              onClick={() => onOpenCaseStudy(project.caseStudySlug)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-palm hover:gap-2.5 transition-all"
            >
              Read case study <ArrowRight size={15} />
            </button>
          )}
          {project.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink transition-colors"
            >
              {link.label.toLowerCase().includes('github') ? <Github size={15} /> : <ExternalLink size={15} />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
