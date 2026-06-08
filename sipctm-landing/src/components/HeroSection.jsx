import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Zap, Users } from 'lucide-react';
import LogoSVG from './LogoSVG';

const SYSTEM_URL = 'https://6a133762511ff600078700ce--cosmic-nougat-86afd4.netlify.app/login';

const TYPEWRITER_TEXT = 'Gestioná tu taller mecánico con inteligencia';
const TYPEWRITER_DELAY = 40;

export default function HeroSection({ isDark }) {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) clearInterval(interval);
    }, TYPEWRITER_DELAY);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
        paddingTop: 80,
      }}
    >
      {/* z-index 0 — Video protagonista */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isDark ? 0.3 : 0.2,
          filter: isDark
            ? 'brightness(0.6) saturate(0.7) sepia(0.2)'
            : 'brightness(1.05) saturate(0.6) sepia(0.25)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src="/tools-video.mp4" type="video/mp4" />
      </video>

      {/* z-index 1 — Overlay degradado */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(to bottom, rgba(15,10,6,0.4) 0%, rgba(15,10,6,0.75) 70%, rgba(15,10,6,1) 100%)'
            : 'linear-gradient(to bottom, rgba(253,247,235,0.3) 0%, rgba(253,247,235,0.82) 70%, rgba(253,247,235,1) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* z-index 2 — Contenido centrado */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoSVG size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: 999,
            background: 'rgba(136,90,57,0.1)',
            border: '1px solid rgba(136,90,57,0.25)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--blue-main)',
            letterSpacing: '0.06em',
          }}
        >
          <Zap size={13} fill="currentColor" />
          Sistema de gestión para talleres mecánicos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: 'clamp(1.85rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            maxWidth: 720,
            color: 'var(--text)',
          }}
        >
          <span>{typed}</span>
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '0.9em',
              background: 'var(--blue-main)',
              marginLeft: '3px',
              verticalAlign: 'middle',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s',
            }}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-2)',
            maxWidth: 540,
            lineHeight: 1.7,
          }}
        >
          Gestión inteligente de clientes, vehículos, órdenes de trabajo e historial de reparaciones. Con IA para estimar tiempos y notificaciones automáticas a clientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href={SYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            Empezar gratis →
          </a>
          <a
            href="#how-it-works"
            className="btn btn-secondary"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            Ver cómo funciona
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-3)', fontSize: '0.875rem' }}
        >
          <Users size={14} />
          <span>+120 talleres ya confían en SIPCTM</span>
        </motion.div>
      </div>

      <motion.a
        href="#problem"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'var(--blue-main)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
