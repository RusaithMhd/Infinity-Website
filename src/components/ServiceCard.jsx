import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function ServiceCard({ icon, title, desc, index, fadeUp, reduced, features, showLink = true }) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.3;

  return (
    <motion.div
      className="service-card"
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduced ? {} : {
        y: -10,
        boxShadow: '0 24px 52px rgba(15,46,43,0.12), 0 0 0 2px rgba(30,140,126,0.20)',
      }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <motion.div
        className="service-card__icon"
        animate={reduced || hovered ? {} : {
          y: [0, -5, 0]
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3.2,
            ease: 'easeInOut',
            delay: floatDelay
          }
        }}
        whileHover={reduced ? {} : {
          scale: 1.1,
          rotate: 5,
        }}
      >
        {icon}
      </motion.div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc" style={{ marginBottom: '18px' }}>{desc}</p>

      {features && features.length > 0 && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', textAlign: 'left' }}>
          {features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.87rem', color: 'var(--text-muted)' }}>
              <ChevronRight size={14} color="var(--accent)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
      )}
      
      {showLink && (
        <motion.div
          className="service-card__link"
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            Learn more <ArrowRight size={14}/>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
