import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import { SocialIcon } from "react-social-icons";

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
      <div style={{ marginTop: "130px" }}>
        <div className="jumbotron  p-0 mx-0 py-5 bg-black  inner-shadow">
          <div className="container ">
            <div className=" p-5 row ">
              <div className="col-12 col-md-5 d-flex  justify-content-start justify-content-md-end ">
                <h1
                  style={{ fontSize: "3em" }}
                  className="text-white mr-md-4 mr-0 text-left font-weight-bold "
                >
                  Get in <br />
                  <span className="text-primary"> Touch</span>
                </h1>
              </div>
              <div className="col-md-7 col-12 ">
                <p className="lead text-secondary">
                  Looking to work with me?
                  <br /> Write to me and I will get back to you
                  <br /> at the earliest! <br />
                  <br />
                  <a
                    href="mailto:hello@fabianferno.tech"
                    className="text-primary h5 pt-5"
                  >
                    hello@fabianferno.tech
                  </a>
                </p>
              </div>
            </div>
          </div>

          <Marquee
            className=" mt-5 mb-4"
            direction="right"
            speed={40}
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
