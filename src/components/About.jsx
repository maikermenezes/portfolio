import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { HiOutlineCodeBracket, HiOutlineDevicePhoneMobile, HiOutlineServerStack } from "react-icons/hi2";

import { CAREER_START_YEAR, profileText, services } from "../constants";
import { facilit } from "../assets";
import { useLanguage } from "../hooks/useLanguage";
import { fadeUp } from "../utils/motion";
import Counter from "./ui/Counter";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";

const serviceIcons = {
  web: HiOutlineCodeBracket,
  mobile: HiOutlineDevicePhoneMobile,
  backend: HiOutlineServerStack,
};

/* ---------- Scroll-scrubbed paragraph ---------- */
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const ScrubParagraph = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap font-display text-xl leading-snug text-fg sm:text-2xl lg:text-[1.7rem]">
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
};

/* ---------- Self-typing code card ---------- */
const CODE_TOKENS = [
  ["k", "const "], ["v", "maike"], ["p", " = {\n"],
  ["p", "  role: "], ["s", '"Software Engineer"'], ["p", ",\n"],
  ["p", "  stack: ["], ["s", '"TypeScript"'], ["p", ", "], ["s", '"React"'], ["p", ", "], ["s", '"Node"'], ["p", "],\n"],
  ["p", "  loves: ["], ["s", '"clean code"'], ["p", ", "], ["s", '"motion"'], ["p", "],\n"],
  ["p", "  coffee: "], ["n", "Infinity"], ["p", ",\n"],
  ["p", "  available: "], ["k", "true"], ["p", ",\n"],
  ["p", "};"],
];
const tokenClass = { k: "text-teal", v: "text-fg", p: "text-muted", s: "text-teal-300/80", n: "text-[#f5c46b]" };

const CodeCard = ({ title }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const total = useMemo(() => CODE_TOKENS.reduce((n, [, s]) => n + s.length, 0), []);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return undefined;
    }
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= total) {
          clearInterval(id);
          return c;
        }
        return c + 2;
      });
    }, 22);
    return () => clearInterval(id);
  }, [inView, total]);

  let remaining = count;
  const rendered = CODE_TOKENS.map(([type, str], i) => {
    if (remaining <= 0) return null;
    const slice = str.slice(0, remaining);
    remaining -= str.length;
    return (
      <span key={i} className={tokenClass[type]}>
        {slice}
      </span>
    );
  });

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-line px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-xs text-muted">{title}</span>
      </div>
      <pre className="flex-1 overflow-hidden whitespace-pre-wrap p-5 font-mono text-[13px] leading-6 sm:text-sm">
        <code>
          {rendered}
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-teal" />
        </code>
      </pre>
    </div>
  );
};

/* ---------- Section ---------- */
const About = () => {
  const { language } = useLanguage();
  const t = profileText[language];
  const years = new Date().getFullYear() - CAREER_START_YEAR;

  const cardAnim = (delay = 0) => ({
    variants: fadeUp(delay, 50),
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.2 },
  });

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="01" eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
          {/* Bio */}
          <SpotlightCard {...cardAnim(0)} className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-7 lg:row-span-2">
            <ScrubParagraph key={language} text={t.description} />
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2">
                <img src={facilit} alt="Facilit" className="h-full w-full object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.currently}</p>
                <p className="font-display text-fg">
                  {t.currentRole} <span className="text-muted">@</span> {t.currentCompany}
                </p>
              </div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-teal" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
              </span>
            </div>
          </SpotlightCard>

          {/* Code */}
          <SpotlightCard {...cardAnim(0.1)} className="overflow-hidden lg:col-span-5">
            <CodeCard title={t.snippetTitle} />
          </SpotlightCard>

          {/* Stats */}
          <SpotlightCard {...cardAnim(0.2)} className="grid grid-cols-3 divide-x divide-line lg:col-span-5">
            {t.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col justify-center gap-2 p-5 sm:p-7">
                <Counter
                  value={stat.key === "years" ? years : stat.value}
                  suffix={stat.suffix}
                  className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
                />
                <span className="text-xs leading-snug text-muted sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </SpotlightCard>

          {/* Services */}
          {services[language].map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <SpotlightCard
                key={service.title}
                {...cardAnim(0.1 * i)}
                className="group flex flex-col gap-6 p-7 sm:p-8 lg:col-span-4"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/20 bg-teal/[0.07] text-teal transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={26} />
                  </span>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
