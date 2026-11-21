import { useState } from 'react'
import { skillGroups } from '../data/skills'
import { projectsUsing } from '../lib/stats'
import { href } from '../lib/route'
import { Card, PageHeader } from '../components/ui'

function Skill({ name, selected, onSelect }) {
  const used = projectsUsing(name)
  return (
    <button
      onClick={() => onSelect(selected ? null : name)}
      aria-pressed={selected}
      className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        selected ? 'border-pill bg-pill text-white' : 'border-white/80 bg-white/60 text-ink hover:bg-white/85'
      }`}
    >
      {name}
      {used.length > 0 && (
        <span
          className={`rounded-full px-1.5 font-mono text-2xs ${
            selected ? 'bg-aqua text-ink' : 'bg-aqua/25 text-aqua-deep'
          }`}
        >
          {used.length}
        </span>
      )}
    </button>
  )
}

export default function Skills() {
  const [selected, setSelected] = useState(null)
  const used = selected ? projectsUsing(selected) : []

  return (
    <div>
      <PageHeader
        title="Skills"
        subtitle="The number on each skill is how many projects on this site use it. Pick one to see where."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {skillGroups.map((g) => (
            <Card key={g.group} title={g.group}>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <Skill key={s} name={s} selected={selected === s} onSelect={setSelected} />
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Card
          className="h-fit lg:sticky lg:top-4"
          title={selected ? `Projects using ${selected}` : 'Evidence'}
          subtitle={selected ? `${used.length} project${used.length === 1 ? '' : 's'}` : 'Select a skill'}
        >
          {selected && used.length === 0 && (
            <p className="text-xs text-ink-soft">Used in coursework and smaller repos, not in a featured project yet.</p>
          )}
          {!selected && (
            <p className="text-xs leading-relaxed text-ink-soft">
              Every skill here is tied to work you can open. Choose one on the left and the projects that use it show up here.
            </p>
          )}
          <ul className="space-y-1">
            {used.map((p) => (
              <li key={p.id}>
                <a
                  href={href('projects', p.id)}
                  data-sound="open"
                  className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink hover:bg-white/60"
                >
                  {p.title}
                  <span className="text-2xs text-ink-soft">{p.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
