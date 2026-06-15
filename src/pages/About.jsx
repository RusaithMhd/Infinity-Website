import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Eye, Users, Scale, Rocket, Leaf, Trophy,
  Globe, Shield, Award, Lock, ArrowRight
} from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import CtaBanner from '../components/CtaBanner';

/* ─── Animation variants ───────────────────────────────────── */
function makeVariants(reduced) {
  const fadeUp = {
    hidden:  { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const vp = { once: true, amount: 0.15 };
  return { fadeUp, stagger, vp };
}

/* ─── Data ─────────────────────────────────────────────────── */
const values = [
  { icon: <Eye size={28} />,      title: 'Vision',        desc: 'We look beyond the immediate to build strategies that sustain decades of growth.' },
  { icon: <Users size={28} />,    title: 'Partnership',   desc: 'True collaboration at every level — we are invested in your outcomes as deeply as you are.' },
  { icon: <Scale size={28} />,    title: 'Integrity',     desc: 'Honest counsel, transparent practices, and ethical conduct in everything we do.' },
  { icon: <Rocket size={28} />,   title: 'Innovation',    desc: 'Constantly evolving our thinking and tools to keep our clients ahead of the curve.' },
  { icon: <Leaf size={28} />,     title: 'Sustainability',desc: 'Growth that respects people, communities, and the planet we share.' },
  { icon: <Trophy size={28} />,   title: 'Excellence',    desc: 'We set a high bar for ourselves because our clients deserve nothing less.' },
];

const reliabilityFeatures = [
  { icon: <Shield size={28} />, title: 'Proven Track Record', desc: 'Over a decade of consistent, measurable success across 30+ countries.' },
  { icon: <Award size={28} />, title: 'Industry Recognized', desc: 'Award-winning strategies and recognized excellence in global consulting.' },
  { icon: <Lock size={28} />, title: 'Uncompromising Security', desc: 'Rigorous data protection, ethical standards, and confidentiality protocols you can trust.' },
];

const milestones = [
  { year: '2009', event: 'Founded in London with a vision to connect businesses across borders.' },
  { year: '2013', event: 'Expanded into the Gulf Cooperation Council, establishing regional offices.' },
  { year: '2017', event: 'Launched our Digital Transformation practice, serving 50+ enterprise clients.' },
  { year: '2020', event: 'Crossed 200 strategic alliances facilitated globally.' },
  { year: '2024', event: 'Active in 30+ countries with a network of 300+ global partners.' },
];

/* ─── Value Card Component ─────────────────────────────────── */
function ValueCard({ v, index, fadeUp, reduced }) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.28;

  return (
    <motion.div
      className="value-card"
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduced || hovered ? { y: 0 } : {
        y: [0, -4, 0]
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
        y: -8,
        boxShadow: '0 20px 48px rgba(15,46,43,0.08), 0 0 0 2px rgba(30,140,126,0.12)'
      }}
    >
      <motion.div
        className="value-card__icon"
        style={{ color: 'var(--accent)' }}
        animate={reduced || hovered ? {} : {
          y: [0, -3, 0]
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
          scale: 1.1,
          rotate: 5,
        }}
      >
        {v.icon}
      </motion.div>
      <h3 className="value-card__title">{v.title}</h3>
      <p className="value-card__desc">{v.desc}</p>
    </motion.div>
  );
}

/* ─── Removed Leader Card Component ──────────────────────── */

/* ─── Page Component ───────────────────────────────────────── */
export default function About() {
  const reduced = useReducedMotion();
  const { fadeUp, stagger, vp } = makeVariants(reduced);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <SectionLabel text="Our Story" />
          <h1 className="page-hero__title">Built on Alliance, Driven by Purpose</h1>
          <p className="page-hero__desc">
            For over 15 years, Infinity Allianze International has helped businesses
            transcend borders, forge powerful partnerships, and achieve extraordinary growth.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container about-intro">
          <motion.div className="about-intro__visual"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <motion.div
              className="about-intro__img-wrap"
              style={{
                background: 'url(/about_network.png) center/cover no-repeat',
                height: '420px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)'
              }}
              animate={reduced ? {} : {
                y: [0, -8, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <div className="about-intro__badge">
              <div className="about-intro__badge-value">15+</div>
              <div className="about-intro__badge-label">Years of Impact</div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            transition={{ delay: 0.15 }}
          >
            <SectionLabel text="Our Mission" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '20px' }}>
              Connecting Ambition with Opportunity
            </h2>
            <p className="text-muted" style={{ lineHeight: 1.8, marginBottom: '20px' }}>
              At Infinity Allianze International, our mission is to bridge the gap between
              ambition and achievement. We believe that the right alliance can transform a
              good business into a great one — and a great business into a global force.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.8, marginBottom: '32px' }}>
              Our international team brings together expertise across finance, technology,
              operations, and government relations — giving our clients an unparalleled
              advantage in any market they choose to enter.
            </p>
            <motion.div
              whileHover={reduced ? {} : { scale: 1.04 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-block' }}
            >
              <Link to="/contact" className="btn btn--primary">
                Work With Us <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--alt">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: '56px' }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <SectionLabel text="Our Values" />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              The Principles That Guide Us
            </h2>
          </motion.div>
          
          <motion.div className="values-grid"
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            {values.map((v, idx) => (
              <ValueCard
                key={v.title}
                v={v}
                index={idx}
                fadeUp={fadeUp}
                reduced={reduced}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Image Banner */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.img 
            src="/about_team.png" 
            alt="Corporate Team" 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={vp}
            style={{ 
              width: '100%', 
              height: '500px', 
              objectFit: 'cover', 
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)'
            }} 
          />
        </div>
      </section>

      {/* Reliability */}
      <section className="section section--alt">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: '56px' }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <SectionLabel text="Why Trust Us" />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              Unwavering Reliability
            </h2>
          </motion.div>
          
          <motion.div className="values-grid"
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            {reliabilityFeatures.map((feat, idx) => (
              <ValueCard
                key={feat.title}
                v={feat}
                index={idx}
                fadeUp={fadeUp}
                reduced={reduced}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to Join the Alliance?"
        desc="Let's discuss how we can align our expertise with your ambitions."
        btnText="Get Started Today"
        btnLink="/contact"
      />
    </>
  );
}
