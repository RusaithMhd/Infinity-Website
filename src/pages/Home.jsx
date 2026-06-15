import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Handshake, BarChart3, Globe, Network, Target,
  ShieldCheck, ArrowRight, ChevronRight, TrendingUp, Users,
} from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ServiceCard from '../components/ServiceCard';
import WhyChooseItem from '../components/WhyChooseItem';
import CtaBanner from '../components/CtaBanner';

/* ─── Animation factory ────────────────────────────────────── */
function makeVariants(reduced) {
  const fadeUp = {
    hidden:  { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const vp = { once: true, amount: 0.18 };
  return { fadeUp, stagger, vp };
}

/* ─── Data ─────────────────────────────────────────────────── */
const services = [
  { icon: <Handshake size={22}/>, title: 'Strategic Alliances',  desc: 'We identify, negotiate, and structure alliances that create ecosystems of mutual growth and amplified market reach.' },
  { icon: <BarChart3  size={22}/>, title: 'Business Consulting',  desc: 'Data-driven advisory that helps you navigate complex markets, optimise operations, and sharpen your competitive edge.' },
  { icon: <Globe      size={22}/>, title: 'Market Expansion',     desc: 'From feasibility to launch, we guide international expansion with local intelligence and global strategy.' },
];

const whyItems = [
  { icon: <Network     size={20}/>, title: 'Global Network',      desc: 'A curated network of partners across 30+ countries ready to accelerate your goals.' },
  { icon: <Target      size={20}/>, title: 'Precision Strategy',  desc: 'Every engagement is custom-built around your goals, sector dynamics, and competitive landscape.' },
  { icon: <ShieldCheck size={20}/>, title: 'Trusted Partnership', desc: 'Built on transparency, integrity, and long-term commitment. Your success is our only metric.' },
];

const stats = [
  { value: '300+', label: 'Global Partners',  icon: <Users       size={15}/> },
  { value: '30+',  label: 'Countries Served', icon: <Globe       size={15}/> },
  { value: '15+',  label: 'Years Experience', icon: <TrendingUp  size={15}/> },
  { value: '98%',  label: 'Client Retention', icon: <ShieldCheck size={15}/> },
];

/* ─── Infinity SVG ──────────────────────────────────────────── */
function InfinitySVG() {
  return (
    <svg viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <path
        d="M210 90 C210 90 170 20 110 20 C50 20 20 55 20 90 C20 125 50 160 110 160
           C170 160 210 90 210 90 C210 90 250 20 310 20 C370 20 400 55 400 90
           C400 125 370 160 310 160 C250 160 210 90 210 90 Z"
        stroke="url(#ig)" strokeWidth="1.8" strokeLinecap="round"
      />
      <defs>
        <linearGradient id="ig" x1="20" y1="90" x2="400" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#5EEAD4" stopOpacity="0.15"/>
          <stop offset="40%"  stopColor="#5EEAD4" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.15"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Stat card ─────────────────────────────────────────────── */
function StatCard({ stat, fadeUp, reduced, index }) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.4;
  return (
    <motion.div
      variants={fadeUp}
      className="hero-fullbg__stat"
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={reduced || hovered ? { y: 0 } : {
          y: [0, -6, 0]
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3.5,
            ease: 'easeInOut',
            delay: floatDelay
          }
        }}
        whileHover={reduced ? {} : { y: -8, scale: 1.05 }}
        style={{ width: '100%', cursor: 'default' }}
      >
        <div className="hero-fullbg__stat-inner">
          <span className="hero-fullbg__stat-icon">{stat.icon}</span>
          <span className="hero-fullbg__stat-value">{stat.value}</span>
        </div>
        <div className="hero-fullbg__stat-label">{stat.label}</div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Home() {
  const reduced = useReducedMotion();
  const { fadeUp, stagger, vp } = makeVariants(reduced);

  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  /* Parallax layers */
  const bgY         = useTransform(scrollY, [0, 800], reduced ? [0,0] : [0, 280]);
  const svgY        = useTransform(scrollY, [0, 800], reduced ? [0,0] : [0, 110]);
  const svgOp       = useTransform(scrollY, [0, 600], [1, 0]);
  const contentY    = useTransform(scrollY, [0, 800], reduced ? [0,0] : [0, -50]);
  /* Text stays fully opaque much longer — only fades at 600px+ */
  const heroOp      = useTransform(scrollY, [0, 600], [1, 0.15]);
  const scrollIndOp = useTransform(scrollY, [0, 250], [1, 0]);

  return (
    <>
      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="hero-fullbg" ref={heroRef} aria-label="Hero">

        {/* Layer 0 — deep background */}
        <motion.div className="hero-fullbg__bg-layer" style={{ y: bgY }} aria-hidden="true" />

        {/* Layer 2 — gradient overlay (lighter = more text visible) */}
        <div className="hero-fullbg__overlay" aria-hidden="true" />

        {/* Layer 3 — infinity SVG with slow ambient float */}
        <motion.div
          className="hero-fullbg__svg-layer"
          style={{ y: svgY, opacity: svgOp }}
          aria-hidden="true"
        >
          <motion.div
            animate={reduced ? {} : {
              y: [0, -12, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <InfinitySVG />
          </motion.div>
        </motion.div>

        {/* Layer 4 — foreground content */}
        <motion.div
          className="hero-fullbg__content"
          style={{ y: contentY, opacity: heroOp }}
        >
          <div className="container hero-fullbg__container">

            {/* ── Eyebrow ── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="hero-fullbg__eyebrow-wrap">
              <div className="hero-fullbg__eyebrow">
                <span className="hero-fullbg__eyebrow-dot" />
                Global Business Alliance
              </div>
            </motion.div>

            {/* ── Headline ── */}
            <motion.h1
              className="hero-fullbg__title"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ delay: 0.1 }}
            >
              Build Alliances That{' '}
              <span className="hero-fullbg__highlight">Transcend Boundaries</span>
            </motion.h1>

            {/* ── Sub-headline ── */}
            <motion.p
              className="hero-fullbg__desc"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ delay: 0.2 }}
            >
              Infinity Allianze International partners with visionary businesses to craft
              strategic alliances, accelerate growth, and unlock opportunities across global markets.
              We turn bold ambitions into measurable outcomes.
            </motion.p>

            {/* ── Badges / trust signals ── */}
            <motion.div
              className="hero-fullbg__badges"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ delay: 0.28 }}
            >
              {['ISO Certified', 'FTSE Partners', '30+ Countries', 'Since 2009'].map(b => (
                <span key={b} className="hero-fullbg__badge">{b}</span>
              ))}
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div
              className="hero-fullbg__actions"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ delay: 0.36 }}
            >
              <motion.div
                whileHover={reduced ? {} : { scale: 1.04, y: -2 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/services" className="btn hero-fullbg__btn-primary">
                  Explore Services <ArrowRight size={16}/>
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduced ? {} : { scale: 1.03, y: -2 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/contact" className="btn hero-fullbg__btn-ghost">
                  Start a Conversation
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Stats grid ── */}
            <motion.div
              className="hero-fullbg__stats"
              variants={stagger} initial="hidden" animate="visible"
            >
              {stats.map((s, idx) => (
                <StatCard key={s.label} stat={s} fadeUp={fadeUp} reduced={reduced} index={idx} />
              ))}
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-fullbg__scroll-indicator"
          style={{ opacity: scrollIndOp }}
          aria-hidden="true"
        >
          <span className="hero-fullbg__scroll-line" />
          <span className="hero-fullbg__scroll-dot" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════════════ */}
      <section className="section section--alt">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: '48px' }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <SectionLabel text="What We Do" />
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', marginBottom: '12px' }}>
              Comprehensive Solutions for Modern Business
            </h2>
            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
              From strategic alliances to digital transformation — end-to-end services
              that create lasting competitive advantage.
            </p>
          </motion.div>

          <motion.div className="services-grid"
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            {services.map((s, idx) => (
              <ServiceCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                index={idx}
                fadeUp={fadeUp}
                reduced={reduced}
              />
            ))}
          </motion.div>

          <motion.div className="text-center" style={{ marginTop: '40px' }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <Link to="/services" className="btn btn--outline">
              View All Services <ArrowRight size={16}/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="why-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
              <SectionLabel text="Why Infinity Allianze" />
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', marginBottom: '18px' }}>
                Your Strategic Partner in a Complex World
              </h2>
              <p className="text-muted" style={{ lineHeight: 1.75, marginBottom: '28px', fontSize: '0.95rem' }}>
                We combine deep industry expertise with a global perspective and a relentless
                focus on results — every strategy backed by data, driven by insight, executed with discipline.
              </p>

            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
              {whyItems.map((w, idx) => (
                <WhyChooseItem
                  key={w.title}
                  icon={w.icon}
                  title={w.title}
                  desc={w.desc}
                  index={idx}
                  fadeUp={fadeUp}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA BAND
      ════════════════════════════════════════════════ */}
      <CtaBanner
        label="Let's Grow Together"
        title="Ready to Expand Your Horizons?"
        desc="Start a conversation with our team and discover how Infinity Allianze can accelerate your business growth."
        btnText="Contact Us Today"
        btnLink="/contact"
      />
    </>
  );
}
