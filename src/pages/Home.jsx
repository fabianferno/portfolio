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
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ErrorBoundary>
      <Layout>
        <div
          style={{
            boxShadow: "0px -1px 82px 20px rgba(0,0,0,0.75)",
          }}
          className="pt-5 row align-items-center justify-content-center "
        >
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
            "Cross-Platform App Development",
            "Multimedia",
            "UI/UX Designing",
            "Internet of Things",
            "3D Modelling",
            "Dev Ops Engineering",
            "Full-Stack Engineering",

            "Cross-Platform App Development",
            "Multimedia",
            "UI/UX Designing",
            "Internet of Things",
            "3D Modelling",
            "Dev Ops Engineering",
            "Full-Stack Engineering",
          ].map((role, index) => (
            <RoleBadges key={index} role={role} />
          ))}
        </Marquee>

        <div className="mt-md-2 mt-1 p-md-5 p-2 d-flex flex-column justify-content-center align-items-center container  h5 text-secondary text-center">
          <h2 className="mb-2 mt-md-0 mt-4 mx-2 text-white d-flex flex-column">
            I'm a Dev-inator: I make things simpler with code.
          </h2>
          <div className="mt-md-4">
            <div
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                width: "90vw",
                wordWrap: "break-word",
              }}
            >
              {JSON.stringify(quote.eng)}
            </div>
            <span
              style={{ fontSize: "10px" }}
              className="  d-md-block mt-md-2 mt-2 d-flex justify-content-center text-white font-weight-bold"
            >
              {"- " + quote.character + " -"}
            </span>
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
}
