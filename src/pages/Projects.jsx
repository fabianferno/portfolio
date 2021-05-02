import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function ProjectsCard(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: -5 }}
      className="card bg-dark text-primary m-5 d-flex align-items-center"
      style={{
        width: "12em",
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
      />  */}
      <div className="card-body">
        <h5 className="card-title font-weight-bold ">
          {props.title ? props.title : "Super Skywalker"}
        </h5>
        <p className="card-text">
          {props.text
            ? props.text
            : "Some quick example text to build on the card title and make up the bulk of the card's content."}
        </p>
        {props.children}
      </div>
    </motion.div>
  );
}

function TechPills(props) {
  return <span class="badge badge-pill badge-primary mx-1">{props.text}</span>;
}

export default function Projects() {
  return (
    <Layout contained>
      <h1 className="hero mt-5 pb-3 text-center">
        My<span className="text-white "> Projects</span>
      </h1>
      <div className="inner-shadow bg-black">
        <Marquee
          direction="right"
          speed={30}
          gradient
          gradientWidth={0}
          gradientColor={[31, 31, 31]}
        >
          <ProjectsCard
            title="Quadrant Cross"
            text="Fully responsive contact website"
          >
            <TechPills text="React" />
            <TechPills text="Bootstrap" />
            <TechPills text="HTML" />
          </ProjectsCard>

          <ProjectsCard
            title="Quadrant Cross"
            text="Fully responsive contact website"
          >
            <TechPills text="React" />
            <TechPills text="Bootstrap" />
            <TechPills text="HTML" />
          </ProjectsCard>
        </Marquee>
      </div>
    </Layout>
  );
}
