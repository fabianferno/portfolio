import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Layout(props) {
  return (
    <div id="outer-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <MenuBar /> */}
        <div
          id="page-wrap"
          style={{
            borderEndEndRadius: "30px",
            borderEndStartRadius: "40px",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
          className="d-flex container-md justify-content-center bg-black align-items-center pl-md-5 pl-4"
        >
          <Navbar className=" " collapseOnSelect expand="lg" variant="dark">
            <div className="container-md  d-flex justify-content-md-center justify-content-between">
              <Link
                to="/"
                className="navbar-brand font-weight-bold text-primary text-left"
              >
                super.skywalker
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className=" mt-4 mt-md-0">
                  <Link to="/" className="p-3 menu-item nav-link">
                    Home
                  </Link>
                  <Link to="/about" className="p-3  menu-item nav-link">
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
        </div>

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
