import { motion } from 'framer-motion'

export function HighlightsCard(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.08, rotate: -2 }}
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
            {props.technologies.map((tech, index) => (
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
      </motion.div>
    </a>
  )
}

export function GithubCard(props) {
  return (
    <a
      className="flex items-center justify-center"
      href={props.src}
      target="_blank"
      rel="noreferrer"
    >
      <motion.div
        initial={{ rotate: props.straight ? 0 : props.right ? 5 : -5 }}
        whileHover={
          props.threed
            ? {
                y: 10,
                x: 10,
                filter: 'invert(1) hue-rotate(20deg)',
              }
            : { scale: 1.08 }
        }
        className="p-shadow m-3 flex items-center rounded bg-black text-white"
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
            {props.technologies.map((tech, index) => (
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
      </motion.div>
    </a>
  )
}

export function BasicCard(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.1 }}
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
            {props.technologies.map((tech, index) => (
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
      </motion.div>
    </a>
  )
}
