import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

export default function CtaBanner({
  label,
  title,
  desc,
  btnText,
  btnLink = '/contact',
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef(null);

  // Tracks cursor relative position inside the card container to update the spotlight overlay variables
  const handleMouseMove = (e) => {
    if (!cardRef.current || reduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <section className="cta-banner-section">
      <div className="container">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="cta-banner-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Animated decorative shapes in the background */}
          {!reduced && (
            <>
              <motion.div
                className="cta-banner-card__glow-blob cta-banner-card__glow-blob--1"
                animate={{
                  scale: [1, 1.2, 0.9, 1],
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="cta-banner-card__glow-blob cta-banner-card__glow-blob--2"
                animate={{
                  scale: [1, 0.9, 1.15, 1],
                  x: [0, -30, 30, 0],
                  y: [0, 20, -40, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Dot network grid overlay */}
              <div className="cta-banner-card__grid" />
            </>
          )}

          <div className="cta-banner-card__content">
            {label && (
              <motion.div variants={fadeUp} style={{ display: 'inline-block' }}>
                <SectionLabel text={label} />
              </motion.div>
            )}

            <motion.h2 className="cta-banner-card__title" variants={fadeUp}>
              {title}
            </motion.h2>

            <motion.p className="cta-banner-card__desc" variants={fadeUp}>
              {desc}
            </motion.p>

            <motion.div
              variants={fadeUp}
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              style={{ display: 'inline-block' }}
            >
              <Link to={btnLink} className="cta-btn-premium">
                {btnText}
                <motion.span
                  animate={reduced ? {} : { x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: 'easeInOut',
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
