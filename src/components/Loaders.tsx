
import GithubLogo from '@/images/logos/github-white.png'
import Marquee from 'react-fast-marquee'
import Masonry from 'react-masonry-css'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface LoaderCardProps {
  github?: boolean
  title?: string
  description?: string
  image?: string
  link?: string
}

function LoaderCard(props: LoaderCardProps) {
  return (
    <div className="p-shadow rounded-2xl">
      <div className="flex py-5 items-center justify-center rounded-2xl bg-black">
        {props.github ? (
          <div className="flex items-center justify-center">
            <p className="text-sm text-zinc-400">Loading...</p>
            <Image
              src={GithubLogo}
              height={50}
              width={50}
              className="m-3 animate-pulse"
              alt="Loader"
              srcset=""
            />
          </div>
        ) : (
          <div className="mx-2 text-zinc-600" role="status"></div>
        )}
      </div>
    </div>
  )
}

interface ProjectLoaderProps {
  children?: React.ReactNode
}

export function ProjectLoader(props: ProjectLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="mt-[180px] -ml-[5px] md:mt-24 text-right text-zinc-800 md:-ml-2">
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 1,
            500: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column p-wall-tilt"
        >
          <LoaderCard github /> <LoaderCard github /> <LoaderCard github />
          <LoaderCard github /> <LoaderCard github /> <LoaderCard github />
        </Masonry>
      </div>
    </motion.div>
  )
}

interface WorksLoaderProps {
  children?: React.ReactNode
}

export function WorksLoader(props: WorksLoaderProps) {
  return (
    <div
      className=" bg-dark text-primary d-flex align-items-center justify-content-end text-right"
    >
      <Marquee
        className="projects-marquee"
        direction="right"
        speed={120}
        pauseOnHover
        gradient
        gradientWidth={0}
        gradientColor="rgb(31, 31, 31)"
      >
        <LoaderCard /> <LoaderCard /> <LoaderCard /> <LoaderCard />{' '}
        <LoaderCard /> <LoaderCard />
      </Marquee>
    </div>
  )
}
