import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import About from '../components/About';
import Stats from '../components/Stats';
import Speakers from '../components/Speakers';
import Programme from '../components/Programme';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import './HomePage.css';

export default function HomePage() {
  useScrollRevealAll();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Build & Scale 2026 — Building Men Who Build Society';
  }, []);

  return (
    <main className="home page-enter">
      <Hero />
      <Countdown />
      <Stats />
      <About />
      <Speakers />
      <Programme />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
