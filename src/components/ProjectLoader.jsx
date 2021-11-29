import { motion } from "framer-motion";
import GithubLogo from "../assets/img/github-white.png";

export function Loader(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-dark text-primary container d-flex align-items-center justify-content-end text-right"
    >
      <img src={GithubLogo} className="mx-4" alt="" srcset="" />
      <div className="spinner-grow text-secondary mx-2" role="status"></div>
      <div className="spinner-grow text-secondary mx-2" role="status"></div>
      <div className="spinner-grow text-secondary mx-2" role="status"></div>
    </motion.div>
  );
}
