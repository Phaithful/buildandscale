import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROGRAMME } from '../utils/data';
import './Programme.css';

const TYPE_COLORS = {
  keynote:   { bg: '#000080', label: 'Keynote' },
  workshop:  { bg: '#85754D', label: 'Workshop' },
  panel:     { bg: '#708090', label: 'Panel' },
  break:     { bg: '#E6BE8A', label: 'Break' },
  logistics: { bg: '#b0b8c4', label: 'Registration' },
  ceremony:  { bg: '#a0aab4', label: 'Ceremony' },
};

function ProgrammeItem({ item, index, isActive, onToggle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const side = index % 2 === 0 ? 'left' : 'right';
  const type = TYPE_COLORS[item.type] || TYPE_COLORS.ceremony;

  return (
    <motion.div
      ref={ref}
      className={`programme__item programme__item--${side} ${isActive ? 'programme__item--active' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: (index % 4) * 0.08 }}
      onClick={onToggle}
    >
      <div className="programme__time">{item.time}</div>
      <div className="programme__node" style={{ background: type.bg }} />
      <div className="programme__card">
        <div
          className="programme__card-type"
          style={{ color: type.bg, borderColor: `${type.bg}30`, background: `${type.bg}10` }}
        >
          {type.label}
        </div>
        <h4 className="programme__card-title">{item.title}</h4>
        <p className={`programme__card-desc ${isActive ? 'programme__card-desc--visible' : ''}`}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Programme() {
  const [active, setActive] = useState(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="programme" id="programme">
      <div className="programme__wave-top">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" fill="#FAF9F6" />
        </svg>
      </div>

      <div className="container">
        <motion.div
          ref={headerRef}
          className="programme__header"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="section-label">Event Schedule</div>
          <h2 className="programme__title">
            What Happens <em>On The Day</em>
          </h2>
          <p className="programme__sub">
            Friday, 30th May 2026 · A full day of building, learning, and connecting.
          </p>
        </motion.div>

        <div className="programme__timeline">
          <div className="programme__line" />
          {PROGRAMME.map((item, i) => (
            <ProgrammeItem
              key={i}
              item={item}
              index={i}
              isActive={active === i}
              onToggle={() => setActive(active === i ? null : i)}
            />
          ))}
        </div>
      </div>

      <div className="programme__wave-bottom">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#FAF9F6" />
        </svg>
      </div>
    </section>
  );
}
