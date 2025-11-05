import { motion } from 'framer-motion'

interface HighlightsCardProps {
  src: string
  title?: string
  text?: string
  image?: string
  technologies?: string[]
  children?: React.ReactNode
}

export function HighlightsCard(props: HighlightsCardProps) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <div
        className="m-5 flex items-center bg-black"
        style={{
          width: '14em',
          boxShadow:
            '0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)',
        }}
      >
        <div className="flex w-full flex-wrap content-between p-4">
          <h5 className="w-full p-0 font-bold">
            {props.title ? props.title : 'Super Skywalker'}
          </h5>
          <p className="w-full p-0 font-normal text-gray-400">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div className="w-full p-0">
            {props.technologies?.map((tech, index) => (
              <span
                key={index}
                className="mr-1 inline-block rounded-full bg-blue-500 px-2.5 py-0.5 font-bold text-white"
              >
                {tech}
              </span>
            ))}
            {props.children}
          </div>
        </div>
      </div>
    </a>
  )
}

interface GithubCardProps {
  src: string
  title?: string
  text?: string
  image?: string
  straight?: boolean
  right?: boolean
  threed?: boolean
  technologies?: string[]
  children?: React.ReactNode
}

export function GithubCard(props: GithubCardProps) {
  return (
    <a
      className="my-7 flex items-center justify-center"
      href={props.src}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className="p-shadow m-3 flex items-center rounded-2xl bg-black text-white"
        style={{
          width: '20em',
        }}
      >
        <div className="flex w-full flex-wrap content-between p-4">
          <h5 className="w-full p-0 font-bold">
            {props.title ? props.title : 'Super Skywalker'}
          </h5>
          <p className="w-full p-0 font-normal text-zinc-400">
            {props.text
              ? props.text
              : "This is another cool project I'm working on. I forgot to add a description to this project. I'll add it soon dw."}
          </p>
          <div className="mt-3 w-full">
            {props.technologies?.map((tech, index) => (
              <span
                key={index}
                className="mb-1 mr-1 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-sm text-white"
              >
                {tech}
              </span>
            ))}
            {props.children}
          </div>
        </div>
      </div>
    </a>
  )
}

interface BasicCardProps {
  src: string
  title?: string
  text?: string
  image?: string
  children?: React.ReactNode
  technologies?: string[]
}

export function BasicCard(props: BasicCardProps) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <div
        className="mx-5 my-5 flex items-center bg-black md:m-5"
        style={{
          width: '14em',
          boxShadow:
            '0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)',
        }}
      >
        <div className="flex w-full flex-wrap content-between p-4">
          <h5 className="w-full p-0 font-bold">
            {props.title ? props.title : 'Super Skywalker'}
          </h5>
          <p className="w-full p-0 font-normal text-gray-400">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div className="w-full p-0">
            {props.technologies?.map((tech, index) => (
              <span
                key={index}
                className="mr-1 inline-block rounded-full bg-blue-500 px-2.5 py-0.5 font-bold text-white"
              >
                {tech}
              </span>
            ))}
            {props.children}
          </div>
        </div>
      </div>
    </a>
  )
}
