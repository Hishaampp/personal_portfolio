// Pulls public GitHub activity into src/data/github.json at build time.
// Runs in CI with the workflow's GITHUB_TOKEN, or locally with `gh auth token`.
// If anything fails, the committed github.json is kept, so the build never breaks.
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const LOGIN = 'Hishaampp'
const OUT = fileURLToPath(new URL('../src/data/github.json', import.meta.url))

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN
  try {
    return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return null
  }
}

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
    repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        url
        pushedAt
        stargazerCount
        primaryLanguage { name }
        languages(first: 8, orderBy: {field: SIZE, direction: DESC}) { edges { size node { name } } }
      }
    }
  }
}`

async function main() {
  const t = token()
  if (!t) {
    console.warn('[sync-github] no token; keeping committed github.json')
    return
  }
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${t}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  })
  const json = await res.json()
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? res.status))

  const user = json.data.user
  const cal = user.contributionsCollection.contributionCalendar
  const days = cal.weeks.flatMap((w) => w.contributionDays).map((d) => [d.date, d.contributionCount])

  const langBytes = {}
  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      langBytes[edge.node.name] = (langBytes[edge.node.name] ?? 0) + edge.size
    }
  }

  const data = {
    syncedAt: new Date().toISOString(),
    login: LOGIN,
    totalContributions: cal.totalContributions,
    publicRepos: user.repositories.totalCount,
    stars: user.repositories.nodes.reduce((n, r) => n + r.stargazerCount, 0),
    days,
    languages: Object.entries(langBytes)
      .sort((a, b) => b[1] - a[1])
      .map(([name, bytes]) => ({ name, bytes })),
    recentRepos: user.repositories.nodes.slice(0, 6).map((r) => ({
      name: r.name,
      url: r.url,
      pushedAt: r.pushedAt,
      language: r.primaryLanguage?.name ?? null,
    })),
  }
  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(`[sync-github] ${data.totalContributions} contributions, ${data.publicRepos} public repos`)
}

main().catch((err) => {
  console.warn('[sync-github] failed; keeping committed github.json:', err.message)
})
