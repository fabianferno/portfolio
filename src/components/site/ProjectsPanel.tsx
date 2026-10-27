import { useEffect, useState } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

interface Project {
  html_url: string
  name: string
  description: string | null
  topics: string[] | undefined
  private: boolean
  homepage?: string
}

const card =
  'overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] [text-shadow:none]'

export function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects')
      .then((r) => {
        if (!r.ok) throw new Error(`Request failed with status ${r.status}`)
        return r.json()
      })
      .then((data: Project[]) => !cancelled && setProjects(data))
      .catch(() => !cancelled && setError(true))
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className={`${card} px-6 py-5 text-[15px]`}>
        <p className="font-medium">Couldn’t load projects right now.</p>
        <p className="mt-1 text-sm text-zinc-500">
          Browse them directly on{' '}
          <a
            href="https://github.com/fabianferno?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            data-hand
            className="font-semibold underline underline-offset-2"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    )
  }

  if (!projects) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center rounded-2xl bg-white/10 text-sm text-white/60">
        Fetching repos…
      </div>
    )
  }

  let visible = projects.filter(
    (p) => !p.topics?.includes('readme-profile') && !p.topics?.includes('ignore')
  )

  return (
    <div className={`${card} divide-y divide-zinc-200`}>
      {visible.map((project) => (
        <a
          key={project.html_url}
          href={project.private ? project.homepage || project.html_url : project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          data-hand
          className="block px-6 py-4 outline-none transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100"
        >
          <span className="flex items-center justify-between gap-4">
            <span className="min-w-0 truncate text-[16px] font-medium leading-snug">
              {project.name}
            </span>
            <ArrowUpRightIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
          </span>
          {project.description && (
            <span className="mt-1 block text-sm leading-relaxed text-zinc-600">
              {project.description}
            </span>
          )}
          {project.topics && project.topics.length > 0 && (
            <span className="mt-2 flex flex-wrap gap-1.5">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600"
                >
                  {topic}
                </span>
              ))}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
