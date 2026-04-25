import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
<<<<<<< HEAD
import Education from './components/Education';
import Experience from './components/Experience';
=======
import Experience from './components/Experience';
import Education from './components/Education';
>>>>>>> a8ffe3d (upgarted my portfolio)
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
=======
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
>>>>>>> a8ffe3d (upgarted my portfolio)
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
<<<<<<< HEAD
        <Education />
        <Experience />
=======
        <Experience />
        <Education />
>>>>>>> a8ffe3d (upgarted my portfolio)
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
