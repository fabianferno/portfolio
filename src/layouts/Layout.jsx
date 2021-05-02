import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/img/logo-triangle-black-teal.svg";

export default function Layout(props) {
  return (
    <div className="bg-dark pt-5" style={{ height: "100vh" }}>
      <header className="d-flex justify-content-around text-uppercase align-items-center">
        <div className="">
          <motion.button
            className="btn "
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/">
              <img className="" style={{ height: 100 }} src={Logo} alt="" />
            </Link>
          </motion.button>
        </div>

        <nav>
          <motion.button
            className="btn btn-black col-md-3 col-12"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link className="text-primary" to="/about">
              About
            </Link>
          </motion.button>

          <motion.button
            className="btn btn-black col-md-3 col-12"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link className="text-primary" to="/projects">
              Projects
            </Link>
          </motion.button>

          <motion.button
            className="btn btn-black col-md-3 col-12"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link className="text-primary" to="/services">
              Services
            </Link>
          </motion.button>

          <motion.button
            className="btn btn-black col-md-3 col-12"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link className="text-primary" to="/contact">
              Contact
            </Link>
          </motion.button>
        </nav>
      </header>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -10 }}
        animate={{ scale: 1.05, opacity: 1, y: 20 }}
        transition={{ duration: 0.5 }}
        className="container pt-5"
      >
        {props.children}
      </motion.div>
    </div>
  );
}
