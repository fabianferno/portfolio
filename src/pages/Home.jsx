import Layout from "../layouts/Layout";
import { motion } from "framer-motion";
import { FabianGyro3D } from "../components/FabianGyro3D";
import Marquee from "react-fast-marquee";
import ErrorBoundary from "../components/ErrorBoundary";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [quote, setQuote] = useState({
    eng: "There’s a lot of beauty in ordinary things. Isn’t that kind of the point?",
    character: "Pam Beesly - the office",
  });

  useEffect(() => {
    fetch(
      "https://api-thirukkural.vercel.app/api?num=" +
        Math.floor(Math.random() * (1330 - 0 + 1) + 0)
    )
      .then((response) => response.json())
      .then((data) => {
        data.character = "Thirukural";
        setQuote(data);
      });
  }, []);

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

        <div className="mt-md-5 mt-5 d-flex flex-column justify-content-center align-items-center container p-md-5 p-2 h3 text-secondary text-center">
          <div
            style={{
              lineHeight: "45px",
              width: "60vw",
              wordWrap: "break-word",
            }}
          >
            {JSON.stringify(quote.eng)}
          </div>
          <span
            style={{ fontSize: "25px" }}
            className=" d-md-block mt-md-2 mt-2 d-flex justify-content-center text-white font-weight-bold"
          >
            {"- " + quote.character + " -"}
          </span>
          <p className="my-5" style={{ fontSize: "15px" }}>
            {quote.line1} <br />
            {quote.line2}
          </p>
        </div>
      </Layout>
    </ErrorBoundary>
  );
}
