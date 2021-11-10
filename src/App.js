import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import "./assets/scss/style.scss";
import Resume from "./assets/files/Resume.pdf";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar, Nav } from "react-bootstrap";

export default function App() {
  document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState === "visible") {
      document.title = "Fabian Ferno | <Developer ⚡/>";
    } else {
      document.title = "Didn't say Goodbye ;/ 💔";
    }
  });

  function Header() {
    return (
      <motion.div
        initial={{ opacity: 0.9, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar
          fixed="top"
          style={{
            borderEndEndRadius: "30px",
            borderEndStartRadius: "40px",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
          className="shadow d-flex container-md justify-content-center bg-black align-items-center pl-md-5 pl-4"
          collapseOnSelect
          expand="lg"
          variant="dark"
        >
          <div className=" d-md-flex d-block align-items-center justify-content-md-center justify-content-between">
            <Link
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand font-weight-bold text-primary mr-md-5  mr-3"
            >
              super.skywalker
            </Link>

            <span className="d-flex mt-3 d-sm-inline justify-content-center">
              <Navbar.Toggle
                className="py-3 bg-dark rounded-circle inner-shadow"
                aria-controls="responsive-navbar-nav"
              >
                ⚡
              </Navbar.Toggle>
            </span>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mt-3  mt-md-0 text-md-left text-center">
                <Link to="/about" className="p-3 menu-item nav-link">
                  About
                </Link>
                <Link to="/projects" className="p-3  menu-item nav-link">
                  Projects
                </Link>
                <Link to="/contact" className="p-3  menu-item nav-link">
                  Contact
                </Link>
                <a
                  href="/static/media/Resume.895e0d0a.pdf"
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
        <Route exact path="/services" component={Services} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/resume">
          <Redirect to={Resume} />
        </Route>
      </Switch>
    </Router>
  );
}
