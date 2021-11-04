import Layout from "../layouts/Layout";
import { motion } from "framer-motion";
import { FabianGyro3D } from "../components/FabianGyro3D";
import Marquee from "react-fast-marquee";
import ErrorBoundary from "../components/ErrorBoundary";

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
    <ErrorBoundary>
      <Layout>
        <div className=" row align-items-center justify-content-center mt-2 pt-2">
          <FabianGyro3D />

          <div
            style={{
              marginTop: "-300px",
            }}
            className="d-md-flex d-none flex-column align-items-center justify-content-center"
          ></div>
        </div>

        <Marquee
          style={{ marginTop: "-100px" }}
          className="d-flex mb-5 pb-md-5"
          direction="left"
          speed={100}
          gradient
          pauseOnHover
          gradientWidth={0}
          gradientColor={[31, 31, 31]}
        >
          {[
            "App Development",
            "Graphic Designing",
            "Internet of Things",
            "3D Modelling",
            "Dev Ops",
            "Full-Stack Web Development",
            "App Development",
            "Graphic Designing",
            "Internet of Things",
            "3D Modelling",
            "Dev Ops",
            "Full-Stack Web Development",
          ].map((role, index) => (
            <RoleBadges key={index} role={role} />
          ))}
        </Marquee>

        <div
          style={{ lineHeight: "45px" }}
          className="mt-md-5 mt-5 container p-md-5 p-2 h3 text-secondary text-center"
        >
          “There’s a lot of beauty in ordinary things.{" "}
          <div className=" d-none d-md-flex"></div> Isn’t that kind of the
          point?”
          <span className="d-md-block mt-md-0 mt-2 d-flex justify-content-center text-white font-weight-bold">
            Pam Beesly{"  "}
            <span className="pl-2 font-italic text-secondary font-weight-normal">
              - the office
            </span>
          </span>
        </div>
      </Layout>
    </ErrorBoundary>
  );
}
