import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MenuBar from "../components/MenuBar";
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MenuBar />
        <div
          id="page-wrap"
          style={{}}
          className="d-flex container bg-black align-items-center py-5 pl-4"
        >
          <Link to="/">
            <div style={{}} className="text-primary h3 text-left">
              Super Skywalker
            </div>
          </Link>
        </div>

        {/* Page Content Goes Here */}
        <motion.div
          id="page-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 2 }}
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
          className={props.contained ? "container" : ""}
        >
          <div className="p-2 p-md-5">{props.children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
