import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserPlus, Settings, Zap, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Creá tu cuenta',
    desc: 'Registrate gratis en segundos. Sin tarjeta de crédito, sin configuración técnica. Tu taller online en minutos.',
  },
  {
    icon: Settings,
    number: '02',
    title: 'Configurá tu taller',
    desc: 'Cargá tus mecánicos, categorías de trabajo y stock inicial. Un asistente guiado te lleva paso a paso.',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Empezá a operar',
    desc: 'Abrí órdenes de trabajo, generá presupuestos y gestioná clientes desde el primer día.',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Crecé con datos',
    desc: 'Usá los reportes para tomar mejores decisiones. Sabé qué servicios generan más, qué cliente vuelve, qué piezas rotan más.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="section" ref={ref}
      style={{ background: 'var(--surface)' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p className="section-label">Cómo funciona</p>
          <h2 className="section-title">De cero a operando en un día</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Sin instalaciones ni capacitaciones largas. Si usás WhatsApp, usás SIPCTM.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0',
            position: 'relative',
          }}
        >
          {/* Connecting line (desktop) */}
          <div
            style={{
              position: 'absolute',
              top: 34,
              left: '12.5%',
              right: '12.5%',
              height: 2,
              background: 'linear-gradient(90deg, var(--blue-dark), var(--blue-main), var(--blue-circuit), var(--blue-main))',
              zIndex: 0,
            }}
            className="timeline-line"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 1.5rem 1.5rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: 'var(--surface)',
                    border: '2px solid var(--blue-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: 'var(--blue-circuit)',
                    boxShadow: '0 0 20px rgba(59,107,200,0.2)',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <Icon size={24} />
                  {/* Step number */}
                  <span
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'var(--blue-main)',
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { display: none; }
        }
      `}</style>
    </section>
  );
}
