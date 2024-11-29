import Image from 'next/image'
import Head from 'next/head'
import { Octokit } from '@octokit/core'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { useEffect, useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import Marquee from 'react-fast-marquee'
import SafeLayout from '@/components/SafeLayout'
import Masonry from 'react-masonry-css'
import { ProjectLoader } from '@/components/Loaders'
import { GithubCard } from '@/components/ProjectCards'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ProjectCard({ project, key }) {
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
      <Card.Description>{project.description}</Card.Description>
      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <span className="">
          {project.topics.map((topic, index) => (
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
  const [projects, setProjects] = useState([])
  const [loader, setLoader] = useState(true)

  async function getProjects() {
    await octokit
      .request(`GET /user/repos`, {
        per_page: '100',
        affiliation: 'owner',
        sort: 'updated',
      })
      .then((res) => {
        setLoader(false)
        let result = res.data.map((project) => {
          return {
            ...project,
            //  Generate random people emojis
            emoji: String.fromCodePoint(
              0x1f600 + Math.floor(Math.random() * 80)
            ),
          }
        })

        result = result.filter((project) => !project.topics.includes('ignore'))
        console.log(result)
        setProjects(result)
      })
  }

  useEffect(() => {
    getProjects()
  }, [])

  const Shimmer = ({ n }) => {
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
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the years that can be found at my personal code museum, GitHub. I've listed them here for your convenience. In case you're still wondering, I specialize in
        creating scalable enterprise software solutions, architecting distributed systems, & seamless cross-platform apps. Currently exploring the horizons of AI."
      >
        <div className="-mt-16 mb-5 shadow">
          <div className="flex">
            <div className=" flex-1 md:flex md:justify-between">
              <p className="text-sm text-zinc-600 ">
                All the projects in this page are fetched live from the
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
          ) : (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="-ml-[120px] mr-10 md:-ml-[65px]"
            >
              <Masonry
                breakpointCols={{
                  default: 3,
                  1100: 3,
                  700: 1,
                  500: 1,
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column p-wall-tilt container"
              >
                {projects.map((project, index) =>
                  project.topics.includes('readme-profile') === false &&
                  project.topics.includes('ignore') === false ? (
                    <GithubCard
                      threed
                      straight
                      key={index}
                      src={project.html_url}
                      title={project.name}
                      text={project.description}
                      technologies={project.topics}
                    />
                  ) : null
                )}
              </Masonry>
            </motion.section>
          )}
        </SafeLayout>
      </SimpleLayout>
    </>
  )
}
