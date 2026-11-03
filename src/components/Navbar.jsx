import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

import { logo } from "../assets";
import { navLinks, socialLinks, ui } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { scrollToTarget } from "../hooks/useLenis";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "../utils/motion";

const LanguageToggle = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative flex items-center rounded-full border border-line bg-white/[0.03] p-1 font-mono text-[11px] ${className}`}
    >
      {["pt", "en"].map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`relative z-10 rounded-full px-3 py-1.5 uppercase tracking-widest transition-colors duration-300 ${
            language === lang ? "text-ink-950" : "text-muted hover:text-fg"
          }`}
        >
          {language === lang && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 -z-10 rounded-full bg-teal"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          {lang}
        </button>
      ))}
    </div>
  );
};

const useActiveSection = (ids) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const SECTION_IDS = ["hero", "about", "experience", "work", "testimonials", "contact"];

const Navbar = () => {
  const { language } = useLanguage();
  const links = navLinks[language];
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 400 && !open);
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: hidden ? 0 : 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "border-line bg-ink-900/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#hero" onClick={go("hero")} className="group flex items-center gap-3 pl-1" aria-label="Maike Menezes — home">
            <img
              src={logo}
              alt=""
              className="h-9 w-9 transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
            />
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-fg xs:block">
              Maike Menezes
            </span>
          </a>

          <ul className="relative hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active === link.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-teal/30 bg-teal/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? ui[language].close : ui[language].menu}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] lg:hidden"
            >
              <motion.span
                className="absolute h-px w-4 bg-fg"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.35, ease: EASE_IN_OUT }}
              />
              <motion.span
                className="absolute h-px w-4 bg-fg"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.35, ease: EASE_IN_OUT }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <li key={link.id} className="overflow-hidden">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.06 }}
                    className={`flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight ${
                      active === link.id ? "text-teal" : "text-fg"
                    }`}
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    {link.title}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="flex">
                <LanguageToggle />
              </div>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-muted">
                {socialLinks.map((s) => (
                  <a key={s.name} href={s.link} target="_blank" rel="noreferrer" className="hover:text-teal">
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
