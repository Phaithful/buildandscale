import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle, ChevronUp } from 'lucide-react';
import { FAQS } from '../utils/data';
import './FAQ.css';

function AccordionItem({ item, index, isOpen, onToggle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: (index % 5) * 0.07 }}
    >
      <button
        className="faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq__trigger-icon">
          <HelpCircle size={16} />
        </span>
        <span className="faq__question">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: 'flex', flexShrink: 0 }}
        >
          <ChevronDown size={18} className="faq__chevron" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="faq__answer">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const INITIAL_COUNT = 4;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const listInView = useInView(listRef, { once: true, margin: '-60px' });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  const visibleFaqs = showAll ? FAQS : FAQS.slice(0, INITIAL_COUNT);
  const hasMore = FAQS.length > INITIAL_COUNT;

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__inner">
          {/* Left — header */}
          <motion.div
            ref={headerRef}
            className="faq__header"
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="section-label">Common Questions</div>
            <h2 className="faq__title">
              Questions? <br /><em>Answered.</em>
            </h2>
            <p className="faq__sub">
              Everything you need to know before the 30th. Can't find what you're looking for?
              Reach out via the contact section below.
            </p>
            <div className="faq__contact-nudge">
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Still have questions? Contact us →
              </a>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            ref={listRef}
            className="faq__list"
            initial={{ opacity: 0, x: 30 }}
            animate={listInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <AnimatePresence initial={false}>
              {visibleFaqs.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </AnimatePresence>

            {hasMore && (
              <button
                className={`faq__show-more ${showAll ? 'faq__show-more--less' : ''}`}
                onClick={() => {
                  if (showAll) setOpenIndex(null);
                  setShowAll(!showAll);
                }}
              >
                {showAll ? (
                  <>Show Less <ChevronUp size={15} /></>
                ) : (
                  <>Show More <span className="faq__show-more-count">+{FAQS.length - INITIAL_COUNT}</span> <ChevronDown size={15} /></>
                )}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
