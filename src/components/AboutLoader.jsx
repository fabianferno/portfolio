import { motion } from "framer-motion";

export function Loader(props) {
  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      className="card bg-dark text-primary m-5 p-5 d-flex align-items-center"
    >
      <div className="py-4 d-flex align-items-center justify-content-center  ">
        <div className="spinner-grow text-secondary mx-2" role="status"></div>
        <div className="spinner-grow text-secondary mx-2" role="status"></div>
        <div className="spinner-grow text-secondary mx-2" role="status"></div>
      </div>
    </motion.div>
  );
}
