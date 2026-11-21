// Skills are grouped for reading; the site counts how many projects in
// projects.js use each one, so every skill carries its evidence.
export const skillGroups = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Dart', 'Python', 'SQL', 'C++', 'Java'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML & CSS', 'Framer Motion'] },
  { group: 'Mobile', items: ['Flutter', 'Riverpod', 'Drift', 'Play & App Store release'] },
  { group: 'Backend & data', items: ['Node.js', 'Express', 'FastAPI', 'Supabase', 'PostgreSQL', 'Firebase', 'MongoDB', 'WebSocket'] },
  { group: 'Cloud & tools', items: ['AWS', 'Vercel', 'Git & GitHub', 'GitHub Actions', 'Vitest', 'Figma'] },
  { group: 'AI & payments', items: ['OpenAI API', 'Google Cloud Speech', 'Razorpay'] },
]

// A skill also counts a project whose stack lists one of these names.
export const skillAliases = {
  SQL: ['PostgreSQL', 'SQLite', 'Supabase'],
  JavaScript: ['React', 'Node.js'],
  'HTML & CSS': ['Tailwind CSS'],
  Dart: ['Flutter'],
  'Google Cloud Speech': [],
}
