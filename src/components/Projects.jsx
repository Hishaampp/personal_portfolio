import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects({ onOpenCaseStudy }) {
  return (
    <section id="projects" className="py-24 md:py-32 bg-paperDim/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-prose mb-14"
        >
          <p className="font-mono text-xs text-palm mb-4">02 — my work</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
            Real products, real users
          </h2>
          <p className="text-muted leading-relaxed">
            Six things I've shipped, from a production app with a five-figure user base to freelance work for
            clients overseas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpenCaseStudy={onOpenCaseStudy} />
          ))}
        </div>
      </div>
    </section>
  )
}
