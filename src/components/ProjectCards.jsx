import { motion } from "framer-motion";

export function HighlightsCard(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.08, rotate: -2 }}
        className="card bg-black text-primary m-5 d-flex align-items-center"
        style={{
          width: "14em",

          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
        }}
      >
        <div className="card-body d-flex align-content-between  flex-wrap">
          <h5 className="card-title col-12 p-0 font-weight-bold ">
            {props.title ? props.title : "Super Skywalker"}
          </h5>
          <p className="card-text text-secondary font-weight-normal col-12 p-0">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div className="col-12 p-0">
            {props.technologies.map((tech, index) => (
              <span
                key={index}
                className="badge badge-pill font-weight-bold badge-primary mr-1"
              >
                {tech}
              </span>
            ))}
            {props.children}
          </div>
        </div>
      </motion.div>
    </a>
  );
}

export function GithubCard(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.08, rotate: -2 }}
        className="card bg-black text-primary m-5 d-flex align-items-center"
        style={{
          width: "20em",

          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
        }}
      >
        <div className="card-body d-flex align-content-between  flex-wrap">
          <h5 className="card-title col-12 p-0 font-weight-bold ">
            {props.title ? props.title : "Super Skywalker"}
          </h5>
          <p className="card-text text-secondary font-weight-normal col-12 p-0">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div className="col-12 p-0">
            {props.technologies.map((tech, index) => (
              <span
                key={index}
                className="badge badge-pill font-weight-bold badge-primary mr-1"
              >
                {tech}
              </span>
            ))}
            {props.children}
          </div>
        </div>
      </motion.div>
    </a>
  );
}

export function BasicCard(props) {
  return (
    <a href={props.src} target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="card bg-black text-primary m-5 m-md-5 d-flex align-items-center"
        style={{
          width: "14em",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
        }}
      >
        <div className="card-body d-flex align-content-between  flex-wrap">
          <h5 className="card-title col-12 p-0 font-weight-bold ">
            {props.title ? props.title : "Super Skywalker"}
          </h5>
          <p className="card-text text-secondary font-weight-normal col-12 p-0">
            {props.text
              ? props.text
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <div className="col-12 p-0">
            {props.technologies.map((tech, index) => (
              <span
                key={index}
                className="badge badge-pill font-weight-bold badge-primary mr-1"
              >
                {tech}
              </span>
            ))}
            {props.children}
          </div>
        </div>
      </motion.div>
    </a>
  );
}
