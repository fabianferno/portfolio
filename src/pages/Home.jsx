import Layout from "../layouts/Layout";
import { motion } from "framer-motion";
import Bitmoji from "../assets/img/bitmoji.png";

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
      <div className="row mt-3 align-items-center justify-content-center">
        <div className="pr-md-5 pr-0 col-md-4  col-12">
          <img src={Bitmoji} alt="fabianferno bitmoji" srcset="" />
        </div>
        <div className="col-md-8 col-12">
          <h1 className="hero mt-5 pb-3 " style={{ lineHeight: "115px" }}>
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
    </Layout>
  );
}
