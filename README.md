# Maike Menezes — Portfolio

Personal portfolio built with **React 18 + Vite**, **Tailwind CSS**, **Framer Motion**, **Three.js / React Three Fiber** and **Lenis**. Bilingual (PT / EN).

## Highlights

- **Preloader** with the logo and a progress counter, followed by a curtain reveal
- **WebGL hero orb**: a custom GLSL shader displaces ~14k points with 3D simplex noise and reacts to the mouse (lazy-loaded)
- **Custom cursor** with a magnetic hover state and contextual labels ("View")
- **Magnetic buttons**, word-mask text reveals, film grain, and a scroll progress bar
- **Tech marquee** whose speed and skew react to scroll velocity
- **Bento About grid** with a bio that brightens word by word on scroll, a self-typing code card, animated counters, and cards with a spotlight effect that follows the mouse
- **Scroll-driven timeline** for experience
- **Project showcases** with a clip-path reveal, inner parallax and 3D tilt
- **Testimonial carousel** with autoplay progress, avatar tabs and drag/swipe
- **Contact form** sent through [Resend](https://resend.com) (serverless `api/contact.js`) with a branded HTML email template, honeypot spam protection and animated send states
- Respects `prefers-reduced-motion`; the language choice is persisted in `localStorage`

## Scripts

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run lint
```

Content (texts, experiences, projects, testimonials) lives in `src/constants/index.js`.

## Contact form (Resend)

Create a `.env` (git-ignored) with:

```bash
RESEND_API_KEY=re_...
MY_EMAIL=you@example.com
# optional, after verifying a domain in Resend:
# RESEND_FROM="Portfolio <contact@yourdomain.com>"
```

- `npm run dev` serves `POST /api/contact` through a Vite middleware (see `vite.config.js`).
- In production, `api/contact.js` runs as a Vercel serverless function. Set the same variables in the project's environment settings.
- The email template lives in `server/emailTemplate.js`.
