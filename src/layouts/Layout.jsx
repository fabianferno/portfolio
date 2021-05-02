import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/img/logo-rect-black-teal.svg";

const fade1 = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function Layout(props) {
  return (
    <motion.div
      variants={fade1}
      className="bg-dark pt-5"
      style={{ height: "100vh" }}
    >
      <header className="d-flex justify-content-around text-uppercase align-items-center">
        <Link to="/">
          <img className="" style={{ height: 100 }} src={Logo} alt="" />
        </Link>
        <Link className="text-primary" to="/about">
          About
        </Link>
        <Link className="text-primary" to="/projects">
          Projects
        </Link>
        <Link className="text-primary" to="/services">
          Services
        </Link>
        <Link className="text-primary" to="/contact">
          Contact
        </Link>
      </header>
      <div className="container pt-5">{props.children}</div>
    </motion.div>
  );
}
