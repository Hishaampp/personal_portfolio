import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LOG_LINES = [
  { prompt: '~/liwi-ai', cmd: 'git commit -m "ship speech scoring v2"', tag: 'ok' },
  { prompt: '~/liwi-ai', cmd: 'deploy --target=production', tag: 'ok' },
  { prompt: '~/liwi-ai', cmd: 'users.count()', out: '10,482 downloads' },
  { prompt: '~/booking-agent', cmd: 'git commit -m "add retry backoff"', tag: 'ok' },
  { prompt: '~/portfolio', cmd: 'status', out: 'open to full-time & co-founder roles' },
]

export default function BuildLog() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines >= LOG_LINES.length) return
    const delay = visibleLines === 0 ? 500 : 650
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [visibleLines])

  return (
    <div className="rounded-2xl bg-ink text-paper shadow-2xl shadow-ink/20 overflow-hidden border border-ink">
      <div className="flex items-center gap-2 px-5 py-3.5 bg-ink/90 border-b border-paper/10">
        <span className="w-2.5 h-2.5 rounded-full bg-rust/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-turmeric/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-palm-light/80" />
        <span className="ml-3 font-mono text-xs text-paper/50">build.log</span>
      </div>
      <div className="px-5 py-6 font-mono text-[13px] leading-7 min-h-[220px]">
        {LOG_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-turmeric/90">{line.prompt}</span>
            <span className="text-paper/40"> $ </span>
            <span className="text-paper/90">{line.cmd}</span>
            {line.tag === 'ok' && <span className="text-palm-light ml-2">✓</span>}
            {line.out && <div className="pl-4 text-paper/50">→ {line.out}</div>}
          </motion.div>
        ))}
        {visibleLines < LOG_LINES.length && (
          <span className="inline-block w-2 h-4 bg-turmeric align-middle animate-blink" />
        )}
      </div>
    </div>
  )
}
