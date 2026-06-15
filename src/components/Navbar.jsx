import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Explicit touchStart listener with passive: false for mobile reliability
  useEffect(() => {
    const button = hamburgerRef.current;
    if (!button) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      setMenuOpen(v => !v);
    };

    button.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => {
      button.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/about',    label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact',  label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}${isHome ? ' navbar--home' : ''}`} style={{ zIndex: 9999 }}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <img src="/LOGO.png" alt="Infinity Allianze Logo" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              Infinity Allianze
              <span>International</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="navbar__links">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <Link to="/contact" className="btn btn--primary navbar__cta">
            Get in Touch
          </Link>

          {/* Hamburger — explicit touchStart for mobile reliability */}
          <button
            ref={hamburgerRef}
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`navbar__mobile${menuOpen ? ' open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
        style={{ zIndex: 9998 }}
      >
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/contact"
          className="btn btn--primary"
          onClick={() => setMenuOpen(false)}
          style={{ marginTop: '8px', justifyContent: 'center' }}
        >
          Get in Touch
        </Link>
      </div>

      {/* Backdrop to close menu on outside tap */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 9997,
            background: 'rgba(15,46,43,0.15)',
            backdropFilter: 'blur(2px)',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
