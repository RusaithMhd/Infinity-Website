import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WhyChooseItem({ icon, title, desc, index, fadeUp, reduced }) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.25;

  return (
    <motion.div
      className="why-item"
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduced ? {} : {
        x: 8,
        backgroundColor: 'var(--bg-alt)',
        boxShadow: '0 8px 30px rgba(30,140,126,0.06)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ originX: 0 }}
    >
      <motion.div
        className="why-item__dot"
        style={{ color: 'white' }}
        animate={reduced || hovered ? {} : {
          y: [0, -4, 0]
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 2.8,
            ease: 'easeInOut',
            delay: floatDelay
          }
        }}
        whileHover={reduced ? {} : {
          scale: 1.12,
          rotate: [0, -8, 8, 0],
          transition: { duration: 0.4 }
        }}
      >
        {icon}
      </motion.div>
      <div>
        <h4 className="why-item__title">{title}</h4>
        <p className="why-item__desc">{desc}</p>
      </div>
    </motion.div>
  );
}
