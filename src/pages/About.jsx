import Layout from "../layouts/Layout";

export default function About() {
  return (
    <Layout contained>
      <h1 className="text-left my-5 pb-3 text-center">
        About<span className="text-white "> Me</span>
      </h1>
      {/* ======= Resume Section ======= */}
      <section id="resume" className="resume pt-5 text-secondary">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="resume-title">Education</h3>
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
                  President of Red Ribbon Club <br /> Member of Bharat Scouts
                  Cultural Media Team
                </p>
              </div>
              <h3 className="resume-title">Acheivements</h3>
              <p>
                <em>TECHNICAL </em>
              </p>
              <div className="resume-item">
                <h4>PAPERS</h4>
                <p>
                  Secured second place in Paper Presentation about Nanophotonics
                  at Shri Sai Ram Engineering College (March 14th 2020)
                </p>
              </div>

              <p>
                <em>NON-TECHNICAL </em>
              </p>
              <div className="resume-item">
                <p>Secured first place in Master of Ceremony (Engenia 2020)</p>
              </div>
              <div className="resume-item">
                <p>Secured second place in Shipwreck (Engenia 2020)</p>
              </div>
              <div className="resume-item">
                <p>
                  Secured Best Tamil Speaker Award for the year 2018 (School)
                </p>
              </div>
              <div className="resume-item">
                <p>
                  Secured Award of Excellence in Dance for the year 2018
                  (School)
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="resume-title">Experience</h3>
              <div className="resume-item">
                <h4>Project Manager</h4>
                <h5>2020 - Present</h5>
                <p>
                  <em>Pattarai, LICET </em>
                </p>
              </div>
              <div className="resume-item">
                <h4>Joint Secretary</h4>
                <h5>2020 - Present</h5>
                <p>
                  <em>Rotaract Club of LICET, LICET </em>
                </p>
              </div>
              <div className="resume-item">
                <h4>Human Resource Executive</h4>
                <h5>2020</h5>
                <p>
                  <em>Pattarai, LICET</em>
                </p>
              </div>
              <div className="resume-item">
                <h4>School Captain</h4>
                <h5>2015-2018</h5>
                <p>
                  <em>Good Shepherd Matriculation Hr.Sec School</em>
                </p>
              </div>
              <h3 className="resume-title">Activities</h3>
              <div className="resume-item">
                <p>
                  <em> Hosted several events as an MC </em>
                </p>
              </div>
              <div className="resume-item">
                <p>
                  <em>Working as a Content Writer</em>
                </p>
              </div>
              <div className="resume-item">
                <p>
                  <em>
                    Done a podcast and a part of a Podcast team TeaKadaiTalks
                  </em>
                </p>
              </div>
              <div className="resume-item">
                <p>
                  <em>Organized Standup Comdedy event</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Resume Section */}
    </Layout>
  );
}
