import Layout from "../layouts/Layout";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <h1 className="hero py-5 mt-5" style={{ lineHeight: "115px" }}>
        Fabian Ferno
      </h1>
      <span
        style={{ letterSpacing: "7px" }}
        className="text-secondary text-uppercase "
      >
        <motion.button
          className="btn btn-black mr-md-2 mt-3 mt-md-0 d-flex d-md-inline"
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.9 }}
        >
          Web Developer
        </motion.button>

        <motion.button
          className="btn btn-black mx-md-2 mt-3 mt-md-0 d-flex d-md-inline"
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.9 }}
        >
          Freelancer
        </motion.button>

        <motion.button
          className="btn btn-black ml-md-2 mt-3 mt-md-0 d-flex d-md-inline"
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.9 }}
        >
          Graphic Designer
        </motion.button>
      </span>
    </Layout>
  );
}
