import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";

function SocialPills(props) {
  return (
    <a href={props.src}>
      <span class="btn btn-dark text-primary mr-5 font-weight-bold">
        {props.text}
      </span>
    </a>
  );
}

export default function Contact() {
  return (
    <Layout contained>
      <div className="container">
        <div className="jumbotron bg-black inner-shadow text-primary mt-5 p-5">
          <h1 className="display-6">
            {" "}
            <h1 className="text-white font-weight-bold pb-3">Get in Touch</h1>
          </h1>
          <p className="lead text-secondary">
            Looking to work with me?
            <br /> Write to me and I will get back to you at the earliest!
            <h5 className="text-primary pt-5">hello@fabianferno.tech</h5>
          </p>

          <Marquee
            className="lead mt-5"
            direction="left"
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
