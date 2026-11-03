import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { HiArrowDownRight, HiArrowUpRight } from "react-icons/hi2";

import { heroText } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { scrollToTarget } from "../hooks/useLenis";
import { EASE_OUT_EXPO } from "../utils/motion";
import Magnetic from "./ui/Magnetic";
import RevealText from "./ui/RevealText";

const HeroScene = lazy(() => import("./canvas/HeroScene"));

const RoleRotator = ({ roles }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles]);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="inline-block whitespace-nowrap text-teal"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const LocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} GMT-3</span>;
};

const Hero = ({ ready }) => {
  const { language } = useLanguage();
  const t = heroText[language];
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const sectionRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const enter = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-teal/10 blur-[140px]" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-teal-700/20 blur-[160px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      {/* WebGL orb */}
      <div aria-hidden className={`absolute inset-0 ${isDesktop ? "" : "opacity-90"}`}>
        <motion.div
          style={{ scale: orbScale, y: orbY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="relative h-full w-full"
        >
          {!reduced && (
            <Suspense fallback={null}>
              <HeroScene pointer={pointer} compact={!isDesktop} />
            </Suspense>
          )}
          {reduced && (
            <div className="absolute right-[8%] top-1/2 aspect-square w-[min(560px,60vw)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#b8fffb_0%,#00dddd_30%,#004d4d_70%,transparent_72%)] opacity-60 blur-sm" />
          )}
        </motion.div>
        {/* Legibility scrim: darkens behind the copy while the graphic spans the section */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_55%,rgba(5,7,10,0.75),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex flex-1 flex-col justify-center pb-28 pt-36 lg:pt-28"
      >
        <motion.div {...enter(0.1)} className="mb-8 flex">
          <span className="inline-flex items-center gap-3 rounded-full border border-teal/25 bg-teal/[0.06] py-1.5 pl-3 pr-4 text-xs text-teal-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-teal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {t.available}
          </span>
        </motion.div>

        <motion.p {...enter(0.2)} className="mb-4 font-mono text-sm text-muted sm:text-base">
          {t.greeting}
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.88] tracking-[-0.04em]">
          <RevealText
            key={`l1-${language}`}
            text={t.line1}
            play={ready}
            delay={0.25}
            className="block text-[clamp(3.4rem,11vw,9.5rem)] text-fg"
          />
          <RevealText
            key={`l2-${language}`}
            text={t.line2}
            play={ready}
            delay={0.4}
            className="block text-[clamp(3.4rem,11vw,9.5rem)]"
            wordClassName="text-gradient"
          />
        </h1>

        <motion.p
          {...enter(0.7)}
          className="mt-8 max-w-xl font-display text-xl text-fg/90 sm:text-2xl"
        >
          {t.lead} <RoleRotator roles={t.roles} />
        </motion.p>

        <motion.p {...enter(0.8)} className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {t.description}
        </motion.p>

        <motion.div {...enter(0.95)} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("work");
              }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-teal px-7 py-4 font-medium text-ink-950 shadow-[0_0_40px_-8px_rgba(0,221,221,0.7)]"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative">{t.ctaPrimary}</span>
              <HiArrowDownRight className="relative transition-transform duration-500 group-hover:rotate-[-45deg]" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("contact");
              }}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 font-medium text-fg transition-colors duration-300 hover:border-teal hover:text-teal"
            >
              {t.ctaSecondary}
              <HiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bottom meta bar */}
      <motion.div
        {...enter(1.1)}
        className="container-x absolute inset-x-0 bottom-8 z-10 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
      >
        <span className="hidden sm:block">{t.location}</span>
        <button
          type="button"
          onClick={() => scrollToTarget("about")}
          className="group flex flex-col items-center gap-3 sm:absolute sm:left-1/2 sm:-translate-x-1/2"
        >
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/20 transition-colors group-hover:border-teal">
            <motion.span
              className="mt-2 h-2 w-0.5 rounded-full bg-teal"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="group-hover:text-teal">{t.scroll}</span>
        </button>
        <LocalTime />
      </motion.div>
    </section>
  );
};

export default Hero;
