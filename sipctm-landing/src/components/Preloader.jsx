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
  const hexLen = 280;
  const wrenchLen = 200;

  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hex stroke animation */}
      <motion.polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        stroke="#3B6BC8"
        strokeWidth="5"
        fill="rgba(59,107,200,0.06)"
        strokeDasharray={hexLen}
        initial={{ strokeDashoffset: hexLen }}
        animate={{ strokeDashoffset: phase >= 0 ? 0 : hexLen }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Wrench body */}
      <motion.path
        d="M38 62 L55 45 Q64 36 72 38 Q74 46 65 55 L48 72 Q44 76 40 72 Q36 68 38 62Z"
        fill="#3B6BC8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '55px 55px' }}
      />

      {/* Wrench handle */}
      <motion.rect
        x="26" y="56" width="22" height="8" rx="4"
        transform="rotate(-45 37 60)"
        fill="#5B8FE8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '37px 60px' }}
      />

      {/* Circuit elements appear one by one */}
      {[
        <motion.circle key="d1" cx="22" cy="35" r="3" fill="#7AB0FF"
          initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0 }} />,
        <motion.line key="l1" x1="22" y1="35" x2="38" y2="35" stroke="#7AB0FF" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }} />,
        <motion.circle key="d2" cx="72" cy="30" r="2.5" fill="#7AB0FF"
          initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.3 }} />,
        <motion.circle key="d3" cx="78" cy="65" r="3" fill="#5B8FE8"
          initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.45 }} />,
        <motion.line key="l2" x1="78" y1="65" x2="65" y2="65" stroke="#5B8FE8" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }} />,
      ]}
    </svg>
  );
}
