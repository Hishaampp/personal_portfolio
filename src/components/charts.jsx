import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { contributionWeeks } from '../lib/stats'

// Vertical bars with a light grid; the latest bar is highlighted with its value.
export function BarChart({ data, height = 180 }) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(null)
  const max = Math.max(1, ...data.map((d) => d.value))
  const ticks = niceTicks(max)
  const top = ticks[ticks.length - 1]
  const focus = hover ?? data.length - 1

  return (
    <div className="flex gap-3">
      <div className="flex flex-col justify-between pb-6 text-right font-mono text-2xs text-ink-faint" style={{ height }}>
        {[...ticks].reverse().map((t) => (
          <span key={t} className="-translate-y-1/2 leading-none first:translate-y-0 last:translate-y-0">
            {t}
          </span>
        ))}
      </div>
      <div className="relative flex-1">
        <div className="absolute inset-x-0 top-0 flex flex-col justify-between" style={{ height: height - 24 }}>
          {ticks.map((t) => (
            <div key={t} className="border-t border-dashed border-ink/10" />
          ))}
        </div>
        <div className="relative flex items-end gap-1.5 sm:gap-3" style={{ height: height - 24 }}>
          {data.map((d, i) => {
            const pct = (d.value / top) * 100
            const isFocus = i === focus
            return (
              <div
                key={d.key}
                className="group relative flex h-full flex-1 flex-col justify-end"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {isFocus && (
                  <span
                    className="absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-pill px-1.5 py-0.5 font-mono text-2xs text-white"
                    style={{ bottom: `calc(${Math.max(pct, 2)}% + 6px)` }}
                  >
                    {d.value}
                  </span>
                )}
                <motion.div
                  className={`mx-auto w-full max-w-9 rounded-t-md ${
                    isFocus ? 'bg-aqua shadow-lift' : 'bg-aqua/55'
                  }`}
                  initial={reduce ? false : { height: 0 }}
                  animate={{ height: `${Math.max(pct, 1.5)}%` }}
                  transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex gap-1.5 sm:gap-3">
          {data.map((d) => (
            <span key={d.key} className="flex-1 text-center text-2xs text-ink-faint">
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function niceTicks(max) {
  const step = max <= 4 ? 1 : max <= 10 ? 2 : max <= 25 ? 5 : max <= 60 ? 10 : max <= 150 ? 25 : 50
  const ticks = []
  for (let t = 0; t <= max + step - 1; t += step) ticks.push(t)
  if (ticks[ticks.length - 1] < max) ticks.push(ticks[ticks.length - 1] + step)
  return ticks
}

export const DONUT_COLORS = ['#1ec4e0', '#f4a63a', '#3ccf91', '#f2715f', '#8aa4ab']

export function Donut({ data, size = 150, stroke = 18, center }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(255 255 255 / 0.6)" strokeWidth={stroke} />
        {data.map((d, i) => {
          const len = d.share * c
          const gap = data.length > 1 ? 3 : 0
          const el = (
            <motion.circle
              key={d.name}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${Math.max(len - gap, 0)} ${c}`}
              strokeDashoffset={-offset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            />
          )
          offset += len
          return el
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{center}</div>
    </div>
  )
}

const LEVELS = ['bg-white/55', 'bg-aqua/30', 'bg-aqua/55', 'bg-aqua/80', 'bg-aqua']

function level(count) {
  if (count === 0) return 0
  if (count <= 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

// GitHub-style contribution grid: one column per week, rows Sun–Sat.
export function Heatmap({ weeks: weekCount = 26, cell = 'h-3 w-3' }) {
  const weeks = contributionWeeks(weekCount)
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex w-max gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, dow) => {
              const day = week.find((d) => d.dow === dow)
              if (!day) return <span key={dow} className={`${cell}`} />
              return (
                <span
                  key={dow}
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                  className={`${cell} rounded-[3px] border border-white/40 ${LEVELS[level(day.count)]}`}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-2xs text-ink-faint">
        Less
        {LEVELS.map((l) => (
          <span key={l} className={`h-2.5 w-2.5 rounded-[3px] border border-white/40 ${l}`} />
        ))}
        More
      </div>
    </div>
  )
}
