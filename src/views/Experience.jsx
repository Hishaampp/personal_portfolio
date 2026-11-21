import { GraduationCap, Briefcase } from 'lucide-react'
import { education, experience } from '../data/timeline'
import { siteConfig } from '../data/siteConfig'
import { Card, PageHeader } from '../components/ui'

function Timeline({ items, icon: Icon }) {
  return (
    <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-ink/15">
      {items.map((item) => (
        <li key={item.title + item.org} className="relative flex gap-4">
          <span
            className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${
              item.current ? 'border-aqua bg-aqua text-ink shadow-lift' : 'border-white/80 bg-white/70 text-ink'
            }`}
          >
            <Icon size={15} />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[13px] font-semibold text-ink">{item.title}</p>
              <p className="font-mono text-2xs text-ink-soft">{item.period}</p>
            </div>
            <p className="text-xs text-ink-soft">
              {item.org}
              {item.current && <span className="ml-2 font-semibold text-aqua-deep">Current</span>}
            </p>
            {item.points && (
              <ul className="mt-2 space-y-1">
                {item.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-xs leading-relaxed text-ink-soft">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Experience() {
  return (
    <div>
      <PageHeader
        title="Experience"
        subtitle={`${siteConfig.status}. Before that, a BCA at Manipal University Jaipur, a startup of my own and client work from day one.`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Education">
          <Timeline items={education} icon={GraduationCap} />
        </Card>
        <Card title="Work">
          <Timeline items={experience} icon={Briefcase} />
        </Card>
      </div>
    </div>
  )
}
