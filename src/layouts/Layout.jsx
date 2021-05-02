import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MenuBar from "../components/MenuBar";
import Logo from "../assets/img/logo-circle-black-teal.svg";

import AnimatedCursor from "react-animated-cursor";

export default function Layout(props) {
  return (
    <div id="outer-container">
      <AnimatedCursor
        innerSize={10}
        outerSize={8}
        color="96, 255, 159"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      />
      <motion.div
        style={{ height: "100vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MenuBar />
        <div
          id="page-wrap"
          style={{ height: "90px" }}
          className="d-flex bg-black align-items-center"
        >
          <motion.button
            className="btn col-md-1 col-12"
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

          <div className="p text-primary text-center text-md-left my-5 ml-md-5 ml-0 px-md-0 px-5">
            “There’s a lot of beauty in ordinary things. Isn’t that kind of the
            point?” – <strong> Pam Beesly</strong>
          </div>
        </div>

        {/* Page Content Goes Here */}
        <motion.div
          id="page-content"
          initial={{ scale: 0.9, opacity: 0, y: -10 }}
          animate={{ scale: 1.05, opacity: 1, y: 20 }}
          transition={{ duration: 1 }}
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
          className={props.contained ? "container" : ""}
        >
          <div className="p-5">{props.children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
