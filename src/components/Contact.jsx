import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUpRight, HiCheck, HiExclamationTriangle, HiPaperAirplane } from "react-icons/hi2";

import { contactText, socialLinks } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { EASE_OUT_EXPO, fadeUp } from "../utils/motion";
import Magnetic from "./ui/Magnetic";
import RevealText from "./ui/RevealText";

const socialIcons = { github: FaGithub, linkedin: FaLinkedinIn };
const EMPTY_FORM = { name: "", email: "", message: "", website: "" };

const Contact = () => {
  const { language } = useLanguage();
  const t = contactText[language];
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || `HTTP ${response.status}`);
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const buttonContent = {
    idle: { label: t.send, Icon: HiPaperAirplane },
    sending: { label: t.sending, Icon: null },
    sent: { label: t.sent, Icon: HiCheck },
    error: { label: t.error, Icon: HiExclamationTriangle },
  }[status];

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute bottom-[-20%] left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-teal/[0.12] blur-[160px]" />
      </div>

      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.div variants={fadeUp(0, 16)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted">05</span>
            <span className="eyebrow">{t.eyebrow}</span>
          </motion.div>

          <h2 className="mt-6 font-display font-semibold leading-[0.92] tracking-[-0.04em]">
            <RevealText key={`c1-${language}`} text={t.title1} className="block text-[clamp(2.75rem,5.6vw,5.25rem)] text-fg" />
            <RevealText
              key={`c2-${language}`}
              text={t.title2}
              delay={0.15}
              className="block text-[clamp(2.75rem,5.6vw,5.25rem)]"
              wordClassName="text-gradient"
            />
          </h2>

          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted"
          >
            {t.description}
          </motion.p>

          <motion.div variants={fadeUp(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t.socials}</p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <Magnetic key={s.name} strength={0.5}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="group flex items-center gap-3 rounded-full border border-line bg-ink-800/60 py-3 pl-3 pr-5 transition-colors duration-300 hover:border-teal"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-fg transition-colors duration-300 group-hover:bg-teal group-hover:text-ink-950">
                        <Icon />
                      </span>
                      <span className="text-sm text-fg">{s.name}</span>
                      <HiArrowUpRight className="text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-teal" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="card flex flex-col gap-8 p-7 sm:p-10 lg:col-span-6"
        >
          {/* Honeypot: hidden from people, irresistible to bots */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="field">
              <input id="name" type="text" name="name" required placeholder=" " value={form.name} onChange={handleChange} autoComplete="name" />
              <label htmlFor="name">{t.name}</label>
            </div>
            <div className="field">
              <input id="email" type="email" name="email" required placeholder=" " value={form.email} onChange={handleChange} autoComplete="email" />
              <label htmlFor="email">{t.email}</label>
            </div>
          </div>
          <div className="field">
            <textarea id="message" name="message" rows={6} required placeholder=" " value={form.message} onChange={handleChange} />
            <label htmlFor="message">{t.message}</label>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Magnetic strength={0.25}>
              <button
                type="submit"
                disabled={status === "sending"}
                className={`group relative inline-flex min-w-[220px] items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-medium transition-colors duration-500 ${
                  status === "error"
                    ? "bg-red-500/90 text-white"
                    : status === "sent"
                      ? "bg-emerald-400 text-ink-950"
                      : "bg-teal text-ink-950 shadow-[0_0_40px_-8px_rgba(0,221,221,0.7)]"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    {status === "sending" && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                    )}
                    {buttonContent.label}
                    {buttonContent.Icon && (
                      <buttonContent.Icon className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>
            <AnimatePresence>
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="max-w-[16rem] text-sm text-muted"
                >
                  {t.success}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
