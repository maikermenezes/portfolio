import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { technologies } from "../constants";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Infinite row whose speed and direction react to scroll velocity. */
const VelocityRow = ({ children, baseVelocity = 2 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [8, 0, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x, skewX: skew }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
};

const TechItem = ({ name, icon }) => (
  <div className="group mx-3 flex shrink-0 items-center gap-4 rounded-full border border-line bg-ink-800/60 py-3 pl-3 pr-7 transition-colors duration-300 hover:border-teal/50">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fg/90 transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-white group-hover:shadow-[0_0_24px_rgba(0,221,221,0.6)]">
      <img src={icon} alt="" loading="lazy" className="h-6 w-6 object-contain" />
    </span>
    <span className="font-display text-lg font-medium text-fg/80 group-hover:text-fg">{name}</span>
  </div>
);

const TechMarquee = () => {
  const half = Math.ceil(technologies.length / 2);
  const rowA = technologies.slice(0, half);
  const rowB = technologies.slice(half);

  return (
    <section aria-label="Tech stack" className="relative border-y border-line bg-ink-900/50 py-10">
      <div className="mask-fade-x flex flex-col gap-5">
        <VelocityRow baseVelocity={-1.5}>
          <div className="flex">
            {[...rowA, ...rowA].map((tech, i) => (
              <TechItem key={`${tech.name}-a-${i}`} {...tech} />
            ))}
          </div>
        </VelocityRow>
        <VelocityRow baseVelocity={1.5}>
          <div className="flex">
            {[...rowB, ...rowB].map((tech, i) => (
              <TechItem key={`${tech.name}-b-${i}`} {...tech} />
            ))}
          </div>
        </VelocityRow>
      </div>
    </section>
  );
};

export default TechMarquee;
