import { motion } from "framer-motion";
import RevealText from "./RevealText";
import { fadeUp } from "../../utils/motion";

const SectionHeading = ({ eyebrow, title, index, className = "", titleClassName = "", children }) => (
  <div className={`flex flex-col gap-6 ${className}`}>
    <motion.div
      variants={fadeUp(0, 16)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex items-center gap-4"
    >
      {index && <span className="font-mono text-xs text-muted">{index}</span>}
      <span className="eyebrow">{eyebrow}</span>
    </motion.div>
    <RevealText as="h2" text={title} className={`section-title max-w-4xl ${titleClassName}`} />
    {children}
  </div>
);

export default SectionHeading;
