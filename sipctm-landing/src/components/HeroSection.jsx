import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Zap, Users } from 'lucide-react';
import LogoSVG from './LogoSVG';

const TYPEWRITER_TEXT = 'Gestioná tu taller mecánico con inteligencia';
const TYPEWRITER_DELAY = 40;

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const videoRef = useRef(null);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) clearInterval(interval);
    }, TYPEWRITER_DELAY);
    return () => clearInterval(interval);
  }, []);

  // Blink cursor
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
        paddingTop: 80,
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        src="/tools-video.mp4"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 'var(--hero-video-opacity, 0.12)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,107,200,0.12) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoSVG size={72} />
        </motion.div>

        {/* Eyebrow */}
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
            background: 'rgba(59,107,200,0.1)',
            border: '1px solid rgba(59,107,200,0.25)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--blue-circuit)',
            letterSpacing: '0.06em',
          }}
        >
          <Zap size={13} fill="currentColor" />
          Sistema de gestión para talleres mecánicos
        </motion.div>

        {/* Title typewriter */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            maxWidth: 720,
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-2)',
            maxWidth: 540,
            lineHeight: 1.7,
          }}
        >
          Controlá órdenes de trabajo, stock, clientes y presupuestos desde un solo lugar. Diseñado para talleres que quieren crecer.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="https://sipctm.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            Empezar gratis
          </a>
          <a href="#how-it-works" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            Ver cómo funciona
          </a>
        </motion.div>

        {/* Social proof */}
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

      {/* Bounce arrow */}
      <motion.a
        href="#problem"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          color: 'var(--text-3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        <ArrowDown size={20} />
      </motion.a>

      <style>{`
        [data-theme="dark"] { --hero-video-opacity: 0.12; }
        [data-theme="light"] { --hero-video-opacity: 0.05; }
      `}</style>
    </section>
  );
}
