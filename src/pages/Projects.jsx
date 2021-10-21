import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import octokit from "../components/Github";

import {
  HighlightsCard,
  BasicCard,
  GithubCard,
} from "../components/ProjectCards";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    const response = await octokit.request("GET /users/fabianferno/repos", {
      username: "fabianferno",
    });
    setProjects(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Layout contained>
      <div className="mt-5 pt-5">
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
              pauseOnHover
              direction="right"
              speed={30}
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              <HighlightsCard
                src="https://github.com/fabianferno/mr.robot"
                title="Mr. Robot"
                text="Built a feature packed DISCORD bot with meme audio playbacks on demand. Used Wiki APIs to fetch data on query. Has text-to-speech playback features. Deployed and in use by 6 active servers."
                technologies={["discord.py", "FFMPeG", "Python", "Wiki API"]}
              />
              <HighlightsCard
                title="Elevate | Pattarai "
                src="https://elevate.pattarai.in/"
                text="Global Conference CfP - Fully responsive event website built with React."
                technologies={["React", "Bootstrap", "Framer-Motion"]}
              />

              <HighlightsCard
                src="https://bestmoneygold.in/"
                title="Best Money Gold"
                text="Website for the Gold Company with Gold Prices and Branch locators"
                technologies={["Wordpress", "Elementor", "CMS"]}
              />

              <HighlightsCard
                src="https://kathirkreation.com/"
                title="Kathir Kreations"
                text="Built a contact website with React. Used Fluid animations for hero. User Framer motion for animated components."
                technologies={["React", "Bootstrap", "Framer-Motion"]}
              />

              <HighlightsCard
                title="Chettiar Chamber of Commerce"
                text="ASP.NET - Working on a Business Directory Listing and Membership Platform"
                technologies={["ASP.NET", "Bootstrap", "jQuery"]}
              />

              <HighlightsCard
                src="https://github.com/pattarai/project-caliditas-firmware"
                title="xStack - Smart Thermometer"
                text="Temperature Monitoring Platform for the xStack Platform with device Firmware and software portal"
                technologies={["NodeMCU", "php", "Embedded C", "xStack"]}
              />

              <HighlightsCard
                src="https://stretch-fe-master.herokuapp.com/"
                title="Stretch Inc UK"
                text="Built the backend for the booking system. Used Flask Python. Written Stripe Payment webhooks and APIs for company."
                technologies={[
                  "php",
                  "Firebase SDK",
                  "Flask | Python",
                  "Stripe Payments",
                ]}
              />
            </Marquee>
          </div>
        </div>

        <p className="text-primary text-left pt-5">
          Github<span className="text-white "> Repos</span>
        </p>

        <Marquee
          direction="left"
          speed={150}
          gradient
          gradientWidth={100}
          gradientColor={[31, 31, 31]}
        >
          {projects.map((project) => (
            <GithubCard
              src={project.html_url}
              title={project.name}
              text={project.description}
              technologies={project.topics}
            />
          ))}
        </Marquee>
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
                <BasicCard
                  src="https://github.com/fabianferno/reactor-pad"
                  title="Reactor Pad"
                  technologies={[
                    "React",
                    "Material UI",
                    "Bootstrap",
                    "Firebase SDK",
                    "Firestore DB",
                    "Framer Motion",
                  ]}
                  text="Built a Note Taking App with the React Library. Used Firebase to implement Google Sign-In. Used Firestore to store and retrieve the notes."
                />

                <BasicCard
                  src="https://ades.in"
                  technologies={["Bootstrap CSS", "SEO"]}
                  title="Air Design Engineered Solutions Pvt Ltd"
                  text="Built a fully responsive Simple Static contact website. Applied Search Engine Optimisations"
                />

                <BasicCard
                  src="https://midaastouch.in/wordpress/"
                  title="Midaas Touch Events"
                  technologies={["Wordpress", "Elementor"]}
                  text="Wordpress Website for an Event Management Company"
                />

                <BasicCard
                  src="https://github.com/fabianferno/personal-blog-app"
                  title="Skywalker's Scripts"
                  technologies={[
                    "Flutter",
                    "Dart",
                    "Java",
                    "Android",
                    "Cross Platform Dev",
                  ]}
                  text="Build a multi page cross-platform blog app in Flutter | Used various views and Pub.Dev libraries to create animated components"
                />

                <BasicCard
                  src="https://github.com/fabianferno/max-nav-v1"
                  title="MaxNav - Prototype"
                  technologies={["Java", "Native", "Android Studio", "AR-Core"]}
                  text="Built a Native Android app to measure steps, use compass and started working on mapping an indoor. Aim to build an indoor navigation system. "
                />

                <BasicCard
                  src="https://simeradesigns.github.io/quadrantcross/"
                  title="Quadrant Cross"
                  technologies={["React", "Bootstrap", "SVG"]}
                  text="Built a Simple Static single-page website with Bootstrap. Added React Animations and CSS animations."
                />

                <BasicCard
                  src="https://github.com/fabianferno"
                  title="Fablab - Interior Design"
                  technologies={[
                    "Sketchup 3D",
                    "Interior Designing",
                    "TheaRender",
                  ]}
                  text="Designed the complete concept model of the licet fablab. Furniture designing, Realistic Rendering"
                />
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
    </Layout>
  );
}
