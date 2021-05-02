import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/img/logo-rect-black-teal.svg";

export default function Layout(props) {
  return (
    <div className="bg-dark pt-5" style={{ height: "100vh" }}>
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
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container pt-5"
      >
        {props.children}
      </motion.div>
    </div>
  );
}
