import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import octokit from "../components/githubConfig";

import { GithubCard } from "../components/ProjectCards";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    await octokit
      .request(`GET /user/repos`, {
        per_page: "100",
        affiliation: "owner",
      })
      .then((res) => {
        console.log(res.data);

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
          style={{ fontSize: "5rem" }}
          className="text-black bg-primary text-center mt-5 pt-3"
        >
          PROJECTS
        </h1>

        <p className="text-primary text-center pt-5">
          Web<span className="text-white "> Apps</span>
        </p>

        <Marquee
          direction="left"
          speed={150}
          pauseOnHover
          gradient
          gradientWidth={0}
          gradientColor={[31, 31, 31]}
        >
          {projects.map((project, index) =>
            project.topics.includes("web-app") ? (
              <GithubCard
                key={index}
                src={project.html_url}
                title={project.name}
                text={project.description}
                technologies={project.topics}
              />
            ) : null
          )}
        </Marquee>

        <p className="text-primary text-center pt-5">
          Freelance<span className="text-white "> Projects</span>
        </p>

        <Marquee
          direction="right"
          speed={150}
          pauseOnHover
          gradient
          gradientWidth={0}
          gradientColor={[31, 31, 31]}
        >
          {projects.map((project, index) =>
            project.topics.includes("freelance") ? (
              <GithubCard
                key={index}
                src={project.html_url}
                title={project.name}
                text={project.description}
                technologies={project.topics}
              />
            ) : null
          )}
        </Marquee>

        <div id="more-projects" className="mt-5 ">
          <p className="text-primary text-center pt-5">
            Other<span className="text-white "> Projects</span>
          </p>

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
      </div>
    </Layout>
  );
}
