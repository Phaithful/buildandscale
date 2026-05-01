import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Speakers', href: '/#speakers' },
  { label: 'Programme', href: '/#programme' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const [path, hash] = href.split('#');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${!isHome || scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-mark">B&S</div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-title">Build & Scale</span>
              <span className="navbar__logo-year">2026</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar__actions">
            <Link to="/register" className="navbar__cta">
              <span>Register Now</span>
              <div className="navbar__cta-shine" />
            </Link>
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`}>
        {/* Decorative background text */}
        <span className="mobile-drawer__bg-text" aria-hidden="true">B&amp;S</span>

        {/* Header row */}
        <div className="mobile-drawer__header">
          <div className="mobile-drawer__brand">
            <div className="mobile-drawer__brand-mark">B&amp;S</div>
            <span className="mobile-drawer__brand-name">Build &amp; Scale</span>
          </div>
          <button
            className="mobile-drawer__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <ul className="mobile-drawer__links">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label} style={{ animationDelay: `${i * 0.07}s` }}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="mobile-drawer__link"
              >
                <span className="mobile-drawer__link-label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer CTA + info */}
        <div className="mobile-drawer__footer">
          <Link
            to="/register"
            className="mobile-drawer__cta"
            onClick={() => setMenuOpen(false)}
          >
            Register Now
          </Link>
          <p className="mobile-drawer__date">30th May 2026 · Enugu</p>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-drawer__backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
