import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Globe, Plus, Minus, Send } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

/* ─── Animation variants ───────────────────────────────────── */
function makeVariants(reduced) {
  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const vp = { once: true, amount: 0.15 };
  return { fadeUp, stagger, vp };
}

/* WhatsApp SVG icon */
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const contactInfo = [
  { icon: <MapPin size={20} />, label: 'Office', value: 'No:48, 3rd Floor, IBM Building, Nawam Mawatha, Colombo - 02', href: null },
  { icon: <Mail size={20} />, label: 'Email', value: 'social@infinityallianze.com', href: 'mailto:social@infinityallianze.com' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+940702665352', href: 'tel:+94702665352' },
  { icon: <WhatsAppIcon />, label: 'WhatsApp', value: '+940702665352', href: 'https://wa.me/94702665352', whatsapp: true },
  { icon: <Clock size={20} />, label: 'Business Hours', value: 'Mon – Fri, 9:00 AM – 6:00 PM GMT', href: null },
];

const serviceOptions = [
  'Strategic Alliances', 'Business Consulting', 'Market Expansion',
  'Digital Transformation', 'Investment Advisory', 'Growth Strategy',
  'Government Relations', 'Leadership Development', 'Other',
];

const faqs = [
  { q: 'How long does a typical engagement last?', a: 'Engagements vary by scope. Strategy projects typically run 6–12 weeks; alliance facilitation and transformation programmes can span 6–18 months.' },
  { q: 'Do you work with startups or only large enterprises?', a: 'We work with organisations at all stages — from ambitious scale-ups to FTSE 250 companies. Our services scale to your needs.' },
  { q: 'Which regions do you operate in?', a: 'Our primary markets are UK, Europe, GCC, and sub-Saharan Africa, though our partner network spans 30+ countries globally.' },
  { q: 'What does the initial consultation involve?', a: 'A 60-minute discovery call to understand your goals, current position, and how we might add value. No obligation, no pitch.' },
];

const Field = ({ label, htmlFor, required, children }) => (
  <div className="form-group">
    <label htmlFor={htmlFor}>
      {label}{required && <span className="required-star">*</span>}
    </label>
    {children}
  </div>
);

/* ─── Contact Info Item Component ───────────────────────────── */
function ContactRow({ c, index, fadeUp, reduced }) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.25;

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduced ? {} : { x: 4 }}
      transition={{ duration: 0.22 }}
      className="contact-info__item"
    >
      <motion.div
        className="contact-info__icon"
        animate={reduced || hovered ? {} : {
          y: [0, -3, 0]
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3,
            ease: 'easeInOut',
            delay: floatDelay
          }
        }}
      >
        {c.icon}
      </motion.div>
      <div>
        <div className="contact-info__label">
          {c.label}
        </div>
        <div className="contact-info__value">
          {c.href ? (
            <a
              href={c.href}
              target={c.whatsapp ? '_blank' : undefined}
              rel={c.whatsapp ? 'noopener noreferrer' : undefined}
              style={{
                color: c.whatsapp ? '#25D366' : 'inherit',
                textDecoration: 'none',
                fontWeight: c.whatsapp ? 600 : 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {c.value}{c.whatsapp && <span style={{ fontSize: '0.75rem', opacity: 0.8 }}> ↗</span>}
            </a>
          ) : c.value}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FAQ Item Component ────────────────────────────────────── */
function AccordionItem({ faq, i, openFaq, setOpenFaq, reduced }) {
  const isOpen = openFaq === i;

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        onClick={() => setOpenFaq(isOpen ? null : i)}
        className="faq-btn"
      >
        {faq.q}
        <motion.span
          style={{ flexShrink: 0, color: 'var(--accent)' }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="faq-content">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page Component ───────────────────────────────────────── */
export default function Contact() {
  const reduced = useReducedMotion();
  const { fadeUp, stagger, vp } = makeVariants(reduced);

  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  /* ─ Build WhatsApp deep-link with pre-filled message ─ */
  const buildWhatsAppMessage = () => {
    const lines = [
      `*New Enquiry – Infinity Allianze Website*`,
      ``,
      `*Name:* ${form.name || '(not filled)'}`,
      `*Email:* ${form.email || '(not filled)'}`,
      form.company ? `*Company:* ${form.company}` : null,
      form.service  ? `*Service:* ${form.service}`  : null,
      ``,
      `*Message:*`,
      form.message || '(no message)',
    ].filter(Boolean).join('\n');
    return encodeURIComponent(lines);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/94702665352?text=${buildWhatsAppMessage()}`, '_blank', 'noopener,noreferrer');
  };

  /* ─ Build mailto: link so the user's email app opens pre-filled ─ */
  const openMailTo = () => {
    const subject = encodeURIComponent(`New Enquiry from ${form.name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name || ''}\n` +
      `Email: ${form.email || ''}\n` +
      `Company: ${form.company || 'Not provided'}\n` +
      `Service: ${form.service || 'Not specified'}\n\n` +
      `Message:\n${form.message || ''}`
    );
    window.location.href = `mailto:social@infinityallianze.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = e => {
    e.preventDefault();
    openMailTo();
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <SectionLabel text="Get In Touch" />
          <h1 className="page-hero__title">Let's Start a Conversation</h1>
          <p className="page-hero__desc">
            Whether you're ready to engage or just exploring possibilities,
            our team is here to help you take the next step.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Glow blob behind form */}
        {!reduced && (
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: 'var(--accent-glow)',
              filter: 'blur(100px)',
              borderRadius: '50%',
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="contact-layout">

            {/* Contact Info */}
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
            >
              <SectionLabel text="Contact Details" />
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', marginBottom: '8px' }}>
                Reach Us Directly
              </h2>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '28px', fontSize: '0.92rem' }}>
                We aim to respond within one business day.
              </p>

              {contactInfo.map((c, idx) => (
                <ContactRow key={c.label} c={c} index={idx} fadeUp={fadeUp} reduced={reduced} />
              ))}

              <motion.div
                variants={fadeUp}
                className="contact-info__item"
                style={{ cursor: 'default', flexDirection: 'column', gap: '8px', borderBottom: '1px solid var(--border)' }}
                whileHover={reduced ? {} : { y: -4 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '4px', color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontSize: '0.95rem' }}>
                  <Globe size={16} /> Global Presence
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  Representative offices in Dubai, Nairobi, and Singapore — serving clients across 30+ countries.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            >
              <form onSubmit={handleSubmit} id="contact-form" noValidate>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '24px', color: 'var(--text)' }}>
                    Send Us a Message
                  </h3>

                  {/* Name + Email row */}
                  <div className="form-row">
                    <Field label="Full Name" htmlFor="name" required>
                      <input
                        id="name" name="name" type="text" required
                        placeholder="Jane Smith"
                        value={form.name} onChange={handleChange}
                        className="contact-input"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email Address" htmlFor="email" required>
                      <input
                        id="email" name="email" type="email" required
                        placeholder="jane@company.com"
                        value={form.email} onChange={handleChange}
                        className="contact-input"
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <Field label="Company / Organisation" htmlFor="company">
                    <input
                      id="company" name="company" type="text"
                      placeholder="Your Company Ltd"
                      value={form.company} onChange={handleChange}
                      className="contact-input"
                      autoComplete="organization"
                    />
                  </Field>

                  <Field label="Service of Interest" htmlFor="service">
                    <select
                      id="service" name="service"
                      value={form.service} onChange={handleChange}
                      className="contact-select"
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>

                  <Field label="Your Message" htmlFor="message" required>
                    <textarea
                      id="message" name="message" required
                      placeholder="Tell us about your goals and how we can help..."
                      value={form.message} onChange={handleChange}
                      className="contact-textarea"
                    />
                  </Field>

                  <motion.button
                    type="submit"
                    className="btn btn--primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '8px', gap: '8px' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={16} /> Send via Email
                  </motion.button>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  </div>

                  {/* WhatsApp Button */}
                  <motion.button
                    type="button"
                    onClick={openWhatsApp}
                    className="btn btn--outline"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      gap: '8px',
                      borderColor: '#25D366',
                      color: '#25D366',
                    }}
                    whileHover={reduced ? {} : { background: '#25D366', color: '#fff' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <WhatsAppIcon /> Send via WhatsApp
                  </motion.button>

                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                    Email opens your mail app pre-filled. WhatsApp opens a chat ready to send.
                  </p>
                </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div className="text-center" style={{ marginBottom: '40px' }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <SectionLabel text="FAQs" />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            className="faq-accordion-container"
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                i={i}
                openFaq={openFaq}
                setOpenFaq={setOpenFaq}
                reduced={reduced}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
