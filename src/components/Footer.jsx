import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const reduced = useReducedMotion();

  // Generate particles only once on initial render
  const [particles] = useState(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      left: Math.random() * 100, // 0% to 100% width
      duration: Math.random() * 8 + 8, // 8s to 16s fall speed
      delay: Math.random() * -16, // negative delay so they are scattered immediately
      xDrift: Math.random() * 40 - 20, // drift left/right by 20px
    }))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Simulate successful newsletter registration
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Falling snow particles background */}
      {!reduced && (
        <div className="footer__particles" aria-hidden="true">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="footer__particle"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                top: ['-20px', '105%'],
                x: [0, p.xDrift, 0],
                opacity: [0, 0.45, 0.45, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="container">
        <div className="footer__grid">
          {/* Brand & Social Column */}
          <div className="footer__brand">
            <div className="footer__brand-logo">
              <img src="/LOGO.png" alt="Infinity Allianze Logo" className="footer__brand-logo-img" />
              <span className="footer__brand-name">Infinity Allianze</span>
            </div>
            <p className="footer__brand-desc">
              Empowering businesses through strategic alliances, innovative consulting,
              and future-ready solutions that drive sustainable growth across borders.
            </p>
            <div className="footer__socials">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="mailto:social@infinityallianze.com"
                className="footer__social-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul>
              <li><Link to="/services">Strategic Alliances</Link></li>
              <li><Link to="/services">Business Consulting</Link></li>
              <li><Link to="/services">Market Expansion</Link></li>
              <li><Link to="/services">Digital Transformation</Link></li>
              <li><Link to="/services">Investment Advisory</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer__col footer__newsletter">
            <h4 className="footer__col-title">Stay Connected</h4>
            <p className="footer__newsletter-text">
              Subscribe to our newsletter for insights on global markets and alliances.
            </p>

            {subscribed ? (
              <div className="footer__newsletter-success">
                <Check size={16} />
                <span>Subscription confirmed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="footer__newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__newsletter-input"
                  required
                />
                <button type="submit" className="footer__newsletter-btn" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div className="footer__bottom">
          <span>© {year} Infinity Allianze International. All rights reserved.</span>
          <div className="footer__bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
