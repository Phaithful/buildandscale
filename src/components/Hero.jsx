import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Target } from 'lucide-react';
import { CONFERENCE_DATE } from '../utils/data';
import './Hero.css';

const SESSIONS = [
  'Entrepreneurship', 'Leadership', 'Execution', 'Innovation',
  'Networking', 'Vision', 'Discipline', 'Growth',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay },
});

export default function Hero() {
  const registrationOpen = new Date() < CONFERENCE_DATE;
  return (
    <section className="hero" id="home">
      {/* Background — conference hall image */}
      <div className="hero__bg">
        <img
          src="/images/conference-room.jpg"
          alt="Conference hall"
          className="hero__bg-img"
          loading="eager"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="hero__bg-overlay" />
        <div className="hero__grain" />
      </div>

      {/* Floating geometric accents */}
      <div className="hero__geo hero__geo--1" />
      <div className="hero__geo hero__geo--2" />
      <div className="hero__geo hero__geo--3" />

      <div className="hero__content container">
        <div className="hero__layout">

          {/* LEFT — main copy */}
          <div className="hero__left">
            {/* Badge */}
            <motion.div className="hero__badge" {...fadeUp(0.05)}>
              <span className="hero__badge-dot" />
              <span>Godfrey Okoye University · Enugu</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 className="hero__headline" {...fadeUp(0.18)}>
              Building Men<br />
              <em>Who Build</em><br />
              Society
            </motion.h1>

            {/* Subheadline */}
            <motion.p className="hero__sub" {...fadeUp(0.30)}>
              A one-day conference for the next generation of Nigerian builders.
              Ideas are not enough, come to learn the discipline of execution.
            </motion.p>

            {/* Event meta */}
            <motion.div className="hero__meta" {...fadeUp(0.40)}>
              <div className="hero__meta-item">
                <Calendar size={15} />
                <span>Friday, 30th May 2026 · 8:00 AM</span>
              </div>
              <div className="hero__meta-divider" />
              <div className="hero__meta-item">
                <MapPin size={15} />
                <span>Peter Mbah Law Auditorium</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div className="hero__ctas" {...fadeUp(0.50)}>
              <Link to="/register" className="hero__cta-primary">
                <span>Secure Your Seat</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="#about"
                className="hero__cta-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* RIGHT — stats card + session marquee */}
          <motion.div
            className="hero__right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
          >
            {/* Stats card */}
            <div className="hero__card">
              <div className="hero__card-top">
                <div className="hero__card-icon">
                  <Target size={22} />
                </div>
                <div>
                  <div className="hero__card-big">100+</div>
                  <div className="hero__card-sublabel">Expected Attendees</div>
                </div>
              </div>

              {/* Satisfaction bar */}
              <div className="hero__card-bar-wrap">
                <div className="hero__card-bar-row">
                  <span className="hero__card-bar-label">Interest Rate</span>
                  <span className="hero__card-bar-pct">98%</span>
                </div>
                <div className="hero__card-bar-track">
                  <div className="hero__card-bar-fill" />
                </div>
              </div>

              <div className="hero__card-divider" />

              {/* Mini stats grid */}
              <div className="hero__card-grid">
                <div className="hero__card-stat">
                  <span className="hero__card-stat-num">8+</span>
                  <span className="hero__card-stat-label">Speakers</span>
                </div>
                <div className="hero__card-sep" />
                <div className="hero__card-stat">
                  <span className="hero__card-stat-num">4</span>
                  <span className="hero__card-stat-label">Sessions</span>
                </div>
                <div className="hero__card-sep" />
                <div className="hero__card-stat">
                  <span className="hero__card-stat-num">1</span>
                  <span className="hero__card-stat-label">Day</span>
                </div>
              </div>

              {/* Tags */}
              <div className="hero__card-tags">
                <span className={`hero__card-tag ${registrationOpen ? 'hero__card-tag--open' : 'hero__card-tag--closed'}`}>
                  <span className="hero__card-ping-wrap">
                    <span className="hero__card-ping" />
                    <span className="hero__card-ping-core" />
                  </span>
                  {registrationOpen ? 'Registration Open' : 'Registration Closed'}
                </span>
                <span className="hero__card-tag">
                  Free Entry
                </span>
              </div>
            </div>

            {/* Session marquee card */}
            <div className="hero__marquee-card">
              <p className="hero__marquee-label">Topics Covered</p>
              <div className="hero__marquee-track-wrap">
                <div className="hero__marquee-track">
                  {[...SESSIONS, ...SESSIONS].map((s, i) => (
                    <span key={i} className="hero__marquee-item">
                      {s} <span className="hero__marquee-dot">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
