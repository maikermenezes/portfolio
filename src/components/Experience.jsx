import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

import { experiences, experiencesText } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { EASE_OUT_EXPO } from "../utils/motion";
import SectionHeading from "./ui/SectionHeading";

const ExperienceItem = ({ experience }) => {
  const ref = useRef(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const seen = useInView(ref, { once: true, amount: 0.3 });

  return (
    <li ref={ref} className="relative pb-16 pl-10 last:pb-0 sm:pl-16">
      {/* Node */}
      <span className="absolute left-0 top-1.5 flex h-[15px] w-[15px] -translate-x-1/2 items-center justify-center">
        <span
          className={`absolute h-full w-full rounded-full border transition-all duration-500 ${
            active || experience.current ? "scale-150 border-teal bg-teal/20" : "border-white/25 bg-ink-950"
          }`}
        />
        <span
          className={`relative h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
            active || experience.current ? "bg-teal" : "bg-white/30"
          }`}
        />
      </span>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={seen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      >
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
          <span className={active ? "text-teal" : "text-muted"}>{experience.date}</span>
          {experience.current && (
            <span className="rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[10px] text-teal">
              Now
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-lg shadow-black/40">
            <img src={experience.icon} alt="" className="h-full w-full object-contain" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{experience.title}</h3>
            <p className="text-muted">{experience.company_name}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {experience.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={seen ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.05 }}
              className="flex gap-3 leading-relaxed text-fg/75"
            >
              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-teal/60" />
              {point}
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const t = experiencesText[language];
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-teal/[0.06] blur-[140px]" />
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="02"
              eyebrow={t.eyebrow}
              title={t.title}
              titleClassName="lg:!text-[clamp(3rem,5.6vw,5rem)]"
            >
              <p className="max-w-sm text-lg text-muted">{t.subtitle}</p>
            </SectionHeading>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div ref={listRef} className="relative">
            <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/10" />
            <motion.span
              aria-hidden
              style={{ scaleY }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-teal-300 via-teal to-teal-700 shadow-[0_0_12px_rgba(0,221,221,0.8)]"
            />
            <ol>
              {experiences[language].map((exp) => (
                <ExperienceItem key={`${exp.title}-${exp.date}`} experience={exp} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
