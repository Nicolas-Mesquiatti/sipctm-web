import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = ['S', 'I', 'P', 'C', 'T', 'M'];
const SYSTEM_URL = 'https://6a133762511ff600078700ce--cosmic-nougat-86afd4.netlify.app/login';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const end = phase === 0 ? 30 : phase === 1 ? 60 : phase === 2 ? 90 : 100;
    const duration = 550;
    const steps = 28;
    const start = progress;
    const diff = end - start;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.round(start + diff * (step / steps)));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg, #060810)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Logo PNG con animación scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(6,8,16,0.5)',
              borderRadius: 16,
              padding: 12,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(59,107,200,0.25)',
            }}
          >
            <img
              src="/Logo.png"
              alt="SIPCTM"
              style={{ height: 100, width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </motion.div>

          {/* Letras una a una */}
          <div style={{ display: 'flex', gap: '0.15rem', overflow: 'hidden' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                style={{
                  fontSize: '2rem', fontWeight: 800,
                  letterSpacing: '0.15em', color: 'var(--text, #F0F4FF)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Barra de progreso */}
          <div style={{ width: 200, height: 3, background: 'var(--border, rgba(59,107,200,0.15))', borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--blue-dark, #1E3A6E), var(--blue-main, #3B6BC8), var(--blue-circuit, #7AB0FF))',
                borderRadius: 999,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
