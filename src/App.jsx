import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import CaseStudies from './components/CaseStudies'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  // When a project card links to a case study, this tells CaseStudies which one to scroll to.
  const [caseStudySlug, setCaseStudySlug] = useState(null)

  const openCaseStudy = (slug) => {
    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })
    // small delay so the section is in view before we scroll to the specific card inside it
    setTimeout(() => setCaseStudySlug(slug), 350)
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects onOpenCaseStudy={openCaseStudy} />
        <CaseStudies scrollToSlug={caseStudySlug} />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
