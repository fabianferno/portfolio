import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import octokit from "../components/githubConfig";
import { Loader } from "../components/ProjectLoader";
import { motion } from "framer-motion";

import { GithubCard } from "../components/ProjectCards";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoader] = useState(true);

  async function getProjects() {
    await octokit
      .request(`GET /user/repos`, {
        per_page: "100",
        affiliation: "owner",
      })
      .then((res) => {
        setLoader(false);
        setProjects(res.data);
      });
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Layout>
      <div className="mt-5 pt-5">
        <h1
          style={{
            fontSize: "7vh",
            width: "110vw",
            marginLeft: "-5vw",
          }}
          className="text-black font-weight-bold bg-secondary shadow text-center mt-5 pt-3 pb-1"
        >
          PROJECTS
        </h1>

        <p className="text-secondary text-center pt-2 px-4">
          All projects in this page are fetched live from the{" "}
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noreferrer"
          >
            GitHub API
          </a>
        </p>

        {isLoading ? (
          <Loader />
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div id="web-apps" className="mt-5 pt-5">
              <h4 className="text-primary text-center pt-5 pb-md-5 mb-md-5">
                &lt; Web<span className="text-white "> Apps</span> / &gt;
              </h4>

              <Marquee
                className="projects-marquee"
                direction="right"
                speed={120}
                pauseOnHover
                gradient
                gradientWidth={0}
                gradientColor={[31, 31, 31]}
              >
                {projects.map((project, index) =>
                  project.topics.includes("web-app") ? (
                    <GithubCard
                      threed
                      straight
                      key={index}
                      src={project.html_url}
                      title={project.name}
                      text={project.description}
                      technologies={project.topics}
                    />
                  ) : null
                )}
                {projects.map((project, index) =>
                  project.topics.includes("web-app") ? (
                    <GithubCard
                      threed
                      straight
                      key={index}
                      src={project.html_url}
                      title={project.name}
                      text={project.description}
                      technologies={project.topics}
                    />
                  ) : null
                )}
              </Marquee>
            </motion.div>

            <motion.div id="freelance" className="mt-5 pt-5">
              <h4 className="text-primary text-center pt-5 pb-md-5 mb-md-5">
                - Freelance<span className="text-white "> Hustle</span> -
              </h4>

              <Marquee
                className="projects-marquee"
                direction="left"
                speed={120}
                pauseOnHover
                gradient
                gradientWidth={0}
                gradientColor={[31, 31, 31]}
              >
                {projects.map((project, index) =>
                  project.topics.includes("freelance") ? (
                    <GithubCard
                      threed
                      straight
                      key={index}
                      src={project.html_url}
                      title={project.name}
                      text={project.description}
                      technologies={project.topics}
                    />
                  ) : null
                )}
                {projects.map((project, index) =>
                  project.topics.includes("freelance") ? (
                    <GithubCard
                      threed
                      straight
                      key={index}
                      src={project.html_url}
                      title={project.name}
                      text={project.description}
                      technologies={project.topics}
                    />
                  ) : null
                )}
              </Marquee>
            </motion.div>

            <div id="more-projects" className="mt-5 pt-5">
              <div className="rounded ">
                <h4 className=" text-primary text-center py-5 ">
                  Other<span className="text-white "> Projects</span>
                </h4>
                <ResponsiveMasonry columnsCount={1} className="mr-5 mr-md-3">
                  <Masonry className="container p-wall-tilt">
                    {projects.map((project, index) =>
                      project.topics.includes("web-app") === false &&
                      project.topics.includes("freelance") === false &&
                      project.topics.includes("readme-profile") === false &&
                      project.topics.includes("ignore") === false ? (
                        <GithubCard
                          threed
                          straight
                          key={index}
                          src={project.html_url}
                          title={project.name}
                          text={project.description}
                          technologies={project.topics}
                        />
                      ) : null
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </Layout>
  );
}
