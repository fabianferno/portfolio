import { Link } from "react-router-dom";
import Logo from "../assets/img/logo-circle-black-teal.svg";

export default function Layout(props) {
  return (
    <section className="bg-dark pt-5" style={{ height: "100vh" }}>
      <header className="d-flex justify-content-around text-uppercase align-items-center">
        <Link to="/">
          <img className="" style={{ height: 100 }} src={Logo} alt="" />
        </Link>
        <Link className="text-primary" to="/about">
          About
        </Link>
        <Link className="text-primary" to="/projects">
          Projects
        </Link>
        <Link className="text-primary" to="/services">
          Services
        </Link>
        <Link className="text-primary" to="/contact">
          Contact
        </Link>
      </header>
      <div className="container pt-5">{props.children}</div>
    </section>
  );
}
