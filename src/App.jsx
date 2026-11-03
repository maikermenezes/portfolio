import { useState } from "react";
import { MotionConfig } from "framer-motion";

import {
  About,
  Contact,
  Cursor,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Preloader,
  ScrollProgress,
  TechMarquee,
  Works,
} from "./components";
import { useLenis } from "./hooks/useLenis";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis(loaded);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onComplete={() => setLoaded(true)} />
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden />

      <Navbar />
      <main className="relative">
        <Hero ready={loaded} />
        <TechMarquee />
        <About />
        <Experience />
        <Works />
        <Feedbacks />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
};

export default App;
