import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "framer-motion";

function ProjectHighlights(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.08, rotate: -2 }}
        className="card bg-black text-primary m-5 d-flex align-items-center"
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
          <p className="card-text text-secondary font-weight-normal col-12 p-0">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div className="col-12 p-0">{props.children}</div>
        </div>
      </motion.div>
    </a>
  );
}

function ProjectsCard(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="card bg-black text-primary m-5 m-md-5 d-flex align-items-center"
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
          <p className="card-text text-secondary font-weight-normal col-12 p-0">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div col-12 p-0>
            {props.children}
          </div>
        </div>
      </motion.div>
    </a>
  );
}
function TechPills(props) {
  return (
    <span className="badge badge-pill font-weight-bold badge-primary mr-1">
      {props.text}
    </span>
  );
}

function HighlightPills(props) {
  return (
    <span className="badge badge-pill font-weight-bold badge-primary  mr-1">
      {props.text}
    </span>
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
        <div className="inner-shadow bg-secondary">
          <Marquee
            direction="right"
            speed={30}
            gradient
            gradientWidth={0}
            gradientColor={[31, 31, 31]}
          >
            <ProjectHighlights
              src="https://github.com/fabianferno/mr.robot"
              title="Mr. Robot"
              text="Built a feature packed DISCORD bot with meme audio playbacks on demand. Used Wiki APIs to fetch data on query. Has text-to-speech playback features. Deployed and in use by 6 active servers."
            >
              <TechPills text="discord.py" />
              <TechPills text="FFMPeG" />
              <TechPills text="Python" />
              <TechPills text="Wiki API" />
            </ProjectHighlights>
            <ProjectHighlights
              title="Elevate | Pattarai "
              src="https://elevate.pattarai.in/"
              text="Global Conference CfP - Fully responsive event website built with React."
            >
              <HighlightPills text="React" />
              <HighlightPills text="Bootstrap" />
              <HighlightPills text="Framer-Motion" />
            </ProjectHighlights>

            <ProjectHighlights
              src="https://bestmoneygold.in/"
              title="Best Money Gold"
              text="Website for the Gold Company with Gold Prices and Branch locators"
            >
              <HighlightPills text="Wordpress" />
              <HighlightPills text="Elementor" />
              <HighlightPills text="CMS" />
            </ProjectHighlights>

            <ProjectHighlights
              src="https://kathirkreation.com/"
              title="Kathir Kreations"
              text="Built a contact website with React. Used Fluid animations for hero. User Framer motion for animated components."
            >
              <HighlightPills text="React" />
              <HighlightPills text="Bootstrap" />
              <HighlightPills text="Framer-Motion" />
            </ProjectHighlights>

            <ProjectHighlights
              title="Chettiar Chamber of Commerce"
              text="ASP.NET - Working on a Business Directory Listing and Membership Platform"
            >
              <HighlightPills text=".NET" />
              <HighlightPills text="Bootstrap" />
              <HighlightPills text="JQuery" />
            </ProjectHighlights>

            <ProjectHighlights
              src="https://github.com/pattarai/project-caliditas-firmware"
              title="xStack - Smart Thermometer"
              text="Temperature Monitoring Platform for the xStack Platform with device Firmware and software portal"
            >
              <HighlightPills text="NodeMCU" />
              <HighlightPills text="PHP" />
              <HighlightPills text="Embedded C" />
              <HighlightPills text="xStack" />
            </ProjectHighlights>

            <ProjectHighlights
              src="https://stretch-fe-master.herokuapp.com/"
              title="Stretch Inc UK"
              text="Built the backend for the booking system. Used Flask Python. Written Stripe Payment webhooks and APIs for company."
            >
              <HighlightPills text="PHP" />
              <HighlightPills text="Firebase" />
              <HighlightPills text="Flask | Python" />
              <HighlightPills text="Stripe" />
              <HighlightPills text="PixelUI" />
            </ProjectHighlights>
          </Marquee>
        </div>
      </div>

      <div id="more-projects" className="mt-5 container">
        <p className="text-primary text-left pt-5">
          More<span className="text-white "> Projects</span>
        </p>

        <div className="inner-shadow bg-secondary">
          <ResponsiveMasonry
            columnsCount={3}
            className="mt-0 mt-md-5 container"
          >
            <Masonry>
              <ProjectsCard
                src="https://github.com/fabianferno/reactor-pad"
                title="Reactor Pad"
                text="Built a Note Taking App with the React Library. Used Firebase to implement Google Sign-In. Used Firestore to store and retrieve the notes."
              >
                <TechPills text="React" />
                <TechPills text="MaterialUI" />
                <TechPills text="Bootstrap" />
                <TechPills text="Firebase" />
                <TechPills text="Firestore" />
                <TechPills text="Framer Motion" />
              </ProjectsCard>

              <ProjectsCard
                src="https://ades.in"
                title="Air Design Engineered Solutions Pvt Ltd"
                text="Built a fully responsive Simple Static contact website. Applied Search Engine Optimisations"
              >
                <TechPills text="CSS" />
                <TechPills text="Bootstrap" />
                <TechPills text="HTML" />
                <TechPills text="SEO" />
              </ProjectsCard>

              <ProjectsCard
                src="https://midaastouch.in/wordpress/"
                title="Midaas Touch Events"
                text="Wordpress Website for an Event Management Company"
              >
                <TechPills text="Wordpress" />
                <TechPills text="Elementor" />
              </ProjectsCard>

              <ProjectsCard
                src="https://github.com/fabianferno/personal-blog-app"
                title="Skywalker's Scripts"
                text="Build a multi page cross-platform blog app in Flutter | Used various views and Pub.Dev libraries to create animated components"
              >
                <TechPills text="Flutter" />
                <TechPills text="Dart" />
                <TechPills text="Java" />
                <TechPills text="Android" />
                <TechPills text="Cross Platform" />
              </ProjectsCard>

              <ProjectsCard
                src="https://github.com/fabianferno/max-nav-v1"
                title="MaxNav - Prototype"
                text="Built a Native Android app to measure steps, use compass and started working on mapping an indoor. Aim to build an indoor navigation system. "
              >
                <TechPills text="Java" />
                <TechPills text="Native" />
                <TechPills text="Android Studio" />
                <TechPills text="AR-Core" />
              </ProjectsCard>

              <ProjectsCard
                src="https://simeradesigns.github.io/quadrantcross/"
                title="Quadrant Cross"
                text="Built a Simple Static single-page website with Bootstrap. Added React Animations and CSS animations."
              >
                <TechPills text="React" />
                <TechPills text="Bootstrap" />
                <TechPills text="HTML" />
              </ProjectsCard>

              <ProjectsCard
                src="https://github.com/fabianferno"
                title="Fablab - Interior Design"
                text="Designed the complete concept model of the licet fablab. Furniture designing, Realistic Rendering"
              >
                <TechPills text="Sketchup 3D" />
                <TechPills text="Interior Designing" />
                <TechPills text="TheaRender" />
              </ProjectsCard>
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </Layout>
  );
}
