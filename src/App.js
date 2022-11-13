import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import "./assets/scss/style.scss";
import Resume from "./assets/files/resume.pdf";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar, Nav } from "react-bootstrap";

export default function App() {
  document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState === "visible") {
      document.title = "Hello there, I'm Fabian";
    } else {
      document.title = "Don't ghost Fabian...";
    }
  });

  function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0.9, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar
          fixed="top"
          style={{
            marginTop: "-30px",
            borderEndEndRadius: "30px",
            borderEndStartRadius: "40px",
            paddingTop: "60px",
            paddingBottom: "30px",
          }}
          className="shadow d-flex container-md justify-content-center bg-black align-items-center pl-md-5 pl-4"
          collapseOnSelect
          expand="lg"
          expanded={isOpen}
          variant="dark"
        >
          <div className=" d-md-flex d-block align-items-center justify-content-md-center justify-content-between">
            <Link
              onClick={() => setIsOpen(false)}
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand font-weight-bold text-primary mr-md-5  mr-3"
            >
              fabianferno
            </Link>

            <span className="d-flex  d-sm-inline  justify-content-center">
              <Navbar.Toggle
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  borderColor: "rgba(255, 255, 255, 0)",
                  color: "rgba(255, 255, 255, 1)",

                  marginBottom: "-15px",
                }}
                aria-controls="responsive-navbar-nav"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  transform={isOpen ? "rotate(180)" : "rotate(0)"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    fill="none"
                    stroke="#555"
                    strokeWidth="2"
                    points="7.086 3.174 17.086 13.174 7.086 23.174"
                    transform="scale(1 -1) rotate(-89 -1.32 0)"
                  />
                </svg>
              </Navbar.Toggle>
            </span>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mt-3  mt-md-0 text-md-left text-center">
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/about"
                  className="p-3 menu-item nav-link"
                >
                  About
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/projects"
                  className="p-3  menu-item nav-link"
                >
                  Projects
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/work"
                  className="p-3  menu-item nav-link"
                >
                  Works
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/contact"
                  className="p-3  menu-item nav-link"
                >
                  Contact
                </Link>
                <a
                  onClick={() => setIsOpen(false)}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 menu-item nav-link"
                >
                  Resume
                </a>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </motion.div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/work" component={Work} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/resume">
          <Redirect to={Resume} />
        </Route>
      </Switch>
    </Router>
  );
}
