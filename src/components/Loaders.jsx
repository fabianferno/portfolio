import { motion } from 'framer-motion'
import GithubLogo from '@/images/logos/github-white.png'
import Marquee from 'react-fast-marquee'
import Masonry from 'react-masonry-css'
import Image from 'next/image'

function LoaderCard(props) {
  return (
    <div className="p-shadow mx-3 bg-black">
      <div className="flex items-center justify-center bg-zinc-700">
        {props.github ? (
          <div className="flex items-center justify-center">
            <p className="text-sm text-zinc-400">Loading...</p>
            <Image
              src={GithubLogo}
              height={50}
              width={50}
              className="m-3 animate-bounce animate-pulse"
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

export function ProjectLoader(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="mt-20 text-right text-zinc-800"
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
        <LoaderCard github /> <LoaderCard github /> <LoaderCard github />
        <LoaderCard github /> <LoaderCard github /> <LoaderCard github />
      </Masonry>
    </motion.div>
  )
}

export function WorksLoader(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className=" bg-dark text-primary d-flex align-items-center justify-content-end text-right"
    >
      <Marquee
        className="projects-marquee"
        direction="right"
        speed={120}
        pauseOnHover
        gradient
        gradientWidth={0}
        gradientColor={[31, 31, 31]}
      >
        <LoaderCard /> <LoaderCard /> <LoaderCard /> <LoaderCard />{' '}
        <LoaderCard /> <LoaderCard />
      </Marquee>
    </motion.div>
  )
}
