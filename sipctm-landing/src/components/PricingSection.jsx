import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import ToolsParticles from './ToolsParticles';

const PLANS = [
  {
    name: 'Arranque',
    price: null,
    priceLabel: 'Gratis',
    period: '',
    target: 'Primeros pasos',
    desc: 'Para talleres que están empezando y quieren probar el sistema.',
    features: [
      'Hasta 20 órdenes de trabajo por mes',
      '1 usuario / mecánico',
      'Control de clientes básico',
      'Presupuestos simples',
      'Soporte por email',
    ],
    cta: 'Empezar gratis',
    featured: false,
  },
  {
    name: 'Pro',
    price: 12999,
    priceLabel: null,
    period: '/mes',
    target: 'Talleres que escalan',
    desc: 'La elección más popular. Todo lo que un taller profesional necesita.',
    features: [
      'Órdenes de trabajo ilimitadas',
      'Hasta 5 mecánicos',
      'Control de stock con alertas',
      'Reportes de ingresos',
      'Historial completo de vehículos',
      'Presupuestos con logo del taller',
      'Soporte prioritario',
    ],
    cta: 'Empezar con Pro',
    featured: true,
  },
  {
    name: 'Taller Completo',
    price: 24999,
    priceLabel: null,
    period: '/mes',
    target: 'Operación completa',
    desc: 'Para talleres grandes con múltiples mecánicos y alta rotación.',
    features: [
      'Todo lo del plan Pro',
      'Mecánicos ilimitados',
      'Multi-sucursal',
      'API de integración',
      'Recordatorios automáticos',
      'Exportación de datos',
      'Soporte 24/7 + onboarding',
    ],
    cta: 'Contactar ventas',
    featured: false,
  },
];

function AnimatedPrice({ target, inView }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const duration = 900;
    const steps = 45;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(target * eased));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  return `$${displayed.toLocaleString('es-AR')}`;
}

function PricingCard({ plan, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 60px rgba(59,107,200,0.25)',
      }}
      style={{
        position: 'relative',
        borderRadius: 16,
        padding: plan.featured ? '2.5rem 2rem' : '1.75rem',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid',
        overflow: 'hidden',
        cursor: 'default',
        transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {plan.featured ? (
        /* Animated pulsing border for Pro */
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0px rgba(59,107,200,0)',
              '0 0 40px rgba(59,107,200,0.6)',
              '0 0 80px rgba(91,143,232,0.4)',
              '0 0 40px rgba(59,107,200,0.6)',
              '0 0 0px rgba(59,107,200,0)',
            ],
            borderColor: [
              'rgba(59,107,200,0.3)',
              'rgba(91,143,232,0.8)',
              'rgba(122,176,255,0.6)',
              'rgba(91,143,232,0.8)',
              'rgba(59,107,200,0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            border: '1px solid rgba(59,107,200,0.5)',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 16, border: '1px solid rgba(59,107,200,0.15)', pointerEvents: 'none' }} />
      )}

      {/* Floating badge for Pro */}
      {plan.featured && (
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(90deg, #3B6BC8, #5B8FE8)',
            color: '#fff',
            padding: '4px 16px',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.06em',
            boxShadow: '0 4px 20px rgba(59,107,200,0.5)',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}
        >
          ⭐ MÁS POPULAR
        </motion.div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--blue-circuit)',
          marginBottom: '0.4rem',
        }}>
          {plan.target}
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
          {plan.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: plan.priceLabel ? '2rem' : '2.25rem',
            fontWeight: 800,
            color: plan.featured ? 'var(--blue-circuit)' : 'var(--text)',
          }}>
            {plan.priceLabel || <AnimatedPrice target={plan.price} inView={inView} />}
          </span>
          {plan.period && (
            <span style={{ fontSize: '0.875rem', color: 'var(--text-3)' }}>{plan.period}</span>
          )}
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {plan.desc}
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
          {plan.features.map((f, fi) => (
            <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem' }}>
              <Check size={15} style={{ color: 'var(--blue-main)', flexShrink: 0, marginTop: '0.15rem' }} strokeWidth={2.5} />
              <span style={{ color: 'var(--text-2)' }}>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://sipctm.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {plan.cta}
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="pricing"
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
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p className="section-label">Precios</p>
            <h2 className="section-title">Planes para cada etapa</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Empezá gratis y escalá cuando tu taller crezca. Precios en pesos argentinos, sin sorpresas.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
              paddingTop: '1rem',
            }}
          >
            {PLANS.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
