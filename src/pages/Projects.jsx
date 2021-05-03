import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "framer-motion";

function ProjectHighlights(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: -5 }}
      className="card bg-dark text-primary m-5 d-flex align-items-center"
      style={{
        width: "14em",

        boxShadow:
          "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
      }}
    >
      <div className="card-body d-flex align-content-between  flex-wrap">
        <h5 className="card-title col-12 p-0 font-weight-bold ">
          {props.title ? props.title : "Super Skywalker"}
        </h5>
        <p className="card-text col-12 p-0">
          {props.text
            ? props.text
            : "Some quick example text to build on the card title and make up the bulk of the card's content."}
        </p>
        <div className="col-12 p-0">{props.children}</div>
      </div>
    </motion.div>
  );
}

function ProjectsCard(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="card bg-dark text-primary m-5 d-flex align-items-center"
      style={{
        width: "14em",
        boxShadow:
          "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
      }}
    >
      <div className="card-body d-flex align-content-between  flex-wrap">
        <h5 className="card-title col-12 p-0 font-weight-bold ">
          {props.title ? props.title : "Super Skywalker"}
        </h5>
        <p className="card-text col-12 p-0">
          {props.text
            ? props.text
            : "Some quick example text to build on the card title and make up the bulk of the card's content."}
        </p>
        <div col-12 p-0>
          {props.children}
        </div>
      </div>
    </motion.div>
  );
}
function TechPills(props) {
  return (
    <span className="badge badge-pill badge-primary mr-1">{props.text}</span>
  );
}

export default function Projects() {
  return (
    <Layout contained>
      <p className="text-primary">&#47;&#47; fabianferno</p>
      <div id="project-highlights">
        <h1 className="pt-5 mt-5 pb-4 text-justify ">
          My<span className="text-white "> Projects</span>
        </h1>
        <p className="text-primary text-left mt-5 pb-4">
          Project<span className="text-white "> Highlights</span>
        </p>
        <div className="inner-shadow bg-black">
          <Marquee
            direction="right"
            speed={30}
            gradient
            gradientWidth={0}
            gradientColor={[31, 31, 31]}
          >
            <ProjectHighlights
              title="Elevate | Pattarai "
              text="Global Conference CfP - Built with React"
            >
              <TechPills text="React" />
              <TechPills text="Bootstrap" />
              <TechPills text="Framer-Motion" />
            </ProjectHighlights>

            <ProjectHighlights
              title="Best Money Gold"
              text="Website for the Gold Company with Gold Prices and Branch locators"
            >
              <TechPills text="Wordpress" />
              <TechPills text="Elementor" />
              <TechPills text="CMS" />
            </ProjectHighlights>

            <ProjectHighlights
              title="Kathir Kreations"
              text="Contact Website with smooth Fluid Animations"
            >
              <TechPills text="React" />
              <TechPills text="Bootstrap" />
              <TechPills text="Framer-Motion" />
            </ProjectHighlights>

            <ProjectHighlights
              title="Chettiar Chamber of Commerce"
              text="ASP.NET - Business Directory Listing and Membership Platform"
            >
              <TechPills text=".NET" />
              <TechPills text="Bootstrap" />
              <TechPills text="JQuery" />
            </ProjectHighlights>

            <ProjectHighlights
              title="xStack - Smart Thermometer"
              text="Temperature Monitoring Platform for the xStack Platform with device Firmware and software portal"
            >
              <TechPills text="NodeMCU" />
              <TechPills text="PHP" />
              <TechPills text="Bootstrap" />
            </ProjectHighlights>

            <ProjectHighlights
              title="Stretch Inc"
              text="Backend Development for the booking system with booking slot suggestions"
            >
              <TechPills text="PHP" />
              <TechPills text="firebase" />
              <TechPills text="Flask" />
              <TechPills text="PixelUI" />
            </ProjectHighlights>
          </Marquee>
        </div>
      </div>

      <div id="more-projects" className="mt-5 container">
        <p className="text-primary text-center pt-5">
          More<span className="text-white "> Projects</span>
        </p>

        <div className="inner-shadow bg-black">
          <ResponsiveMasonry
            columnsCount={3}
            className="mt-0 mt-md-5 container"
          >
            <Masonry>
              <ProjectsCard
                title="Mr. Robot"
                text="A feature packed discord meme bot with audio playbacks on demand"
              >
                <TechPills text="discord.py" />
                <TechPills text="FFMPeG" />
                <TechPills text="Wiki API" />
              </ProjectsCard>

              <ProjectsCard
                title="Reactor Pad"
                text="React Note Naking App with Firebase OAuth"
              >
                <TechPills text="React" />
                <TechPills text="MaterialUI" />
                <TechPills text="Firebase" />
              </ProjectsCard>

              <ProjectsCard
                title="Air Design Engineered Solutions Pvt Ltd"
                text="Fully responsive contact website, Search Engine Optimised"
              >
                <TechPills text="CSS" />
                <TechPills text="Bootstrap" />
                <TechPills text="HTML" />
              </ProjectsCard>

              <ProjectsCard
                title="Skywalker's Scripts"
                text="Personal Blog App - Built with Flutter"
              >
                <TechPills text="Flutter" />
                <TechPills text="Dart" />
                <TechPills text="Java" />
                <TechPills text="Koitlin" />
              </ProjectsCard>

              <ProjectsCard
                title="Quadrant Cross"
                text="Fully responsive website made with Bootstrap and React Animations"
              >
                <TechPills text="React" />
                <TechPills text="Bootstrap" />
                <TechPills text="HTML" />
              </ProjectsCard>

              <ProjectsCard
                title="Midaas Touch Events"
                text="Wordpress Website for an Event Management Company"
              >
                <TechPills text="Wordpress" />
                <TechPills text="Elementor" />
              </ProjectsCard>

              <ProjectsCard
                title="MaxNav - Prototype"
                text="Indoor Navigation App - For Smart India Hackathon"
              >
                <TechPills text="Java" />
                <TechPills text="AndroidStudio" />
                <TechPills text="AR-Core" />
              </ProjectsCard>
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </Layout>
  );
}
