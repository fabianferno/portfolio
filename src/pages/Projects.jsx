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
          </a>{" "}
          .
        </p>

        {isLoading ? (
          <Loader />
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <h4
              style={{
                transform: "rotate3d(0.5, -0.866, 0, 20deg) rotateZ(-1deg)",
              }}
              className="text-primary text-center pt-5"
            >
              Web<span className="text-white "> Apps</span>
            </h4>

            <Marquee
              style={{
                margin: "0 -2rem 0 -2rem",
                width: "110vw",
                transform: " rotate3d(0.5, -0.866, 0, 20deg) rotateZ(-1deg)",
              }}
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
            <h4
              style={{
                transform: "rotate3d(0.5, -0.866, 0, 20deg) rotateZ(-1deg)",
              }}
              className="text-primary text-center pt-5"
            >
              Freelance<span className="text-white "> Projects</span>
            </h4>

            <Marquee
              style={{
                margin: "0 -2rem 0 -2rem",
                width: "110vw",
                transform: " rotate3d(0.5, -0.866, 0, 20deg) rotateZ(-1deg)",
              }}
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

            <div
              style={{
                transform: "rotate3d(0.5, -0.866, 0, 20deg) rotateZ(-1deg)",
              }}
              id="more-projects"
              className="mt-5 "
            >
              <h4 className="text-primary text-center pt-5">
                Other<span className="text-white "> Projects</span>
              </h4>

              <div className="inner-shadow bg-secondary">
                <ResponsiveMasonry
                  columnsCount={3}
                  className="mt-0 mt-md-5 container"
                >
                  <Masonry>
                    {projects.map((project, index) =>
                      project.topics.includes("web-app") === false &&
                      project.topics.includes("freelance") === false &&
                      project.topics.includes("readme-profile") === false &&
                      project.topics.includes("ignore") === false ? (
                        <GithubCard
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
