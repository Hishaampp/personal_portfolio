import github from '../data/github.json'
import { projects } from '../data/projects'
import { skillAliases } from '../data/skills'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// GitHub contributions summed per calendar month, oldest first.
export function contributionsByMonth() {
  const map = new Map()
  for (const [date, count] of github.days ?? []) {
    const key = date.slice(0, 7)
    map.set(key, (map.get(key) ?? 0) + count)
  }
  return [...map.entries()].map(([key, value]) => {
    const [y, m] = key.split('-').map(Number)
    return { key, label: MONTHS[m - 1], year: y, value }
  })
}

// Days grouped into weeks (columns) for the heatmap; each week starts on Sunday.
export function contributionWeeks(lastWeeks = 53) {
  const days = github.days ?? []
  const weeks = []
  let week = []
  for (const [date, count] of days) {
    const dow = new Date(`${date}T00:00:00Z`).getUTCDay()
    if (dow === 0 && week.length) {
      weeks.push(week)
      week = []
    }
    week.push({ date, count, dow })
  }
  if (week.length) weeks.push(week)
  return weeks.slice(-lastWeeks)
}

export function languageShare(top = 4) {
  const langs = github.languages ?? []
  const total = langs.reduce((n, l) => n + l.bytes, 0) || 1
  const head = langs.slice(0, top).map((l) => ({ name: l.name, share: l.bytes / total }))
  const rest = 1 - head.reduce((n, l) => n + l.share, 0)
  return rest > 0.005 ? [...head, { name: 'Other', share: rest }] : head
}

export function projectsUsing(skill) {
  const names = [skill, ...(skillAliases[skill] ?? [])]
  return projects.filter((p) => p.stack.some((s) => names.includes(s)))
}

export const projectCounts = {
  total: projects.length,
  live: projects.filter((p) => p.status === 'Live').length,
  building: projects.filter((p) => p.status !== 'Live').length,
}

export function timeAgo(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, secs] of units) {
    const n = Math.floor(s / secs)
    if (n >= 1) return `${n} ${unit}${n > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

export { github }
