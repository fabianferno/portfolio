import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function ProjectsCard(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: -5 }}
      className="card bg-primary text-black m-5 d-flex align-items-center"
      style={{
        width: "20em",

        boxShadow:
          "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
      }}
    >
      {/* <img
        alt="Project Card"
        src={
          props.src
            ? props.src
            : "https://miro.medium.com/max/12032/1*E0AtatuxAJ1saRXZaF8BlQ.jpeg"
        }
        className="card-img-top"
      /> */}
      <div className="card-body">
        <h5 className="card-title font-weight-bold text-uppercase">
          Super Skywalker
        </h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Layout>
      <h1 className="hero mt-5 pb-3 text-center">
        My<span className="text-white "> Projects</span>
      </h1>
      <div>
        <Marquee
          direction="right"
          speed={30}
          gradient
          gradientWidth={100}
          gradientColor={[31, 31, 31]}
        >
          <ProjectsCard />
          <ProjectsCard />
          <ProjectsCard />
          <ProjectsCard />
          <ProjectsCard />
          <ProjectsCard />
          <ProjectsCard />
          <ProjectsCard />
        </Marquee>
      </div>
    </Layout>
  );
}
