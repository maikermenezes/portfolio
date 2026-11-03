import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

/**
 * Custom cursor: a precise dot plus a lagging ring that grows over interactive
 * elements. Elements can set `data-cursor="Label"` to show a text bubble.
 */
const Cursor = () => {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest("[data-cursor]");
      const interactive = target?.closest("a, button, input, textarea, [role='button'], label");
      setLabel(labelled ? labelled.getAttribute("data-cursor") : "");
      setHovering(Boolean(interactive || labelled));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 96 : hovering ? 56 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.85 : 1,
          backgroundColor: label ? "rgba(0,221,221,1)" : hovering ? "rgba(0,221,221,0.12)" : "rgba(0,221,221,0)",
          borderColor: label ? "rgba(0,221,221,1)" : "rgba(0,221,221,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[11px] font-medium uppercase tracking-widest text-ink-950"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-teal"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </div>
  );
};

export default Cursor;
