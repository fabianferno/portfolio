import Layout from "../layouts/Layout";

export default function About() {
  return (
    <Layout contained>
      <h1 className="text-left my-5 pb-3 text-center">
        About<span className="text-white "> Me</span>
      </h1>

      <p className="text-secondary text-center pb-5">
        I am a software engineer with 2.5 years of professional experience in
        designing and developing. I’m currently pursuing my Bachelor of
        Technology in IT - Engineering at Loyola - ICAM College of Engineering
        and Technology.
      </p>

      <div className="text-secondary text-center p pb-5">
        IT Development and Designing, DevOps, Multimedia Production, 3D
        Visualisations, Cross-Cultural Communication, Community Management,
        Teamplayer, Ideator/Innovator. Web Dev- LAMP stack. General Programming
        React JS Developer Adobe Suite Flutter Dev Front End: HTML, CSS -
        Bootstrap, Tailwind, SaSS, JS Frameworks - React, Gatsby. Adobe Suite,
        Android Studio, Google Sketchup 3D, Unreal Engine, VRay, Cinema4D Back
        End: Python, C, Java, PHP, NodeJS DB: MySql, MariaDB, FireStore,
        MongoDB. Others: Postman, RESTful APIs, AJAX, JSX, Git, Github, npm,
        Cloudflare, Vercel, Linux - Ubuntu/Debian, Kali Linux. OOPs,
        Wireframing, Responsive Design, Agile Development, Wordpress developer.
      </div>
      {/* ======= Resume Section ======= */}
      <section
        id="resume"
        className="resume  text-secondary inner-shadow card-rounded bg-black pl-2 pl-md-5 pb-5"
      >
        <div className="container ">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="resume-title pt-5">Education</h3>
              <div className="resume-item">
                <h4>B.Tech Information Technology</h4>
                <h5>June 2019 Present</h5>
                <p>
                  <em>
                    Loyola ICAM College of Engineering and Technology, Chennai
                  </em>
                </p>
                <p>
                  Determined to achieve a greater insight of my career through
                  LICET.
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
              <div className="resume-item">
                <h4>Kathir Kreations</h4>
                <h5>NOV 2020 - MAY 2021</h5>
                <p>
                  Web Developer and Graphic Designer <br />- Part time{" "}
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
          </div>
        </div>
      </section>
      {/* End Resume Section */}
    </Layout>
  );
}
