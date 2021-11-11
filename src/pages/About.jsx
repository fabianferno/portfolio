import Layout from "../layouts/Layout";
import Kathir from "../assets/img/project-screenshots/kathirkreations.gif";
import Duck from "../assets/img/walking-duck.gif";
import { motion } from "framer-motion";
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

  return (
    <Layout className="pt-5">
      <motion.div
        style={{
          marginTop: "140px",
        }}
        animate={{ backgroundColor: ["#0af", "#fa0", "#f88", "#55f"] }}
        transition={{
          duration: 3,
          repeat: "Infinity",
          repeatType: "reverse",
        }}
        className="h1 shadow text-center pt-2"
      >
        <img src={Duck} style={{ height: "200px" }} alt="" srcSet="" />
        <h1
          className="text-black font-weight-bold pb-3"
          style={{ fontSize: "7vh" }}
        >
          ABOUT ME
        </h1>
      </motion.div>
      <div className="pt-3 mt-5 text-center container">
        <p className="text-secondary pb-3 text-center">
          I am a software engineer with 3 years of professional experience in
          developing & designing. I co-founded & help run Pattarai - a tech
          community. I love to build scalable web apps, cross-platform apps, IoT
          systems & multimedia. I’m currently pursuing my Bachelor of Technology
          in Information Technology at Loyola - ICAM College of Engineering and
          Technology (LICET).
        </p>

        <div className="text-secondary text-center  p mb-5 pb-5">
          <div id="languages" className="pt-5">
            <p className="text-primary">Languages</p>
            {[
              "Python",
              "Embedded C",
              "JavaScript - ES6",
              "CSS3/SASS",
              "Dart",
              "Java",
              "php",
              "C#",
              "HTML",
            ].map((text, index) => (
              <TechPills key={index} text={text} />
            ))}
          </div>
          <div id="databases" className="pt-5">
            <p className="text-primary ">Databases</p>
            {[
              "Micrsoft SQL",
              "MariaDB",
              "MySQL",
              "PostgreSQL",
              "MongoDB",
              "SQLite",
              "Firestore",
              "HarperDB",
            ].map((text, index) => (
              <TechPills key={index} text={text} />
            ))}
          </div>

          <div id="frameworks" className="pt-5">
            <p className="text-primary ">Frameworks and Libraries</p>
            {[
              "ReactJS",
              "NextJS",
              "ExpressJS",
              "Flask | Python",
              "axios",
              "Bootstrap",
              "jQuery",
              "ASP.NET",
              "styled-components",
              "Material UI",
              "Tailwind UI",
              "discord.py",
              "Framer Motion",
              "ThreeJS",
              "Wordpress",
            ].map((text, index) => (
              <TechPills key={index} text={text} />
            ))}
          </div>

          <div id="tools" className="pt-5">
            <p className="text-primary ">Tools</p>
            {[
              "Git",
              "Postman",
              "repl.it",
              "Cloudflare",
              "IFTTT",
              "jQuery",
              "npm",
              "GitHub",
              "cPanel",
              "Apache",
              "SSH",
              "nginx",
              "ArduinoIDE",
              "Micropython",
              "Netlify",
              "Heroku",
              "Vercel",
              "Github Actions",
              "Linux",
              "Supabase",
              "Firebase",
              "Selenium",
            ].map((text, index) => (
              <TechPills key={index} text={text} />
            ))}
          </div>

          <div id="design" className="pt-5">
            <p className="text-primary ">Creative Design</p>
            {[
              "Wireframing",
              "Photoshop",
              "Illustrator",
              "InDesign",
              "Premiere Pro",
              "Adobe XD",
              "Filmora",
              "After Effects",
              "Cinema4D",
              "Sketchup3D",
              "Unity3D",
              "Unreal Engine",
              "Thearender",
            ].map((text, index) => (
              <TechPills key={index} text={text} />
            ))}
          </div>
        </div>

        {/* ======= Resume Section ======= */}
        {isLoading ? (
          <Loader />
        ) : (
          <section
            id="resume"
            className="resume text-left text-secondary inner-shadow card-rounded bg-black pl-2 pl-md-5 pb-5"
          >
            <div className="container ">
              <div className="row">
                <div className="col-lg-6">
                  <h3 className="font-weight-bold text-white pt-5">
                    Education
                  </h3>

                  {/* {profileData.education.map((edu, index) => (
                    <div className="text-white mb-4" key={index}>
                      <h6 className="text-uppercase text-primary">
                        {edu.schoolName}
                      </h6>
                    </div>
                  ))} */}

                  <div className="resume-item">
                    <h4>B.Tech Information Technology</h4>
                    <h5>June 2019 Present</h5>
                    <p>
                      <em>
                        Loyola ICAM College of Engineering and Technology,
                        Chennai
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
                      Academy of Digital Arts, Chennai <br /> Graphic Designing
                      and Illustrations, Digital Communication and
                      Media/Multimedia
                    </p>
                    <p>
                      Adobe Photoshop <br /> Adobe illustrator <br /> Adobe
                      InDesign <br /> Corel Draw <br />
                      Adobe Premiere Pro
                    </p>
                  </div>

                  <div className="resume-item">
                    <h4>N5, Japanese Studies</h4>
                    <h5>FEB 2019 - JUNE 2019 (3M)</h5>
                    <p>
                      Hayakawa Japanese Language School & Cultural Center,
                      Chennai
                    </p>
                    <p>Completed JLPT N5, CJAT 1.</p>
                  </div>

                  <div className="resume-item">
                    <h4>HSC &amp; SSLC</h4>
                    <h5>2005 – 2019</h5>
                    <p>Don Bosco Mat. Hr. Sec. School, Egmore, Chennai</p>
                    <p>
                      President of Red Ribbon Club <br /> Member of Bharat
                      Scouts <br />
                      Cultural Media Team
                    </p>
                  </div>

                  <h3 className="resume-title pt-5">Certifications</h3>

                  <div className="resume-item">
                    <h4>Google</h4>
                    <p>
                      Google IT Automation with Python Professional Certificate
                    </p>
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
                      I run Pattarai, LICET's flagship project club. We aim to
                      give engineers, the engineering experience. Helped
                      organise 8 events and lead more than 3 projects
                      personally.
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
                      A design company. <br /> Web Developers, Graphic
                      Designers, Videography, Photography, Mockups, Video
                      Editing, etc.
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
                    <img
                      src={Kathir}
                      className="img-fluid pr-4"
                      alt=""
                      srcSet=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* End Resume Section */}
      </div>
    </Layout>
  );
}
