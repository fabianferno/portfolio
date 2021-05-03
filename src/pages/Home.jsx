import Layout from "../layouts/Layout";
import { motion } from "framer-motion";
import Cube1 from "../assets/img/cube1.gif";

export default function Home() {
  const RoleBadges = (props) => {
    return (
      <motion.button
        style={{ fontSize: "0.9em" }}
        className="btn btn-black mr-md-2 mt-3 mt-md-0 d-flex d-md-inline"
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.9 }}
      >
        {props.role}
      </motion.button>
    );
  };

  return (
    <Layout contained>
      <div className="row ml-md-3 ml-0 align-items-center justify-content-center">
        <div className="d-none d-md-block pr-md-5 pr-0 col-md-4  col-12">
          <img src={Cube1} style={{ opacity: "20%" }} alt="fabianferno Cube1" />
        </div>
        <div className="d-block d-md-none pr-md-5 pr-0 col-md-4  col-12">
          <img
            width="100%"
            src={Cube1}
            style={{ opacity: "40%", marginLeft: "-40px" }}
            alt="fabianferno Cube2"
          />
        </div>
        <div className="col-md-8 col-12 ml-0 pl-5 pl-md-3">
          <h1
            className="hero mt-3 mt-md-5 pb-3 "
            style={{ lineHeight: "115px" }}
          >
            Fabian Ferno
          </h1>

          <span
            style={{ letterSpacing: "7px" }}
            className="text-secondary text-uppercase hover-box"
          >
            <RoleBadges role="Freelancer" />
            <RoleBadges role="Web Developer" />
            <RoleBadges role="Graphic Designer" />
          </span>
        </div>
      </div>
      <div
        style={{ lineHeight: "45px" }}
        className="container p-5 d-md-block d-none h3 text-secondary text-justify text-md-center"
      >
        “There’s a lot of beauty in ordinary things. <br /> Isn’t that kind of
        the point?” –{" "}
        <span className="text-white font-weight-bold"> Pam Beesly</span>
      </div>

      <div
        style={{ lineHeight: "45px" }}
        className="container p-5 d-md-none d-block h5 text-secondary text-justify text-md-center"
      >
        “There’s a lot of beauty in ordinary things. <br /> Isn’t that kind of
        the point?” –{" "}
        <span className="text-white font-weight-bold"> Pam Beesly</span>
      </div>
    </Layout>
  );
}
