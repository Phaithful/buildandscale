import React from 'react';
import { motion } from 'framer-motion';
import './OrbitalLoader.css';

export default function OrbitalLoader() {
  return (
    <motion.div
      className="orbital-overlay"
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 0.25, delay: 0.3, times: [0, 0.5, 1] }}
    >
      <div className="orbital-scene">
        {/* Orbital rings — Framer Motion driven */}
        <motion.div
          className="orbit orbit-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orb orb-gold" />
        </motion.div>

        <motion.div
          className="orbit orbit-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orb orb-navy" />
        </motion.div>

        <motion.div
          className="orbit orbit-3"
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orb orb-tan" />
        </motion.div>

        {/* Centre nucleus */}
        <motion.div
          className="nucleus"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="nucleus-inner" />
        </motion.div>
      </div>

      {/* Branding */}
      <div className="orbital-brand">
        <img src="/Logo.svg" alt="Build & Scale 2026" className="orbital-brand-logo" />
      </div>
    </motion.div>
  );
}
