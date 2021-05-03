import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../assets/scss/menubar.scss";
import { motion } from "framer-motion";
import Bitmoji from "../assets/img/bitmoji.png";

/* Menu Options
slide
stack
elastic
bubble
push
pushRotate
scaleDown
scaleRotate
fallDown
reveal
*/

export default function MenuBar(props) {
  var isMenuOpen = function (state) {
    if (state.isOpen) {
      document.getElementById("page-content").classList.add("blur");
    } else {
      document.getElementById("page-content").classList.remove("blur");
    }
  };
  return (
    <Menu
      right
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      onStateChange={isMenuOpen}
    >
      <Link className="menu-item py-3" to="/">
        Home
      </Link>

      <Link className=" menu-item   py-3" to="/about">
        About
      </Link>

      <Link className="menu-item  py-3" to="/projects">
        Projects
      </Link>

      {/* <Link className=" menu-item  py-3" to="/services">
        Services
      </Link> */}

      <Link className=" menu-item  py-3" to="/contact">
        Contact
      </Link>

      <motion.div className="d-flex justify-content-center mb-4">
        <img
          className="dark-shadow"
          style={{ height: 200, marginTop: "80px" }}
          src={Bitmoji}
          alt="fabianferno-logo"
        />
      </motion.div>
      <h5 className="text-center text-white">Hello There!</h5>
    </Menu>
  );
}
