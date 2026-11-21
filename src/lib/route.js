import { useEffect, useState } from 'react'

// Tiny hash router: #/projects, #/projects/vault. Hash routes work on GitHub
// Pages without a 404 fallback, and every view stays linkable.
export const VIEWS = ['overview', 'projects', 'experience', 'skills', 'activity', 'contact']

function parse() {
  const [view, item] = window.location.hash.replace(/^#\/?/, '').split('/')
  return { view: VIEWS.includes(view) ? view : 'overview', item: item || null }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function href(view, item) {
  return `#/${view}${item ? `/${item}` : ''}`
}

export function go(view, item) {
  window.location.hash = href(view, item)
}
