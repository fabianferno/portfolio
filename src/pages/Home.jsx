import Layout from "../layouts/Layout";
import { motion } from "framer-motion";
import { HeroThree } from "../components/HeroThree";
import Marquee from "react-fast-marquee";

export default function Home() {
  const RoleBadges = (props) => {
    return (
      <motion.button
        style={{ fontSize: "1em" }}
        className="btn btn-black mr-4 mt-3 d-flex d-md-inline"
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 1.1 }}
      >
        {props.role}
      </motion.button>
    );
  };

  return (
    <Layout>
      <div className="row ml-md-3 d-flex ml-0 align-items-center justify-content-center mt-2 pt-2">
        {/* <h1
          className="hero   text-center mt-md-5 pb-3 "
          style={{ pointerEvents: "none" }}
        >
          Fabian Ferno
        </h1> */}

        <HeroThree />

        <div
          style={{
            marginTop: "-300px",
          }}
          className="d-md-flex d-none flex-column align-items-center justify-content-center"
        >
          <Marquee
            direction="left"
            speed={50}
            gradient
            gradientWidth={0}
            gradientColor={[31, 31, 31]}
          >
            <RoleBadges role="App Development" />
            <RoleBadges role="Graphic Designing" />
            <RoleBadges role="Internet of Things" />
            <RoleBadges role="Full-Stack Engineering" />
          </Marquee>
        </div>
      </div>

      <Marquee
        style={{ marginTop: "-100px" }}
        className="d-md-none d-flex mb-3"
        direction="left"
        speed={50}
        gradient
        gradientWidth={40}
        gradientColor={[31, 31, 31]}
      >
        <RoleBadges role="App Development" />
        <RoleBadges role="Graphic Designing" />
        <RoleBadges role="Internet of Things" />
        <RoleBadges role="Full-Stack Engineering" />
      </Marquee>

      <div
        style={{ lineHeight: "45px" }}
        className="mt-md-0 mt-5 container p-md-5 p-2 h3 text-secondary text-center"
      >
        “There’s a lot of beauty in ordinary things.{" "}
        <div className=" d-none d-md-flex"></div> Isn’t that kind of the point?”
        <span className="d-md-block mt-md-0 mt-2 d-flex justify-content-center text-white font-weight-bold">
          - Pam Beesly
        </span>
      </div>
    </Layout>
  );
}
