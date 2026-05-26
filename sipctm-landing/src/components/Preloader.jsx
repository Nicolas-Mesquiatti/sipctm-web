import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = ['S', 'I', 'P', 'C', 'T', 'M'];

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=hex, 1=wrench, 2=circuits, 3=text, 4=exit
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => setPhase(4), 2900);
    const t5 = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 3500);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const end = phase === 0 ? 25 : phase === 1 ? 50 : phase === 2 ? 75 : phase === 3 ? 90 : 100;
    const duration = 600;
    const steps = 30;
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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Animated SVG Logo */}
          <PreloaderLogo phase={phase} />

          {/* Letter by letter text */}
          <div style={{ display: 'flex', gap: '0.15rem', overflow: 'hidden' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: 'var(--text)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 200,
              height: 3,
              background: 'var(--border)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--blue-dark), var(--blue-main), var(--blue-circuit))',
                borderRadius: 999,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PreloaderLogo({ phase }) {
  const hexLen = 285;

  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexágono — se dibuja primero */}
      <motion.polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        stroke="#3B6BC8"
        strokeWidth="5"
        fill="rgba(59,107,200,0.04)"
        strokeDasharray={hexLen}
        initial={{ strokeDashoffset: hexLen }}
        animate={{ strokeDashoffset: phase >= 0 ? 0 : hexLen }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Llave inglesa — aparece en fase 1 */}
      <motion.path
        d="M45 25 C38 25 32 31 32 38 C32 42 34 46 37 48 L28 65 C26 68 27 72 30 74 C33 76 37 75 39 72 L48 55 C51 56 54 56 57 54 C63 51 66 44 63 38 C61 34 57 31 53 31 L50 38 L45 38 L42 35 L45 28 Z"
        fill="#3B6BC8"
        opacity="0.9"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={phase >= 1 ? { opacity: 0.9, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '47px 50px' }}
      />

      {/* Trazados de circuito — aparecen en fase 2, uno a uno */}
      <motion.line x1="62" y1="45" x2="75" y2="45" stroke="#3B6BC8" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.25, delay: 0 }} />
      <motion.line x1="75" y1="45" x2="75" y2="35" stroke="#3B6BC8" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.2 }} />
      <motion.line x1="75" y1="35" x2="85" y2="35" stroke="#3B6BC8" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.35 }} />
      <motion.line x1="75" y1="45" x2="75" y2="55" stroke="#3B6BC8" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.5 }} />
      <motion.line x1="75" y1="55" x2="85" y2="55" stroke="#3B6BC8" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.65 }} />

      {/* Nodos */}
      <motion.circle cx="85" cy="35" r="3" fill="#7AB0FF"
        initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.55 }} />
      <motion.circle cx="85" cy="55" r="3" fill="#7AB0FF"
        initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.75 }} />
      <motion.circle cx="75" cy="45" r="3" fill="#5B8FE8"
        initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.1 }} />
    </svg>
  );
}
