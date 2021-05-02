import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MenuBar from "../components/MenuBar";
import Logo from "../assets/img/logo-circle-black-teal.svg";

export default function Layout(props) {
  return (
    <div id="outer-container">
      <motion.div
        style={{ height: "90vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MenuBar />
        <div
          id="page-wrap"
          style={{ height: "100px" }}
          className="d-flex bg-black text-uppercase align-items-center"
        >
          <motion.button
            className="btn"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/">
              <img
                className="dark-shadow"
                style={{ height: 120, marginTop: "80px", marginLeft: "25px" }}
                src={Logo}
                alt="fabianferno-logo"
              />
            </Link>
          </motion.button>
        </div>

        {/* Page Content Goes Here */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: -10 }}
          animate={{ scale: 1.05, opacity: 1, y: 20 }}
          transition={{ duration: 1 }}
          className="container py-5"
        >
          <div className="p-5">{props.children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
