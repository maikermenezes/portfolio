import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scroll to a section id (or 0 for top), with or without Lenis. */
export const scrollToTarget = (target) => {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (lenisInstance) {
    lenisInstance.scrollTo(el ?? 0, { offset: 0, duration: 1.4 });
    return;
  }
  if (el && el.scrollIntoView) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
};

/** Inertial scrolling; paused (scroll-locked) until `ready` is true. */
export const useLenis = (ready) => {
  useEffect(() => {
    if (!ready) {
      document.documentElement.style.overflow = "hidden";
      return undefined;
    }
    document.documentElement.style.overflow = "";

    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [ready]);
};
