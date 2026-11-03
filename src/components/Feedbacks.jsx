import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import { feedbackText, testimonials } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { EASE_OUT_EXPO } from "../utils/motion";
import SectionHeading from "./ui/SectionHeading";

const durationFor = (text) => Math.min(14000, 5000 + text.split(" ").length * 90);

const Feedbacks = () => {
  const { language } = useLanguage();
  const t = feedbackText[language];
  const items = testimonials[language];
  const [[index, direction], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const current = items[index];
  const duration = durationFor(current.testimonial);

  const paginate = useCallback(
    (dir) => setState(([i]) => [(i + dir + items.length) % items.length, dir]),
    [items.length]
  );
  const goTo = (i) => setState(([prev]) => [i, i > prev ? 1 : -1]);

  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => paginate(1), duration);
    return () => clearTimeout(id);
  }, [index, paused, duration, paginate]);

  const words = current.testimonial.split(" ");
  const long = words.length > 60;

  return (
    <section id="testimonials" className="relative overflow-hidden py-28 sm:py-36">
      {/* Giant outline backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 select-none overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee font-display text-[18vw] font-bold leading-none tracking-tighter text-outline">
          {[0, 1].map((k) => (
            <span key={k}>
              {t.eyebrow} · {t.eyebrow} ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="container-x relative">
        <SectionHeading index="04" eyebrow={t.eyebrow} title={t.title} />

        <div
          className="card mt-16 overflow-hidden p-7 sm:p-12 lg:p-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-teal/10 blur-[100px]" />
          <svg aria-hidden viewBox="0 0 64 48" className="h-10 w-14 text-teal sm:h-14 sm:w-20">
            <path
              fill="currentColor"
              d="M0 48V28.8C0 12.2 8.4 2.6 25.2 0l2.4 6.6C19 9 14.6 14 14.4 21.6H26V48H0Zm36.4 0V28.8C36.4 12.2 44.8 2.6 61.6 0L64 6.6c-8.6 2.4-13 7.4-13.2 15H62.4V48h-26Z"
            />
          </svg>

          <div className="relative mt-8 min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={`${language}-${index}`}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -60 }),
                }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) paginate(1);
                  else if (info.offset.x > 80) paginate(-1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <blockquote
                  className={`font-display font-medium leading-snug tracking-tight text-fg ${
                    long ? "text-lg sm:text-2xl" : "text-2xl sm:text-4xl"
                  }`}
                >
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: Math.min(i * 0.015, 1.2), ease: "easeOut" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <img
                    src={current.image}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-teal/60 ring-offset-4 ring-offset-ink-800"
                  />
                  <div>
                    <p className="font-display text-lg font-semibold text-fg">{current.name}</p>
                    <p className="text-sm text-muted">
                      {current.designation} {current.preposition} {current.company}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-12 flex flex-col-reverse gap-8 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3" role="tablist" aria-label={t.eyebrow}>
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={item.name}
                  onClick={() => goTo(i)}
                  className="group relative flex flex-col items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt=""
                    className={`h-11 w-11 rounded-full object-cover transition-all duration-500 ${
                      i === index ? "scale-110 opacity-100 grayscale-0" : "opacity-40 grayscale group-hover:opacity-80"
                    }`}
                  />
                  <span className="h-[2px] w-11 overflow-hidden rounded-full bg-white/10">
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="block h-full origin-left bg-teal"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{ duration: paused ? 0.3 : duration / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="mr-3 font-mono text-sm tabular-nums text-muted">
                <span className="text-fg">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
              </span>
              {[
                { dir: -1, Icon: HiArrowLeft, label: "Previous" },
                { dir: 1, Icon: HiArrowRight, label: "Next" },
              ].map(({ dir, Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => paginate(dir)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg transition-all duration-300 hover:border-teal hover:bg-teal hover:text-ink-950"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;
