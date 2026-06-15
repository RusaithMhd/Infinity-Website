import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Handshake, BarChart3, Globe, Lightbulb, Briefcase, TrendingUp,
  Landmark, GraduationCap, ChevronRight, ArrowRight,
} from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ServiceCard from '../components/ServiceCard';
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
const services = [
  {
    icon: <Handshake size={22} />,
    title: 'Strategic Alliances',
    desc: 'We identify, negotiate, and structure alliances between complementary businesses — creating ecosystems of mutual growth, shared resources, and amplified market reach.',
    features: ['Partnership identification', 'Deal structuring', 'Alliance governance', 'Performance tracking'],
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Business Consulting',
    desc: 'Deep-dive analysis of your operations, market position, and competitive landscape to produce actionable strategies that deliver measurable ROI.',
    features: ['Market analysis', 'Operational audit', 'Strategy roadmaps', 'KPI frameworks'],
  },
  {
    icon: <Globe size={22} />,
    title: 'Market Expansion',
    desc: 'Entry into new geographies requires local intelligence, regulatory know-how, and the right partners. We provide all three, from feasibility through to launch.',
    features: ['Feasibility studies', 'Regulatory navigation', 'Local partner network', 'Go-to-market planning'],
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Digital Transformation',
    desc: 'Modernise your business model with technology that drives efficiency, enhances customer experience, and creates new revenue streams.',
    features: ['Tech stack assessment', 'Process automation', 'Digital roadmap', 'Change management'],
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Investment Advisory',
    desc: 'From Series A to large-scale M&A, our investment advisory team provides rigorous due diligence, deal origination, and portfolio support.',
    features: ['Due diligence', 'Deal origination', 'Portfolio management', 'Exit strategies'],
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Growth Strategy',
    desc: 'Bespoke, data-backed growth strategies that identify your highest-leverage opportunities and create a clear path to scaling sustainably.',
    features: ['Growth diagnostics', 'Revenue modelling', 'Channel strategy', 'Scaling playbooks'],
  },
  {
    icon: <Landmark size={22} />,
    title: 'Government Relations',
    desc: 'Navigate regulatory environments and government ecosystems with confidence. We connect businesses with the right stakeholders at national and supranational levels.',
    features: ['Policy intelligence', 'Stakeholder mapping', 'Regulatory advocacy', 'Public sector contracts'],
  },
  {
    icon: <GraduationCap size={22} />,
    title: 'Leadership Development',
    desc: 'Invest in your most critical asset — your people. Our bespoke leadership programmes build the strategic thinkers and change agents your organisation needs.',
    features: ['Executive coaching', 'Leadership workshops', 'Succession planning', 'Team effectiveness'],
  },
];

const process = [
  { step: '01', title: 'Discovery',  desc: 'Deep dive into your business, goals, and challenges through structured workshops and analysis.' },
  { step: '02', title: 'Strategy',   desc: 'We develop a tailored plan with clear objectives, timelines, and success metrics.' },
  { step: '03', title: 'Execution',  desc: 'Our team works alongside yours to implement strategies with agility and precision.' },
  { step: '04', title: 'Optimise',   desc: 'Continuous monitoring and refinement to ensure sustained results and long-term impact.' },
];

/* ─── Process Card Component ───────────────────────────────── */
function ProcessCard({ p, index, fadeUp, reduced }) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.35;

  return (
    <motion.div
      className="service-card"
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduced || hovered ? { y: 0 } : {
        y: [0, -5, 0]
      }}
      transition={{
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 3.4,
          ease: 'easeInOut',
          delay: floatDelay
        }
      }}
      whileHover={reduced ? {} : {
        y: -10,
        boxShadow: '0 24px 52px rgba(15,46,43,0.12), 0 0 0 2px rgba(30,140,126,0.15)'
      }}
    >
      <motion.div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '3rem',
          fontWeight: 800,
          color: 'var(--border-strong)',
          lineHeight: 1,
          marginBottom: '16px',
        }}
        animate={reduced || hovered ? { scale: 1.05 } : {}}
      >
        {p.step}
      </motion.div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>{p.title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
    </motion.div>
  );
}

/* ─── Page Component ───────────────────────────────────────── */
export default function Services() {
  const reduced = useReducedMotion();
  const { fadeUp, stagger, vp } = makeVariants(reduced);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <SectionLabel text="Our Services" />
          <h1 className="page-hero__title">Comprehensive Solutions. Measurable Results.</h1>
          <p className="page-hero__desc">
            From strategic alliances to digital transformation — every service we offer
            is built around one goal: accelerating your success.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            {services.map((s, idx) => (
              <ServiceCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                features={s.features}
                index={idx}
                fadeUp={fadeUp}
                reduced={reduced}
                showLink={false}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section section--alt">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: '56px' }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <SectionLabel text="How We Work" />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Our Proven Process</h2>
            <p className="text-muted" style={{ maxWidth: '480px', margin: '12px auto 0', lineHeight: 1.7 }}>
              A structured, collaborative approach that ensures clarity, accountability, and results at every stage.
            </p>
          </motion.div>

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            {process.map((p, idx) => (
              <ProcessCard
                key={p.step}
                p={p}
                index={idx}
                fadeUp={fadeUp}
                reduced={reduced}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <SectionLabel text="Industries We Serve" />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Expertise Across Sectors</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['Finance & Banking', 'Technology', 'Healthcare', 'Real Estate', 'Energy & Utilities',
              'Retail & Consumer', 'Manufacturing', 'Education', 'Government & Public Sector',
              'Logistics & Supply Chain'].map(ind => (
              <span
                key={ind}
                style={{
                  padding: '10px 20px',
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  transition: 'all var(--transition)',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'var(--accent-glow)';
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px) scale(1.03)';
                  e.target.style.boxShadow = '0 4px 12px rgba(30,140,126,0.15)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'var(--bg-alt)';
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.color = 'var(--text-muted)';
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Not Sure Where to Start?"
        desc="Let's have a conversation. Our team will help identify the services best matched to your business goals."
        btnText="Book a Free Consultation"
        btnLink="/contact"
      />
    </>
  );
}
