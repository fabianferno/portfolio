import React from "react";
import { Link } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import "../assets/scss/menubar.scss";
import { motion } from "framer-motion";
import Logo from "../assets/img/logo-circle-black-teal.svg";

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
  return (
    <Menu right pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
      <Link className="menu-item py-3" to="/">
        Home
      </Link>

      <Link className=" menu-item   py-3" to="/about">
        About
      </Link>

      <Link className="menu-item  py-3" to="/projects">
        Projects
      </Link>

      <Link className=" menu-item  py-3" to="/services">
        Services
      </Link>

      <Link className=" menu-item  py-3" to="/contact">
        Contact
      </Link>
      <motion.div className="d-flex justify-content-center">
        <img
          className="dark-shadow"
          style={{ height: 100, marginTop: "80px" }}
          src={Logo}
          alt="fabianferno-logo"
        />
      </motion.div>
    </Menu>
  );
}
