import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import ThemeToggle from './ThemeToggle';
import LogoSVG from './LogoSVG';

const NAV_LINKS = [
  { label: 'Funciones', href: '#features' },
  { label: 'Precios', href: '#pricing' },
  { label: 'Cómo funciona', href: '#how-it-works' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: '2rem' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          <LogoSVG size={32} />
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
            SIPCTM
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '2rem', marginLeft: 'auto', alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-2)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
              className="nav-link-desktop"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1.5rem' }}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href="https://sipctm.netlify.app/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-2)',
              padding: '0.4rem 0.75rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
          >
            Iniciar sesión
          </a>
          <a
            href="https://sipctm.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
          >
            Empezar gratis
          </a>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            style={{ display: 'none', color: 'var(--text)', padding: '0.25rem' }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text)' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://sipctm.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: 'fit-content', marginTop: '0.5rem' }}
              >
                Empezar gratis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav.nav-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
