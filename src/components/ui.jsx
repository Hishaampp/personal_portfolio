import { motion } from 'framer-motion'

export function Card({ title, subtitle, action, children, className = '', as: Tag = 'section' }) {
  return (
    <Tag className={`glass-card p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-semibold text-ink">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-ink-soft">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </Tag>
  )
}

const STATUS = {
  Live: 'bg-mint/20 text-mint-deep border-mint/40',
  'In development': 'bg-aqua/20 text-aqua-deep border-aqua/40',
  Planning: 'bg-amber/20 text-amber-deep border-amber/40',
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-2xs font-semibold ${STATUS[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/80 bg-white/60 px-1.5 py-0.5 text-2xs font-medium text-ink-soft">
      {children}
    </span>
  )
}

// Segmented control with a sliding pill (one layoutId per control).
// tone="light" sits inside a glass card; tone="dark" sits on the wallpaper.
export function Segmented({ id, options, value, onChange, tone = 'light' }) {
  const light = tone === 'light'
  return (
    <div
      role="tablist"
      className={`inline-flex rounded-full p-0.5 ${
        light ? 'border border-white/70 bg-white/45' : 'glass-dark'
      }`}
    >
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        const active = val === value
        return (
          <button
            key={val}
            role="tab"
            aria-selected={active}
            data-sound="nav"
            onClick={() => onChange(val)}
            className={`relative whitespace-nowrap rounded-full px-3 py-1 text-2xs font-semibold transition-colors duration-200 ${
              active
                ? light
                  ? 'text-white'
                  : 'text-ink'
                : light
                  ? 'text-ink-soft hover:text-ink'
                  : 'text-side hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                className={`absolute inset-0 rounded-full ${light ? 'bg-pill' : 'bg-white'}`}
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

// Page title, set directly on the teal wallpaper.
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-1 pt-1">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold text-white sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-side">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
