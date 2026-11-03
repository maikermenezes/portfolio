import { forwardRef } from "react";
import { motion } from "framer-motion";

/** Card whose border and surface glow follow the mouse (see .spotlight in index.css). */
const SpotlightCard = forwardRef(({ children, className = "", ...rest }, ref) => {
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} className={`card spotlight ${className}`} {...rest}>
      {children}
    </motion.div>
  );
});

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
