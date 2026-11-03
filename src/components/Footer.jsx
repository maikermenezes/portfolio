import { motion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

import { logo } from "../assets";
import { navLinks, socialLinks, ui } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { scrollToTarget } from "../hooks/useLenis";
import { EASE_OUT_EXPO } from "../utils/motion";
import Magnetic from "./ui/Magnetic";

const WORDMARK = "MAIKE";

const Footer = () => {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-900 pt-20">
      <div className="container-x">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="" className="h-12 w-12" />
            <div>
              <p className="font-display text-lg font-semibold text-fg">Maike Menezes</p>
              <p className="text-sm text-muted">Software Engineer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <ul className="space-y-3 text-sm">
              {navLinks[language].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(link.id);
                    }}
                    className="text-muted transition-colors hover:text-teal"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 text-sm">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a href={s.link} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-teal">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              aria-label={t.backToTop}
              className="group flex h-16 w-16 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-ink-950"
            >
              <HiArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </Magnetic>
        </div>

        <div aria-hidden className="mt-16 flex select-none justify-center overflow-hidden">
          {WORDMARK.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
              className="inline-block bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text font-display text-[min(24vw,20rem)] font-bold leading-[0.78] tracking-[-0.02em] text-transparent"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Maike Menezes</span>
          <span>{t.builtWith}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
