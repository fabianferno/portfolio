import { motion } from "framer-motion";
import GithubLogo from "../assets/img/github-white.png";
import Marquee from "react-fast-marquee";

function LoaderCard(props) {
  return (
    <div className="card mx-3 card-body p-shadow bg-black rounded">
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-grow text-secondary mx-2" role="status"></div>{" "}
        <div className="spinner-grow text-secondary mx-2" role="status"></div>
        {props.github ? (
          <img
            src={GithubLogo}
            height="100px"
            width="100px"
            className="mx-4"
            alt=""
            srcset=""
          />
        ) : (
          <div className="spinner-grow text-secondary mx-2" role="status"></div>
        )}
      </div>
    </div>
  );
}

export function ProjectLoader(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="mt-5 bg-dark text-primary d-flex align-items-center justify-content-end text-right"
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
        <LoaderCard github /> <LoaderCard github /> <LoaderCard github />
        <LoaderCard github /> <LoaderCard github /> <LoaderCard github />
      </Marquee>
    </motion.div>
  );
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
        <LoaderCard /> <LoaderCard /> <LoaderCard /> <LoaderCard />{" "}
        <LoaderCard /> <LoaderCard />
      </Marquee>
    </motion.div>
  );
}
