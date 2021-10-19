import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar, Nav } from "react-bootstrap";

export default function Layout(props) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          <div className=" d-md-flex d-block justify-content-md-center justify-content-between">
            <Link
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand font-weight-bold text-primary mr-md-5 mr-4"
            >
              super.skywalker
            </Link>

            <Navbar.Toggle
              className="py-3  bg-dark rounded-circle inner-shadow"
              aria-controls="responsive-navbar-nav"
            >
              ⚡
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mt-3 mt-md-0">
                <Link to="/about" className="p-3 menu-item nav-link">
                  About
                </Link>
                <Link to="/projects" className="p-3  menu-item nav-link">
                  Projects
                </Link>
                <Link to="/contact" className="p-3  menu-item nav-link">
                  Contact
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        {/* Page Content Goes Here */}
        <motion.div
          id="page-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 2.5 }}
          style={{}}
          className={props.contained ? "container" : ""}
        >
          <div className="p-2 p-md-5">{props.children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
