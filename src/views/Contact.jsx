import { useState } from 'react'
import { Mail, MapPin, Briefcase, Send, Check, AlertCircle, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { play } from '../lib/sound'
import { Card, PageHeader } from '../components/ui'

const EMAILJS_SERVICE_ID = 'service_rx4xncz'
const EMAILJS_TEMPLATE_ID = 'template_rzsogts'
const EMAILJS_PUBLIC_KEY = 'DP8q4OBouDTzGsiDF'

const EMPTY = { name: '', email: '', subject: '', message: '' }

const inputClass =
  'w-full rounded-xl border border-white/80 bg-white/65 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-aqua focus:bg-white/85 focus:outline-none focus:ring-2 focus:ring-aqua/40'

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      // Firebase and EmailJS load only when someone actually sends a message.
      const [{ collection, addDoc, serverTimestamp }, { db }, { default: emailjs }] = await Promise.all([
        import('firebase/firestore'),
        import('../lib/firebase'),
        import('@emailjs/browser'),
      ])
      await addDoc(collection(db, 'messages'), { ...form, createdAt: serverTimestamp() })
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, title: form.subject, message: form.message },
        EMAILJS_PUBLIC_KEY,
      )
      setForm(EMPTY)
      setStatus('sent')
      play('success')
    } catch (error) {
      console.error('Failed to send message:', error)
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name">
          <input id="name" name="name" required value={form.name} onChange={update} className={inputClass} autoComplete="name" />
        </Field>
        <Field id="email" label="Your email">
          <input id="email" name="email" type="email" required value={form.email} onChange={update} className={inputClass} autoComplete="email" />
        </Field>
      </div>
      <Field id="subject" label="Subject">
        <input id="subject" name="subject" required value={form.subject} onChange={update} className={inputClass} placeholder="Internship, freelance project, collaboration…" />
      </Field>
      <Field id="message" label="Message">
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={update} className={`${inputClass} resize-y`} />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" data-sound="none" disabled={status === 'sending'} className="btn-pill px-5 py-2.5 text-[13px] disabled:opacity-70">
          <Send size={14} />
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p role="status" className="text-xs">
          {status === 'sent' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-mint-deep">
              <Check size={14} /> Sent. I’ll reply within a day or two.
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-coral-deep">
              <AlertCircle size={14} /> Couldn’t send. Try again, or email me directly.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}

export default function Contact() {
  const info = [
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: 'Location', value: siteConfig.location },
    { icon: Briefcase, label: 'Open to', value: siteConfig.openTo },
  ]
  return (
    <div>
      <PageHeader title="Contact" subtitle="Internships, freelance work or a project you want built: send a message and it lands in my inbox." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div className="space-y-4">
          <Card>
            <ul className="space-y-4">
              {info.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-3">
                  <span className="icon-chip shrink-0">
                    <Icon size={15} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-2xs font-medium text-ink-soft">{label}</p>
                    {href ? (
                      <a href={href} className="break-all text-[13px] font-semibold text-ink underline-offset-2 hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[13px] font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Elsewhere">
            <ul className="-mx-2">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-lg px-2 py-2 text-[13px] font-medium text-ink hover:bg-white/60"
                  >
                    {s.label}
                    <ArrowUpRight size={14} className="text-ink-faint group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <Card title="Send a message">
          <ContactForm />
        </Card>
      </div>
    </div>
  )
}
