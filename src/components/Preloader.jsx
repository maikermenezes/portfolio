import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";

import { logo } from "../assets";
import { ui } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "../utils/motion";

const Preloader = ({ onComplete }) => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(true);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const doneRef = useRef(onComplete);
  doneRef.current = onComplete;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, 100, {
      duration: reduced ? 0.2 : 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        setVisible(false);
        doneRef.current?.();
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: EASE_IN_OUT }}
          aria-live="polite"
          aria-label={ui[language].loading}
        >
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          >
            <div className="absolute inset-0 -m-10 rounded-full bg-teal/20 blur-3xl" aria-hidden />
            <img src={logo} alt="" className="relative h-28 w-28 sm:h-32 sm:w-32" />
          </motion.div>

          <motion.div
            className="relative mt-12 w-56 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-px w-full bg-white/10">
              <div ref={barRef} className="h-px origin-left scale-x-0 bg-teal" />
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              <span>{ui[language].loading}</span>
              <span ref={countRef} className="text-teal">
                000
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
