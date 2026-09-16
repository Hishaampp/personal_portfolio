import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Briefcase,
  Send,
  Check,
  AlertCircle,
  Linkedin,
  Github,
  Twitter,
  DollarSign,
} from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import emailjs from '@emailjs/browser'
import { db } from '../lib/firebase'
import { siteConfig } from '../data/siteConfig'

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
  Fiverr: DollarSign,
}

const INFO_CARDS = [
  {
    icon: Mail,
    title: 'Email',
    body: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: 'Location',
    body: siteConfig.location,
  },
  {
    icon: Briefcase,
    title: 'Open to',
    body: siteConfig.openTo,
  },
]

const EMPTY_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_rx4xncz'
const EMAILJS_TEMPLATE_ID = 'template_rzsogts'
const EMAILJS_PUBLIC_KEY = 'DP8q4OBouDTzGsiDF'

function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')
  // idle | sending | sent | error

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      // Save message to Firebase Firestore
      await addDoc(collection(db, 'messages'), {
        ...form,
        createdAt: serverTimestamp(),
      })

      // Send email using EmailJS
           await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      // Reset form after successful submission
      setForm(EMPTY_FORM)
      setStatus('sent')
    } catch (error) {
      console.error('Failed to send message:', error)
      setStatus('error')
    } finally {
      setTimeout(() => {
        setStatus('idle')
      }, 3500)
    }
  }

  const isBusy = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-white/60 border border-ink/8 space-y-5"
    >
      {/* Name & Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-ink mb-2"
          >
            Your name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-ink/10 bg-paper focus:border-palm outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ink mb-2"
          >
            Your email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-ink/10 bg-paper focus:border-palm outline-none transition-colors"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-ink mb-2"
        >
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-ink/10 bg-paper focus:border-palm outline-none transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink mb-2"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-ink/10 bg-paper focus:border-palm outline-none transition-colors resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isBusy}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ink text-paper font-semibold hover:bg-palm-dark transition-colors disabled:opacity-70"
      >
        {status === 'sent' && (
          <>
            <Check size={17} />
            Message sent — thank you!
          </>
        )}

        {status === 'sending' && 'Sending…'}

        {status === 'error' && (
          <>
            <AlertCircle size={17} />
            Couldn't send — try again
          </>
        )}

        {status === 'idle' && (
          <>
            <Send size={17} />
            Send message
          </>
        )}
      </button>
    </form>
  )
}

function InfoCards() {
  return (
    <div className="flex flex-col gap-5">
      {INFO_CARDS.map((card) => {
        const Icon = card.icon
        const Wrapper = card.href ? 'a' : 'div'

        const wrapperProps = card.href
          ? { href: card.href }
          : {}

        return (
          <Wrapper
            key={card.title}
            {...wrapperProps}
            className="p-6 rounded-2xl bg-white/60 border border-ink/8"
          >
            <Icon
              size={20}
              className="text-palm mb-3"
              strokeWidth={1.75}
            />

            <h4 className="font-display font-semibold text-ink mb-1">
              {card.title}
            </h4>

            <p className="text-sm text-muted">
              {card.body}
            </p>
          </Wrapper>
        )
      })}
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="flex justify-center gap-4 mt-16">
      {siteConfig.socials.map((social) => {
        const Icon = SOCIAL_ICONS[social.label] || Mail

        return (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/60 border border-ink/8 text-ink hover:bg-palm hover:text-paper hover:-translate-y-1 transition-all duration-300"
          >
            <Icon size={19} />
          </a>
        )
      })}
    </div>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: '-80px',
          }}
          transition={{ duration: 0.5 }}
          className="max-w-prose mb-14"
        >
          <p className="font-mono text-xs text-palm mb-4">
            05 — get in touch
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
            Let's build something great
          </h2>

          <p className="text-muted leading-relaxed">
            Open to full-time roles, freelance projects, and co-founder
            opportunities.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-6">
          <InfoCards />
          <ContactForm />
        </div>

        {/* Social Links */}
        <SocialLinks />

      </div>
    </section>
  )
}