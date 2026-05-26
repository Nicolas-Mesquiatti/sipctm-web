import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { X } from 'lucide-react';
import ToolsParticles from './ToolsParticles';

const PROBLEMS = [
  'Órdenes de trabajo en papel que se pierden o son ilegibles',
  'No sabés cuántos repuestos te quedan en stock hasta que ya es tarde',
  'Los presupuestos los hacés a mano y tardás horas',
  'Los clientes llaman para saber el estado del auto y no tenés info rápida',
  'No tenés control real de los ingresos y gastos del taller',
  'El historial de cada vehículo está disperso en libretas y WhatsApps',
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="problem"
      className="section"
      ref={ref}
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <ToolsParticles />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p className="section-label">El problema</p>
            <h2 className="section-title">¿Te suena familiar?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Gestionar un taller mecánico sin las herramientas correctas es caos. Cada día perdés tiempo y dinero sin darte cuenta.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {PROBLEMS.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.875rem',
                }}
              >
                {/* X azul del logo */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: 'rgba(59,107,200,0.12)',
                    border: '1px solid rgba(59,107,200,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '0.05rem',
                  }}
                >
                  <X size={14} color="#3B6BC8" strokeWidth={2.5} />
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <p style={{ fontSize: '1.125rem', color: 'var(--text-2)', maxWidth: 540, margin: '0 auto' }}>
              <strong style={{ color: 'var(--text)' }}>SIPCTM</strong> resuelve todo esto en un sistema simple, rápido y pensado para talleres argentinos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
