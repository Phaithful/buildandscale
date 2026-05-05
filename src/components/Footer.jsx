import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Instagram, MessageCircle, ArrowRight, ArrowUp } from 'lucide-react';

function XLogo({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X (formerly Twitter)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import './Footer.css';

const LINKS = {
  Conference: [
    { label: 'Home', to: '/#home' },
    { label: 'About', to: '/#about' },
    { label: 'Speakers', to: '/#speakers' },
    { label: 'Programme', to: '/#programme' },
  ],
  Resources: [
    { label: 'Register', to: '/register' },
    { label: 'FAQ', to: '/#faq' },
    { label: 'Contact Us', to: '/#contact' },
  ],
};

const MARQUEE_TEXT = 'BUILD & SCALE 2026 · BUILDING MEN WHO BUILD SOCIETY · GODFREY OKOYE UNIVERSITY · ENUGU · BUILD & SCALE 2026 · BUILDING MEN WHO BUILD SOCIETY · GODFREY OKOYE UNIVERSITY · ENUGU ·';

/** Magnetic button — tracks mouse, snaps back with CSS transition */
function MagneticPill({ children, className, as: Tag = 'button', onClick, href, to }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (to) {
    // Hash links — scroll to section instead of navigating
    if (to.startsWith('/#')) {
      const sectionId = to.replace('/#', '');
      return (
        <a
          ref={ref}
          href={to}
          className={`footer__pill ${className || ''}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {children}
        </a>
      );
    }
    return (
      <Link ref={ref} to={to} className={`footer__pill ${className || ''}`}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={`footer__pill ${className || ''}`}>
        {children}
      </a>
    );
  }
  return (
    <Tag ref={ref} onClick={onClick} className={`footer__pill ${className || ''}`}>
      {children}
    </Tag>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const linksInView = useInView(linksRef, { once: true, margin: '-80px' });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /*
     * Curtain reveal wrapper:
     * The height: 100vh div sits in the page flow.
     * clip-path restricts visibility to this bounding box,
     * so the fixed footer is only seen while scrolled into this area.
     */
    <div
      ref={wrapperRef}
      className="footer__curtain-wrap"
    >
      <footer className="footer">
        {/* Aurora glow */}
        <div className="footer__aurora" />
        {/* Grid background */}
        <div className="footer__grid-bg" />

        {/* Giant background text */}
        <div className="footer__giant-text" aria-hidden="true">
          BUILD &amp; SCALE
        </div>

        {/* 1. Diagonal marquee */}
        <div className="footer__marquee-band">
          <div className="footer__marquee-inner">
            {[MARQUEE_TEXT, MARQUEE_TEXT].map((t, i) => (
              <span key={i} className="footer__marquee-text">{t}&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        {/* 2. Main centre content */}
        <div className="footer__center">
          <motion.h2
            ref={headingRef}
            className="footer__heading"
            initial={{ y: 40, opacity: 0 }}
            animate={headingInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            Ready to build?
          </motion.h2>

          <motion.div
            ref={linksRef}
            className="footer__cta-group"
            initial={{ y: 30, opacity: 0 }}
            animate={linksInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
          >
            {/* Primary CTA pills */}
            <div className="footer__cta-row">
              <MagneticPill to="/register" className="footer__pill--primary">
                <span>Register Now</span>
                <ArrowRight size={15} />
              </MagneticPill>
              <MagneticPill
                as="button"
                className="footer__pill--secondary"
                onClick={() => scrollTo('programme')}
              >
                View Programme
              </MagneticPill>
            </div>

            {/* Secondary nav pills */}
            <div className="footer__nav-row">
              {Object.entries(LINKS).flatMap(([, links]) => links).map((l) => (
                <MagneticPill
                  key={l.label}
                  to={l.to}
                  className="footer__pill--nav"
                >
                  {l.label}
                </MagneticPill>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. Bottom bar */}
        <div className="footer__bottom">
          {/* Brand block */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/Logo.svg" alt="Build & Scale 2026" className="footer__logo-img" />
            </div>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram"><Instagram size={15} /></a>
              <a href="#" className="footer__social" aria-label="X (formerly Twitter)"><XLogo size={15} /></a>
              <a href="#" className="footer__social" aria-label="WhatsApp"><MessageCircle size={15} /></a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer__copy-wrap">
            <p className="footer__copy">© {year} Build & Scale 2026 · Godfrey Okoye University</p>
            <p className="footer__credit">Convened by Azua Suurshater Stephen ·  GO University</p>
          </div>

          {/* Back to top */}
          <MagneticPill as="button" className="footer__pill--top" onClick={scrollToTop}>
            <ArrowUp size={16} />
          </MagneticPill>
        </div>
      </footer>
    </div>
  );
}
