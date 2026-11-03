import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { HiArrowUpRight, HiOutlineGlobeAlt, HiOutlineLockClosed } from "react-icons/hi2";

import { projects, projectsText, socialLinks, ui } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "../utils/motion";
import SectionHeading from "./ui/SectionHeading";

const linkIcons = { live: HiOutlineGlobeAlt, store: FaGooglePlay, code: FaGithub, internal: HiOutlineLockClosed };

const ProjectVisual = ({ image, name, link, host, viewLabel }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  // Projects without a public link render as a plain (non-clickable) frame.
  const Frame = link ? motion.a : motion.div;
  const linkProps = link
    ? { href: link, target: "_blank", rel: "noreferrer", "data-cursor": viewLabel, "aria-label": `${name} — ${host}` }
    : {};

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <Frame
        {...linkProps}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ clipPath: "inset(18% 18% 18% 18% round 28px)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.3, ease: EASE_IN_OUT }}
        className="group relative block overflow-hidden rounded-[28px] border border-line bg-ink-800 p-2 shadow-[0_40px_120px_-40px_rgba(0,221,221,0.25)]"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 pb-2.5 pt-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-full bg-white/[0.05] px-4 py-1 font-mono text-[10px] text-muted">
            {!link && <HiOutlineLockClosed className="shrink-0" />}
            {host}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            style={{ y: imgY }}
            className="absolute inset-x-0 -top-[5%] h-[110%] w-full object-cover object-center transition-[filter] duration-700 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-30" />
          <div className="absolute inset-0 bg-teal/0 mix-blend-color transition-colors duration-700 group-hover:bg-teal/10" />
        </div>
      </Frame>
    </div>
  );
};

const ProjectRow = ({ project, index, reverse, labels }) => {
  const LinkIcon = linkIcons[project.linkType] ?? HiArrowUpRight;
  return (
  <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
    <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
      <ProjectVisual
        image={project.image}
        name={project.name}
        link={project.link}
        host={project.host}
        viewLabel={labels.view}
      />
    </div>

    <motion.div
      className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {[
        <div key="meta" className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-teal">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-line" />
          <span>{project.category}</span>
          {project.year && <span className="ml-auto">{project.year}</span>}
        </div>,
        <h3 key="name" className="mt-6 font-display text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          {project.name}
        </h3>,
        <p key="desc" className="mt-5 text-lg leading-relaxed text-muted">
          {project.description}
        </p>,
        <div key="tags" className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-teal/20 bg-teal/[0.05] px-3 py-1.5 font-mono text-xs text-teal-300">
              {tag}
            </span>
          ))}
        </div>,
        project.link ? (
          <a
            key="link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 border-b border-white/20 pb-1 font-medium text-fg transition-colors hover:border-teal hover:text-teal"
          >
            <LinkIcon /> {labels.links[project.linkType]}
            <HiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : (
          <span
            key="link"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted"
          >
            <LinkIcon /> {labels.links[project.linkType]}
          </span>
        ),
      ].map((child) => (
        <motion.div
          key={child.key}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  </article>
  );
};

const Works = () => {
  const { language } = useLanguage();
  const t = projectsText[language];
  const github = socialLinks.find((s) => s.icon === "github");

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="03" eyebrow={t.eyebrow} title={t.title} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="max-w-md text-lg leading-relaxed text-muted"
          >
            {t.description}
          </motion.p>
        </div>

        <div className="mt-20 flex flex-col gap-28 sm:gap-36">
          {projects[language].map((project, i) => (
            <ProjectRow
              key={project.name}
              project={project}
              index={i}
              reverse={i % 2 === 1}
              labels={{ view: ui[language].viewProject, links: t.links }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <a
            href={github.link}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-teal hover:text-teal"
          >
            <FaGithub size={16} /> github.com/maikermenezes
            <HiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
