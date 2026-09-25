import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { useEffect, useState, Fragment, SVGProps } from 'react'
import { motion } from 'framer-motion'
import SafeLayout from '@/components/SafeLayout'
import Masonry from 'react-masonry-css'
import { ProjectLoader } from '@/components/Loaders'
import { GithubCard } from '@/components/ProjectCards'

interface Project {
  html_url: string
  name: string
  description: string | null
  topics: string[] | undefined
  emoji: string
  private: boolean
  homepage?: string
}

interface ProjectCardProps {
  project: Project
  key: string | number
}

function ProjectCard({ project, key }: ProjectCardProps) {
  return (
    <Card as="li" key={key}>
      <Link href={project.html_url} target="blank">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          {project.emoji}
        </div>
      </Link>
      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <Card.Link
          target="blank"
          href={
            project.private ? project.homepage || '' : project.html_url || ''
          }
        >
          {project.name}
        </Card.Link>
      </h2>
      <Card.Description>{project.description || 'No description available'}</Card.Description>
      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <span className="">
          {project.topics?.map((topic, index) => (
            <span
              key={index}
              className="my-1 mr-1 inline-flex items-center rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <svg
                className="-ml-0.5 mr-1.5 h-2 w-2 text-zinc-600"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx={4} cy={4} r={3} />
              </svg>
              {topic}
            </span>
          ))}
        </span>
      </p>
    </Card>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function getProjects() {
    try {
      const res = await fetch('/api/projects')
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          body.error || `Request failed with status ${res.status}`
        )
      }
      const data: Project[] = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Failed to load projects:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong loading projects.'
      )
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  const Shimmer = ({ n }: { n: number }) => {
    let shimmers = []
    for (let i = 0; i < n; i++) {
      shimmers.push(
        <Card className="m-2">
          <div className="w-80 animate-pulse rounded bg-zinc-200 py-4 shadow-md dark:bg-zinc-900 sm:w-80">
            <div className="flex space-x-4 p-4 sm:px-8">
              <div className="h-16 w-16 flex-shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-700"></div>
              <div className="flex-1 space-y-4 py-2">
                <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-700"></div>
                <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-700"></div>
              </div>
            </div>
            <div className="space-y-4 p-4 sm:px-8">
              <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-700"></div>
              <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-700"></div>
              <div className="h-4 w-3/4 rounded bg-zinc-100 dark:bg-zinc-700"></div>
            </div>
          </div>
        </Card>
      )
    }

    return <div className="md:flex">{shimmers}</div>
  }

  return (
    <>
      <Head>
        <title>Projects - Fabian Ferno</title>
        <meta
          name="description"
          content="Hello there, I'm Fabian Ferno. Things I’ve made trying to put my dent in the universe."
        />
      </Head>
      <SimpleLayout
        title="things i’ve made trying to put my dent in the universe."
        intro="i’ve worked on tons of little projects over the years that can be found at my personal code museum, github. i've listed them here for your convenience. in case you're still wondering, i specialize in
        rapidly building scalable softwares, architecting distributed systems, & web3 protocols."
      >
        <div className="-mt-16 md:mb-5 shadow">
          <div className="flex">
            <div className=" flex-1 md:flex md:justify-between">
              <p className="text-sm text-zinc-600 ">
                Live from the
                <a
                  href="https://docs.github.com/en/rest"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 font-bold text-zinc-600 hover:text-zinc-500"
                >
                  GitHub API
                </a>
              </p>
            </div>
          </div>
        </div>

        <SafeLayout>
          {loader ? (
            <ProjectLoader />
          ) : error ? (
            <div className="rounded-lg border border-zinc-200 p-6 text-sm dark:border-zinc-700/50">
              <p className="font-medium text-zinc-800 dark:text-zinc-100">
                Couldn’t load projects right now.
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {error}
              </p>
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                In the meantime, you can browse them directly on{' '}
                <a
                  href="https://github.com/fabianferno?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-zinc-600 hover:text-zinc-500 dark:text-zinc-300"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No projects to show yet.
            </p>
          ) : (
            <div className="-ml-[5px] md:-ml-[10px] ">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Masonry
                  breakpointCols={{
                    default: 3,
                    1100: 3,
                    700: 1,
                    500: 1,
                  }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column p-wall-tilt container -mt-10 md:-mt-8"
                >
                  {projects.map((project, index) =>
                    project.topics?.includes('readme-profile') === false &&
                      project.topics?.includes('ignore') === false ? (
                      <GithubCard
                        threed
                        straight
                        key={index}
                        src={project.html_url}
                        title={project.name}
                        text={project.description || undefined}
                        technologies={project.topics}
                      />
                    ) : null
                  )}
                </Masonry>
              </motion.div>
            </div>
          )}
        </SafeLayout>
      </SimpleLayout>
    </>
  )
}
