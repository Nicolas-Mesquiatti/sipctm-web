import { useRef } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Zap, MessageCircle } from 'lucide-react';
import ToolsParticles from './ToolsParticles';

const SYSTEM_URL = 'https://6a133762511ff600078700ce--cosmic-nougat-86afd4.netlify.app/login';

const DOT_PATTERN = {
  backgroundImage: 'radial-gradient(circle, rgba(136,90,57,0.55) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      className="section"
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <ToolsParticles />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65 }}
          style={{
            padding: 'clamp(2rem, 6vw, 5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 20,
            background: 'rgba(136,90,57,0.04)',
            border: '1px solid rgba(136,90,57,0.3)',
          }}
        >
          {/* Dot pattern base */}
          <div style={{ position: 'absolute', inset: 0, ...DOT_PATTERN, opacity: 0.25, pointerEvents: 'none', zIndex: 0 }} />

          {/* Dot pattern iluminado — sigue el cursor */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(194,160,110,0.7) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              WebkitMaskImage: maskImage,
              maskImage,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Glow blob central */}
          <div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(136,90,57,0.15) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: 0,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.35rem 1rem', borderRadius: 999,
                background: 'rgba(136,90,57,0.1)',
                border: '1px solid rgba(136,90,57,0.25)',
                fontSize: '0.8125rem', fontWeight: 600, color: 'var(--blue-main)',
                marginBottom: '1.5rem', letterSpacing: '0.06em',
              }}
            >
              <Zap size={13} fill="currentColor" />
              Empieza hoy, gratis
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 800, lineHeight: 1.2,
                maxWidth: 600, margin: '0 auto 1.25rem',
              }}
            >
              Tu taller merece{' '}
              <span className="text-glow">trabajar con inteligencia</span>
            </h2>

            <p
              style={{
                fontSize: '1.0625rem', color: 'var(--text-2)',
                maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.7,
              }}
            >
              Unite a más de 120 talleres que ya digitalizaron su operación con SIPCTM. Sin letra chica, sin contratos, sin complicaciones.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={SYSTEM_URL}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '1.0625rem', padding: '1rem 2.25rem' }}
              >
                Empezar gratis ahora →
              </a>
              <a
                href="https://wa.me/5491155773344?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20SIPCTM"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '1.0625rem', padding: '1rem 2.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
