// Shared easing curves & variants
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];

export const fadeUp = (delay = 0, distance = 40) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
};
