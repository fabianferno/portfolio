import { motion } from "framer-motion";

export default function Layout(props) {
  return (
    <motion.div
      id="page-content"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 2.5 }}
      className={
        props.contained ? "container overflow-hidden" : "overflow-hidden"
      }
    >
      {props.children}
    </motion.div>
  );
}
