import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "../../utils/motion";

/**
 * Splits text into words that slide up from a clipping mask.
 * Uses `animate` when `play` is provided, otherwise reveals on scroll into view.
 */
const RevealText = ({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  play,
}) => {
  const words = text.split(" ");
  const MotionTag = motion[Tag] ?? motion.span;
  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.22em] -mb-[0.22em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${wordClassName}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE_OUT_EXPO } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default RevealText;
