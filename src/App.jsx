import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#09090b] text-slate-100 antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" tabIndex="-1" className="pt-16 focus:outline-none">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>

        <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}