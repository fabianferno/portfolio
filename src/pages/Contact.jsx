import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import { SocialIcon } from "react-social-icons";

import DP from "../assets/img/dp-color.png";

function SocialPills(props) {
  return (
    <a href={props.src}>
      <SocialIcon url={props.src} bgColor="#60FF9F" />
      <span class="btn social-pill mr-5 font-weight-bold">{props.text}</span>
    </a>
  );
}

export default function Contact() {
  return (
    <Layout>
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <div className="jumbotron  p-0 mx-0 py-5 bg-dark">
          <div className="container ">
            <div className="row p-3 ">
              <div className="col-12 col-md-5 d-flex  justify-content-start justify-content-md-end ">
                <h1
                  style={{ fontSize: "3em" }}
                  className="text-white mr-md-4 mr-0 text-left font-weight-bold"
                >
                  Get in <br />
                  <span className="text-primary"> Touch</span>
                </h1>
              </div>
              <div className="col-md-7 col-12 ">
                <div className="mb-3 mt-md-0 mt-2">
                  <img
                    src={DP}
                    className="shadow bw p-1"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "20px",
                    }}
                    alt=""
                    srcset=""
                  />
                </div>
                <p className="lead text-secondary">
                  Looking to work with me? <br />
                  <br /> Write to me and I will get back to you
                  <br className="d-md-block d-none" /> at the earliest! <br />
                  <a
                    href="mailto:hello@fabianferno.tech"
                    className=" text-primary h5 pt-5"
                  >
                    hello@fabianferno.tech
                  </a>
                  <br /> <br />
                  <div
                    style={{ lineHeight: "40px" }}
                    className="text-white h5 mt-2"
                  >
                    If you liked my portfolio, <br />
                    buy me a{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="btn badge-pill font-weight-bold btn-dark btn-outline-primary"
                      href="https://www.buymeacoffee.com/fabianferno"
                    >
                      Coffee ☕
                    </a>{" "}
                  </div>
                </p>
              </div>
            </div>
          </div>

          <Marquee
            className=" mt-5 mb-4  "
            direction="right"
            speed={40}
            pauseOnHover
            gradient
            gradientWidth={0}
            gradientColor={[31, 31, 31]}
          >
            <SocialPills
              text="LinkedIn"
              src="https://www.linkedin.com/in/fabianferno/"
            />
            <SocialPills
              text="Instagram"
              src="https://www.instagram.com/super.skywalker/"
            />
            <SocialPills
              text="Facebook"
              src="https://www.facebook.com/KlarkCent2"
            />
            <SocialPills text="Github" src="https://github.com/fabianferno" />
            <SocialPills text="Dev.to" src="https://dev.to/fabianferno" />
            <SocialPills
              text="Youtube"
              src="https://www.youtube.com/channel/UCDrkxune31SSSYDL02P3rHg"
            />
            <SocialPills text="Twitter" src="https://twitter.com/FabianFerno" />
            <SocialPills
              text="StackOverflow"
              src="https://stackoverflow.com/users/13340320/fabian-ferno"
            />
            <SocialPills
              text="Whatsapp"
              src="https://wa.me/message/DXIEYD52L3BAJ1"
            />
            <SocialPills
              text="Telegram"
              src="tg://resolve?domain=fabianferno"
            />
          </Marquee>
        </div>
      </div>
    </Layout>
  );
}
