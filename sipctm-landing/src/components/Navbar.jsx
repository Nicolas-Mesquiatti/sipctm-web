import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import LogoSVG from './LogoSVG';

const NAV_LINKS = [
  { label: 'Funciones',     href: '#features'    },
  { label: 'Precios',       href: '#pricing'      },
  { label: 'Cómo funciona', href: '#how-it-works' },
];

const SYSTEM_URL = 'https://6a133762511ff600078700ce--cosmic-nougat-86afd4.netlify.app/login';

export default function Navbar({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = isDark
    ? scrolled ? 'rgba(15,10,6,0.92)' : 'transparent'
    : scrolled ? 'rgba(253,247,235,0.95)' : 'rgba(253,247,235,0.8)';

  const borderColor = isDark
    ? 'rgba(136,90,57,0.18)'
    : 'rgba(136,90,57,0.22)';

  const textColor  = isDark ? '#FDF7EB' : '#573821';
  const text2Color = isDark ? '#C2A06E' : '#8C6D4D';
  const toggleBg   = isDark ? '#3D2A18' : '#E5CBA8';
  const toggleBdr  = isDark ? '#573821' : '#C2A06E';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 60,
          display: 'flex', alignItems: 'center',
          padding: '0 24px',
          background: navBg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${borderColor}` : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginRight: 'auto' }}
        >
          <LogoSVG size={36} />
          <span style={{ fontWeight: 700, fontSize: 16, color: textColor, letterSpacing: '0.04em' }}>
            SIPCTM
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4, margin: '0 1.5rem' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ padding: '6px 14px', fontSize: 14, fontWeight: 500, color: text2Color, borderRadius: 6, transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = textColor}
              onMouseLeave={e => e.target.style.color = text2Color}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            style={{
              width: 52, height: 28, borderRadius: 99,
              background: toggleBg, border: `1px solid ${toggleBdr}`,
              position: 'relative', cursor: 'pointer',
              transition: 'background 0.3s', flexShrink: 0,
            }}
          >
            <motion.div
              animate={{ x: isDark ? 26 : 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                position: 'absolute', top: 2,
                width: 22, height: 22, borderRadius: '50%',
                background: '#885A39',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {isDark ? <Moon size={11} color="#FDF7EB" /> : <Sun size={11} color="#FDF7EB" />}
            </motion.div>
          </button>

          <a
            href={SYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, fontWeight: 500, color: text2Color, transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = textColor}
            onMouseLeave={e => e.target.style.color = text2Color}
          >
            Iniciar sesión
          </a>

          <a
            href={SYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '7px 18px', borderRadius: 8,
              background: '#885A39', color: '#FDF7EB',
              fontSize: 14, fontWeight: 600,
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = '#A06B45'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.background = '#885A39'; e.target.style.transform = ''; }}
          >
            Empezar gratis
          </a>
        </div>

        {/* Hamburger — solo mobile */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: textColor, padding: 8, display: 'none',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Menú mobile fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 60, left: 0, right: 0, bottom: 0,
              background: isDark ? '#0F0A06' : '#FDF7EB',
              zIndex: 999,
              display: 'flex', flexDirection: 'column',
              padding: '24px 24px 32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 22, fontWeight: 600,
                    color: textColor,
                    padding: '18px 0',
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Toggle tema mobile */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 0', borderTop: `1px solid ${borderColor}`,
            }}>
              <span style={{ fontSize: 15, color: text2Color }}>
                Modo {isDark ? 'oscuro' : 'claro'}
              </span>
              <button
                onClick={toggleTheme}
                style={{
                  width: 52, height: 28, borderRadius: 99,
                  background: toggleBg, border: `1px solid ${toggleBdr}`,
                  position: 'relative', cursor: 'pointer',
                }}
              >
                <motion.div
                  animate={{ x: isDark ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute', top: 2,
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#885A39',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {isDark ? <Moon size={11} color="#FDF7EB" /> : <Sun size={11} color="#FDF7EB" />}
                </motion.div>
              </button>
            </div>

            {/* CTAs mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href={SYSTEM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: 'center', padding: '14px',
                  borderRadius: 10, border: '2px solid #885A39',
                  color: '#885A39', fontSize: 16, fontWeight: 600,
                }}
              >
                Iniciar sesión
              </a>
              <a
                href={SYSTEM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: 'center', padding: '14px',
                  borderRadius: 10, background: '#885A39',
                  color: '#FDF7EB', fontSize: 16, fontWeight: 600,
                }}
              >
                Empezar gratis →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
