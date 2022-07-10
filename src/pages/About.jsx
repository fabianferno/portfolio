import Layout from "../layouts/Layout";
import Kathir from "../assets/img/project-screenshots/kathirkreations.gif";
import Duck from "../assets/img/cherryb.gif";
import { Loader } from "../components/AboutLoader";

import { useEffect, useState } from "react";

function TechPills(props) {
  return (
    <span className="badge badge-pill badge-black p-2 mr-1 mt-1">
      {props.text}
    </span>
  );
}

export default function About() {
  // const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/users?cache=true")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //setProfileData(data);
        setIsLoading(false);
      })
      .catch((error) => setIsLoading(false));
  }, []);

  function Resume() {
    return (
      <section
        id="resume"
        className="resume text-left text-secondary inner-shadow card-rounded bg-black pl-2 pl-md-5 pb-5"
      >
        <div className="container ">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="font-weight-bold text-white pt-5">Education</h3>

              <div className="resume-item">
                <h4>B.Tech Information Technology</h4>
                <h5>June 2019 Present</h5>
                <p>
                  <em>
                    Loyola ICAM College of Engineering and Technology, Chennai
                  </em>
                </p>
                <p>
                  Member of the Fablab Committee <br />
                  Part of Media Relations <br />
                </p>
              </div>

              <div className="resume-item">
                <h4>Circle Program | Design</h4>
                <h5>APRIL 2019 - AUGUST 2019 (5M)</h5>
                <p>
                  Academy of Digital Arts, Chennai <br /> Graphic Designing and
                  Illustrations, Digital Communication and Media/Multimedia
                </p>
                <p>
                  Adobe Photoshop <br /> Adobe illustrator <br /> Adobe InDesign{" "}
                  <br /> Corel Draw <br />
                  Adobe Premiere Pro
                </p>
              </div>

              <div className="resume-item">
                <h4>N5, Japanese Studies</h4>
                <h5>FEB 2019 - JUNE 2019 (3M)</h5>
                <p>
                  Hayakawa Japanese Language School & Cultural Center, Chennai
                </p>
                <p>Completed JLPT N5, CJAT 1.</p>
              </div>

              <div className="resume-item">
                <h4>HSC &amp; SSLC</h4>
                <h5>2005 – 2019</h5>
                <p>Don Bosco Mat. Hr. Sec. School, Egmore, Chennai</p>
                <p>
                  President of Red Ribbon Club <br /> Member of Bharat Scouts{" "}
                  <br />
                  Cultural Media Team
                </p>
              </div>

              <h3 className="resume-title pt-5">Certifications</h3>

              <div className="resume-item">
                <h4>Google</h4>
                <p>Google IT Automation with Python Professional Certificate</p>
                <p>Digital Marketing with Google</p>
                <p>Google Technical Support Fundamentals</p>
              </div>

              <div className="resume-item">
                <h4>Coursera</h4>
                <p>System Administration and IT Infrastructure Services</p>
                <p>Power User - Operating System</p>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="resume-title pt-5">Experience</h3>
              <div className="resume-item">
                <h4>Pattarai</h4>
                <h5>2020 - Present</h5>
                <p>President and Co-Founder</p>
                <p>
                  I run Pattarai, LICET's flagship project club. We aim to give
                  engineers, the engineering experience. Helped organise 8
                  events and lead more than 3 projects personally.
                </p>
              </div>

              <div className="resume-item card bg-black d-flex">
                <iframe
                  style={{ marginLeft: "-20px" }}
                  className="card-body"
                  height={315}
                  src="https://www.youtube.com/embed/gQRX1UlQ0Rs"
                  title="Pattarai"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="resume-item">
                <h4>SÍMERA DESIGNS, Chennai</h4>
                <h5>2019 - 2020</h5>
                <p>Co-Founder and Designer</p>
                <p>
                  A design company. <br /> Web Developers, Graphic Designers,
                  Videography, Photography, Mockups, Video Editing, etc.
                </p>
              </div>
              <div className="resume-item">
                <h4>INNOWELL GROUP, Dubai </h4>
                <h5>2019 – 2020 (9 months)</h5>
                <p>Freelance Graphic Designer</p>
              </div>
              <div className="resume-item ">
                <h4>Kathir Kreations</h4>
                <h5>NOV 2020 - MAY 2021</h5>
                <p>
                  Web Developer and Graphic Designer <br />- Part time{" "}
                </p>
                <img src={Kathir} className="img-fluid pr-4" alt="" srcSet="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Layout className="pt-5">
      <div
        style={{
          marginTop: "140px",
        }}
        className="pt-3 text-right container"
      >
        <div className="d-md-flex d-block align-items-center">
          <div className="order-2 order-md-1 text-secondary pb-3 text-right d-flex flex-column justify-content-center align-items-end col-md-7 col-12">
            <h1
              style={{
                fontSize: "7vh",
              }}
              className="text-primary font-weight-bold text-right pb-2"
            >
              About <span className="text-white">Me.</span>
            </h1>
            <p>
              A sentient engineer who loves talking tech and building scalable,
              cross-platform, decentralised apps and SaaS products. Dabbling
              with IoT and the Web3 ecosystem. Co-founded{" "}
              <a href="https://www.pattarai.in">Pattarai</a> - a tech community
              with more than 650 members. Currently, helping accelerate the
              world’s adoption of NFTs and cryptocurrency as an asset class of
              their own at <a href="https://www.nftconomy.io">NFTconomy</a>.
            </p>
          </div>
          <div className="col-md-5 col-12 order-md-2 order-1">
            <img
              className="p-shadow img-fluid mb-5"
              src={Duck}
              style={{
                borderRadius: "5%",
              }}
              alt=""
              srcSet=""
            />
          </div>
        </div>

        <div className="text-secondary text-right container mb-5 pb-5">
          <div id="design" className="pt-5">
            <p className="text-primary  pr-2">
              Things I've played with for a while now
            </p>
            {[
              "Solidity",
              "IPFS",
              "Blockchain",
              "Python",
              "Embedded C",
              "TypeScript",
              "JavaScript - ES6",
              "AssemblyScript",
              "CSS3/SASS",
              "php",
              "C#",
              "HTML",
              "Prisma",
              "Micrsoft SQL",
              "MariaDB",
              "MySQL",
              "PostgreSQL",
              "MongoDB",
              "SQLite",
              "Firestore",
              "HarperDB",
              "ReactJS",
              "NextJS",
              "NodeJS",
              "ExpressJS",
              "Flask",
              "axios",
              "Bootstrap",
              "ASP.NET",
              "Tailwind CSS",
              "Framer Motion",
              "ThreeJS",
              "Wordpress",
              "Git",
              "Postman",
              "Cloudflare",
              "npm",
              "GitHub",
              "cPanel",
              "Apache",
              "nginx",
              "Arduino",
              "Micropython",
              "Github Actions",
              "Linux - Ubuntu, Kali, Fedora",
              "Supabase",
              "Firebase",
              "Selenium",
              "Wireframing",
              "Photoshop",
              "Illustrator",
              "Premiere Pro",
              "Adobe XD",
              "After Effects",
              "Cinema4D",
              "Sketchup3D",
              "Unreal Engine",
            ].map((text, index) => (
              <TechPills key={index} text={text} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
