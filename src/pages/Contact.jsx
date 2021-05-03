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
    <Layout contained>
      <div className=" ">
        <div className="jumbotron p-0 mx-0 py-5 bg-black  inner-shadow">
          <div className="p-5 row d-flex align-items-start ">
            <div className="col-12 col-md-3 ">
              <h1
                style={{ fontSize: "3em" }}
                className="text-white font-weight-bold "
              >
                Get in <br />
                <span className="text-primary"> Touch</span>
              </h1>
            </div>
            <div className="col-md-9 col-12 ">
              <p className="lead text-secondary">
                Looking to work with me?
                <br /> Write to me and I will get back to you at the earliest!
                <a
                  href="mailto:hello@fabianferno.tech"
                  className="text-primary h5 pt-5"
                >
                  hello@fabianferno.tech
                </a>
                <p className="text-white "> &#47;&#47; fabianferno</p>
              </p>
            </div>
          </div>

          <Marquee
            className=" mt-5 mb-4"
            direction="right"
            speed={20}
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
          </Marquee>
        </div>
      </div>
    </Layout>
  );
}
